import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  unreadCounts: {}, // { userId: count }
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSending: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ 
        messages: res.data,
        unreadCounts: { ...get().unreadCounts, [userId]: 0 } // Clear unread count when opening chat
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages, users } = get();
    const { authUser } = useAuthStore.getState();
    
    set({ isSending: true });

    // 1. Optimistic Update: Immediately add message locally
    const optimisticMessage = {
      _id: Date.now().toString(), // Temp ID
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true 
    };

    const updatedUsers = [selectedUser, ...users.filter(u => u._id !== selectedUser._id)];
    
    set({ 
      messages: [...messages, optimisticMessage],
      users: updatedUsers 
    });

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      
      // 2. Replace optimistic message with actual data from server
      set({ 
        messages: get().messages.map(m => m._id === optimisticMessage._id ? res.data : m),
        // Update last message preview in users list
        users: get().users.map(u => u._id === selectedUser._id ? { ...u, lastMessage: messageData.image ? "📷 Photo" : messageData.text } : u)
      });
    } catch (error) {
      // 3. Rollback on failure
      set({ messages: messages });
      toast.error(error.response.data.message);
    } finally {
      set({ isSending: false });
    }
  },

  markMessagesAsRead: async (senderId) => {
    try {
      await axiosInstance.post(`/messages/read/${senderId}`);
      set({ unreadCounts: { ...get().unreadCounts, [senderId]: 0 } });
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const { users, unreadCounts, messages, selectedUser, markMessagesAsRead } = get();
      
      const senderIndex = users.findIndex(u => u._id === newMessage.senderId);
      if (senderIndex === -1) return;

      const sender = users[senderIndex];
      const lastMessageText = newMessage.image ? "📷 Photo" : newMessage.text;
      const updatedUser = { ...sender, lastMessage: lastMessageText };
      const updatedUsers = [updatedUser, ...users.filter(u => u._id !== sender._id)];
      
      const isMessageFromSelectedUser = selectedUser && newMessage.senderId === selectedUser._id;
      
      if (isMessageFromSelectedUser) {
        set({
          messages: [...messages, newMessage],
          users: updatedUsers
        });
        // If chat is open, mark it as read immediately
        markMessagesAsRead(newMessage.senderId);
      } else {
        const currentCount = unreadCounts[newMessage.senderId] || 0;
        set({
          unreadCounts: { ...unreadCounts, [newMessage.senderId]: currentCount + 1 },
          users: updatedUsers
        });
      }
    });

    socket.on("messagesRead", ({ readerId }) => {
      const { selectedUser, messages } = get();
      if (selectedUser && selectedUser._id === readerId) {
        set({
          messages: messages.map(m => m.receiverId === readerId ? { ...m, isRead: true } : m)
        });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("messagesRead");
  },

  setSelectedUser: (selectedUser) => {
    if (selectedUser) {
      set({ selectedUser });
      get().markMessagesAsRead(selectedUser._id);
      get().getMessages(selectedUser._id); // Ensure messages are loaded
    } else {
      set({ selectedUser });
    }
  },
}));

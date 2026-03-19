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
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const { users, unreadCounts, messages, selectedUser } = get();
      
      // 1. Find the user who sent the message
      const senderIndex = users.findIndex(u => u._id === newMessage.senderId);
      if (senderIndex === -1) return;

      const sender = users[senderIndex];
      
      // 2. Prepare message preview text
      const lastMessageText = newMessage.image ? "📷 Photo" : newMessage.text;

      // 3. Update the user object with the last message and move to TOP
      const updatedUser = { ...sender, lastMessage: lastMessageText };
      const updatedUsers = [updatedUser, ...users.filter(u => u._id !== sender._id)];
      
      // 4. Update messages if this is the active chat
      const isMessageFromSelectedUser = selectedUser && newMessage.senderId === selectedUser._id;
      
      if (isMessageFromSelectedUser) {
        set({
          messages: [...messages, newMessage],
          users: updatedUsers
        });
      } else {
        // 5. Increment unread count for this user
        const currentCount = unreadCounts[newMessage.senderId] || 0;
        set({
          unreadCounts: { ...unreadCounts, [newMessage.senderId]: currentCount + 1 },
          users: updatedUsers
        });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => {
    if (selectedUser) {
      // Clear unread count when selecting user
      set({ 
        selectedUser,
        unreadCounts: { ...get().unreadCounts, [selectedUser._id]: 0 }
      });
    } else {
      set({ selectedUser });
    }
  },
}));

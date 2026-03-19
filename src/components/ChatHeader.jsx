import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import assets from "../assets/assets";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-white/10 bg-slate-900/40 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <div className="size-10 rounded-full overflow-hidden">
              <img src={selectedUser.profilePic || assets.avatar_icon} alt={selectedUser.fullName} className="object-cover size-full" />
            </div>
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-zinc-900 rounded-full" />
            )}
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium text-white">{selectedUser.fullName}</h3>
            <p className="text-sm text-gray-400">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="text-gray-400" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;

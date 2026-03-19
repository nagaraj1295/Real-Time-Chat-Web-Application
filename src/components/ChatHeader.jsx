import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import assets from "../assets/assets";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-white/5 bg-slate-950/20 backdrop-blur-xl">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="size-11 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <img src={selectedUser.profilePic || assets.avatar_icon} alt={selectedUser.fullName} className="object-cover size-full" />
            </div>
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-sm" />
            )}
          </div>

          {/* User info */}
          <div>
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              {selectedUser.fullName}
            </h3>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
              {onlineUsers.includes(selectedUser._id) ? (
                <>
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active Now</span>
                </>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="p-2.5 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all border border-transparent hover:border-white/10 active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;

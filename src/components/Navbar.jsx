import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="glass-navbar fixed w-full top-0 z-40 transition-all duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4 sm:gap-8">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all group">
              <div className="size-10 rounded-xl bg-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-500/10">
                <MessageSquare className="w-6 h-6 text-indigo-400" />
              </div>
              <h1 className="text-xl font-extrabold tracking-tight text-white bg-clip-text">QuickChat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={"/settings"}
              className="flex items-center gap-2 transition-all p-2.5 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white border border-transparent hover:border-white/5"
            >
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link 
                  to={"/profile"} 
                  className="flex items-center gap-2.5 transition-all p-2.5 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white border border-transparent hover:border-white/5"
                >
                  <div className="size-8 sm:size-9 rounded-full overflow-hidden border-2 border-indigo-500/30 shadow-sm shadow-indigo-500/20">
                    {authUser.profilePic ? (
                      <img src={authUser.profilePic} alt={authUser.fullName} className="size-full object-cover" />
                    ) : (
                      <User className="size-5" />
                    )}
                  </div>
                  <span className="hidden sm:inline font-medium">Profile</span>
                </Link>

                <button 
                  className="flex gap-2.5 items-center p-2.5 hover:bg-rose-500/10 rounded-xl text-gray-400 hover:text-rose-400 transition-all border border-transparent hover:border-rose-500/10" 
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;

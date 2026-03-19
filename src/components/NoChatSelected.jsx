import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-slate-950/20 backdrop-blur-sm">
      <div className="max-w-md text-center space-y-8 animate-fade-in">
        {/* Icon Display */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <div className="absolute -inset-4 bg-indigo-500/20 rounded-[2.5rem] blur-2xl group-hover:bg-indigo-500/30 transition-all duration-500" />
            <div
              className="relative w-24 h-24 rounded-[2rem] bg-indigo-500/10 border border-white/5 flex items-center
             justify-center shadow-2xl shadow-indigo-500/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            >
              <MessageSquare className="w-12 h-12 text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-3">
          <h2 className="text-4xl font-black text-white tracking-tight leading-tight">Your Digital <br /> Sanctuary Awaits.</h2>
          <p className="text-slate-400 text-lg font-medium max-w-xs mx-auto">
            Ignite a conversation by selecting a friend from your sidebar.
          </p>
        </div>

        {/* Action hint badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-slate-500 text-xs font-bold uppercase tracking-widest">
           <div className="size-1.5 rounded-full bg-indigo-500 animate-pulse" />
           Ready for connection
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;

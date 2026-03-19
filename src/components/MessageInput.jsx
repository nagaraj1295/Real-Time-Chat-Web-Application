import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-3 sm:p-4 w-full bg-slate-950/20 backdrop-blur-xl border-t border-white/5">
      {imagePreview && (
        <div className="mb-3 sm:mb-4 flex items-center gap-3">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border-2 border-indigo-500/20 shadow-xl"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-900 
              flex items-center justify-center border border-white/10 text-white hover:bg-rose-500 transition-colors shadow-lg"
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2 sm:gap-3 max-w-4xl mx-auto">
        <div className="flex-1 flex gap-2 sm:gap-3 bg-white/5 p-1 sm:p-1.5 rounded-2xl border border-white/10 focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-300">
          <button
            type="button"
            className={`flex btn btn-circle h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all active:scale-95
                     ${imagePreview ? "text-indigo-400" : "text-slate-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
          
          <input
            type="text"
            className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder:text-slate-500 text-[14px] sm:text-[15px] px-1 sm:px-2"
            placeholder="Write a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
        
        <button
          type="submit"
          className="h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20 active:scale-90"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} className={text.trim() || imagePreview ? "animate-pulse" : ""} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;

import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'
import { Check, CheckCheck } from 'lucide-react'

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore()
  const { authUser } = useAuthStore()
  const messageEndRef = useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id)
  }, [selectedUser._id, getMessages])

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/10'>
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? 'chat-end flex flex-row-reverse text-right' : 'chat-start flex flex-row'} gap-3`}
            ref={messageEndRef}
          >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border border-white/10 overflow-hidden'>
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || '/avatar.png'
                      : selectedUser.profilePic || '/avatar.png'
                  }
                  alt='profile pic'
                  className='object-cover size-full'
                />
              </div>
            </div>
            <div className='flex flex-col gap-1.5 max-w-[80%]'>
              <div className={`flex flex-col gap-2 p-4 rounded-2xl shadow-sm ${
                message.senderId === authUser._id 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white/10 text-white rounded-tl-none border border-white/5'
              }`}>
                {message.image && (
                  <img
                    src={message.image}
                    alt='Attachment'
                    className='rounded-xl max-w-full h-auto object-cover mb-1'
                  />
                )}
                {message.text && <p className="text-[15px] leading-relaxed">{message.text}</p>}
                
                <div className='flex items-center justify-end gap-1 mt-0.5'>
                  <time className='text-[10px] opacity-40 uppercase font-bold tracking-wider'>
                    {formatMessageTime(message.createdAt)}
                  </time>
                  
                  {message.senderId === authUser._id && (
                    <div className={message.isRead ? "text-indigo-300" : "text-slate-500"}>
                      {message.isRead ? (
                        <CheckCheck className="size-3.5" />
                      ) : (
                        <Check className="size-3.5" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
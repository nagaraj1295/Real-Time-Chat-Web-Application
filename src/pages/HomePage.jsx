import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import NoChatSelected from '../components/NoChatSelected'
import { useChatStore } from '../store/useChatStore'

const HomePage = () => {
  const { selectedUser } = useChatStore()

  return (
    <div className='h-screen bg-black/50'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-slate-950/80 backdrop-blur-xl rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] overflow-hidden border border-white/10'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />
            
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import NoChatSelected from '../components/NoChatSelected'
import { useChatStore } from '../store/useChatStore'

const HomePage = () => {
  const { selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore()

  React.useEffect(() => {
    subscribeToMessages()
    return () => unsubscribeFromMessages()
  }, [subscribeToMessages, unsubscribeFromMessages])

  return (
    <div className='min-h-screen flex items-center justify-center pt-24 pb-8 px-4'>
      <div className='glass-card w-full max-w-6xl h-[calc(100vh-9rem)] rounded-3xl overflow-hidden animate-fade-in'>
        <div className='flex h-full'>
          <Sidebar />
          
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  )
}

export default HomePage
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
    <div className='min-h-screen flex items-center justify-center pt-20 pb-4 sm:pt-24 sm:pb-8 px-0 sm:px-4'>
      <div className='glass-card w-full max-w-6xl h-[calc(100vh-5rem)] sm:h-[calc(100vh-9rem)] rounded-none sm:rounded-3xl overflow-hidden animate-fade-in'>
        <div className='flex h-full'>
          <div className={`${selectedUser ? 'hidden sm:flex' : 'flex'} w-full sm:w-auto h-full`}>
            <Sidebar />
          </div>
          
          <div className={`${!selectedUser ? 'hidden sm:flex' : 'flex'} flex-1 h-full`}>
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton'
import { Users } from 'lucide-react'
import assets from '../assets/assets'

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, unreadCounts } = useChatStore()
    const { onlineUsers } = useAuthStore()
    const [showOnlineOnly, setShowOnlineOnly] = useState(false)

    useEffect(() => {
        getUsers()
    }, [getUsers])

    const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users

    if (isUsersLoading) return <SidebarSkeleton />

    return (
        <aside className="h-full w-full sm:w-20 lg:w-72 border-r border-white/5 flex flex-col transition-all duration-200 bg-slate-950/50 backdrop-blur-xl">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6 text-indigo-400" />
                    <span className="font-medium flex sm:hidden lg:block text-white">Contacts</span>
                </div>
                {/* Online filter toggle */}
                <div className="mt-3 flex sm:hidden lg:flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="checkbox checkbox-sm checkbox-primary"
                        />
                        <span className="text-xs text-gray-400">Show online only ({onlineUsers.length - 1} online)</span>
                    </label>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-4 px-3 space-y-2">
                {filteredUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`
              w-full p-3 flex items-center gap-4 rounded-2xl transition-all duration-300 group
              ${selectedUser?._id === user._id 
                ? "bg-indigo-600/20 ring-1 ring-white/10 shadow-lg shadow-indigo-500/5" 
                : "hover:bg-white/5 border border-transparent hover:border-white/5"}
            `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <div className="size-12 rounded-2xl overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-300">
                                <img
                                    src={user.profilePic || assets.avatar_icon}
                                    alt={user.fullName}
                                    className="size-full object-cover"
                                />
                            </div>
                            {onlineUsers.includes(user._id) && (
                                <span
                                    className="absolute -bottom-0.5 -right-0.5 size-3.5 bg-emerald-500 
                  border-2 border-slate-900 rounded-full shadow-sm"
                                />
                            )}
                        </div>

                        {/* User info - visible on mobile (full width) and desktop, hidden on tablet strip */}
                        <div className="flex sm:hidden lg:flex flex-1 items-center justify-between min-w-0">
                            <div className="text-left flex-1 min-w-0">
                                <div className="font-semibold truncate text-slate-100 group-hover:text-white transition-colors">
                                    {user.fullName}
                                </div>
                                <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors flex items-center gap-1.5 mt-0.5">
                                    {onlineUsers.includes(user._id) ? (
                                        <>
                                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span>Active now</span>
                                        </>
                                    ) : (
                                        <span>Offline</span>
                                    )}
                                </div>
                                {user.lastMessage && (
                                    <div className={`text-[11px] truncate mt-1 ${unreadCounts[user._id] > 0 ? "text-indigo-400 font-bold" : "text-slate-500 font-medium"}`}>
                                        {user.lastMessage}
                                    </div>
                                )}
                            </div>
                            {unreadCounts[user._id] > 0 && (
                                <div className="size-5 bg-indigo-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/40 animate-bounce">
                                    {unreadCounts[user._id]}
                                </div>
                            )}
                        </div>
                    </button>
                ))}

                {filteredUsers.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">No online users</div>
                )}
            </div>
        </aside>
    )
}

export default Sidebar
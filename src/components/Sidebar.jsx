import React from 'react'
import { useNavigate } from 'react-router-dom'
import assets, { userDummyData } from '../assets/assets'

const Sidebar = ({ selectedUser, setSelectedUser }) => {
    const navigate = useNavigate();
    return (
        <aside className="flex flex-col bg-gradient-to-br from-slate-950/70 via-slate-900/60 to-indigo-950/20 backdrop-blur-xl border-r border-white/10 shadow-xl rounded-r-3xl p-6 h-full min-h-0 w-full max-w-[280px]">
            <header className="pb-6 border-b border-white/10 mb-6">
                <div className="flex justify-between items-center">
                    <img src={assets.logo} alt="logo" className="max-w-[140px] h-auto" />
                    <div className="relative group">
                        <button
                            type="button"
                            aria-label="Open menu"
                            className="flex items-center justify-center rounded-lg p-2 hover:bg-white/10 transition"
                        >
                            <img
                                src={assets.menu_icon}
                                alt="menu"
                                className="max-h-6"
                            />
                        </button>
                        <div className="absolute right-0 mt-1 bg-white/100 backdrop-blur-md rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible z-30 min-w-[140px]">
                            <ul className="py-2">
                                <li
                                    className="px-4 py-2 hover:bg-black/15 text-sm cursor-pointer rounded-md transition-colors"
                                    onClick={() => navigate('/profile')}
                                >
                                    Profile
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-black/15 text-sm cursor-pointer rounded-md transition-colors"
                                    onClick={() => navigate('/settings')}
                                >
                                    Settings
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-black/15 text-sm cursor-pointer rounded-md transition-colors text-rose-400"
                                    onClick={() => navigate('/logout')}
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='bg-white/10 rounded-full flex items-center gap-3 py-3 px-4 mt-5'>
                    <img src={assets.search_icon} alt="Search" className="w-4" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="bg-transparent focus:outline-none text-sm w-full text-gray-100 placeholder:text-gray-400"
                    />
                </div>
            </header>

            <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
                {userDummyData.map((user, index) => (
                    <button
                        type="button"
                        key={user.id || index}
                        onClick={() => setSelectedUser(user)}
                        className={`group relative flex items-center gap-3 p-3 rounded-xl w-full text-left transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${selectedUser?.id === user.id ? 'bg-white/15' : ''}`}
                    >
                        <img
                            src={user?.profilePic || assets.avatar_icon}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <p className="font-medium text-sm text-white">{user.fullName}</p>
                            <p className={`text-xs ${index < 3 ? 'text-emerald-400' : 'text-gray-400'}`}>
                                {index < 3 ? 'Online' : 'Offline'}
                            </p>
                        </div>
                        {index > 2 && (
                            <span className='text-[10px] h-5 w-5 flex justify-center items-center rounded-full bg-indigo-500/30 text-indigo-100'>
                                {index}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </aside>
    )
}

export default Sidebar
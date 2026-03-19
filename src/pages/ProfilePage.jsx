import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react'
import assets from '../assets/assets'

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
  const [selectedImg, setSelectedImg] = useState(null)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async () => {
      const base64Image = reader.result
      setSelectedImg(base64Image)
      await updateProfile({ profilePic: base64Image })
      setSelectedImg(null)
    }
  }

  return (
    <div className='min-h-screen pt-28 pb-12 overflow-y-auto px-4'>
      <div className='max-w-2xl mx-auto'>
        <div className='glass-card rounded-3xl p-8 space-y-10 animate-fade-in'>
          <div className='text-center space-y-2'>
            <h1 className='text-3xl font-extrabold text-white tracking-tight'>Profile Settings</h1>
            <p className='text-slate-400 text-sm'>Customize your personal presence</p>
          </div>

          {/* Avatar Upload Section */}
          <div className='flex flex-col items-center gap-6'>
            <div className='relative group'>
              <div className="size-36 rounded-[2.5rem] overflow-hidden border-4 border-indigo-500/20 shadow-2xl shadow-indigo-500/10 group-hover:border-indigo-500/40 transition-all duration-300">
                <img
                  src={selectedImg || authUser.profilePic || assets.avatar_icon}
                  alt='Profile'
                  className='size-full object-cover group-hover:scale-110 transition-transform duration-500'
                />
              </div>
              <label
                htmlFor='avatar-upload'
                className={`
                  absolute -bottom-2 -right-2 
                  bg-indigo-600 hover:bg-indigo-500
                  p-3 rounded-2xl cursor-pointer 
                  transition-all duration-300 shadow-xl shadow-indigo-600/30
                  active:scale-90
                  ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''}
                `}
              >
                <Camera className='w-5 h-5 text-white' />
                <input
                  type='file'
                  id='avatar-upload'
                  className='hidden'
                  accept='image/*'
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <div className='text-center'>
               <p className='text-sm font-medium text-slate-300'>
                {isUpdatingProfile ? 'Syncing with cloud...' : 'Click icons to swap your photo'}
              </p>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Max size 10MB</p>
            </div>
          </div>

          <div className='grid gap-6 sm:grid-cols-2'>
            <div className='space-y-2'>
              <div className='text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2'>
                <User className='w-3.5 h-3.5' />
                Full Name
              </div>
              <div className='px-5 py-3.5 bg-white/5 rounded-2xl border border-white/5 text-slate-100 font-medium'>
                {authUser?.fullName}
              </div>
            </div>

            <div className='space-y-2'>
              <div className='text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2'>
                <Mail className='w-3.5 h-3.5' />
                Email Address
              </div>
              <div className='px-5 py-3.5 bg-white/5 rounded-2xl border border-white/5 text-slate-100 font-medium'>
                {authUser?.email}
              </div>
            </div>
          </div>

          <div className='bg-indigo-500/5 rounded-[2rem] p-6 border border-indigo-500/10'>
            <h2 className='text-sm font-bold uppercase tracking-widest text-indigo-400 mb-6'>Account Insights</h2>
            <div className='space-y-4'>
              <div className='flex items-center justify-between pb-3 border-b border-indigo-500/5'>
                <span className='text-slate-400 text-sm'>Joined Community</span>
                <span className='text-slate-200 text-sm font-semibold'>{authUser.createdAt?.split('T')[0]}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-slate-400 text-sm'>Verification Status</span>
                <span className='flex items-center gap-1.5 text-emerald-400 text-sm font-bold'>
                  <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Verified Member
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
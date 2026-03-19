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
    }
  }

  return (
    <div className='h-screen pt-20 bg-black/50'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-slate-900/60 backdrop-blur-xl rounded-xl p-6 space-y-8 border border-white/10'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-white'>Profile</h1>
            <p className='mt-2 text-gray-400'>Your profile information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <img
                src={selectedImg || authUser.profilePic || assets.avatar_icon}
                alt='Profile'
                className='size-32 rounded-full object-cover border-4 border-indigo-600/20'
              />
              <label
                htmlFor='avatar-upload'
                className={`
                  absolute bottom-0 right-0 
                  bg-indigo-600 hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
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
            <p className='text-sm text-gray-400'>
              {isUpdatingProfile ? 'Uploading...' : 'Click the camera icon to update your photo'}
            </p>
          </div>

          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-sm text-gray-400 flex items-center gap-2'>
                <User className='w-4 h-4' />
                Full Name
              </div>
              <p className='px-4 py-2.5 bg-white/5 rounded-lg border border-white/10 text-white'>
                {authUser?.fullName}
              </p>
            </div>

            <div className='space-y-1.5'>
              <div className='text-sm text-gray-400 flex items-center gap-2'>
                <Mail className='w-4 h-4' />
                Email Address
              </div>
              <p className='px-4 py-2.5 bg-white/5 rounded-lg border border-white/10 text-white'>
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className='mt-6 bg-white/5 rounded-xl p-6 border border-white/10'>
            <h2 className='text-lg font-medium mb-4 text-white'>Account Information</h2>
            <div className='space-y-3 text-sm'>
              <div className='flex items-center justify-between py-2 border-b border-white/5'>
                <span className='text-gray-400'>Member Since</span>
                <span className='text-white'>{authUser.createdAt?.split('T')[0]}</span>
              </div>
              <div className='flex items-center justify-between py-2'>
                <span className='text-gray-400'>Account Status</span>
                <span className='text-green-500'>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
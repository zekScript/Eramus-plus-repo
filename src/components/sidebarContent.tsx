'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { getCurrentUser } from '@/server/currentUser'
import * as React from 'react'
import { GlassEffectSwitch } from './ui/switch'
import ColorPicker from './ColorPicker'
import { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import {
  deleteUser,
  findUserById,
  updateProfilePrivacy,
  updateUser,
} from '@/server/user'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserItems } from '@/types'
interface SideBarContentProps {
  params: {
    settingsID: string
  }
}



// const pickColorAction = (e) => {
// e.preventDefault()
// }
const SideBarContent: React.FC<SideBarContentProps> = ({ params }) => {
  const [feedback, setFeedback] = useState({ success: false, message: '' })
  const [charCounter, setCharCounter] = useState(0)
  const { setTheme } = useTheme()
  const pathname = usePathname()
  const segments = pathname.split('/')
  const userId = parseInt(segments[2], 10)

  useEffect(() => {
    findUserById(userId)
      .then((user) => {
        return setProfileSettingsCurrentUser(user) // Store resolved value in state
      })
      .catch((error) => {
        console.error('Error fetching user:', error)
      })
  }, [userId])

  const [isOpen, setIsOpen] = useState(false) // State to manage dropdown visibility

  const handleChevronClick = () => {
    setIsOpen((prev) => !prev) // Toggle the dropdown open/close
  }
  const [profileSettingsCurrentUser, setProfileSettingsCurrentUser] =
    useState<UserItems | null>(null)

  const [name, setName] = useState(profileSettingsCurrentUser?.name)
  const [privacy, setPrivacy] = useState('public')

  let contentToDisplay = ''
  if (params.settingsID === 'general') {
    contentToDisplay = 'general' // Display general settings
  } else if (params.settingsID === 'avatar') {
    contentToDisplay = 'avatar' // Display avatar settings
  } else if (params.settingsID === 'profilebackground') {
    contentToDisplay = 'profilebackground' // Display profile background settings
  } else if (params.settingsID === 'theme') {
    contentToDisplay = 'theme' // Display theme settings
  } else if (params.settingsID === 'privacy') {
    contentToDisplay = 'privacy' // Display privacy settings
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSubmit = async (formData: FormData, id: number) => {
    const result = await updateUser(formData, id)
    console.log(result.message)
  }

  const handleSelectChange = (value: string) => {
    setTheme('' + value)
  }

  const handleSelectChangePrivacy = async (value: string) => {
    await updateProfilePrivacy(profileSettingsCurrentUser?.id as number, value)
  }

  const deletAcc = async () => {
    await deleteUser(profileSettingsCurrentUser?.id as number)
  }

  return (
    <>
      {/* General Settings */}
      {contentToDisplay === 'general' && (
        <div className='ml-6 flex h-full w-full flex-col space-y-4 text-[1.4rem] font-bold'>
          <h1>General Settings</h1>
          <p className='text-sm font-medium text-gray-600'>
            This is where you can change your custom name, Bio, and more.
          </p>
          <form
            action={(formData) =>
              handleSubmit(formData, profileSettingsCurrentUser?.id as number)
            }
          >
            <section id='general'>
              <div className='ml-3 w-[100%] space-y-4'>
                <Label htmlFor='newName'>Name</Label>
                <Input
                  type='text'
                  name='newName'
                  onChange={handleChangeName}
                  defaultValue={profileSettingsCurrentUser?.name}
                />

                <Label>About you</Label>
                <Textarea
                  maxLength={500}
                  defaultValue={profileSettingsCurrentUser?.bio || ''}
                  onChange={(e) => setCharCounter(e.target.value.length)}
                  name='textAbout'
                  placeholder='I like to eat pizza...'
                />
                <p className='text-end text-[20px] font-normal'>
                  {charCounter} / 500
                </p>
              </div>
              <div className='mt-4'>
                {/* Settings for optimization && styling*/}
                <h1>Optimization & styling</h1>
                <p className='text-sm font-medium text-gray-600'>
                  If you feel you want to optimize abit and make a different
                  website experience
                </p>
                <p className='text-sm font-medium text-gray-600'>
                  Note: This feature could be buggy so if you find any bugs
                  please contact us on support
                </p>
                {/* Options */}
                <h3>Optimization</h3>
                <div className='mt-3 space-y-3 text-[20px] font-normal'>
                  {/* <p>Animations: </p>
                  <p>Images: </p> */}
                  <p>Coming Soon!</p>
                  <Button onClick={deletAcc}>Delete account</Button>
                </div>
              </div>
            </section>
            <div className='mr-4 mt-4 flex w-full justify-end gap-2'>
              <Button variant='secondary'>Save</Button>
              <Button variant='outline'>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {/* Avatar Settings */}
      {/* {contentToDisplay === 'avatar' && (
        <form action={formAction} className="mt-3">
      <div className="ml-6 flex h-full w-full flex-col text-[1.4rem] font-bold">
        <h1>Avatar</h1>
        <p className="mt-3 text-sm font-medium text-gray-600">
          This is where you can change your avatar to your liking. The image must be 184x184.
        </p>
        <div className="mt-6 flex w-full gap-5">
          <img
            src={avatarPreview || user?.profilePic}
            width={184}
            height={184}
            alt="Avatar"
          />
          <div className="h-[128px] w-[128px]">
            <img src={avatarPreview || user?.profilePic} width={128} height={128} alt="Avatar" />
          </div>
          <div className="h-[64px] w-[64px]">
            <img src={avatarPreview || user?.profilePic} width={64} height={64} alt="Avatar" />
          </div>
          <div className="flex w-[30%] flex-col gap-1.5">
            <label
              htmlFor="picture"
              className="cursor-pointer bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900 px-4 py-2 text-sm text-neutral-100 shadow-md hover:from-neutral-800 hover:to-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2"
            >
              Upload Picture
            </label>
            <input type="hidden" name="userId" value={user?.id} />
            <input
              name="profilePic"
              className="hidden"
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <p className="text-center text-sm font-normal text-neutral-600">
              Upload an image (184x184) from your system.
            </p>
          </div>
        </div>
        <div className="mr-4 mt-4 flex w-full justify-end gap-2">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Save</button>
          <button type="button" className="px-4 py-2 border" onClick={() => setAvatarPreview(null)}>Cancel</button>
        </div>
      </div>

      {feedback.message && (
            <div
              className={`mt-4 w-full rounded-md p-3 text-center ${
                feedback.success
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {feedback.message}
            </div>
          )}
    </form>

    
      )} */}

      {/* Profile Background Settings */}
      {/* {contentToDisplay === 'profilebackground' && (
        <div className='ml-6 flex h-full w-full flex-col text-[1.4rem] font-bold'>
          <h1>Profile Background</h1>
          <p className='mt-3 text-sm font-medium text-gray-600'>
            This is where you can change your custom profile background to your
            liking. We recommend using a high-quality image.
          </p>
          <form className='mt-3'>
            <section id='profileBackground'>
              <div className='flex w-full justify-end'>
                <div className='w-full'>
                  <label
                    htmlFor='picture'
                    className='cursor-pointer bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900 px-4 py-2 text-sm text-neutral-100 shadow-md hover:from-neutral-800 hover:to-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2'
                  >
                    Upload Picture
                  </label>
                  <Input
                    className='hidden'
                    id='picture'
                    type='file'
                    accept='image/*'
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>
              <div className='mt-6 h-full w-full'>
                <img
                  src={
                    avatarPreview ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpYdAVog761Bm7DbPNApHtkl4TxGlz3Ry0Cw&s'
                  }
                ></img>
              </div>
            </section>
            <div className='mr-4 mt-4 flex w-full justify-end gap-2'>
              <Button variant='secondary'>Save</Button>
              <Button variant='outline'>Cancel</Button>
            </div>
          </form>
        </div>
      )} */}

      {/* Theme Settings */}
      {contentToDisplay === 'theme' && (
        <div className='ml-6 flex h-full w-full flex-col text-[1.4rem] font-bold'>
          <h1>Custom Themes</h1>
          <p className='mt-3 text-sm font-medium text-gray-600'>
            You can change custom theme colors. also you can change what theme
            mode you prefer
          </p>
          {/* <form className='mt-3' action={(e) => pickColorAction(e)}> */}
          {/* Whole container */}
          <div className='mt-3 h-full w-full'>
            {/* Container */}

            <div className='border-settings mt-3 flex h-full w-full p-6'>
              <div className='h-full w-full'>
                <h1 className='text-xl font-medium'>Choose your mode</h1>
                <p className='text-sm font-thin'>
                  Change the colors that appear on your site
                </p>
              </div>
              {/* Selection */}
              <div className='mr-3 flex items-center'>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className='w-[140px]'>
                    <SelectValue placeholder='Dark' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='dark'>Dark</SelectItem>
                      <SelectItem value='light'>Light</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='border-settings mt-3 flex h-full w-full p-6'>
              <div className='flex h-full w-full flex-col'>
                <div className='flex h-full w-full'>
                  <div className='flex h-full w-full flex-col'>
                    <h1 className='text-xl font-medium'>Color</h1>
                  </div>

                  {/* Selection */}
                  <div className='mr-3 flex items-center gap-4'>
                    <Select onOpenChange={setIsOpen}></Select>
                    {/* Chevron button */}
                    <div
                      onClick={handleChevronClick}
                      className='cursor-pointer'
                    >
                      {isOpen ? <ChevronUp /> : <ChevronDown />}{' '}
                      {/* Toggle Chevron based on isOpen */}
                    </div>
                  </div>
                </div>

                {/* Expanded content */}

                <div>
                  {/* Color picker templates  */}
                  {isOpen && (
                    <div className='flex h-full w-full items-start'>
                      <ColorPicker />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='mr-4 mt-4 flex w-full justify-end gap-2'>
            <Button variant='secondary'>Save</Button>
            <Button variant='outline'>Cancel</Button>
          </div>
          {/* </form> */}
        </div>
      )}

      {/* Privacy Settings */}
      {contentToDisplay === 'privacy' && (
        <div className='ml-6 flex h-full w-full flex-col text-[1.4rem] font-bold'>
          <h1>Privacy Settings</h1>
          <p className='mt-3 text-sm font-medium text-gray-600'>
            Manage your privacy settings here.
          </p>
          <form className='mt-3'>
            <section id='privacySettings'>
              <div className='mt-4 w-full'>
                <div
                  className='w-full'
                  style={{
                    borderBottom: '2px solid transparent', // Set a transparent bottom border
                    borderImage:
                      'linear-gradient(to right, rgba(82, 82, 82, 0.8), rgba(74, 74, 74, 0))', // Gray-700 gradient
                    borderImageSlice: 1, // Use the entire gradient for the border
                  }}
                >
                  <h1 className='mb-3'>
                    Basic details:{' '}
                    <span className='text-indigo-500'>Public</span>
                    <span className='ml-3 text-sm text-gray-700'>
                      (default)
                    </span>
                  </h1>
                </div>
                <div
                  className='flex w-full flex-col'
                  style={{
                    borderBottom: '2px solid transparent', // Set a transparent bottom border
                    borderImage:
                      'linear-gradient(to right, rgba(82, 82, 82, 0.8), rgba(74, 74, 74, 0))', // Gray-700 gradient
                    borderImageSlice: 1, // Use the entire gradient for the border
                  }}
                >
                  <div className='flex'>
                    <h1 className='mb-3'>My profile:</h1>
                    <Select onValueChange={handleSelectChangePrivacy}>
                      <SelectTrigger className='w-[100px] border-none'>
                        <span className='text-indigo-500'>
                          {profileSettingsCurrentUser?.privacyVisabillity}
                        </span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='public'>Public</SelectItem>
                          <SelectItem value='private'>Private</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className='mb-3 text-sm font-medium text-gray-600'>
                    If you enable this to private, other users won’t see your
                    recent posts, description, and other things.
                  </p>
                </div>
              </div>
            </section>
            <div className='mr-4 mt-4 flex w-full justify-end gap-2'>
              <Button variant='secondary'>Save</Button>
              <Button variant='outline'>Cancel</Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default SideBarContent

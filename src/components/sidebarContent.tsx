'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { getCurrentUser } from '@/server/currentUser'
import * as React from 'react'
import { GlassEffectSwitch } from './ui/switch'
import ColorPicker from './ColorPicker'
import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { updateUser } from '@/server/user'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
interface SideBarContentProps {
  params: {
    settingsID: string
  }
}
const SideBarContent: React.FC<SideBarContentProps> = ({ params }) => {
  const user = getCurrentUser()
  

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
// Avatar script
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSaveSubmit = async (formData: FormData, id: number) => {
    
    const result = await updateUser(formData, id)
    console.log(result.message)
  }



  
  const resetAvatar = () => {
    setAvatarPreview(null);
  };

  // const handleSuhandleSaveAvatarSubmitbmit = async (formData: FormData) => {
  //     const result = await updateUser(formData)
  // }


  return (
    <>
      {/* General Settings */}
      {contentToDisplay === 'general' && (
        <div className='ml-6 flex h-full w-full flex-col text-[1.4rem] font-bold'>
          <h1>General Settings</h1>
          <p className='mt-3 text-sm font-medium text-gray-600'>
            This is where you can change your custom name, Bio, and more.
          </p>
          <form className='mt-3'>
            <section id='general'>
              <div className='ml-3 mt-6 w-[60%] gap-y-4'>
                <Label htmlFor='newName'>Name</Label>
                <Input type='text' name='newName' value={user?.name} />

                <Label>About you</Label>
                <Textarea
                  name='textAbout'
                  placeholder='I like to eat pizza...'
                />
              </div>
              <div>
                {/* Settings for optimization && styling*/}
                <h1>Optimization & styling</h1>
                <p className='mt-3 text-sm font-medium text-gray-600'>
                  If you feel you want to optimize abit and make a different
                  website experience
                </p>
                <p className='mt-3 text-sm font-medium text-gray-600'>
                  Note: This feature could be buggy so if you find any bugs
                  please contact us on support
                </p>
                {/* Options */}
                <h3>Optimization</h3>
                <div className='mt-3 font-serif text-sm font-thin'>
                  <p>Animations: </p>
                  <p>Images: </p>
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
      {contentToDisplay === 'avatar' && (
      <form className='mt-3'>

        <div className='ml-6 flex h-full w-full flex-col text-[1.4rem] font-bold'>
          <h1>Avatar</h1>

          <p className='mt-3 text-sm font-medium text-gray-600'>
            This is where you can change your avatar to your liking. The image
            must be 184x184.
          </p>
          <div className='mt-6 flex gap-5 w-full'>
            <img
              src={avatarPreview || user?.profilePic}
              width={184}
              height={184}
              // className="w-[184px] h-[184px]"
              alt='Avatar'
            ></img>
            <div className='w-[128px] h-[128px]'>
<img
              src={avatarPreview || user?.profilePic}
              width={128}
              height={128}
              // className="w-[184px] h-[184px]"
              alt='Avatar'
            ></img>
            </div>
            <div className='w-[64px] h-[64px]'>
            <img
              src={avatarPreview || user?.profilePic}
              width={64}
              height={64}
              // className="w-[184px] h-[184px]"
              alt='Avatar'
            ></img>
            </div>
            <div className='flex w-[30%] gap-1.5 flex-col'>
            <label
            htmlFor="picture"
            className="cursor-pointer  bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900 px-4 py-2 text-neutral-100 text-sm shadow-md hover:from-neutral-800 hover:to-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2"
            >
              Upload Picture
            </label>
              <Input name='profilePic' className='hidden' id='picture' type='file' accept="image/*"
          onChange={handleAvatarChange}
 />
      <p className='text-sm text-center font-normal text-neutral-600'>Upload a image by 184x184 from your system</p>
            </div>
          </div>
            {/* Continue here to add more... */}
            <div className='mr-4 mt-4 flex w-full justify-end gap-2'>
              {/* onClick={handleSaveAvatarSubmit} */}
              <Button variant='secondary' >Save</Button>
              <Button variant='outline' onClick={resetAvatar}>Cancel</Button>

            </div>
        </div>
        </form>
      )}

      {/* Profile Background Settings */}
      {contentToDisplay === 'profilebackground' && (
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
            htmlFor="picture"
            className="cursor-pointer  bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900 px-4 py-2 text-neutral-100 text-sm shadow-md hover:from-neutral-800 hover:to-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2"
            >
              Upload Picture
            </label>
              <Input className='hidden' id='picture' type='file' accept="image/*"
          onChange={handleAvatarChange}
 />
                </div>
              </div>
              <div className='mt-6 h-full w-full'>
                <img 
                src={avatarPreview || 'https://placehold.co/600x400'}
                
                >

                </img>
              </div>
            </section>
            <div className='mr-4 mt-4 flex w-full justify-end gap-2'>
              <Button variant='secondary'>Save</Button>
              <Button variant='outline'>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {/* Theme Settings */}
      {contentToDisplay === 'theme' && (
        <div className='ml-6 flex h-full w-full flex-col text-[1.4rem] font-bold'>
          <h1>Custom Themes</h1>
          <p className='mt-3 text-sm font-medium text-gray-600'>
            You can change custom theme colors. also you can change what theme
            mode you prefer
          </p>
          <form className='mt-3'>
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
                  <Select>
                    <SelectTrigger className='w-[140px]'>
                      <SelectValue placeholder='Dark' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='apple'>Dark</SelectItem>
                        <SelectItem value='banana'>Light</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='border-settings mt-3 flex h-full w-full p-6'>
                <div className='h-full w-full'>
                  <h1 className='text-xl font-medium'>Glass effect</h1>
                  <p className='text-sm font-thin'>
                    some site surfaces will appear glassy translucent effect
                  </p>
                </div>
                {/* Selection */}
                <div className='mr-3 flex items-center'>
                  <GlassEffectSwitch></GlassEffectSwitch>
                </div>
              </div>

              <div className='border-settings mt-3 flex h-full w-full p-6 '>
                <div className='flex h-full w-full flex-col'>
                  <div className='flex h-full w-full'>
                    <div className='flex h-full w-full flex-col'>
                      <h1 className='text-xl font-medium'>Color</h1>
                    </div>

                    {/* Selection */}
                    <div className='mr-3 flex items-center gap-4'>
                      <Select>
                        <SelectTrigger className='w-[140px]'>
                          <SelectValue placeholder='Manual' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value='apple' disabled>Manual</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <ChevronUp></ChevronUp>
                    </div>
                  </div>

                  <div className='hidden'>
                    {/* Color picker templates  */}
                    <div className='flex w-full h-full items-start '>
                      <ColorPicker />
  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='mr-4 mt-4 flex w-full justify-end gap-2'>
              <Button variant='secondary'>Save</Button>
              <Button variant='outline'>Cancel</Button>
            </div>
          </form>
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
                    <Select>
                      <SelectTrigger className='w-[100px] border-none'>
                        <span className='text-indigo-500'>Public</span>
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

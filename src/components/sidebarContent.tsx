'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { getCurrentUser } from '@/server/currentUser'
import * as React from 'react'
import { GlassEffectSwitch } from './ui/switch'
import ColorPicker from './ColorPicker'
import { motion } from 'framer-motion';
import { useState } from 'react';

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

  const [isOpen, setIsOpen] = useState(false);

  const toggleColorPicker = () => {
    setIsOpen(!isOpen);
  };

  // const handleNewProfilePicture = () => {
  //   const newProfilePictureText = ''
  //   const newProfilePictureID = document.getElementById('newProfilePictureID').value;

  //   console.log("value changed")
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
        <div className='ml-6 flex h-full w-full flex-col text-[1.4rem] font-bold'>
          <h1>Avatar</h1>

          <p className='mt-3 text-sm font-medium text-gray-600'>
            This is where you can change your avatar to your liking. The image
            must be 184x184.
          </p>
          <div className='mt-6 flex gap-5'>
            <img
              src={(user?.profilePic as string) || undefined}
              width={128}
              height={128}
              // className="w-[184px] h-[184px]"
              alt='Avatar'
            ></img>
            <div className='flex w-[50%] gap-1.5'>
              <Label htmlFor='picture'>Picture</Label>
              <Input id='picture' type='file' />
            </div>
          </div>
          <form className='mt-3'>
            <section id='avatar'>
              <div className='ml-3 mt-6'>
                <Label htmlFor='newAvatar'>New Avatar</Label>
                <Input type='text' name='newAvatar' className='w-[60%]' />
              </div>
            </section>
            <div className='mr-4 mt-4 flex w-full justify-end gap-2'>
              <Button variant='secondary'>Save</Button>
              <Button variant='outline'>Cancel</Button>
            </div>
          </form>
        </div>
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
                <div className='w-[250px]'>
                  <Input
                    id='picture'
                    type='file'
                    className='flex w-full justify-end'
                  />
                </div>
              </div>
              <div className='mt-6 h-full w-full'>
                <img src='https://placehold.co/600x400'></img>
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
                    <div className='mr-3 flex items-center'>
                      <Select>
                        <SelectTrigger className='w-[140px]'>
                          <SelectValue placeholder='Manual' />
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

                  <div>
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

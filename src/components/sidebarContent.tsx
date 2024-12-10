'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { getCurrentUser } from '@/server/currentUser'
import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
interface SideBarContentProps {
  params: {
    settingsID: string
  }
}
const SideBarContent: React.FC<SideBarContentProps> = ({ params }) => {
  const user = getCurrentUser()
let contentToDisplay = '';
  if (params.settingsID === 'general') {
    contentToDisplay = 'general'; // Display general settings
  } else if (params.settingsID === 'avatar') {
    contentToDisplay = 'avatar'; // Display avatar settings
  } else if (params.settingsID === 'profilebackground') {
    contentToDisplay = 'profilebackground'; // Display profile background settings
  } else if (params.settingsID === 'theme') {
    contentToDisplay = 'theme'; // Display theme settings
  } else if (params.settingsID === 'privacy') {
    contentToDisplay = 'privacy'; // Display privacy settings
  }

  return (
    <>
      {/* General Settings */}
      {contentToDisplay === 'general' && (
        <div className="ml-6 flex h-full w-full flex-col text-[1.4rem] font-bold">
          <h1>General Settings</h1>
          <p className="mt-3 text-sm font-medium text-gray-600">
            This is where you can change your custom name, summary, and more.
          </p>
          <form className="mt-3">
            <section id="general">
              <div className="ml-3 mt-6 w-[60%] gap-y-4">
                <Label htmlFor="newName">New Name</Label>
                <Input type="text" name="newName" value={user?.name} />

                <Label>About you</Label>
                <Textarea name="textAbout" placeholder="I like to eat pizza..." />
              </div>
            </section>
            <div className="mr-4 mt-4 flex w-full justify-end gap-2">
        <Button variant="secondary">Save</Button>
        <Button variant="outline">Cancel</Button>
      </div>
          </form>
        </div>
      )}

      {/* Avatar Settings */}
      {contentToDisplay === 'avatar' && (
        <div className="ml-6 flex h-full w-full flex-col text-[1.4rem] font-bold">
          <h1>Avatar</h1>
          <p className="mt-3 text-sm font-medium text-gray-600">
            This is where you can change your avatar to your liking. The image must be 184x184.
          </p>
          <form className="mt-3">
            <section id="avatar">
              <div className="ml-3 mt-6">
                <Label htmlFor="newAvatar">New Avatar</Label>
                <Input type="text" name="newAvatar" className="w-[60%]" />
              </div>
            </section>
            <div className="mr-4 mt-4 flex w-full justify-end gap-2">
        <Button variant="secondary">Save</Button>
        <Button variant="outline">Cancel</Button>
      </div>
          </form>
        </div>
      )}

      {/* Profile Background Settings */}
      {contentToDisplay === 'profilebackground' && (
        <div className="ml-6 flex h-full w-full flex-col text-[1.4rem] font-bold">
          <h1>Profile Background</h1>
          <p className="mt-3 text-sm font-medium text-gray-600">
            This is where you can change your custom profile background to your liking. We recommend using a high-quality image.
          </p>
          <form className="mt-3">
            <section id="profileBackground">
              <div className="ml-3 mt-6">
                <Label htmlFor="newBackground">New Background</Label>
                <Input type="text" name="newBackground" className="w-[60%]" />
              </div>
            </section>
            <div className="mr-4 mt-4 flex w-full justify-end gap-2">
        <Button variant="secondary">Save</Button>
        <Button variant="outline">Cancel</Button>
      </div>
          </form>
        </div>
      )}

      {/* Theme Settings */}
      {contentToDisplay === 'theme' && (
        <div className="ml-6 flex h-full w-full flex-col text-[1.4rem] font-bold">
          <h1>Custom Themes</h1>
          <p className="mt-3 text-sm font-medium text-gray-600">
            This is where you can change themes like transparency, colors, and animations to your liking.
          </p>
          <form className="mt-3">
            <section id="theme">
              <div>{/* Settings for optimization */}</div>
              <div>{/* Theme color picker */}</div>
            </section>
            <div className="mr-4 mt-4 flex w-full justify-end gap-2">
        <Button variant="secondary">Save</Button>
        <Button variant="outline">Cancel</Button>
      </div>
          </form>
        </div>
      )}

      {/* Privacy Settings */}
      {contentToDisplay === 'privacy' && (
        <div className="ml-6 flex h-full w-full flex-col text-[1.4rem] font-bold">
          <h1>Privacy Settings</h1>
          <p className="mt-3 text-sm font-medium text-gray-600">
            Manage your privacy settings here.
          </p>
          <form className="mt-3">
            <section id="privacySettings">
              <div className="mt-4 w-full">
                <div
                className='w-full'
                style={{
                  borderBottom: '2px solid transparent', // Set a transparent bottom border
                  borderImage: 'linear-gradient(to right, rgba(82, 82, 82, 0.8), rgba(74, 74, 74, 0))', // Gray-700 gradient
                  borderImageSlice: 1, // Use the entire gradient for the border
                }}
                >
                  <h1 className="mb-3">
                    Basic details: <span className="text-indigo-500">Public</span>
                    <span className="ml-3 text-sm text-gray-700">(default)</span>
                  </h1>
                </div>
                <div className="flex flex-col w-full"
                  style={{
                  borderBottom: '2px solid transparent', // Set a transparent bottom border
                  borderImage: 'linear-gradient(to right, rgba(82, 82, 82, 0.8), rgba(74, 74, 74, 0))', // Gray-700 gradient
                  borderImageSlice: 1, // Use the entire gradient for the border
                }}
                >
                  <div className="flex">
                    <h1 className="mb-3">My profile:</h1>
                    <Select>
                      <SelectTrigger className="w-[100px] border-none">
                        <span className="text-indigo-500">Public</span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="mb-3 text-sm font-medium text-gray-600">
                    If you enable this to private, other users won’t see your recent posts, description, and other things.
                  </p>
                </div>
              </div>
            </section>
            <div className="mr-4 mt-4 flex w-full justify-end gap-2">
        <Button variant="secondary">Save</Button>
        <Button variant="outline">Cancel</Button>
      </div>
          </form>
        </div>
      )}

      
    </>
  );
}

export default SideBarContent;
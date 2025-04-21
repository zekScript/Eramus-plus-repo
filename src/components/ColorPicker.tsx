'use client'
import ColorPalletes from './colorPalletes'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'

const ColorPicker = () => {
  const colorInputRef = useRef<HTMLInputElement | null>(null) // Reference to the hidden input

  const handleButtonClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click() // Trigger the color input when the button is clicked
    }
  }

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    localStorage.setItem('colorTheme', event.target.value)
  }
  return (
    <>
      <div className='flex flex-col space-y-4'>
        <p className='mb-3 mt-12 text-sm font-normal'>Portfolio colors</p>
        {/* Color Template boxes */}
        <div className='grid grid-cols-3 gap-1 md:grid-cols-4 md:gap-4 lg:grid-cols-7 lg:gap-1'>
          {/* Color boxes */}
          <ColorPalletes></ColorPalletes>
        </div>

        <div>
          <div className='border-settings mt-3 flex h-full w-full p-6'>
            <div className='h-full w-full'>
              <h1 className='text-xl font-medium'>Custom colors</h1>
              <p className='pr-3 text-sm font-thin'>
                custom theme colors for better user experience
              </p>
            </div>
            {/* Selection */}
            <div className='mr-3 flex items-center'>
              <Button onClick={handleButtonClick}>Select Color</Button>

              {/* Hidden color input */}
              <input
                ref={colorInputRef}
                type='color'
                onChange={handleColorChange}
                style={{ display: 'none' }} // Hide the input element
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ColorPicker

'use client'
import ColorPalletes from './colorPalletes'
import { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

const ColorPicker = () => {
  const colorInputRef = useRef<HTMLInputElement | null>(null) // Reference to the hidden input
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  // Load the saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem('themeColor')
    if (savedColor) {
      setSelectedColor(savedColor)
      document.documentElement.style.setProperty('--theme-color', savedColor)
    }
  }, [])

  const handleButtonClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click() // Trigger the color input when the button is clicked
    }
  }

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const color = event.target.value
    setSelectedColor(color)
    localStorage.setItem('themeColor', color) // Save the color to localStorage
    document.documentElement.style.setProperty('--theme-color', color) // Update the CSS variable
  }
  return (
    <>
      <div className='flex flex-col space-y-4'>
        <p className='mb-3 mt-12 text-sm font-normal'>Portfolio colors</p>
        {/* Color Template boxes */}
        <div className='grid grid-cols-5 gap-1 sm:grid-cols-4 md:gap-2 lg:grid-cols-7 lg:gap-1'>
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
                value={selectedColor || '#000000'} // Default to black if no color is selected
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

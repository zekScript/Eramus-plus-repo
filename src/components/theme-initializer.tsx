'use client'
import { useEffect } from 'react'

const ThemeInitializer = () => {
  useEffect(() => {
    // Retrieve the saved theme color from localStorage
    const savedThemeColor = localStorage.getItem('themeColor')

    // Apply the theme color to the :root CSS variable
    document.documentElement.style.setProperty('--theme-color', savedThemeColor)
  }, [])

  return null
}

export default ThemeInitializer

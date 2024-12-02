'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure the component is mounted to avoid SSR issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={(isChecked) => setTheme(isChecked ? 'dark' : 'light')}
      >
        {theme === 'dark' ? (
          <Moon className="h-4 w-4 text-slate-300" />
        ) : (
          <Sun className="h-4 w-4 text-yellow-400" />
        )}
      </Switch>
    </div>
  )
}

export default ThemeToggle

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import ThemeInitializer from '@/components/theme-initializer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cal = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-cal',
})

export const metadata: Metadata = {
  title: 'My Armandas Portfolio',
  description: 'Supported By RoundedSQ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        // Adjust the body layout to your liking
        className={cn(
          'relative ml-7 mr-7 mt-52 min-h-screen bg-background font-sans antialiased',
          inter.variable,
          cal.variable
        )}
      >
        {/* Make theme colors work on root */}
        <ThemeInitializer />
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}

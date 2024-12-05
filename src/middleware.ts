import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/server/user' // Ensure this function returns a boolean (sync or awaitable)
import { cookies } from 'next/headers'
import Cookies from 'js-cookie'

// 1. Specify protected and public routes
const protectedRoutes = ['/admin', '/dashboard'] // Protected routes

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)

  console.log(`Path: ${path}`)
  console.log(`Is Protected: ${isProtectedRoute}`)

  // 3. Get the authToken from the cookies
  const cookie = Cookies.get('authToken')
  const token = cookie

  console.log(`Token Found: ${!!token}`)

  // 4. If the route is protected and there's no valid authToken, redirect to /login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 5. Verify the token if it exists
  if (token && !verifyToken(token)) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 6. If the route is public and the user is authenticated, redirect to /dashboard or another page
  if (
    token &&
    (await verifyToken(token)) &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'], // Avoid running on non-page routes (API, images, etc.)
}

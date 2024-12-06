import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './server/user'

// Define protected and public routes
const protectedRoutes = ['/dashboard', '/profile']

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)

  // Retrieve the JWT token from cookies
  const authToken = req.cookies.get('authToken')?.value

  // Verify the token (or set it to null if invalid)
  const session = authToken ? await verifyToken(authToken) : null

  // Redirect to /login if trying to access a protected route without authentication
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Redirect to /dashboard if accessing public routes while authenticated
  if (session && !req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Allow the request to proceed
  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')

  if (!authToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/profiles/:userid/support',
    '/profiles/:userid/settings/:path*',
    '/profiles/:userid/create',
    '/content/blogitems/:path*',
  ],
}

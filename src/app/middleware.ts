import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/server/user'

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get('authToken')
  const token = cookie?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const isValid = verifyToken(token)
  if (!isValid) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}
// "/dashboard/:path*", "/settings/:path*",
export const config = {
  matcher: ['/admin/:path*'],
}

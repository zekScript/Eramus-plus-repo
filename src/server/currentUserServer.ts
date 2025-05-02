import { UserItems } from '@/types'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function getCurrentUserServer() {
  const cookieStore = await cookies()
  const token = cookieStore.get('authToken')
  if (!token) return null

  try {
    const decoded = jwt.decode(token.value) as UserItems
    return decoded
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}
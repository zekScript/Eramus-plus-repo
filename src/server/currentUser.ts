import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import { UserItems } from '@/types'

export function getCurrentUser() {
  const token = Cookies.get('authToken')
  if (!token) return null

  try {
    const decoded = jwt.decode(token) as UserItems

    return decoded
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'

export function getCurrentUser() {
  const token = Cookies.get('authToken')
  if (!token) return null

  try {
    const decoded = jwt.decode(token) as {
      id: number
      email: string
      role: string
      name: string
      updatedAt: Date
      createdAt: Date
      friendsCount: number
      followersCount: number
      followingCount: number
      postsCount: number
      profilePic: string
      bio: string
    }

    return decoded
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

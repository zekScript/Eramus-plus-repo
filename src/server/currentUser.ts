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
      friendsCount: Number
      followersCount: Number
      followingCount: Number
      postsCount: Number
      profilePic: String
      bio: String
    }

    return decoded
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

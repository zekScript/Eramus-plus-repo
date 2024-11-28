'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '../actions/actions'
export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = await getCurrentUser()
        if (user && user.role === 'ADMIN') {
          setIsAdmin(true)
        } else {
          router.push('/login')
        }
      } catch (error) {
        router.push('/login')
      }
      setLoading(false)
    }

    checkAdmin()
  }, [router])

  if (loading) {
    return <p>Loading the Admin page...</p>
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
    </div>
  )
}

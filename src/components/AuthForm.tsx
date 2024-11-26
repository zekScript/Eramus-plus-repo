import React, { useState } from 'react'
import Profile from './profile'

const AuthForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent, path: string) => {
    e.preventDefault()

    const response = await fetch(`/api/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      const data = await response.json()
      setUser(data.user)
      setIsLoggedIn(true)
    } else {
      console.error(`${path} failed`)
    }
  }

  return (
    <div>
      {!isLoggedIn ? (
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit" onClick={(e) => handleSubmit(e, 'signup')}>
            Signup
          </button>
          <button type="submit" onClick={(e) => handleSubmit(e, 'login')}>
            Login
          </button>
        </form>
      ) : (
        <Profile user={user} />
      )}
    </div>
  )
}

export default AuthForm

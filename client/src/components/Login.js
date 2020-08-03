import React, { useState } from 'react'
import axios from 'axios'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleUserChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePassChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const login = async credientials => {
      const response = await axios.post('/api/login', credientials)
      return response.data
    }
    try {
      const user = await login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {user === null ?
        Login :
        <div>
          <p>Welcome {user.name}!</p>
        </div>
      }
      <form onSubmit={handleLogin}>
        <div>
          Username
        <input type="text" value={username} onChange={handleUserChange} />
        </div>
        <div>
          Password
        <input type="text" value={password} onChange={handlePassChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}
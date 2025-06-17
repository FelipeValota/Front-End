import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { setUser, setToken } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    const { data } = await axios.post('/api/auth/login', { email, password })
    setUser(data.user)
    setToken(data.token)
    navigate('/')
  }

  return (
    <form onSubmit={submit} className="p-4 max-w-sm mx-auto flex flex-col gap-2">
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2" />
      <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2" />
      <button className="bg-blue-500 text-white p-2">Entrar</button>
    </form>
  )
}

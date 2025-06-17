import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    await axios.post('/api/auth/register', { name, email, password })
    navigate('/login')
  }

  return (
    <form onSubmit={submit} className="p-4 max-w-sm mx-auto flex flex-col gap-2">
      <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} className="border p-2" />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2" />
      <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2" />
      <button className="bg-blue-500 text-white p-2">Cadastrar</button>
    </form>
  )
}

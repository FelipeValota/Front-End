import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext'

export default function AdminProducts() {
  const { token } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', price: 0 })

  useEffect(() => {
    axios.get('/api/products').then(res => setProducts(res.data))
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function save() {
    const { data } = await axios.post('/api/products', form, { headers: { Authorization: `Bearer ${token}` } })
    setProducts(p => [...p, data])
    setForm({ name: '', price: 0 })
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-2">Produtos</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nome" className="border p-2 mr-2" />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Preço" className="border p-2 mr-2" />
      <button onClick={save} className="bg-blue-500 text-white p-2">Salvar</button>
      <ul>
        {products.map(p => (
          <li key={p._id}>{p.name} - R$ {p.price}</li>
        ))}
      </ul>
    </div>
  )
}

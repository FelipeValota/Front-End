import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'

export default function Home() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const { add } = useContext(CartContext)

  useEffect(() => {
    const timeout = setTimeout(() => {
      axios.get(`/api/products?name=${search}`).then(res => setProducts(res.data))
    }, 300)
    return () => clearTimeout(timeout)
  }, [search])

  useEffect(() => { axios.get('/api/products').then(res => setProducts(res.data)) }, [])

  return (
    <div className="p-4">
      <input className="border p-2 mb-4 w-full" placeholder="Buscar" value={search} onChange={e => setSearch(e.target.value)} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="border p-4 flex flex-col">
            <Link to={`/product/${p._id}`} className="font-bold mb-2">{p.name}</Link>
            <span className="mb-2">R$ {p.price}</span>
            <button onClick={() => add(p)} className="bg-blue-500 text-white p-2 mt-auto">Adicionar</button>
          </div>
        ))}
      </div>
    </div>
  )
}

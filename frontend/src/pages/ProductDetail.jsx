import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { CartContext } from '../contexts/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { add } = useContext(CartContext)

  useEffect(() => { axios.get(`/api/products/${id}`).then(res => setProduct(res.data)) }, [id])

  if (!product) return <p>Carregando...</p>

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-2">{product.name}</h2>
      <p className="mb-2">{product.description}</p>
      <p className="mb-2">R$ {product.price}</p>
      <button onClick={() => add(product)} className="bg-blue-500 text-white p-2">Adicionar ao carrinho</button>
    </div>
  )
}

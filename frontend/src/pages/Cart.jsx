import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cart, remove, clear } = useContext(CartContext)
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Carrinho</h2>
      {cart.map(i => (
        <div key={i._id} className="flex justify-between mb-2">
          <span>{i.name} x {i.qty}</span>
          <span>R$ {i.price}</span>
          <button onClick={() => remove(i._id)}>Remover</button>
        </div>
      ))}
      <p className="font-bold">Total: R$ {total}</p>
      <div className="mt-4">
        <button onClick={clear} className="mr-4">Limpar</button>
        <Link to="/checkout" className="bg-green-500 text-white p-2">Finalizar</Link>
      </div>
    </div>
  )
}

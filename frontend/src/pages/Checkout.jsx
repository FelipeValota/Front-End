import { useContext } from 'react'
import axios from 'axios'
import { CartContext } from '../contexts/CartContext'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Checkout() {
  const { cart, clear } = useContext(CartContext)
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  async function finish() {
    try {
      await axios.post('/api/orders', { items: cart.map(i => ({ product: i._id, quantity: i.qty })) }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Pedido realizado!')
      clear()
      navigate('/orders')
    } catch (e) {
      toast.error('Erro ao finalizar')
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-2">Pagamento</h2>
      <button onClick={finish} className="bg-blue-500 text-white p-2">Pagar</button>
    </div>
  )
}

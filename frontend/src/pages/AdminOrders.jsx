import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext'

export default function AdminOrders() {
  const { token } = useContext(AuthContext)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios.get('/api/orders', { headers: { Authorization: `Bearer ${token}` } }).then(res => setOrders(res.data))
  }, [token])

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-2">Pedidos</h2>
      {orders.map(o => (
        <div key={o._id} className="mb-2 border p-2">
          <p>Usuário: {o.user?.name}</p>
          <p>Status: {o.status}</p>
          <p>Total: R$ {o.totalPrice}</p>
        </div>
      ))}
    </div>
  )
}

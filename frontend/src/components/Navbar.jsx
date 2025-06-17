import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { AuthContext } from '../contexts/AuthContext'

export default function Navbar() {
  const { cart } = useContext(CartContext)
  const { user, setUser, setToken } = useContext(AuthContext)

  function logout() {
    setUser(null)
    setToken(null)
  }

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4">Loja</Link>
        {user?.isAdmin && (
          <>
            <Link to="/admin/products" className="mr-4">Produtos</Link>
            <Link to="/admin/orders" className="mr-4">Pedidos</Link>
          </>
        )}
      </div>
      <div>
        <Link to="/cart" className="mr-4">Carrinho ({cart.length})</Link>
        {user ? (
          <>
            <Link to="/orders" className="mr-4">Meus Pedidos</Link>
            <button onClick={logout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Entrar</Link>
            <Link to="/register" className="mr-4">Cadastrar</Link>
          </>
        )}
      </div>
    </nav>
  )
}

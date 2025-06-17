import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const add = (product) => {
    setCart((c) => {
      const exists = c.find((i) => i._id === product._id)
      if (exists) return c.map((i) => (i._id === product._id ? { ...i, qty: i.qty + 1 } : i))
      return [...c, { ...product, qty: 1 }]
    })
  }

  const remove = (id) => {
    setCart((c) => c.filter((i) => i._id !== id))
  }

  const clear = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  )
}

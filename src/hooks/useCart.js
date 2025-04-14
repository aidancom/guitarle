import { useState, useEffect, useMemo } from "react"
import { db as dataGuitar } from "../data/db"

export const useCart = () => {


  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(dataGuitar)
  const [cart, setCart] = useState(initialCart)

  const year = new Date().getFullYear()

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart])

  function incrementQuantity (guitar) {
    setCart(cart.map(item => item.id === guitar.id ? {...item, quantity: item.quantity + 1} : item))
  }

  function decrementQuantity (guitar) {
    const updatedCart = cart.map(item => {
      if(item.id === guitar.id) {
        if(item.quantity > 1) {
          return {...item, quantity: item.quantity - 1}
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function removeItem(guitar) {
    setCart(cart.filter(item => item.id !== guitar.id))
  }
  
  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExists < 0) {
      const itemQuantity = {...item, quantity: 1}
      setCart(itemQuantity)
    } else {
      const itemQuantityUpdate = [...cart]
      itemQuantityUpdate[itemExists].quantity++
      setCart(itemQuantityUpdate)
    }

  }
  return {
    addToCart,
    removeItem,
    cart,
    setCart,
    incrementQuantity,
    decrementQuantity,
    cartTotal,
    data,
    year
  }
}
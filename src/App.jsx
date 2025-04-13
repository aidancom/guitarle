import Header from "./components/Header"
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"
import { useState, useEffect } from "react"
import { db as dataGuitar } from "./data/db"

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(dataGuitar)
  const [cart, setCart] = useState(initialCart)


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  
  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExists < 0) {
      item.quantity = 1
      setCart([...cart, item])
    } else {
      const itemQuantityUpdate = [...cart]
      itemQuantityUpdate[itemExists].quantity++
      setCart(itemQuantityUpdate)
    }

  }

  const year = new Date().getFullYear()
  
  return (
    <>
      <Header cart={cart} setCart={setCart}/>
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>
          <div className="row mt-5">
            {data.map(data => {
               return <Guitar key={data.id} data={data} addToCart={addToCart}/>
            })}
          </div>
      </main>
      <Footer year={year}/>
    </>
  )
}

export default App


import Header from "./components/Header"
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"
import { useCart } from "./hooks/useCart"

function App() {

  const {addToCart, removeItem, incrementQuantity, decrementQuantity, cartTotal, data, year, cart, setCart} = useCart()
 
  return (
    <>
      <Header cart={cart} setCart={setCart} decrementQuantity={decrementQuantity} removeItem={removeItem} incrementQuantity={incrementQuantity} cartTotal={cartTotal}/>
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


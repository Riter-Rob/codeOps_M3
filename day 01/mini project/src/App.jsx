import './App.css'
import Header from './components/Header'
import Dish from './components/Dish'

const dishes = [
  { id: 1, name: 'Doro Wat', price: 240 },
  { id: 2, name: 'Kitfo', price: 280 },
  { id: 3, name: 'Tibs', price: 220 },
  { id: 4, name: 'Shiro', price: 150 },
  { id: 5, name: 'Beyainatu', price: 180 },
]

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <h2>Today's Menu</h2>
        <p>Welcome! Here are our dishes for today.</p>
        <section className="dish-list">
          {dishes.map((dish) => (
            <Dish key={dish.id} name={dish.name} price={dish.price} />
          ))}
        </section>
      </main>
    </div>
  )
}

export default App

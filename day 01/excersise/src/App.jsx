import './App.css'
import Header from './components/Header'
import Dish from './components/dish'
const dishes = [
  { id: 1, name: 'Pizza', price: 12 },
  { id: 2, name: 'Burger', price: 10 },
  { id: 3, name: 'Salad', price: 8 },
]

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <h2>Today's Dish</h2>
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

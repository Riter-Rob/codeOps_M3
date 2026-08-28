import './App.css'
import Header from './components/Header'
import Dish from './components/Dish'
import Card from './components/Card'

const dishes = [
  { id: 1, name: 'doro', price: 450, category: 'Main', spicy: true },
  { id: 2, name: 'shiro', price: 320, category: 'Main', spicy: false },
  { id: 3, name: 'Amboweha', price: 250, category: 'beverage', spicy: false },
]

function Menu({ items, category }) {
  const filtered = items.filter((dish) => dish.category === category)

  if (filtered.length === 0) {
    return <p className="empty-state">No dishes found in "{category}" yet.</p>
  }

  return (
    <section className="dish-list">
      {filtered.map((dish) => (
        <Card key={dish.id}>
          <Dish name={dish.name} price={dish.price} spicy={dish.spicy} />
        </Card>
      ))}
    </section>
  )
}

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <h2>Main Dishes</h2>
        <Menu items={dishes} category="Main" />  

        <h2>Desserts</h2>
        <Menu items={dishes} category="Dessert" />
        <h2>Beverages</h2>
        <Menu items={dishes} category="beverage" />
      </main>
    </div>
  )
}

export default App

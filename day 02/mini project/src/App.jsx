import './App.css'
import Header from './components/Header'
import Menu from './components/Menu'
import dishes from './data'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <h2>Main Dishes</h2>
        <Menu items={dishes} category="Main" />

        <h2>Starters</h2>
        <Menu items={dishes} category="Starter" />

        <h2>Desserts</h2>
        <Menu items={dishes} category="Dessert" />

        <h2>Specials</h2>
        <Menu items={dishes} category="Special" />
      </main>
    </div>
  )
}

export default App

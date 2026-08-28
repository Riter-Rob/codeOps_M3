import PropTypes from 'prop-types'
import Dish from './Dish'
import Card from './Card'

function Menu({ items, category }) {
  const filtered = items.filter((dish) => dish.category === category)

  if (filtered.length === 0) {
    return <p className="empty-state">No dishes found in "{category}" yet.</p>
  }

  return (
    <section className="menu">
      {filtered.map((dish) => (
        <Card key={dish.id}>
          <Dish name={dish.name} price={dish.price} spicy={dish.spicy} />
        </Card>
      ))}
    </section>
  )
}

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool,
    }),
  ).isRequired,
  category: PropTypes.string.isRequired,
}

export default Menu

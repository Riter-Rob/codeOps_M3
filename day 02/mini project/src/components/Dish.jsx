import PropTypes from 'prop-types'

function Dish({ name, price, currency = 'ETB', spicy = false }) {
  return (
    <article className="dish">
      <h3>
        {name} {Boolean(spicy) && <span className="badge"> Spicy</span>}
      </h3>
      <p>
        {price} {currency}
      </p>
    </article>
  )
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
}

export default Dish

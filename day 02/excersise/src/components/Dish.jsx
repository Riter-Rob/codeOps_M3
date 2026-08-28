import PropTypes from 'prop-types'

function Dish({ name, price, spicy, currency = 'ETB' }) {
  return (
    <article className="dish">
      <div>
        <h2>
          {name} {Boolean(spicy) && <span className="badge">Spicy</span>}
        </h2>
        <p>
          Price: {price} {currency}
        </p>
      </div>
    </article>
  )
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
}

export default Dish

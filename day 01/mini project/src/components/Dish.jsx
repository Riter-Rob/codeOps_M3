function Dish({ name, price }) {
  return (
    <article className="dish">
      <h3>{name}</h3>
      <p>{price} ETB</p>
    </article>
  )
}

export default Dish

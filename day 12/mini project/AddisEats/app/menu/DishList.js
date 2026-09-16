async function getDishes() {
  await new Promise((r) => setTimeout(r, 2000));
  return ["Tibse", "Kitfo", "Beyaynetu"];
}

export default async function DishList() {
  const dishes = await getDishes();

  return (
    <div>
      <h2>Available Dishes</h2>
      <ul>
        {dishes.map((dish) => (
          <li key={dish}>{dish}</li>
        ))}
      </ul>
    </div>
  );
}
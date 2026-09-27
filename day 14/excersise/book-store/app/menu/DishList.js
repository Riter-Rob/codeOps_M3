async function getDishes() {
  return [
    { id: "1", name: "Shiro" },
    { id: "2", name: "cake" },
    { id: "3", name: "Pasta" },
  ];
}

export default async function DishList() {
  const dishes = await getDishes();

  return (
    <div>
      <h2>Available Dishes</h2>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>{dish.name}</li>
        ))}
      </ul>
    </div>
  );
}
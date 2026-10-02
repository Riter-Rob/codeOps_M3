const dishes = [
  {
    id: 1,
    name: "Kitfo",
    price: 350,
    category: "traditional",
    description: "A traditional Ethiopian dish made with minced beef."
  },
  {
    id: 2,
    name: "Doro Wot",
    price: 400,
    category: "traditional",
    description: "A spicy Ethiopian chicken stew served with injera."
  },
  {
    id: 3,
    name: "Shiro",
    price: 250,
    category: "vegetarian",
    description: "A smooth and flavorful chickpea stew."
  },
  {
    id: 4,
    name: "Chechebsa",
    price: 220,
    category: "traditional",
    description: "Pieces of flatbread mixed with spiced butter."
  }
];

export async function getDishes() {
  return dishes;
}

export async function getDishById(id) {
  return dishes.find((dish) => dish.id === Number(id));
}

export default dishes;

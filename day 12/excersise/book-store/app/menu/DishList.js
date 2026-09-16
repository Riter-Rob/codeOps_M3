async function getBooks() {
  await new Promise((r) => setTimeout(r, 2000));
  return ["Book 1", "Book 2", "Book 3"];
}

export default async function DishList() {
  const books = await getBooks();

  return (
    <div>
      <h2>Available Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book}>{book}</li>
        ))}
      </ul>
    </div>
  );
}
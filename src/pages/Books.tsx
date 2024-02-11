import { useState, useEffect } from "react";
import { useFirestore } from "../context/dbContext";
import { Book } from "../interfaces/book";
import BookList from "../components/BookList";


export default function Books() {
  const { getBooks } = useFirestore();
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    if (!getBooks) return;
    const bookList = await getBooks() as Book[];
    setBooks(bookList);
  }

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='min-h-screen'>
        <BookList books={books} />
    </section>
  )
}

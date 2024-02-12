import { useState, useEffect } from "react";
import { Book } from "../interfaces/book";
import BookList from "../components/BookList";
import { useAuth } from "../context/authContext";
import { useFirestore } from "../context/dbContext";


export default function MyBooks() {
  const { getMyBooks } = useFirestore();
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    if (!getMyBooks || !user) return;
    const bookList = await getMyBooks(user.uid) as Book[];
    setBooks(bookList);
  }

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='min-h-screen'>
      <h1 className='text-xl mx-5 mb-10 mt-1'>My Books</h1>
      <BookList flag={false} books={books} />
    </section>
  )
}

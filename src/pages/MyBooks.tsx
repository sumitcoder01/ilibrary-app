import { useState, useEffect } from "react";
import { Book } from "../interfaces/book";
import BookList from "../components/BookList";
import { useAuth } from "../context/authContext";
import { useFirestore } from "../context/dbContext";
import Spinner from "../components/spinner/Spinner";


export default function MyBooks() {
  const { getMyBooks } = useFirestore();
  const [loading,setLoading]=useState<boolean>(true);
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    if (!getMyBooks || !user) return;
    const bookList = await getMyBooks(user.uid) as Book[];
    setBooks(bookList);
    setLoading(false);
  }

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='min-h-screen'>
      <h1 className='text-xl mx-5 mb-10 mt-1'>My Books</h1>
      {!loading ? <BookList flag={false} books={books} /> : <Spinner/>}
    </section>
  )
}

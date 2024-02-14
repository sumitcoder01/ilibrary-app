import { useState, useEffect } from "react";
import { useFirestore } from "../context/dbContext";
import { Book } from "../interfaces/book";
import BookList from "../components/BookList";
import { useAuth } from "../context/authContext";
import Spinner from "../components/spinner/Spinner";


export default function Books() {
  const { getBooks } = useFirestore();
  const [loading,setLoading]=useState<boolean>(true);
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    if (!getBooks) return;
    let bookList = await getBooks() as Book[];
    if (user) {
      bookList = bookList.filter(book => user.uid !== book.sellerId)
    }
    setBooks(bookList);
    setLoading(false);
  }

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='min-h-screen'>
      <h1 className='text-xl mx-5 mb-10 mt-1'>Top Books in Store</h1>
      {!loading ? <BookList flag={true} books={books} /> : <Spinner/>}
    </section>
  )
}

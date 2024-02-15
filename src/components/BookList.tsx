import { Book } from "../interfaces/book";
import BookCard from "./BookCard";

export default function BookList({ books, flag, deleteBook, updateBook }: { books: Book[], flag: boolean, deleteBook: (id: string) => void, updateBook: (book: Book) => void }) {
    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                    <div key={book.id}>
                        <BookCard flag={flag} deleteBook={deleteBook} updateBook={updateBook} book={book} />
                    </div>
                ))}
            </div>
            {books.length === 0 && <div className="text-center text-lg">Sorry! No Books in Store</div>}
        </div>
    )
}

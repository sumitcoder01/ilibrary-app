import { Book } from "../interfaces/book";
import BookCard from "./BookCard";

export default function BookList({ books }: { books: Book[] }) {
    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                    <div key={book.id}>
                        <BookCard book={book} />
                    </div>
                ))}
            </div>
        </div>
    )
}

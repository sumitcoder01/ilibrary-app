import { ChangeEvent, FormEvent, useState } from "react";
import { Book } from "../../../interfaces/book";
import { IoMdSend } from "react-icons/io";
import { useFirestore } from "../../../context/dbContext";

export default function UpdateBook({ book, onClose }: { book: Book, onClose: () => void }) {
  const {updateBook} =useFirestore();
  const [image, setImage] = useState<File | null>(null);
  const [currentBook, setCurrentBook] = useState<Book>(book);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.type === "file") {
        const fileInput = e.target as HTMLInputElement;
        const file = fileInput.files ? fileInput.files[0] : null;
        setImage(file);
    } else {
      setCurrentBook({ ...currentBook, [e.target.name]: e.target.value });
    }
};

const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {id,title,description,author,isbn,price,imageUrl} = currentBook;
    if(updateBook)
         updateBook(id,title,author,description,Number(price),Number(isbn),image,imageUrl);
    onClose();
};
  return (
    <div className="flex flex-col justify-center">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-1 text-center text-lg font-bold text-gray-800">
            Update Book
        </h2>
    </div>

    <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-2" onSubmit={handleOnSubmit}>
            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Title
                </label>
                <div className="mt-1">
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter title"
                        required
                        minLength={3}
                        value={currentBook.title}
                        onChange={handleOnChange}
                        className="block px-4 py-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
            </div>
            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Description
                </label>
                <div className="mt-1">
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter description"
                        required
                        value={currentBook.description}
                        onChange={handleOnChange}
                        className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
            </div>
            <div>
                <label
                    htmlFor="author"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Author
                </label>
                <div className="mt-1">
                    <input
                        id="author"
                        name="author"
                        type="text"
                        placeholder="Enter author"
                        required
                        minLength={4}
                        value={currentBook.author}
                        onChange={handleOnChange}
                        className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <div>
                <label
                    htmlFor="isbn"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Isbn
                </label>
                <div className="mt-1">
                    <input
                        id="isbn"
                        name="isbn"
                        type="number"
                        placeholder="Enter isbn"
                        required
                        value={currentBook.isbn}
                        onChange={handleOnChange}
                        className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
            </div>
            <div>
                <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Price
                </label>
                <div className="mt-1">
                    <input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Enter price"
                        required
                        value={currentBook.price}
                        onChange={handleOnChange}
                        className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
            </div>
            </div>
            <div>
                <label
                    htmlFor="coverPic"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    coverPic
                </label>
                <div className="mt-1">
                    <input
                        id="coverPic"
                        name="coverPic"
                        type="file"
                        accept="image/*"
                        onChange={handleOnChange}
                        className="block w-full px-4 py-3 rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                    <IoMdSend className="mr-2" /> Update
                </button>
            </div>
        </form>
    </div>
</div>
  )
}

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import Logo from "../assets/library-logo.svg";
import { useAuth } from "../context/authContext";
import { useFirestore } from "../context/dbContext";

export default function AddBook() {
  const { addBook } = useFirestore()
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    isbn: "",
    author: "",
    coverPic: null,
  });

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files ? fileInput.files[0] : null;
      setFormData({ ...formData, [e.target.name]: file });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, author, price, isbn, coverPic } = formData;
    const sellerId = user ? user.uid : "";
    if (addBook && coverPic)
      addBook(title, description, author, sellerId, Number(price), Number(isbn), coverPic);
    
    resetFileInput();

    setFormData({
      title: "",
      description: "",
      price: "",
      isbn: "",
      author: "",
      coverPic: null,
    });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-10" src={Logo} alt="ILibrary" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add book for sell
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleOnSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter book title"
                required
                minLength={4}
                value={formData.title}
                onChange={handleOnChange}
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 px-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                placeholder="Enter book description"
                required
                value={formData.description}
                onChange={handleOnChange}
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 px-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
            {formData.description.length !== 0 && formData.description.length < 3 &&
              <div className="mt-3 mb-1 text-center text-xs text-red-700">Description must be greater then 3</div>
            }
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              ₹ Price
            </label>
            <div className="mt-2">
              <input
                id="price"
                name="price"
                type="number"
                placeholder="Enter book price"
                required
                value={formData.price}
                onChange={handleOnChange}
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 px-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="isbn"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Isbn
            </label>
            <div className="mt-2">
              <input
                id="isbn"
                name="isbn"
                type="number"
                placeholder="Enter book isbn"
                required
                value={formData.isbn}
                onChange={handleOnChange}
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 px-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
            <div className="mt-2">
              <input
                id="author"
                name="author"
                type="text"
                placeholder="Enter book author name"
                required
                minLength={4}
                value={formData.author}
                onChange={handleOnChange}
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 px-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="coverPic"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              CoverPic
            </label>
            <div className="mt-2">
              <input
                id="coverPic"
                name="coverPic"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                required
                onChange={handleOnChange}
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={formData.description.length < 3}
              className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
            >
              <IoMdSend className="mr-2" /> Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


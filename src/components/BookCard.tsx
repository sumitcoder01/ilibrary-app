import { useEffect, useState } from "react";
import { useFirestore } from "../context/dbContext";
import { Book } from "../interfaces/book";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "./modal/Modal";
import UpdateBook from "./modal/updateBook/UpdateBook";
import DeleteBook from "./modal/deleteBook/DeleteBook";

export default function BookCard({ book, flag }: { book: Book, flag: boolean }) {
    const navigate = useNavigate();
    const [updateShow, setUpdateShow] = useState<boolean>(false);
    const [deleteShow, setDeleteShow] = useState<boolean>(false);
    const { getImageUrl, placeOrder } = useFirestore();
    const { user } = useAuth();
    const [url, setUrl] = useState<string>("");
    const { title, description, author, price, imageUrl } = book;

    const fetchImage = async () => {
        if (!getImageUrl) return;
        const res: string = await getImageUrl(imageUrl);
        setUrl(res);
    }
    const handleOnBuy = () => {
        if (!placeOrder || !user) {
            toast.error('error! Login First');
            navigate('/login');
            return;
        }
        placeOrder(user, book);
    }

    const toggalUpdateModal = () => {
        setUpdateShow(!updateShow);
    }

    const toggalDeleteModal = () => {
        setDeleteShow(!deleteShow);
    }

    const viewOrders = () => {
        navigate(`/orders/order/${book.id}`);
    }
    useEffect(() => {
        fetchImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="max-w-sm md:mx-0 mx-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden transform transition duration-300 ease-in-out hover:scale-105">
                <img className="rounded-t-lg object-fill w-full h-56" src={url} alt={title} />
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
                    <p className="mb-1 font-medium text-gray-700 dark:text-gray-400">Author: {author}</p>
                    <p className="mb-1 font-medium text-gray-700 dark:text-gray-400">Price: ₹{price}</p>
                    <button onClick={flag ? handleOnBuy : viewOrders} className="inline-flex mt-3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {flag ? "Buy Now" : "View Orders"}
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                    {!flag && <div className="flex flex-start gap-3 mt-2 mb-1">
                        <button onClick={toggalUpdateModal} className="inline-flex mt-3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Update
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                        <button onClick={toggalDeleteModal} className="inline-flex mt-3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Delete
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>

                    </div>}
                </div>
            </div>
            {updateShow && book && <Modal onClose={toggalUpdateModal}><UpdateBook book={book} onClose={toggalUpdateModal} /></Modal>}
            {deleteShow && book && <Modal onClose={toggalDeleteModal}><DeleteBook bookId={book.id} imageUrl={book.imageUrl} onClose={toggalDeleteModal} /></Modal>}
        </div>
    );
}


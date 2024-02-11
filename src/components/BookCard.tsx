import { useEffect, useState } from "react";
import { useFirestore } from "../context/dbContext";
import { Book } from "../interfaces/book";

export default function BookCard({ book }: { book: Book }) {
    const { getImageUrl } = useFirestore();
    const [url, setUrl] = useState<string>("");
    const { title, description, author, price, imageUrl } = book;

    const fetchImage = async () => {
        if (!getImageUrl) return;
        const res: string = await getImageUrl(imageUrl);
        setUrl(res);
    }

    useEffect(() => {
        fetchImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="max-w-sm md:mx-0 mx-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden transform transition duration-300 ease-in-out hover:scale-105">
            <img className="rounded-t-lg object-fill w-full h-56" src={url} alt={title} />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
                <p className="mb-1 font-medium text-gray-700 dark:text-gray-400">Author: {author}</p>
                <p className="mb-1 font-medium text-gray-700 dark:text-gray-400">Price: ₹{price}</p>
                <button className="inline-flex mt-3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Buy Now
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </div>
    );
}


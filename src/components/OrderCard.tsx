import { Order } from "../interfaces/order";
import { useState, useEffect } from "react";
import { useFirestore } from "../context/dbContext";

export default function OrderCard({ order }: { order: Order }) {
    const { getImageUrl } = useFirestore();
    const [url, setUrl] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const { book, status, order_at } = order;
    const { title, author, price, imageUrl } = book;

    const fetchImage = async () => {
        if (!getImageUrl) return;
        const res: string = await getImageUrl(imageUrl);
        setUrl(res);
    }

    const formattedDate = () => {
        const milliseconds = order_at.seconds * 1000 + Math.floor(order_at.nanoseconds / 1e6);
        const date = new Date(milliseconds);
        const formattedDate = date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' });
        setDate(formattedDate);
    }
    useEffect(() => {
        formattedDate();
        fetchImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="relative flex flex-col mt-6 text-gray-700 bg-[#f9f8f8] shadow-md bg-clip-border rounded-xl w-80">
            <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                <img src={url} alt={title} className="object-fill w-full h-56" />
            </div>
            <div className="p-6">
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {title}
                </h5>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    By <span>{author}</span>
                </p>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    Price: ₹<span>{price}</span>
                </p>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    Status: <span className={`${status !== "Pending" ? "text-green-500" : "text-yellow-500"}`}>{status}</span>
                </p>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    Order Date: <span>{date}</span>
                </p>
            </div>
        </div>
    )
}

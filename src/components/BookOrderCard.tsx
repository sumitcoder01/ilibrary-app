import { useState, useEffect } from "react";
import { imageUrl } from "../constants/constant";
import { OrderDetail } from "../interfaces/order";

export default function BookOrderCard({ orderDetail }: { orderDetail: OrderDetail }) {
  const { displayName, email, photoUrl, status, order_at } = orderDetail
  const [date, setDate] = useState<string>("");
  const formattedDate = () => {
    const milliseconds = order_at.seconds * 1000 + Math.floor(order_at.nanoseconds / 1e6);
    const date = new Date(milliseconds);
    const formattedDate = date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' });
    setDate(formattedDate);
  }

  useEffect(() => {
    formattedDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="py-8 flex flex-wrap md:flex-nowrap items-center">
      <div className="md:w-1/4 md:text-center">
        <img className="w-24 h-24 rounded-full object-cover mx-auto" src={photoUrl ? photoUrl : imageUrl} alt={displayName} />
      </div>
      <div className="md:w-3/4 md:pl-8">
        <h2 className="text-xl font-medium text-gray-900 title-font mb-2">{displayName}</h2>
        <p className="text-md font-medium text-gray-900 mb-2">{email}</p>
        <p className={`text-md font-medium ${status === "Pending" ? "text-yellow-500" : "text-green-500"} mb-2`}>{status}</p>
        <p className="text-sm font-medium text-gray-900 title-font mb-2">Order at: <span>{date}</span> </p>
      </div>
    </div>
  )
}

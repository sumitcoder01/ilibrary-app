import { useState, useEffect } from "react";
import { imageUrl } from "../constants/constant";
import { OrderDetail } from "../interfaces/order";
import UpdateOrder from "./modal/updateOrder/UpdateOrder";
import Modal from "./modal/Modal";

export default function BookOrderCard({ orderDetail, updateOrder }: { orderDetail: OrderDetail, updateOrder: (id: string, status: string)=>void }) {
  const [show, setShow] = useState<boolean>(false);
  const { displayName, email, photoUrl, status, order_at } = orderDetail;
  const [date, setDate] = useState<string>("");

  const formattedDate = () => {
    const milliseconds = order_at.seconds * 1000 + Math.floor(order_at.nanoseconds / 1e6);
    const date = new Date(milliseconds);
    const formattedDate = date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' });
    setDate(formattedDate);
  }
  const toggalModal = () => {
    setShow(!show);
  }

  useEffect(() => {
    formattedDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="py-8 flex flex-wrap md:flex-nowrap items-center">
        <div className="md:w-1/4 md:text-center">
          <img className="w-24 h-24 rounded-full object-cover mx-auto" src={photoUrl ? photoUrl : imageUrl} alt={displayName} />
        </div>
        <div className="md:w-3/4 md:pl-8">
          <h2 className="text-xl font-medium text-gray-900 title-font mb-2">{displayName}</h2>
          <p className="text-md font-medium text-gray-900 mb-2">{email}</p>
          <p className={`text-md font-medium ${status === "Pending" ? "text-yellow-500" : status == "Cancelled" ? "text-red-500" : "text-green-500"} mb-2`}>{status}</p>
          <p className="text-sm font-medium text-gray-900 title-font mb-2">Order at: <span>{date}</span> </p>
          <button onClick={toggalModal} className="inline-flex mt-3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Update
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        </div>
      </div>
      {show && orderDetail && <Modal onClose={toggalModal}><UpdateOrder id={orderDetail.id} orderId={orderDetail.orderId} status={orderDetail.status} onClose={toggalModal} updateOrder={updateOrder} /></Modal>}
    </div>
  )
}

import { OrderDetail } from "../interfaces/order";
import BookOrderCard from "./BookOrderCard";

export default function BookOrderList({ orderDetails }: { orderDetails: OrderDetail[] }) {

  return (
    <div className="container px-5 py-12 mx-auto">
      <div className="-my-8 divide-y-2 divide-gray-100">
        {orderDetails.map(orderDetail => (
          <BookOrderCard key={orderDetail.id} orderDetail={orderDetail} />
        ))}
      </div>
      {orderDetails.length === 0 && <div className="text-center text-lg">No Order yet!</div>}
    </div>
  )
}

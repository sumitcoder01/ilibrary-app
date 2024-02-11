import { Order } from "../interfaces/order";
import OrderCard from "./OrderCard";


export default function OrderList({ orders }: { orders: Order[] }) {
    return (
        <div className="container mx-auto py-1">
            <div className="flex flex-wrap lg:justify-start mb-3 md:gap-2 lg:gap-6 justify-center">
                {orders.map((order) => (
                    <div className="mb-3" key={order.id}>
                        <OrderCard order={order} />
                    </div>
                ))}
            </div>
        </div>
    )
}

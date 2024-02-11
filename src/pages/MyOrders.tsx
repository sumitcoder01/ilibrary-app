import { useState, useEffect } from "react";
import OrderList from "../components/OrderList";
import { useAuth } from "../context/authContext";
import { useFirestore } from "../context/dbContext";
import { Order } from "../interfaces/order";


export default function MyOrders() {
  const { getMyOrders } = useFirestore();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    if (!getMyOrders || !user) return;
    const orderList = await getMyOrders(user.uid) as Order[];
    setOrders(orderList);
  }

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className='min-h-screen'>
      <OrderList orders={orders} />
    </section>
  )
}

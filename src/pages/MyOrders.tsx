import { useState, useEffect } from "react";
import OrderList from "../components/OrderList";
import { useAuth } from "../context/authContext";
import { useFirestore } from "../context/dbContext";
import { Order } from "../interfaces/order";
import Spinner from "../components/spinner/Spinner";


export default function MyOrders() {
  const { getMyOrders } = useFirestore();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading,setLoading]=useState<boolean>(true);

  const fetchOrders = async () => {
    if (!getMyOrders || !user) return;
    const orderList = await getMyOrders(user.uid) as Order[];
    setOrders(orderList);
    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className='min-h-screen'>
      <h1 className='text-xl mx-5 mb-10 mt-1'>My Orders</h1>
      {!loading ? <OrderList orders={orders} /> : <Spinner/>}
    </section>
  )
}

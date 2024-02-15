import { useParams } from "react-router-dom";
import { OrderDetail } from "../interfaces/order";
import { useEffect, useState } from "react";
import { useFirestore } from "../context/dbContext";
import BookOrderList from "../components/BookOrderList";
import Spinner from "../components/spinner/Spinner";

export default function ViewOrders() {
  const { getBookOrders } = useFirestore();
  const { bookId } = useParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = async () => {
    if (!getBookOrders || !bookId) return;
    const orderList = await getBookOrders(bookId) as OrderDetail[];
    setOrderDetails(orderList);
    setLoading(false);
  }

  const updateOrder = (id: string, status: string) => {
    const updatedordersList = orderDetails.map(order => {
      if (order.id === id) {
        return { ...order, status };
      }
      return order;
    });
    setOrderDetails(updatedordersList);
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <h1 className='text-xl mx-5 mb-10 mt-1'>Book Orders</h1>
      {!loading ? < BookOrderList orderDetails={orderDetails} updateOrder={updateOrder} /> : <Spinner />}
    </section>
  );
}
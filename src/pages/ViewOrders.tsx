import { useParams } from "react-router-dom";
import { OrderDetail } from "../interfaces/order";
import { useEffect, useState } from "react";
import { useFirestore } from "../context/dbContext";
import BookOrderList from "../components/BookOrderList";

export default function ViewOrders() {
  const { getBookOrders } = useFirestore();
  const { bookId } = useParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

  const fetchOrders = async () => {
    if (!getBookOrders || !bookId) return;
    const orderList = await getBookOrders(bookId) as OrderDetail[];
    setOrderDetails(orderList);
  }

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      < BookOrderList orderDetails={orderDetails} />
    </section>
  );
}
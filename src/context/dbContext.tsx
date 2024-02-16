import { app } from "../firebase";
import { useContext, useState, useEffect, createContext, ReactNode } from "react";
import { toast } from "react-toastify";
import { addDoc, collection, getFirestore, getDocs, query, where, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, list, ref, uploadBytes } from "firebase/storage";
import { Book } from "../interfaces/book";
import { User } from "firebase/auth";
import { Order, OrderDetail } from "../interfaces/order";


const DbContext = createContext<{
    addBook?: (title: string, description: string, author: string, sellerId: string, price: number, isbn: number, coverPic: File) => Promise<void>;
    getBooks?: () => Promise<Book[]>;
    getImageUrl?: (path: string) => Promise<string>;
    saveContact?: (name: string, email: string, phoneNumber: string, address: string, message: string) => Promise<void>;
    placeOrder?: (user: User, book: Book) => Promise<void>;
    getMyOrders?: (userId: string) => Promise<Order[]>;
    getBookOrders?: (bookId: string) => Promise<OrderDetail[]>;
    getMyBooks?: (userId: string) => Promise<Book[]>;
    getImages?: () => Promise<string[]>;
    deleteBook?: (bookId: string, imageUrl: string) => Promise<void>;
    updateBook?: (id: string, title: string, author: string, description: string, price: number, isbn: number, coverPic: File | null, imageUrl: string) => Promise<string>;
    updateBookOrder?: (id: string, orderId: string, status: string) => Promise<void>;
}>({});


// eslint-disable-next-line react-refresh/only-export-components
export const useFirestore = () => useContext(DbContext);

export function DbProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true);
    const firestore = getFirestore(app);
    const storage = getStorage(app);

    const addBook = async (title: string, description: string, author: string, sellerId: string, price: number, isbn: number, coverPic: File): Promise<void> => {
        try {
            const imgaeRef = ref(storage, `uploads/images/books/${Date.now()}-${coverPic.name}`);
            const uploadResult = await uploadBytes(imgaeRef, coverPic);
            await addDoc(collection(firestore, 'books'), {
                title,
                description,
                author,
                sellerId,
                price,
                isbn,
                imageUrl: uploadResult.ref.fullPath
            });
            toast.success('success! book added successfully');
        } catch (error) {
            toast.error('sorry! Error adding books:');
            console.log(error);
        }

    }
    const getBooks = async (): Promise<Book[]> => {
        const booksList: Book[] = [];
        try {
            const booksSnapshot = await getDocs(collection(firestore, "books"));
            booksSnapshot.forEach(doc => {
                booksList.push({ id: doc.id, ...doc.data() } as Book);
            });
        } catch (error) {
            toast.error("sorry! Error fetching books:");
            console.log("Error fetching books:", error);
        }
        return booksList;
    };

    const getImageUrl = (path: string): Promise<string> => {
        return getDownloadURL(ref(storage, path));
    }

    const saveContact = async (name: string, email: string, phoneNumber: string, address: string, message: string): Promise<void> => {
        try {
            await addDoc(collection(firestore, 'contact-us'), {
                name,
                email,
                phoneNumber,
                address,
                message
            });
            toast.success('success! contact added successfully');
        } catch (error) {
            toast.error('sorry! Error adding contact:');
            console.log(error);
        }
    }

    const placeOrder = async (user: User, book: Book): Promise<void> => {
        const timeStamp = new Date();
        try {
            const orderDocRef = await addDoc(collection(firestore, "orders"), {
                userId: user.uid,
                book,
                order_at: timeStamp,
                status: "Pending"
            });
            const orderId = orderDocRef.id;
            await addDoc(collection(firestore, "books", book.id, "orders"), {
                userId: user.uid,
                orderId,
                displayName: user.displayName,
                photoUrl: user.photoURL,
                email: user.email,
                order_at: timeStamp,
                status: "Pending"
            });
            toast.success('success! order placed successfully');
        } catch (error) {
            toast.error('sorry! Error placing order:');
            console.log(error);
        }

    }

    const getMyOrders = async (userId: string): Promise<Order[]> => {
        const ordersList: Order[] = [];
        try {
            const q = query(collection(firestore, "orders"), where("userId", "==", userId));
            const orderSnapshot = await getDocs(q);
            orderSnapshot.forEach(doc => {
                ordersList.push({ id: doc.id, ...doc.data() } as Order);
            });
        } catch (error) {
            toast.error("sorry! Error fetching orders:");
            console.log("Error fetching orders:", error);
        }
        return ordersList;
    }

    const getMyBooks = async (userId: string): Promise<Book[]> => {
        const booksList: Book[] = [];
        try {
            const q = query(collection(firestore, "books"), where("sellerId", "==", userId));
            const booksSnapshot = await getDocs(q);
            booksSnapshot.forEach(doc => {
                booksList.push({ id: doc.id, ...doc.data() } as Book);
            });
        } catch (error) {
            toast.error("sorry! Error fetching books:");
            console.log("Error fetching books:", error);
        }
        return booksList;
    }

    const getBookOrders = async (bookId: string): Promise<OrderDetail[]> => {
        const ordersList: OrderDetail[] = [];
        try {
            const orderSnapshot = await getDocs(collection(firestore, "books", bookId, "orders"));
            orderSnapshot.forEach(doc => {
                ordersList.push({ id: doc.id, ...doc.data() } as OrderDetail);
            });
        } catch (error) {
            toast.error("sorry! Error fetching orders:");
            console.log("Error fetching orders:", error);
        }
        return ordersList;
    }

    const getImages = async (): Promise<string[]> => {
        const imageURLs: string[] = [];
        try {
            const carouselRef = ref(storage, 'uploads/images/carousel');
            const imageList = await list(carouselRef, { maxResults: 6 });
            for (const itemRef of imageList.items) {
                const imageURL = await getDownloadURL(itemRef);
                imageURLs.push(imageURL);
            }
        }
        catch (error) {
            console.log("Error listing files:", error);
        }
        return imageURLs;
    }

    const updateBook = async (id: string, title: string, author: string, description: string, price: number, isbn: number, coverPic: File | null, imageUrl: string): Promise<string> => {
        try {
            if (coverPic) {
                const imgaeRef = ref(storage, `uploads/images/books/${Date.now()}-${coverPic.name}`);
                const uploadResult = await uploadBytes(imgaeRef, coverPic);
                deleteObject(ref(storage, imageUrl));
                imageUrl = uploadResult.ref.fullPath;
            }

            await updateDoc(doc(firestore, "books", id), {
                title,
                description,
                author,
                price,
                isbn,
                imageUrl
            });
             updateOrderByBookId(id, title, author, description, price, isbn, imageUrl);
            toast.success('Success on updating books');
        } catch (error) {
            toast.error('Error on updating books');
        }
        const url = await getImageUrl(imageUrl)
        return url;
    }

    const updateOrderByBookId = async (id: string, title: string, author: string, description: string, price: number, isbn: number, imageUrl: string): Promise<void> => {
        try {
            const ordersSnapshot = await getDocs(query(collection(firestore, "orders"), where("book.id", "==", id)));

            ordersSnapshot.forEach(async (doc) => {
                await updateDoc(doc.ref, {
                    "book.title": title,
                    "book.description": description,
                    "book.author": author,
                    "book.price": price,
                    "book.isbn": isbn,
                    "book.imageUrl": imageUrl
                });
            });
        } catch (error) {
            console.log("Error updating order:", error);
        }
    }

    const deleteBook = async (bookId: string, imageUrl: string): Promise<void> => {
        try {
            await deleteDoc(doc(firestore, "books", bookId));
            if (imageUrl) {
                deleteObject(ref(storage, imageUrl));
            }
            await deleteOrdersByBookId(bookId);
            await deleteOrderInBookSubcollectionData(bookId);
            toast.success('Book deleted successfully.');
        } catch (error) {
            console.error('Error deleting book:', error);
            toast.error('Error deleting book.');
        }
    }

    const deleteOrdersByBookId = async (bookId: string): Promise<void> => {
        try {
            const ordersSnapshot = await getDocs(query(collection(firestore, "orders"), where("book.id", "==", bookId)));

            ordersSnapshot.forEach(async (orderDoc) => {
                await deleteDoc(doc(firestore, "orders", orderDoc.id));
            });
        } catch (error) {
            console.log('Error deleting orders:', error);
        }
    }

    const deleteOrderInBookSubcollectionData = async (bookId: string): Promise<void> => {
        try {
            const ordersSnapshot = await getDocs(collection(firestore, "books", bookId, "orders"));

            if (!ordersSnapshot.empty) {
                ordersSnapshot.forEach(async (doc) => {
                    const orderDocRef = doc.ref;
                    await deleteDoc(orderDocRef);
                });
            } else {
                console.log("No orders found in the book subcollection");
            }
        } catch (error) {
            console.log('Error retrieving orders from book subcollection:', error);
        }
    };

    const updateBookOrder = async (id: string, orderId: string, status: string): Promise<void> => {
        try {
            const orderDocRef = doc(firestore, "orders", orderId);
            const orderDocSnapshot = await getDoc(orderDocRef);

            if (orderDocSnapshot.exists()) {
                const bookId = orderDocSnapshot.data().book.id;
                await updateDoc(orderDocRef, { status });
                await updateOrder(bookId, id, status);
                toast.success('Success! Order updated succesufully');
            } else {
                toast.error('Order not found');
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Error updating order status:");
        }
    }

    const updateOrder = async (bookId: string, orderId: string, status: string): Promise<void> => {
        try {
            const orderDocRef = doc(firestore, "books", bookId, "orders", orderId);
            const orderDocSnapshot = await getDoc(orderDocRef);
            if (orderDocSnapshot.exists()) {
                await updateDoc(orderDocRef, { status });
            } else {
                console.log("Order not found.");
            }
        } catch (error) {
            console.log("Error updating order status:", error);
        }
    }

    useEffect(() => {
        setLoading(false);
    }, []);

    const value = { addBook, getBooks, getImageUrl, saveContact, placeOrder, getMyOrders, getBookOrders, getMyBooks, getImages, updateBook, deleteBook, updateBookOrder };

    return (
        <DbContext.Provider value={value}>
            {!loading && children}
        </DbContext.Provider>
    );
}

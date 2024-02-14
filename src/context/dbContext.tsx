import { app } from "../firebase";
import { useContext, useState, useEffect, createContext, ReactNode } from "react";
import { toast } from "react-toastify";
import { addDoc, collection, getFirestore, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, list, ref, uploadBytes } from "firebase/storage";
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
            await addDoc(collection(firestore, "orders"), {
                userId: user.uid,
                book,
                order_at: timeStamp,
                status: "Pending"
            });
            await addDoc(collection(firestore, "books", book.id, "orders"), {
                userId: user.uid,
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
    useEffect(() => {
        setLoading(false);
    }, []);

    const value = { addBook, getBooks, getImageUrl, saveContact, placeOrder, getMyOrders, getBookOrders, getMyBooks, getImages };

    return (
        <DbContext.Provider value={value}>
            {!loading && children}
        </DbContext.Provider>
    );
}

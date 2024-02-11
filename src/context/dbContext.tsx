import { app } from "../firebase";
import { useContext, useState, useEffect, createContext, ReactNode } from "react";
import { toast } from "react-toastify";
import { addDoc, collection, getFirestore, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Book } from "../interfaces/book";


const DbContext = createContext<{
    addBook?: (title: string, description: string, author: string, sellerId: string, price: number, isbn: number, coverPic: File) => Promise<void>;
    getBooks?: () => Promise<Book[]>;
    getImageUrl?: (path: string) => Promise<string>;
    saveContact?: (name: string, email: string, phoneNumber: string, address: string, message: string) => Promise<void>;
    placeOrder?: (userId: string, book: Book) => Promise<void>;
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

    const placeOrder = async (userId: string, book: Book): Promise<void> => {
        const timeStamp = new Date();
        try {
            await addDoc(collection(firestore, "orders"), {
                userId,
                book,
                order_at: timeStamp,
                status: "Pending"
            });
            toast.success('success! order placed successfully');
        } catch (error) {
            toast.error('sorry! Error placing order:');
            console.log(error);
        }

    }

    useEffect(() => {
        setLoading(false);
    }, []);

    const value = { addBook, getBooks, getImageUrl, saveContact, placeOrder };

    return (
        <DbContext.Provider value={value}>
            {!loading && children}
        </DbContext.Provider>
    );
}

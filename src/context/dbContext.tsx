import { app } from "../firebase";
import { useContext, useState, useEffect, createContext, ReactNode } from "react";
import { toast } from "react-toastify";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const DbContext = createContext<{
    addBook?: (title: string, description: string, author: string, sellerId: string, price: number, isbn: number, coverPic: File) => void;
}>({});


// eslint-disable-next-line react-refresh/only-export-components
export const useFirestore = () => useContext(DbContext);

export function DbProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true);
    const firestore = getFirestore(app)
    const storage = getStorage(app);

    const addBook = async (title: string, description: string, author: string, sellerId: string, price: number, isbn: number, coverPic: File) => {
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
            toast.error('sorry! book not added try again');
            console.log(error);
        }

    }

    useEffect(() => {
        setLoading(false);
    }, []);

    const value = { addBook };

    return (
        <DbContext.Provider value={value}>
            {!loading && children}
        </DbContext.Provider>
    );
}

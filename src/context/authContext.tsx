import { app } from "../firebase";
import { useContext, useState, useEffect, createContext, ReactNode } from "react";
import { User, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, updateProfile, GoogleAuthProvider, signOut, updateEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const AuthContext = createContext<{
    user?: User | null;
    createUser?: (name: string, email: string, password: string) => Promise<void>;
    loginUser?: (email: string, password: string) => Promise<void>;
    logoutUser?: () => void;
    loginWithGoogle?: () => void;
    updateProfileDetails?: (name: string | null, profileImage: File | null) => Promise<void>;
    updateUserEmail?: (email: string) => Promise<void>;
}>({});


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true);
    const auth = getAuth(app);
    const storage = getStorage(app);
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState<User | null>(null);

    const createUser = async (name: string, email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            if (auth.currentUser)
                await updateProfile(auth.currentUser, {
                    displayName: name
                })
            toast.success('success! User created Successfuly');
        } catch (error) {
            toast.error('sorry! Internal server error');
            console.log(error);
        }
    }

    const loginUser = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('success! Login Successfuly');
        } catch (error) {
            toast.error('sorry! Internal server error');
            console.log(error);
        }
    }

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
            toast.success('success! Login Successfuly');
        } catch (error) {
            toast.error('sorry! Internal server error');
            console.log(error);
        }
    }

    const logoutUser = async () => {
        try {
            await signOut(auth);
            toast.success('success! Logout Successfuly');
        } catch (error) {
            toast.error('sorry! Internal server error');
            console.log(error);
        }
    }

    const updateProfileDetails = async (name: string | null, profileImage: File | null): Promise<void> => {
        try {
            if (!auth.currentUser) {
                toast.error('Erorr! on updating user profile');
                return;
            }
            let photoURL = user && user.photoURL;
            if (profileImage) {
                const imageRef = ref(storage, `uploads/images/users/${Date.now()}-${name}`);
                const uploadResult = await uploadBytes(imageRef, profileImage);
                photoURL = await getDownloadURL(ref(storage, uploadResult.ref.fullPath));
            }
            await updateProfile(auth.currentUser, {
                displayName: name, photoURL
            });
            if (user) setUser({ ...user, displayName: name, photoURL });
            toast.success('success! Profile details updated Successfuly');
        } catch (error) {
            console.log("Error! on updating  user profile");
            toast.error("Error! on updating  user profile");
        }

    }

    const updateUserEmail = async (email: string): Promise<void> => {
        try {
            if (!auth.currentUser) {
                toast.error('Erorr! on updating user email');
                return;
            }
            await updateEmail(auth.currentUser, email);
            if (user) setUser({ ...user, email });
            toast.success('success! email  updated Successfuly');
        } catch (error) {
            console.log("Error! on updating  user email");
            toast.error("Error! on updating  user email");
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
    }, [auth]);

    const value = { user, createUser, loginUser, logoutUser, loginWithGoogle, updateProfileDetails, updateUserEmail };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

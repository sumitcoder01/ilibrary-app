import { app } from "../firebase";
import { useContext, useState, useEffect, createContext, ReactNode } from "react";
import { User, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, updateProfile, GoogleAuthProvider, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const AuthContext = createContext<{
    user?: User | null;
    createUser?: (arg0: string, arg1: string, arg2: string) => void;
    loginUser?: (arg0: string, arg1: string) => void;
    logoutUser?: () => void;
    loginWithGoogle?: () => void;
}>({});


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true);
    const auth = getAuth(app);
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

    const value = { user, createUser, loginUser, logoutUser, loginWithGoogle };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

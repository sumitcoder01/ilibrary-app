import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
export default function Protected() {
    const { user } = useAuth();
    return (
        user ? <Outlet /> : <Navigate to="/login" />
    )
}

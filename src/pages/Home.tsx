import { useAuth } from "../context/authContext"
export default function Home() {
    const {logoutUser} = useAuth();
    return (
        <div>
            Home works!
            <button onClick={logoutUser}>click me</button>
        </div>
    )
}
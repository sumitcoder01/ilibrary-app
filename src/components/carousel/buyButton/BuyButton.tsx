import { useNavigate } from "react-router-dom";

export  function BuyButton() {
    const navigate = useNavigate();
    return (
        <button onClick={()=> navigate('/books')} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Buy Now</button>
    )
}

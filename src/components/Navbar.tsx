import Logo from "../assets/library-logo.svg";
import { CgProfile } from "react-icons/cg";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
export default function Navbar() {
    const { user, logoutUser } = useAuth();
    const location = useLocation();
    const [dropDown, setDropDown] = useState(false);
    const handleLogout = () => {
        setDropDown(false);
        if (logoutUser)
            logoutUser()
    }
    return (
        <div className="text-gray-600  body-font mb-2 shadow-md">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link to="/">
                    <div className="flex items-center md:me-3 mb-4 md:mb-0">
                        <img src={Logo} alt="Ilibrary logo" className="h-7 w-7" />
                        <span className="ml-3 text-xl font-semibold  text-indigo-500">ILibrary</span>
                    </div>
                </Link>
                <nav className="md:ml-auto md:mr-3 flex flex-wrap items-center text-base justify-center">
                    <Link className={`link ${location.pathname === '/' ? 'text-gray-900' : ''}`} to="/">
                        <div className="mr-4 font-bold text-sm hover:text-gray-900">
                            Home
                        </div>
                    </Link>
                    <Link className={`link ${location.pathname === '/about' ? 'text-gray-900' : ''}`} to="/about">
                        <div className="mr-4 font-bold text-sm hover:text-gray-900">
                            About
                        </div>
                    </Link>
                    <Link className={`link ${location.pathname === '/contact' ? 'text-gray-900' : ''}`} to="/contact">
                        <div className="mr-4 font-bold text-sm hover:text-gray-900">
                            Contact
                        </div>
                    </Link>
                    <Link className={`link ${location.pathname === '/books' ? 'text-gray-900' : ''}`} to="/books">
                        <div className="mr-4 font-bold text-sm hover:text-gray-900">
                            Books
                        </div>
                    </Link>
                </nav>
                {user && <span onClick={() => setDropDown(!dropDown)} className="inline-flex items-center py-1 px-3  hover:bg-gray-200 rounded  text-xl md:text-2xl mt-4 md:mt-0">
                    <CgProfile className='text-indigo-500' />
                </span>
                }
                {dropDown && <div className="absolute flex flex-col items-center spacey-3 z-10 top-14 right-28 bg-gray-50 shadow-lg p-4">
                    <Link onClick={() => setDropDown(false)} to="/myaccount" className='py-1 hover:text-indigo-800 text-sm transition duration-300 ease-in-out'>My Account</Link>
                    <hr className='border-t border-gray-200 mt-1 w-full' />
                    <Link onClick={() => setDropDown(false)} to="/mybooks" className='py-1 hover:text-indigo-800 text-sm transition duration-300 ease-in-out'>My Books</Link>
                    <hr className='border-t border-gray-200 mt-1 w-full' />
                    <Link onClick={() => setDropDown(false)} to="/myorders" className='py-1 hover:text-indigo-800 text-sm transition duration-300 ease-in-out'>My Orders</Link>
                    <hr className='border-t border-gray-200 mt-1 w-full' />
                    <Link onClick={() => setDropDown(false)} to="/addbook" className='py-1 hover:text-indigo-800 text-sm transition duration-300 ease-in-out'>Add Book</Link>
                    <hr className='border-t border-gray-200 mt-1 w-full' />
                    <span className='py-1 hover:text-indigo-800 text-sm transition duration-300 ease-in-out' onClick={handleLogout}>Logout</span>
                </div>}
            </div>
        </div>
    );
}

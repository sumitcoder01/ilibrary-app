import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App.tsx'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { AuthProvider } from './context/authContext.tsx';
import { ToastContainer, Zoom } from 'react-toastify';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Home from './pages/Home.tsx';
import Protected from './pages/Protected.tsx';
import NotFound from './pages/NotFound.tsx';
import MyAccount from './pages/MyAccount.tsx';
import MyOrders from './pages/MyOrders.tsx';
import Contact from './pages/Contact.tsx';
import Books from './pages/Books.tsx';
import About from './pages/About.tsx';
import AddBook from './pages/AddBook.tsx';
import { DbProvider } from './context/dbContext.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="home" element={<Navigate to="/" />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="contact" element={<Contact />} />
      <Route path="books" element={<Books />} />
      <Route path="about" element={<About />} />
      <Route path="/" element={<Protected />}>
        <Route path="/" index element={<Home />} />
        <Route path="myaccount" element={<MyAccount />} />
        <Route path="myorders" element={<MyOrders />} />
        <Route path="addbook" element={<AddBook />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <AuthProvider>
      <DbProvider>
        <RouterProvider router={router} />
      </DbProvider>
    </AuthProvider>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Zoom}
    />
  </>
)

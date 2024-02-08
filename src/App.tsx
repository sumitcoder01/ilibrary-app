import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}

export default App;

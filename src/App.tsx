import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TopLoadingBar from './components/loadingBar/LoadingBar';

function App() {
  return (
    <main>
      <TopLoadingBar />
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}

export default App;

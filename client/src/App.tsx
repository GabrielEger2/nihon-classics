import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAppSelector } from "./app/hooks";
import { Navbar, Footer } from "./components"
import { Home, Login, Settings } from "./pages";


function App() {
  const { user } = useAppSelector((state : any) => state.auth);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/settings" 
            element={user ? <Settings /> : <Navigate to="../login" />}
          />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

export default App
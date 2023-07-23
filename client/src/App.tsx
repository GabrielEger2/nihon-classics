import { BrowserRouter, Routes } from "react-router-dom";
import { Navbar, Footer } from "./components"

function App() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <BrowserRouter>
        <Navbar />
        <Routes>

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App
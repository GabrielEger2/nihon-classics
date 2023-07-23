import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, Footer } from "./components"
import { Home } from "./pages";

function App() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App
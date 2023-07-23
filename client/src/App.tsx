import { BrowserRouter, Routes } from "react-router-dom";
import { Navbar } from "./components"

function App() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <BrowserRouter>
        <Navbar />
        <Routes>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App
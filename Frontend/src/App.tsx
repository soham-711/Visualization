import { Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Fifo from "./components/Fifo";
import Lru from "./components/Lru";
import Optimal from "./components/Optimal";

function App() {
  return (
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/fifo" element={<Fifo />} />
        <Route path="/lru" element={<Lru />} />
        <Route path="/opt" element={<Optimal />} />
      </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import Home from "./pages/home";
import Admin from "./pages/admin";
import MovieDetail from "./pages/MovieDetail";
import Reservas from "./pages/reservas";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/reservas/:funcionId" element={<Reservas />} />
      <Route
    path="/pelicula/:id"
    element={<MovieDetail/>}
/>
    </Routes>
  );
}

export default App;
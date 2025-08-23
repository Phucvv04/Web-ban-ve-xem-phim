import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/admin/Home";
import Login from "./pages/admin/Login";
import Movies from "./pages/admin/Movies";
import Cinemas from "./pages/admin/Cinemas";
import ChatGPT from "./pages/ChatGPT";
import Showtimes from "./pages/admin/Showtimes";
import Seats from "./pages/admin/Seats";
import Tickets from "./pages/admin/Tickets";
import Users from "./pages/admin/Users";
import Statistics from "./pages/admin/Statistics";
function AppContent() {
  const location = useLocation();
  const hiddenPaths = ["/admin/login"];
  const hideLayout = hiddenPaths.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/home" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/movies" element={<Movies />} />
        <Route path="/admin/cinemas" element={<Cinemas />} />
        <Route path="/admin/showtimes" element={<Showtimes />} />
        <Route path="/admin/seats" element={<Seats />} />
        <Route path="/admin/tickets" element={<Tickets />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/stats" element={<Statistics />} />
        <Route path="/admin/chatgpt" element={<ChatGPT />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

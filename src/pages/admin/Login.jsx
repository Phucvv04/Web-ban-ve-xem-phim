import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "123") {
      localStorage.setItem("token", "fake-token");
      navigate("/admin/home");
    } else {
      alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1743345358132-bc60a91716ea?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Ảnh rạp phim
      }}
    >
      {/* Overlay mờ tối */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Form đăng nhập */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 w-full max-w-sm border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-lg">
          🎬 Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Tên đăng nhập */}
          <div>
            <label className="block text-white text-sm mb-1">
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white/80"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-white text-sm mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white/80"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition-colors duration-200 shadow-md"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

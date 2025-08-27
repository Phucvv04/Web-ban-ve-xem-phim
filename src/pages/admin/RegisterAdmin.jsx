import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Giả lập lưu user vào localStorage
    const user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Đăng ký thành công! Mời bạn đăng nhập.");
    navigate("/"); // chuyển về trang login
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0')", // ảnh rạp phim khác để phân biệt
      }}
    >
      {/* Overlay mờ tối */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Form đăng ký */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 w-full max-w-sm border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-lg">
          📝 Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-white text-sm mb-1">
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Nhập email"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label className="block text-white text-sm mb-1">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>

          {/* Nút đăng ký */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition-colors duration-200 shadow-md"
          >
            Đăng ký
          </button>
        </form>

        {/* Link quay lại Login */}
        <p className="text-center text-white mt-4">
          Đã có tài khoản?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-yellow-400 hover:underline"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
}

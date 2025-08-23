import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa thông tin đăng nhập (token, session)
    localStorage.removeItem("token");
    // Điều hướng về trang đăng nhập
    navigate("/admin/login");
  };

  return (
    <header className="bg-gradient-to-r from-amber-600 via-purple-600 to-green-50 shadow-sm border-b border-gray-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-purple-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CF</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                CGV&W Film
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData();
                const keyword = formData.get("search");
                console.log("Tìm kiếm:", keyword);
              }}
              className="flex items-center border border-gray-300 rounded-lg overflow-hidden"
            >
              <input
                type="text"
                name="search"
                placeholder="Nhập thông tin tìm kiếm"
                className="px-3 py-1 outline-none text-sm"
              />
              <button
                type="submit"
                className="bg-primary-500 text-white px-3 py-1 text-sm hover:bg-primary-600"
              >
                Tìm kiếm
              </button>
            </form>

            <Link
              to="/admin/home"
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              Trang chủ
            </Link>

            {/* Nút đăng xuất */}
            <button onClick={handleLogout} className=" text-red-400 px-3 py-1 ">
              Đăng xuất
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 p-2 rounded-md"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-slide-in">
            {/* Search Bar in Mobile */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData();
                const keyword = formData.get("search");
                console.log("Tìm kiếm:", keyword);
              }}
              className="flex items-center border border-gray-300 rounded-lg overflow-hidden mb-4"
            >
              <input
                type="text"
                name="search"
                placeholder="Nhập thông tin tìm kiếm"
                className="px-3 py-1 outline-none text-sm flex-1"
              />
              <button
                type="submit"
                className="bg-primary-500 text-white px-3 py-1 text-sm hover:bg-primary-600"
              >
                Tìm kiếm
              </button>
            </form>

            <nav className="flex flex-col space-y-4">
              <Link
                to="/home"
                className="text-gray-700 hover:text-primary-600 transition-colors duration-200 px-2"
              >
                Trang chủ
              </Link>

              {/* Nút đăng xuất mobile */}
              <button
                onClick={handleLogout}
                className=" text-red-400 px-3 py-1 "
              >
                Đăng xuất
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

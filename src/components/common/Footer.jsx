export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br  from-red-600 to-purple-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CF</span>
              </div>
              <span className="ml-2 text-2xl font-bold">CGV&W Cinema</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              CGV&W – Nơi trải nghiệm điện ảnh đỉnh cao với âm thanh sống động,
              hình ảnh chân thực và dịch vụ chuyên nghiệp. Cùng bạn tạo nên
              những khoảnh khắc đáng nhớ.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 0 1 3.8-3.9c1.1 0 2.3.2 2.3.2v2.5H15a1.5 1.5 0 0 0-1.7 1.6V12H16l-.5 3h-2.2v7A10 10 0 0 0 22 12" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.8-2.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Liên Kết Nhanh
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Trang Chủ
                </a>
              </li>
              <li>
                <a
                  href="/movies"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Phim Đang Chiếu
                </a>
              </li>
              <li>
                <a
                  href="/coming-soon"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Phim Sắp Chiếu
                </a>
              </li>
              <li>
                <a
                  href="/booking"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Đặt Vé Online
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Liên Hệ
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>Hotline: 1900 123 456</li>
              <li>Email: support@cgvw.vn</li>
              <li>Địa chỉ: 102 Trần Nhân Tông, Hoàn Kiếm, Hà Nội</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} CGV&W Cinema. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Chính sách bảo mật
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Điều khoản dịch vụ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

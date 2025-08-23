import {
  Film,
  Theater,
  Calendar,
  Sofa,
  Ticket,
  BarChart,
  Users,
  Bot,
} from "lucide-react";
import FeatureCard from "../../components/FeartureCard";

const features = [
  {
    title: "Quản lý phim",
    icon: <Film size={32} />,
    desc: "Thêm, sửa, xóa phim, poster, trailer",
    link: "/admin/movies",
    buttonText: "Quản lý",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
  },
  {
    title: "Quản lý rạp chiếu",
    icon: <Theater size={32} />,
    desc: "Thêm, sửa, xóa thông tin rạp",
    link: "/admin/cinemas",
    buttonText: "Quản lý",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
  },
  {
    title: "Quản lý suất chiếu",
    icon: <Calendar size={32} />,
    desc: "Tạo các suất chiếu theo phim, ngày, giờ, rạp",
    link: "/admin/showtimes",
    buttonText: "Quản lý",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
  },
  {
    title: "Quản lý ghế",
    icon: <Sofa size={32} />,
    desc: "Cập nhật trạng thái ghế, sơ đồ ghế",
    link: "/admin/seats",
    buttonText: "Quản lý",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
  },
  {
    title: "Quản lý vé đã đặt",
    icon: <Ticket size={32} />,
    desc: "Xem vé đã bán, người đặt, tổng tiền",
    link: "/admin/tickets",
    buttonText: "Quản lý",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
  },
  {
    title: "Thống kê",
    icon: <BarChart size={32} />,
    desc: "Xem doanh thu theo ngày, phim",
    link: "/admin/stats",
    buttonText: "Quản lý",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
  },
  {
    title: "Quản lý người dùng",
    icon: <Users size={32} />,
    desc: "Xem danh sách, khóa tài khoản",
    link: "/admin/users",
    buttonText: "Quản lý",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
  },
  {
    title: "Chatbot-AI",
    icon: <Bot size={32} />,
    desc: "Đề xuất những bộ phim hay, hot trong mùa hè này",
    link: "/admin/chatgpt",
    buttonText: "Hỏi AI",
    buttonColor: "bg-green-600 hover:bg-green-700",
  },
];

const Home = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Chào mừng admin */}
      <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold">🎬 Chào Admin!</h1>
        <p className="mt-2 text-lg">
          Quản lý toàn bộ hệ thống đặt vé Cinema Glamour Vision & World Film
        </p>
      </div>

      {/* Các chức năng */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default Home;

import { useState, useEffect } from "react";

export default function Statistics() {
  const ticketData = [
    {
      id: 1,
      code: "V001",
      seat: "A1",
      showTime: "2025-08-14 19:00",
      price: 120000,
    },
    {
      id: 2,
      code: "V002",
      seat: "A2",
      showTime: "2025-08-14 21:00",
      price: 90000,
    },
    {
      id: 3,
      code: "V003",
      seat: "B1",
      showTime: "2025-08-15 19:00",
      price: 150000,
    },
  ];

  const userData = [
    { id: 1, username: "admin" },
    { id: 2, username: "user01" },
    { id: 3, username: "user02" },
  ];

  const [filterType, setFilterType] = useState("day"); // day, month, year
  const [stats, setStats] = useState({
    totalTickets: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalShows: 0,
  });

  useEffect(() => {
    const now = new Date();

    const filteredTickets = ticketData.filter((t) => {
      const date = new Date(t.showTime);
      if (filterType === "day") {
        return (
          date.getDate() === now.getDate() &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      } else if (filterType === "month") {
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      } else if (filterType === "year") {
        return date.getFullYear() === now.getFullYear();
      }
      return true;
    });

    const totalTickets = filteredTickets.length;
    const totalRevenue = filteredTickets.reduce((sum, t) => sum + t.price, 0);
    const totalUsers = userData.length;
    const totalShows = new Set(filteredTickets.map((t) => t.showTime)).size;

    setStats({
      totalTickets,
      totalRevenue,
      totalUsers,
      totalShows,
    });
  }, [filterType]);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Thống kê hệ thống</h1>

      {/* Bộ lọc */}
      <div className="mb-6">
        <label className="mr-3 font-medium">Lọc theo:</label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="day">Ngày</option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
        </select>
      </div>

      {/* Thẻ thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500">Tổng số vé</p>
          <h2 className="text-2xl font-bold">{stats.totalTickets}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500">Tổng doanh thu</p>
          <h2 className="text-2xl font-bold">
            {stats.totalRevenue.toLocaleString()}₫
          </h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500">Tổng người dùng</p>
          <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500">Số suất chiếu</p>
          <h2 className="text-2xl font-bold">{stats.totalShows}</h2>
        </div>
      </div>

      {/* Bảng thống kê vé */}
      <h2 className="text-xl font-semibold mb-3">
        Chi tiết vé đã bán ({filterType})
      </h2>
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-amber-200 text-left">
            <th className="p-3">Mã vé</th>
            <th className="p-3">Số ghế</th>
            <th className="p-3">Suất chiếu</th>
            <th className="p-3">Giá vé</th>
          </tr>
        </thead>
        <tbody>
          {ticketData
            .filter((t) => {
              const now = new Date();
              const date = new Date(t.showTime);
              if (filterType === "day") {
                return (
                  date.getDate() === now.getDate() &&
                  date.getMonth() === now.getMonth() &&
                  date.getFullYear() === now.getFullYear()
                );
              } else if (filterType === "month") {
                return (
                  date.getMonth() === now.getMonth() &&
                  date.getFullYear() === now.getFullYear()
                );
              } else if (filterType === "year") {
                return date.getFullYear() === now.getFullYear();
              }
              return true;
            })
            .map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{t.code}</td>
                <td className="p-3">{t.seat}</td>
                <td className="p-3">{t.showTime}</td>
                <td className="p-3">{t.price.toLocaleString()}₫</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

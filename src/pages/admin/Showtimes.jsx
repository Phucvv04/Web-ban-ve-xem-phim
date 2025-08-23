import { useState } from "react";
import { Plus, Edit, Trash, Search } from "lucide-react";

export default function Showtimes() {
  const [showtimes, setShowtimes] = useState([
    {
      id: 1,
      movie: "Avengers: Endgame",
      date: "2025-08-20",
      time: "19:30",
      room: "Phòng 1",
      price: 80000,
    },
    {
      id: 2,
      movie: "Spider-Man: No Way Home",
      date: "2025-08-21",
      time: "20:00",
      room: "Phòng 2",
      price: 90000,
    },
  ]);

  const [newShowtime, setNewShowtime] = useState({
    movie: "",
    date: "",
    time: "",
    room: "",
    price: "",
  });

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(showtimes);

  const handleAddShowtime = (e) => {
    e.preventDefault();
    if (
      !newShowtime.movie ||
      !newShowtime.date ||
      !newShowtime.time ||
      !newShowtime.room ||
      !newShowtime.price
    )
      return;

    const added = {
      id: Date.now(),
      movie: newShowtime.movie,
      date: newShowtime.date,
      time: newShowtime.time,
      room: newShowtime.room,
      price: Number(newShowtime.price),
    };

    setShowtimes([...showtimes, added]);
    setFiltered([...filtered, added]);

    setNewShowtime({ movie: "", date: "", time: "", room: "", price: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa suất chiếu này?")) {
      const updated = showtimes.filter((s) => s.id !== id);
      setShowtimes(updated);
      setFiltered(updated);
    }
  };

  const handleSearch = () => {
    if (!search.trim()) {
      setFiltered(showtimes);
    } else {
      setFiltered(
        showtimes.filter(
          (s) =>
            s.movie.toLowerCase().includes(search.toLowerCase()) ||
            s.room.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Quản lý suất chiếu</h1>

      {/* Form thêm suất chiếu */}
      <form
        onSubmit={handleAddShowtime}
        className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4"
      >
        <input
          type="text"
          placeholder="Tên phim"
          value={newShowtime.movie}
          onChange={(e) =>
            setNewShowtime({ ...newShowtime, movie: e.target.value })
          }
          className="border p-2 rounded flex-1"
        />
        <input
          type="date"
          value={newShowtime.date}
          onChange={(e) =>
            setNewShowtime({ ...newShowtime, date: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="time"
          value={newShowtime.time}
          onChange={(e) =>
            setNewShowtime({ ...newShowtime, time: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Phòng chiếu"
          value={newShowtime.room}
          onChange={(e) =>
            setNewShowtime({ ...newShowtime, room: e.target.value })
          }
          className="border p-2 rounded w-40"
        />
        <input
          type="number"
          placeholder="Giá vé"
          value={newShowtime.price}
          onChange={(e) =>
            setNewShowtime({ ...newShowtime, price: e.target.value })
          }
          className="border p-2 rounded w-32"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} /> Thêm suất
        </button>
      </form>

      {/* Thanh tìm kiếm */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm suất chiếu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Search size={18} /> Tìm kiếm
        </button>
      </div>

      {/* Danh sách suất chiếu */}
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Tên phim</th>
            <th className="p-3">Ngày</th>
            <th className="p-3">Giờ</th>
            <th className="p-3">Phòng</th>
            <th className="p-3">Giá vé</th>
            <th className="p-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{s.movie}</td>
              <td className="p-3">{s.date}</td>
              <td className="p-3">{s.time}</td>
              <td className="p-3">{s.room}</td>
              <td className="p-3">{s.price.toLocaleString()} đ</td>
              <td className="p-3 text-center flex justify-center gap-3">
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

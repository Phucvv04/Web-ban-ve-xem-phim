import { useState } from "react";
import { Plus, Edit, Trash, Search } from "lucide-react";

export default function Cinemas() {
  const [cinemas, setCinemas] = useState([
    {
      id: 1,
      name: "CGV&W Galaxy",
      address: "123 Lê Lợi, Thanh Xuân, Hà Nội",
      rooms: 5,
      image:
        "https://ticotravel.com.vn/wp-content/uploads/2023/04/rap-chieu-phim-gan-day-2.jpg",
    },
    {
      id: 2,
      name: "CGV&W Vincom",
      address: "70 Lý Tự Trọng, Hà Đông, Hà Nội",
      rooms: 8,
      image: "https://static.vinwonders.com/production/rap-phim-ha-noi-15.jpg",
    },
  ]);

  const [newCinema, setNewCinema] = useState({
    name: "",
    address: "",
    rooms: "",
    image: "",
  });

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(cinemas);

  const handleAddCinema = (e) => {
    e.preventDefault();
    if (!newCinema.name || !newCinema.address || !newCinema.rooms) return;

    const added = {
      id: Date.now(),
      name: newCinema.name,
      address: newCinema.address,
      rooms: Number(newCinema.rooms),
      image: newCinema.image || "https://via.placeholder.com/100x60",
    };

    setCinemas([...cinemas, added]);
    setFiltered([...filtered, added]);

    setNewCinema({ name: "", address: "", rooms: "", image: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa rạp này?")) {
      const updated = cinemas.filter((c) => c.id !== id);
      setCinemas(updated);
      setFiltered(updated);
    }
  };

  const handleSearch = () => {
    if (!search.trim()) {
      setFiltered(cinemas);
    } else {
      setFiltered(
        cinemas.filter(
          (cinema) =>
            cinema.name.toLowerCase().includes(search.toLowerCase()) ||
            cinema.address.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Quản lý rạp chiếu</h1>

      {/* Form thêm rạp */}
      <form
        onSubmit={handleAddCinema}
        className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4"
      >
        <input
          type="text"
          placeholder="Tên rạp"
          value={newCinema.name}
          onChange={(e) => setNewCinema({ ...newCinema, name: e.target.value })}
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Địa chỉ"
          value={newCinema.address}
          onChange={(e) =>
            setNewCinema({ ...newCinema, address: e.target.value })
          }
          className="border p-2 rounded flex-1"
        />
        <input
          type="number"
          placeholder="Số phòng chiếu"
          value={newCinema.rooms}
          onChange={(e) =>
            setNewCinema({ ...newCinema, rooms: e.target.value })
          }
          className="border p-2 rounded w-40"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setNewCinema({
                ...newCinema,
                image: URL.createObjectURL(file),
              });
            }
          }}
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} /> Thêm rạp
        </button>
      </form>

      {/* Thanh tìm kiếm */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm rạp..."
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

      {/* Danh sách rạp */}
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Ảnh</th>
            <th className="p-3">Tên rạp</th>
            <th className="p-3">Địa chỉ</th>
            <th className="p-3">Số phòng</th>
            <th className="p-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((cinema) => (
            <tr key={cinema.id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                <img
                  src={cinema.image}
                  alt={cinema.name}
                  className="w-24 h-14 object-cover rounded"
                />
              </td>
              <td className="p-3">{cinema.name}</td>
              <td className="p-3">{cinema.address}</td>
              <td className="p-3">{cinema.rooms}</td>
              <td className="p-3 text-center flex justify-center gap-3">
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(cinema.id)}
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

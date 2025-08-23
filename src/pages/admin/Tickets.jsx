import { useState } from "react";
import { Plus, Edit, Trash, Search } from "lucide-react";

export default function Tickets() {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      code: "V001",
      seat: "A1",
      showTime: "2025-08-14 19:00",
      customer: "Nguyễn Văn A",
      phone: "0901234567",
      price: 120000,
    },
    {
      id: 2,
      code: "V002",
      seat: "A2",
      showTime: "2025-08-14 21:00",
      customer: "Trần Thị B",
      phone: "0912345678",
      price: 90000,
    },
  ]);

  const [newTicket, setNewTicket] = useState({
    code: "",
    seat: "",
    showTime: "",
    customer: "",
    phone: "",
    price: "",
  });

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(tickets);

  const handleAddTicket = (e) => {
    e.preventDefault();
    if (
      !newTicket.code ||
      !newTicket.seat ||
      !newTicket.showTime ||
      !newTicket.customer ||
      !newTicket.phone ||
      !newTicket.price
    )
      return;

    const added = {
      id: Date.now(),
      ...newTicket,
      price: parseFloat(newTicket.price),
    };

    setTickets([...tickets, added]);
    setFiltered([...filtered, added]);
    setNewTicket({
      code: "",
      seat: "",
      showTime: "",
      customer: "",
      phone: "",
      price: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa vé này?")) {
      const updated = tickets.filter((t) => t.id !== id);
      setTickets(updated);
      setFiltered(updated);
    }
  };

  const handleSearch = () => {
    if (!search.trim()) {
      setFiltered(tickets);
    } else {
      setFiltered(
        tickets.filter(
          (t) =>
            t.code.toLowerCase().includes(search.toLowerCase()) ||
            t.seat.toLowerCase().includes(search.toLowerCase()) ||
            t.customer.toLowerCase().includes(search.toLowerCase()) ||
            t.phone.includes(search)
        )
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Quản lý vé đã đặt</h1>

      {/* Form thêm vé */}
      <form
        onSubmit={handleAddTicket}
        className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4"
      >
        <input
          type="text"
          placeholder="Mã vé"
          value={newTicket.code}
          onChange={(e) => setNewTicket({ ...newTicket, code: e.target.value })}
          className="border p-2 rounded w-32"
        />
        <input
          type="text"
          placeholder="Số ghế"
          value={newTicket.seat}
          onChange={(e) => setNewTicket({ ...newTicket, seat: e.target.value })}
          className="border p-2 rounded w-32"
        />
        <input
          type="datetime-local"
          value={newTicket.showTime}
          onChange={(e) =>
            setNewTicket({ ...newTicket, showTime: e.target.value })
          }
          className="border p-2 rounded w-48"
        />
        <input
          type="text"
          placeholder="Tên khách"
          value={newTicket.customer}
          onChange={(e) =>
            setNewTicket({ ...newTicket, customer: e.target.value })
          }
          className="border p-2 rounded w-48"
        />
        <input
          type="text"
          placeholder="SĐT"
          value={newTicket.phone}
          onChange={(e) =>
            setNewTicket({ ...newTicket, phone: e.target.value })
          }
          className="border p-2 rounded w-40"
        />
        <input
          type="number"
          placeholder="Giá vé"
          value={newTicket.price}
          onChange={(e) =>
            setNewTicket({ ...newTicket, price: e.target.value })
          }
          className="border p-2 rounded w-32"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} /> Thêm vé
        </button>
      </form>

      {/* Thanh tìm kiếm */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm vé..."
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

      {/* Danh sách vé */}
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Mã vé</th>
            <th className="p-3">Số ghế</th>
            <th className="p-3">Suất chiếu</th>
            <th className="p-3">Khách hàng</th>
            <th className="p-3">SĐT</th>
            <th className="p-3">Giá vé</th>
            <th className="p-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((t) => (
            <tr key={t.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{t.code}</td>
              <td className="p-3">{t.seat}</td>
              <td className="p-3">{t.showTime}</td>
              <td className="p-3">{t.customer}</td>
              <td className="p-3">{t.phone}</td>
              <td className="p-3">{t.price.toLocaleString()}₫</td>
              <td className="p-3 text-center flex justify-center gap-3">
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
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

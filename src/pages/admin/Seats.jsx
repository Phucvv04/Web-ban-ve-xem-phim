// import { useState } from "react";
// import { Plus, Edit, Trash, Search } from "lucide-react";

// export default function Seats() {
//   const [seats, setSeats] = useState([
//     { id: 1, number: "A1", type: "VIP", status: "Trống" },
//     { id: 2, number: "A2", type: "Thường", status: "Đã đặt" },
//   ]);

//   const [newSeat, setNewSeat] = useState({
//     number: "",
//     type: "",
//     status: "",
//   });

//   const [search, setSearch] = useState("");
//   const [filtered, setFiltered] = useState(seats);

//   const handleAddSeat = (e) => {
//     e.preventDefault();
//     if (!newSeat.number || !newSeat.type || !newSeat.status) return;

//     const added = {
//       id: Date.now(),
//       number: newSeat.number,
//       type: newSeat.type,
//       status: newSeat.status,
//     };

//     setSeats([...seats, added]);
//     setFiltered([...filtered, added]);
//     setNewSeat({ number: "", type: "", status: "" });
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Bạn có chắc muốn xóa ghế này?")) {
//       const updated = seats.filter((s) => s.id !== id);
//       setSeats(updated);
//       setFiltered(updated);
//     }
//   };

//   const handleSearch = () => {
//     if (!search.trim()) {
//       setFiltered(seats);
//     } else {
//       setFiltered(
//         seats.filter(
//           (s) =>
//             s.number.toLowerCase().includes(search.toLowerCase()) ||
//             s.type.toLowerCase().includes(search.toLowerCase()) ||
//             s.status.toLowerCase().includes(search.toLowerCase())
//         )
//       );
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Quản lý ghế</h1>

//       {/* Form thêm ghế */}
//       <form
//         onSubmit={handleAddSeat}
//         className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4"
//       >
//         <input
//           type="text"
//           placeholder="Số ghế (VD: A1)"
//           value={newSeat.number}
//           onChange={(e) => setNewSeat({ ...newSeat, number: e.target.value })}
//           className="border p-2 rounded w-32"
//         />
//         <input
//           type="text"
//           placeholder="Loại ghế (VIP/Thường)"
//           value={newSeat.type}
//           onChange={(e) => setNewSeat({ ...newSeat, type: e.target.value })}
//           className="border p-2 rounded w-40"
//         />
//         <select
//           value={newSeat.status}
//           onChange={(e) => setNewSeat({ ...newSeat, status: e.target.value })}
//           className="border p-2 rounded w-40"
//         >
//           <option value="">-- Trạng thái --</option>
//           <option value="Trống">Trống</option>
//           <option value="Đã đặt">Đã đặt</option>
//           <option value="Bảo trì">Bảo trì</option>
//         </select>
//         <button
//           type="submit"
//           className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
//         >
//           <Plus size={18} /> Thêm ghế
//         </button>
//       </form>

//       {/* Thanh tìm kiếm */}
//       <div className="mb-4 flex gap-2">
//         <input
//           type="text"
//           placeholder="Tìm kiếm ghế..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
//         >
//           <Search size={18} /> Tìm kiếm
//         </button>
//       </div>

//       {/* Danh sách ghế */}
//       <table className="w-full bg-white rounded-lg shadow overflow-hidden">
//         <thead>
//           <tr className="bg-gray-200 text-left">
//             <th className="p-3">Số ghế</th>
//             <th className="p-3">Loại ghế</th>
//             <th className="p-3">Trạng thái</th>
//             <th className="p-3 text-center">Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.map((s) => (
//             <tr key={s.id} className="border-b hover:bg-gray-50">
//               <td className="p-3">{s.number}</td>
//               <td className="p-3">{s.type}</td>
//               <td className="p-3">{s.status}</td>
//               <td className="p-3 text-center flex justify-center gap-3">
//                 <button className="text-blue-500 hover:text-blue-700">
//                   <Edit size={18} />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(s.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <Trash size={18} />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash, Search } from "lucide-react";
import {
  getSeats,
  createSeat,
  deleteSeat,
  updateSeat,
} from  "../../apis/seatApi";

export default function Seats() {
  const [seats, setSeats] = useState([]);
  const [newSeat, setNewSeat] = useState({ number: "", type: "", status: "" });
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const data = await getSeats();
      setSeats(data);
      setFiltered(data);
    } catch (error) {
      alert("Lấy danh sách ghế thất bại");
    }
  };

  const handleAddSeat = async (e) => {
    e.preventDefault();
    if (!newSeat.number || !newSeat.type || !newSeat.status) return;

    try {
      await createSeat({
        soGhe: newSeat.number,
        loaiGhe: newSeat.type,
        trangThai: newSeat.status,
      });
      await fetchSeats();
      setNewSeat({ number: "", type: "", status: "" });
    } catch (error) {
      alert("Thêm ghế thất bại");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa ghế này?")) {
      try {
        await deleteSeat(id);
        await fetchSeats();
      } catch (error) {
        alert("Xóa ghế thất bại");
      }
    }
  };

  const handleSearch = () => {
    if (!search.trim()) {
      setFiltered(seats);
    } else {
      setFiltered(
        seats.filter(
          (s) =>
            s.soGhe.toLowerCase().includes(search.toLowerCase()) ||
            s.loaiGhe.toLowerCase().includes(search.toLowerCase()) ||
            s.trangThai.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Quản lý ghế</h1>

      {/* Form thêm ghế */}
      <form
        onSubmit={handleAddSeat}
        className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4"
      >
        <input
          type="text"
          placeholder="Số ghế (VD: A1)"
          value={newSeat.number}
          onChange={(e) => setNewSeat({ ...newSeat, number: e.target.value })}
          className="border p-2 rounded w-32"
        />
        <input
          type="text"
          placeholder="Loại ghế (VIP/Thường)"
          value={newSeat.type}
          onChange={(e) => setNewSeat({ ...newSeat, type: e.target.value })}
          className="border p-2 rounded w-40"
        />
        <select
          value={newSeat.status}
          onChange={(e) => setNewSeat({ ...newSeat, status: e.target.value })}
          className="border p-2 rounded w-40"
        >
          <option value="">-- Trạng thái --</option>
          <option value="Trống">Trống</option>
          <option value="Đã đặt">Đã đặt</option>
          <option value="Bảo trì">Bảo trì</option>
        </select>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} /> Thêm ghế
        </button>
      </form>

      {/* Thanh tìm kiếm */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm ghế..."
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

      {/* Danh sách ghế */}
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Số ghế</th>
            <th className="p-3">Loại ghế</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{s.soGhe}</td>
              <td className="p-3">{s.loaiGhe}</td>
              <td className="p-3">{s.trangThai}</td>
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

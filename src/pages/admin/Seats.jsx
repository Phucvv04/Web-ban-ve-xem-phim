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


// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash, Search } from "lucide-react";
// import {
//   getSeats,
//   createSeat,
//   deleteSeat,
//   updateSeat,
// } from "../../apis/seatApi";

// export default function Seats() {
//   const [seats, setSeats] = useState([]);
//   const [filteredSeats, setFilteredSeats] = useState([]);
//   const [search, setSearch] = useState("");
//   const [newSeat, setNewSeat] = useState({
//     soGhe: "",
//     loaiGhe: "",
//     trangThai: "",
//   });

//   useEffect(() => {
//     fetchSeats();
//   }, []);

//   useEffect(() => {
//     // Tự động lọc khi search hoặc danh sách ghế thay đổi
//     if (!search.trim()) {
//       setFilteredSeats(seats);
//     } else {
//       const lowerSearch = search.toLowerCase();
//       setFilteredSeats(
//         seats.filter(
//           (s) =>
//             s.soGhe.toLowerCase().includes(lowerSearch) ||
//             s.loaiGhe.toLowerCase().includes(lowerSearch) ||
//             s.trangThai.toLowerCase().includes(lowerSearch)
//         )
//       );
//     }
//   }, [search, seats]);

//   // Hàm lấy danh sách ghế từ API và log để debug id
//   const fetchSeats = async () => {
//     try {
//       const data = await getSeats();
//       console.log("Fetched seats:", data);

//       // Debug từng seat xem có trường id nào
//       data.forEach((seat, idx) => {
//         console.log(
//           `Seat ${idx} keys:`,
//           Object.keys(seat),
//           "id:",
//           seat.id,
//           "_id:",
//           seat._id
//         );
//       });

//       setSeats(data);
//       setFilteredSeats(data);
//     } catch (error) {
//       alert("Lấy danh sách ghế thất bại");
//       console.error(error);
//     }
//   };

//   // Thêm ghế mới
//   const handleAddSeat = async (e) => {
//     e.preventDefault();
//     const { soGhe, loaiGhe, trangThai } = newSeat;
//     if (!soGhe || !loaiGhe || !trangThai) {
//       alert("Vui lòng nhập đủ thông tin ghế");
//       return;
//     }
//     try {
//       await createSeat(newSeat);
//       await fetchSeats();
//       setNewSeat({ soGhe: "", loaiGhe: "", trangThai: "" });
//     } catch (error) {
//       alert("Thêm ghế thất bại");
//       console.error(error);
//     }
//   };

//   // Xoá ghế theo id, kiểm tra id trước khi xoá
//   const handleDelete = async (id) => {
//     console.log("Delete id:", id); // debug xem id có hợp lệ không
//     if (!id) {
//       alert("Id ghế không hợp lệ, không thể xóa");
//       return;
//     }
//     if (window.confirm("Bạn có chắc muốn xóa ghế này?")) {
//       try {
//         await deleteSeat(id);
//         await fetchSeats();
//       } catch (error) {
//         alert("Xóa ghế thất bại");
//         console.error(error);
//       }
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
//           value={newSeat.soGhe}
//           onChange={(e) => setNewSeat({ ...newSeat, soGhe: e.target.value })}
//           className="border p-2 rounded w-32"
//         />
//         <input
//           type="text"
//           placeholder="Loại ghế (VIP/Thường)"
//           value={newSeat.loaiGhe}
//           onChange={(e) => setNewSeat({ ...newSeat, loaiGhe: e.target.value })}
//           className="border p-2 rounded w-40"
//         />
//         <select
//           value={newSeat.trangThai}
//           onChange={(e) => setNewSeat({ ...newSeat, trangThai: e.target.value })}
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
//           onClick={() => {
//             /* nút này không cần dùng nữa vì filter tự động */
//           }}
//           className="bg-blue-500 cursor-not-allowed opacity-50 text-white px-4 py-2 rounded flex items-center gap-2"
//           disabled
//         >
//           <Search size={18} /> Tìm kiếm
//         </button>
//       </div>

//       {/* Bảng danh sách ghế */}
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
//           {filteredSeats.map((s, idx) => {
//             // Lấy id đúng theo dữ liệu backend trả về, thử _id hoặc id
//             const seatId = s._id || s.id || null;

//             return (
//               <tr key={seatId || idx} className="border-b hover:bg-gray-50">
//                 <td className="p-3">{s.soGhe}</td>
//                 <td className="p-3">{s.loaiGhe}</td>
//                 <td className="p-3">{s.trangThai}</td>
//                 <td className="p-3 text-center flex justify-center gap-3">
//                   {/* Nút sửa hiện đang disable */}
//                   <button
//                     disabled
//                     className="text-blue-300 cursor-not-allowed"
//                     title="Chức năng sửa chưa có"
//                   >
//                     <Edit size={18} />
//                   </button>
//                   {/* Nút xóa */}
//                   <button
//                     onClick={() => handleDelete(seatId)}
//                     className="text-red-500 hover:text-red-700"
//                     disabled={!seatId} // Disable nếu không có id hợp lệ
//                   >
//                     <Trash size={18} />
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//           {filteredSeats.length === 0 && (
//             <tr>
//               <td colSpan={4} className="p-4 text-center text-gray-500">
//                 Không tìm thấy ghế nào
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash, Search, Save, X } from "lucide-react";
import {
  getSeats,
  createSeat,
  deleteSeat,
  updateSeat,
} from "../../apis/seatApi";

export default function Seats() {
  const [seats, setSeats] = useState([]);
  const [filteredSeats, setFilteredSeats] = useState([]);
  const [search, setSearch] = useState("");
  
  // form state chứa dữ liệu để thêm hoặc sửa
  const [seatForm, setSeatForm] = useState({
    soGhe: "",
    loaiGhe: "",
    trangThai: "",
  });

  // Id ghế đang sửa, null = thêm mới
  const [editingId, setEditingId] = useState(null);

  // Lấy dữ liệu ghế từ backend
  const fetchSeats = async () => {
    try {
      const data = await getSeats();
      setSeats(data);
      setFilteredSeats(data);
    } catch (error) {
      alert("Lấy danh sách ghế thất bại");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  // Tự động filter theo search
  useEffect(() => {
    if (!search.trim()) {
      setFilteredSeats(seats);
    } else {
      const lowerSearch = search.toLowerCase();
      setFilteredSeats(
        seats.filter(
          (s) =>
            s.soGhe.toLowerCase().includes(lowerSearch) ||
            s.loaiGhe.toLowerCase().includes(lowerSearch) ||
            s.trangThai.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [search, seats]);

  // Handle submit form (thêm mới hoặc cập nhật)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { soGhe, loaiGhe, trangThai } = seatForm;

    if (!soGhe || !loaiGhe || !trangThai) {
      alert("Vui lòng nhập đủ thông tin ghế");
      return;
    }

    try {
      if (editingId) {
        // cập nhật ghế
        await updateSeat(editingId, seatForm);
        alert("Cập nhật ghế thành công");
      } else {
        // thêm ghế mới
        await createSeat(seatForm);
        alert("Thêm ghế thành công");
      }
      setEditingId(null);
      setSeatForm({ soGhe: "", loaiGhe: "", trangThai: "" });
      await fetchSeats();
    } catch (error) {
      alert(editingId ? "Cập nhật ghế thất bại" : "Thêm ghế thất bại");
      console.error(error);
    }
  };

  // Bắt đầu sửa ghế: đổ dữ liệu lên form, lưu editingId
  const handleEditClick = (seat) => {
    setEditingId(seat.id || seat._id); // hoặc id hay _id tùy backend trả về
    setSeatForm({
      soGhe: seat.soGhe,
      loaiGhe: seat.loaiGhe,
      trangThai: seat.trangThai,
    });
  };

  // Hủy sửa, chuyển về thêm mới
  const handleCancelEdit = () => {
    setEditingId(null);
    setSeatForm({ soGhe: "", loaiGhe: "", trangThai: "" });
  };

  // Xóa ghế
  const handleDelete = async (id) => {
    if (!id) {
      alert("Id ghế không hợp lệ, không thể xóa");
      return;
    }
    if (window.confirm("Bạn có chắc muốn xóa ghế này?")) {
      try {
        await deleteSeat(id);
        alert("Xóa ghế thành công");
        // Nếu đang sửa ghế này thì reset form
        if (editingId === id) {
          handleCancelEdit();
        }
        await fetchSeats();
      } catch (error) {
        alert("Xóa ghế thất bại");
        console.error(error);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Quản lý ghế</h1>

      {/* Form thêm/sửa ghế */}
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4 items-center"
      >
        <input
          type="text"
          placeholder="Số ghế (VD: A1)"
          value={seatForm.soGhe}
          onChange={(e) => setSeatForm({ ...seatForm, soGhe: e.target.value })}
          className="border p-2 rounded w-32"
          disabled={editingId !== null} // Không cho sửa số ghế khi chỉnh sửa
          title={
            editingId
              ? "Không thể thay đổi số ghế khi sửa"
              : "Nhập số ghế"
          }
        />
        <input
          type="text"
          placeholder="Loại ghế (VIP/Thường)"
          value={seatForm.loaiGhe}
          onChange={(e) => setSeatForm({ ...seatForm, loaiGhe: e.target.value })}
          className="border p-2 rounded w-40"
        />
        <select
          value={seatForm.trangThai}
          onChange={(e) => setSeatForm({ ...seatForm, trangThai: e.target.value })}
          className="border p-2 rounded w-40"
        >
          <option value="">-- Trạng thái --</option>
          <option value="Trống">Trống</option>
          <option value="Đã đặt">Đã đặt</option>
          <option value="Bảo trì">Bảo trì</option>
        </select>

        <button
          type="submit"
          className={`${
            editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
          } text-white px-4 py-2 rounded flex items-center gap-2`}
        >
          {editingId ? <Save size={18} /> : <Plus size={18} />}
          {editingId ? "Lưu sửa" : "Thêm ghế"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded flex items-center gap-2"
          >
            <X size={18} />
            Hủy sửa
          </button>
        )}
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
          disabled
          className="bg-blue-500 cursor-not-allowed opacity-50 text-white px-4 py-2 rounded flex items-center gap-2"
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
          {filteredSeats.length > 0 ? (
            filteredSeats.map((seat) => (
              <tr key={seat.id || seat._id}>
                <td className="p-3">{seat.soGhe}</td>
                <td className="p-3">{seat.loaiGhe}</td>
                <td className="p-3">{seat.trangThai}</td>
                <td className="p-3 text-center flex justify-center gap-3">
                  <button
                    onClick={() => handleEditClick(seat)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Sửa ghế"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(seat.id || seat._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Xóa ghế"
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                Không tìm thấy ghế nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

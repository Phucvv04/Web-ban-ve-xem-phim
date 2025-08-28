import { useState, useEffect } from "react";
import { Plus, Edit, Trash, Search, Save } from "lucide-react";
import axios from "axios";

export default function Cinemas() {
  const api = axios.create({
    baseURL: "http://localhost:8080",
  });

  const [cinemas, setCinemas] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    address: "",
    rooms: "",
    image: null, // file mới
    oldImage: null, // ảnh cũ để preview
  });
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetchCinemas();
  }, []);

  const fetchCinemas = async () => {
    try {
      const res = await api.get("/api/cinemas");
      setCinemas(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi load rạp:", err);
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      address: "",
      rooms: "",
      image: null,
      oldImage: null,
    });
  };

  // Thêm hoặc cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.rooms) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("address", form.address);
      formData.append("rooms", form.rooms);

      if (form.image) {
        // Nếu chọn ảnh mới thì upload
        formData.append("image", form.image);
      } else if (form.oldImage) {
        // Nếu không chọn ảnh mới thì báo backend giữ ảnh cũ
        formData.append("keepOldImage", "true");
      }

      let res;
      if (form.id) {
        res = await api.put(`/api/cinemas/${form.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setCinemas((prev) =>
          prev.map((c) => (c.id === form.id ? res.data : c))
        );
        setFiltered((prev) =>
          prev.map((c) => (c.id === form.id ? res.data : c))
        );
      } else {
        res = await api.post("/api/cinemas", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setCinemas((prev) => [...prev, res.data]);
        setFiltered((prev) => [...prev, res.data]);
      }

      resetForm();
    } catch (err) {
      console.error("❌ Lỗi khi lưu rạp:", err);
      alert("Lưu thất bại!");
    }
  };

  // Xóa
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa rạp này?")) return;
    try {
      await api.delete(`/api/cinemas/${id}`);
      const updated = cinemas.filter((c) => c.id !== id);
      setCinemas(updated);
      setFiltered(updated);
    } catch (err) {
      console.error("❌ Lỗi khi xóa rạp:", err);
    }
  };

  // Bấm sửa
  const handleEdit = (cinema) => {
    setForm({
      id: cinema.id,
      name: cinema.name || "",
      address: cinema.address || "",
      rooms: cinema.rooms || "",
      image: null, // reset input file
      oldImage: cinema.image || null, // lưu lại ảnh cũ
    });
  };

  // Tìm kiếm
  const handleSearch = () => {
    if (!search.trim()) {
      setFiltered(cinemas);
      return;
    }
    const q = search.toLowerCase();
    setFiltered(
      cinemas.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.address?.toLowerCase().includes(q)
      )
    );
  };

  const getImageSrc = (cinema) => {
    const v = cinema.image;
    if (!v || v.trim() === "") {
      return "https://via.placeholder.com/100x60?text=No+Image";
    }
    if (v.startsWith("http://") || v.startsWith("https://")) return v;
    return `${api.defaults.baseURL}${v.startsWith("/") ? v : `/${v}`}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Quản lý rạp chiếu</h1>

      {/* Form thêm/cập nhật */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4"
      >
        <input
          type="text"
          placeholder="Tên rạp"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded flex-1"
          required
        />
        <input
          type="text"
          placeholder="Địa chỉ"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="border p-2 rounded flex-1"
          required
        />
        <input
          type="number"
          placeholder="Số phòng chiếu"
          value={form.rooms}
          onChange={(e) => setForm({ ...form, rooms: e.target.value })}
          className="border p-2 rounded w-40"
          required
        />

        <div className="flex flex-col">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setForm({ ...form, image: file || null });
            }}
          />

          {/* Nếu đang sửa và chưa chọn ảnh mới → hiện ảnh cũ */}
          {form.id && !form.image && form.oldImage && (
            <img
              src={getImageSrc({ image: form.oldImage })}
              alt="Ảnh hiện tại"
              className="w-32 h-20 object-cover mt-2 rounded"
            />
          )}

          {/* Nếu vừa chọn ảnh mới thì hiện preview */}
          {form.image && (
            <img
              src={URL.createObjectURL(form.image)}
              alt="Ảnh mới"
              className="w-32 h-20 object-cover mt-2 rounded"
            />
          )}
        </div>

        <button
          type="submit"
          className={`${
            form.id
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white px-4 py-2 rounded flex items-center gap-2`}
        >
          {form.id ? <Save size={18} /> : <Plus size={18} />}
          {form.id ? "Cập nhật rạp" : "Thêm rạp"}
        </button>
        {form.id && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Hủy
          </button>
        )}
      </form>

      {/* Thanh tìm kiếm */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm rạp..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Search size={18} /> Tìm kiếm
        </button>
      </div>

      {/* Danh sách */}
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
                  src={getImageSrc(cinema)}
                  alt={cinema.name}
                  className="w-24 h-14 object-cover rounded"
                />
              </td>
              <td className="p-3">{cinema.name}</td>
              <td className="p-3">{cinema.address}</td>
              <td className="p-3">{cinema.rooms}</td>
              <td className="p-3 text-center flex justify-center gap-3">
                <button
                  onClick={() => handleEdit(cinema)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Sửa"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(cinema.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Xóa"
                >
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td className="p-4 text-center text-gray-500" colSpan={5}>
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

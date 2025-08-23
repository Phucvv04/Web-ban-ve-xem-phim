import { useState } from "react";
import { Plus, Edit, Trash, Search } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "admin",
      name: "Quản trị viên",
      email: "admin@example.com",
      phone: "0901234567",
      role: "Admin",
    },
    {
      id: 2,
      username: "user01",
      name: "Nguyễn Văn A",
      email: "a.nguyen@example.com",
      phone: "0912345678",
      role: "User",
    },
  ]);

  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(users);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (
      !newUser.username ||
      !newUser.name ||
      !newUser.email ||
      !newUser.phone ||
      !newUser.role
    )
      return;

    const added = {
      id: Date.now(),
      ...newUser,
    };

    setUsers([...users, added]);
    setFiltered([...filtered, added]);
    setNewUser({
      username: "",
      name: "",
      email: "",
      phone: "",
      role: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      setFiltered(updated);
    }
  };

  const handleSearch = () => {
    if (!search.trim()) {
      setFiltered(users);
    } else {
      setFiltered(
        users.filter(
          (u) =>
            u.username.toLowerCase().includes(search.toLowerCase()) ||
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.phone.includes(search) ||
            u.role.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>

      {/* Form thêm người dùng */}
      <form
        onSubmit={handleAddUser}
        className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4"
      >
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="border p-2 rounded w-40"
        />
        <input
          type="text"
          placeholder="Họ tên"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border p-2 rounded w-48"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 rounded w-48"
        />
        <input
          type="text"
          placeholder="SĐT"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          className="border p-2 rounded w-40"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="border p-2 rounded w-32"
        >
          <option value="">-- Vai trò --</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Staff">Staff</option>
        </select>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} /> Thêm
        </button>
      </form>

      {/* Thanh tìm kiếm */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm người dùng..."
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

      {/* Danh sách người dùng */}
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Tên đăng nhập</th>
            <th className="p-3">Họ tên</th>
            <th className="p-3">Email</th>
            <th className="p-3">SĐT</th>
            <th className="p-3">Vai trò</th>
            <th className="p-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{u.username}</td>
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.phone}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3 text-center flex justify-center gap-3">
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
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

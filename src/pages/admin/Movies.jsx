import { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash, Search } from "lucide-react";

export default function Movies() {
  const [tempSearch, setTempSearch] = useState("");
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const [newMovie, setNewMovie] = useState({
    name: "",
    category: "",
    duration: "",
    description: "",
    file: null, // lưu file
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Load movies
  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/movies");
      setMovies(res.data);
    } catch (err) {
      console.error("Lỗi load phim:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Submit (thêm/sửa)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newMovie.name);
    formData.append("category", newMovie.category);
    formData.append("duration", newMovie.duration);
    formData.append("description", newMovie.description);

    if (newMovie.file) {
      formData.append("poster", newMovie.file);
    }

    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:8080/api/movies/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post("http://localhost:8080/api/movies", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchMovies();
      setNewMovie({
        name: "",
        category: "",
        duration: "",
        description: "",
        file: null,
      });
      setIsEditing(false);
      setEditId(null);
    } catch (err) {
      console.error("Lỗi lưu phim:", err);
    }
  };

  // Xóa
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phim này?")) {
      try {
        await axios.delete(`http://localhost:8080/api/movies/${id}`);
        fetchMovies();
      } catch (err) {
        console.error("Lỗi xóa phim:", err);
      }
    }
  };

  // Edit
  const handleEdit = (movie) => {
    setNewMovie({
      name: movie.name,
      category: movie.category,
      duration: movie.duration,
      description: movie.description,
      file: null,
    });
    setIsEditing(true);
    setEditId(movie.id);
  };

  const handleSearch = () => setSearch(tempSearch);

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Quản lý phim</h1>

      {/* Form thêm/sửa */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4"
      >
        <input
          type="text"
          placeholder="Tên phim"
          value={newMovie.name}
          onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Thể loại"
          value={newMovie.category}
          onChange={(e) =>
            setNewMovie({ ...newMovie, category: e.target.value })
          }
          className="border p-2 rounded flex-1"
        />
        <input
          type="number"
          placeholder="Thời lượng (phút)"
          value={newMovie.duration}
          onChange={(e) =>
            setNewMovie({ ...newMovie, duration: e.target.value })
          }
          className="border p-2 rounded w-40"
        />

        {/* File upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewMovie({ ...newMovie, file: e.target.files[0] })
          }
          className="border p-2 rounded flex-1"
        />

        <textarea
          placeholder="Mô tả phim"
          value={newMovie.description}
          onChange={(e) =>
            setNewMovie({ ...newMovie, description: e.target.value })
          }
          className="border p-2 rounded w-full"
          rows={2}
        />

        <button
          type="submit"
          className={`${
            isEditing
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white px-4 py-2 rounded`}
        >
          {isEditing ? "Cập nhật" : "Thêm phim"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditId(null);
              setNewMovie({
                name: "",
                category: "",
                duration: "",
                description: "",
                file: null,
              });
            }}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Hủy
          </button>
        )}
      </form>

      {/* Tìm kiếm */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm phim..."
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Search size={18} /> Tìm kiếm
        </button>
      </div>

      {/* Danh sách phim */}
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Poster</th>
            <th className="p-3">Tên phim</th>
            <th className="p-3">Thể loại</th>
            <th className="p-3">Thời lượng</th>
            <th className="p-3">Mô tả</th>
            <th className="p-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie) => (
            <tr key={movie.id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                <img
                  src={movie.poster}
                  alt={movie.name}
                  className="w-16 h-24 object-cover rounded"
                />
              </td>
              <td className="p-3">{movie.name}</td>
              <td className="p-3">{movie.category}</td>
              <td className="p-3">{movie.duration} phút</td>
              <td className="p-3 max-w-xs">{movie.description}</td>
              <td className="p-3 text-center flex justify-center gap-3">
                <button
                  onClick={() => handleEdit(movie)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(movie.id)}
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

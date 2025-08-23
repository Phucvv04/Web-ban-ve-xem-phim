import { useState } from "react";
import "../../styles/client.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
    console.log("Register data:", formData);
  };

  return (
    <div className="client-container">
      <div className="form-card">
        <h2 className="form-title">Đăng ký</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="username"
            placeholder="Tên đăng nhập"
            className="form-input"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            className="form-input"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className="form-btn">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

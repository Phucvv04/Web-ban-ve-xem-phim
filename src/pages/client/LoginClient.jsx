import { useState } from "react";
import "../../styles/client.css";

function LoginClient() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <div className="client-container">
      <div className="form-card">
        <h2 className="form-title">Đăng nhập</h2>
        <form onSubmit={handleSubmit} className="form">
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
          <button type="submit" className="form-btn">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginClient;

import "../../styles/client.css";

export default function HomeClient() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">🎬 Chào mừng đến với Movie Booking</h1>
        <p className="home-subtitle">Đặt vé xem phim nhanh chóng & tiện lợi</p>
      </header>

      <section className="home-movies">
        <h2 className="section-title">Phim đang chiếu</h2>
        <div className="movie-grid">
          <div className="movie-card">
            <img src="/images/movie1.jpg" alt="Movie 1" />
            <h3>Avengers: Endgame</h3>
            <button className="btn-primary">Xem chi tiết</button>
          </div>

          <div className="movie-card">
            <img src="/images/movie2.jpg" alt="Movie 2" />
            <h3>Spider-Man: No Way Home</h3>
            <button className="btn-primary">Xem chi tiết</button>
          </div>
        </div>
      </section>
    </div>
  );
}

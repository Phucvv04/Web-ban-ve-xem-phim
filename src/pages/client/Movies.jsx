import "../../styles/client.css";

const Movies = () => {
  return (
    <div className="movies-container">
      <h2 className="page-title">Movies</h2>
      <div className="movie-grid">
        <div className="movie-card">Movie 1</div>
        <div className="movie-card">Movie 2</div>
        <div className="movie-card">Movie 3</div>
      </div>
    </div>
  );
};

export default Movies;

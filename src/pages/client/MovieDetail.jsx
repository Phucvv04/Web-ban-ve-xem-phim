import "../../styles/client.css";

const MovieDetail = () => {
  return (
    <div className="movie-detail">
      <h2 className="page-title">Movie Title</h2>
      <div className="movie-info">
        <img src="poster.jpg" alt="poster" className="movie-poster" />
        <div className="movie-description">
          <p>
            <strong>Genre:</strong> Action
          </p>
          <p>
            <strong>Duration:</strong> 120 min
          </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button className="btn-primary">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

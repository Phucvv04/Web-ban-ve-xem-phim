import "../../styles/client.css";

const Seats = () => {
  return (
    <div className="client-page">
      <h2 className="client-title">Seats Selection</h2>
      <p className="client-text">Choose your seats for the selected movie.</p>
      <div className="seats-grid">
        {Array.from({ length: 20 }, (_, i) => (
          <button key={i} className="seat">
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Seats;

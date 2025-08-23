import "../../styles/client.css";

const Showtimes = () => {
  const showtimes = [
    "10:00 AM",
    "01:00 PM",
    "04:00 PM",
    "07:00 PM",
    "09:30 PM",
  ];

  return (
    <div className="client-page">
      <h2 className="client-title">Showtimes</h2>
      <ul className="showtimes-list">
        {showtimes.map((time, index) => (
          <li key={index} className="showtime">
            {time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Showtimes;

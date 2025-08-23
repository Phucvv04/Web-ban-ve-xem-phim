import "../../styles/client.css";
const Booking = () => {
  return (
    <div className="booking-container">
      <h2 className="page-title">Booking</h2>
      <form className="booking-form">
        <label>
          Movie:
          <select className="form-input">
            <option>Movie 1</option>
            <option>Movie 2</option>
          </select>
        </label>
        <label>
          Date:
          <input type="date" className="form-input" />
        </label>
        <label>
          Time:
          <input type="time" className="form-input" />
        </label>
        <button className="btn-primary">Book Now</button>
      </form>
    </div>
  );
};

export default Booking;

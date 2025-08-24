import axios from "axios";

const API_URL = "http://localhost:8085/api/seat"; // đổi theo backend bạn đang chạy

export const getSeats = async () => {
  const res = await axios.get(API_URL);
  return res.data; // mảng SeatResponse
};

export const createSeat = async (seat: {
  soGhe: string;
  loaiGhe: string;
  trangThai: string;
}) => {
  const res = await axios.post(API_URL, seat);
  return res.data;
};

export const deleteSeat = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

// Nếu muốn update
export const updateSeat = async (
  id: string,
  seat: { loaiGhe: string; trangThai: string }
) => {
  const res = await axios.put(`${API_URL}/${id}`, seat);
  return res.data;
};

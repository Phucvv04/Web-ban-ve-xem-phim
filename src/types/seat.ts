export interface SeatResponse {
  id: string;
  soGhe: string;
  loaiGhe: string;
  trangThai: string;
}

export interface SeatCreateRequest {
  soGhe: string;
  loaiGhe: string;
  trangThai: string;
}

export interface SeatUpdateRequest {
  loaiGhe: string;
  trangThai: string;
}

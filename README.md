# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

src/
├── assets/
├── components/
│ ├── common/ # Component dùng chung
│ ├── admin/ # Component riêng admin
│ └── client/ # Component riêng client
│
├── pages/
│ ├── admin/
│ │ ├── Home.jsx
│ │ ├── Movies.jsx
│ │ ├── Cinemas.jsx
│ │ ├── Showtimes.jsx
│ │ ├── Tickets.jsx
│ │ ├── Seats.jsx
│ │ ├── Users.jsx
│ │ ├── Statistics.jsx
│ │ └── Login.jsx
│ │
│ └── client/
│ ├── HomeClient.jsx
│ ├── Movies.jsx
│ ├── MovieDetail.jsx
│ ├── Showtimes.jsx
│ ├── Booking.jsx
│ ├── Seats.jsx
│ ├── Payment.jsx
│ ├── Profile.jsx
│ ├── LoginClient.jsx
│ └── Register.jsx
│
├── services/ # API gọi dữ liệu
├── config/ # Config chung
├── App.jsx
├── index.css
└── main.jsx

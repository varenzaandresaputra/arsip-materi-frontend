import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Konfigurasi CORS hanya mengizinkan frontend lokal
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

// Rute uji sehat (health check)
app.get('/api/sehat', (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Peladen backend berjalan di http://localhost:${PORT}`);
});
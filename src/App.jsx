import { useState, useEffect } from 'react';
import DaftarMateri from './components/DaftarMateri';
import { ambilMateri, tambahMateri } from './api/materi';

export default function App() {
  const [materi, setMateri] = useState([]);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState(null);

  const [judul, setJudul] = useState('');
  const [mataKuliah, setMataKuliah] = useState('');
  const [pertemuan, setPertemuan] = useState('');
  const [linkMateri, setLinkMateri] = useState('');

  const muatData = async () => {
    setMemuat(true);
    setGalat(null);
    try {
      const data = await ambilMateri();
      setMateri(data);
    } catch (err) {
      setGalat(err.message);
    } finally {
      setMemuat(false);
    }
  };

  useEffect(() => {
    muatData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await tambahMateri({
        judul,
        mata_kuliah: mataKuliah,
        pertemuan,
        link: linkMateri
      });
      
      setJudul('');
      setMataKuliah('');
      setPertemuan('');
      setLinkMateri('');
      muatData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>ArsipMateri</h1>

      <form onSubmit={handleSubmit} style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Tambah Materi Baru</h3>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Judul Materi" 
            value={judul} 
            onChange={(e) => setJudul(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Mata Kuliah" 
            value={mataKuliah} 
            onChange={(e) => setMataKuliah(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Pertemuan (cth: Pertemuan 3)" 
            value={pertemuan} 
            onChange={(e) => setPertemuan(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Link URL" 
            value={linkMateri} 
            onChange={(e) => setLinkMateri(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Simpan Materi
        </button>
      </form>

      <hr />

      <h2>Daftar Materi</h2>
      {memuat && <p>Memuat…</p>}

      {!memuat && galat && (
        <div style={{ color: 'red', marginBottom: '16px' }}>
          <p>{galat}</p>
          <button onClick={muatData}>Coba lagi</button>
        </div>
      )}

      {!memuat && !galat && materi.length === 0 && (
        <p>Belum ada materi</p>
      )}

      {!memuat && !galat && materi.length > 0 && (
        <DaftarMateri materi={materi} />
      )}
    </main>
  );
}
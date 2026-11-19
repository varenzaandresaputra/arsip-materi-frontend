export async function ambilMateri() {
  const url = import.meta.env.VITE_API_URL + '/materi';
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    throw new Error('Gagal terhubung ke server API.');
  }

  if (!res.ok) {
    throw new Error('Gagal memuat data materi');
  }

  return await res.json();
}

export async function tambahMateri(dataBaru) {
  const url = import.meta.env.VITE_API_URL + '/materi';
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataBaru),
  });

  // Ambil pesan error dari backend jika ada
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Gagal menambahkan materi baru');
  }

  return await res.json();
}
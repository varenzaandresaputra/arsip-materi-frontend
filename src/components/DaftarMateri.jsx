import React from 'react';

export default function DaftarMateri({ materi }) {
  return (
    <div className="grid gap-4">
      {materi.map((item) => (
        <div key={item.id} className="border p-4 rounded shadow-sm bg-white">
          <h2 className="text-xl font-semibold text-gray-800">{item.judul}</h2>
          <p className="text-sm text-gray-600">Mata Kuliah: {item.mata_kuliah}</p>
          <p className="text-sm text-gray-600">Pertemuan {item.pertemuan}</p>
          
          {/* Ubah dari item.tautan menjadi item.link */}
          {item.link && (
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm mt-2 inline-block"
            >
              Buka Materi
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

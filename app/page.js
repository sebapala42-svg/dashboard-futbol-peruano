// page.js (Next.js App Router)
'use client';

import { useState } from 'react';

// 1. BASE DE DATOS Y LOGOS (Reemplaza los diccionarios de Python)
const logosEquipos = {
  'Universitario': 'https://tmssl.akamaized.net//images/wappen/head/6593.png',
  'Alianza Lima': 'https://tmssl.akamaized.net//images/wappen/head/184.png?lm=1755275805',
  'Sporting Cristal': 'https://tmssl.akamaized.net//images/wappen/head/21157.png',
  // ... agrega el resto de tu diccionario aquí
};

const data2026 = [
  { fecha: 1, local: 'Sport Huancayo', visitante: 'Alianza Lima', gl: 1, gv: 2 },
  { fecha: 1, local: 'Universitario', visitante: 'ADT', gl: 2, gv: 0 },
  // ... agrega tus partidos aquí en formato JSON
];

export default function LigaPro() {
  // 2. REEMPLAZO DE st.session_state
  const [temporada, setTemporada] = useState('2026');
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [pestañaActiva, setPestañaActiva] = useState('FIXTURE');
  const [fechaSeleccionada, setFechaSeleccionada] = useState(1);

  // 3. RENDERIZADO VISUAL (Reemplazo del CSS extremo y st.markdown)
  return (
    <div className="min-h-screen bg-[#0b4026] text-white font-sans p-4">
      <h2 className="text-2xl font-bold text-center mb-6">LIGA PROFESIONAL PERUANA {temporada}</h2>

      {/* TABS SIMULADOS */}
      <div className="flex justify-center border-b border-[#1a4a2e] mb-6">
        {['FIXTURE', 'ESTADÍSTICAS', 'CAMPEONES'].map((tab) => (
          <button
            key={tab}
            onClick={() => setPestañaActiva(tab)}
            className={`px-4 py-2 text-sm font-bold ${
              pestañaActiva === tab
                ? 'text-white border-b-4 border-[#8cc63f]'
                : 'text-[#87b897] hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENIDO DEL FIXTURE */}
      {pestañaActiva === 'FIXTURE' && (
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
          {/* Columna Izquierda (Tablas - requerirá lógica de reducción de JS) */}
          <div className="flex-[2] bg-[#112d1e] border border-[#1a4a2e] rounded-lg p-4">
            <h3 className="text-center font-bold mb-4">TABLA DE POSICIONES</h3>
            <p className="text-sm text-center text-[#87b897]">Aquí iría la lógica matemática de la tabla usando .reduce() y .filter() de JavaScript.</p>
          </div>

          {/* Columna Derecha (Partidos) */}
          <div className="flex-1">
            <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg p-4">
              <h3 className="text-[#8cc63f] font-bold text-center mb-4">TORNEO {temporada}</h3>
              
              {/* SelectBox */}
              <select 
                className="w-full bg-[#0d2418] border border-[#8cc63f] text-white p-2 rounded mb-4"
                value={fechaSeleccionada}
                onChange={(e) => setFechaSeleccionada(Number(e.target.value))}
              >
                {[...Array(17)].map((_, i) => (
                  <option key={i+1} value={i+1}>FECHA {i+1}</option>
                ))}
              </select>

              {/* Lista de Partidos */}
              <div className="flex flex-col gap-2">
                {data2026.filter(p => p.fecha === fechaSeleccionada).map((partido, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-[#153625] p-2 rounded">
                    <span className="text-xs font-bold w-1/3 text-right">{partido.local}</span>
                    <div className="flex items-center mx-2 gap-1">
                      <div className="bg-[#0d2418] px-2 py-1 rounded text-sm">{partido.gl ?? '-'}</div>
                      <span className="text-[#8cc63f] font-bold">-</span>
                      <div className="bg-[#0d2418] px-2 py-1 rounded text-sm">{partido.gv ?? '-'}</div>
                    </div>
                    <span className="text-xs font-bold w-1/3 text-left">{partido.visitante}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

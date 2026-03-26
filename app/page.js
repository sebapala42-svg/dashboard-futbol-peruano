'use client';

import { useState } from 'react';

// --- 1. BASE DE DATOS TRADUCIDA A JAVASCRIPT ---
// Tus logos (reducidos aquí para el ejemplo, pero pones todos los tuyos)
const logosEquipos = {
  'Universitario': 'https://tmssl.akamaized.net//images/wappen/head/6593.png',
  'Alianza Lima': 'https://tmssl.akamaized.net//images/wappen/head/184.png?lm=1755275805',
  'Sporting Cristal': 'https://tmssl.akamaized.net//images/wappen/head/21157.png',
  'FBC Melgar': 'https://tmssl.akamaized.net//images/wappen/head/2734.png',
  'Cienciano': 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4814.png',
};

// Tus partidos de 2026 (Formato JSON en lugar de listas de Python)
const partidos2026 = [
  { fecha: 1, local: 'Sport Huancayo', visitante: 'Alianza Lima', gl: 1, gv: 2 },
  { fecha: 1, local: 'FBC Melgar', visitante: 'Cienciano', gl: 2, gv: 0 },
  { fecha: 1, local: 'Deportivo Garcilaso', visitante: 'Sporting Cristal', gl: 1, gv: 1 },
  { fecha: 1, local: 'Universitario', visitante: 'ADT', gl: 2, gv: 0 },
  { fecha: 2, local: 'Sporting Cristal', visitante: 'FBC Melgar', gl: 1, gv: 2 },
  // ... (aquí copias y pegas el resto de tus partidos)
];

const equiposActuales = ['Universitario', 'Alianza Lima', 'Sporting Cristal', 'FBC Melgar', 'Cienciano']; // Agrega todos

// --- 2. EL REEMPLAZO DE PANDAS (Lógica Matemática) ---
function generarTabla(partidos, fechaLimite) {
  // Filtramos los partidos hasta la fecha seleccionada y que ya se jugaron
  const partidosValidos = partidos.filter(p => p.fecha <= fechaLimite && p.gl !== null);
  
  let tabla = equiposActuales.map(equipo => {
    let stats = { equipo, pj: 0, pts: 0, gf: 0, gc: 0, g: 0, e: 0, p: 0 };
    
    partidosValidos.forEach(partido => {
      if (partido.local === equipo || partido.visitante === equipo) {
        stats.pj++;
        let golesFavor = partido.local === equipo ? partido.gl : partido.gv;
        let golesContra = partido.local === equipo ? partido.gv : partido.gl;
        
        stats.gf += golesFavor;
        stats.gc += golesContra;
        
        if (golesFavor > golesContra) { stats.g++; stats.pts += 3; }
        else if (golesFavor === golesContra) { stats.e++; stats.pts += 1; }
        else { stats.p++; }
      }
    });
    return { ...stats, dif: stats.gf - stats.gc };
  });

  // Ordenamos: Puntos > Diferencia de Goles > Goles a Favor
  return tabla.sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);
}

// --- 3. INTERFAZ GRÁFICA (El reemplazo de Streamlit) ---
export default function LigaPro() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(2);
  const [pestañaActiva, setPestañaActiva] = useState('FIXTURE');

  const tablaPosiciones = generarTabla(partidos2026, fechaSeleccionada);
  const partidosDeLaFecha = partidos2026.filter(p => p.fecha === fechaSeleccionada);

  return (
    <div style={{ backgroundColor: '#0b4026', color: '#ffffff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>🏆 LIGA PROFESIONAL PERUANA 2026</h2>

      {/* Menú de Pestañas */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', borderBottom: '2px solid #1a4a2e', marginBottom: '20px' }}>
        {['FIXTURE Y TABLAS', 'ESTADISTICAS', 'CAMPEONES'].map(tab => (
          <button 
            key={tab}
            onClick={() => setPestañaActiva(tab)}
            style={{ 
              backgroundColor: 'transparent', color: pestañaActiva === tab ? '#ffffff' : '#87b897', 
              border: 'none', borderBottom: pestañaActiva === tab ? '3px solid #8cc63f' : 'none',
              padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {pestañaActiva === 'FIXTURE Y TABLAS' && (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          
          {/* TABLA DE POSICIONES (Columna Izquierda) */}
          <div style={{ flex: '2', backgroundColor: '#112d1e', border: '1px solid #1a4a2e', borderRadius: '8px', padding: '15px', minWidth: '300px' }}>
            <h3 style={{ textAlign: 'center', color: '#ffffff', fontSize: '14px' }}>LIGA 1 APERTURA 2026 (HASTA FECHA {fechaSeleccionada})</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#0d2418', color: '#a1b5a8' }}>
                  <th>#</th><th style={{ textAlign: 'left' }}>Equipo</th><th>PTS</th><th>J</th><th>GF:GC</th><th>+/-</th>
                </tr>
              </thead>
              <tbody>
                {tablaPosiciones.map((row, idx) => (
                  <tr key={row.equipo} style={{ backgroundColor: idx % 2 === 0 ? '#153625' : '#112d1e', borderLeft: idx < 2 ? '3px solid #3db4dc' : '3px solid transparent' }}>
                    <td>{idx + 1}</td>
                    <td style={{ textAlign: 'left', fontWeight: 'bold', display: 'flex', alignItems: 'center', padding: '5px 0' }}>
                      <img src={logosEquipos[row.equipo]} width="18" style={{ marginRight: '8px' }} alt="" /> {row.equipo}
                    </td>
                    <td style={{ fontWeight: 'bold' }}>{row.pts}</td>
                    <td>{row.pj}</td>
                    <td>{row.gf}:{row.gc}</td>
                    <td>{row.dif}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FIXTURE (Columna Derecha) */}
          <div style={{ flex: '1', backgroundColor: '#112d1e', border: '1px solid #1a4a2e', borderRadius: '8px', padding: '15px', minWidth: '300px' }}>
            <h3 style={{ textAlign: 'center', color: '#8cc63f', fontSize: '14px' }}>TORNEO 2026</h3>
            <select 
              value={fechaSeleccionada} 
              onChange={(e) => setFechaSeleccionada(Number(e.target.value))}
              style={{ width: '100%', padding: '8px', backgroundColor: '#0d2418', color: 'white', border: '1px solid #8cc63f', borderRadius: '4px', marginBottom: '15px' }}
            >
              {[...Array(17)].map((_, i) => (
                <option key={i+1} value={i+1}>FECHA {i+1}</option>
              ))}
            </select>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {partidosDeLaFecha.map((partido, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#153625', padding: '10px', borderRadius: '4px' }}>
                  <span style={{ fontSize: '12px', width: '40%', textAlign: 'right', fontWeight: 'bold' }}>{partido.local}</span>
                  <div style={{ display: 'flex', gap: '5px', fontWeight: 'bold' }}>
                    <div style={{ backgroundColor: '#0d2418', border: '1px solid #1a4a2e', width: '25px', height: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{partido.gl ?? '-'}</div>
                    <span style={{ color: '#8cc63f' }}>-</span>
                    <div style={{ backgroundColor: '#0d2418', border: '1px solid #1a4a2e', width: '25px', height: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{partido.gv ?? '-'}</div>
                  </div>
                  <span style={{ fontSize: '12px', width: '40%', textAlign: 'left', fontWeight: 'bold' }}>{partido.visitante}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

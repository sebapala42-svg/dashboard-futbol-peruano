"use client";
import { useState } from 'react';

// 1. Diccionario de Logos
const logos_equipos = {
  'Alianza Lima': 'https://tmssl.akamaized.net//images/wappen/head/184.png?lm=1755275805',
  'Universitario': 'https://tmssl.akamaized.net//images/wappen/head/6593.png',
  'Sporting Cristal': 'https://tmssl.akamaized.net//images/wappen/head/21157.png',
  'FBC Melgar': 'https://tmssl.akamaized.net//images/wappen/head/2734.png',
  'Cienciano': 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4814.png',
  'Cusco FC': 'https://tmssl.akamaized.net//images/wappen/head/28999.png',
  'Sport Boys': 'https://tmssl.akamaized.net//images/wappen/head/2730.png',
  'UTC': 'https://tmssl.akamaized.net//images/wappen/head/21170.png',
  'Sport Huancayo': 'https://tmssl.akamaized.net//images/wappen/head/21655.png',
  'ADT': 'https://tmssl.akamaized.net//images/wappen/head/35588.png?lm=1705855304',
  'Alianza Atlético': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Zix0ZTgcLmD1SHxQEDV4lqn0oTna6Bezcg&s',
  'Atlético Grau': 'https://tmssl.akamaized.net//images/wappen/head/27861.png?lm=1499523568',
  'Comerciantes Unidos': 'https://tmssl.akamaized.net//images/wappen/head/47107.png',
  'Los Chankas': 'https://tmssl.akamaized.net//images/wappen/big/54478.png?lm=1631877030',
  'Deportivo Garcilaso': 'https://tmssl.akamaized.net//images/wappen/head/76945.png?lm=1705942479',
  'CD Moquegua': 'https://tmssl.akamaized.net//images/wappen/head/114625.png?lm=1735173037',
  'Juan Pablo II': 'https://tmssl.akamaized.net//images/wappen/head/99517.png?lm=1712524979',
  'FC Cajamarca': 'https://tmssl.akamaized.net//images/wappen/head/120792.png?lm=1767023947'
};

// 2. Base de Datos 2026 (Muestra pequeña para no hacer el código inmenso)
const data_2026 = [
  { fecha: 1, local: 'Sport Huancayo', visitante: 'Alianza Lima', gl: 1, gv: 2 },
  { fecha: 1, local: 'UTC', visitante: 'Atlético Grau', gl: 2, gv: 0 },
  { fecha: 1, local: 'Deportivo Garcilaso', visitante: 'Sporting Cristal', gl: 1, gv: 1 },
  { fecha: 1, local: 'Universitario', visitante: 'ADT', gl: 2, gv: 0 },
  // ... puedes agregar el resto de las fechas aquí copiando el formato
];

export default function Liga1Dashboard() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(1);
  const [tab, setTab] = useState("FIXTURE");

  // Filtramos los partidos de la fecha seleccionada
  const partidosFecha = data_2026.filter(p => p.fecha === fechaSeleccionada);

  return (
    <div className="min-h-screen bg-[#0b4026] text-white font-sans p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado */}
        <h2 className="text-center text-2xl font-bold mb-6 mt-4">LIGA PROFESIONAL PERUANA 2026</h2>

        {/* Pestañas (Tabs) */}
        <div className="flex justify-center border-b border-[#1a4a2e] mb-6">
          <button 
            className={`px-6 py-2 text-sm font-bold ${tab === 'FIXTURE' ? 'text-white border-b-4 border-[#8cc63f]' : 'text-[#87b897]'}`}
            onClick={() => setTab("FIXTURE")}
          >
            FIXTURE Y TABLAS
          </button>
          <button 
            className={`px-6 py-2 text-sm font-bold ${tab === 'EQUIPOS' ? 'text-white border-b-4 border-[#8cc63f]' : 'text-[#87b897]'}`}
            onClick={() => setTab("EQUIPOS")}
          >
            EQUIPOS Y ESTADÍSTICAS
          </button>
        </div>

        {/* Contenido de Fixture */}
        {tab === "FIXTURE" && (
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Columna Izquierda (Tabla de Posiciones Simula) */}
            <div className="md:w-2/3">
              <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg p-4">
                <div className="text-center text-white font-bold text-sm mb-4 uppercase">
                  LIGA 1 APERTURA 2026
                </div>
                <div className="text-[#87b897] text-xs text-center py-10">
                  {/* Aquí iría la lógica de cálculo de puntos en JS */}
                  Tabla de posiciones en construcción. Moviendo lógica de Pandas a JavaScript...
                </div>
              </div>
            </div>

            {/* Columna Derecha (Fixture) */}
            <div className="md:w-1/3">
              <div className="text-center text-[#8cc63f] font-bold text-sm mb-2">TORNEO 2026</div>
              
              {/* Selector de Fecha */}
              <select 
                className="w-full bg-[#0d2418] border border-[#8cc63f] text-white rounded p-2 mb-4 text-sm outline-none"
                value={fechaSeleccionada}
                onChange={(e) => setFechaSeleccionada(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>FECHA {num}</option>
                ))}
              </select>

              {/* Contenedor de Partidos */}
              <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg overflow-hidden flex flex-col">
                {partidosFecha.length > 0 ? (
                  partidosFecha.map((partido, idx) => (
                    <div key={idx} className={`flex justify-between items-center p-3 border-b border-[#1a4a2e] hover:bg-[#1c4531] ${idx % 2 === 0 ? 'bg-[#153625]' : 'bg-[#112d1e]'}`}>
                      <span className="text-white text-[10px] font-bold">Final</span>
                      <div className="flex items-center w-[85%] justify-center">
                        
                        <span className="text-right w-2/5 text-xs font-bold truncate pr-2">{partido.local}</span>
                        <img src={logos_equipos[partido.local]} width="18" height="18" className="object-contain" alt="logo"/>
                        
                        <div className="flex items-center justify-center gap-1 mx-2">
                          <div className="bg-[#0d2418] border border-[#1a4a2e] rounded text-white font-bold text-xs w-6 h-6 flex items-center justify-center">{partido.gl}</div>
                          <div className="text-[#8cc63f] font-bold">-</div>
                          <div className="bg-[#0d2418] border border-[#1a4a2e] rounded text-white font-bold text-xs w-6 h-6 flex items-center justify-center">{partido.gv}</div>
                        </div>

                        <img src={logos_equipos[partido.visitante]} width="18" height="18" className="object-contain" alt="logo"/>
                        <span className="text-left w-2/5 text-xs font-bold truncate pl-2">{partido.visitante}</span>
                        
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-xs p-6 text-gray-400">No hay partidos registrados en esta fecha.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Pestaña Equipos vacía por ahora */}
        {tab === "EQUIPOS" && (
           <div className="text-center text-[#87b897] mt-10">
             Sección de equipos lista para ser programada en React.
           </div>
        )}
      </div>
    </div>
  );
}

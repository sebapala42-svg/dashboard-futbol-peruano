"'use client';
import React, { useState, useMemo } from 'react';
// Importamos tu JSON directamente desde la raíz del proyecto
import partidosJSON from '../torneo_2018.json';

export default function Home() {
  const [fecha, setFecha] = useState(29);

  // --- DICCIONARIO DE LOGOS ---
  const logos = {
    'Universitario': 'https://tmssl.akamaized.net//images/wappen/head/6593.png',
    'Alianza Lima': 'https://tmssl.akamaized.net//images/wappen/head/184.png?lm=1755275805',
    'Sporting Cristal': 'https://tmssl.akamaized.net//images/wappen/head/21157.png',
    'FBC Melgar': 'https://tmssl.akamaized.net//images/wappen/head/2734.png',
    'Cienciano': 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4814.png',
    'Cusco FC': 'https://tmssl.akamaized.net//images/wappen/head/28999.png',
    'Sport Boys': 'https://tmssl.akamaized.net//images/wappen/head/2730.png',
    'UTC': 'https://tmssl.akamaized.net//images/wappen/head/21170.png',
    'Sport Huancayo': 'https://tmssl.akamaized.net//images/wappen/head/21655.png',
    'Dep. Municipal': 'https://tmssl.akamaized.net//images/wappen/head/17974.png',
    'Cantolao': 'https://tmssl.akamaized.net//images/wappen/head/11247.png',
    'Sport Rosario': 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/18441.png',
    'U. San Martin': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROfQWRTSLDENcZLhqUcuH2MNeOyHkGsCnxeQ&s',
    'Union Comercio': 'https://tmssl.akamaized.net//images/wappen/head/31337.png',
    'Ayacucho FC': 'https://tmssl.akamaized.net//images/wappen/head/21178.png',
    'Binacional': 'https://tmssl.akamaized.net//images/wappen/head/41054.png',
    'Pirata FC': 'https://tmssl.akamaized.net//images/wappen/head/67862.png'
  };

  const equipo_A = ['Sporting Cristal', 'Sport Rosario', 'UTC', 'U. San Martin', 'Alianza Lima', 'Comerciantes Unidos', 'Ayacucho FC', 'Universitario'];
  const equipo_B = ['Sport Huancayo', 'FBC Melgar', 'Cantolao', 'Dep. Municipal', 'Sport Boys', 'Cusco (Garcilaso)', 'Binacional', 'Union Comercio'];

  // Filtramos la data hasta la fecha seleccionada
  const partidosValidos = useMemo(() => {
    return partidosJSON.filter(p => p.Fecha_Global <= fecha && p.GL !== null && p.GV !== null);
  }, [fecha]);

  // --- MOTOR UNIVERSAL DE TABLAS EN JAVASCRIPT ---
  const generarTabla = (partidos, listaFiltro = null) => {
    const tabla = {};
    
    // Extraer todos los equipos únicos si no hay filtro
    let equiposActuales = listaFiltro;
    if (!equiposActuales) {
      const setEquipos = new Set();
      partidos.forEach(p => { setEquipos.add(p.Local); setEquipos.add(p.Visitante); });
      equiposActuales = Array.from(setEquipos);
    }

    equiposActuales.forEach(eq => tabla[eq] = { equipo: eq, pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 });

    partidos.forEach(p => {
      if (tabla[p.Local] && tabla[p.Visitante]) {
        tabla[p.Local].pj++; tabla[p.Visitante].pj++;
        tabla[p.Local].gf += p.GL; tabla[p.Visitante].gf += p.GV;
        tabla[p.Local].gc += p.GV; tabla[p.Visitante].gc += p.GL;

        if (p.GL > p.GV) { tabla[p.Local].g++; tabla[p.Local].pts += 3; tabla[p.Visitante].p++; }
        else if (p.GL < p.GV) { tabla[p.Visitante].g++; tabla[p.Visitante].pts += 3; tabla[p.Local].p++; }
        else { tabla[p.Local].e++; tabla[p.Visitante].e++; tabla[p.Local].pts += 1; tabla[p.Visitante].pts += 1; }
      }
    });

    // TODO: Aquí inyectaremos las penalidades exactas de Muni y Pirata FC cuando me las confirmes.
    
    return Object.values(tabla)
      .map(t => ({ ...t, dif: t.gf - t.gc }))
      .sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);
  };

  // Renderizador del componente de Tabla HTML
  const TablaComponent = ({ titulo, zona, datos, resaltado }) => (
    <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-xl overflow-hidden shadow-xl mb-6">
      <div className="bg-[#0d2418] p-3 text-center border-b border-[#1a4a2e]">
        <h3 className="text-sm font-bold text-white uppercase">{titulo}</h3>
        {zona && <span className="text-[10px] font-bold text-[#8cc63f] uppercase tracking-widest">{zona}</span>}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-center">
          <thead className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e]">
            <tr>
              <th className="p-2 w-8">#</th>
              <th className="p-2 text-left">Equipo</th>
              <th className="p-2 text-white">PTS</th>
              <th className="p-2">PJ</th>
              <th className="p-2">G</th>
              <th className="p-2">E</th>
              <th className="p-2">P</th>
              <th className="p-2">GF:GC</th>
              <th className="p-2">DIF</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((eq, i) => {
              let borderClass = '';
              if (resaltado === 'acumulado') {
                if (i < 4) borderClass = 'border-l-4 border-l-[#3db4dc]';
                else if (i < 8) borderClass = 'border-l-4 border-l-[#e1c340]';
                else if (i >= datos.length - 2) borderClass = 'border-l-4 border-l-[#d32f2f]';
              } else if (resaltado === 'ganador' && i === 0) {
                borderClass = 'border-l-4 border-l-[#3db4dc]';
              }

              return (
                <tr key={eq.equipo} className="border-b border-[#1a4a2e]/50 hover:bg-[#1c4531] transition-colors">
                  <td className={`p-2 font-bold ${borderClass}`}>{i + 1}</td>
                  <td className="p-2 text-left flex items-center gap-2 font-bold">
                    <img src={logos[eq.equipo] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} className="w-4 h-4 object-contain" alt={eq.equipo} />
                    {eq.equipo}
                  </td>
                  <td className="p-2 font-bold text-sm text-white">{eq.pts}</td>
                  <td className="p-2 text-[#a1b5a8]">{eq.pj}</td>
                  <td className="p-2 text-[#a1b5a8]">{eq.g}</td>
                  <td className="p-2 text-[#a1b5a8]">{eq.e}</td>
                  <td className="p-2 text-[#a1b5a8]">{eq.p}</td>
                  <td className="p-2 text-[#a1b5a8]">{eq.gf}:{eq.gc}</td>
                  <td className="p-2 text-[#a1b5a8]">{eq.dif > 0 ? `+${eq.dif}` : eq.dif}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b4026] text-white font-sans selection:bg-[#8cc63f] selection:text-black">
      <header className="bg-[#0d2418] border-b border-[#1a4a2e] p-4 text-center sticky top-0 z-50">
        <h1 className="text-xl font-black uppercase tracking-widest text-[#8cc63f]">LIGA PROFESIONAL PERUANA 2018</h1>
      </header>

      <main className="max-w-6xl mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* PANEL IZQUIERDO: TABLAS */}
        <div className="lg:col-span-8">
          {fecha <= 14 && (
            <>
              <TablaComponent titulo="Torneo de Verano" zona="Zona A" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Verano'), equipo_A)} resaltado="ganador" />
              <TablaComponent titulo="Torneo de Verano" zona="Zona B" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Verano'), equipo_B)} resaltado="ganador" />
            </>
          )}
          {fecha > 14 && fecha <= 29 && (
            <TablaComponent titulo="Torneo Apertura" zona="Zona Única" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Apertura' && p.Fecha_Global >= 15))} resaltado="ganador" />
          )}
          {fecha > 29 && (
            <TablaComponent titulo="Torneo Clausura" zona="Zona Única" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Clausura' && p.Fecha_Global >= 30))} resaltado="ganador" />
          )}
          
          <TablaComponent titulo={`Tabla Acumulada (Hasta la Fecha ${fecha})`} datos={generarTabla(partidosValidos)} resaltado="acumulado" />
        </div>

        {/* PANEL DERECHO: FIXTURE */}
        <div className="lg:col-span-4">
          <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-xl overflow-hidden shadow-xl sticky top-24">
            <div className="bg-[#0d2418] p-3 flex justify-between items-center border-b border-[#1a4a2e]">
              <span className="text-[10px] font-black text-[#8cc63f] uppercase tracking-widest">Resultados</span>
              <select 
                value={fecha} 
                onChange={(e) => setFecha(Number(e.target.value))}
                className="bg-black/40 border border-[#1a4a2e] text-xs font-bold rounded px-2 py-1 outline-none text-white"
              >
                {[...Array(44)].map((_, i) => (
                  <option key={i+1} value={i+1}>FECHA {i+1}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col max-h-[600px] overflow-y-auto">
              {partidosJSON.filter(p => p.Fecha_Global === fecha).map((p, idx) => (
                <div key={idx} className="flex items-center p-3 border-b border-[#1a4a2e] hover:bg-[#1a4a2e]/50 transition-colors">
                  <div className="flex-1 flex justify-center items-center gap-2">
                    <div className="flex items-center gap-2 w-full justify-end">
                      <span className="text-xs font-bold text-right truncate">{p.Local}</span>
                      <img src={logos[p.Local] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} className="w-5 h-5 object-contain" />
                    </div>
                    <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded border border-[#1a4a2e]">
                      <span className="font-bold">{p.GL !== null ? p.GL : '-'}</span>
                      <span className="text-[#8cc63f]">-</span>
                      <span className="font-bold">{p.GV !== null ? p.GV : '-'}</span>
                    </div>
                    <div className="flex items-center gap-2 w-full justify-start">
                      <img src={logos[p.Visitante] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} className="w-5 h-5 object-contain" />
                      <span className="text-xs font-bold truncate">{p.Visitante}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

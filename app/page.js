'use client';
import React, { useState, useMemo } from 'react';
import partidosJSON from './torneo_2018.json';

const listaPartidos = Array.isArray(partidosJSON) 
  ? partidosJSON 
  : (partidosJSON.BaseDatos || Object.values(partidosJSON)[0] || []);

export default function Home() {
  const [fecha, setFecha] = useState(44);

  const logos = {
    'Universitario': 'https://tmssl.akamaized.net//images/wappen/head/6593.png',
    'Alianza Lima': 'https://tmssl.akamaized.net//images/wappen/head/184.png?lm=1755275805',
    'Sporting Cristal': 'https://tmssl.akamaized.net//images/wappen/head/21157.png',
    'FBC Melgar': 'https://tmssl.akamaized.net//images/wappen/head/2734.png',
    'Cienciano': 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4814.png',
    'Cusco (Garcilaso)': 'https://images.seeklogo.com/logo-png/32/2/asociacion-civil-real-atletico-garcilaso-logo-png_seeklogo-328024.png',
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
    'Comerciantes Unidos': 'https://tmssl.akamaized.net//images/wappen/head/47107.png'
  };

  const equipo_A = ['Sporting Cristal', 'Sport Rosario', 'UTC', 'U. San Martin', 'Alianza Lima', 'Comerciantes Unidos', 'Ayacucho FC', 'Universitario'];
  const equipo_B = ['Sport Huancayo', 'FBC Melgar', 'Cantolao', 'Dep. Municipal', 'Sport Boys', 'Cusco (Garcilaso)', 'Binacional', 'Union Comercio'];

  const partidosValidos = useMemo(() => {
    return listaPartidos.filter(p => p.Fecha_Global <= fecha && p.GL !== null && p.GV !== null);
  }, [fecha]);

  const generarTabla = (partidos, listaFiltro = null, esAcumulado = false) => {
    const tabla = {};
    let equiposActuales = listaFiltro;
    if (!equiposActuales) {
      const setEquipos = new Set();
      partidos.forEach(p => { setEquipos.add(p.Local); setEquipos.add(p.Visitante); });
      equiposActuales = Array.from(setEquipos);
    }

    equiposActuales.forEach(eq => tabla[eq] = { equipo: eq, pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0, racha: [] });

    partidos.forEach(p => {
      if (tabla[p.Local] && tabla[p.Visitante]) {
        tabla[p.Local].pj++; tabla[p.Visitante].pj++;
        tabla[p.Local].gf += p.GL; tabla[p.Visitante].gf += p.GV;
        tabla[p.Local].gc += p.GV; tabla[p.Visitante].gc += p.GL;

        if (p.GL > p.GV) {
          tabla[p.Local].g++; tabla[p.Local].pts += 3; tabla[p.Local].racha.push('V');
          tabla[p.Visitante].p++; tabla[p.Visitante].racha.push('D');
        } else if (p.GL < p.GV) {
          tabla[p.Visitante].g++; tabla[p.Visitante].pts += 3; tabla[p.Visitante].racha.push('V');
          tabla[p.Local].p++; tabla[p.Local].racha.push('D');
        } else {
          tabla[p.Local].e++; tabla[p.Visitante].e++; tabla[p.Local].pts += 1; tabla[p.Visitante].pts += 1;
          tabla[p.Local].racha.push('E'); tabla[p.Visitante].racha.push('E');
        }
      }
    });

    return Object.values(tabla)
      .map(t => {
        let finalPts = t.pts;
        if (esAcumulado && fecha >= 44) {
          if (t.equipo === 'Sporting Cristal') finalPts += 2;
          if (t.equipo === 'Sport Rosario') finalPts -= 7;
          if (['Dep. Municipal', 'UTC', 'Cantolao'].includes(t.equipo)) finalPts -= 2;
          if (t.equipo === 'Universitario') finalPts -= 1;
        }
        return { ...t, pts: finalPts, dif: t.gf - t.gc, ultimas: t.racha.slice(-5) };
      })
      .sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);
  };

  const TablaComponent = ({ titulo, zona, datos, esAcumulado }) => (
    <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg overflow-hidden mb-6">
      <div className="bg-[#0d2418] p-2 text-center border-b border-[#1a4a2e]">
        <h3 className="text-xs font-bold text-white uppercase">{titulo}</h3>
        {zona && <span className="text-[10px] font-bold text-[#8cc63f] uppercase">{zona}</span>}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-center border-collapse">
          <thead className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e]">
            <tr>
              <th className="p-2 w-8 font-normal">#</th>
              <th className="p-2 text-left font-normal">Equipos</th>
              <th className="p-2 text-white font-normal">PTS</th>
              <th className="p-2 font-normal">J</th>
              <th className="p-2 font-normal">Gol</th>
              <th className="p-2 font-normal">+/-</th>
              <th className="p-2 font-normal">G</th>
              <th className="p-2 font-normal">E</th>
              <th className="p-2 font-normal">P</th>
              <th className="p-2 font-normal">Últimas</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((eq, i) => {
              let bordeColor = 'transparent';
              if (esAcumulado) {
                if (i < 4) bordeColor = '#3db4dc';
                else if (i < 8) bordeColor = '#e1c340';
                else if (i >= datos.length - 2) bordeColor = '#d32f2f';
              } else if (i === 0) {
                bordeColor = '#3db4dc';
              }

              return (
                <tr key={eq.equipo} className={`border-b border-transparent hover:bg-[#1c4531] transition-colors ${i % 2 === 0 ? 'bg-[#153625]' : 'bg-[#112d1e]'}`}>
                  <td className="p-2 font-bold border-l-4" style={{ borderLeftColor: bordeColor }}>{i + 1}</td>
                  <td className="p-2 text-left flex items-center gap-2 font-bold">
                    <img src={logos[eq.equipo]} className="w-5 h-5 min-w-[20px] object-contain" alt={eq.equipo} />
                    <span className="text-white truncate">{eq.equipo}</span>
                  </td>
                  <td className="p-2 font-bold text-sm text-white">{eq.pts}</td>
                  <td className="p-2 text-white">{eq.pj}</td>
                  <td className="p-2 text-white">{eq.gf}:{eq.gc}</td>
                  <td className="p-2 text-white">{eq.dif}</td>
                  <td className="p-2 text-white">{eq.g}</td>
                  <td className="p-2 text-white">{eq.e}</td>
                  <td className="p-2 text-white">{eq.p}</td>
                  <td className="p-2">
                    <div className="flex gap-[2px] justify-center">
                      {eq.ultimas.map((r, idx) => (
                        <span key={idx} className={`w-[14px] h-[14px] flex items-center justify-center text-[8px] font-bold text-white rounded-[2px] ${r === 'V' ? 'bg-[#8cc63f]' : r === 'E' ? 'bg-[#e1c340]' : 'bg-[#d32f2f]'}`}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </td>
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
      <header className="pt-6 pb-2 text-center">
        <h1 className="text-2xl font-bold uppercase text-white">LIGA PROFESIONAL PERUANA 2018</h1>
      </header>

      {/* Tabs */}
      <nav className="flex justify-center border-b border-[#1a4a2e] max-w-6xl mx-auto mb-6">
        <button className="px-6 py-2 text-xs font-bold uppercase border-b-2 border-[#8cc63f] text-white">Fixture y Tablas</button>
        <button className="px-6 py-2 text-xs font-bold uppercase text-gray-400 hover:text-white transition-colors">Equipos y Estadisticas</button>
        <button className="px-6 py-2 text-xs font-bold uppercase text-gray-400 hover:text-white transition-colors">Campeones</button>
      </nav>

      <main className="max-w-[1400px] mx-auto p-4 lg:p-6 grid grid-cols-1 xl:grid-cols-[65%_35%] gap-6">
        
        {/* PANEL IZQUIERDO: TABLAS */}
        <div>
          {fecha <= 14 && (
            <>
              <TablaComponent titulo="Torneo de Verano" zona="Zona A" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Verano'), equipo_A)} />
              <TablaComponent titulo="Torneo de Verano" zona="Zona B" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Verano'), equipo_B)} />
            </>
          )}
          {fecha > 14 && fecha <= 29 && (
            <TablaComponent titulo="Torneo Apertura" zona="Zona Única" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Apertura' && p.Fecha_Global >= 15))} />
          )}
          {fecha > 29 && (
            <TablaComponent titulo="Torneo Clausura" zona="Zona Única" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Clausura' && p.Fecha_Global >= 30))} />
          )}
          
          <TablaComponent titulo={`Tabla Acumulada (Hasta la Fecha ${fecha})`} datos={generarTabla(partidosValidos, null, true)} esAcumulado={true} />
        </div>

        {/* PANEL DERECHO: FIXTURE Y GOLEADORES */}
        <div className="flex flex-col gap-4">
          
          {/* Selector de Fecha */}
          <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg overflow-hidden">
            <div className="bg-[#0d2418] p-3 border-b border-[#1a4a2e]">
              <h3 className="text-xs font-bold text-[#8cc63f] uppercase text-center mb-2">Temporada 2018</h3>
              <select 
                value={fecha} 
                onChange={(e) => setFecha(Number(e.target.value))}
                className="w-full bg-[#0d2418] border border-[#1a4a2e] text-xs font-bold rounded p-2 outline-none text-white focus:border-[#8cc63f]"
              >
                {[...Array(44)].map((_, i) => (
                  <option key={i+1} value={i+1}>FECHA {i+1}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col max-h-[450px] overflow-y-auto">
              {listaPartidos.filter(p => p.Fecha_Global === fecha).map((p, idx) => (
                <div key={idx} className={`flex items-center p-3 border-b border-[#1a4a2e] hover:bg-[#1a4a2e]/50 transition-colors ${idx % 2 === 0 ? 'bg-[#153625]' : 'bg-[#112d1e]'}`}>
                  <span className="w-10 text-[9px] font-bold text-white uppercase text-center">Final</span>
                  <div className="flex-1 flex justify-center items-center gap-2">
                    <div className="flex items-center gap-2 w-full justify-end">
                      <span className="text-[11px] font-bold text-right truncate text-white">{p.Local}</span>
                      <img src={logos[p.Local]} className="w-5 h-5 min-w-[20px] object-contain" />
                    </div>
                    <div className="flex items-center gap-1 bg-[#0d2418] px-2 py-1 rounded border border-[#1a4a2e] min-w-[45px] justify-center">
                      <span className="font-bold text-xs">{p.GL !== null ? p.GL : '-'}</span>
                      <span className="text-[#8cc63f] text-xs">-</span>
                      <span className="font-bold text-xs">{p.GV !== null ? p.GV : '-'}</span>
                    </div>
                    <div className="flex items-center gap-2 w-full justify-start">
                      <img src={logos[p.Visitante]} className="w-5 h-5 min-w-[20px] object-contain" />
                      <span className="text-[11px] font-bold truncate text-white">{p.Visitante}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Caja Fija de Goleadores (Mock) */}
          <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg overflow-hidden mt-2">
            <div className="bg-[#0d2418] p-3 text-center border-b border-[#1a4a2e]">
              <h3 className="text-xs font-bold text-white uppercase">Goleadores</h3>
            </div>
            <table className="w-full text-xs text-left">
              <thead className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e]">
                <tr>
                  <th className="p-2 font-normal">Jugador</th>
                  <th className="p-2 text-center font-normal w-12">Goles</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { n: "Emanuel Herrera", eq: "Sporting Cristal", g: 8 },
                  { n: "Mauricio Montes", eq: "Ayacucho FC", g: 6 },
                  { n: "Tulio Etchemaite", eq: "Sport Rosario", g: 5 },
                  { n: "Neumann", eq: "Sport Huancayo", g: 5 },
                  { n: "Luis Tejada", eq: "Sport Boys", g: 5 },
                  { n: "Jeremias Bogado", eq: "Comerciantes Unidos", g: 4 }
                ].map((g, i) => (
                  <tr key={i} className={`border-b border-[#1a4a2e]/50 ${i % 2 === 0 ? 'bg-[#153625]' : 'bg-[#112d1e]'}`}>
                    <td className="p-2 flex items-center gap-2">
                      <img src={logos[g.eq]} className="w-4 h-4 object-contain" />
                      <span className="text-white text-[11px] font-bold">{g.n}</span>
                    </td>
                    <td className="p-2 text-center text-white font-bold">{g.g}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}

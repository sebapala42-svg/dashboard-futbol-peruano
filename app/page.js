'use client';
import React, { useState, useMemo } from 'react';
import partidosJSON from './torneo_2018.json';

// --- TRUCO SALVAVIDAS ---
// Si el conversor lo metió en un objeto (ej. { "BaseDatos": [...] }), esto saca la lista real.
const listaPartidos = Array.isArray(partidosJSON) 
  ? partidosJSON 
  : (partidosJSON.BaseDatos || Object.values(partidosJSON)[0] || []);

export default function Home() {
  const [fecha, setFecha] = useState(44);
  
  // --- ESTADOS PARA NAVEGACIÓN ---
  const [tab, setTab] = useState('fixture');
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

  // --- DICCIONARIO DE LOGOS DEFECTUOSOS Y CORREGIDOS ---
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

  // --- DATOS AÑADIDOS PARA EQUIPOS Y CAMPEONES ---
  const info_clubes = {
    'Universitario': { Apodo: 'Cremas', Fundación: '1924', Estadio: 'Monumental U Marathon' },
    'Alianza Lima': { Apodo: 'Íntimos', Fundación: '1901', Estadio: 'Alejandro Villanueva (Matute)' },
    'Sporting Cristal': { Apodo: 'Celestes', Fundación: '1955', Estadio: 'Alberto Gallardo' },
    'FBC Melgar': { Apodo: 'Rojinegros', Fundación: '1915', Estadio: 'Monumental de la UNSA' },
    'Cienciano': { Apodo: 'El Papá', Fundación: '1901', Estadio: 'Inca Garcilaso de la Vega' },
    'Sport Boys': { Apodo: 'La Misilera', Fundación: '1927', Estadio: 'Miguel Grau' },
  };

  const historial_datos = [
    { Año: "2025", Campeón: "Universitario" }, { Año: "2024", Campeón: "Universitario" },
    { Año: "2023", Campeón: "Universitario" }, { Año: "2022", Campeón: "Alianza Lima" },
    { Año: "2021", Campeón: "Alianza Lima" }, { Año: "2020", Campeón: "Sporting Cristal" },
    { Año: "2019", Campeón: "Binacional" }, { Año: "2018", Campeón: "Sporting Cristal" },
    { Año: "2017", Campeón: "Alianza Lima" }, { Año: "2016", Campeón: "Sporting Cristal" },
    { Año: "2015", Campeón: "FBC Melgar" }, { Año: "2014", Campeón: "Sporting Cristal" },
    { Año: "2013", Campeón: "Universitario" }, { Año: "2012", Campeón: "Sporting Cristal" }
  ];

  const ranking_datos = [
    { Equipo: "Universitario", Títulos: 29 }, { Equipo: "Alianza Lima", Títulos: 25 },
    { Equipo: "Sporting Cristal", Títulos: 20 }, { Equipo: "Sport Boys", Títulos: 6 },
    { Equipo: "Dep. Municipal", Títulos: 4 }, { Equipo: "U. San Martin", Títulos: 3 },
    { Equipo: "FBC Melgar", Títulos: 2 }, { Equipo: "Binacional", Títulos: 1 }
  ];

  const equipo_A = ['Sporting Cristal', 'Sport Rosario', 'UTC', 'U. San Martin', 'Alianza Lima', 'Comerciantes Unidos', 'Ayacucho FC', 'Universitario'];
  const equipo_B = ['Sport Huancayo', 'FBC Melgar', 'Cantolao', 'Dep. Municipal', 'Sport Boys', 'Cusco (Garcilaso)', 'Binacional', 'Union Comercio'];

  const partidosValidos = useMemo(() => {
    return listaPartidos.filter(p => p.Fecha_Global <= fecha && p.GL !== null && p.GV !== null);
  }, [fecha]);

  // --- LÓGICA DE PERFIL DE EQUIPO ---
  const partidosJugadosEquipo = useMemo(() => {
    if (!equipoSeleccionado) return [];
    return listaPartidos
      .filter(p => p.Fecha_Global <= fecha && p.GL !== null && (p.Local === equipoSeleccionado || p.Visitante === equipoSeleccionado))
      .sort((a, b) => b.Fecha_Global - a.Fecha_Global)
      .slice(0, 5);
  }, [equipoSeleccionado, fecha]);

  const proximosPartidosEquipo = useMemo(() => {
    if (!equipoSeleccionado) return [];
    return listaPartidos
      .filter(p => p.Fecha_Global > fecha && (p.Local === equipoSeleccionado || p.Visitante === equipoSeleccionado))
      .sort((a, b) => a.Fecha_Global - b.Fecha_Global)
      .slice(0, 3);
  }, [equipoSeleccionado, fecha]);

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
          // PEÑALISACIONES 2018
          if (t.equipo === 'Sporting Cristal') finalPts += 2;
          if (t.equipo === 'Sport Rosario') finalPts -= 7;
          if (['Dep. Municipal', 'UTC', 'Cantolao'].includes(t.equipo)) finalPts -= 2;
          if (t.equipo === 'Universitario') finalPts -= 1;
        }
        return { ...t, pts: finalPts, dif: t.gf - t.gc, ultimas: t.racha.slice(-5).reverse() };
      })
      .sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);
  };

  // Renderizador de Tabla Reutilizable
  const TablaComponent = ({ titulo, zona, datos, esAcumulado, anchoBorde = "30px" }) => (
    <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-[8px] overflow-hidden shadow-lg mb-6 pb-1">
      <div className="text-center text-white font-bold text-[14px] uppercase py-[10px]">
        {titulo}
      </div>
      {zona && (
        <div className="bg-[#0d2418] text-white px-[10px] py-[6px] font-bold text-[12px] border-b-[2px] border-[#1a4a2e] mx-[2px]">
          {zona}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-[12px] text-center text-white font-sans border-collapse">
          <thead>
            <tr>
              <th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px]" style={{ width: anchoBorde }}>#</th>
              <th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px] text-left">Equipos</th>
              <th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px]">PTS</th>
              <th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px]">J</th>
              <th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px]">Gol</th>
              <th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px]">+/-</th>
              <th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px]">G</th>
              <th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px]">E</th>
              <th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px]">P</th>
              <th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px]">Últimas</th>
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
                <tr key={eq.equipo} className={`hover:bg-[#1c4531] transition-colors ${i % 2 === 0 ? 'bg-[#112d1e]' : 'bg-[#153625]'}`}>
                  <td className="py-[6px] px-[4px] font-bold border-l-[3px]" style={{ borderLeftColor: bordeColor }}>{i + 1}</td>
                  <td className="py-[6px] px-[4px] text-left font-bold flex items-center gap-2">
                    <img src={logos[eq.equipo] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} 
                         style={{ width: '15px', height: '15px', minWidth: '15px', objectFit: 'contain' }} 
                         alt={eq.equipo} />
                    <span className="truncate">{eq.equipo}</span>
                  </td>
                  <td className="py-[6px] px-[4px] font-bold text-[13px] text-white">{eq.pts}</td>
                  <td className="py-[6px] px-[4px] text-white">{eq.pj}</td>
                  <td className="py-[6px] px-[4px] text-white">{eq.gf}:{eq.gc}</td>
                  <td className="py-[6px] px-[4px] text-white">{eq.dif}</td>
                  <td className="py-[6px] px-[4px] text-white">{eq.g}</td>
                  <td className="py-[6px] px-[4px] text-white">{eq.e}</td>
                  <td className="py-[6px] px-[4px] text-white">{eq.p}</td>
                  <td className="py-[6px] px-[4px]">
                    <div className="flex gap-[2px] justify-center">
                      {eq.ultimas.map((r, idx) => (
                        <span key={idx} 
                              className="inline-flex items-center justify-center text-white text-[8.5px] font-bold rounded-[2px] px-[4px] py-[1px]"
                              style={{ backgroundColor: r === 'V' ? '#8cc63f' : r === 'E' ? '#e1c340' : '#d32f2f' }}>
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
        {esAcumulado && fecha >= 44 && (
          <div className="text-[11px] text-[#87b897] text-left mx-[10px] my-[10px] p-[5px] bg-[#0d2418] rounded-[4px] border border-[#1a4a2e]">
            * Nota: Resoluciones FPF aplicadas en Acumulada 2018: Rosario (-7), Muni (-2), UTC (-2), Cantolao (-2), U (-1). Cristal (+2) por Reservas.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b4026] text-white font-sans selection:bg-[#8cc63f] selection:text-black">
      {/* Título y PESTAÑAS (UI MEJORADA TIPO Streamlit) */}
      <div className="pt-6 pb-6 border-b border-[#1a4a2e]">
        <h2 className="text-center text-white text-[28px] font-black m-0 mb-[20px] tracking-tight">LIGA PROFESIONAL PERUANA 2018</h2>
        <div className="flex justify-center max-w-5xl mx-auto gap-1">
          {[ { id: 'fixture', label: 'Fixture y Tablas' }, { id: 'equipos', label: 'Equipos y Estadísticas' }, { id: 'campeones', label: 'Campeones' } ].map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setEquipoSeleccionado(null); }} className={`flex-1 px-[25px] py-[12px] font-bold text-[14px] uppercase transition-all rounded-[8px] ${tab === t.id ? 'bg-[#112d1e] text-white border-b-2 border-[#8cc63f] shadow-[0_4px_10px_rgba(0,0,0,0.3)]' : 'text-[#87b897] hover:bg-[#153625] hover:text-white border-b-2 border-transparent'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================
          PESTAÑA 1: FIXTURE Y TABLAS
          ========================================= */}
      {tab === 'fixture' && (
        <main className="max-w-[1300px] mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6 items-start animate-in fade-in duration-300">
          {/* COLUMNA IZQUIERDA (Tablas - 64%) */}
          <div className="w-full md:w-[64%] flex flex-col gap-6">
            {fecha <= 14 && (
              <>
                <TablaComponent titulo="TORNEO DE VERANO" zona="ZONA A" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Verano'), equipo_A)} />
                <TablaComponent titulo="TORNEO DE VERANO" zona="ZONA B" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Verano'), equipo_B)} />
              </>
            )}
            {fecha > 14 && fecha <= 29 && (
              <TablaComponent titulo="TORNEO APERTURA" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Apertura' && p.Fecha_Global >= 15))} />
            )}
            {fecha > 29 && (
              <TablaComponent titulo="TORNEO CLAUSURA" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Clausura' && p.Fecha_Global >= 30))} />
            )}
            
            <TablaComponent titulo={`TABLA ACUMULADA (HASTA LA FECHA ${fecha})`} datos={generarTabla(partidosValidos, null, true)} esAcumulado={true} />
          </div>

          {/* COLUMNA DERECHA (Fixture - 34%) */}
          <div className="w-full md:w-[34%] flex flex-col gap-[15px]">
            <div className="text-center text-[#8cc63f] font-bold text-[14px] uppercase mb-[-10px]">Temporada 2018</div>
            <div className="bg-[#0d2418] border border-[#1a4a2e] rounded-[4px] p-2 flex justify-center">
              <select value={fecha} onChange={(e) => setFecha(Number(e.target.value))} className="bg-transparent text-white font-bold text-[13px] px-[10px] py-[6px] outline-none appearance-none cursor-pointer">
                {[...Array(44)].map((_, i) => <option key={i+1} value={i+1} className="bg-[#0d2418]">FECHA {i+1}</option>)}
              </select>
            </div>
            <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg flex flex-col max-h-[550px] overflow-y-auto custom-scrollbar">
              {listaPartidos.filter(p => p.Fecha_Global === fecha).map((p, idx) => (
                <div key={idx} className={`flex justify-between items-center py-[8px] px-[10px] border-b border-[#1a4a2e] hover:bg-[#1c4531] transition-colors ${idx % 2 === 0 ? 'bg-[#112d1e]' : 'bg-[#153625]'}`}>
                  <span className="text-[#a1b5a8] text-[9px] font-bold w-[35px] uppercase">Final</span>
                  <div className="flex items-center w-[85%] justify-center gap-1">
                    <span className="text-right w-[38%] text-[11px] text-white font-bold truncate">{p.Local}</span>
                    <img src={logos[p.Local]} style={{ width: '16px', height: '16px', minWidth: '16px', objectFit: 'contain' }} />
                    <div className="flex items-center gap-[1px]">
                      <div className="bg-[#0d2418] border border-[#1a4a2e] rounded font-black text-white text-[14px] w-[22px] h-[22px] flex items-center justify-center">{p.GL !== null ? p.GL : '-'}</div>
                      <div className="text-[#8cc63f] font-bold text-[14px]mx-[1px]">-</div>
                      <div className="bg-[#0d2418] border border-[#1a4a2e] rounded font-black text-white text-[14px] w-[22px] h-[22px] flex items-center justify-center">{p.GV !== null ? p.GV : '-'}</div>
                    </div>
                    <img src={logos[p.Visitante]} style={{ width: '16px', height: '16px', minWidth: '16px', objectFit: 'contain' }} />
                    <span className="text-left w-[38%] text-[11px] text-white font-bold truncate">{p.Visitante}</span>
                  </div>
                </div>
              ))}
              {listaPartidos.filter(p => p.Fecha_Global === fecha).length === 0 && <p className="text-center text-[12px] p-4 text-[#87b897]">No hay partidos registrados para esta fecha.</p>}
            </div>
            <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg p-3 text-center shadow-lg">
              <div className="text-center text-white font-bold text-[14px] uppercase mb-[10px]">GOLEADORES ( Mock )</div>
              <table className="w-full text-[12px] text-white font-sans border-collapse mt-[5px]">
                <thead><tr><th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px] text-left">Jugador</th><th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px] text-center w-[40px]">Goles</th></tr></thead>
                <tbody>{[{ n: "Emanuel Herrera", eq: "Sporting Cristal", g: 8 }, { n: "Mauricio Montes", eq: "Ayacucho FC", g: 6 }, { n: "Tulio Etchemaite", eq: "Sport Rosario", g: 5 }, { n: "Luis Tejada", eq: "Sport Boys", g: 5 }].map((g, i) => (
                  <tr key={i} className={`border-b border-[#1a4a2e]/50 ${i % 2 === 0 ? 'bg-[#112d1e]' : 'bg-[#153625]'}`}><td className="py-[6px] px-[4px] text-left flex items-center gap-1"><img src={logos[g.eq]} style={{ width: '13px', height: '13px', objectFit: 'contain' }} /><span className="text-white">{g.n}</span></td><td className="py-[6px] px-[4px] text-center font-bold text-white">{g.g}</td></tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* =========================================
          PESTAÑA 2: EQUIPOS Y ESTADISTICAS
          ========================================= */}
      {tab === 'equipos' && (
        <main className="max-w-[1250px] mx-auto p-4 md:p-8 animate-in duration-300 fade-in">
          {!equipoSeleccionado ? (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-center text-white text-[18px] font-bold mb-1 uppercase tracking-wider">EQUIPOS LIGA 1</h3>
              <p className="text-center text-[#87b897] text-[12px] mb-8">Pulsar en el equipo para ver su info detallada</p>
              {/* LA GRILLA ORDENADA: Clon de Streamlit */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {Object.keys(logos).sort().map(eq => (
                  <button key={eq} onClick={() => setEquipoSeleccionado(eq)} className="bg-[#112d1e] border border-[#1a4a2e] rounded-[10px] p-6 flex flex-col items-center gap-4 hover:bg-[#1c4531] hover:border-[#8cc63f] hover:-translate-y-1 transition-all shadow-xl group">
                    <img src={logos[eq]} className="w-16 h-16 object-contain drop-shadow-md group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" alt={eq} />
                    <span className="text-white font-bold text-[12px] text-center uppercase whitespace-nowrap overflow-hidden text-ellipsis w-full">{eq}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-in slide-in-from-right-8 duration-300">
              <button onClick={() => setEquipoSeleccionado(null)} className="mb-8 bg-[#0d2418] border border-[#1a4a2e] text-white text-xs font-bold px-5 py-2.5 rounded-[8px] hover:bg-[#1c4531] transition-colors shadow-md">
                ⬅️ VOLVER A TODOS LOS EQUIPOS
              </button>
              <div className="text-center mb-10 flex flex-col items-center justify-center gap-4 border-b-2 border-[#1a4a2e] pb-6 mx-auto max-w-4xl">
                <img src={logos[equipoSeleccionado]} className="w-24 h-24 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]" />
                <h2 className="text-[32px] font-black text-white uppercase tracking-wider">{equipoSeleccionado}</h2>
              </div>
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:max-w-[1300px] lg:mx-auto">
                {/* Columna Izquierda: Resultados (65% del ancho Streamlit) */}
                <div className="w-full lg:w-[65%] flex flex-col gap-6">
                  <TablaComponent titulo="Últimos Resultados" datos={generarTabla(partidosJugadosEquipo)} anchoBorde="25px" />
                  <TablaComponent titulo="Próximos Partidos" datos={generarTabla(proximosPartidosEquipo)} anchoBorde="25px" />
                </div>
                {/* Columna Derecha: Info Club (35% del ancho Streamlit) */}
                <div className="w-full lg:w-[35%]">
                  <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-[8px] p-5 shadow-lg sticky top-24">
                    <div className="text-center text-white font-bold text-[14px] uppercase mb-[20px]">INFO DEL CLUB</div>
                    {[{ k: 'Apodo', v: info_clubes[equipoSeleccionado]?.Apodo || '-' }, { k: 'Fundación', v: info_clubes[equipoSeleccionado]?.Fundación || '-' }].map(item => (
                      <div key={item.k} className="bg-[#0d2418] border border-[#1a4a2e] rounded p-4 mb-[12px] flex justify-between items-center text-[13px]"><span className="text-[#a1b5a8] font-bold uppercase text-[11px] tracking-wider">{item.k}</span><span className="text-white font-bold text-right">{item.v}</span></div>
                    ))}
                    <div className="bg-[#0d2418] border border-[#1a4a2e] rounded p-4 flex flex-col items-center gap-2 text-[13px]"><span className="text-[#a1b5a8] font-bold uppercase text-[11px] tracking-wider">Estadio</span><span className="text-[#8cc63f] font-bold text-center leading-relaxed">{info_clubes[equipoSeleccionado]?.Estadio || 'Estadio Local'}</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* =========================================
          PESTAÑA 3: CAMPEONES
          ========================================= */}
      {tab === 'campeones' && (
        <main className="max-w-[1250px] mx-auto p-4 md:p-8 animate-in duration-300 fade-in">
          {/* EL LAYOUT CLON: Dos columnas estrictas */}
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:max-w-[1300px] lg:mx-auto">
            
            {/* Historial (Izquierda - 60% del ancho Streamlit) */}
            <div className="w-full lg:w-[60%] bg-[#112d1e] border border-[#1a4a2e] rounded-[8px] overflow-hidden shadow-lg">
              <div className="bg-[#0d2418] p-3 text-center border-b-2 border-[#1a4a2e]">
                <h3 className="text-[14px] font-black text-white uppercase tracking-tight">Historial de Campeones</h3>
              </div>
              <table className="w-full text-[12px] text-white font-sans border-collapse">
                <thead><tr><th className="bg-[#0d2418] text-[#a1b5a8] py-[10px] px-[15px] font-bold text-[11px] text-left w-[80px]">Torneo</th><th className="bg-[#0d2418] text-[#a1b5a8] py-[10px] px-[15px] font-bold text-[11px] text-left">Campeón</th></tr></thead>
                <tbody>{historial_datos.map((row, i) => (
                  <tr key={i} className={`hover:bg-[#1c4531] transition-colors border-b border-[#1a4a2e]/30 ${i % 2 === 0 ? 'bg-[#112d1e]' : 'bg-[#153625]'}`}><td className="py-[12px] px-[15px] font-black text-white text-[13px]">{row.Año}</td><td className="py-[12px] px-[15px] text-left font-bold flex items-center gap-2.5"><img src={logos[row.Campeón] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '18px', height: '18px', objectFit: 'contain' }} /><span className="text-white text-[13px]">{row.Campeón}</span></td></tr>
                ))}</tbody>
              </table>
            </div>

            {/* Ranking (Derecha - 40% del ancho Streamlit, Fijo) */}
            <div className="w-full lg:w-[40%] bg-[#112d1e] border border-[#1a4a2e] rounded-[8px] overflow-hidden shadow-lg sticky top-24">
              <div className="bg-[#0d2418] p-3 text-center border-b-2 border-[#1a4a2e]">
                <h3 className="text-[14px] font-black text-white uppercase tracking-tight">Ranking de Ligas</h3>
              </div>
              <table className="w-full text-[12px] text-white font-sans border-collapse">
                <thead><tr><th className="bg-[#0d2418] text-[#a1b5a8] py-[10px] px-[15px] font-bold text-[11px] text-left">Equipo</th><th className="bg-[#0d2418] text-[#a1b5a8] py-[10px] px-[15px] font-bold text-[11px] text-center w-[60px]">Títulos</th></tr></thead>
                <tbody>{ranking_datos.map((row, i) => (
                  <tr key={i} className={`hover:bg-[#1c4531] transition-colors border-b border-[#1a4a2e]/30 ${i % 2 === 0 ? 'bg-[#112d1e]' : 'bg-[#153625]'}`}><td className="py-[12px] px-[15px] text-left font-bold flex items-center gap-2.5"><img src={logos[row.Equipo] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '18px', height: '18px', objectFit: 'contain' }} /><span className="text-white text-[12px]">{row.Equipo}</span></td><td className="py-[12px] px-[15px] text-center font-black text-[#8cc63f] text-[15px]">{row.Títulos}</td></tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </main>
      )}

    </div>
  );
}

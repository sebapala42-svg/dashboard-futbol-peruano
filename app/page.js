'use client';
import React, { useState, useMemo } from 'react';
import partidosJSON from './torneo_2018.json';

const listaPartidos = Array.isArray(partidosJSON) 
  ? partidosJSON 
  : (partidosJSON.BaseDatos || Object.values(partidosJSON)[0] || []);

export default function Home() {
  const [fecha, setFecha] = useState(44);
  const [tab, setTab] = useState('fixture');
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

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
          if (t.equipo === 'Sporting Cristal') finalPts += 2;
          if (t.equipo === 'Sport Rosario') finalPts -= 7;
          if (['Dep. Municipal', 'UTC', 'Cantolao'].includes(t.equipo)) finalPts -= 2;
          if (t.equipo === 'Universitario') finalPts -= 1;
        }
        return { ...t, pts: finalPts, dif: t.gf - t.gc, ultimas: t.racha.slice(-5).reverse() };
      })
      .sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);
  };

  const TablaComponent = ({ titulo, zona, datos, esAcumulado, compactLogo = false }) => (
    <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-[8px] overflow-hidden shadow-lg mb-[15px] pb-1">
      <div className="text-center text-white font-bold text-[14px] uppercase py-[10px]">
        {titulo}
      </div>
      {zona && (
        <div className="bg-[#0d2418] text-white px-[10px] py-[6px] font-bold text-[12px] border-b-[2px] border-[#1a4a2e] mx-[2px]">
          {zona}
        </div>
      )}
      <table className="w-full text-[12px] text-center text-white font-sans border-collapse mt-1">
        <thead>
          <tr>
            <th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px] w-[30px]">#</th>
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
                <td className="py-[6px] px-[4px] text-left font-bold flex items-center">
                  <img src={logos[eq.equipo] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} 
                       style={{ width: compactLogo ? '13px' : '15px', height: compactLogo ? '13px' : '15px', minWidth: compactLogo ? '13px' : '15px', objectFit: 'contain', marginRight: '6px' }} 
                       alt={eq.equipo} />
                  <span>{eq.equipo}</span>
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
  );

  return (
    <div className="min-h-screen bg-[#0b4026] font-sans selection:bg-[#8cc63f] selection:text-black">
      {/* Título Principal */}
      <div className="pt-6 pb-2">
        <h2 className="text-center text-[24px] font-bold m-0 flex items-center justify-center gap-2" style={{ color: '#ffffff' }}>
          <img src="https://tmssl.akamaized.net//images/logo/header/per1.png" className="w-8 h-8 object-contain" alt="Liga 1"/>
          LIGA PROFESIONAL PERUANA 2018
        </h2>
      </div>

      {/* =========================================================================
          TABS CORREGIDOS: Fondo verde transparente, texto blanco forzado y línea amarilla
          ========================================================================= */}
      <nav className="w-full mb-6 mt-4 border-b border-[#1a4a2e]">
        <div className="max-w-5xl mx-auto flex justify-center">
          {[
            { id: 'fixture', label: 'FIXTURE Y TABLAS' },
            { id: 'equipos', label: 'EQUIPOS Y ESTADISTICAS' },
            { id: 'campeones', label: 'CAMPEONES' }
          ].map(t => (
            <button 
              key={t.id} 
              onClick={() => { setTab(t.id); setEquipoSeleccionado(null); }} 
              className="px-[30px] py-[12px] font-bold text-[13px] uppercase transition-all bg-transparent border-none outline-none cursor-pointer"
              style={{ 
                color: tab === t.id ? '#ffffff' : '#87b897', 
                borderBottom: tab === t.id ? '3px solid #fbbf24' : '3px solid transparent' 
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ======================= FIXTURE Y TABLAS ======================= */}
      {tab === 'fixture' && (
        <main style={{ display: 'grid', gridTemplateColumns: '64% 34%', gap: '2%', maxWidth: '1250px', margin: '0 auto', padding: '20px', alignItems: 'start' }}>
          {/* COLUMNA IZQUIERDA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

          {/* COLUMNA DERECHA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="flex flex-col gap-[10px]">
              <div className="text-center font-bold text-[14px] uppercase mb-[-5px]" style={{ color: '#8cc63f' }}>TEMPORADA 2018</div>
              <div className="bg-transparent border border-[#8cc63f] rounded-[4px]">
                <select value={fecha} onChange={(e) => setFecha(Number(e.target.value))} className="w-full bg-transparent font-bold text-[13px] px-[10px] py-[8px] outline-none appearance-none text-center cursor-pointer border-none" style={{ color: '#ffffff' }}>
                  {[...Array(44)].map((_, i) => <option key={i+1} value={i+1} className="bg-[#0b4026]">FECHA {i+1}</option>)}
                </select>
              </div>
              <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg overflow-hidden shadow-lg">
                <div className="flex flex-col max-h-[550px] overflow-y-auto custom-scrollbar">
                  {listaPartidos.filter(p => p.Fecha_Global === fecha).map((p, idx) => (
                    <div key={idx} className={`flex justify-between items-center py-[8px] px-[10px] border-b border-[#1a4a2e] hover:bg-[#1c4531] transition-colors ${idx % 2 === 0 ? 'bg-[#112d1e]' : 'bg-[#153625]'}`}>
                      <span className="text-white text-[10px] font-bold w-[35px]">Final</span>
                      <div className="flex items-center w-[85%] justify-center">
                        <span className="text-right w-[40%] text-[12px] font-bold truncate" style={{ color: '#ffffff' }}>{p.Local}</span>
                        <img src={logos[p.Local] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '18px', height: '18px', minWidth: '18px', objectFit: 'contain', margin: '0 5px' }} />
                        <div className="flex items-center justify-center gap-[2px] mx-[5px]">
                          <div className="bg-[#0d2418] border border-[#1a4a2e] rounded-[4px] font-bold text-[14px] w-[25px] h-[25px] flex items-center justify-center" style={{ color: '#ffffff' }}>{p.GL !== null ? p.GL : '-'}</div>
                          <div className="font-bold text-[14px] mx-[2px]" style={{ color: '#8cc63f' }}>-</div>
                          <div className="bg-[#0d2418] border border-[#1a4a2e] rounded-[4px] font-bold text-[14px] w-[25px] h-[25px] flex items-center justify-center" style={{ color: '#ffffff' }}>{p.GV !== null ? p.GV : '-'}</div>
                        </div>
                        <img src={logos[p.Visitante] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '18px', height: '18px', minWidth: '18px', objectFit: 'contain', margin: '0 5px' }} />
                        <span className="text-left w-[40%] text-[12px] font-bold truncate" style={{ color: '#ffffff' }}>{p.Visitante}</span>
                      </div>
                    </div>
                  ))}
                  {listaPartidos.filter(p => p.Fecha_Global === fecha).length === 0 && <div className="text-center text-[12px] p-[15px]" style={{ color: '#ffffff' }}>No hay partidos registrados.</div>}
                </div>
              </div>
            </div>

            <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-[8px] p-[10px] px-[15px] shadow-lg">
               <div className="text-center font-bold text-[14px] uppercase mb-[10px]" style={{ color: '#ffffff' }}>GOLEADORES</div>
               <table className="w-full text-[12px] text-white font-sans border-collapse mt-[5px]">
                 <thead><tr><th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px] text-left">Jugador</th><th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px] text-center w-[40px]">Goles</th></tr></thead>
                 <tbody>{[
                    { n: "Emanuel Herrera", eq: "Sporting Cristal", g: 8 }, { n: "Mauricio Montes", eq: "Ayacucho FC", g: 6 },
                    { n: "Tulio Etchemaite", eq: "Sport Rosario", g: 5 }, { n: "Neumann", eq: "Sport Huancayo", g: 5 },
                    { n: "Luis Tejada", eq: "Sport Boys", g: 5 }, { n: "Jeremias Bogado", eq: "Comerciantes Unidos", g: 4 }
                  ].map((g, i) => (
                    <tr key={i} className={`hover:bg-[#1c4531] transition-colors ${i % 2 === 0 ? 'bg-[#112d1e]' : 'bg-[#153625]'}`}>
                      <td className="py-[6px] px-[4px] text-left flex items-center">
                        <img src={logos[g.eq] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '15px', height: '15px', minWidth: '15px', objectFit: 'contain', marginRight: '6px' }} />
                        <span style={{ color: '#ffffff' }}>{g.n}</span>
                      </td>
                      <td className="py-[6px] px-[4px] text-center font-bold" style={{ color: '#ffffff' }}>{g.g}</td>
                    </tr>
                  ))}</tbody>
               </table>
            </div>
          </div>
        </main>
      )}

      {/* ======================= EQUIPOS Y ESTADISTICAS ======================= */}
      {tab === 'equipos' && (
        <main className="max-w-[1250px] mx-auto p-4 animate-in fade-in">
          {!equipoSeleccionado ? (
            <div className="max-w-5xl mx-auto">
              <h3 className="text-center font-bold mb-1 uppercase tracking-widest text-[18px]" style={{ color: '#ffffff' }}>EQUIPOS LIGA 1</h3>
              <p className="text-center text-[#87b897] text-[12px] mb-8">Pulsar en el equipo para ver su info detallada</p>
              
              {/* EQUIPOS CORREGIDOS: Con cajas (bg-[#112d1e]), más juntos (gap-3), texto forzado a blanco */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {Object.keys(logos).sort().map(eq => (
                  <button 
                    key={eq} 
                    onClick={() => setEquipoSeleccionado(eq)} 
                    className="p-4 flex flex-col items-center justify-center bg-[#112d1e] border border-[#1a4a2e] rounded-[8px] hover:bg-[#153625] transition-colors cursor-pointer group shadow-sm"
                  >
                    <img src={logos[eq]} style={{ width: '40px', height: '40px', objectFit: 'contain', marginBottom: '10px' }} alt={eq} />
                    <span 
                      className="font-bold text-[13px] text-center uppercase leading-tight group-hover:text-[#8cc63f]"
                      style={{ color: '#ffffff' }}
                    >
                      {eq}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <button onClick={() => setEquipoSeleccionado(null)} className="mb-4 bg-[#0d2418] border border-[#1a4a2e] text-[11px] font-bold px-3 py-1.5 rounded hover:bg-[#1c4531] cursor-pointer" style={{ color: '#ffffff' }}>
                ⬅️ VOLVER
              </button>
              <div className="text-center mb-6">
                <img src={logos[equipoSeleccionado]} style={{ width: '60px', height: '60px', objectFit: 'contain', margin: '0 auto 10px auto' }} />
                <h2 className="text-[20px] font-bold uppercase" style={{ color: '#ffffff' }}>{equipoSeleccionado}</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60% 35%', gap: '5%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <TablaComponent titulo="Últimos Resultados" datos={generarTabla(partidosJugadosEquipo)} compactLogo={true} />
                  <TablaComponent titulo="Próximos Partidos" datos={generarTabla(proximosPartidosEquipo)} compactLogo={true} />
                </div>
                <div>
                  <div className="bg-[#112d1e] border border-[#1a4a2e] rounded p-4 sticky top-20 shadow-lg">
                    <div className="text-center font-bold text-[14px] uppercase mb-[15px]" style={{ color: '#ffffff' }}>INFO DEL CLUB</div>
                    <div className="bg-[#0d2418] border border-[#1a4a2e] rounded p-[10px] mb-[10px] flex justify-between text-[12px]"><span className="text-[#a1b5a8] font-bold uppercase">Apodo</span><span className="font-bold" style={{ color: '#ffffff' }}>{info_clubes[equipoSeleccionado]?.Apodo || '-'}</span></div>
                    <div className="bg-[#0d2418] border border-[#1a4a2e] rounded p-[10px] mb-[10px] flex justify-between text-[12px]"><span className="text-[#a1b5a8] font-bold uppercase">Fundación</span><span className="font-bold" style={{ color: '#ffffff' }}>{info_clubes[equipoSeleccionado]?.Fundación || '-'}</span></div>
                    <div className="bg-[#0d2418] border border-[#1a4a2e] rounded p-[10px] flex flex-col text-[12px] text-center"><span className="text-[#a1b5a8] font-bold uppercase mb-1">Estadio</span><span className="text-[#8cc63f] font-bold text-xs leading-relaxed">{info_clubes[equipoSeleccionado]?.Estadio || 'Estadio Local'}</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ======================= CAMPEONES ======================= */}
      {tab === 'campeones' && (
        <main style={{ display: 'grid', gridTemplateColumns: '60% 35%', gap: '5%', maxWidth: '1250px', margin: '0 auto', padding: '20px', alignItems: 'start' }}>
          <div className="bg-[#112d1e] border border-[#1a4a2e] rounded shadow-lg overflow-hidden">
            <div className="bg-[#0d2418] p-3 text-center border-b border-[#1a4a2e]"><h3 className="text-[14px] font-bold uppercase" style={{ color: '#ffffff' }}>Historial de Campeones</h3></div>
            <table className="w-full text-[12px] border-collapse font-sans">
              <thead><tr><th className="bg-[#0d2418] text-[#a1b5a8] py-[8px] px-[10px] text-left border-b border-[#1a4a2e] font-normal w-[80px]">Torneo</th><th className="bg-[#0d2418] text-[#a1b5a8] py-[8px] px-[10px] text-left border-b border-[#1a4a2e] font-normal">Campeón</th></tr></thead>
              <tbody>{historial_datos.map((row, i) => (
                <tr key={i} className={`hover:bg-[#1c4531] border-b border-[#1a4a2e]/30 ${i % 2 === 0 ? 'bg-[#112d1e]' : 'bg-[#153625]'}`}><td className="py-[10px] px-[10px] font-black" style={{ color: '#ffffff' }}>{row.Año}</td><td className="py-[10px] px-[10px] text-left font-bold flex items-center gap-2"><img src={logos[row.Campeón] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '16px', height: '16px', objectFit: 'contain' }} /><span style={{ color: '#ffffff' }}>{row.Campeón}</span></td></tr>
              ))}</tbody>
            </table>
          </div>
          <div className="bg-[#112d1e] border border-[#1a4a2e] rounded shadow-lg overflow-hidden sticky top-20">
            <div className="bg-[#0d2418] p-3 text-center border-b border-[#1a4a2e]"><h3 className="text-[14px] font-bold uppercase" style={{ color: '#ffffff' }}>Ranking de Ligas</h3></div>
            <table className="w-full text-[12px] border-collapse font-sans">
              <thead><tr><th className="bg-[#0d2418] text-[#a1b5a8] py-[8px] px-[10px] text-left border-b border-[#1a4a2e] font-normal">Equipo</th><th className="bg-[#0d2418] text-[#a1b5a8] py-[8px] px-[10px] text-center border-b border-[#1a4a2e] font-normal w-[60px]">Títulos</th></tr></thead>
              <tbody>{ranking_datos.map((row, i) => (
                <tr key={i} className={`hover:bg-[#1c4531] border-b border-[#1a4a2e]/30 ${i % 2 === 0 ? 'bg-[#112d1e]' : 'bg-[#153625]'}`}><td className="py-[10px] px-[10px] text-left flex items-center gap-2"><img src={logos[row.Equipo] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '16px', height: '16px', objectFit: 'contain' }} /><span style={{ color: '#ffffff' }}>{row.Equipo}</span></td><td className="py-[10px] px-[10px] text-center font-bold text-[#8cc63f] text-sm">{row.Títulos}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </main>
      )}

    </div>
  );
}

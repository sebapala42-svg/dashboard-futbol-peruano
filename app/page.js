'use client';
import React, { useState, useMemo } from 'react';
import partidos2018JSON from './torneo_2018.json';
import partidos2013JSON from './torneo_2013.json';

// --- DATA 2026 ---
const partidos2026JSON = [
  [1, 'Sport Huancayo', 'Alianza Lima', 1, 2], [1, 'UTC', 'Atlético Grau', 2, 0], [1, 'Comerciantes Unidos', 'CD Moquegua', 1, 0],
  [1, 'Sport Boys', 'Los Chankas', 1, 1], [1, 'Juan Pablo II', 'FC Cajamarca', 3, 3], [1, 'FBC Melgar', 'Cienciano', 2, 0],
  [1, 'Deportivo Garcilaso', 'Sporting Cristal', 1, 1], [1, 'Alianza Atlético', 'Cusco FC', 1, 0], [1, 'Universitario', 'ADT', 2, 0],
  [2, 'CD Moquegua', 'UTC', 2, 3], [2, 'ADT', 'Sport Boys', 1, 0], [2, 'Atlético Grau', 'Sport Huancayo', 0, 0],
  [2, 'Cusco FC', 'Universitario', 1, 1], [2, 'Sporting Cristal', 'FBC Melgar', 1, 2], [2, 'Los Chankas', 'Alianza Atlético', 1, 0],
  [2, 'Cienciano', 'Juan Pablo II', 6, 1], [2, 'Alianza Lima', 'Comerciantes Unidos', 2, 1], [2, 'FC Cajamarca', 'Deportivo Garcilaso', 1, 1],
  [3, 'UTC', 'Cusco FC', 1, 0], [3, 'Universitario', 'Cienciano', 2, 1], [3, 'Deportivo Garcilaso', 'ADT', 1, 0],
  [3, 'Juan Pablo II', 'Sporting Cristal', 0, 2], [3, 'Sport Boys', 'Atlético Grau', 1, 0], [3, 'Alianza Atlético', 'Alianza Lima', 0, 0],
  [3, 'Sport Huancayo', 'FC Cajamarca', 2, 0], [3, 'Comerciantes Unidos', 'Los Chankas', 1, 1], [3, 'FBC Melgar', 'CD Moquegua', 4, 0],
  [4, 'Alianza Lima', 'Sport Boys', 1, 0], [4, 'FC Cajamarca', 'FBC Melgar', 3, 1], [4, 'Sporting Cristal', 'Universitario', 2, 2],
  [4, 'Cienciano', 'Alianza Atlético', 1, 1], [4, 'ADT', 'UTC', 2, 2], [4, 'Los Chankas', 'Sport Huancayo', 3, 2],
  [4, 'Atlético Grau', 'Juan Pablo II', 1, 2], [4, 'Cusco FC', 'Comerciantes Unidos', 3, 1], [4, 'CD Moquegua', 'Deportivo Garcilaso', 1, 0],
  [5, 'Alianza Atlético', 'ADT', 0, 0], [5, 'FBC Melgar', 'Los Chankas', 1, 2], [5, 'Deportivo Garcilaso', 'Cienciano', 2, 3],
  [5, 'Sport Huancayo', 'Sporting Cristal', 2, 1], [5, 'UTC', 'Alianza Lima', 0, 1], [5, 'Sport Boys', 'CD Moquegua', 0, 0],
  [5, 'Comerciantes Unidos', 'Atlético Grau', 3, 1], [5, 'Juan Pablo II', 'Cusco FC', 2, 1], [5, 'Universitario', 'FC Cajamarca', 1, 0],
  [6, 'Atlético Grau', 'FC Cajamarca', 1, 0], [6, 'CD Moquegua', 'Sport Huancayo', 2, 1], [6, 'Comerciantes Unidos', 'UTC', 1, 2],
  [6, 'Sporting Cristal', 'Alianza Atlético', 3, 1], [6, 'Cusco FC', 'Deportivo Garcilaso', 1, 0], [6, 'ADT', 'Juan Pablo II', 2, 3],
  [6, 'Los Chankas', 'Universitario', 3, 1], [6, 'Cienciano', 'Sport Boys', 3, 1], [6, 'Alianza Lima', 'FBC Melgar', 3, 1],
  [7, 'FC Cajamarca', 'Comerciantes Unidos', 3, 4], [7, 'Sport Huancayo', 'ADT', 0, 1], [7, 'Juan Pablo II', 'Los Chankas', 2, 3],
  [7, 'Deportivo Garcilaso', 'Alianza Lima', 1, 1], [7, 'Universitario', 'UTC', 2, 0], [7, 'Sporting Cristal', 'Sport Boys', 3, 0],
  [7, 'FBC Melgar', 'Atlético Grau', 0, 0], [7, 'Alianza Atlético', 'CD Moquegua', 3, 0], [7, 'Cusco FC', 'Cienciano', 1, 2],
  [8, 'ADT', 'FBC Melgar', 1, 1], [8, 'Cienciano', 'FC Cajamarca', 3, 0], [8, 'CD Moquegua', 'Cusco FC', 1, 2],
  [8, 'Comerciantes Unidos', 'Universitario', 0, 0], [8, 'Los Chankas', 'Sporting Cristal', 3, 2], [8, 'Alianza Lima', 'Juan Pablo II', 2, 0],
  [8, 'UTC', 'Alianza Atlético', 1, 1], [8, 'Atlético Grau', 'Deportivo Garcilaso', 0, 0], [8, 'Sport Boys', 'Sport Huancayo', 3, 0]
].map(p => ({ Fecha_Global: p[0], Torneo: 'Apertura', Local: p[1], Visitante: p[2], GL: p[3], GV: p[4] }));

export default function Home() {
  const [temporada, setTemporada] = useState('2026');
  const [fecha, setFecha] = useState(8);
  const [tab, setTab] = useState('fixture');
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

  // LOGOS MAESTROS
  const logos = {
    'Alianza Lima': 'https://tmssl.akamaized.net//images/wappen/head/184.png?lm=1755275805',
    'Universitario': 'https://tmssl.akamaized.net//images/wappen/head/6593.png',
    'Sporting Cristal': 'https://tmssl.akamaized.net//images/wappen/head/21157.png',
    'FBC Melgar': 'https://tmssl.akamaized.net//images/wappen/head/2734.png',
    'Cienciano': 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4814.png',
    'Cusco (Garcilaso)': 'https://images.seeklogo.com/logo-png/32/2/asociacion-civil-real-atletico-garcilaso-logo-png_seeklogo-328024.png',
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
    'FC Cajamarca': 'https://tmssl.akamaized.net//images/wappen/head/120792.png?lm=1767023947',
    'Dep. Municipal': 'https://tmssl.akamaized.net//images/wappen/head/17974.png',
    'Cantolao': 'https://tmssl.akamaized.net//images/wappen/head/11247.png',
    'Sport Rosario': 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/18441.png',
    'U. San Martin': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROfQWRTSLDENcZLhqUcuH2MNeOyHkGsCnxeQ&s',
    'Union Comercio': 'https://tmssl.akamaized.net//images/wappen/head/31337.png',
    'Ayacucho FC': 'https://tmssl.akamaized.net//images/wappen/head/21178.png',
    'Binacional': 'https://tmssl.akamaized.net//images/wappen/head/41054.png'
  };

  const info_clubes = {
    'Universitario': { Apodo: 'Cremas', Fundación: '1924', Estadio: 'Monumental U Marathon' },
    'Alianza Lima': { Apodo: 'Íntimos', Fundación: '1901', Estadio: 'Alejandro Villanueva (Matute)' },
    'Sporting Cristal': { Apodo: 'Celestes', Fundación: '1955', Estadio: 'Alberto Gallardo' },
    'FBC Melgar': { Apodo: 'Rojinegros', Fundación: '1915', Estadio: 'Monumental de la UNSA' },
    'Cienciano': { Apodo: 'El Papá', Fundación: '1901', Estadio: 'Inca Garcilaso de la Vega' },
    'Sport Boys': { Apodo: 'La Misilera', Fundación: '1927', Estadio: 'Miguel Grau' },
  };

  // CEREBRO DE DATOS
  const listaPartidos = useMemo(() => {
    if (temporada === '2013') return partidos2013JSON.map(p => ({ Fecha_Global: p[0], Local: p[1], Visitante: p[2], GL: p[3], GV: p[4] }));
    if (temporada === '2018') {
      const raw = Array.isArray(partidos2018JSON) ? partidos2018JSON : (partidos2018JSON.BaseDatos || []);
      return raw;
    }
    return partidos2026JSON;
  }, [temporada]);

  // Lógica de fechas máximas por temporada (EL ARREGLO)
  const maxFechas = useMemo(() => {
    if (temporada === '2013') return 48;
    if (temporada === '2018') return 44;
    return 17;
  }, [temporada]);

  const partidosValidos = useMemo(() => {
    return listaPartidos.filter(p => p.Fecha_Global <= fecha && p.GL !== null && p.GV !== null);
  }, [listaPartidos, fecha]);

  const partidosJugadosEquipo = useMemo(() => {
    if (!equipoSeleccionado) return [];
    return listaPartidos
      .filter(p => p.Fecha_Global <= fecha && p.GL !== null && (p.Local === equipoSeleccionado || p.Visitante === equipoSeleccionado))
      .sort((a, b) => b.Fecha_Global - a.Fecha_Global).slice(0, 5);
  }, [listaPartidos, equipoSeleccionado, fecha]);

  const proximosPartidosEquipo = useMemo(() => {
    if (!equipoSeleccionado) return [];
    return listaPartidos
      .filter(p => p.Fecha_Global > fecha && (p.Local === equipoSeleccionado || p.Visitante === equipoSeleccionado))
      .sort((a, b) => a.Fecha_Global - b.Fecha_Global).slice(0, 3);
  }, [listaPartidos, equipoSeleccionado, fecha]);

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
        if (p.GL > p.GV) { tabla[p.Local].g++; tabla[p.Local].pts += 3; tabla[p.Local].racha.push('V'); tabla[p.Visitante].p++; tabla[p.Visitante].racha.push('D'); }
        else if (p.GL < p.GV) { tabla[p.Visitante].g++; tabla[p.Visitante].pts += 3; tabla[p.Visitante].racha.push('V'); tabla[p.Local].p++; tabla[p.Local].racha.push('D'); }
        else { tabla[p.Local].e++; tabla[p.Visitante].e++; tabla[p.Local].pts += 1; tabla[p.Visitante].pts += 1; tabla[p.Local].racha.push('E'); tabla[p.Visitante].racha.push('E'); }
      }
    });
    return Object.values(tabla)
      .map(t => {
        let finalPts = t.pts;
        if (temporada === '2018' && esAcumulado && fecha >= 44) {
          if (t.equipo === 'Sporting Cristal') finalPts += 2;
          if (t.equipo === 'Sport Rosario') finalPts -= 7;
          if (['Dep. Municipal', 'UTC', 'Cantolao'].includes(t.equipo)) finalPts -= 2;
          if (t.equipo === 'Universitario') finalPts -= 1;
        }
        return { ...t, pts: finalPts, dif: t.gf - t.gc, ultimas: t.racha.slice(-5).reverse() };
      }).sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);
  };

  const TablaComponent = ({ titulo, zona, datos, esAcumulado, compactLogo = false }) => (
    <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-[8px] overflow-hidden shadow-lg mb-[15px] pb-1">
      <div className="text-center text-white font-bold text-[14px] uppercase py-[10px]">{titulo}</div>
      {zona && <div className="bg-[#0d2418] text-white px-[10px] py-[6px] font-bold text-[12px] border-b-[2px] border-[#1a4a2e] mx-[2px]">{zona}</div>}
      <table className="w-full text-[12px] text-center text-white font-sans border-collapse mt-1">
        <thead>
          <tr>
            <th className="bg-[#0d2418] text-[#a1b5a8] py-[6px] w-[30px]">#</th>
            <th className="bg-[#0d2418] text-[#a1b5a8] py-[6px] text-left">Equipos</th>
            <th className="bg-[#0d2418] text-[#a1b5a8] py-[6px]">PTS</th>
            <th className="bg-[#0d2418] text-[#a1b5a8] py-[6px]">J</th>
            <th className="bg-[#0d2418] text-[#a1b5a8] py-[6px]">Gol</th>
            <th className="bg-[#0d2418] text-[#a1b5a8] py-[6px]">+/-</th>
            <th className="bg-[#0d2418] text-[#a1b5a8] py-[6px]">Últimas</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((eq, i) => (
            <tr key={eq.equipo} className={`hover:bg-[#1c4531] ${i % 2 === 0 ? 'bg-[#112d1e]' : 'bg-[#153625]'}`}>
              <td className="py-[6px] px-[4px] font-bold">{i + 1}</td>
              <td className="py-[6px] px-[4px] text-left font-bold flex items-center">
                <img src={logos[eq.equipo] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '15px', height: '15px', marginRight: '6px' }} />
                <span>{eq.equipo}</span>
              </td>
              <td className="py-[6px] font-bold text-white">{eq.pts}</td>
              <td className="py-[6px] text-white">{eq.pj}</td>
              <td className="py-[6px] text-white">{eq.gf}:{eq.gc}</td>
              <td className="py-[6px] text-white">{eq.dif}</td>
              <td className="py-[6px]">
                <div className="flex gap-[2px] justify-center">
                  {eq.ultimas.map((r, idx) => (
                    <span key={idx} className="text-white text-[8.5px] font-bold rounded-[2px] px-[4px] py-[1px]" style={{ backgroundColor: r === 'V' ? '#8cc63f' : r === 'E' ? '#e1c340' : '#d32f2f' }}>{r}</span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ListaPartidosComponent = ({ titulo, partidos }) => (
    <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-[8px] overflow-hidden shadow-lg mb-[15px] pb-1">
      <div className="text-center text-white font-bold text-[14px] uppercase py-[10px]">{titulo}</div>
      {partidos.map((p, idx) => (
        <div key={idx} className={`flex justify-between items-center py-[8px] px-[10px] border-t border-[#1a4a2e] ${idx % 2 === 0 ? 'bg-[#112d1e]' : 'bg-[#153625]'}`}>
          <span className="text-[#a1b5a8] text-[10px] font-bold w-[35px]">F{p.Fecha_Global}</span>
          <div className="flex items-center w-[85%] justify-center">
            <span className="text-right w-[40%] text-[12px] font-bold truncate text-white">{p.Local}</span>
            <img src={logos[p.Local] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '18px', height: '18px', margin: '0 5px' }} />
            <div className="flex items-center justify-center gap-[2px] mx-[5px]">
              {p.GL !== null ? (
                <div className="bg-[#0d2418] border border-[#1a4a2e] rounded font-bold text-white text-[14px] w-[25px] h-[25px] flex items-center justify-center">{p.GL}-{p.GV}</div>
              ) : <div className="text-[#8cc63f] font-bold text-[12px]">VS</div>}
            </div>
            <img src={logos[p.Visitante] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '18px', height: '18px', margin: '0 5px' }} />
            <span className="text-left w-[40%] text-[12px] font-bold truncate text-white">{p.Visitante}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b4026] font-sans selection:bg-[#8cc63f] selection:text-black pb-10">
      <div className="pt-6 pb-2 relative">
        <h2 className="text-center text-[24px] font-bold m-0 text-white uppercase">LIGA PROFESIONAL PERUANA {temporada}</h2>
        {temporada !== '2026' && (
          <div className="absolute right-4 top-6">
            <button onClick={() => { setTemporada('2026'); setFecha(8); setTab('fixture'); setEquipoSeleccionado(null); }} className="bg-[#112d1e] border border-[#fbbf24] text-[#fbbf24] text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-[#fbbf24] hover:text-[#0b4026] cursor-pointer">⬅️ VOLVER AL 2026</button>
          </div>
        )}
      </div>

      <nav className="w-full mb-6 mt-4 border-b border-[#1a4a2e]">
        <div className="max-w-5xl mx-auto flex justify-center">
          {[{ id: 'fixture', label: 'FIXTURE Y TABLAS' }, { id: 'equipos', label: 'EQUIPOS' }, { id: 'campeones', label: 'CAMPEONES' }].map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setEquipoSeleccionado(null); }} className={`px-[30px] py-[12px] font-bold text-[13px] uppercase transition-all bg-transparent border-none cursor-pointer ${tab === t.id ? 'text-white border-b-[3px] border-[#fbbf24]' : 'text-[#87b897]'}`}>{t.label}</button>
          ))}
        </div>
      </nav>

      {tab === 'fixture' && (
        <main className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-6 max-w-[1250px] mx-auto px-4">
          <div>
            <TablaComponent titulo={`TABLA ACUMULADA ${temporada}`} datos={generarTabla(partidosValidos, null, true)} esAcumulado={true} />
          </div>
          <div>
            <div className="bg-[#0d2418] border border-[#8cc63f] rounded-[4px] mb-4">
              <select value={fecha} onChange={(e) => setFecha(Number(e.target.value))} className="w-full bg-transparent text-white font-bold text-[13px] py-[10px] text-center border-none outline-none appearance-none cursor-pointer">
                {[...Array(maxFechas)].map((_, i) => <option key={i+1} value={i+1} className="bg-[#0b4026]">FECHA {i+1}</option>)}
              </select>
            </div>
            <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg overflow-hidden">
               {listaPartidos.filter(p => p.Fecha_Global === fecha).map((p, idx) => (
                 <div key={idx} className={`flex justify-between items-center py-2 px-3 border-b border-[#1a4a2e] ${idx % 2 === 0 ? 'bg-[#112d1e]' : 'bg-[#153625]'}`}>
                   <div className="flex items-center w-full justify-center gap-2">
                     <span className="text-right w-[40%] text-[11px] font-bold text-white truncate">{p.Local}</span>
                     <img src={logos[p.Local] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} className="w-4 h-4" />
                     <div className="bg-[#0d2418] px-2 py-0.5 rounded font-black text-white text-[12px]">{p.GL !== null ? `${p.GL}-${p.GV}` : 'VS'}</div>
                     <img src={logos[p.Visitante] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} className="w-4 h-4" />
                     <span className="text-left w-[40%] text-[11px] font-bold text-white truncate">{p.Visitante}</span>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </main>
      )}

      {tab === 'equipos' && (
        <main className="max-w-[1250px] mx-auto px-4">
          {!equipoSeleccionado ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {Object.keys(logos).sort().map(eq => (
                <button key={eq} onClick={() => setEquipoSeleccionado(eq)} className="p-4 flex flex-col items-center bg-[#112d1e] border border-[#1a4a2e] rounded hover:bg-[#1c4531] cursor-pointer">
                  <img src={logos[eq]} className="w-8 h-8 mb-2" />
                  <span className="text-[10px] text-white font-bold uppercase text-center">{eq}</span>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <button onClick={() => setEquipoSeleccionado(null)} className="mb-4 text-white font-bold text-[10px] bg-[#1a4a2e] px-4 py-2 rounded cursor-pointer">⬅ VOLVER</button>
              <div className="grid md:grid-cols-[1fr_350px] gap-6">
                <div className="flex flex-col gap-4">
                  <ListaPartidosComponent titulo="Últimos Partidos" partidos={partidosJugadosEquipo} />
                  <ListaPartidosComponent titulo="Próximos Partidos" partidos={proximosPartidosEquipo} />
                </div>
                <div className="bg-[#112d1e] border border-[#1a4a2e] rounded p-6 h-fit sticky top-10">
                  <h3 className="text-center text-white font-bold mb-4 uppercase">Info del Club</h3>
                  <div className="flex flex-col gap-2 text-[12px]">
                    <div className="flex justify-between border-b border-[#1a4a2e] pb-1"><span className="text-[#a1b5a8]">APODO</span><span className="text-white font-bold">{info_clubes[equipoSeleccionado]?.Apodo || '-'}</span></div>
                    <div className="flex justify-between border-b border-[#1a4a2e] pb-1"><span className="text-[#a1b5a8]">FUNDACIÓN</span><span className="text-white font-bold">{info_clubes[equipoSeleccionado]?.Fundación || '-'}</span></div>
                    <div className="text-center pt-2"><span className="text-[#a1b5a8] block mb-1">ESTADIO</span><span className="text-[#8cc63f] font-bold">{info_clubes[equipoSeleccionado]?.Estadio || 'Local'}</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {tab === 'campeones' && (
        <main className="max-w-4xl mx-auto px-4">
          <div className="bg-[#112d1e] border border-[#1a4a2e] rounded overflow-hidden">
            <table className="w-full text-white text-[12px]">
              <thead><tr className="bg-[#0d2418] text-[#a1b5a8]"><th className="p-3 text-left">AÑO</th><th className="p-3 text-left">CAMPEÓN</th></tr></thead>
              <tbody>
                {[{Año:'2013', Camp:'Universitario'}, {Año:'2018', Camp:'Sporting Cristal'}].map(row => (
                  <tr key={row.Año} className="border-b border-[#1a4a2e]/50">
                    <td className="p-3 font-bold">{row.Año}</td>
                    <td className="p-3 flex items-center justify-between font-bold">
                      <div className="flex items-center gap-2"><img src={logos[row.Camp]} className="w-4 h-4"/>{row.Camp}</div>
                      <button onClick={() => { setTemporada(row.Año); setFecha(row.Año==='2013'?48:44); setTab('fixture'); }} className="bg-[#8cc63f] text-black font-bold text-[9px] px-3 py-1 rounded cursor-pointer border-none">VER AÑO</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}
    </div>
  );
}

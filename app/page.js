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
        return { ...t, pts: finalPts, dif: t.gf - t.gc, ultimas: t.racha.slice(-5).reverse() };
      })
      .sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);
  };

  const TablaComponent = ({ titulo, zona, datos, esAcumulado }) => (
    <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-[8px] overflow-hidden">
      <div className="text-center text-white font-bold text-[14px] uppercase py-[10px]">
        {titulo}
      </div>
      {zona && (
        <div className="bg-[#0d2418] text-white px-[10px] py-[6px] font-bold text-[12px] border-b-[2px] border-[#1a4a2e] rounded-t-md mx-[2px]">
          {zona}
        </div>
      )}
      <table className="w-full text-[12px] text-center text-white font-sans border-collapse">
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
                       style={{ width: '15px', height: '15px', minWidth: '15px', objectFit: 'contain', marginRight: '6px' }} 
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
    <div className="min-h-screen bg-[#0b4026] text-white font-sans selection:bg-[#8cc63f] selection:text-black">
      {/* Título y Tabs (Exactamente igual) */}
      <div className="pt-6 pb-4">
        <h2 className="text-center text-white text-[24px] font-bold m-0 mb-[15px]">LIGA PROFESIONAL PERUANA 2018</h2>
        <div className="flex justify-center border-b border-[#1a4a2e] gap-0">
          <div className="text-white border-b-[3px] border-[#8cc63f] px-[20px] py-[8px] font-bold text-[13px] uppercase">FIXTURE Y TABLAS</div>
          <div className="text-[#87b897] px-[20px] py-[8px] font-bold text-[13px] uppercase cursor-pointer hover:text-white">EQUIPOS Y ESTADISTICAS</div>
          <div className="text-[#87b897] px-[20px] py-[8px] font-bold text-[13px] uppercase cursor-pointer hover:text-white">CAMPEONES</div>
        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL: Aquí está el truco de las 2 columnas aseguradas */}
      <main className="max-w-[1250px] mx-auto pt-4 pb-8 px-4 flex flex-col md:flex-row gap-6 items-start">
        
        {/* COLUMNA IZQUIERDA (Tablas - 65%) */}
        <div className="w-full md:w-[63%] flex flex-col gap-6">
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

        {/* COLUMNA DERECHA (Fixture y Goles - 35%) */}
        <div className="w-full md:w-[37%] flex flex-col gap-6">
          
          {/* Bloque Fixture */}
          <div className="flex flex-col gap-[10px]">
            <div className="text-center text-[#8cc63f] font-bold text-[14px] uppercase mb-[-5px]">TEMPORADA 2018</div>
            
            <div className="bg-[#0d2418] border border-[#8cc63f] rounded-[4px]">
              <select 
                value={fecha} 
                onChange={(e) => setFecha(Number(e.target.value))}
                className="w-full bg-transparent text-white font-bold text-[13px] px-[10px] py-[8px] outline-none appearance-none text-center cursor-pointer"
              >
                {[...Array(44)].map((_, i) => (
                  <option key={i+1} value={i+1} className="bg-[#0d2418]">FECHA {i+1}</option>
                ))}
              </select>
            </div>

            <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg overflow-hidden">
              <div className="flex flex-col max-h-[550px] overflow-y-auto custom-scrollbar">
                {listaPartidos.filter(p => p.Fecha_Global === fecha).map((p, idx) => (
                  <div key={idx} className={`flex justify-between items-center py-[8px] px-[10px] border-b border-[#1a4a2e] hover:bg-[#1c4531] transition-colors ${idx % 2 === 0 ? 'bg-[#112d1e]' : 'bg-[#153625]'}`}>
                    <span className="text-white text-[10px] font-bold w-[35px]">Final</span>
                    
                    <div className="flex items-center w-[85%] justify-center">
                      <span className="text-right w-[40%] text-[12px] text-white font-bold truncate">{p.Local}</span>
                      <img src={logos[p.Local] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} 
                           style={{ width: '18px', height: '18px', minWidth: '18px', objectFit: 'contain', margin: '0 5px' }} />
                      
                      <div className="flex items-center justify-center gap-[2px] mx-[5px]">
                        <div className="bg-[#0d2418] border border-[#1a4a2e] rounded-[4px] text-white font-bold text-[14px] w-[25px] h-[25px] flex items-center justify-center">
                          {p.GL !== null ? p.GL : '-'}
                        </div>
                        <div className="text-[#8cc63f] font-bold text-[14px] mx-[2px]">-</div>
                        <div className="bg-[#0d2418] border border-[#1a4a2e] rounded-[4px] text-white font-bold text-[14px] w-[25px] h-[25px] flex items-center justify-center">
                          {p.GV !== null ? p.GV : '-'}
                        </div>
                      </div>
                      
                      <img src={logos[p.Visitante] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} 
                           style={{ width: '18px', height: '18px', minWidth: '18px', objectFit: 'contain', margin: '0 5px' }} />
                      <span className="text-left w-[40%] text-[12px] text-white font-bold truncate">{p.Visitante}</span>
                    </div>
                  </div>
                ))}
                {listaPartidos.filter(p => p.Fecha_Global === fecha).length === 0 && (
                  <div className="text-center text-[12px] p-[15px]">No hay partidos registrados.</div>
                )}
              </div>
            </div>
          </div>

          {/* Bloque Goleadores */}
          <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-[8px] p-[10px] px-[15px]">
             <div className="text-center text-white font-bold text-[14px] uppercase mb-[10px]">GOLEADORES</div>
             <table className="w-full text-[12px] text-white font-sans border-collapse mt-[5px]">
               <thead>
                 <tr>
                   <th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px] text-left">Jugador</th>
                   <th className="bg-[#0d2418] text-[#a1b5a8] border-b border-[#1a4a2e] py-[6px] px-[4px] font-normal text-[11px] text-center w-[40px]">Goles</th>
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
                  <tr key={i} className={`hover:bg-[#1c4531] transition-colors ${i % 2 === 0 ? 'bg-[#112d1e]' : 'bg-[#153625]'}`}>
                    <td className="py-[6px] px-[4px] text-left flex items-center">
                      <img src={logos[g.eq] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} 
                           style={{ width: '15px', height: '15px', minWidth: '15px', objectFit: 'contain', marginRight: '6px' }} />
                      <span className="text-white">{g.n}</span>
                    </td>
                    <td className="py-[6px] px-[4px] text-center font-bold text-white">{g.g}</td>
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

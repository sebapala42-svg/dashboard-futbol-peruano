'use client';
import React, { useState } from 'react';
import { Shield, ChevronLeft, Trophy, Calendar, MapPin, Users, History, Clock } from 'lucide-react';

export default function Home() {
  const [temporada, setTemporada] = useState('2026');
  const [tab, setTab] = useState('fixture');
  const [partidoId, setPartidoId] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(1);

  // --- BASE DE DATOS MIGRADA (TU DATA ORIGINAL) ---
  const logos = {
    'Universitario': 'https://tmssl.akamaized.net//images/wappen/head/6593.png',
    'Alianza Lima': 'https://tmssl.akamaized.net//images/wappen/head/184.png?lm=1755275805',
    'Sporting Cristal': 'https://tmssl.akamaized.net//images/wappen/head/21157.png',
    'FBC Melgar': 'https://tmssl.akamaized.net//images/wappen/head/2734.png',
    'ADT': 'https://tmssl.akamaized.net//images/wappen/head/35588.png?lm=1705855304',
    'UTC': 'https://tmssl.akamaized.net//images/wappen/head/21170.png',
    'Atlético Grau': 'https://tmssl.akamaized.net//images/wappen/head/27861.png?lm=1499523568',
    'Sport Huancayo': 'https://tmssl.akamaized.net//images/wappen/head/21655.png',
    'Cienciano': 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4814.png',
  };

  const partidos2026 = [
    { id: 'u_adt', fecha: 1, loc: "Universitario", vis: "ADT", gl: 2, gv: 0, estado: "Finalizado" },
    { id: 'sh_al', fecha: 1, loc: "Sport Huancayo", vis: "Alianza Lima", gl: 1, gv: 2, estado: "Finalizado" },
    { id: 'utc_ag', fecha: 1, loc: "UTC", vis: "Atlético Grau", gl: 2, gv: 0, estado: "Finalizado" },
    { id: 'mel_cie', fecha: 1, loc: "FBC Melgar", vis: "Cienciano", gl: 2, gv: 0, estado: "Finalizado" },
  ];

  const detalleUvsADT = {
    goles: "⚽ Universitario: Alex Valera 55', Martín Pérez Guedes 57'",
    dt_l: 'J. Rabanal',
    dt_v: 'P. Trobbiani',
    titulares_l: 'Romero; Corzo, Fara, Inga, Carabalí; Castillo, Pérez Guedes, Concha, Polo; Flores y Valera.',
    titulares_v: 'Valencia; Soto, Narváez, Gómez, Gutiérrez, Pérez, Ojeda, Cabello, Arakaki, Rodríguez y Bauman.',
    cambios_l: ["Alzugaray x Flores (37')", "Murrugarra x Castillo (62')", "Calcaterra x Pérez Guedes (77')", "Ancajima x Polo (77')", "Rivera x Valera (77')"],
    ta_l: 'Corzo',
    estadio: 'Estadio Monumental "U"',
    arbitro: 'Micke Palomino'
  };

  return (
    <div className="min-h-screen bg-[#0b4026] text-white font-sans selection:bg-[#8cc63f] selection:text-black">
      {/* Header Estilo Promiedos */}
      <header className="bg-[#0d2418] border-b border-[#1a4a2e] p-4 sticky top-0 z-50 shadow-xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-black uppercase italic tracking-tighter text-[#8cc63f]">
            LIGA PROFESIONAL <span className="text-white text-sm not-italic ml-2">{temporada}</span>
          </h1>
          <div className="flex gap-2">
            <button onClick={() => setTemporada('2026')} className={`px-3 py-1 text-[10px] font-bold rounded ${temporada === '2026' ? 'bg-[#8cc63f] text-black' : 'bg-black/20 text-gray-400'}`}>2026</button>
            <button onClick={() => setTemporada('2018')} className={`px-3 py-1 text-[10px] font-bold rounded ${temporada === '2018' ? 'bg-[#8cc63f] text-black' : 'bg-black/20 text-gray-400'}`}>2018</button>
          </div>
        </div>
      </header>

      {/* Navegación Principal */}
      <nav className="flex justify-center bg-[#0d2418] border-b border-[#1a4a2e]">
        {['fixture', 'equipos', 'campeones'].map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setPartidoId(null); }}
            className={`px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all ${tab === t ? 'text-white border-b-4 border-[#8cc63f]' : 'text-[#87b897] hover:text-white'}`}
          >
            {t}
          </button>
        ))}
      </nav>

      <main className="max-w-6xl mx-auto p-4 lg:p-8">
        {tab === 'fixture' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* PANEL IZQUIERDO: FIXTURE */}
            <div className="lg:col-span-5">
              <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-[#0d2418] p-3 flex justify-between items-center border-b border-[#1a4a2e]">
                  <span className="text-[10px] font-black text-[#8cc63f] uppercase tracking-widest">Apertura - Fecha {fechaSeleccionada}</span>
                  <select className="bg-black/40 border border-[#1a4a2e] text-[10px] rounded px-2 py-1 outline-none">
                    <option>FECHA 1</option>
                    <option disabled>FECHA 2 (Pronto)</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  {partidos2026.map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => p.id === 'u_adt' && setPartidoId('u_adt')}
                      className={`group flex items-center p-4 border-b border-[#1a4a2e] hover:bg-[#1a4a2e]/50 transition-all cursor-pointer ${p.id === 'u_adt' ? 'border-l-4 border-l-[#8cc63f]' : ''}`}
                    >
                      <div className="w-12 text-[9px] font-bold text-gray-500 uppercase">{p.estado}</div>
                      
                      <div className="flex-1 flex items-center justify-center gap-3">
                        <div className="flex items-center gap-2 w-full justify-end">
                          <span className="text-xs font-bold text-right hidden sm:inline">{p.loc}</span>
                          <img src={logos[p.loc]} className="w-5 h-5 object-contain" />
                        </div>

                        <div className="flex gap-1 items-center bg-black/40 px-3 py-2 rounded-lg border border-[#1a4a2e] group-hover:border-[#8cc63f] transition-colors">
                          <span className="text-lg font-black">{p.gl}</span>
                          <span className="text-[#8cc63f] font-black">-</span>
                          <span className="text-lg font-black">{p.gv}</span>
                        </div>

                        <div className="flex items-center gap-2 w-full justify-start">
                          <img src={logos[p.vis]} className="w-5 h-5 object-contain" />
                          <span className="text-xs font-bold hidden sm:inline">{p.vis}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PANEL DERECHO: DETALLE O TABLA */}
            <div className="lg:col-span-7">
              {!partidoId ? (
                <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                  <Trophy className="text-[#8cc63f] mb-4 opacity-20" size={60} />
                  <p className="text-[#87b897] text-sm uppercase font-bold tracking-widest">Selecciona un marcador para ver la ficha técnica</p>
                  <p className="text-[10px] text-gray-500 mt-2">Dato: El partido de la U vs ADT ya tiene cargado el sistema de Rabanal.</p>
                </div>
              ) : (
                <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                  {/* Encabezado Ficha */}
                  <div className="p-8 bg-gradient-to-b from-[#0d2418] to-transparent text-center border-b border-[#1a4a2e]">
                    <button onClick={() => setPartidoId(null)} className="flex items-center gap-1 text-[10px] font-bold text-[#8cc63f] uppercase mb-6 hover:translate-x-[-4px] transition-transform">
                      <ChevronLeft size={14} /> Volver al fixture
                    </button>
                    
                    <div className="flex justify-between items-center max-w-sm mx-auto mb-6">
                      <div className="flex flex-col items-center">
                        <img src={logos.Universitario} className="w-16 h-16 object-contain mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
                        <span className="text-sm font-black">UNIVERSITARIO</span>
                      </div>
                      <div className="text-center">
                        <div className="text-6xl font-black italic tracking-tighter">2 - 0</div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase mt-2 tracking-[0.2em]">Finalizado</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src={logos.ADT} className="w-16 h-16 object-contain mb-2" />
                        <span className="text-sm font-black">A.D.T.</span>
                      </div>
                    </div>
                    <div className="inline-block bg-[#8cc63f]/10 text-[#8cc63f] px-4 py-2 rounded-full text-xs font-bold border border-[#8cc63f]/20 tracking-wide">
                      {detalleUvsADT.goles}
                    </div>
                  </div>

                  {/* Cuerpo de la Ficha (Estilo Rabanal) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#1a4a2e]">
                    <div className="p-6">
                      <div className="text-[10px] font-black text-[#8cc63f] mb-4 uppercase flex items-center gap-2">
                        <Users size={12}/> Plantel Universitario
                      </div>
                      <p className="text-[11px] text-white/90 leading-relaxed mb-4">
                        <span className="text-gray-500 font-bold">DT:</span> {detalleUvsADT.dt_l} <br/><br/>
                        <span className="text-gray-500 font-bold uppercase tracking-tighter">Titulares:</span><br/>
                        {detalleUvsADT.titulares_l}
                      </p>
                      <div className="bg-black/20 p-3 rounded-lg border border-[#1a4a2e]">
                         <span className="text-[9px] text-gray-500 font-bold uppercase">Cambios Realizados</span>
                         <ul className="text-[10px] mt-2 space-y-1">
                           {detalleUvsADT.cambios_l.map((c, i) => <li key={i}>🔄 {c}</li>)}
                         </ul>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-[10px] font-black text-[#8cc63f] mb-4 uppercase flex items-center gap-2">
                        <Users size={12}/> Plantel A.D.T.
                      </div>
                      <p className="text-[11px] text-white/90 leading-relaxed mb-4">
                        <span className="text-gray-500 font-bold">DT:</span> {detalleUvsADT.dt_v} <br/><br/>
                        <span className="text-gray-500 font-bold uppercase tracking-tighter">Titulares:</span><br/>
                        {detalleUvsADT.titulares_v}
                      </p>
                      <div className="bg-black/20 p-3 rounded-lg border border-[#1a4a2e] border-dashed text-center">
                        <span className="text-[9px] text-gray-500 font-bold uppercase">Incidencias</span>
                        <p className="text-[10px] mt-2 text-[#e1c340]">🟨 Sin tarjetas reportadas</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer de Ficha */}
                  <div className="p-4 bg-[#0d2418] border-t border-[#1a4a2e] flex flex-wrap justify-center gap-6 text-[10px] font-bold text-gray-400">
                    <span className="flex items-center gap-1"><MapPin size={12} className="text-[#8cc63f]"/> {detalleUvsADT.estadio}</span>
                    <span className="flex items-center gap-1"><Users size={12} className="text-[#8cc63f]"/> Arbitro: {detalleUvsADT.arbitro}</span>
                    <span className="flex items-center gap-1 text-[#8cc63f]"><Clock size={12}/> Apertura 2026</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

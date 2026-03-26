'use client';
import React, { useState } from 'react';
import { Shield, ChevronLeft, Trophy, Calendar, MapPin, Users } from 'lucide-react';

export default function Home() {
  const [tab, setTab] = useState('fixture');
  const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);

  const partidos = [
    { id: 'u_adt', loc: "Universitario", vis: "ADT", gl: 2, gv: 0, estado: "Finalizado", fecha: "FECHA 1" },
    { id: 'sh_al', loc: "Sport Huancayo", vis: "Alianza Lima", gl: 1, gv: 2, estado: "Finalizado", fecha: "FECHA 1" },
    { id: 'utc_ag', loc: "UTC", vis: "Atlético Grau", gl: 2, gv: 0, estado: "Finalizado", fecha: "FECHA 1" },
  ];

  const detalleUvsADT = {
    torneo: "Liga 1 Apertura 2026 - Fecha 1",
    goles: "⚽ Universitario: Alex Valera 55', Martín Pérez Guedes 57'",
    dt_l: 'J. Rabanal',
    dt_v: 'P. Trobbiani',
    titulares_l: 'Romero; Corzo, Fara, Inga, Carabalí; Castillo, Pérez Guedes, Concha, Polo; Flores y Valera.',
    titulares_v: 'Valencia; Soto, Narváez, Gómez, Gutiérrez, Pérez, Ojeda, Cabello, Arakaki, Rodríguez y Bauman.',
    cambios_l: ["Alzugaray x Flores (37')", "Murrugarra x Castillo (62')", "Calcaterra x Pérez Guedes (77')", "Ancajima x Polo (77')", "Rivera x Valera (77')"],
    cambios_v: ["Cedrón x Cabello (62')", "Alvino x Ojeda (70')", "García x Arakaki (70')", "Benites x Rodríguez (70')", "Rengifo x Bauman (75')"],
    ta_l: 'Corzo',
    ta_v: 'Valencia, Narváez, Rodríguez, Benites, Gutiérrez',
    estadio: 'Estadio Monumental "U"',
    arbitro: 'Micke Palomino',
    var: 'Pablo López'
  };

  return (
    <div className="min-h-screen bg-[#0b4026] text-white font-sans">
      {/* Header */}
      <header className="bg-[#0d2418] border-b border-[#1a4a2e] p-4 text-center">
        <h1 className="text-xl font-bold uppercase tracking-widest text-[#8cc63f]">
          Liga Profesional Peruana 2026
        </h1>
      </header>

      {/* Tabs */}
      <nav className="flex justify-center bg-[#0d2418] border-b border-[#1a4a2e]">
        {['fixture', 'equipos', 'campeones'].map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setPartidoSeleccionado(null); }}
            className={`px-6 py-3 text-xs font-bold uppercase transition-all ${tab === t ? 'text-[#8cc63f] border-b-2 border-[#8cc63f]' : 'text-gray-400 hover:text-white'}`}
          >
            {t === 'fixture' ? 'Fixture y Tablas' : t === 'equipos' ? 'Equipos' : 'Campeones'}
          </button>
        ))}
      </nav>

      <main className="max-w-5xl mx-auto p-4">
        {tab === 'fixture' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Columna Fixture */}
            <div className="md:col-span-1">
              <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg overflow-hidden">
                <div className="bg-[#0d2418] p-2 text-center text-[10px] font-bold text-[#8cc63f] uppercase">Apertura 2026 - Fecha 1</div>
                {partidos.map((p) => (
                  <div 
                    key={p.id} 
                    onClick={() => p.id === 'u_adt' && setPartidoSeleccionado('u_adt')}
                    className={`flex items-center justify-between p-3 border-b border-[#1a4a2e] hover:bg-[#1c4531] transition-all ${p.id === 'u_adt' ? 'cursor-pointer' : ''}`}
                  >
                    <span className="text-[9px] text-gray-400 font-bold uppercase">{p.estado}</span>
                    <div className="flex flex-1 items-center justify-center gap-2">
                       <span className="text-xs font-bold w-20 text-right truncate">{p.loc}</span>
                       <div className="flex gap-1 items-center bg-[#0d2418] px-2 py-1 rounded border border-[#1a4a2e]">
                         <span className="font-bold text-sm text-white">{p.gl}</span>
                         <span className="text-[#8cc63f]">-</span>
                         <span className="font-bold text-sm text-white">{p.gv}</span>
                       </div>
                       <span className="text-xs font-bold w-20 text-left truncate">{p.vis}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna Derecha: Tabla o Detalle */}
            <div className="md:col-span-2">
              {!partidoSeleccionado ? (
                <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg p-4">
                  <h2 className="text-center font-bold text-sm mb-4 uppercase text-gray-300">Tabla de Posiciones</h2>
                  <p className="text-center text-xs text-gray-500 italic">Haz click en el marcador del partido U vs ADT para ver la ficha técnica.</p>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <button onClick={() => setPartidoSeleccionado(null)} className="mb-4 flex items-center gap-1 text-xs font-bold text-[#8cc63f] hover:underline">
                    <ChevronLeft size={14} /> Volver al fixture
                  </button>

                  {/* FICHA PROMIEDOS */}
                  <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg overflow-hidden">
                    <div className="p-6 text-center border-b border-[#1a4a2e]">
                      <p className="text-[10px] uppercase text-[#8cc63f] font-bold mb-4">{detalleUvsADT.torneo}</p>
                      <div className="flex justify-around items-center mb-4">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 mx-auto border border-[#1a4a2e]">
                            <span className="text-2xl font-bold">U</span>
                          </div>
                          <p className="font-bold text-lg">{partidos[0].loc}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-5xl font-black mb-1">{detalleUvsADT.gl} - {detalleUvsADT.gv}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Finalizado</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 mx-auto border border-[#1a4a2e]">
                            <span className="text-2xl font-bold">A</span>
                          </div>
                          <p className="font-bold text-lg">{partidos[0].vis}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-[#8cc63f]">{detalleUvsADT.goles}</p>
                    </div>

                    <div className="grid grid-cols-2 bg-[#0d2418]">
                      {/* Local */}
                      <div className="p-4 border-r border-[#1a4a2e]">
                        <p className="text-[10px] font-bold text-[#8cc63f] border-b border-[#1a4a2e] pb-1 mb-2 uppercase">Universitario</p>
                        <p className="text-xs mb-3"><span className="text-gray-400 font-bold">DT:</span> {detalleUvsADT.dt_l}</p>
                        <p className="text-[10px] text-gray-400 font-bold mb-1">TITULARES</p>
                        <p className="text-xs leading-relaxed mb-4">{detalleUvsADT.titulares_l}</p>
                        <p className="text-[10px] text-gray-400 font-bold mb-1">CAMBIOS</p>
                        <div className="space-y-1">
                          {detalleUvsADT.cambios_l.map((c, i) => <p key={i} className="text-[11px]">{c}</p>)}
                        </div>
                        <p className="text-xs mt-4"><span className="text-[#e1c340] font-bold">🟨 TA:</span> {detalleUvsADT.ta_l}</p>
                      </div>

                      {/* Visitante */}
                      <div className="p-4">
                        <p className="text-[10px] font-bold text-[#8cc63f] border-b border-[#1a4a2e] pb-1 mb-2 uppercase">A.D.T.</p>
                        <p className="text-xs mb-3"><span className="text-gray-400 font-bold">DT:</span> {detalleUvsADT.dt_v}</p>
                        <p className="text-[10px] text-gray-400 font-bold mb-1">TITULARES</p>
                        <p className="text-xs leading-relaxed mb-4">{detalleUvsADT.titulares_v}</p>
                        <p className="text-[10px] text-gray-400 font-bold mb-1">CAMBIOS</p>
                        <div className="space-y-1">
                          {detalleUvsADT.cambios_v.map((c, i) => <p key={i} className="text-[11px]">{c}</p>)}
                        </div>
                        <p className="text-xs mt-4"><span className="text-[#e1c340] font-bold">🟨 TA:</span> {detalleUvsADT.ta_v}</p>
                      </div>
                    </div>

                    <div className="bg-[#112d1e] p-3 text-center border-t border-[#1a4a2e] text-[10px] text-gray-400 flex justify-center gap-4">
                      <span className="flex items-center gap-1"><MapPin size={10} /> {detalleUvsADT.estadio}</span>
                      <span className="flex items-center gap-1"><Users size={10} /> Arbitro: {detalleUvsADT.arbitro}</span>
                      <span className="flex items-center gap-1"><Calendar size={10} /> VAR: {detalleUvsADT.var}</span>
                    </div>
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

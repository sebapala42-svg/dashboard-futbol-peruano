import React from 'react';

export default function Home() {
  const partidos = [
    { loc: "Universitario", vis: "ADT", gl: 2, gv: 0, estado: "Finalizado" },
    { loc: "Sport Huancayo", vis: "Alianza Lima", gl: 1, gv: 2, estado: "Finalizado" },
  ];

  return (
    <div className="min-h-screen bg-[#0b4026] text-white p-4 font-sans">
      <header className="text-center py-6">
        <h1 className="text-2xl font-bold border-b-2 border-[#8cc63f] inline-block pb-2">
          LIGA PROFESIONAL PERUANA 2026
        </h1>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg overflow-hidden">
          <div className="bg-[#0d2418] py-2 px-4 text-center text-xs font-bold text-[#8cc63f] uppercase tracking-wider">
            Fixture - Fecha 1
          </div>
          
          <div className="flex flex-col">
            {partidos.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b border-[#1a4a2e] hover:bg-[#1c4531] transition-colors cursor-pointer">
                <span className="text-[10px] font-bold text-gray-400 w-16 uppercase">{p.estado}</span>
                
                <div className="flex flex-1 items-center justify-center gap-4">
                  <div className="flex items-center gap-2 w-1/3 justify-end">
                    <span className="font-bold text-sm">{p.loc}</span>
                    <div className="w-6 h-6 bg-white/10 rounded-full"></div> {/* Espacio para logo */}
                  </div>

                  <div className="flex gap-1">
                    <div className="bg-[#0d2418] border border-[#1a4a2e] rounded w-8 h-8 flex items-center justify-center font-bold text-lg">
                      {p.gl}
                    </div>
                    <div className="flex items-center text-[#8cc63f] font-bold">-</div>
                    <div className="bg-[#0d2418] border border-[#1a4a2e] rounded w-8 h-8 flex items-center justify-center font-bold text-lg">
                      {p.gv}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-1/3 justify-start">
                    <div className="w-6 h-6 bg-white/10 rounded-full"></div> {/* Espacio para logo */}
                    <span className="font-bold text-sm">{p.vis}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center mt-8 text-[#87b897] text-sm italic">
          Haz click en un partido para ver la formación en el césped (Próximamente)
        </p>
      </main>
    </div>
  );
}

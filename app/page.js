"use client";
import React, { useState, useMemo } from 'react';
// IMPORTANTE: Asegúrate de que el JSON esté en la carpeta /app
import datos2018 from './torneo_2018.json'; 

// --- CONFIGURACIÓN DE LOGOS ---
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
    'FC Cajamarca': 'https://tmssl.akamaized.net//images/wappen/head/120792.png?lm=1767023947',
    'Dep. Municipal': 'https://tmssl.akamaized.net//images/wappen/head/17974.png',
    'Cantolao': 'https://tmssl.akamaized.net//images/wappen/head/11247.png',
    'Sport Rosario': 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/18441.png',
    'U. San Martin': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROfQWRTSLDENcZLhqUcuH2MNeOyHkGsCnxeQ&s',
    'Union Comercio': 'https://tmssl.akamaized.net//images/wappen/head/31337.png',
    'Ayacucho FC': 'https://tmssl.akamaized.net//images/wappen/head/21178.png',
    'Binacional': 'https://tmssl.akamaized.net//images/wappen/head/41054.png'
};

export default function Liga1Vercel() {
    const [fechaSel, setFechaSel] = useState(1);

    // --- LÓGICA DE PROCESAMIENTO (EL NUEVO PANDAS) ---
    const { tabla, partidosFecha } = useMemo(() => {
        const stats = {};
        const partidosFiltrados = datos2018.filter(p => p.Fecha_Global === fechaSel);
        
        // Procesar todos los partidos hasta la fecha seleccionada para la tabla
        datos2018.filter(p => p.Fecha_Global <= fechaSel && p.GL !== null).forEach(p => {
            [p.Local, p.Visitante].forEach(eq => {
                if (!stats[eq]) stats[eq] = { j: 0, pts: 0, gf: 0, gc: 0, g: 0, e: 0, p: 0 };
            });

            const loc = stats[p.Local];
            const vis = stats[p.Visitante];

            loc.j += 1; vis.j += 1;
            loc.gf += p.GL; loc.gc += p.GV;
            vis.gf += p.GV; vis.gc += p.GL;

            if (p.GL > p.GV) { loc.pts += 3; loc.g += 1; vis.p += 1; }
            else if (p.GL < p.GV) { vis.pts += 3; vis.g += 1; loc.p += 1; }
            else { loc.pts += 1; vis.pts += 1; loc.e += 1; vis.e += 1; }
        });

        const tablaArray = Object.keys(stats).map(name => ({
            name, ...stats[name], dg: stats[name].gf - stats[name].gc
        })).sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);

        return { tabla: tablaArray, partidosFecha: partidosFiltrados };
    }, [fechaSel]);

    return (
        <div className="min-h-screen bg-[#0b4026] text-white p-4 font-sans">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-center text-2xl font-bold mb-6">LIGA PROFESIONAL PERUANA 2018</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* COLUMNA IZQUIERDA: TABLA DE POSICIONES */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg p-4 shadow-xl">
                            <div className="text-center font-bold text-sm mb-4 text-[#8cc63f] uppercase">
                                Tabla Acumulada - Hasta Fecha {fechaSel}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs text-center border-collapse">
                                    <thead>
                                        <tr className="bg-[#0d2418] text-[#a1b5a8]">
                                            <th className="p-2 border-b border-[#1a4a2e]">#</th>
                                            <th className="p-2 border-b border-[#1a4a2e] text-left">Equipo</th>
                                            <th className="p-2 border-b border-[#1a4a2e]">PTS</th>
                                            <th className="p-2 border-b border-[#1a4a2e]">PJ</th>
                                            <th className="p-2 border-b border-[#1a4a2e]">GOL</th>
                                            <th className="p-2 border-b border-[#1a4a2e]">DG</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tabla.map((eq, i) => (
                                            <tr key={eq.name} className={i % 2 === 0 ? "bg-[#153625]" : "bg-[#112d1e]"}>
                                                <td className={`p-2 font-bold ${i < 4 ? 'border-l-4 border-blue-400' : ''}`}>{i + 1}</td>
                                                <td className="p-2 text-left flex items-center gap-2">
                                                    <img src={logos_equipos[eq.name]} className="w-4 h-4 object-contain" alt="" />
                                                    <span className="font-bold">{eq.name}</span>
                                                </td>
                                                <td className="p-2 font-bold text-sm text-[#8cc63f]">{eq.pts}</td>
                                                <td className="p-2">{eq.j}</td>
                                                <td className="p-2">{eq.gf}:{eq.gc}</td>
                                                <td className="p-2">{eq.dg}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: FIXTURE */}
                    <div className="lg:col-span-1">
                        <div className="mb-4">
                            <label className="text-xs text-[#8cc63f] font-bold block mb-1">SELECCIONAR FECHA</label>
                            <select 
                                className="w-full bg-[#0d2418] border border-[#8cc63f] rounded p-2 text-sm outline-none"
                                value={fechaSel}
                                onChange={(e) => setFechaSel(Number(e.target.value))}
                            >
                                {Array.from({length: 44}, (_, i) => i + 1).map(n => (
                                    <option key={n} value={n}>FECHA {n}</option>
                                ))}
                            </select>
                        </div>

                        <div className="bg-[#112d1e] border border-[#1a4a2e] rounded-lg overflow-hidden shadow-xl">
                            <div className="bg-[#0d2418] p-2 text-center text-xs font-bold text-[#a1b5a8]">PARTIDOS DE LA FECHA</div>
                            {partidosFecha.map((p, i) => (
                                <div key={i} className={`p-3 border-b border-[#1a4a2e] flex flex-col gap-2 ${i % 2 === 0 ? 'bg-[#153625]' : ''}`}>
                                    <div className="flex justify-between items-center px-2">
                                        <div className="flex flex-col items-center w-1/3 text-center">
                                            <img src={logos_equipos[p.Local]} className="w-8 h-8 mb-1 object-contain" alt="" />
                                            <span className="text-[10px] font-bold leading-tight">{p.Local}</span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <div className="bg-[#0d2418] w-8 h-8 flex items-center justify-center rounded border border-[#1a4a2e] font-bold text-lg">
                                                {p.GL !== null ? p.GL : '-'}
                                            </div>
                                            <span className="text-[#8cc63f] font-bold">-</span>
                                            <div className="bg-[#0d2418] w-8 h-8 flex items-center justify-center rounded border border-[#1a4a2e] font-bold text-lg">
                                                {p.GV !== null ? p.GV : '-'}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center w-1/3 text-center">
                                            <img src={logos_equipos[p.Visitante]} className="w-8 h-8 mb-1 object-contain" alt="" />
                                            <span className="text-[10px] font-bold leading-tight">{p.Visitante}</span>
                                        </div>
                                    </div>
                                    <div className="text-center text-[9px] text-[#87b897] uppercase">Finalizado</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 p-3 bg-[#0d2418] border border-[#1a4a2e] rounded text-[10px] text-[#87b897]">
                            * Datos cargados desde torneo_2018.json. Los puntos y posiciones se calculan en tiempo real.
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

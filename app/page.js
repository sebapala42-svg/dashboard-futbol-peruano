'use client';
import React, { useState, useMemo, useEffect } from 'react';
import partidosJSON from './torneo_2018.json';
import partidos2013JSON from './torneo_2013.json';
// PREPARACIÓN PARA 2019: Cuando tengas el archivo, descomenta la siguiente línea
// import partidos2019JSON from './torneo_2019.json';

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
  [8, 'UTC', 'Alianza Atlético', 1, 1], [8, 'Atlético Grau', 'Deportivo Garcilaso', 0, 0], [8, 'Sport Boys', 'Sport Huancayo', 3, 0],
  [9, 'Juan Pablo II', 'UTC', null, null], [9, 'Alianza Atlético', 'Atlético Grau', null, null], [9, 'FBC Melgar', 'Cusco FC', null, null], [9, 'Cienciano', 'ADT', null, null], [9, 'Deportivo Garcilaso', 'Sporting Cristal', null, null], [9, 'Sport Huancayo', 'Comerciantes Unidos', null, null], [9, 'Sport Boys', 'CD Moquegua', null, null], [9, 'Universitario', 'Alianza Lima', null, null], [9, 'FC Cajamarca', 'Los Chankas', null, null],
  [10, 'Cusco FC', 'FC Cajamarca', null, null], [10, 'ADT', 'Alianza Lima', null, null], [10, 'UTC', 'Sport Huancayo', null, null], [10, 'Atlético Grau', 'Sporting Cristal', null, null], [10, 'Universitario', 'Deportivo Garcilaso', null, null], [10, 'Los Chankas', 'Cienciano', null, null], [10, 'Sport Boys', 'FBC Melgar', null, null], [10, 'CD Moquegua', 'Juan Pablo II', null, null], [10, 'Comerciantes Unidos', 'Alianza Atlético', null, null],
  [11, 'Juan Pablo II', 'Comerciantes Unidos', null, null], [11, 'Alianza Atlético', 'Sport Boys', null, null], [11, 'FBC Melgar', 'Universitario', null, null], [11, 'Alianza Lima', 'Cusco FC', null, null], [11, 'Cienciano', 'CD Moquegua', null, null], [11, 'Sport Huancayo', 'Deportivo Garcilaso', null, null], [11, 'Sporting Cristal', 'UTC', null, null], [11, 'FC Cajamarca', 'ADT', null, null], [11, 'Los Chankas', 'Atlético Grau', null, null],
  [12, 'Cusco FC', 'Sport Huancayo', null, null], [12, 'ADT', 'Los Chankas', null, null], [12, 'UTC', 'Cienciano', null, null], [12, 'Deportivo Garcilaso', 'FBC Melgar', null, null], [12, 'Atlético Grau', 'Alianza Lima', null, null], [12, 'Universitario', 'Alianza Atlético', null, null], [12, 'Sport Boys', 'Juan Pablo II', null, null], [12, 'CD Moquegua', 'FC Cajamarca', null, null], [12, 'Comerciantes Unidos', 'Sporting Cristal', null, null],
  [13, 'Juan Pablo II', 'Universitario', null, null], [13, 'Alianza Atlético', 'Sport Huancayo', null, null], [13, 'ADT', 'Atlético Grau', null, null], [13, 'FBC Melgar', 'UTC', null, null], [13, 'Alianza Lima', 'CD Moquegua', null, null], [13, 'Cienciano', 'Comerciantes Unidos', null, null], [13, 'Sporting Cristal', 'Cusco FC', null, null], [13, 'FC Cajamarca', 'Sport Boys', null, null], [13, 'Los Chankas', 'Deportivo Garcilaso', null, null],
  [14, 'Cusco FC', 'Los Chankas', null, null], [14, 'UTC', 'FC Cajamarca', null, null], [14, 'Alianza Lima', 'Sporting Cristal', null, null], [14, 'Deportivo Garcilaso', 'Alianza Atlético', null, null], [14, 'Sport Huancayo', 'Juan Pablo II', null, null], [14, 'Atlético Grau', 'Cienciano', null, null], [14, 'Sport Boys', 'Universitario', null, null], [14, 'CD Moquegua', 'ADT', null, null], [14, 'Comerciantes Unidos', 'FBC Melgar', null, null],
  [15, 'Juan Pablo II', 'Alianza Atlético', null, null], [15, 'ADT', 'Comerciantes Unidos', null, null], [15, 'FBC Melgar', 'Sport Huancayo', null, null], [15, 'Cienciano', 'Alianza Lima', null, null], [15, 'Deportivo Garcilaso', 'UTC', null, null], [15, 'Universitario', 'Atlético Grau', null, null], [15, 'FC Cajamarca', 'Sporting Cristal', null, null], [15, 'Los Chankas', 'CD Moquegua', null, null], [15, 'Sport Boys', 'Cusco FC', null, null],
  [16, 'Cusco FC', 'Atlético Grau', null, null], [16, 'Juan Pablo II', 'FBC Melgar', null, null], [16, 'Alianza Atlético', 'FC Cajamarca', null, null], [16, 'UTC', 'Sport Boys', null, null], [16, 'Alianza Lima', 'Los Chankas', null, null], [16, 'Sport Huancayo', 'Cienciano', null, null], [16, 'Sporting Cristal', 'ADT', null, null], [16, 'CD Moquegua', 'Universitario', null, null], [16, 'Comerciantes Unidos', 'Deportivo Garcilaso', null, null],
  [17, 'ADT', 'Cusco FC', null, null], [17, 'FBC Melgar', 'Alianza Atlético', null, null], [17, 'Cienciano', 'Sporting Cristal', null, null], [17, 'Deportivo Garcilaso', 'Juan Pablo II', null, null], [17, 'Atlético Grau', 'CD Moquegua', null, null], [17, 'Universitario', 'Sport Huancayo', null, null], [17, 'FC Cajamarca', 'Alianza Lima', null, null], [17, 'Los Chankas', 'UTC', null, null], [17, 'Sport Boys', 'Comerciantes Unidos', null, null]
].map(p => ({ Fecha_Global: p[0], Torneo: 'Apertura', Local: p[1], Visitante: p[2], GL: p[3], GV: p[4] }));

const listaPartidos2018 = Array.isArray(partidosJSON) ? partidosJSON : (partidosJSON.BaseDatos || Object.values(partidosJSON)[0] || []);

export default function Home() {
  const [temporada, setTemporada] = useState('2026');
  const [fecha, setFecha] = useState(8); 
  const [tab, setTab] = useState('fixture');
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  
  // NUEVO: Estados para Modo Claro/Oscuro y Animaciones
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Efecto para animar el cambio de tabs
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [tab, equipoSeleccionado, temporada, fecha]);

  const listaPartidos = useMemo(() => {
    if (temporada === '2018') return listaPartidos2018;
    if (temporada === '2019') {
      // Retorna los datos de 2019 cuando existan. Por ahora, un array vacío para que no rompa.
      // const raw2019 = Array.isArray(partidos2019JSON) ? partidos2019JSON : [];
      const raw2019 = []; 
      return raw2019.map(p => ({ Fecha_Global: p[0], Torneo: 'Liga 1', Local: p[1], Visitante: p[2], GL: p[3], GV: p[4] }));
    }
    if (temporada === '2013') {
      const raw2013 = Array.isArray(partidos2013JSON) ? partidos2013JSON : [];
      return raw2013.map(p => {
        let gl = p[3]; let gv = p[4];
        if (p[0] === 5 && p[1] === 'Cusco (Garcilaso)' && p[2] === 'Leon de Huanuco') { gl = 0; gv = 3; }
        return { Fecha_Global: p[0], Torneo: 'Descentralizado', Local: p[1], Visitante: p[2], GL: gl, GV: gv };
      });
    }
    return partidos2026JSON;
  }, [temporada]);
  
  const logos = {
    'Alianza Lima': 'https://tmssl.akamaized.net//images/wappen/head/184.png?lm=1755275805',
    'Universitario': 'https://tmssl.akamaized.net//images/wappen/head/6593.png',
    'Sporting Cristal': 'https://tmssl.akamaized.net//images/wappen/head/21157.png',
    'FBC Melgar': 'https://tmssl.akamaized.net//images/wappen/head/2734.png',
    'Cienciano': 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4814.png',
    'Cusco FC': 'https://tmssl.akamaized.net//images/wappen/head/28999.png',
    'Cusco (Garcilaso)': 'https://images.seeklogo.com/logo-png/32/2/asociacion-civil-real-atletico-garcilaso-logo-png_seeklogo-328024.png',
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
    'Binacional': 'https://tmssl.akamaized.net//images/wappen/head/41054.png',
    'Leon de Huanuco': 'https://tmssl.akamaized.net//images/wappen/big/25774.png?lm=1424441686',
    'Pacifico FC': 'https://tmssl.akamaized.net//images/wappen/head/37579.png?lm=1749433973',
    'Jose Galvez': 'https://tmssl.akamaized.net//images/wappen/head/16700.png?lm=1699653454',
    'Juan Aurich': 'https://tmssl.akamaized.net//images/wappen/head/4576.png?lm=1435783099',
    'Cesar Vallejo': 'https://tmssl.akamaized.net//images/wappen/big/6889.png?lm=1435783460',
    'Pirata FC': 'https://tmssl.akamaized.net//images/wappen/head/69094.png' // Preparado para 2019
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

  const equipo_A_2018 = ['Sporting Cristal', 'Sport Rosario', 'UTC', 'U. San Martin', 'Alianza Lima', 'Comerciantes Unidos', 'Ayacucho FC', 'Universitario'];
  const equipo_B_2018 = ['Sport Huancayo', 'FBC Melgar', 'Cantolao', 'Dep. Municipal', 'Sport Boys', 'Cusco (Garcilaso)', 'Binacional', 'Union Comercio'];
  const liguillaA_2013 = ['Cusco (Garcilaso)', 'Sporting Cristal', 'Alianza Lima', 'Cesar Vallejo', 'Sport Huancayo', 'FBC Melgar', 'Pacifico FC', 'Union Comercio'];
  const liguillaB_2013 = ['Universitario', 'UTC', 'Ayacucho FC', 'Juan Aurich', 'Cienciano', 'Leon de Huanuco', 'U. San Martin', 'Jose Galvez'];

  const partidosValidos = useMemo(() => {
    return listaPartidos.filter(p => p.Fecha_Global <= fecha && p.GL !== null && p.GV !== null);
  }, [listaPartidos, fecha]);

  const partidosJugadosEquipo = useMemo(() => {
    if (!equipoSeleccionado) return [];
    return listaPartidos.filter(p => p.Fecha_Global <= fecha && p.GL !== null && (p.Local === equipoSeleccionado || p.Visitante === equipoSeleccionado)).sort((a, b) => b.Fecha_Global - a.Fecha_Global).slice(0, 5);
  }, [listaPartidos, equipoSeleccionado, fecha]);

  const proximosPartidosEquipo = useMemo(() => {
    if (!equipoSeleccionado) return [];
    return listaPartidos.filter(p => p.Fecha_Global > fecha && (p.Local === equipoSeleccionado || p.Visitante === equipoSeleccionado)).sort((a, b) => a.Fecha_Global - b.Fecha_Global).slice(0, 3);
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
      if (tabla[p.Local]) {
        tabla[p.Local].pj++; tabla[p.Local].gf += p.GL; tabla[p.Local].gc += p.GV;
        if (p.GL > p.GV) { tabla[p.Local].g++; tabla[p.Local].pts += 3; tabla[p.Local].racha.push('V'); }
        else if (p.GL < p.GV) { tabla[p.Local].p++; tabla[p.Local].racha.push('D'); } 
        else { tabla[p.Local].e++; tabla[p.Local].pts += 1; tabla[p.Local].racha.push('E'); } 
      }
      if (tabla[p.Visitante]) {
        tabla[p.Visitante].pj++; tabla[p.Visitante].gf += p.GV; tabla[p.Visitante].gc += p.GL;
        if (p.GV > p.GL) { tabla[p.Visitante].g++; tabla[p.Visitante].pts += 3; tabla[p.Visitante].racha.push('V'); }
        else if (p.GV < p.GL) { tabla[p.Visitante].p++; tabla[p.Visitante].racha.push('D'); } 
        else { tabla[p.Visitante].e++; tabla[p.Visitante].pts += 1; tabla[p.Visitante].racha.push('E'); } 
      }
    });

    return Object.values(tabla)
      .map(t => {
        let finalPts = t.pts;
        
        // REGLAS 2018
        if (temporada === '2018' && esAcumulado && fecha >= 44) {
          if (t.equipo === 'Sporting Cristal') finalPts += 2;
          if (t.equipo === 'Sport Rosario') finalPts -= 7;
          if (['Dep. Municipal', 'UTC', 'Cantolao'].includes(t.equipo)) finalPts -= 2;
          if (t.equipo === 'Universitario') finalPts -= 1;
        }
        
        // REGLAS 2013
        if (temporada === '2013') {
          if (esAcumulado && fecha >= 31) {
            if (t.equipo === 'U. San Martin') finalPts += 2; 
            if (t.equipo === 'Alianza Lima') finalPts += 1;  
          }
          if (fecha >= 5 && t.equipo === 'Cusco (Garcilaso)') finalPts -= 1;
        }

        // REGLAS 2019 (Listas para cuando subas el JSON)
        if (temporada === '2019') {
           // Aquí se aplican los descuentos exactos de Pirata FC y Deportivo Municipal.
           // Se ajustarán cuando carguemos los partidos, asegurando la colocación correcta de Municipal en el acumulado,
           // los 29 puntos exactos de César Vallejo, y que Sport Huancayo quede segundo por diferencia de goles.
           if (t.equipo === 'Dep. Municipal' && esAcumulado) {
               // finalPts -= puntos_castigo_muni;
           }
           if (t.equipo === 'Pirata FC' && esAcumulado) {
               // finalPts -= puntos_castigo_pirata;
           }
        }

        return { ...t, pts: finalPts, dif: t.gf - t.gc, ultimas: t.racha.slice(-5).reverse() };
      })
      .sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);
  };

  // PALETA DE COLORES DINÁMICA (Claro / Oscuro)
  const theme = {
    bgApp: isDarkMode ? 'bg-[#0b4026]' : 'bg-[#f0f4f2]',
    bgCard: isDarkMode ? 'bg-[#112d1e]' : 'bg-white',
    bgHeader: isDarkMode ? 'bg-[#0d2418]' : 'bg-[#e5eee9]',
    textMain: isDarkMode ? 'text-white' : 'text-[#0b4026]',
    textSub: isDarkMode ? 'text-[#a1b5a8]' : 'text-[#4b6b58]',
    border: isDarkMode ? 'border-[#1a4a2e]' : 'border-[#d1e0d7]',
    hoverRow: isDarkMode ? 'hover:bg-[#1c4531]' : 'hover:bg-[#f8fbf9]',
    rowAlt: isDarkMode ? 'bg-[#153625]' : 'bg-[#fcfdfc]',
  };

  const TablaComponent = ({ titulo, zona, datos, esAcumulado, compactLogo = false }) => (
    <div className={`${theme.bgCard} border ${theme.border} rounded-[10px] overflow-hidden shadow-lg mb-[15px] pb-1 transition-all duration-300`}>
      <div className={`text-center ${theme.textMain} font-bold text-[14px] uppercase py-[12px]`}>
        {titulo}
      </div>
      {zona && (
        <div className={`${theme.bgHeader} ${theme.textMain} px-[10px] py-[6px] font-bold text-[12px] border-b-[2px] ${theme.border} mx-[2px]`}>
          {zona}
        </div>
      )}
      {datos.length === 0 ? <div className={`text-center ${theme.textSub} p-3 text-[12px]`}>Sin datos registrados.</div> : (
        <table className="w-full text-[12px] text-center font-sans border-collapse mt-1">
          <thead>
            <tr>
              <th className={`${theme.bgHeader} ${theme.textSub} border-b ${theme.border} py-[8px] px-[4px] font-bold text-[11px] w-[30px]`}>#</th>
              <th className={`${theme.bgHeader} ${theme.textSub} border-b ${theme.border} py-[8px] px-[4px] font-bold text-[11px] text-left`}>Equipos</th>
              <th className={`${theme.bgHeader} ${theme.textSub} border-b ${theme.border} py-[8px] px-[4px] font-bold text-[11px]`}>PTS</th>
              <th className={`${theme.bgHeader} ${theme.textSub} border-b ${theme.border} py-[8px] px-[4px] font-bold text-[11px]`}>J</th>
              <th className={`${theme.bgHeader} ${theme.textSub} border-b ${theme.border} py-[8px] px-[4px] font-bold text-[11px]`}>Gol</th>
              <th className={`${theme.bgHeader} ${theme.textSub} border-b ${theme.border} py-[8px] px-[4px] font-bold text-[11px]`}>+/-</th>
              <th className={`${theme.bgHeader} ${theme.textSub} border-b ${theme.border} py-[8px] px-[4px] font-bold text-[11px]`}>G</th>
              <th className={`${theme.bgHeader} ${theme.textSub} border-b ${theme.border} py-[8px] px-[4px] font-bold text-[11px]`}>E</th>
              <th className={`${theme.bgHeader} ${theme.textSub} border-b ${theme.border} py-[8px] px-[4px] font-bold text-[11px]`}>P</th>
              <th className={`${theme.bgHeader} ${theme.textSub} border-b ${theme.border} py-[8px] px-[4px] font-bold text-[11px]`}>Últimas</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((eq, i) => {
              let bordeColor = 'transparent';
              
              if (temporada === '2018' && esAcumulado) {
                if (i < 4) bordeColor = '#3db4dc'; else if (i < 8) bordeColor = '#e1c340'; else if (i >= datos.length - 2) bordeColor = '#d32f2f'; 
              } else if (temporada === '2013' && esAcumulado && !zona) {
                if (i < 3) bordeColor = '#3db4dc'; else if (i >= 3 && i < 7) bordeColor = '#e1c340'; else if (i >= datos.length - 2) bordeColor = '#d32f2f'; 
              } else if (temporada === '2013' && esAcumulado && zona) {
                if (i === 0) bordeColor = '#3db4dc'; 
              } else if (i === 0) { bordeColor = '#3db4dc'; }

              return (
                <tr key={eq.equipo} className={`${theme.hoverRow} transition-colors ${i % 2 === 0 ? 'bg-transparent' : theme.rowAlt}`}>
                  <td className={`py-[8px] px-[4px] font-bold border-l-[4px] ${theme.textMain}`} style={{ borderLeftColor: bordeColor }}>{i + 1}</td>
                  <td className={`py-[8px] px-[4px] text-left font-bold flex items-center ${theme.textMain}`}>
                    <img src={logos[eq.equipo] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} 
                         style={{ width: compactLogo ? '13px' : '15px', height: compactLogo ? '13px' : '15px', minWidth: compactLogo ? '13px' : '15px', objectFit: 'contain', marginRight: '8px' }} 
                         alt={eq.equipo} />
                    <span>{eq.equipo}</span>
                  </td>
                  <td className={`py-[8px] px-[4px] font-black text-[13px] ${theme.textMain}`}>{eq.pts}</td>
                  <td className={`py-[8px] px-[4px] ${theme.textSub}`}>{eq.pj}</td>
                  <td className={`py-[8px] px-[4px] ${theme.textSub}`}>{eq.gf}:{eq.gc}</td>
                  <td className={`py-[8px] px-[4px] ${theme.textSub}`}>{eq.dif}</td>
                  <td className={`py-[8px] px-[4px] ${theme.textSub}`}>{eq.g}</td>
                  <td className={`py-[8px] px-[4px] ${theme.textSub}`}>{eq.e}</td>
                  <td className={`py-[8px] px-[4px] ${theme.textSub}`}>{eq.p}</td>
                  <td className="py-[8px] px-[4px]">
                    <div className="flex gap-[3px] justify-center">
                      {eq.ultimas.map((r, idx) => (
                        <span key={idx} className="inline-flex items-center justify-center text-white text-[9px] font-bold rounded-[3px] w-[14px] h-[14px]"
                              style={{ backgroundColor: r === 'V' ? '#8cc63f' : r === 'E' ? '#e1c340' : '#d32f2f' }}>{r}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {temporada === '2018' && esAcumulado && fecha >= 44 && (
        <div className={`text-[11px] ${theme.textSub} text-left mx-[10px] my-[10px] p-[5px] ${theme.bgHeader} rounded-[4px] border ${theme.border}`}>
          * Nota: Resoluciones FPF aplicadas en Acumulada 2018: Rosario (-7), Muni (-2), UTC (-2), Cantolao (-2), U (-1). Cristal (+2) por Reservas.
        </div>
      )}
      {temporada === '2013' && esAcumulado && fecha >= 44 && !zona && (
        <div className={`text-[11px] ${theme.textSub} text-left mx-[10px] my-[10px] p-[5px] ${theme.bgHeader} rounded-[4px] border ${theme.border}`}>
          * Nota (2013): Garcilaso y Universitario a Libertadores. El 3° a Libertadores. Del 4° al 7° a Sudamericana.
        </div>
      )}
    </div>
  );

  const ListaPartidosComponent = ({ titulo, partidos }) => (
    <div className={`${theme.bgCard} border ${theme.border} rounded-[10px] overflow-hidden shadow-lg mb-[15px] pb-1 transition-all duration-300`}>
      <div className={`text-center ${theme.textMain} font-bold text-[14px] uppercase py-[12px]`}>
        {titulo}
      </div>
      <div className="flex flex-col">
        {partidos.length === 0 ? (
          <div className={`text-center text-[12px] p-[15px] ${theme.textSub}`}>No hay partidos registrados.</div>
        ) : (
          partidos.map((p, idx) => (
            <div key={idx} className={`flex justify-between items-center py-[10px] px-[12px] border-t ${theme.border} ${theme.hoverRow} transition-colors ${idx % 2 === 0 ? 'bg-transparent' : theme.rowAlt}`}>
              <span className={`${theme.textSub} text-[10px] font-bold w-[35px]`}>F{p.Fecha_Global}</span>
              <div className="flex items-center w-[85%] justify-center">
                <span className={`text-right w-[40%] text-[12px] font-bold truncate ${theme.textMain}`}>{p.Local}</span>
                <img src={logos[p.Local] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '20px', height: '20px', minWidth: '20px', objectFit: 'contain', margin: '0 8px' }} />
                
                <div className="flex items-center justify-center gap-[4px] mx-[5px]">
                  {p.GL !== null && p.GV !== null ? (
                    <>
                      <div className={`${theme.bgHeader} border ${theme.border} rounded-[6px] font-bold text-[14px] w-[28px] h-[28px] flex items-center justify-center ${theme.textMain}`}>{p.GL}</div>
                      <div className="font-bold text-[14px] mx-[2px]" style={{ color: '#8cc63f' }}>-</div>
                      <div className={`${theme.bgHeader} border ${theme.border} rounded-[6px] font-bold text-[14px] w-[28px] h-[28px] flex items-center justify-center ${theme.textMain}`}>{p.GV}</div>
                    </>
                  ) : (
                    <div className="font-bold text-[12px] mx-[2px]" style={{ color: '#8cc63f' }}>VS</div>
                  )}
                </div>
                
                <img src={logos[p.Visitante] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '20px', height: '20px', minWidth: '20px', objectFit: 'contain', margin: '0 8px' }} />
                <span className={`text-left w-[40%] text-[12px] font-bold truncate ${theme.textMain}`}>{p.Visitante}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${theme.bgApp} font-sans selection:bg-[#8cc63f] selection:text-black transition-colors duration-500`}>
      
      {/* HEADER CON TU LOGO Y BOTÓN DE MODO CLARO/OSCURO */}
      <header className={`w-full px-[30px] py-[15px] ${isDarkMode ? 'bg-[#0b4026]' : 'bg-[#e5eee9]'} flex items-center justify-between shadow-md z-10 transition-colors duration-500`}>
        <img src="https://i.ibb.co/9kWMHzxY/Gemini-Generated-Image-oweh8loweh8loweh-removebg-preview.png" alt="Logo" className="h-[50px] w-auto block object-contain" />
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-full border ${theme.border} ${theme.bgCard} shadow-sm hover:scale-110 transition-transform cursor-pointer`}
          title="Cambiar tema"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </header>

      {/* TÍTULO */}
      <div className="pt-4 pb-2 relative">
        <h2 className={`text-center text-[26px] font-black m-0 flex flex-col items-center justify-center ${theme.textMain} tracking-wide`}>
          LIGA PROFESIONAL PERUANA {temporada}
        </h2>
        {temporada !== '2026' && (
          <div className="absolute right-4 top-4">
            <button onClick={() => { setTemporada('2026'); setFecha(8); setTab('fixture'); setEquipoSeleccionado(null); }}
              className={`${theme.bgCard} border-2 border-[#fbbf24] text-[#fbbf24] text-[11px] font-bold px-4 py-2 rounded-full hover:bg-[#fbbf24] hover:text-[#0b4026] transition-all shadow-lg cursor-pointer transform hover:-translate-y-1`}>
              ⬅️ VOLVER AL 2026
            </button>
          </div>
        )}
      </div>

      {/* MENÚ DE NAVEGACIÓN */}
      <nav className={`w-full mb-8 mt-4 border-b ${theme.border}`}>
        <div className="max-w-5xl mx-auto flex justify-center gap-4">
          {[{ id: 'fixture', label: 'FIXTURE Y TABLAS' }, { id: 'equipos', label: 'EQUIPOS Y ESTADISTICAS' }, { id: 'campeones', label: 'CAMPEONES' }].map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setEquipoSeleccionado(null); }} 
              className={`px-[25px] py-[14px] font-bold text-[13px] uppercase transition-all bg-transparent border-none outline-none cursor-pointer tracking-wider
                ${tab === t.id ? `${theme.textMain} border-b-[3px] border-[#fbbf24]` : `${theme.textSub} hover:${theme.textMain} border-b-[3px] border-transparent`}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENIDO DINÁMICO CON ANIMACIÓN FADE-IN */}
      <div className={`transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* FIXTURE Y TABLAS */}
        {tab === 'fixture' && (
          <main style={{ display: 'grid', gridTemplateColumns: '64% 34%', gap: '2%', maxWidth: '1250px', margin: '0 auto', padding: '0 20px 40px 20px', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              {temporada === '2018' && fecha <= 14 && (
                <>
                  <TablaComponent titulo="TORNEO DE VERANO" zona="ZONA A" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Verano'), equipo_A_2018)} />
                  <TablaComponent titulo="TORNEO DE VERANO" zona="ZONA B" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Verano'), equipo_B_2018)} />
                </>
              )}
              {temporada === '2018' && fecha > 14 && fecha <= 29 && (
                <TablaComponent titulo="TORNEO APERTURA" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Apertura' && p.Fecha_Global >= 15))} />
              )}
              {temporada === '2018' && fecha > 29 && (
                <TablaComponent titulo="TORNEO CLAUSURA" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Clausura' && p.Fecha_Global >= 30))} />
              )}
              {temporada === '2026' && fecha <= 17 && (
                <TablaComponent titulo="TORNEO APERTURA 2026" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Apertura'))} />
              )}

              {temporada === '2013' && fecha > 30 && fecha <= 44 ? (
                <>
                  <TablaComponent titulo="LIGUILLA A" zona="(Puntos Acumulados)" datos={generarTabla(partidosValidos, liguillaA_2013, true)} esAcumulado={true} />
                  <TablaComponent titulo="LIGUILLA B" zona="(Puntos Acumulados)" datos={generarTabla(partidosValidos, liguillaB_2013, true)} esAcumulado={true} />
                  <TablaComponent titulo="TABLA GENERAL ACUMULADA" datos={generarTabla(partidosValidos, null, true)} esAcumulado={true} />
                </>
              ) : (
                <TablaComponent 
                  titulo={fecha > (temporada === '2013' ? 44 : 44) ? "TABLA FINAL ACUMULADA" : `TABLA ACUMULADA (HASTA LA FECHA ${fecha})`} 
                  datos={generarTabla(temporada === '2013' && fecha > 44 ? listaPartidos.filter(p => p.Fecha_Global <= 44) : partidosValidos, null, true)} 
                  esAcumulado={true} 
                />
              )}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="flex flex-col gap-[12px]">
                <div className="text-center font-bold text-[15px] uppercase mb-[-5px]" style={{ color: '#8cc63f' }}>TEMPORADA {temporada}</div>
                
                <div className={`flex items-center justify-between bg-transparent border-2 border-[#8cc63f] rounded-[8px] px-2 py-1 shadow-sm`}>
                  <button onClick={() => setFecha(prev => Math.max(1, prev - 1))} className="text-[#8cc63f] hover:text-[#fbbf24] font-bold text-[16px] px-3 py-1 cursor-pointer transition-colors" disabled={fecha === 1}>◀</button>
                  <select value={fecha} onChange={(e) => setFecha(Number(e.target.value))} className={`w-full bg-transparent font-bold text-[14px] outline-none text-center cursor-pointer border-none ${theme.textMain}`}>
                    {[...Array(temporada === '2013' ? 48 : (temporada === '2018' ? 44 : 17))].map((_, i) => <option key={i+1} value={i+1} className={theme.bgCard}>FECHA {i+1}</option>)}
                  </select>
                  <button onClick={() => setFecha(prev => Math.min(temporada === '2013' ? 48 : (temporada === '2018' ? 44 : 17), prev + 1))} className="text-[#8cc63f] hover:text-[#fbbf24] font-bold text-[16px] px-3 py-1 cursor-pointer transition-colors" disabled={fecha === (temporada === '2013' ? 48 : (temporada === '2018' ? 44 : 17))}>▶</button>
                </div>

                <ListaPartidosComponent titulo={`Partidos Fecha ${fecha}`} partidos={listaPartidos.filter(p => p.Fecha_Global === fecha)} />
              </div>
            </div>
          </main>
        )}

        {/* EQUIPOS Y ESTADÍSTICAS */}
        {tab === 'equipos' && (
          <main className="max-w-[1250px] mx-auto p-4">
            {!equipoSeleccionado ? (
              <div className="max-w-5xl mx-auto">
                <h3 className={`text-center font-bold mb-2 uppercase tracking-widest text-[20px] ${theme.textMain}`}>EQUIPOS LIGA {temporada}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {Object.keys(logos).sort()
                    .filter(eq => {
                      if (temporada === '2026') return partidos2026JSON.some(p => p.Local === eq || p.Visitante === eq);
                      if (temporada === '2018') return equipo_A_2018.includes(eq) || equipo_B_2018.includes(eq);
                      if (temporada === '2013') return liguillaA_2013.includes(eq) || liguillaB_2013.includes(eq);
                      return true; 
                    }).map(eq => (
                      <button key={eq} onClick={() => setEquipoSeleccionado(eq)} 
                        className={`p-5 flex flex-col items-center justify-center ${theme.bgCard} border ${theme.border} rounded-[12px] ${theme.hoverRow} transition-all cursor-pointer shadow-md hover:-translate-y-1 hover:shadow-xl`}>
                        <img src={logos[eq]} style={{ width: '45px', height: '45px', objectFit: 'contain', marginBottom: '12px' }} alt={eq} />
                        <span className={`font-bold text-[13px] text-center uppercase leading-tight ${theme.textMain}`}>{eq}</span>
                      </button>
                    ))}
                </div>
              </div>
            ) : (
              <div>
                <button onClick={() => setEquipoSeleccionado(null)} className={`mb-6 ${theme.bgHeader} border ${theme.border} ${theme.textMain} text-[12px] font-bold px-4 py-2 rounded-lg hover:opacity-80 transition-opacity shadow-sm cursor-pointer`}>
                  ⬅️ VOLVER AL MURAL
                </button>
                <div className="text-center mb-8">
                  <img src={logos[equipoSeleccionado]} style={{ width: '80px', height: '80px', objectFit: 'contain', margin: '0 auto 15px auto', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.3))' }} />
                  <h2 className={`text-[24px] font-black uppercase tracking-wider ${theme.textMain}`}>{equipoSeleccionado}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '60% 35%', gap: '5%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <ListaPartidosComponent titulo="Últimos Resultados" partidos={partidosJugadosEquipo} />
                  </div>
                  <div>
                    <div className={`${theme.bgCard} border ${theme.border} rounded-[10px] p-5 sticky top-20 shadow-xl`}>
                      <div className={`text-center font-bold text-[15px] uppercase mb-[20px] ${theme.textMain}`}>INFO DEL CLUB</div>
                      <div className={`${theme.bgHeader} border ${theme.border} rounded-[8px] p-[12px] mb-[12px] flex justify-between text-[13px]`}><span className={`${theme.textSub} font-bold uppercase`}>Apodo</span><span className={`font-bold ${theme.textMain}`}>{info_clubes[equipoSeleccionado]?.Apodo || '-'}</span></div>
                      <div className={`${theme.bgHeader} border ${theme.border} rounded-[8px] p-[12px] flex flex-col text-[13px] text-center`}><span className={`${theme.textSub} font-bold uppercase mb-2`}>Estadio</span><span className="text-[#8cc63f] font-bold text-[14px]">{info_clubes[equipoSeleccionado]?.Estadio || 'Estadio Local'}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        )}

        {/* CAMPEONES */}
        {tab === 'campeones' && (
          <main style={{ display: 'grid', gridTemplateColumns: '60% 35%', gap: '5%', maxWidth: '1250px', margin: '0 auto', padding: '0 20px 40px 20px', alignItems: 'start' }}>
            <div className={`${theme.bgCard} border ${theme.border} rounded-[10px] shadow-lg overflow-hidden`}>
              <div className={`${theme.bgHeader} p-4 text-center border-b ${theme.border}`}><h3 className={`text-[15px] font-bold uppercase ${theme.textMain}`}>Historial de Campeones</h3></div>
              <table className="w-full text-[13px] border-collapse font-sans">
                <tbody>{historial_datos.map((row, i) => (
                  <tr key={i} className={`${theme.hoverRow} border-b ${theme.border} transition-colors ${i % 2 === 0 ? 'bg-transparent' : theme.rowAlt}`}>
                    <td className={`py-[14px] px-[15px] font-black ${theme.textMain} w-[80px]`}>{row.Año}</td>
                    <td className="py-[14px] px-[15px] text-left flex items-center justify-between">
                      <div className="flex items-center gap-3 font-bold">
                        <img src={logos[row.Campeón] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                        <span className={theme.textMain}>{row.Campeón}</span>
                      </div>
                      {['2018', '2013', '2019'].includes(row.Año) && (
                        <button onClick={() => { setTemporada(row.Año); setFecha(row.Año === '2013' ? 48 : 44); setTab('fixture'); window.scrollTo(0,0); }} className="bg-[#8cc63f] text-black font-bold text-[11px] px-4 py-1.5 rounded-full shadow-sm hover:bg-[#fbbf24] transition-colors cursor-pointer">VER AÑO</button>
                      )}
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </main>
        )}

      </div>
    </div>
  );
}

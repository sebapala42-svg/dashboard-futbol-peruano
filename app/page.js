'use client';
import React, { useState, useMemo } from 'react';
import partidosJSON from './torneo_2018.json';
import partidos2013JSON from './torneo_2013.json';
import partidos2023JSON from './torneo_2023.json';

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

const normalizarEquipo = (nombre) => {
  const alias = {
    'Melgar': 'FBC Melgar',
    'César Vallejo': 'Cesar Vallejo',
    'Cusco': 'Cusco FC',
    'Comercio': 'Union Comercio'
  };
  return alias[nombre] || nombre;
};

// ======================= MAPAS DE DATOS GLOBALES =======================
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
  'Municipal': 'https://tmssl.akamaized.net//images/wappen/head/17974.png', 
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
  'Carlos Mannucci': 'https://tmssl.akamaized.net//images/wappen/head/35587.png',
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

export default function Home() {
  
  // ======================= ESTADOS MAESTROS DE NAVEGACIÓN =======================
  // sidebarSeleccion controla el menú lateral: 'LIGA1' (2026) | '2023' | '2018' | '2013'
  const [sidebarSeleccion, setSidebarSeleccion] = useState('LIGA1'); 
  
  // topTab controla las pestañas de arriba (Solo funciona para la selección actual)
  // Puede ser: 'VIVO' | 'FIXTURE' | 'EQUIPOS' | 'HISTORIAL_CAMPEONES'
  const [topTab, setTopTab] = useState('VIVO'); 
  
  const [temporada, setTemporada] = useState('2026');
  const [fecha, setFecha] = useState(8); 
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

  // Estados del Menú Desplegable (Sidebar)
  const [menuPeruAbierto, setMenuPeruAbierto] = useState(true);
  const [menuCampeonesAbierto, setMenuCampeonesAbierto] = useState(false);

  // Estados del Panel "En Vivo" (Portada)
  const [filtroVivo, setFiltroVivo] = useState('TODOS');
  
  // ======================= FUNCIONES GLOBALES =======================
  const esWalkover = (p) => {
    if (temporada === '2023' && p.Torneo === 'Apertura' && p.Jornada_Oficial === 3) {
      return (p.Local === 'Cusco FC' && p.Visitante === 'Sport Huancayo') ||
             (p.Local === 'Atlético Grau' && p.Visitante === 'FBC Melgar') ||
             (p.Local === 'UTC' && p.Visitante === 'Cienciano') ||
             (p.Local === 'Deportivo Garcilaso' && p.Visitante === 'Binacional') ||
             (p.Local === 'Sporting Cristal' && p.Visitante === 'Alianza Lima') ||
             (p.Local === 'Municipal' && p.Visitante === 'Carlos Mannucci');
    }
    return false;
  };

  const esConcedido = (p) => {
    if (temporada === '2023' && p.Torneo === 'Clausura') {
      if (p.Jornada_Oficial === 22 && p.Local === 'Carlos Mannucci' && p.Visitante === 'Municipal') return true;
      if (p.Jornada_Oficial === 27 && p.Local === 'Municipal' && p.Visitante === 'Atlético Grau') return true;
    }
    return false;
  };

  const ganadorMesa = (p) => {
    if (esWalkover(p)) return p.GL === 3 ? p.Local : p.Visitante;
    if (esConcedido(p)) return p.Local === 'Municipal' ? p.Visitante : p.Local;
    return null;
  };

  // ======================= LÓGICA DE DATOS =======================
  const listaPartidos = useMemo(() => {
    if (temporada === '2018') return listaPartidos2018.map(p => ({ ...p, Jornada_Oficial: p.Fecha_Global, Local: normalizarEquipo(p.Local), Visitante: normalizarEquipo(p.Visitante) }));
    if (temporada === '2023') {
      const raw2023 = Array.isArray(partidos2023JSON) ? partidos2023JSON : [];
      const ordenCronologicoApertura = { 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 1: 8, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13, 15: 14, 2: 15, 16: 16, 17: 17, 18: 18, 19: 19 };
      return raw2023.map(p => {
        let jornadaOficial = p[0]; let torneo = p[5] || 'Apertura'; let fechaCronologica = jornadaOficial;
        if (torneo === 'Apertura' && ordenCronologicoApertura[jornadaOficial]) fechaCronologica = ordenCronologicoApertura[jornadaOficial];
        return { Jornada_Oficial: jornadaOficial, Fecha_Global: fechaCronologica, Torneo: torneo, Local: normalizarEquipo(p[1]), Visitante: normalizarEquipo(p[2]), GL: p[3], GV: p[4] };
      });
    }
    if (temporada === '2013') {
      const raw2013 = Array.isArray(partidos2013JSON) ? partidos2013JSON : [];
      return raw2013.map(p => {
        let gl = p[3]; let gv = p[4];
        if (p[0] === 5 && p[1] === 'Cusco (Garcilaso)' && p[2] === 'Leon de Huanuco') { gl = 0; gv = 3; }
        return { Fecha_Global: p[0], Jornada_Oficial: p[0], Torneo: 'Descentralizado', Local: normalizarEquipo(p[1]), Visitante: normalizarEquipo(p[2]), GL: gl, GV: gv };
      });
    }
    return partidos2026JSON.map(p => ({ ...p, Jornada_Oficial: p.Fecha_Global, Local: normalizarEquipo(p.Local), Visitante: normalizarEquipo(p.Visitante) }));
  }, [temporada]);
  
  const partidosValidos = useMemo(() => {
    return listaPartidos.filter(p => p.Fecha_Global <= fecha && p.Torneo !== 'Final');
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
    const tabla = {}; let equiposActuales = listaFiltro;
    if (!equiposActuales) { const setEquipos = new Set(); partidos.forEach(p => { setEquipos.add(p.Local); setEquipos.add(p.Visitante); }); equiposActuales = Array.from(setEquipos); }
    equiposActuales.forEach(eq => tabla[eq] = { equipo: eq, pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0, racha: [] });

    partidos.forEach(p => {
      let isConcedidoMatch = esConcedido(p);
      if ((p.GL === null || p.GV === null) && !isConcedidoMatch) return; 

      let gl = p.GL !== null ? p.GL : 0; let gv = p.GV !== null ? p.GV : 0;
      let ptsLocal = 0; let ptsVisita = 0; let rLocal = ''; let rVisita = '';

      if (isConcedidoMatch) {
        if (p.Local === 'Municipal') { ptsLocal = 0; ptsVisita = 3; rLocal = 'D'; rVisita = 'V'; } 
        else { ptsLocal = 3; ptsVisita = 0; rLocal = 'V'; rVisita = 'D'; }
        gl = 0; gv = 0; 
      } else {
        if (gl > gv) { ptsLocal = 3; rLocal = 'V'; rVisita = 'D'; } 
        else if (gl < gv) { ptsVisita = 3; rVisita = 'V'; rLocal = 'D'; } 
        else { ptsLocal = 1; ptsVisita = 1; rLocal = 'E'; rVisita = 'E'; }
      }

      if (tabla[p.Local]) {
        tabla[p.Local].pj++; tabla[p.Local].gf += gl; tabla[p.Local].gc += gv; tabla[p.Local].pts += ptsLocal;
        if (rLocal === 'V') tabla[p.Local].g++; else if (rLocal === 'D') tabla[p.Local].p++; else tabla[p.Local].e++;
        tabla[p.Local].racha.push(rLocal);
      }
      if (tabla[p.Visitante]) {
        tabla[p.Visitante].pj++; tabla[p.Visitante].gf += gv; tabla[p.Visitante].gc += gl; tabla[p.Visitante].pts += ptsVisita;
        if (rVisita === 'V') tabla[p.Visitante].g++; else if (rVisita === 'D') tabla[p.Visitante].p++; else tabla[p.Visitante].e++;
        tabla[p.Visitante].racha.push(rVisita);
      }
    });

    return Object.values(tabla)
      .map(t => {
        let finalPts = t.pts;
        if (temporada === '2018' && esAcumulado && fecha >= 44) {
          if (t.equipo === 'Sporting Cristal') finalPts += 2; if (t.equipo === 'Sport Rosario') finalPts -= 7;
          if (['Dep. Municipal', 'UTC', 'Cantolao'].includes(t.equipo)) finalPts -= 2; if (t.equipo === 'Universitario') finalPts -= 1;
        }
        if (temporada === '2013') {
          if (esAcumulado && fecha >= 31) { if (t.equipo === 'U. San Martin') finalPts += 2; if (t.equipo === 'Alianza Lima') finalPts += 1; }
          if (fecha >= 5 && t.equipo === 'Cusco (Garcilaso)') { finalPts -= 1; }
        }
        if (temporada === '2023' && esAcumulado && fecha >= 38) {
          if (t.equipo === 'Deportivo Garcilaso') finalPts -= 1; if (t.equipo === 'Sport Boys') finalPts -= 4;
          if (t.equipo === 'Municipal' || t.equipo === 'Dep. Municipal') finalPts -= 5;
        }
        return { ...t, pts: finalPts, dif: t.gf - t.gc, ultimas: t.racha.slice(-5).reverse() };
      })
      .sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);
  };

  // ======================= COMPONENTES UI =======================
  const TablaComponent = ({ titulo, zona, datos, esAcumulado, compactLogo = false }) => (
    <div className="bg-white border border-[#d1e0d7] rounded-[8px] overflow-hidden shadow-sm mb-[15px] pb-1">
      <div className="text-center font-bold text-[14px] uppercase py-[10px] bg-white border-b border-[#d1e0d7]" style={{ color: '#112a1f' }}>
        {titulo}
      </div>
      {zona && (
        <div className="bg-[#f8fbf9] px-[10px] py-[6px] font-bold text-[12px] border-b-[2px] border-[#d1e0d7] mx-[2px] text-[#6b7280]">
          {zona}
        </div>
      )}
      {datos.length === 0 ? <div className="text-center text-[#6b7280] p-3 text-[12px]">Sin datos para esta fecha.</div> : (
        <table className="w-full text-[12px] font-sans border-collapse mt-1">
          <thead>
            <tr>
              <th className="bg-white border-b border-[#d1e0d7] py-[8px] px-[4px] font-bold text-[11px] w-[30px] text-center text-[#6b7280]">#</th>
              <th className="bg-white border-b border-r border-[#d1e0d7] py-[8px] px-[4px] font-bold text-[11px] text-left text-[#6b7280]">Equipos</th>
              <th className="bg-[#f8fbf9] border-b border-r border-[#d1e0d7] py-[8px] px-[4px] font-bold text-[11px] text-center text-[#112a1f]">PTS</th>
              <th className="bg-white border-b border-[#d1e0d7] py-[8px] px-[4px] font-normal text-[11px] text-center text-[#6b7280]">J</th>
              <th className="bg-white border-b border-[#d1e0d7] py-[8px] px-[4px] font-normal text-[11px] text-center text-[#6b7280]">Gol</th>
              <th className="bg-white border-b border-[#d1e0d7] py-[8px] px-[4px] font-normal text-[11px] text-center text-[#6b7280]">+/-</th>
              <th className="bg-white border-b border-[#d1e0d7] py-[8px] px-[4px] font-normal text-[11px] text-center text-[#6b7280]">G</th>
              <th className="bg-white border-b border-[#d1e0d7] py-[8px] px-[4px] font-normal text-[11px] text-center text-[#6b7280]">E</th>
              <th className="bg-white border-b border-[#d1e0d7] py-[8px] px-[4px] font-normal text-[11px] text-center text-[#6b7280]">P</th>
              <th className="bg-white border-b border-[#d1e0d7] py-[8px] px-[4px] font-normal text-[11px] text-center text-[#6b7280]">Últimas</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((eq, i) => {
              let bordeColor = 'transparent';
              if (temporada === '2018' && esAcumulado) {
                if (i < 4) bordeColor = '#8cc63f'; else if (i < 8) bordeColor = '#fbbf24'; else if (i >= datos.length - 2) bordeColor = '#ef4444'; 
              } else if (temporada === '2013' && esAcumulado && !zona) {
                if (i < 3) bordeColor = '#8cc63f'; else if (i >= 3 && i < 7) bordeColor = '#fbbf24'; else if (i >= datos.length - 2) bordeColor = '#ef4444'; 
              } else if (temporada === '2013' && esAcumulado && zona) {
                if (i === 0) bordeColor = '#8cc63f'; 
              } else if (temporada === '2023' && esAcumulado) {
                if (i < 4) bordeColor = '#8cc63f'; else if (i >= 4 && i < 8) bordeColor = '#fbbf24'; else if (i >= datos.length - 3) bordeColor = '#ef4444'; 
              } else if (i === 0) {
                bordeColor = '#8cc63f';
              }

              return (
                <tr key={eq.equipo} className={`hover:bg-[#f8fbf9] transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-[#fdfdfd]'}`}>
                  <td className="py-[6px] px-[4px] font-bold border-l-[3px] text-center text-[#6b7280]" style={{ borderLeftColor: bordeColor }}>{i + 1}</td>
                  <td className="py-[6px] px-[4px] border-r border-[#d1e0d7]">
                    <div className="flex items-center text-left font-bold text-[#112a1f]">
                      <img src={logos[eq.equipo] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} 
                           style={{ width: compactLogo ? '13px' : '15px', height: compactLogo ? '13px' : '15px', minWidth: compactLogo ? '13px' : '15px', objectFit: 'contain', marginRight: '6px' }} 
                           alt={eq.equipo} />
                      <span className="truncate">{eq.equipo}</span>
                    </div>
                  </td>
                  <td className="py-[6px] px-[4px] font-black text-[13px] text-center border-r border-[#d1e0d7] text-[#112a1f] bg-[#f8fbf9]">{eq.pts}</td>
                  <td className="py-[6px] px-[4px] text-center font-normal text-[#6b7280]">{eq.pj}</td>
                  <td className="py-[6px] px-[4px] text-center font-normal text-[#6b7280]">{eq.gf}:{eq.gc}</td>
                  <td className="py-[6px] px-[4px] text-center font-normal text-[#6b7280]">{eq.dif}</td>
                  <td className="py-[6px] px-[4px] text-center font-normal text-[#6b7280]">{eq.g}</td>
                  <td className="py-[6px] px-[4px] text-center font-normal text-[#6b7280]">{eq.e}</td>
                  <td className="py-[6px] px-[4px] text-center font-normal text-[#6b7280]">{eq.p}</td>
                  <td className="py-[6px] px-[4px] text-center">
                    <div className="flex gap-[2px] justify-center">
                      {eq.ultimas.map((r, idx) => (
                        <span key={idx} className="inline-flex items-center justify-center text-white text-[8.5px] font-bold rounded-[2px] px-[4px] py-[1px]"
                              style={{ backgroundColor: r === 'V' ? '#8cc63f' : r === 'E' ? '#fbbf24' : '#ef4444' }}>
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
      )}
    </div>
  );

  const ListaPartidosComponent = ({ titulo, partidos }) => (
    <div className="bg-white border border-[#d1e0d7] rounded-[8px] overflow-hidden shadow-sm mb-[15px] pb-1">
      <div className="text-center font-bold text-[14px] uppercase py-[10px] text-[#112a1f] border-b border-[#d1e0d7]">
        {titulo}
      </div>
      <div className="flex flex-col">
        {partidos.length === 0 ? (
          <div className="text-center text-[12px] p-[15px] text-[#6b7280]">No hay partidos registrados.</div>
        ) : (
          partidos.map((p, idx) => {
            const esWO = esWalkover(p); const esConc = esConcedido(p); const teamGanador = ganadorMesa(p);
            return (
              <div key={idx} className={`flex justify-between items-center py-[8px] px-[10px] border-b border-[#f0f4f2] hover:bg-[#f8fbf9] transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-[#fdfdfd]'}`}>
                <div className="flex flex-col justify-center items-center w-[35px]">
                  <span className="text-[10px] font-bold text-[#6b7280]">
                    {temporada === '2023' && (p.Torneo === 'Clausura' || p.Torneo === 'Final') 
                      ? (p.Torneo === 'Final' ? 'FINAL' : `F${p.Jornada_Oficial - 19}`)
                      : (p.Jornada_Oficial ? `F${p.Jornada_Oficial}` : `F${p.Fecha_Global}`)}
                  </span>
                </div>
                <div className="flex items-center w-[85%] justify-center">
                  <span className={`text-right w-[40%] text-[12px] font-bold truncate ${teamGanador === p.Local ? 'text-[#8cc63f]' : 'text-[#112a1f]'}`}>{p.Local}</span>
                  <img src={logos[p.Local] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '18px', height: '18px', minWidth: '18px', objectFit: 'contain', margin: '0 5px' }} />
                  
                  <div className="flex items-center justify-center gap-[2px] mx-[5px] min-w-[65px]">
                    {esWO ? ( <div className="text-[#ef4444] text-[9px] font-black w-[45px] text-center leading-[10px]">WALK<br/>OVER</div>
                    ) : esConc ? ( <div className="text-[#ef4444] text-[9px] font-black w-[45px] text-center leading-[10px]">CONCE<br/>DIDO</div>
                    ) : p.GL !== null && p.GV !== null ? (
                      <>
                        <div className="bg-[#f0f4f2] border border-[#d1e0d7] rounded-[4px] font-bold text-[14px] w-[25px] h-[25px] flex items-center justify-center text-[#112a1f]">{p.GL}</div>
                        <div className="font-bold text-[14px] mx-[2px] text-[#8cc63f]">-</div>
                        <div className="bg-[#f0f4f2] border border-[#d1e0d7] rounded-[4px] font-bold text-[14px] w-[25px] h-[25px] flex items-center justify-center text-[#112a1f]">{p.GV}</div>
                      </>
                    ) : ( <div className="font-bold text-[12px] mx-[2px] text-[#8cc63f]">VS</div> )}
                  </div>
                  
                  <img src={logos[p.Visitante] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '18px', height: '18px', minWidth: '18px', objectFit: 'contain', margin: '0 5px' }} />
                  <span className={`text-left w-[40%] text-[12px] font-bold truncate ${teamGanador === p.Visitante ? 'text-[#8cc63f]' : 'text-[#112a1f]'}`}>{p.Visitante}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f0f4f2] font-sans overflow-hidden selection:bg-[#8cc63f] selection:text-white">
      
      {/* ======================= SIDEBAR (IZQUIERDO - LIGHT THEME) ======================= */}
      <aside className="w-[250px] bg-white border-r border-[#d1e0d7] flex-shrink-0 h-screen sticky top-0 overflow-y-auto hidden md:flex flex-col shadow-sm z-20 custom-scrollbar">
        
        {/* Encabezado Logo */}
        <div className="p-5 flex items-center justify-center border-b border-[#d1e0d7]">
          <img src="https://i.ibb.co/9kWMHzxY/Gemini-Generated-Image-oweh8loweh8loweh-removebg-preview.png" alt="Logo" className="h-[55px] object-contain drop-shadow-sm" />
        </div>
        
        {/* Menú de Navegación */}
        <div className="flex-1 py-4 flex flex-col">
          
          <div className="px-4 mb-2 text-[10px] font-black text-[#8cc63f] uppercase tracking-widest">Navegación</div>

          {/* Menú PERÚ (Desplegable) */}
          <div className="px-2">
            <button onClick={() => setMenuPeruAbierto(!menuPeruAbierto)} className="w-full flex items-center justify-between bg-[#f8fbf9] hover:bg-[#e5eee9] text-[#112a1f] py-2 px-3 rounded-md font-bold text-[13px] transition-colors outline-none border border-[#d1e0d7]">
              <div className="flex items-center gap-2">
                <img src="https://tmssl.akamaized.net//images/holding/head/pe.png" className="w-[16px] drop-shadow-sm" /> PERÚ
              </div>
              <span className="text-[10px] text-[#6b7280]">{menuPeruAbierto ? '▲' : '▼'}</span>
            </button>

            {menuPeruAbierto && (
              <div className="flex flex-col mt-2 gap-1 px-1">
                <button
                  onClick={() => { setSidebarSeleccion('LIGA1'); setTemporada('2026'); setFecha(8); setTopTab('VIVO'); }}
                  className={`w-full flex items-center gap-2 px-4 py-2 text-[12px] font-bold rounded-md transition-all outline-none ${sidebarSeleccion === 'LIGA1' ? 'bg-[#e5eee9] border-l-[4px] border-[#8cc63f] text-[#112a1f] shadow-sm' : 'text-[#6b7280] hover:bg-[#f8fbf9] hover:text-[#112a1f] border-l-[4px] border-transparent'}`}
                >
                  Liga 1 Te Apuesto
                </button>

                <button onClick={() => setMenuCampeonesAbierto(!menuCampeonesAbierto)} className={`w-full flex items-center justify-between px-4 py-2 text-[12px] font-bold rounded-md transition-all outline-none ${['2023','2018','2013'].includes(sidebarSeleccion) ? 'bg-[#e5eee9] text-[#112a1f]' : 'text-[#6b7280] hover:bg-[#f8fbf9]'}`}>
                  <span>Archivo Histórico</span>
                  <span className="text-[10px]">{menuCampeonesAbierto ? '▲' : '▼'}</span>
                </button>

                {menuCampeonesAbierto && (
                  <div className="flex flex-col pl-4 mt-1 border-l-2 border-[#d1e0d7] ml-4 gap-1">
                    <button onClick={() => { setSidebarSeleccion('2023'); setTemporada('2023'); setFecha(38); setTopTab('FIXTURE'); }} className={`text-left pl-3 py-1.5 text-[11px] font-bold rounded transition-colors outline-none ${sidebarSeleccion === '2023' ? 'text-[#8cc63f] bg-[#f8fbf9]' : 'text-[#6b7280] hover:text-[#112a1f]'}`}>2023 (Universitario)</button>
                    <button onClick={() => { setSidebarSeleccion('2018'); setTemporada('2018'); setFecha(44); setTopTab('FIXTURE'); }} className={`text-left pl-3 py-1.5 text-[11px] font-bold rounded transition-colors outline-none ${sidebarSeleccion === '2018' ? 'text-[#8cc63f] bg-[#f8fbf9]' : 'text-[#6b7280] hover:text-[#112a1f]'}`}>2018 (Sporting Cristal)</button>
                    <button onClick={() => { setSidebarSeleccion('2013'); setTemporada('2013'); setFecha(44); setTopTab('FIXTURE'); }} className={`text-left pl-3 py-1.5 text-[11px] font-bold rounded transition-colors outline-none ${sidebarSeleccion === '2013' ? 'text-[#8cc63f] bg-[#f8fbf9]' : 'text-[#6b7280] hover:text-[#112a1f]'}`}>2013 (Universitario)</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ======================= PANEL PRINCIPAL (DERECHA) ======================= */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto w-full relative">
        
        {/* Header Superior y Pestañas (Sub-Navegación) */}
        <header className="w-full bg-white shadow-sm border-b border-[#d1e0d7] sticky top-0 z-10">
          <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-[22px] font-black uppercase text-[#112a1f] m-0 flex items-center gap-2">
                <span className="bg-[#8cc63f] w-[4px] h-[22px] rounded-full"></span>
                {sidebarSeleccion === 'LIGA1' ? 'LIGA 1 TE APUESTO 2026' : `TORNEO HISTÓRICO ${temporada}`}
              </h2>
            </div>
            
            {/* Tabs estilo botones integrados en el header */}
            <div className="flex bg-[#f0f4f2] rounded-lg p-1 border border-[#d1e0d7]">
              {sidebarSeleccion === 'LIGA1' && (
                <button onClick={() => {setTopTab('VIVO'); setEquipoSeleccionado(null);}} className={`px-4 py-2 text-[11px] font-bold rounded-md transition-all outline-none ${topTab === 'VIVO' ? 'bg-white text-[#112a1f] shadow-sm border border-[#d1e0d7]' : 'text-[#6b7280] hover:text-[#112a1f]'}`}>EN VIVO</button>
              )}
              <button onClick={() => {setTopTab('FIXTURE'); setEquipoSeleccionado(null);}} className={`px-4 py-2 text-[11px] font-bold rounded-md transition-all outline-none ${topTab === 'FIXTURE' ? 'bg-white text-[#112a1f] shadow-sm border border-[#d1e0d7]' : 'text-[#6b7280] hover:text-[#112a1f]'}`}>FIXTURE Y TABLAS</button>
              <button onClick={() => setTopTab('EQUIPOS')} className={`px-4 py-2 text-[11px] font-bold rounded-md transition-all outline-none ${topTab === 'EQUIPOS' ? 'bg-white text-[#112a1f] shadow-sm border border-[#d1e0d7]' : 'text-[#6b7280] hover:text-[#112a1f]'}`}>EQUIPOS</button>
              {sidebarSeleccion === 'LIGA1' && (
                <button onClick={() => {setTopTab('HISTORIAL_CAMPEONES'); setEquipoSeleccionado(null);}} className={`px-4 py-2 text-[11px] font-bold rounded-md transition-all outline-none ${topTab === 'HISTORIAL_CAMPEONES' ? 'bg-white text-[#112a1f] shadow-sm border border-[#d1e0d7]' : 'text-[#6b7280] hover:text-[#112a1f]'}`}>RANKING</button>
              )}
            </div>
          </div>
        </header>

        {/* Contenedor del contenido */}
        <div className="w-full max-w-[1200px] mx-auto p-4 md:p-6 pb-20">
          
          {/* ==================== VISTA: EN VIVO (MOCK 2026 - ESTILO PROMIEDOS LIGHT) ==================== */}
          {topTab === 'VIVO' && sidebarSeleccion === 'LIGA1' && (
            <div className="max-w-[900px] mx-auto fade-in">
              {/* Falso dropdown "PARTIDOS DE HOY" */}
              <div className="bg-white rounded-t-lg border border-[#d1e0d7] flex items-center justify-between p-3">
                 <button className="text-[#6b7280] hover:text-[#8cc63f] font-bold px-3 transition-colors text-lg outline-none">{'<'}</button>
                 <button className="font-black text-[14px] text-[#112a1f] tracking-wide uppercase hover:text-[#8cc63f] transition-colors outline-none flex items-center gap-2">
                   PARTIDOS DE HOY <span className="text-[10px]">▼</span>
                 </button>
                 <button className="text-[#6b7280] hover:text-[#8cc63f] font-bold px-3 transition-colors text-lg outline-none">{'>'}</button>
              </div>

              {/* Filtros TODOS / VIVO */}
              <div className="bg-white px-4 flex items-center gap-6 border-b border-x border-[#d1e0d7]">
                 <button onClick={()=>setFiltroVivo('TODOS')} className={`py-3 text-[11px] font-bold outline-none uppercase transition-colors ${filtroVivo === 'TODOS' ? 'text-[#8cc63f] border-b-2 border-[#8cc63f]' : 'text-[#6b7280] hover:text-[#112a1f]'}`}>TODOS</button>
                 <button onClick={()=>setFiltroVivo('VIVO')} className={`py-3 text-[11px] font-bold outline-none uppercase transition-colors flex items-center gap-1 ${filtroVivo === 'VIVO' ? 'text-[#8cc63f] border-b-2 border-[#8cc63f]' : 'text-[#6b7280] hover:text-[#112a1f]'}`}>
                   VIVO <span className="bg-[#e5eee9] text-[#112a1f] px-1.5 py-0.5 rounded-full text-[9px] border border-[#d1e0d7]">0</span>
                 </button>
              </div>

              {/* Bloque Competición LIGA 1 */}
              <div className="bg-[#f8fbf9] px-3 py-2.5 mt-4 flex items-center justify-between text-[#112a1f] text-[11px] font-black uppercase rounded-t-md shadow-sm border border-[#d1e0d7]">
                  <div className="flex items-center gap-2 tracking-wide">
                      <img src="https://tmssl.akamaized.net//images/holding/head/pe.png" className="w-[14px] drop-shadow-sm"/> LIGA 1 TE APUESTO
                  </div>
              </div>

              {/* Lista de partidos (Simulando Fecha 8 de 2026) */}
              <div className="bg-white flex flex-col rounded-b-md overflow-hidden shadow-sm border border-[#d1e0d7] border-t-0">
                  {listaPartidos.filter(p => p.Fecha_Global === 8).map((m, idx) => {
                     const ganador = m.GL > m.GV ? m.Local : (m.GL < m.GV ? m.Visitante : null);
                     const estadoMock = m.GL !== null ? 'Final' : '15:30'; // Solo para visual mock
                     
                     return (
                       <div key={idx} className={`flex border-t border-[#f0f4f2] text-[#112a1f] hover:bg-[#f8fbf9] transition-colors cursor-default ${idx===0 ? 'border-t-0' : ''}`}>
                          <div className="w-[60px] flex flex-col items-center justify-center border-r border-[#f0f4f2] py-3 px-1">
                             <span className={`text-[11px] font-black ${estadoMock === 'EN VIVO' ? 'text-[#ef4444] animate-pulse' : 'text-[#6b7280]'}`}>{estadoMock}</span>
                          </div>
                          <div className="flex-1 flex flex-col justify-center p-3">
                              <div className="flex justify-center items-center gap-3 md:gap-6">
                                  <span className={`text-right w-[40%] text-[13px] font-bold truncate ${ganador === m.Local ? 'text-[#8cc63f]' : 'text-[#112a1f]'}`}>{m.Local}</span>
                                  <img src={logos[m.Local]} className="w-6 h-6 object-contain drop-shadow-sm"/>
                                  
                                  {m.GL !== null ? (
                                    <div className="flex items-center gap-1 min-w-[55px] justify-center">
                                      <span className="font-bold text-[15px] bg-[#f0f4f2] text-[#112a1f] px-2 py-0.5 rounded border border-[#d1e0d7] shadow-inner">{m.GL}</span>
                                      <span className="font-black text-[#8cc63f]">-</span>
                                      <span className="font-bold text-[15px] bg-[#f0f4f2] text-[#112a1f] px-2 py-0.5 rounded border border-[#d1e0d7] shadow-inner">{m.GV}</span>
                                    </div>
                                  ) : (
                                    <span className="font-bold text-[12px] bg-[#f0f4f2] px-2 py-[2px] rounded border border-[#d1e0d7] min-w-[55px] text-center text-[#8cc63f]">VS</span>
                                  )}
                                  
                                  <img src={logos[m.Visitante]} className="w-6 h-6 object-contain drop-shadow-sm"/>
                                  <span className={`text-left w-[40%] text-[13px] font-bold truncate ${ganador === m.Visitante ? 'text-[#8cc63f]' : 'text-[#112a1f]'}`}>{m.Visitante}</span>
                              </div>
                          </div>
                       </div>
                     );
                  })}
              </div>
            </div>
          )}

          {/* ==================== VISTA: FIXTURE Y TABLAS ==================== */}
          {topTab === 'FIXTURE' && (
            <div className="fade-in">
              <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2 mb-6 shadow-sm border border-[#d1e0d7] max-w-[500px] mx-auto">
                <button onClick={() => setFecha(prev => Math.max(1, prev - 1))} className="text-[#8cc63f] hover:text-[#112a1f] font-black text-[18px] px-3 outline-none disabled:opacity-30 disabled:cursor-not-allowed transition-colors" disabled={fecha === 1}>◀</button>
                <select value={fecha} onChange={(e) => setFecha(Number(e.target.value))} className="w-full bg-transparent text-[#112a1f] font-bold text-[14px] outline-none text-center cursor-pointer uppercase tracking-wider">
                  {[...Array(temporada === '2023' ? 40 : (temporada === '2013' ? 48 : (temporada === '2018' ? 44 : 17)))].map((_, i) => {
                    let etiqueta = `FECHA ${i+1}`;
                    if (temporada === '2023') {
                        if (i < 19) {
                          const nombres = {1:'J. 3', 2:'J. 4', 3:'J. 5', 4:'J. 6', 5:'J. 7', 6:'J. 8', 7:'J. 9', 8:'J. 1 (Aplaz)', 9:'J. 10', 10:'J. 11', 11:'J. 12', 12:'J. 13', 13:'J. 14', 14:'J. 15', 15:'J. 2 (Aplaz)', 16:'J. 16', 17:'J. 17', 18:'J. 18', 19:'J. 19'};
                          etiqueta = `Semana ${i+1} (${nombres[i+1]})`;
                        } else if (i < 38) { etiqueta = `CLAUSURA F${i-18}`; } else if (i === 38) { etiqueta = `FINAL (IDA)`; } else if (i === 39) { etiqueta = `FINAL (VUELTA)`; }
                    }
                    return <option key={i+1} value={i+1} className="font-semibold">{etiqueta}</option>
                  })}
                </select>
                <button onClick={() => setFecha(prev => Math.min(temporada === '2023' ? 40 : (temporada === '2013' ? 48 : (temporada === '2018' ? 44 : 17)), prev + 1))} className="text-[#8cc63f] hover:text-[#112a1f] font-black text-[18px] px-3 outline-none disabled:opacity-30 disabled:cursor-not-allowed transition-colors">▶</button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[64%_34%] gap-6 items-start">
                <div className="flex flex-col gap-5">
                  {temporada === '2026' && fecha <= 17 && (<TablaComponent titulo="TORNEO APERTURA 2026" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Apertura'))} />)}
                  {temporada === '2023' && fecha <= 19 && (<TablaComponent titulo="TORNEO APERTURA 2023" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Apertura'))} />)}
                  {temporada === '2023' && fecha > 19 && fecha <= 38 && (<TablaComponent titulo="TORNEO CLAUSURA 2023" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Clausura'))} />)}
                  {temporada === '2023' && (<TablaComponent titulo={`TABLA ACUMULADA (SEMANA ${Math.min(fecha, 38)})`} datos={generarTabla(partidosValidos.filter(p => p.Fecha_Global <= 38), null, true)} esAcumulado={true} />)}
                  {temporada === '2018' && fecha <= 14 && (<><TablaComponent titulo="TORNEO DE VERANO" zona="ZONA A" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Verano'), equipo_A_2018)} /><TablaComponent titulo="TORNEO DE VERANO" zona="ZONA B" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Verano'), equipo_B_2018)} /></>)}
                  {temporada === '2018' && fecha > 14 && fecha <= 29 && (<TablaComponent titulo="TORNEO APERTURA" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Apertura' && p.Fecha_Global >= 15))} />)}
                  {temporada === '2018' && fecha > 29 && (<TablaComponent titulo="TORNEO CLAUSURA" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Clausura' && p.Fecha_Global >= 30))} />)}
                  {temporada === '2013' && fecha > 30 && fecha <= 44 ? (<><TablaComponent titulo="LIGUILLA A" zona="(Acumulado)" datos={generarTabla(partidosValidos, liguillaA_2013, true)} esAcumulado={true} /><TablaComponent titulo="LIGUILLA B" zona="(Acumulado)" datos={generarTabla(partidosValidos, liguillaB_2013, true)} esAcumulado={true} /><TablaComponent titulo="TABLA GENERAL ACUMULADA" datos={generarTabla(partidosValidos, null, true)} esAcumulado={true} /></>) : (temporada === '2013' && <TablaComponent titulo={fecha > 44 ? "TABLA FINAL ACUMULADA" : `TABLA ACUMULADA (F${fecha})`} datos={generarTabla(temporada === '2013' && fecha > 44 ? listaPartidos.filter(p => p.Fecha_Global <= 44) : partidosValidos, null, true)} esAcumulado={true} />)}
                </div>
                                                                                
                <div className="flex flex-col gap-5">
                  <div className="bg-white border border-[#d1e0d7] rounded-lg overflow-hidden shadow-sm">
                    <div className="text-center font-bold text-[13px] uppercase py-[12px] bg-white text-[#112a1f] border-b border-[#d1e0d7]">RESULTADOS DE LA FECHA</div>
                    <div className="flex flex-col max-h-[600px] overflow-y-auto custom-scrollbar">
                      {listaPartidos.filter(p => p.Fecha_Global === fecha).length === 0 ? (
                        <div className="text-center text-[12px] p-[20px] text-[#6b7280] font-medium">No hay partidos registrados.</div>
                      ) : (
                        listaPartidos.filter(p => p.Fecha_Global === fecha).map((p, idx) => {
                          const esWO = esWalkover(p); const esConc = esConcedido(p); const teamGanador = ganadorMesa(p);
                          return (
                            <div key={idx} className={`flex justify-between items-center py-3 px-3 border-b border-[#f0f4f2] hover:bg-[#f8fbf9] ${idx % 2 === 0 ? 'bg-transparent' : 'bg-[#fcfdfc]'}`}>
                              <div className="flex items-center w-full justify-center">
                                <span className={`text-right w-[40%] text-[11px] font-bold truncate ${teamGanador === p.Local ? 'text-[#8cc63f]' : 'text-[#112a1f]'}`}>{p.Local}</span>
                                <img src={logos[p.Local]} className="w-[18px] h-[18px] mx-1.5 object-contain" />
                                
                                <div className="flex items-center justify-center gap-0.5 mx-1 min-w-[55px]">
                                  {esWO ? ( <div className="text-[#ef4444] text-[8px] font-black w-full text-center leading-tight">WALK<br/>OVER</div> ) : esConc ? ( <div className="text-[#ef4444] text-[8px] font-black w-full text-center leading-tight">CONCE<br/>DIDO</div> ) : p.GL !== null && p.GV !== null ? ( <><div className="bg-[#f0f4f2] text-[#112a1f] border border-[#d1e0d7] rounded-[4px] font-bold text-[12px] w-[22px] h-[22px] flex items-center justify-center">{p.GL}</div><div className="font-black text-[12px] text-[#8cc63f] mx-0.5">-</div><div className="bg-[#f0f4f2] text-[#112a1f] border border-[#d1e0d7] rounded-[4px] font-bold text-[12px] w-[22px] h-[22px] flex items-center justify-center">{p.GV}</div></> ) : ( <div className="font-bold text-[10px] text-[#8cc63f] bg-[#f0f4f2] border border-[#d1e0d7] px-2 py-0.5 rounded">VS</div> )}
                                </div>
                                
                                <img src={logos[p.Visitante]} className="w-[18px] h-[18px] mx-1.5 object-contain" />
                                <span className={`text-left w-[40%] text-[11px] font-bold truncate ${teamGanador === p.Visitante ? 'text-[#8cc63f]' : 'text-[#112a1f]'}`}>{p.Visitante}</span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== VISTA: EQUIPOS ==================== */}
          {topTab === 'EQUIPOS' && (
            <div className="fade-in">
              {!equipoSeleccionado ? (
                <div className="max-w-5xl mx-auto">
                  <p className="text-center text-[#6b7280] text-[13px] mb-8 font-medium">Selecciona un escudo para ver información y últimos resultados</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Object.keys(logos).sort().filter(eq => {
                        if (temporada === '2026') return partidos2026Base.some(p => normalizarEquipo(p[1]) === eq || normalizarEquipo(p[2]) === eq);
                        if (temporada === '2018') return equipo_A_2018.includes(eq) || equipo_B_2018.includes(eq);
                        if (temporada === '2013') return liguillaA_2013.includes(eq) || liguillaB_2013.includes(eq);
                        if (temporada === '2023') return Array.isArray(partidos2023JSON) ? partidos2023JSON.some(p => normalizarEquipo(p[1]) === eq || normalizarEquipo(p[2]) === eq) : false;
                        return true; 
                      }).map(eq => (
                        <button key={eq} onClick={() => setEquipoSeleccionado(eq)} className="p-5 flex flex-col items-center justify-center bg-white border border-[#d1e0d7] rounded-xl hover:bg-[#f8fbf9] hover:border-[#8cc63f] transition-all cursor-pointer group shadow-sm hover:shadow-md outline-none">
                          <img src={logos[eq]} className="w-12 h-12 object-contain mb-3 group-hover:scale-110 transition-transform" alt={eq} />
                          <span className="font-bold text-[12px] text-center uppercase leading-tight text-[#112a1f]">{eq}</span>
                        </button>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="fade-in max-w-5xl mx-auto">
                  <button onClick={() => setEquipoSeleccionado(null)} className="mb-6 bg-white border border-[#d1e0d7] text-[#112a1f] text-[11px] font-bold px-4 py-2 rounded-md hover:bg-[#f8fbf9] hover:text-[#8cc63f] transition-colors flex items-center gap-2 shadow-sm outline-none">
                    ◀ VOLVER AL LISTADO
                  </button>
                  <div className="text-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-[#d1e0d7]">
                    <img src={logos[equipoSeleccionado]} className="w-20 h-20 object-contain mx-auto mb-3" />
                    <h2 className="text-[24px] font-black uppercase text-[#112a1f] m-0 tracking-wide">{equipoSeleccionado}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-[60%_35%] gap-6">
                    <div className="flex flex-col gap-6">
                      <ListaPartidosComponent titulo="Últimos Resultados" partidos={partidosJugadosEquipo} />
                      <ListaPartidosComponent titulo="Próximos Partidos" partidos={proximosPartidosEquipo} />
                    </div>
                    <div>
                      <div className="bg-white border border-[#d1e0d7] rounded-xl p-5 sticky top-24 shadow-sm">
                        <div className="text-center font-bold text-[14px] uppercase mb-4 text-[#112a1f] border-b border-[#d1e0d7] pb-2">INFO DEL CLUB</div>
                        <div className="bg-[#f8fbf9] border border-[#d1e0d7] rounded p-3 mb-2 flex justify-between text-[12px]"><span className="font-bold uppercase text-[#6b7280]">Apodo</span><span className="font-bold text-[#112a1f] text-right">{info_clubes[equipoSeleccionado]?.Apodo || '-'}</span></div>
                        <div className="bg-[#f8fbf9] border border-[#d1e0d7] rounded p-3 mb-2 flex justify-between text-[12px]"><span className="font-bold uppercase text-[#6b7280]">Fundación</span><span className="font-bold text-[#112a1f]">{info_clubes[equipoSeleccionado]?.Fundación || '-'}</span></div>
                        <div className="bg-[#f8fbf9] border border-[#d1e0d7] rounded p-3 flex flex-col text-[12px] text-center"><span className="font-bold uppercase mb-1 text-[#6b7280]">Estadio</span><span className="text-[#8cc63f] font-bold text-xs leading-relaxed">{info_clubes[equipoSeleccionado]?.Estadio || 'Estadio Local'}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== VISTA: CAMPEONES ==================== */}
          {topTab === 'HISTORIAL_CAMPEONES' && (
            <div className="fade-in">
              <div className="grid grid-cols-1 md:grid-cols-[60%_35%] gap-6 items-start max-w-5xl mx-auto">
                <div className="bg-white border border-[#d1e0d7] rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-white p-3 text-center border-b border-[#d1e0d7]"><h3 className="text-[14px] font-bold uppercase text-[#112a1f] m-0">Historial de Campeones</h3></div>
                  <table className="w-full text-[12px] border-collapse font-sans">
                    <thead><tr><th className="bg-[#f8fbf9] py-2.5 px-4 text-left border-b border-[#d1e0d7] font-bold text-[#6b7280] w-[80px]">Torneo</th><th className="bg-[#f8fbf9] py-2.5 px-4 text-left border-b border-[#d1e0d7] font-bold text-[#6b7280]">Campeón</th></tr></thead>
                    <tbody>{historial_datos.map((row, i) => (
                      <tr key={i} className={`hover:bg-[#f8fbf9] border-b border-[#f0f4f2] ${i % 2 === 0 ? 'bg-transparent' : 'bg-[#fdfdfd]'}`}>
                        <td className="py-3 px-4 font-black text-[#112a1f]">{row.Año}</td>
                        <td className="py-3 px-4 text-left flex items-center justify-between">
                          <div className="flex items-center gap-3 font-bold text-[#112a1f]">
                            <img src={logos[row.Campeón] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} className="w-[18px] h-[18px] object-contain" />
                            <span>{row.Campeón}</span>
                          </div>
                        </td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
                <div className="bg-white border border-[#d1e0d7] rounded-xl shadow-sm overflow-hidden sticky top-24">
                  <div className="bg-white p-3 text-center border-b border-[#d1e0d7]"><h3 className="text-[14px] font-bold uppercase text-[#112a1f] m-0">Ranking de Ligas</h3></div>
                  <table className="w-full text-[12px] border-collapse font-sans">
                    <thead><tr><th className="bg-[#f8fbf9] py-2.5 px-4 text-left border-b border-[#d1e0d7] font-bold text-[#6b7280]">Equipo</th><th className="bg-[#f8fbf9] py-2.5 px-4 text-center border-b border-[#d1e0d7] font-bold text-[#6b7280] w-[60px]">Títulos</th></tr></thead>
                    <tbody>{ranking_datos.map((row, i) => (
                      <tr key={i} className={`hover:bg-[#f8fbf9] border-b border-[#f0f4f2] ${i % 2 === 0 ? 'bg-transparent' : 'bg-[#fdfdfd]'}`}>
                        <td className="py-3 px-4 text-left flex items-center gap-3 font-bold text-[#112a1f]">
                          <img src={logos[row.Equipo] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} className="w-[18px] h-[18px] object-contain" />
                          <span>{row.Equipo}</span>
                        </td>
                        <td className="py-3 px-4 text-center font-black text-[#8cc63f] text-sm bg-[#f8fbf9]">{row.Títulos}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
      
      <style dangerouslySetRenderedContent={{__html: `
        .fade-in { animation: fadeIn 0.3s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #d1e0d7; border-radius: 10px; }
      `}} />
    </div>
  );
}

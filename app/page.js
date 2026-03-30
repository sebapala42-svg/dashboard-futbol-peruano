'use client';
import React, { useState, useMemo, useEffect } from 'react';
import partidosJSON from './torneo_2018.json';
import partidos2013JSON from './torneo_2013.json';
import partidos2023JSON from './torneo_2023.json';

// BASE RESTAURADA: LAS 17 FECHAS COMPLETAS DEL 2026 (NUNCA MÁS LA CORTO)
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

// BASE DE DATOS JSON RESTAURADA (Para que los años 2018, 2023, 2013 no salgan en blanco)
const listaPartidos2018 = Array.isArray(partidosJSON) ? partidosJSON : (partidosJSON.BaseDatos || Object.values(partidosJSON)[0] || []);

// TRADUCTOR DE EQUIPOS
const normalizarEquipo = (nombre) => {
  const alias = {
    'Melgar': 'FBC Melgar',
    'César Vallejo': 'Cesar Vallejo',
    'Cusco': 'Cusco FC',
    'Comercio': 'Union Comercio'
  };
  return alias[nombre] || nombre;
};

export default function Home() {
  
  // ESTADOS MAESTROS DE NAVEGACIÓN
  const [vistaMenuLateral, setVistaMenuLateral] = useState('PORTADA');
  const [tabTop, setTabTop] = useState('fixture');
  const [menuPeruAbierto, setMenuPeruAbierto] = useState(true);

  // ESTADOS DE LA PORTADA EN VIVO Y CALENDARIO
  const [portadaFiltro, setPortadaFiltro] = useState('TODOS');
  const [calendarioAbierto, setCalendarioAbierto] = useState(false);
  const [fechaHoy, setFechaHoy] = useState(new Date()); 
  const [mesVisible, setMesVisible] = useState(new Date()); 

  const [temporada, setTemporada] = useState('2026');
  const [fecha, setFecha] = useState(8); 
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

  // ESTADOS PARA LA API
  const [partidosEnVivo, setPartidosEnVivo] = useState([]);
  const [cargandoAPI, setCargandoAPI] = useState(false);

  // ==========================================
  // LÓGICA DEL CALENDARIO REAL
  // ==========================================
  const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  
  const generarDiasMes = (fechaReferencia) => {
    const year = fechaReferencia.getFullYear();
    const month = fechaReferencia.getMonth();
    const diasEnElMes = new Date(year, month + 1, 0).getDate();
    const primerDiaSemana = new Date(year, month, 1).getDay(); 
    
    const offset = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1; 
    
    let dias = [];
    for (let i = 0; i < offset; i++) {
      dias.push(null); 
    }
    for (let i = 1; i <= diasEnElMes; i++) {
      dias.push(new Date(year, month, i));
    }
    return dias;
  };

  const cambiarMes = (incremento) => {
    setMesVisible(new Date(mesVisible.getFullYear(), mesVisible.getMonth() + incremento, 1));
  };

  const seleccionarFecha = (nuevaFecha) => {
    setFechaHoy(nuevaFecha);
    setMesVisible(nuevaFecha); 
    setCalendarioAbierto(false); 
  };

  const formatearFecha = (fechaObj) => {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return fechaObj.toLocaleDateString('es-ES', opciones).toUpperCase();
  };

  const cambiarDiaRapido = (incremento) => {
    const nueva = new Date(fechaHoy);
    nueva.setDate(nueva.getDate() + incremento);
    setFechaHoy(nueva);
    setMesVisible(nueva);
  };

  // ==========================================
  // EFECTO DE API 
  // ==========================================
  useEffect(() => {
    if (vistaMenuLateral === 'PORTADA') {
      setCargandoAPI(true);
      
      const year = fechaHoy.getFullYear();
      const month = String(fechaHoy.getMonth() + 1).padStart(2, '0');
      const day = String(fechaHoy.getDate()).padStart(2, '0');
      const fechaFormateadaAPI = `${year}-${month}-${day}`;

      // REEMPLAZA ESTE ENLACE POR TU API REAL
      fetch(`PON_AQUI_LA_URL_DE_TU_API`) 
        .then(response => {
          if (!response.ok) { throw new Error("Error en la API"); }
          return response.json();
        })
        .then(data => {
          setPartidosEnVivo(data); 
          setCargandoAPI(false);
        })
        .catch(error => {
          console.error("Error obteniendo datos:", error);
          setCargandoAPI(false);
        });
    }
  }, [vistaMenuLateral, fechaHoy]);

  // RESULTADOS DE MESA (2023)
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

  const listaPartidos = useMemo(() => {
    if (temporada === '2018') return listaPartidos2018.map(p => ({ ...p, Jornada_Oficial: p.Fecha_Global, Local: normalizarEquipo(p.Local), Visitante: normalizarEquipo(p.Visitante) }));
    if (temporada === '2023') {
      // AQUÍ ESTABA EL ERROR: DEVOLVÍ LA LÓGICA ROBUSTA PARA LEER TU JSON
      const raw2023 = Array.isArray(partidos2023JSON) ? partidos2023JSON : (partidos2023JSON.BaseDatos || Object.values(partidos2023JSON)[0] || []);
      const ordenCronologicoApertura = { 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 1: 8, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13, 15: 14, 2: 15, 16: 16, 17: 17, 18: 18, 19: 19 };
      return raw2023.map(p => {
        let jornadaOficial = p[0];
        let torneo = p[5] || 'Apertura';
        let fechaCronologica = jornadaOficial;
        if (torneo === 'Apertura' && ordenCronologicoApertura[jornadaOficial]) fechaCronologica = ordenCronologicoApertura[jornadaOficial];
        return { Jornada_Oficial: jornadaOficial, Fecha_Global: fechaCronologica, Torneo: torneo, Local: normalizarEquipo(p[1]), Visitante: normalizarEquipo(p[2]), GL: p[3], GV: p[4] };
      });
    }
    if (temporada === '2013') {
      // AQUÍ TAMBIÉN RESTAURÉ LA LÓGICA ROBUSTA PARA LEER TU JSON
      const raw2013 = Array.isArray(partidos2013JSON) ? partidos2013JSON : (partidos2013JSON.BaseDatos || Object.values(partidos2013JSON)[0] || []);
      return raw2013.map(p => {
        let gl = p[3]; let gv = p[4];
        if (p[0] === 5 && p[1] === 'Cusco (Garcilaso)' && p[2] === 'Leon de Huanuco') { gl = 0; gv = 3; }
        return { Fecha_Global: p[0], Jornada_Oficial: p[0], Torneo: 'Descentralizado', Local: normalizarEquipo(p[1]), Visitante: normalizarEquipo(p[2]), GL: gl, GV: gv };
      });
    }
    return partidos2026JSON.map(p => ({ ...p, Jornada_Oficial: p.Fecha_Global, Local: normalizarEquipo(p.Local), Visitante: normalizarEquipo(p.Visitante) }));
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

  const liguillaA_2013 = ['Cusco (Garcilaso)', 'Sporting Cristal', 'Alianza Lima', 'Cesar Vallejo', 'Sport Huancayo', 'FBC Melgar', 'Pacifico FC', 'Union Comercio'];
  const liguillaB_2013 = ['Universitario', 'UTC', 'Ayacucho FC', 'Juan Aurich', 'Cienciano', 'Leon de Huanuco', 'U. San Martin', 'Jose Galvez'];
  const equipo_A_2018 = ['Sporting Cristal', 'Sport Rosario', 'UTC', 'U. San Martin', 'Alianza Lima', 'Comerciantes Unidos', 'Ayacucho FC', 'Universitario'];
  const equipo_B_2018 = ['Sport Huancayo', 'FBC Melgar', 'Cantolao', 'Dep. Municipal', 'Sport Boys', 'Cusco (Garcilaso)', 'Binacional', 'Union Comercio'];

  const equiposDeLaTemporada = useMemo(() => {
    const equiposSet = new Set();
    listaPartidos.forEach(p => {
      equiposSet.add(p.Local);
      equiposSet.add(p.Visitante);
    });
    return Array.from(equiposSet).sort();
  }, [listaPartidos]);

  const partidosValidos = useMemo(() => {
    return listaPartidos.filter(p => p.Fecha_Global <= fecha && p.Torneo !== 'Final');
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

    return Object.values(tabla).map(t => {
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
    }).sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);
  };

  const TablaComponent = ({ titulo, zona, datos, esAcumulado, compactLogo = false }) => (
    <div className="bg-white border border-[#d1e0d7] rounded-[8px] overflow-hidden shadow-lg mb-[15px] pb-1">
      <div className="text-center font-bold text-[14px] uppercase py-[10px]" style={{ color: '#000000' }}>
        {titulo}
      </div>
      {zona && (
        <div className="bg-[#e5eee9] px-[10px] py-[6px] font-bold text-[12px] border-b-[2px] border-[#d1e0d7] mx-[2px]" style={{ color: '#000000' }}>
          {zona}
        </div>
      )}
      {datos.length === 0 ? <div className="text-center text-[#6b7280] p-3 text-[12px]">Sin datos para esta fecha o temporada.</div> : (
        <table className="w-full text-[12px] font-sans border-collapse mt-1">
          <thead>
            <tr>
              <th className="bg-[#e5eee9] border-b border-[#d1e0d7] py-[8px] px-[4px] font-bold text-[11px] w-[30px] text-center" style={{ color: '#000000' }}>#</th>
              <th className="bg-[#e5eee9] border-b border-r border-[#d1e0d7] py-[8px] px-[4px] font-bold text-[11px] text-left" style={{ color: '#000000' }}>Equipos</th>
              <th className="bg-[#e5eee9] border-b border-r border-[#d1e0d7] py-[8px] px-[4px] font-bold text-[11px] text-center" style={{ color: '#000000' }}>PTS</th>
              <th className="bg-[#e5eee9] border-b border-[#d1e0d7] py-[8px] px-[4px] font-normal text-[11px] text-center" style={{ color: '#6b7280' }}>J</th>
              <th className="bg-[#e5eee9] border-b border-[#d1e0d7] py-[8px] px-[4px] font-normal text-[11px] text-center" style={{ color: '#6b7280' }}>Gol</th>
              <th className="bg-[#e5eee9] border-b border-[#d1e0d7] py-[8px] px-[4px] font-normal text-[11px] text-center" style={{ color: '#6b7280' }}>+/-</th>
              <th className="bg-[#e5eee9] border-b border-[#d1e0d7] py-[8px] px-[4px] font-normal text-[11px] text-center" style={{ color: '#6b7280' }}>G</th>
              <th className="bg-[#e5eee9] border-b border-[#d1e0d7] py-[8px] px-[4px] font-normal text-[11px] text-center" style={{ color: '#6b7280' }}>E</th>
              <th className="bg-[#e5eee9] border-b border-[#d1e0d7] py-[8px] px-[4px] font-normal text-[11px] text-center" style={{ color: '#6b7280' }}>P</th>
              <th className="bg-[#e5eee9] border-b border-[#d1e0d7] py-[8px] px-[4px] font-normal text-[11px] text-center" style={{ color: '#6b7280' }}>Últimas</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((eq, i) => {
              let bordeColor = 'transparent';
              
              if (temporada === '2018' && esAcumulado) {
                if (i < 4) bordeColor = '#3db4dc'; 
                else if (i < 8) bordeColor = '#e1c340'; 
                else if (i >= datos.length - 2) bordeColor = '#d32f2f'; 
              } 
              else if (temporada === '2013' && esAcumulado && !zona) {
                if (i < 3) bordeColor = '#3db4dc'; 
                else if (i >= 3 && i < 7) bordeColor = '#e1c340'; 
                else if (i >= datos.length - 2) bordeColor = '#d32f2f'; 
              }
              else if (temporada === '2013' && esAcumulado && zona) {
                if (i === 0) bordeColor = '#3db4dc'; 
              }
              else if (temporada === '2023' && esAcumulado) {
                if (i < 4) bordeColor = '#3db4dc'; // Libertadores
                else if (i >= 4 && i < 8) bordeColor = '#e1c340'; // Sudamericana
                else if (i >= datos.length - 3) bordeColor = '#d32f2f'; // Descenso
              }
              else if (i === 0) {
                bordeColor = '#3db4dc';
              }

              return (
                <tr key={eq.equipo} className={`hover:bg-[#f8fbf9] transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-[#fcfdfc]'}`}>
                  <td className="py-[10px] px-[4px] font-bold border-l-[3px] text-center" style={{ borderLeftColor: bordeColor, color: '#000000' }}>{i + 1}</td>
                  <td className="py-[10px] px-[4px] border-r border-[#d1e0d7]">
                    <div className="flex items-center text-left font-bold" style={{ color: '#000000' }}>
                      <img src={logos[eq.equipo] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} 
                           style={{ width: compactLogo ? '13px' : '15px', height: compactLogo ? '13px' : '15px', minWidth: compactLogo ? '13px' : '15px', objectFit: 'contain', marginRight: '6px' }} 
                           alt={eq.equipo} />
                      <span>{eq.equipo}</span>
                    </div>
                  </td>
                  <td className="py-[10px] px-[4px] font-bold text-[13px] text-center border-r border-[#d1e0d7]" style={{ color: '#000000' }}>{eq.pts}</td>
                  <td className="py-[10px] px-[4px] text-center font-normal" style={{ color: '#6b7280' }}>{eq.pj}</td>
                  <td className="py-[10px] px-[4px] text-center font-normal" style={{ color: '#6b7280' }}>{eq.gf}:{eq.gc}</td>
                  <td className="py-[10px] px-[4px] text-center font-normal" style={{ color: '#6b7280' }}>{eq.dif}</td>
                  <td className="py-[10px] px-[4px] text-center font-normal" style={{ color: '#6b7280' }}>{eq.g}</td>
                  <td className="py-[10px] px-[4px] text-center font-normal" style={{ color: '#6b7280' }}>{eq.e}</td>
                  <td className="py-[10px] px-[4px] text-center font-normal" style={{ color: '#6b7280' }}>{eq.p}</td>
                  <td className="py-[10px] px-[4px] text-center">
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
      )}
      
      {temporada === '2023' && esAcumulado && fecha >= 38 && (
        <div className="text-[11px] text-left mx-[10px] my-[10px] p-[5px] bg-[#e5eee9] rounded-[4px] border border-[#d1e0d7]" style={{ color: '#6b7280' }}>
          <strong>Clasificación:</strong> Del 1° al 4° a Copa Libertadores. Del 5° al 8° a Copa Sudamericana. Descienden los 3 últimos (17°, 18° y 19°).<br/>
          * Resoluciones FPF aplicadas en la Tabla Final Acumulada 2023: D. Municipal (-5), Sport Boys (-4), D. Garcilaso (-1). 
        </div>
      )}
      {temporada === '2018' && esAcumulado && fecha >= 44 && (
        <div className="text-[11px] text-left mx-[10px] my-[10px] p-[5px] bg-[#e5eee9] rounded-[4px] border border-[#d1e0d7]" style={{ color: '#6b7280' }}>
          * Nota: Resoluciones FPF aplicadas en Acumulada 2018: Rosario (-7), Muni (-2), UTC (-2), Cantolao (-2), U (-1). Cristal (+2) por Reservas.
        </div>
      )}
      {temporada === '2013' && esAcumulado && fecha >= 44 && !zona && (
        <div className="text-[11px] text-left mx-[10px] my-[10px] p-[5px] bg-[#e5eee9] rounded-[4px] border border-[#d1e0d7]" style={{ color: '#6b7280' }}>
          * Nota (2013): Garcilaso y Universitario a Libertadores. El 3° a Libertadores. Del 4° al 7° a Sudamericana. Los dos últimos descienden.<br/>
          * Sanción: Cusco (Garcilaso) perdió 1 punto en la Fecha 5 ante León de Huánuco.
        </div>
      )}
    </div>
  );

  const ListaPartidosComponent = ({ titulo, partidos }) => (
    <div className="bg-white border border-[#d1e0d7] rounded-[8px] overflow-hidden shadow-lg mb-[15px] pb-1">
      <div className="text-center font-bold text-[14px] uppercase py-[10px]" style={{ color: '#000000' }}>
        {titulo}
      </div>
      <div className="flex flex-col">
        {partidos.length === 0 ? (
          <div className="text-center text-[12px] p-[15px]" style={{ color: '#000000' }}>No hay partidos registrados.</div>
        ) : (
          partidos.map((p, idx) => {
            const esWO = esWalkover(p);
            const esConc = esConcedido(p);
            const teamGanador = ganadorMesa(p);

            return (
              <div key={idx} className={`flex justify-between items-center py-[8px] px-[10px] border-t border-[#d1e0d7] hover:bg-[#f8fbf9] transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-[#fcfdfc]'}`}>
                <div className="flex flex-col justify-center items-center w-[35px]">
                  <span className="text-[10px] font-bold" style={{ color: '#6b7280' }}>
                    {temporada === '2023' && (p.Torneo === 'Clausura' || p.Torneo === 'Final') 
                      ? (p.Torneo === 'Final' ? 'FINAL' : `F${p.Jornada_Oficial - 19}`)
                      : (p.Jornada_Oficial ? `F${p.Jornada_Oficial}` : `F${p.Fecha_Global}`)}
                  </span>
                </div>
                <div className="flex items-center w-[85%] justify-center">
                  <span className={`text-right w-[40%] text-[12px] font-bold truncate ${teamGanador === p.Local ? 'underline decoration-2 underline-offset-2 text-[#8cc63f]' : ''}`} style={{ color: teamGanador === p.Local ? '#000000' : '#000000' }}>{p.Local}</span>
                  <img src={logos[p.Local] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '18px', height: '18px', minWidth: '18px', objectFit: 'contain', margin: '0 5px' }} />
                  
                  <div className="flex items-center justify-center gap-[2px] mx-[5px] min-w-[65px]">
                    {esWO ? (
                      <div className="text-[#d32f2f] text-[9px] font-black w-[45px] text-center leading-[10px]">WALK<br/>OVER</div>
                    ) : esConc ? (
                      <div className="text-[#d32f2f] text-[9px] font-black w-[45px] text-center leading-[10px]">CONCE<br/>DIDO</div>
                    ) : p.GL !== null && p.GV !== null ? (
                      <>
                        <div className="bg-[#e5eee9] border border-[#d1e0d7] rounded-[4px] font-bold text-[14px] w-[25px] h-[25px] flex items-center justify-center" style={{ color: '#000000' }}>{p.GL}</div>
                        <div className="font-bold text-[14px] mx-[2px]" style={{ color: '#8cc63f' }}>-</div>
                        <div className="bg-[#e5eee9] border border-[#d1e0d7] rounded-[4px] font-bold text-[14px] w-[25px] h-[25px] flex items-center justify-center" style={{ color: '#000000' }}>{p.GV}</div>
                      </>
                    ) : (
                      <div className="font-bold text-[12px] mx-[2px]" style={{ color: '#8cc63f' }}>VS</div>
                    )}
                  </div>
                  
                  <img src={logos[p.Visitante] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '18px', height: '18px', minWidth: '18px', objectFit: 'contain', margin: '0 5px' }} />
                  <span className={`text-left w-[40%] text-[12px] font-bold truncate ${teamGanador === p.Visitante ? 'underline decoration-2 underline-offset-2 text-[#8cc63f]' : ''}`} style={{ color: teamGanador === p.Visitante ? '#000000' : '#000000' }}>{p.Visitante}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', backgroundColor: '#f0f4f2', fontFamily: 'sans-serif', color: '#112a1f', overflow: 'hidden' }}>
      
      {/* SIDEBAR BLINDADO */}
      <aside style={{ width: '250px', backgroundColor: '#ffffff', borderRight: '1px solid #d1e0d7', flexShrink: 0, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
        <div 
          onClick={() => setVistaMenuLateral('PORTADA')}
          style={{ padding: '16px', borderBottom: '1px solid #d1e0d7', backgroundColor: '#e5eee9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <img src="https://i.ibb.co/9kWMHzxY/Gemini-Generated-Image-oweh8loweh8loweh-removebg-preview.png" alt="Logo" style={{ height: '45px', objectFit: 'contain' }} />
        </div>

        <div style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column' }}>
          <button 
            onClick={() => setVistaMenuLateral('PORTADA')}
            style={{
              backgroundColor: vistaMenuLateral === 'PORTADA' ? '#8cc63f' : '#ffffff', color: vistaMenuLateral === 'PORTADA' ? '#ffffff' : '#112a1f',
              border: 'none', borderRadius: '8px', padding: '12px 16px', fontWeight: '900', fontSize: '13px', textAlign: 'left', width: '100%',
              display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', cursor: 'pointer'
            }}
          >
            ⚽ Partidos de Hoy
          </button>

          <div style={{ marginTop: '30px', marginBottom: '15px', paddingBottom: '8px', borderBottom: '1px solid #f0f4f2', fontSize: '11px', fontWeight: '900', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: '4px' }}>
            Menú Principal
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button 
              onClick={() => setMenuPeruAbierto(!menuPeruAbierto)} 
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: '#ffffff',
                border: '1px solid #d1e0d7', borderRadius: '8px', padding: '10px 12px', color: '#112a1f', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="https://flagcdn.com/24x18/pe.png" alt="Peru" style={{ width: '20px', borderRadius: '2px' }} /> 
                <span style={{ letterSpacing: '0.025em' }}>PERÚ</span>
              </div>
              <span style={{ fontSize: '10px', color: '#8cc63f' }}>{menuPeruAbierto ? '▲' : '▼'}</span>
            </button>

            {menuPeruAbierto && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '16px', marginTop: '8px', borderLeft: '2px solid #e5eee9', marginLeft: '16px' }}>
                <button 
                  onClick={() => { setVistaMenuLateral('LIGA1'); setTabTop('fixture'); setTemporada('2026'); setFecha(8); setEquipoSeleccionado(null); }}
                  style={{
                    textAlign: 'left', width: '100%', padding: '10px 16px', fontSize: '12px', fontWeight: 'bold', borderRadius: '6px', border: 'none', cursor: 'pointer',
                    backgroundColor: vistaMenuLateral === 'LIGA1' ? '#f8fbf9' : 'transparent', color: vistaMenuLateral === 'LIGA1' ? '#112a1f' : '#6b7280',
                    borderLeft: vistaMenuLateral === 'LIGA1' ? '3px solid #8cc63f' : '3px solid transparent', boxShadow: vistaMenuLateral === 'LIGA1' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
                  }}
                >
                  Liga 1 Te Apuesto
                </button>
                <button 
                  onClick={() => { setVistaMenuLateral('CAMPEONES'); }}
                  style={{
                    textAlign: 'left', width: '100%', padding: '10px 16px', fontSize: '12px', fontWeight: 'bold', borderRadius: '6px', border: 'none', cursor: 'pointer',
                    backgroundColor: vistaMenuLateral === 'CAMPEONES' ? '#f8fbf9' : 'transparent', color: vistaMenuLateral === 'CAMPEONES' ? '#112a1f' : '#6b7280',
                    borderLeft: vistaMenuLateral === 'CAMPEONES' ? '3px solid #8cc63f' : '3px solid transparent', boxShadow: vistaMenuLateral === 'CAMPEONES' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
                  }}
                >
                  Campeones Históricos
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f0f4f2', overflowY: 'auto', position: 'relative' }}>
        
        {/* VISTA PORTADA */}
        {vistaMenuLateral === 'PORTADA' && (
          <div style={{ padding: '24px', width: '100%', maxWidth: '900px', margin: '0 auto', paddingBottom: '80px' }}>
            
            {/* Header del Calendario */}
            <div style={{ backgroundColor: '#ffffff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', border: '1px solid #d1e0d7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
               <button onClick={() => cambiarDiaRapido(-1)} style={{ color: '#6b7280', fontWeight: 'bold', padding: '0 12px', fontSize: '18px', background: 'transparent', border: 'none', cursor: 'pointer' }}>{'<'}</button>
               
               <div style={{ position: 'relative' }}>
                 <button onClick={() => setCalendarioAbierto(!calendarioAbierto)} style={{ fontWeight: '900', fontSize: '13px', color: '#112a1f', letterSpacing: '0.05em', textTransform: 'uppercase', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                   {formatearFecha(fechaHoy)} <span style={{ fontSize: '10px', color: '#8cc63f' }}>{calendarioAbierto ? '▲' : '▼'}</span>
                 </button>
                 
                 {calendarioAbierto && (
                   <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px', width: '280px', backgroundColor: '#ffffff', border: '1px solid #d1e0d7', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', borderRadius: '8px', zIndex: 1000, padding: '12px' }}>
                     
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                       <button onClick={() => cambiarMes(-1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#6b7280' }}>{'<'}</button>
                       <strong style={{ fontSize: '12px', color: '#112a1f', textTransform: 'uppercase' }}>
                         {mesVisible.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
                       </strong>
                       <button onClick={() => cambiarMes(1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#6b7280' }}>{'>'}</button>
                     </div>

                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '12px' }}>
                        {diasSemana.map(d => <div key={d} style={{ fontWeight: 'bold', color: '#112a1f', paddingBottom: '4px' }}>{d}</div>)}
                        
                        {generarDiasMes(mesVisible).map((diaObj, index) => {
                          if (!diaObj) return <div key={index} style={{ padding: '6px' }}></div>;
                          const esHoy = diaObj.getDate() === fechaHoy.getDate() && diaObj.getMonth() === fechaHoy.getMonth() && diaObj.getFullYear() === fechaHoy.getFullYear();
                          return (
                            <button 
                              key={index} onClick={() => seleccionarFecha(diaObj)}
                              style={{ padding: '6px 0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: esHoy ? 'bold' : 'normal', backgroundColor: esHoy ? '#8cc63f' : 'transparent', color: esHoy ? '#ffffff' : '#6b7280' }}
                            >
                              {diaObj.getDate()}
                            </button>
                          );
                        })}
                     </div>
                   </div>
                 )}
               </div>
               <button onClick={() => cambiarDiaRapido(1)} style={{ color: '#6b7280', fontWeight: 'bold', padding: '0 12px', fontSize: '18px', background: 'transparent', border: 'none', cursor: 'pointer' }}>{'>'}</button>
            </div>

            {/* Filtros TODOS / VIVO */}
            <div style={{ backgroundColor: '#ffffff', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '24px', borderBottom: '1px solid #d1e0d7', borderLeft: '1px solid #d1e0d7', borderRight: '1px solid #d1e0d7', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
               <button onClick={()=>setPortadaFiltro('TODOS')} style={{ padding: '12px 0', fontSize: '11px', fontWeight: 'bold', border: 'none', background: 'transparent', cursor: 'pointer', textTransform: 'uppercase', borderBottom: portadaFiltro === 'TODOS' ? '3px solid #8cc63f' : '3px solid transparent', color: portadaFiltro === 'TODOS' ? '#8cc63f' : '#6b7280' }}>TODOS</button>
               <button onClick={()=>setPortadaFiltro('VIVO')} style={{ padding: '12px 0', fontSize: '11px', fontWeight: 'bold', border: 'none', background: 'transparent', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', borderBottom: portadaFiltro === 'VIVO' ? '3px solid #8cc63f' : '3px solid transparent', color: portadaFiltro === 'VIVO' ? '#8cc63f' : '#6b7280' }}>
                 VIVO <span style={{ backgroundColor: '#e5eee9', color: '#112a1f', padding: '2px 6px', borderRadius: '2px', fontSize: '9px', border: '1px solid #d1e0d7' }}>0</span>
               </button>
            </div>

            {/* Bloque LIGA 1 */}
            <div style={{ backgroundColor: '#f8fbf9', padding: '8px 12px', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#112a1f', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', borderTopLeftRadius: '6px', borderTopRightRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #d1e0d7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em' }}>
                    <img src="https://flagcdn.com/24x18/pe.png" alt="Peru" style={{ width: '16px', borderRadius: '2px' }}/> LIGA 1 TE APUESTO
                </div>
            </div>

            {/* LISTA DE PARTIDOS CONECTADA A LA API */}
            <div style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #d1e0d7', borderTop: 'none' }}>
                {cargandoAPI ? (
                  <div style={{ textAlign: 'center', padding: '32px', fontWeight: 'bold', color: '#6b7280' }}>Cargando partidos de hoy... ⏳</div>
                ) : partidosEnVivo.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px', fontWeight: 'bold', color: '#6b7280' }}>No hay partidos programados para {fechaHoy.toLocaleDateString('es-ES')}.</div>
                ) : (
                  partidosEnVivo.map((m, idx) => {
                     const ganador = m.GL > m.GV ? m.Local : (m.GL < m.GV ? m.Visitante : null);
                     const estadoMock = (idx === 0) ? 'EN VIVO' : (m.GL !== null ? 'Final' : '15:30'); 
                     
                     return (
                       <div key={idx} style={{ display: 'flex', borderTop: idx === 0 ? 'none' : '1px solid #f0f4f2', color: '#112a1f' }}>
                          <div style={{ width: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #f0f4f2', padding: '12px 4px' }}>
                             <span style={{ fontSize: '10px', fontWeight: '900', color: estadoMock === 'EN VIVO' ? '#ef4444' : '#6b7280' }}>{estadoMock}</span>
                             {estadoMock === 'EN VIVO' && <span style={{ color: '#ef4444', fontSize: '9px', fontWeight: 'bold', marginTop: '4px' }}>65'</span>}
                          </div>
                          
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '12px' }}>
                              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ textAlign: 'right', width: '35%', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: ganador === m.Local ? '#8cc63f' : '#112a1f', textDecoration: ganador === m.Local ? 'underline' : 'none' }}>{m.Local}</span>
                                  <img src={logos[m.Local] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '20px', height: '20px', objectFit: 'contain' }} alt={m.Local}/>
                                  
                                  {m.GL !== null ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: '50px', justifyContent: 'center' }}>
                                      <span style={{ fontWeight: 'bold', fontSize: '14px', backgroundColor: '#f0f4f2', color: '#112a1f', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #d1e0d7' }}>{estadoMock === 'EN VIVO' ? '1' : m.GL}</span>
                                      <span style={{ fontWeight: '900', color: '#8cc63f' }}>-</span>
                                      <span style={{ fontWeight: 'bold', fontSize: '14px', backgroundColor: '#f0f4f2', color: '#112a1f', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #d1e0d7' }}>{estadoMock === 'EN VIVO' ? '0' : m.GV}</span>
                                    </div>
                                  ) : (
                                    <span style={{ fontWeight: 'bold', fontSize: '11px', backgroundColor: '#f0f4f2', padding: '2px 8px', borderRadius: '4px', border: '1px solid #d1e0d7', minWidth: '50px', textAlign: 'center', color: '#8cc63f' }}>VS</span>
                                  )}
                                  
                                  <img src={logos[m.Visitante] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: '20px', height: '20px', objectFit: 'contain' }} alt={m.Visitante}/>
                                  <span style={{ textAlign: 'left', width: '35%', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: ganador === m.Visitante ? '#8cc63f' : '#112a1f', textDecoration: ganador === m.Visitante ? 'underline' : 'none' }}>{m.Visitante}</span>
                              </div>
                          </div>
                       </div>
                     );
                  })
                )}
            </div>
          </div>
        )}

        {/* VISTAS LIGA 1 Y CAMPEONES */}
        {vistaMenuLateral === 'LIGA1' && (
          <>
            <header className="bg-white shadow-sm border-b border-[#d1e0d7] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
              <h2 className="text-[20px] font-black uppercase text-[#112a1f] m-0">LIGA 1 - {temporada}</h2>
              <div className="flex bg-[#f8fbf9] rounded-lg p-1 border border-[#d1e0d7]">
                <button onClick={() => {setTabTop('fixture'); setEquipoSeleccionado(null);}} className={`px-4 py-1.5 text-[11px] font-bold rounded-md transition-colors outline-none ${tabTop === 'fixture' ? 'bg-white text-[#112a1f] shadow-sm border border-[#d1e0d7]' : 'text-[#6b7280] hover:text-[#112a1f]'}`}>FIXTURE Y TABLAS</button>
                <button onClick={() => setTabTop('equipos')} className={`px-4 py-1.5 text-[11px] font-bold rounded-md transition-colors outline-none ${tabTop === 'equipos' ? 'bg-white text-[#112a1f] shadow-sm border border-[#d1e0d7]' : 'text-[#6b7280] hover:text-[#112a1f]'}`}>EQUIPOS</button>
              </div>
            </header>

            <div className="p-6 max-w-[1250px] mx-auto w-full pb-20">
              {tabTop === 'fixture' && (
                <div style={{ display: 'grid', gridTemplateColumns: '64% 34%', gap: '2%', alignItems: 'start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {temporada === '2023' && fecha <= 19 && (<TablaComponent titulo="TORNEO APERTURA 2023" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Apertura'))} />)}
                    {temporada === '2023' && fecha > 19 && fecha <= 38 && (<TablaComponent titulo="TORNEO CLAUSURA 2023" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Clausura'))} />)}
                    {temporada === '2023' && (<TablaComponent titulo={`TABLA ACUMULADA (HASTA LA SEMANA ${Math.min(fecha, 38)})`} datos={generarTabla(partidosValidos.filter(p => p.Fecha_Global <= 38), null, true)} esAcumulado={true} />)}
                    {temporada === '2018' && fecha <= 14 && (<><TablaComponent titulo="TORNEO DE VERANO" zona="ZONA A" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Verano'), equipo_A_2018)} /><TablaComponent titulo="TORNEO DE VERANO" zona="ZONA B" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Verano'), equipo_B_2018)} /></>)}
                    {temporada === '2018' && fecha > 14 && fecha <= 29 && (<TablaComponent titulo="TORNEO APERTURA" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Apertura' && p.Fecha_Global >= 15))} />)}
                    {temporada === '2018' && fecha > 29 && (<TablaComponent titulo="TORNEO CLAUSURA" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Clausura' && p.Fecha_Global >= 30))} />)}
                    {temporada === '2026' && fecha <= 17 && (<TablaComponent titulo="TORNEO APERTURA 2026" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Apertura'))} />)}
                    {temporada === '2013' && fecha > 30 && fecha <= 44 ? (
                      <><TablaComponent titulo="LIGUILLA A" zona="(Puntos Acumulados)" datos={generarTabla(partidosValidos, liguillaA_2013, true)} esAcumulado={true} /><TablaComponent titulo="LIGUILLA B" zona="(Puntos Acumulados)" datos={generarTabla(partidosValidos, liguillaB_2013, true)} esAcumulado={true} /><TablaComponent titulo="TABLA GENERAL ACUMULADA" datos={generarTabla(partidosValidos, null, true)} esAcumulado={true} /></>
                    ) : (
                      temporada === '2013' && <TablaComponent titulo={fecha > 44 ? "TABLA FINAL ACUMULADA" : `TABLA ACUMULADA (HASTA LA FECHA ${fecha})`} datos={generarTabla(temporada === '2013' && fecha > 44 ? listaPartidos.filter(p => p.Fecha_Global <= 44) : partidosValidos, null, true)} esAcumulado={true} />
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="flex items-center justify-between bg-white border border-[#d1e0d7] rounded-[8px] px-3 py-2 shadow-sm">
                      <button onClick={() => setFecha(prev => Math.max(1, prev - 1))} className="text-[#8cc63f] hover:text-[#112a1f] font-black text-[18px] px-2 outline-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" disabled={fecha === 1}>◀</button>
                      <select value={fecha} onChange={(e) => setFecha(Number(e.target.value))} className="w-full bg-transparent font-bold text-[14px] text-[#112a1f] px-[10px] py-[4px] outline-none text-center cursor-pointer border-none uppercase tracking-wide">
                        {[...Array(temporada === '2023' ? 40 : (temporada === '2013' ? 48 : (temporada === '2018' ? 44 : 17)))].map((_, i) => {
                          let etiqueta = `FECHA ${i+1}`;
                          if (temporada === '2023') {
                              if (i < 19) {
                                const n = {1:'J. 3', 2:'J. 4', 3:'J. 5', 4:'J. 6', 5:'J. 7', 6:'J. 8', 7:'J. 9', 8:'J. 1 (Aplaz)', 9:'J. 10', 10:'J. 11', 11:'J. 12', 12:'J. 13', 13:'J. 14', 14:'J. 15', 15:'J. 2 (Aplaz)', 16:'J. 16', 17:'J. 17', 18:'J. 18', 19:'J. 19'};
                                etiqueta = `Semana ${i+1} (${n[i+1]})`;
                              } else if (i < 38) { etiqueta = `CLAUSURA F${i-18}`; } else if (i === 38) { etiqueta = `FINAL (IDA)`; } else if (i === 39) { etiqueta = `FINAL (VUELTA)`; }
                          }
                          return <option key={i+1} value={i+1} className="bg-white">{etiqueta}</option>
                        })}
                      </select>
                      <button onClick={() => setFecha(prev => Math.min(temporada === '2023' ? 40 : (temporada === '2013' ? 48 : (temporada === '2018' ? 44 : 17)), prev + 1))} className="text-[#8cc63f] hover:text-[#112a1f] font-black text-[18px] px-2 outline-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">▶</button>
                    </div>

                    {temporada === '2023' && [1, 8, 15].includes(fecha) && (
                      <div className="bg-[#fff3cd] border-l-[4px] border-[#fbbf24] text-[#854d0e] p-[10px] text-[12px] rounded-md shadow-sm font-medium leading-relaxed my-3">
                        {fecha === 1 && "🚨 Inicio cronológico del torneo. Marcado por varios Walkovers por disputas de derechos de TV."}
                        {fecha === 8 && "⏳ La Jornada 1 original se jugó en esta fecha (fines de marzo)."}
                        {fecha === 15 && "⏳ La Jornada 2 se recuperó finalmente en esta fecha (mediados de mayo)."}
                      </div>
                    )}

                    <div className="bg-white border border-[#d1e0d7] rounded-lg overflow-hidden shadow-sm">
                      <div className="text-center font-bold text-[13px] uppercase py-[12px] bg-[#f8fbf9] border-b border-[#d1e0d7] text-[#112a1f]">RESULTADOS DE LA FECHA</div>
                      <div className="flex flex-col max-h-[550px] overflow-y-auto custom-scrollbar">
                        {listaPartidos.filter(p => p.Fecha_Global === fecha).length === 0 ? (
                          <div className="text-center text-[12px] p-[20px] text-[#6b7280]">No hay partidos registrados.</div>
                        ) : (
                          listaPartidos.filter(p => p.Fecha_Global === fecha).map((p, idx) => {
                            const esWO = esWalkover(p); const esConc = esConcedido(p); const teamGanador = ganadorMesa(p);
                            return (
                              <div key={idx} className={`flex justify-between items-center py-[10px] px-[12px] border-b border-[#f0f4f2] hover:bg-[#f8fbf9] transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-[#fdfdfd]'}`}>
                                <div className="flex flex-col justify-center items-center w-[35px]">
                                  <span className="text-[10px] font-bold text-[#6b7280]">{temporada === '2023' && (p.Torneo === 'Clausura' || p.Torneo === 'Final') ? (p.Torneo === 'Final' ? 'FINAL' : `F${p.Jornada_Oficial - 19}`) : (p.Jornada_Oficial ? `F${p.Jornada_Oficial}` : `F${p.Fecha_Global}`)}</span>
                                </div>
                                <div className="flex items-center w-[85%] justify-center">
                                  <span className={`text-right w-[40%] text-[11px] font-bold truncate ${teamGanador === p.Local ? 'text-[#8cc63f] underline decoration-2' : 'text-[#112a1f]'}`}>{p.Local}</span>
                                  <img src={logos[p.Local]} className="w-[18px] h-[18px] mx-1.5 object-contain" />
                                  <div className="flex items-center justify-center gap-[2px] mx-[2px] min-w-[55px]">
                                    {esWO ? ( <div className="text-[#ef4444] text-[8px] font-black w-full text-center leading-tight">WALK<br/>OVER</div> ) : esConc ? ( <div className="text-[#ef4444] text-[8px] font-black w-full text-center leading-tight">CONCE<br/>DIDO</div> ) : p.GL !== null && p.GV !== null ? ( <><div className="bg-[#f0f4f2] border border-[#d1e0d7] text-[#112a1f] rounded-[4px] font-bold text-[13px] w-[22px] h-[22px] flex items-center justify-center">{p.GL}</div><div className="font-black text-[13px] text-[#8cc63f] mx-[2px]">-</div><div className="bg-[#f0f4f2] border border-[#d1e0d7] text-[#112a1f] rounded-[4px] font-bold text-[13px] w-[22px] h-[22px] flex items-center justify-center">{p.GV}</div></> ) : ( <div className="font-bold text-[11px] text-[#8cc63f] bg-[#f0f4f2] px-2 py-0.5 rounded border border-[#d1e0d7]">VS</div> )}
                                  </div>
                                  <img src={logos[p.Visitante]} className="w-[18px] h-[18px] mx-1.5 object-contain" />
                                  <span className={`text-left w-[40%] text-[11px] font-bold truncate ${teamGanador === p.Visitante ? 'text-[#8cc63f] underline decoration-2' : 'text-[#112a1f]'}`}>{p.Visitante}</span>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tabTop === 'equipos' && (
                <div>
                  {!equipoSeleccionado ? (
                    <div className="max-w-5xl mx-auto">
                      <p className="text-center text-[#6b7280] text-[13px] mb-8 font-medium">Selecciona un escudo para ver información detallada</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {equiposDeLaTemporada.map(eq => (
                            <button key={eq} onClick={() => setEquipoSeleccionado(eq)} className="p-4 flex flex-col items-center justify-center bg-white border border-[#d1e0d7] rounded-xl hover:bg-[#f8fbf9] hover:border-[#8cc63f] transition-all cursor-pointer group shadow-sm outline-none">
                              <div className="w-[55px] h-[55px] flex items-center justify-center mb-3">
                                <img src={logos[eq] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform" alt={eq} />
                              </div>
                              <span className="font-bold text-[12px] text-center uppercase leading-tight text-[#112a1f]">{eq}</span>
                            </button>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => setEquipoSeleccionado(null)} className="mb-6 bg-white border border-[#d1e0d7] text-[#112a1f] text-[11px] font-bold px-4 py-2 rounded-md hover:bg-[#f8fbf9] hover:text-[#8cc63f] transition-colors flex items-center gap-2 shadow-sm outline-none">
                        ◀ VOLVER AL LISTADO
                      </button>
                      <div className="text-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-[#d1e0d7]">
                        <img src={logos[equipoSeleccionado] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} className="w-20 h-20 object-contain mx-auto mb-3" />
                        <h2 className="text-[24px] font-black uppercase text-[#112a1f] m-0 tracking-wide">{equipoSeleccionado}</h2>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '60% 35%', gap: '5%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <ListaPartidosComponent titulo="Últimos Resultados" partidos={partidosJugadosEquipo} />
                          <ListaPartidosComponent titulo="Próximos Partidos" partidos={proximosPartidosEquipo} />
                        </div>
                        <div>
                          <div className="bg-white border border-[#d1e0d7] rounded-xl p-5 sticky top-24 shadow-sm">
                            <div className="text-center font-bold text-[14px] uppercase mb-4 text-[#112a1f] border-b border-[#d1e0d7] pb-2">INFO DEL CLUB</div>
                            <div className="bg-[#f8fbf9] border border-[#d1e0d7] rounded p-3 mb-2 flex justify-between text-[12px]"><span className="font-bold uppercase text-[#6b7280]">Apodo</span><span className="font-bold text-[#112a1f]">{info_clubes[equipoSeleccionado]?.Apodo || '-'}</span></div>
                            <div className="bg-[#f8fbf9] border border-[#d1e0d7] rounded p-3 mb-2 flex justify-between text-[12px]"><span className="font-bold uppercase text-[#6b7280]">Fundación</span><span className="font-bold text-[#112a1f]">{info_clubes[equipoSeleccionado]?.Fundación || '-'}</span></div>
                            <div className="bg-[#f8fbf9] border border-[#d1e0d7] rounded p-3 flex flex-col text-[12px] text-center"><span className="font-bold uppercase mb-1 text-[#6b7280]">Estadio</span><span className="text-[#8cc63f] font-bold text-xs leading-relaxed">{info_clubes[equipoSeleccionado]?.Estadio || 'Estadio Local'}</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {vistaMenuLateral === 'CAMPEONES' && (
          <>
            <header className="bg-white shadow-sm border-b border-[#d1e0d7] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
              <h2 className="text-[20px] font-black uppercase text-[#112a1f] m-0 flex items-center gap-2">
                <span className="bg-[#8cc63f] w-[4px] h-[20px] rounded-full"></span>
                HISTORIAL DE CAMPEONES
              </h2>
            </header>
            <div className="p-6 max-w-[1000px] mx-auto w-full pb-20">
              <div style={{ display: 'grid', gridTemplateColumns: '60% 35%', gap: '5%', alignItems: 'start' }}>
                <div className="bg-white border border-[#d1e0d7] rounded-xl shadow-sm overflow-hidden mt-4">
                  <div className="bg-[#f8fbf9] p-4 text-center border-b border-[#d1e0d7]"><h3 className="text-[16px] font-black uppercase text-[#112a1f] m-0 tracking-wide">Historial de Campeones</h3></div>
                  <table className="w-full border-collapse font-sans">
                    <thead><tr><th className="bg-white py-3 px-4 text-center border-b border-[#d1e0d7] font-bold text-[#6b7280] text-[12px] w-[100px]">Torneo</th><th className="bg-white py-3 px-4 text-left border-b border-[#d1e0d7] font-bold text-[#6b7280] text-[12px]">Campeón</th></tr></thead>
                    <tbody>{historial_datos.map((row, i) => (
                      <tr key={i} className={`hover:bg-[#f8fbf9] border-b border-[#f0f4f2] transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-[#fdfdfd]'}`}>
                        <td className="py-[16px] px-4 font-black text-[#112a1f] text-[13px] text-center border-r border-[#f0f4f2]">{row.Año}</td>
                        <td className="py-[16px] px-6 text-left flex items-center justify-between">
                          <div className="flex items-center gap-3 font-bold text-[#112a1f] text-[13px]">
                            <img src={logos[row.Campeón] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} className="w-[20px] h-[20px] object-contain drop-shadow-sm" />
                            <span>{row.Campeón}</span>
                          </div>
                          {['2018', '2013', '2023'].includes(row.Año) && (
                            <button 
                              onClick={() => { setVistaMenuLateral('LIGA1'); setTemporada(row.Año); setFecha(row.Año === '2013' ? 48 : (row.Año === '2023' ? 1 : 44)); setTabTop('fixture'); setEquipoSeleccionado(null); }}
                              className="bg-[#e5eee9] hover:bg-[#8cc63f] text-[#112a1f] hover:text-white font-bold text-[10px] px-4 py-1.5 rounded-md border border-[#8cc63f]/30 hover:border-[#8cc63f] shadow-sm outline-none transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <span>VER AÑO</span> <span className="text-[8px]">▶</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
                <div className="bg-white border border-[#d1e0d7] rounded-xl shadow-sm overflow-hidden sticky top-24 mt-4">
                  <div className="bg-[#f8fbf9] p-4 text-center border-b border-[#d1e0d7]"><h3 className="text-[16px] font-black uppercase text-[#112a1f] m-0 tracking-wide">Ranking de Ligas</h3></div>
                  <table className="w-full border-collapse font-sans">
                    <thead><tr><th className="bg-white py-3 px-6 text-left border-b border-[#d1e0d7] font-bold text-[#6b7280] text-[12px]">Equipo</th><th className="bg-white py-3 px-4 text-center border-b border-[#d1e0d7] font-bold text-[#6b7280] text-[12px] w-[80px]">Títulos</th></tr></thead>
                    <tbody>{ranking_datos.map((row, i) => (
                      <tr key={i} className={`hover:bg-[#f8fbf9] border-b border-[#f0f4f2] transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-[#fdfdfd]'}`}>
                        <td className="py-[16px] px-6 text-left flex items-center gap-3 font-bold text-[#112a1f] text-[13px]">
                          <img src={logos[row.Equipo] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} className="w-[20px] h-[20px] object-contain drop-shadow-sm" />
                          <span>{row.Equipo}</span>
                        </td>
                        <td className="py-[16px] px-4 text-center font-black text-[#112a1f] text-[14px] bg-[#f8fbf9] border-l border-[#f0f4f2]">{row.Títulos}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

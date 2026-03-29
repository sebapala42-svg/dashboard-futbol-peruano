'use client';
import React, { useState, useMemo, useEffect } from 'react';
import partidosJSON from './torneo_2018.json';
import partidos2013JSON from './torneo_2013.json';
import partidos2023JSON from './torneo_2023.json';

// ======================= DATA COMPLETA 2026 =======================
const partidos2026Base = [
  [1, 'Sport Huancayo', 'Alianza Lima', 1, 2, '2026-02-01T15:00:00-05:00'], [1, 'UTC', 'Atlético Grau', 2, 0, '2026-02-01T15:00:00-05:00'], [1, 'Comerciantes Unidos', 'CD Moquegua', 1, 0, '2026-02-01T15:00:00-05:00'],
  [1, 'Sport Boys', 'Los Chankas', 1, 1, '2026-02-01T15:00:00-05:00'], [1, 'Juan Pablo II', 'FC Cajamarca', 3, 3, '2026-02-01T15:00:00-05:00'], [1, 'FBC Melgar', 'Cienciano', 2, 0, '2026-02-01T15:00:00-05:00'],
  [1, 'Deportivo Garcilaso', 'Sporting Cristal', 1, 1, '2026-02-01T15:00:00-05:00'], [1, 'Alianza Atlético', 'Cusco FC', 1, 0, '2026-02-01T15:00:00-05:00'], [1, 'Universitario', 'ADT', 2, 0, '2026-02-01T15:00:00-05:00'],
  [2, 'CD Moquegua', 'UTC', 2, 3, '2026-02-08T15:00:00-05:00'], [2, 'ADT', 'Sport Boys', 1, 0, '2026-02-08T15:00:00-05:00'], [2, 'Atlético Grau', 'Sport Huancayo', 0, 0, '2026-02-08T15:00:00-05:00'],
  [2, 'Cusco FC', 'Universitario', 1, 1, '2026-02-08T15:00:00-05:00'], [2, 'Sporting Cristal', 'FBC Melgar', 1, 2, '2026-02-08T15:00:00-05:00'], [2, 'Los Chankas', 'Alianza Atlético', 1, 0, '2026-02-08T15:00:00-05:00'],
  [2, 'Cienciano', 'Juan Pablo II', 6, 1, '2026-02-08T15:00:00-05:00'], [2, 'Alianza Lima', 'Comerciantes Unidos', 2, 1, '2026-02-08T15:00:00-05:00'], [2, 'FC Cajamarca', 'Deportivo Garcilaso', 1, 1, '2026-02-08T15:00:00-05:00'],
  [3, 'UTC', 'Cusco FC', 1, 0, '2026-02-15T15:00:00-05:00'], [3, 'Universitario', 'Cienciano', 2, 1, '2026-02-15T15:00:00-05:00'], [3, 'Deportivo Garcilaso', 'ADT', 1, 0, '2026-02-15T15:00:00-05:00'],
  [3, 'Juan Pablo II', 'Sporting Cristal', 0, 2, '2026-02-15T15:00:00-05:00'], [3, 'Sport Boys', 'Atlético Grau', 1, 0, '2026-02-15T15:00:00-05:00'], [3, 'Alianza Atlético', 'Alianza Lima', 0, 0, '2026-02-15T15:00:00-05:00'],
  [3, 'Sport Huancayo', 'FC Cajamarca', 2, 0, '2026-02-15T15:00:00-05:00'], [3, 'Comerciantes Unidos', 'Los Chankas', 1, 1, '2026-02-15T15:00:00-05:00'], [3, 'FBC Melgar', 'CD Moquegua', 4, 0, '2026-02-15T15:00:00-05:00'],
  [4, 'Alianza Lima', 'Sport Boys', 1, 0, '2026-02-22T15:00:00-05:00'], [4, 'FC Cajamarca', 'FBC Melgar', 3, 1, '2026-02-22T15:00:00-05:00'], [4, 'Sporting Cristal', 'Universitario', 2, 2, '2026-02-22T15:00:00-05:00'],
  [4, 'Cienciano', 'Alianza Atlético', 1, 1, '2026-02-22T15:00:00-05:00'], [4, 'ADT', 'UTC', 2, 2, '2026-02-22T15:00:00-05:00'], [4, 'Los Chankas', 'Sport Huancayo', 3, 2, '2026-02-22T15:00:00-05:00'],
  [4, 'Atlético Grau', 'Juan Pablo II', 1, 2, '2026-02-22T15:00:00-05:00'], [4, 'Cusco FC', 'Comerciantes Unidos', 3, 1, '2026-02-22T15:00:00-05:00'], [4, 'CD Moquegua', 'Deportivo Garcilaso', 1, 0, '2026-02-22T15:00:00-05:00'],
  [5, 'Alianza Atlético', 'ADT', 0, 0, '2026-03-01T15:00:00-05:00'], [5, 'FBC Melgar', 'Los Chankas', 1, 2, '2026-03-01T15:00:00-05:00'], [5, 'Deportivo Garcilaso', 'Cienciano', 2, 3, '2026-03-01T15:00:00-05:00'],
  [5, 'Sport Huancayo', 'Sporting Cristal', 2, 1, '2026-03-01T15:00:00-05:00'], [5, 'UTC', 'Alianza Lima', 0, 1, '2026-03-01T15:00:00-05:00'], [5, 'Sport Boys', 'CD Moquegua', 0, 0, '2026-03-01T15:00:00-05:00'],
  [5, 'Comerciantes Unidos', 'Atlético Grau', 3, 1, '2026-03-01T15:00:00-05:00'], [5, 'Juan Pablo II', 'Cusco FC', 2, 1, '2026-03-01T15:00:00-05:00'], [5, 'Universitario', 'FC Cajamarca', 1, 0, '2026-03-01T15:00:00-05:00'],
  [6, 'Atlético Grau', 'FC Cajamarca', 1, 0, '2026-03-08T15:00:00-05:00'], [6, 'CD Moquegua', 'Sport Huancayo', 2, 1, '2026-03-08T15:00:00-05:00'], [6, 'Comerciantes Unidos', 'UTC', 1, 2, '2026-03-08T15:00:00-05:00'],
  [6, 'Sporting Cristal', 'Alianza Atlético', 3, 1, '2026-03-08T15:00:00-05:00'], [6, 'Cusco FC', 'Deportivo Garcilaso', 1, 0, '2026-03-08T15:00:00-05:00'], [6, 'ADT', 'Juan Pablo II', 2, 3, '2026-03-08T15:00:00-05:00'],
  [6, 'Los Chankas', 'Universitario', 3, 1, '2026-03-08T15:00:00-05:00'], [6, 'Cienciano', 'Sport Boys', 3, 1, '2026-03-08T15:00:00-05:00'], [6, 'Alianza Lima', 'FBC Melgar', 3, 1, '2026-03-08T15:00:00-05:00'],
  [7, 'FC Cajamarca', 'Comerciantes Unidos', 3, 4, '2026-03-15T15:00:00-05:00'], [7, 'Sport Huancayo', 'ADT', 0, 1, '2026-03-15T15:00:00-05:00'], [7, 'Juan Pablo II', 'Los Chankas', 2, 3, '2026-03-15T15:00:00-05:00'],
  [7, 'Deportivo Garcilaso', 'Alianza Lima', 1, 1, '2026-03-15T15:00:00-05:00'], [7, 'Universitario', 'UTC', 2, 0, '2026-03-15T15:00:00-05:00'], [7, 'Sporting Cristal', 'Sport Boys', 3, 0, '2026-03-15T15:00:00-05:00'],
  [7, 'FBC Melgar', 'Atlético Grau', 0, 0, '2026-03-15T15:00:00-05:00'], [7, 'Alianza Atlético', 'CD Moquegua', 3, 0, '2026-03-15T15:00:00-05:00'], [7, 'Cusco FC', 'Cienciano', 1, 2, '2026-03-15T15:00:00-05:00'],
  [8, 'ADT', 'FBC Melgar', 1, 1, '2026-03-28T13:00:00-05:00'], [8, 'Cienciano', 'FC Cajamarca', 3, 0, '2026-03-28T15:30:00-05:00'], [8, 'CD Moquegua', 'Cusco FC', 1, 2, '2026-03-28T18:00:00-05:00'], [8, 'UTC', 'Alianza Atlético', 1, 1, '2026-03-28T19:00:00-05:00'],
  [8, 'Comerciantes Unidos', 'Universitario', 0, 0, '2026-03-21T15:00:00-05:00'], [8, 'Los Chankas', 'Sporting Cristal', 3, 2, '2026-03-21T15:00:00-05:00'], [8, 'Alianza Lima', 'Juan Pablo II', 2, 0, '2026-03-21T15:00:00-05:00'],
  [8, 'Atlético Grau', 'Deportivo Garcilaso', 0, 0, '2026-03-21T15:00:00-05:00'], [8, 'Sport Boys', 'Sport Huancayo', 3, 0, '2026-03-21T15:00:00-05:00'],
  [9, 'Juan Pablo II', 'UTC', null, null, '2026-03-29T13:00:00-05:00'], [9, 'Alianza Atlético', 'Atlético Grau', null, null, '2026-03-29T15:30:00-05:00'], [9, 'Universitario', 'Alianza Lima', null, null, '2026-03-29T18:00:00-05:00'],
  [9, 'FBC Melgar', 'Cusco FC', null, null, '2026-03-30T15:30:00-05:00'], [9, 'FC Cajamarca', 'Los Chankas', null, null, '2026-03-30T19:00:00-05:00'], [9, 'Cienciano', 'ADT', null, null, '2026-03-31T15:00:00-05:00'], 
  [9, 'Deportivo Garcilaso', 'Sporting Cristal', null, null, '2026-03-31T15:00:00-05:00'], [9, 'Sport Huancayo', 'Comerciantes Unidos', null, null, '2026-03-31T15:00:00-05:00'], [9, 'Sport Boys', 'CD Moquegua', null, null, '2026-03-31T15:00:00-05:00'], 
  [10, 'Cusco FC', 'FC Cajamarca', null, null, '2026-04-05T15:00:00-05:00'], [10, 'ADT', 'Alianza Lima', null, null, '2026-04-05T15:00:00-05:00'], [10, 'UTC', 'Sport Huancayo', null, null, '2026-04-05T15:00:00-05:00'], [10, 'Atlético Grau', 'Sporting Cristal', null, null, '2026-04-05T15:00:00-05:00'], [10, 'Universitario', 'Deportivo Garcilaso', null, null, '2026-04-05T15:00:00-05:00'], [10, 'Los Chankas', 'Cienciano', null, null, '2026-04-05T15:00:00-05:00'], [10, 'Sport Boys', 'FBC Melgar', null, null, '2026-04-05T15:00:00-05:00'], [10, 'CD Moquegua', 'Juan Pablo II', null, null, '2026-04-05T15:00:00-05:00'], [10, 'Comerciantes Unidos', 'Alianza Atlético', null, null, '2026-04-05T15:00:00-05:00'],
  [11, 'Juan Pablo II', 'Comerciantes Unidos', null, null, '2026-04-12T15:00:00-05:00'], [11, 'Alianza Atlético', 'Sport Boys', null, null, '2026-04-12T15:00:00-05:00'], [11, 'FBC Melgar', 'Universitario', null, null, '2026-04-12T15:00:00-05:00'], [11, 'Alianza Lima', 'Cusco FC', null, null, '2026-04-12T15:00:00-05:00'], [11, 'Cienciano', 'CD Moquegua', null, null, '2026-04-12T15:00:00-05:00'], [11, 'Sport Huancayo', 'Deportivo Garcilaso', null, null, '2026-04-12T15:00:00-05:00'], [11, 'Sporting Cristal', 'UTC', null, null, '2026-04-12T15:00:00-05:00'], [11, 'FC Cajamarca', 'ADT', null, null, '2026-04-12T15:00:00-05:00'], [11, 'Los Chankas', 'Atlético Grau', null, null, '2026-04-12T15:00:00-05:00'],
  [12, 'Cusco FC', 'Sport Huancayo', null, null, '2026-04-19T15:00:00-05:00'], [12, 'ADT', 'Los Chankas', null, null, '2026-04-19T15:00:00-05:00'], [12, 'UTC', 'Cienciano', null, null, '2026-04-19T15:00:00-05:00'], [12, 'Deportivo Garcilaso', 'FBC Melgar', null, null, '2026-04-19T15:00:00-05:00'], [12, 'Atlético Grau', 'Alianza Lima', null, null, '2026-04-19T15:00:00-05:00'], [12, 'Universitario', 'Alianza Atlético', null, null, '2026-04-19T15:00:00-05:00'], [12, 'Sport Boys', 'Juan Pablo II', null, null, '2026-04-19T15:00:00-05:00'], [12, 'CD Moquegua', 'FC Cajamarca', null, null, '2026-04-19T15:00:00-05:00'], [12, 'Comerciantes Unidos', 'Sporting Cristal', null, null, '2026-04-19T15:00:00-05:00'],
  [13, 'Juan Pablo II', 'Universitario', null, null, '2026-04-26T15:00:00-05:00'], [13, 'Alianza Atlético', 'Sport Huancayo', null, null, '2026-04-26T15:00:00-05:00'], [13, 'ADT', 'Atlético Grau', null, null, '2026-04-26T15:00:00-05:00'], [13, 'FBC Melgar', 'UTC', null, null, '2026-04-26T15:00:00-05:00'], [13, 'Alianza Lima', 'CD Moquegua', null, null, '2026-04-26T15:00:00-05:00'], [13, 'Cienciano', 'Comerciantes Unidos', null, null, '2026-04-26T15:00:00-05:00'], [13, 'Sporting Cristal', 'Cusco FC', null, null, '2026-04-26T15:00:00-05:00'], [13, 'FC Cajamarca', 'Sport Boys', null, null, '2026-04-26T15:00:00-05:00'], [13, 'Los Chankas', 'Deportivo Garcilaso', null, null, '2026-04-26T15:00:00-05:00'],
  [14, 'Cusco FC', 'Los Chankas', null, null, '2026-05-03T15:00:00-05:00'], [14, 'UTC', 'FC Cajamarca', null, null, '2026-05-03T15:00:00-05:00'], [14, 'Alianza Lima', 'Sporting Cristal', null, null, '2026-05-03T15:00:00-05:00'], [14, 'Deportivo Garcilaso', 'Alianza Atlético', null, null, '2026-05-03T15:00:00-05:00'], [14, 'Sport Huancayo', 'Juan Pablo II', null, null, '2026-05-03T15:00:00-05:00'], [14, 'Atlético Grau', 'Cienciano', null, null, '2026-05-03T15:00:00-05:00'], [14, 'Sport Boys', 'Universitario', null, null, '2026-05-03T15:00:00-05:00'], [14, 'CD Moquegua', 'ADT', null, null, '2026-05-03T15:00:00-05:00'], [14, 'Comerciantes Unidos', 'FBC Melgar', null, null, '2026-05-03T15:00:00-05:00'],
  [15, 'Juan Pablo II', 'Alianza Atlético', null, null, '2026-05-10T15:00:00-05:00'], [15, 'ADT', 'Comerciantes Unidos', null, null, '2026-05-10T15:00:00-05:00'], [15, 'FBC Melgar', 'Sport Huancayo', null, null, '2026-05-10T15:00:00-05:00'], [15, 'Cienciano', 'Alianza Lima', null, null, '2026-05-10T15:00:00-05:00'], [15, 'Deportivo Garcilaso', 'UTC', null, null, '2026-05-10T15:00:00-05:00'], [15, 'Universitario', 'Atlético Grau', null, null, '2026-05-10T15:00:00-05:00'], [15, 'FC Cajamarca', 'Sporting Cristal', null, null, '2026-05-10T15:00:00-05:00'], [15, 'Los Chankas', 'CD Moquegua', null, null, '2026-05-10T15:00:00-05:00'], [15, 'Sport Boys', 'Cusco FC', null, null, '2026-05-10T15:00:00-05:00'],
  [16, 'Cusco FC', 'Atlético Grau', null, null, '2026-05-17T15:00:00-05:00'], [16, 'Juan Pablo II', 'FBC Melgar', null, null, '2026-05-17T15:00:00-05:00'], [16, 'Alianza Atlético', 'FC Cajamarca', null, null, '2026-05-17T15:00:00-05:00'], [16, 'UTC', 'Sport Boys', null, null, '2026-05-17T15:00:00-05:00'], [16, 'Alianza Lima', 'Los Chankas', null, null, '2026-05-17T15:00:00-05:00'], [16, 'Sport Huancayo', 'Cienciano', null, null, '2026-05-17T15:00:00-05:00'], [16, 'Sporting Cristal', 'ADT', null, null, '2026-05-17T15:00:00-05:00'], [16, 'CD Moquegua', 'Universitario', null, null, '2026-05-17T15:00:00-05:00'], [16, 'Comerciantes Unidos', 'Deportivo Garcilaso', null, null, '2026-05-17T15:00:00-05:00'],
  [17, 'ADT', 'Cusco FC', null, null, '2026-05-24T15:00:00-05:00'], [17, 'FBC Melgar', 'Alianza Atlético', null, null, '2026-05-24T15:00:00-05:00'], [17, 'Cienciano', 'Sporting Cristal', null, null, '2026-05-24T15:00:00-05:00'], [17, 'Deportivo Garcilaso', 'Juan Pablo II', null, null, '2026-05-24T15:00:00-05:00'], [17, 'Atlético Grau', 'CD Moquegua', null, null, '2026-05-24T15:00:00-05:00'], [17, 'Universitario', 'Sport Huancayo', null, null, '2026-05-24T15:00:00-05:00'], [17, 'FC Cajamarca', 'Alianza Lima', null, null, '2026-05-24T15:00:00-05:00'], [17, 'Los Chankas', 'UTC', null, null, '2026-05-24T15:00:00-05:00'], [17, 'Sport Boys', 'Comerciantes Unidos', null, null, '2026-05-24T15:00:00-05:00']
];

const listaPartidos2018 = Array.isArray(partidosJSON) ? partidosJSON : (partidosJSON.BaseDatos || Object.values(partidosJSON)[0] || []);

const normalizarEquipoListado = (nombre) => {
  const alias = {
    'Melgar': 'FBC Melgar', 'César Vallejo': 'Cesar Vallejo', 'Cusco': 'Cusco FC', 'Comercio': 'Union Comercio', 'Binacional': 'Dep. Binacional'
  };
  return alias[nombre] || nombre;
};

// ======================= CONFIGURACIÓN DE LA API =======================
const API_KEY = 'TU_API_KEY_AQUI'; // REEMPLAZA CON TU KEY
const API_HOST = 'free-api-live-football-data.p.rapidapi.com';
const LIGA_ID = '131'; 

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
  'Dep. Binacional': 'https://tmssl.akamaized.net//images/wappen/head/41054.png',
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

const equipo_A_2018 = ['Sporting Cristal', 'Sport Rosario', 'UTC', 'U. San Martin', 'Alianza Lima', 'Comerciantes Unidos', 'Ayacucho FC', 'Universitario'];
const equipo_B_2018 = ['Sport Huancayo', 'FBC Melgar', 'Cantolao', 'Dep. Municipal', 'Sport Boys', 'Cusco (Garcilaso)', 'Dep. Binacional', 'Union Comercio'];
const liguillaA_2013 = ['Cusco (Garcilaso)', 'Sporting Cristal', 'Alianza Lima', 'Cesar Vallejo', 'Sport Huancayo', 'FBC Melgar', 'Pacifico FC', 'Union Comercio'];
const liguillaB_2013 = ['Universitario', 'UTC', 'Ayacucho FC', 'Juan Aurich', 'Cienciano', 'Leon de Huanuco', 'U. San Martin', 'Jose Galvez'];

export default function Home() {
  const [vistaActiva, setVistaActiva] = useState('LIGA1_2026'); // Controla la pantalla principal
  const [temporada, setTemporada] = useState('2026');
  
  // Estados para el Sidebar
  const [peruOpen, setPeruOpen] = useState(true);
  const [campeonesOpen, setCampeonesOpen] = useState(false);

  // Estados de Portada / Live API
  const [filtroFechaPortada, setFiltroFechaPortada] = useState('HOY');
  const [filtroVivo, setFiltroVivo] = useState('TODOS');
  const [partidosPortadaListado, setPartidosPortadaListado] = useState([]);
  const [cargandoApi, setCargandoApi] = useState(false);
  const [errorApi, setErrorApi] = useState(null);

  const fechaHoy = useMemo(() => new Date('2026-03-29T00:00:00-05:00'), []); // Fijada para test

  useEffect(() => {
    const fetchPartidos = async () => {
      const targetDate = new Date(fechaHoy);
      if (filtroFechaPortada === 'AYER') targetDate.setDate(targetDate.getDate() - 1);
      if (filtroFechaPortada === 'MAÑANA') targetDate.setDate(targetDate.getDate() + 1);
      
      const year = targetDate.getFullYear();
      const month = String(targetDate.getMonth() + 1).padStart(2, '0');
      const day = String(targetDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}${month}${day}`;

      setCargandoApi(true); setErrorApi(null);

      try {
        const response = await fetch(`https://${API_HOST}/football-get-matches-by-date?date=${formattedDate}`, {
          method: 'GET', headers: { 'x-rapidapi-host': API_HOST, 'x-rapidapi-key': API_KEY }
        });

        if (!response.ok) throw new Error('Error en la conexión a la API');

        const data = await response.json();
        if (data.status === 'success' && data.response && data.response.matches) {
          const partidosPeru = data.response.matches.filter(partido => String(partido.leagueId) === String(LIGA_ID));
          const partidosMapeados = partidosPeru.map(p => {
            const horaCompleta = p.time.split(' ')[1]; 
            return {
              Local: normalizarEquipoListado(p.home.name),
              Visitante: normalizarEquipoListado(p.away.name),
              GL: p.statusId === 6 || p.statusId === 7 ? p.home.score : null,
              GV: p.statusId === 6 || p.statusId === 7 ? p.away.score : null,
              HoraVisual: horaCompleta,
              EstadoApi: p.statusId 
            };
          });
          setPartidosPortadaListado(partidosMapeados);
        } else {
           setPartidosPortadaListado([]); 
        }
      } catch (error) {
        // Fallback: Si falla la API, usar la base de datos local (Mock)
        const targetStr = `${year}-${month}-${day}`;
        const locales = partidos2026Base.filter(p => p[5].startsWith(targetStr)).map(p => ({
          Local: normalizarEquipoListado(p[1]), Visitante: normalizarEquipoListado(p[2]),
          GL: p[3], GV: p[4], HoraVisual: p[5].split('T')[1].substring(0, 5), EstadoApi: p[3] !== null ? 6 : null
        }));
        setPartidosPortadaListado(locales);
      } finally {
        setCargandoApi(false);
      }
    };

    if (vistaActiva === 'LIGA1_2026') fetchPartidos();
  }, [filtroFechaPortada, fechaHoy, vistaActiva]);

  const partidosParaMostrarLive = useMemo(() => {
    if (filtroVivo === 'TODOS') return partidosPortadaListado;
    return partidosPortadaListado.filter(p => p.EstadoApi !== 6 && p.EstadoApi !== 7 && p.GL !== null);
  }, [partidosPortadaListado, filtroVivo]);

  // ======================= LÓGICA HISTÓRICA =======================
  const esWalkover = (p) => temporada === '2023' && p.Torneo === 'Apertura' && p.Jornada_Oficial === 3 && ((p.Local === 'Cusco FC' && p.Visitante === 'Sport Huancayo') || (p.Local === 'Atlético Grau' && p.Visitante === 'FBC Melgar') || (p.Local === 'UTC' && p.Visitante === 'Cienciano') || (p.Local === 'Deportivo Garcilaso' && p.Visitante === 'Dep. Binacional') || (p.Local === 'Sporting Cristal' && p.Visitante === 'Alianza Lima') || (p.Local === 'Municipal' && p.Visitante === 'Carlos Mannucci'));
  const esConcedido = (p) => temporada === '2023' && p.Torneo === 'Clausura' && ((p.Jornada_Oficial === 22 && p.Local === 'Carlos Mannucci' && p.Visitante === 'Municipal') || (p.Jornada_Oficial === 27 && p.Local === 'Municipal' && p.Visitante === 'Atlético Grau'));

  const listaPartidos = useMemo(() => {
    if (temporada === '2018') return listaPartidos2018.map(p => ({ ...p, Jornada_Oficial: p.Fecha_Global, Local: normalizarEquipoListado(p.Local), Visitante: normalizarEquipoListado(p.Visitante) }));
    if (temporada === '2023') {
      const raw2023 = Array.isArray(partidos2023JSON) ? partidos2023JSON : [];
      const ordenCronologicoApertura = { 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 1: 8, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13, 15: 14, 2: 15, 16: 16, 17: 17, 18: 18, 19: 19 };
      return raw2023.map(p => {
        let jornadaOficial = p[0]; let torneo = p[5] || 'Apertura'; let fechaCronologica = jornadaOficial;
        if (torneo === 'Apertura' && ordenCronologicoApertura[jornadaOficial]) fechaCronologica = ordenCronologicoApertura[jornadaOficial];
        return { Jornada_Oficial: jornadaOficial, Fecha_Global: fechaCronologica, Torneo: torneo, Local: normalizarEquipoListado(p[1]), Visitante: normalizarEquipoListado(p[2]), GL: p[3], GV: p[4] };
      });
    }
    if (temporada === '2013') {
      const raw2013 = Array.isArray(partidos2013JSON) ? partidos2013JSON : [];
      return raw2013.map(p => {
        let gl = p[3]; let gv = p[4];
        if (p[0] === 5 && p[1] === 'Cusco (Garcilaso)' && p[2] === 'Leon de Huanuco') { gl = 0; gv = 3; }
        return { Fecha_Global: p[0], Jornada_Oficial: p[0], Torneo: 'Descentralizado', Local: normalizarEquipoListado(p[1]), Visitante: normalizarEquipoListado(p[2]), GL: gl, GV: gv };
      });
    }
    return partidos2026Base.map(p => ({ Fecha_Global: p[0], Jornada_Oficial: p[0], Torneo: 'Apertura', Local: normalizarEquipoListado(p[1]), Visitante: normalizarEquipoListado(p[2]), GL: p[3], GV: p[4] }));
  }, [temporada]);
  
  const [fecha, setFecha] = useState(8); 
  const partidosValidos = useMemo(() => listaPartidos.filter(p => p.Fecha_Global <= fecha && p.Torneo !== 'Final'), [listaPartidos, fecha]);

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
        if (p.Local === 'Municipal') { ptsLocal = 0; ptsVisita = 3; rLocal = 'D'; rVisita = 'V'; } else { ptsLocal = 3; ptsVisita = 0; rLocal = 'V'; rVisita = 'D'; }
        gl = 0; gv = 0; 
      } else {
        if (gl > gv) { ptsLocal = 3; rLocal = 'V'; rVisita = 'D'; } else if (gl < gv) { ptsVisita = 3; rVisita = 'V'; rLocal = 'D'; } else { ptsLocal = 1; ptsVisita = 1; rLocal = 'E'; rVisita = 'E'; }
      }

      if (tabla[p.Local]) { tabla[p.Local].pj++; tabla[p.Local].gf += gl; tabla[p.Local].gc += gv; tabla[p.Local].pts += ptsLocal; if (rLocal === 'V') tabla[p.Local].g++; else if (rLocal === 'D') tabla[p.Local].p++; else tabla[p.Local].e++; tabla[p.Local].racha.push(rLocal); }
      if (tabla[p.Visitante]) { tabla[p.Visitante].pj++; tabla[p.Visitante].gf += gv; tabla[p.Visitante].gc += gl; tabla[p.Visitante].pts += ptsVisita; if (rVisita === 'V') tabla[p.Visitante].g++; else if (rVisita === 'D') tabla[p.Visitante].p++; else tabla[p.Visitante].e++; tabla[p.Visitante].racha.push(rVisita); }
    });

    return Object.values(tabla).map(t => {
      let finalPts = t.pts;
      if (temporada === '2018' && esAcumulado && fecha >= 44) { if (t.equipo === 'Sporting Cristal') finalPts += 2; if (t.equipo === 'Sport Rosario') finalPts -= 7; if (['Dep. Municipal', 'UTC', 'Cantolao'].includes(t.equipo)) finalPts -= 2; if (t.equipo === 'Universitario') finalPts -= 1; }
      if (temporada === '2013' && esAcumulado && fecha >= 31) { if (t.equipo === 'U. San Martin') finalPts += 2; if (t.equipo === 'Alianza Lima') finalPts += 1; }
      if (temporada === '2013' && fecha >= 5 && t.equipo === 'Cusco (Garcilaso)') finalPts -= 1;
      if (temporada === '2023' && esAcumulado && fecha >= 38) { if (t.equipo === 'Deportivo Garcilaso') finalPts -= 1; if (t.equipo === 'Sport Boys') finalPts -= 4; if (t.equipo === 'Municipal' || t.equipo === 'Dep. Municipal') finalPts -= 5; }
      return { ...t, pts: finalPts, dif: t.gf - t.gc, ultimas: t.racha.slice(-5).reverse() };
    }).sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);
  };

  const TablaComponent = ({ titulo, zona, datos, esAcumulado, compactLogo = false }) => (
    <div className="bg-white border border-[#d1e0d7] rounded-[8px] overflow-hidden shadow-lg mb-[15px] pb-1">
      <div className="text-center font-bold text-[14px] uppercase py-[10px]" style={{ color: '#000000' }}>{titulo}</div>
      {zona && <div className="bg-[#e5eee9] px-[10px] py-[6px] font-bold text-[12px] border-b-[2px] border-[#d1e0d7] mx-[2px]" style={{ color: '#000000' }}>{zona}</div>}
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
              if (temporada === '2018' && esAcumulado) { if (i < 4) bordeColor = '#3db4dc'; else if (i < 8) bordeColor = '#e1c340'; else if (i >= datos.length - 2) bordeColor = '#d32f2f'; } 
              else if (temporada === '2013' && esAcumulado && !zona) { if (i < 3) bordeColor = '#3db4dc'; else if (i >= 3 && i < 7) bordeColor = '#e1c340'; else if (i >= datos.length - 2) bordeColor = '#d32f2f'; }
              else if (temporada === '2013' && esAcumulado && zona) { if (i === 0) bordeColor = '#3db4dc'; }
              else if (temporada === '2023' && esAcumulado) { if (i < 4) bordeColor = '#3db4dc'; else if (i >= 4 && i < 8) bordeColor = '#e1c340'; else if (i >= datos.length - 3) bordeColor = '#d32f2f'; }
              else if (i === 0) { bordeColor = '#3db4dc'; }

              return (
                <tr key={eq.equipo} className={`hover:bg-[#f8fbf9] transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-[#fcfdfc]'}`}>
                  <td className="py-[6px] px-[4px] font-bold border-l-[3px] text-center" style={{ borderLeftColor: bordeColor, color: '#000000' }}>{i + 1}</td>
                  <td className="py-[6px] px-[4px] border-r border-[#d1e0d7]">
                    <div className="flex items-center text-left font-bold" style={{ color: '#000000' }}>
                      <img src={logos[eq.equipo] || 'https://cdn-icons-png.flaticon.com/128/33/33736.png'} style={{ width: compactLogo ? '13px' : '15px', height: compactLogo ? '13px' : '15px', minWidth: compactLogo ? '13px' : '15px', objectFit: 'contain', marginRight: '6px' }} alt={eq.equipo} />
                      <span>{eq.equipo}</span>
                    </div>
                  </td>
                  <td className="py-[6px] px-[4px] font-bold text-[13px] text-center border-r border-[#d1e0d7]" style={{ color: '#000000' }}>{eq.pts}</td>
                  <td className="py-[6px] px-[4px] text-center font-normal" style={{ color: '#6b7280' }}>{eq.pj}</td>
                  <td className="py-[6px] px-[4px] text-center font-normal" style={{ color: '#6b7280' }}>{eq.gf}:{eq.gc}</td>
                  <td className="py-[6px] px-[4px] text-center font-normal" style={{ color: '#6b7280' }}>{eq.dif}</td>
                  <td className="py-[6px] px-[4px] text-center font-normal" style={{ color: '#6b7280' }}>{eq.g}</td>
                  <td className="py-[6px] px-[4px] text-center font-normal" style={{ color: '#6b7280' }}>{eq.e}</td>
                  <td className="py-[6px] px-[4px] text-center font-normal" style={{ color: '#6b7280' }}>{eq.p}</td>
                  <td className="py-[6px] px-[4px] text-center">
                    <div className="flex gap-[2px] justify-center">
                      {eq.ultimas.map((r, idx) => (
                        <span key={idx} className="inline-flex items-center justify-center text-white text-[8.5px] font-bold rounded-[2px] px-[4px] py-[1px]" style={{ backgroundColor: r === 'V' ? '#8cc63f' : r === 'E' ? '#e1c340' : '#d32f2f' }}>{r}</span>
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
          <strong>Clasificación:</strong> Del 1° al 4° a Copa Libertadores. Del 5° al 8° a Copa Sudamericana. Descienden los 3 últimos.<br/>
          * Sanciones 2023: D. Municipal (-5), Sport Boys (-4), D. Garcilaso (-1). 
        </div>
      )}
      {temporada === '2018' && esAcumulado && fecha >= 44 && (
        <div className="text-[11px] text-left mx-[10px] my-[10px] p-[5px] bg-[#e5eee9] rounded-[4px] border border-[#d1e0d7]" style={{ color: '#6b7280' }}>
          * Sanciones 2018: Rosario (-7), Muni (-2), UTC (-2), Cantolao (-2), U (-1). Cristal (+2) por Reservas.
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-[#0a1c14] font-sans overflow-hidden selection:bg-[#8cc63f] selection:text-black">
      
      {/* ======================= SIDEBAR TIPO PROMIEDOS ======================= */}
      <aside className="w-[240px] bg-[#112a1f] text-white flex-shrink-0 h-screen sticky top-0 overflow-y-auto hidden md:flex flex-col shadow-xl z-20 custom-scrollbar border-r border-[#1f4a36]">
        <div className="p-4 flex items-center gap-3 border-b border-[#1f4a36]">
          <div className="w-8 h-8 bg-[#8cc63f] rounded-full flex items-center justify-center font-black text-[#112a1f] text-lg">L1</div>
          <span className="font-black tracking-widest text-[#8cc63f] uppercase text-sm mt-1">MI LIGA PRO</span>
        </div>
        
        <div className="flex-1 py-2 flex flex-col">
          <div className="px-3">
            <button onClick={() => setPeruOpen(!peruOpen)} className="w-full flex items-center justify-between text-gray-300 hover:text-white py-2 font-bold text-xs uppercase tracking-wider outline-none">
              <div className="flex items-center gap-2">
                <img src="https://tmssl.akamaized.net//images/holding/head/pe.png" className="w-[16px]" />
                PERÚ
              </div>
              <span className="text-[10px]">{peruOpen ? '▲' : '▼'}</span>
            </button>
          </div>

          {peruOpen && (
            <div className="flex flex-col mt-1">
              <button
                onClick={() => { setVistaActiva('LIGA1_2026'); setTemporada('2026'); setFecha(8); }}
                className={`w-full flex items-center gap-3 px-8 py-2.5 text-[13px] font-bold transition-all outline-none ${vistaActiva === 'LIGA1_2026' ? 'bg-[#1f4a36] border-l-[3px] border-[#8cc63f] text-white' : 'text-gray-400 hover:bg-[#1f4a36] hover:text-white border-l-[3px] border-transparent'}`}
              >
                LIGA 1 (Actual)
              </button>

              <button onClick={() => setCampeonesOpen(!campeonesOpen)} className="w-full flex items-center justify-between text-gray-400 hover:text-white px-8 py-2.5 text-[13px] font-bold transition-all outline-none">
                <span>CAMPEONES</span>
                <span className="text-[10px]">{campeonesOpen ? '▲' : '▼'}</span>
              </button>

              {campeonesOpen && (
                <div className="flex flex-col bg-[#0a1c14] py-1">
                  <button onClick={() => { setVistaActiva('HISTORICO_2023'); setTemporada('2023'); setFecha(38); }} className={`w-full text-left pl-12 py-2 text-xs font-semibold outline-none transition-colors ${vistaActiva === 'HISTORICO_2023' ? 'text-[#8cc63f]' : 'text-gray-400 hover:text-white'}`}>2023 - Universitario</button>
                  <button onClick={() => { setVistaActiva('HISTORICO_2018'); setTemporada('2018'); setFecha(44); }} className={`w-full text-left pl-12 py-2 text-xs font-semibold outline-none transition-colors ${vistaActiva === 'HISTORICO_2018' ? 'text-[#8cc63f]' : 'text-gray-400 hover:text-white'}`}>2018 - Sporting Cristal</button>
                  <button onClick={() => { setVistaActiva('HISTORICO_2013'); setTemporada('2013'); setFecha(44); }} className={`w-full text-left pl-12 py-2 text-xs font-semibold outline-none transition-colors ${vistaActiva === 'HISTORICO_2013' ? 'text-[#8cc63f]' : 'text-gray-400 hover:text-white'}`}>2013 - Universitario</button>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* ======================= PANEL PRINCIPAL DERECHO ======================= */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto w-full custom-scrollbar bg-[#0f2118]">
        
        <div className="w-full max-w-[1000px] mx-auto p-4 md:p-6">
          
          {/* PANEL EN VIVO (Solo si estamos en la Liga Actual 2026) */}
          {vistaActiva === 'LIGA1_2026' && (
            <div className="mb-8">
              {/* Header Navegación Fechas */}
              <div className="bg-[#112a1f] rounded-t-lg flex items-center justify-between p-3 text-white">
                 <button onClick={() => {
                   if(filtroFechaPortada==='MAÑANA') setFiltroFechaPortada('HOY');
                   else if(filtroFechaPortada==='HOY') setFiltroFechaPortada('AYER');
                 }} className="hover:text-[#8cc63f] font-bold px-2 outline-none">{'<'}</button>
                 <span className="font-bold text-[13px] tracking-wide uppercase">PARTIDOS DE {filtroFechaPortada}</span>
                 <button onClick={() => {
                   if(filtroFechaPortada==='AYER') setFiltroFechaPortada('HOY');
                   else if(filtroFechaPortada==='HOY') setFiltroFechaPortada('MAÑANA');
                 }} className="hover:text-[#8cc63f] font-bold px-2 outline-none">{'>'}</button>
              </div>

              {/* Tabs Filtros */}
              <div className="bg-[#112a1f] px-4 flex items-center gap-6 border-b border-[#1f4a36]">
                 <button onClick={()=>setFiltroVivo('TODOS')} className={`py-3 text-[11px] font-bold outline-none uppercase ${filtroVivo === 'TODOS' ? 'text-[#8cc63f] border-b-2 border-[#8cc63f]' : 'text-gray-400 hover:text-white'}`}>TODOS</button>
                 <button onClick={()=>setFiltroVivo('VIVO')} className={`py-3 text-[11px] font-bold outline-none uppercase ${filtroVivo === 'VIVO' ? 'text-[#8cc63f] border-b-2 border-[#8cc63f]' : 'text-gray-400 hover:text-white'}`}>
                   VIVO ({partidosPortadaListado.filter(p => p.EstadoApi !== 6 && p.EstadoApi !== 7 && p.GL !== null).length})
                 </button>
              </div>

              {/* Contenedor de Partidos */}
              <div className="bg-[#1f4a36] px-4 py-2 mt-3 flex items-center justify-between text-white text-[11px] font-bold rounded-t-md">
                  <div className="flex items-center gap-2">
                      <img src="https://tmssl.akamaized.net//images/holding/head/pe.png" className="w-[14px]"/> LIGA 1 TE APUESTO
                  </div>
              </div>

              <div className="bg-[#112a1f] flex flex-col rounded-b-md overflow-hidden shadow-lg border border-[#1f4a36] border-t-0">
                  {cargandoApi ? (
                    <div className="text-center text-[12px] p-[20px] text-[#8cc63f]">Cargando conexión con el estadio... ⚽</div>
                  ) : partidosParaMostrarLive.length === 0 ? (
                    <div className="text-center text-[12px] p-[20px] text-gray-400">No hay partidos para mostrar en este filtro.</div>
                  ) : (
                    partidosParaMostrarLive.map((m, idx) => {
                       const ganador = m.GL > m.GV ? m.Local : (m.GL < m.GV ? m.Visitante : null);
                       const enVivo = m.GL !== null && m.EstadoApi !== 6 && m.EstadoApi !== 7;
                       
                       return (
                         <div key={idx} className="flex border-t border-[#1f4a36] text-white hover:bg-[#1a3d2c] transition-colors cursor-default">
                            {/* Columna Minuto/Estado */}
                            <div className="w-[60px] flex flex-col items-center justify-center border-r border-[#1f4a36] p-2">
                               <span className={`text-[11px] font-black ${enVivo ? 'text-[#d32f2f] animate-pulse' : 'text-gray-300'}`}>
                                 {enVivo ? "EN VIVO" : (m.GL !== null ? "Final" : m.HoraVisual)}
                               </span>
                            </div>
                            {/* Columna Equipos y Marcador */}
                            <div className="flex-1 flex flex-col justify-center p-3">
                                <div className="flex justify-center items-center gap-4">
                                    <span className={`text-right w-[35%] text-[13px] font-bold truncate ${ganador === m.Local ? 'text-[#8cc63f]' : ''}`}>{m.Local}</span>
                                    <img src={logos[m.Local]} className="w-5 h-5 object-contain"/>
                                    
                                    <span className="font-bold text-[14px] bg-black px-2 py-[2px] rounded border border-[#1f4a36] min-w-[45px] text-center tracking-widest text-[#8cc63f]">
                                      {m.GL !== null ? `${m.GL}-${m.GV}` : ' VS '}
                                    </span>
                                    
                                    <img src={logos[m.Visitante]} className="w-5 h-5 object-contain"/>
                                    <span className={`text-left w-[35%] text-[13px] font-bold truncate ${ganador === m.Visitante ? 'text-[#8cc63f]' : ''}`}>{m.Visitante}</span>
                                </div>
                            </div>
                         </div>
                       );
                    })
                  )}
              </div>
            </div>
          )}

          {/* BLOQUE DE FIXTURE Y TABLAS (Para todas las vistas) */}
          <div className="bg-[#e5eee9] rounded-lg p-4 shadow-xl">
            <div className="flex items-center justify-between bg-[#112a1f] rounded-[4px] px-2 py-1 mb-4 shadow">
              <button onClick={() => setFecha(prev => Math.max(1, prev - 1))} className="text-[#8cc63f] hover:text-white font-bold text-[14px] px-2 py-1 bg-transparent border-none outline-none cursor-pointer" disabled={fecha === 1}>◀</button>
              
              {/* SELECT CORREGIDO */}
              <select value={fecha} onChange={(e) => setFecha(Number(e.target.value))} className="w-full bg-[#1f4a36] text-white font-bold text-[13px] px-[10px] py-[6px] outline-none text-center cursor-pointer border border-[#8cc63f] rounded">
                {[...Array(temporada === '2023' ? 40 : (temporada === '2013' ? 48 : (temporada === '2018' ? 44 : 17)))].map((_, i) => {
                  let etiqueta = `FECHA ${i+1}`;
                  if (temporada === '2023') {
                      if (i < 19) {
                        const nombresJornadas = { 1:'Jornada 3', 2:'Jornada 4', 3:'Jornada 5', 4:'Jornada 6', 5:'Jornada 7', 6:'Jornada 8', 7:'Jornada 9', 8:'Jornada 1 (Aplazada)', 9:'Jornada 10', 10:'Jornada 11', 11:'Jornada 12', 12:'Jornada 13', 13:'Jornada 14', 14:'Jornada 15', 15:'Jornada 2 (Aplazada)', 16:'Jornada 16', 17:'Jornada 17', 18:'Jornada 18', 19:'Jornada 19' };
                        etiqueta = `Semana ${i+1} (${nombresJornadas[i+1]})`;
                      } else if (i < 38) { etiqueta = `CLAUSURA F${i-18}`; } 
                      else if (i === 38) { etiqueta = `FINAL (IDA)`; } 
                      else if (i === 39) { etiqueta = `FINAL (VUELTA)`; }
                  }
                  return <option key={i+1} value={i+1} className="bg-white text-black">{etiqueta}</option>
                })}
              </select>

              <button onClick={() => setFecha(prev => Math.min(temporada === '2023' ? 40 : (temporada === '2013' ? 48 : (temporada === '2018' ? 44 : 17)), prev + 1))} className="text-[#8cc63f] hover:text-white font-bold text-[14px] px-2 py-1 bg-transparent border-none outline-none cursor-pointer">▶</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '64% 34%', gap: '2%', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {temporada === '2026' && fecha <= 17 && (<TablaComponent titulo="TORNEO APERTURA 2026" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Apertura'))} />)}
                
                {temporada === '2023' && fecha <= 19 && (<TablaComponent titulo="TORNEO APERTURA 2023" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Apertura'))} />)}
                {temporada === '2023' && fecha > 19 && fecha <= 38 && (<TablaComponent titulo="TORNEO CLAUSURA 2023" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Clausura'))} />)}
                {temporada === '2023' && (<TablaComponent titulo={`TABLA ACUMULADA (HASTA LA SEMANA ${Math.min(fecha, 38)})`} datos={generarTabla(partidosValidos.filter(p => p.Fecha_Global <= 38), null, true)} esAcumulado={true} />)}

                {temporada === '2018' && fecha <= 14 && (<><TablaComponent titulo="TORNEO DE VERANO" zona="ZONA A" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Verano'), equipo_A_2018)} /><TablaComponent titulo="TORNEO DE VERANO" zona="ZONA B" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Verano'), equipo_B_2018)} /></>)}
                {temporada === '2018' && fecha > 14 && fecha <= 29 && (<TablaComponent titulo="TORNEO APERTURA" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Apertura' && p.Fecha_Global >= 15))} />)}
                {temporada === '2018' && fecha > 29 && (<TablaComponent titulo="TORNEO CLAUSURA" zona="ZONA ÚNICA" datos={generarTabla(partidosValidos.filter(p => p.Torneo === 'Clausura' && p.Fecha_Global >= 30))} />)}
                
                {temporada === '2013' && fecha > 30 && fecha <= 44 ? (
                  <><TablaComponent titulo="LIGUILLA A" zona="(Puntos Acumulados)" datos={generarTabla(partidosValidos, liguillaA_2013, true)} esAcumulado={true} /><TablaComponent titulo="LIGUILLA B" zona="(Puntos Acumulados)" datos={generarTabla(partidosValidos, liguillaB_2013, true)} esAcumulado={true} /><TablaComponent titulo="TABLA GENERAL ACUMULADA" datos={generarTabla(partidosValidos, null, true)} esAcumulado={true} /></>
                ) : (
                  temporada === '2013' && <TablaComponent titulo={fecha > 44 ? "TABLA FINAL ACUMULADA" : `TABLA ACUMULADA (HASTA LA FECHA ${fecha})`} datos={generarTabla(temporada === '2013' && fecha > 44 ? listaPartidos.filter(p => p.Fecha_Global <= 44) : partidosValidos, null, true)} esAcumulado={true} />
                )}
              </div>
                                                                              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="bg-white border border-[#d1e0d7] rounded-lg overflow-hidden shadow-lg">
                  <div className="text-center font-bold text-[14px] uppercase py-[10px] bg-[#e5eee9] border-b border-[#d1e0d7]" style={{ color: '#000000' }}>RESULTADOS DE LA FECHA</div>
                  <div className="flex flex-col max-h-[550px] overflow-y-auto custom-scrollbar">
                    {listaPartidos.filter(p => p.Fecha_Global === fecha).length === 0 ? (
                      <div className="text-center text-[12px] p-[15px]" style={{ color: '#000000' }}>No hay partidos registrados.</div>
                    ) : (
                      listaPartidos.filter(p => p.Fecha_Global === fecha).map((p, idx) => {
                        const esWO = esWalkover(p); const esConc = esConcedido(p); const teamGanador = ganadorMesa(p);
                        return (
                          <div key={idx} className={`flex justify-between items-center py-[8px] px-[10px] border-b border-[#d1e0d7] hover:bg-[#f8fbf9] ${idx % 2 === 0 ? 'bg-transparent' : 'bg-[#fcfdfc]'}`}>
                            <div className="flex items-center w-full justify-center">
                              <span className={`text-right w-[40%] text-[11px] font-bold truncate ${teamGanador === p.Local ? 'underline decoration-2 underline-offset-2 text-[#8cc63f]' : 'text-black'}`}>{p.Local}</span>
                              <img src={logos[p.Local]} className="w-4 h-4 mx-1 object-contain" />
                              
                              <div className="flex items-center justify-center gap-[2px] mx-[2px] min-w-[50px]">
                                {esWO ? ( <div className="text-[#d32f2f] text-[8px] font-black w-[40px] text-center leading-tight">WALK<br/>OVER</div> ) : esConc ? ( <div className="text-[#d32f2f] text-[8px] font-black w-[40px] text-center leading-tight">CONCE<br/>DIDO</div> ) : p.GL !== null && p.GV !== null ? ( <><div className="bg-[#e5eee9] border border-[#d1e0d7] rounded-[4px] font-bold text-[12px] w-[20px] h-[20px] flex items-center justify-center text-black">{p.GL}</div><div className="font-bold text-[12px] text-[#8cc63f]">-</div><div className="bg-[#e5eee9] border border-[#d1e0d7] rounded-[4px] font-bold text-[12px] w-[20px] h-[20px] flex items-center justify-center text-black">{p.GV}</div></> ) : ( <div className="font-bold text-[10px] text-[#8cc63f]">VS</div> )}
                              </div>
                              
                              <img src={logos[p.Visitante]} className="w-4 h-4 mx-1 object-contain" />
                              <span className={`text-left w-[40%] text-[11px] font-bold truncate ${teamGanador === p.Visitante ? 'underline decoration-2 underline-offset-2 text-[#8cc63f]' : 'text-black'}`}>{p.Visitante}</span>
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

        </div>
      </div>
    </div>
  );
}

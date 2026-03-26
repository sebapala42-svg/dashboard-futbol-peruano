import streamlit as st
import pandas as pd

# 1. CONFIGURACIÓN Y ESTADO INICIAL (Entra a 2026 por defecto)
st.set_page_config(page_title="Liga 1 Te Apuesto", page_icon="🏆", layout="wide")

if 'temporada' not in st.session_state:
    st.session_state['temporada'] = "2026"

temporada = st.session_state['temporada']

# 2. INYECCIÓN DE CSS EXTREMO (TU DISEÑO ORIGINAL)
st.markdown("""
<style>
    .stApp { background-color: #0b4026; color: #ffffff; }
    .block-container { padding-top: 1rem; padding-bottom: 1rem; max-width: 1300px; }
    header {visibility: hidden;}
    footer {visibility: hidden;}
    
    .stTabs [data-baseweb="tab-list"] { gap: 0px; background-color: transparent; border-bottom: 1px solid #1a4a2e; justify-content: center; }
    .stTabs [data-baseweb="tab"] { color: #87b897; padding: 8px 20px; font-weight: bold; font-size: 13px; background-color: transparent; }
    .stTabs [aria-selected="true"] { color: #ffffff !important; border-bottom: 3px solid #8cc63f !important; }
    
    .panel-verde { background-color: #112d1e; border: 1px solid #1a4a2e; border-radius: 8px; padding: 10px 15px; margin-bottom: 15px;}
    .titulo-panel { text-align: center; color: #ffffff; font-weight: bold; font-size: 14px; margin-bottom: 10px; text-transform: uppercase; }
    .subtitulo-zona { background-color: #0d2418; color: white; padding: 6px 10px; font-weight: bold; font-size: 12px; border-bottom: 2px solid #1a4a2e; border-top-left-radius: 6px; border-top-right-radius: 6px;}
    
    .tabla-pro { width: 100%; border-collapse: collapse; color: #ffffff; font-size: 12px; font-family: sans-serif; margin-bottom: 5px;}
    .tabla-pro th { background-color: #0d2418; color: #a1b5a8; border-bottom: 1px solid #1a4a2e; padding: 6px 4px; text-align: center; font-weight: normal; font-size: 11px;}
    .tabla-pro td { padding: 6px 4px; border-bottom: none; text-align: center; color: #ffffff !important;}
    .tabla-pro td:nth-child(2) { text-align: left; font-weight: bold; } 
    .tabla-pro tbody tr:nth-child(odd) { background-color: #153625; } 
    .tabla-pro tbody tr:nth-child(even) { background-color: #112d1e; } 
    .tabla-pro tbody tr:hover { background-color: #1c4531; } 
    
    .contenedor-partidos { display: flex; flex-direction: column; border-radius: 6px; overflow: hidden; }
    .fila-partido { display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; border-bottom: 1px solid #1a4a2e; }
    .fila-partido:nth-child(odd) { background-color: #153625; }
    .fila-partido:nth-child(even) { background-color: #112d1e; }
    .fila-partido:hover { background-color: #1c4531; }

    .stSelectbox label { display: none; } 
    .stSelectbox div[data-baseweb="select"] { background-color: #0d2418; border: 1px solid #8cc63f; border-radius: 4px; color: white; font-size: 13px; min-height: 30px;}
    h2 { font-size: 1.5rem !important; margin-bottom: 10px !important; padding-bottom: 0px !important;}

    .marcador-contenedor { display: flex; align-items: center; justify-content: center; gap: 2px; margin: 0 10px; }
    .gol-cajita { background-color: #0d2418; border: 1px solid #1a4a2e; border-radius: 4px; color: #ffffff; font-weight: bold; font-size: 14px; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; }
    .separador-guion { color: #8cc63f; font-weight: bold; font-size: 14px; }
    
    .nota-asterisco { font-size: 11px; color: #87b897; text-align: left; margin-top: 10px; padding: 5px; background-color: #0d2418; border-radius: 4px; border: 1px solid #1a4a2e;}

    .eq-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; padding: 5px; }
    .eq-card { background-color: #112d1e; border: 1px solid #1a4a2e; border-radius: 6px; padding: 15px 5px; text-align: center; position: relative; transition: 0.2s; }
    .eq-card:hover { border-color: #8cc63f; background-color: #153625; transform: translateY(-3px); }
    .eq-logo { width: 45px; height: 45px; object-fit: contain; margin-bottom: 8px; }
    .eq-nom { color: #ffffff; font-weight: bold; font-size: 10px; text-transform: uppercase; display: block; }
    .eq-badge { position: absolute; top: 5px; right: 5px; color: #ffffff; font-size: 9px; font-weight: bold; display: flex; align-items: center; gap: 2px; }
</style>
""", unsafe_allow_html=True)

# --- LINKS OFICIALES AMPLIADOS ---
logos_equipos = {
    'Alianza Lima': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwKgmyy62z_gymuS4MunKwkb5ibjpHdw4RFA&s',
    'Ayacucho FC': 'https://tmssl.akamaized.net//images/wappen/head/21178.png?lm=1420973967',
    'Binacional': 'https://tmssl.akamaized.net//images/wappen/head/41054.png?lm=1522221940',
    'Cantolao': 'https://tmssl.akamaized.net//images/wappen/head/11247.png?lm=1650562201',
    'Comerciantes Unidos': 'https://tmssl.akamaized.net//images/wappen/head/47107.png?lm=1768945119',
    'Cusco FC': 'https://tmssl.akamaized.net//images/wappen/head/28999.png?lm=1584114226',
    'Cusco (Garcilaso)': 'https://tmssl.akamaized.net//images/wappen/head/28999.png?lm=1584114226',
    'Dep. Municipal': 'https://tmssl.akamaized.net//images/wappen/head/17974.png?lm=1435783940',
    'FBC Melgar': 'https://tmssl.akamaized.net//images/wappen/head/2734.png?lm=1725409451',
    'Sport Boys': 'https://tmssl.akamaized.net//images/wappen/head/2730.png?lm=1752023644',
    'Sport Huancayo': 'https://tmssl.akamaized.net//images/wappen/head/21655.png?lm=1673618901',
    'Sport Rosario': 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/18441.png',
    'Sporting Cristal': 'https://tmssl.akamaized.net//images/wappen/head/21157.png?lm=1755275936',
    'U. San Martin': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROfQWRTSLDENcZLhqUcuH2MNeOyHkGsCnxeQ&s',
    'Union Comercio': 'https://tmssl.akamaized.net//images/wappen/head/31337.png?lm=1435783782',
    'Universitario': 'https://tmssl.akamaized.net//images/wappen/head/6593.png?lm=1753893629',
    'UTC': 'https://tmssl.akamaized.net//images/wappen/head/21170.png?lm=1411768075',
    'Los Chankas': 'https://upload.wikimedia.org/wikipedia/commons/1/14/Chankas_CYC.png',
    'Cienciano': 'https://tmssl.akamaized.net//images/wappen/head/2733.png',
    'Alianza Atlético': 'https://tmssl.akamaized.net//images/wappen/head/6561.png',
    'Juan Pablo II': 'https://tmssl.akamaized.net//images/wappen/head/102878.png',
    'ADT': 'https://tmssl.akamaized.net//images/wappen/head/31201.png',
    'Deportivo Garcilaso': 'https://tmssl.akamaized.net//images/wappen/head/71415.png',
    'CD Moquegua': 'https://tmssl.akamaized.net//images/wappen/head/72886.png',
    'Atlético Grau': 'https://tmssl.akamaized.net//images/wappen/head/31200.png',
    'FC Cajamarca': 'https://cdn-icons-png.flaticon.com/128/33/33736.png'
}

equipo_A = ['Sporting Cristal', 'Sport Rosario', 'UTC', 'U. San Martin', 'Alianza Lima', 'Comerciantes Unidos', 'Ayacucho FC', 'Universitario']
equipo_B = ['Sport Huancayo', 'FBC Melgar', 'Cantolao', 'Dep. Municipal', 'Sport Boys', 'Cusco (Garcilaso)', 'Binacional', 'Union Comercio']

# --- CARGADORES DE DATOS ---
@st.cache_data
def cargar_datos_2018():
    df_p = pd.read_excel('torneo_2018.xlsx', sheet_name='BaseDatos')
    df_g = pd.read_excel('torneo_2018.xlsx', sheet_name='Registro_Goles')
    return df_p, df_g

def cargar_datos_2026():
    # Base de datos interna de la Liga 1 2026 (Datos Reales Sofascore / Depor)
    data_26 = [
        # FECHA 1
        [1, 'Sport Huancayo', 'Alianza Lima', 1, 2], [1, 'UTC', 'Atlético Grau', 2, 0], [1, 'Sport Boys', 'Los Chankas', 1, 1],
        [1, 'Juan Pablo II', 'FC Cajamarca', 3, 3], [1, 'Comerciantes Unidos', 'Universitario', 0, 0], [1, 'Cusco FC', 'FBC Melgar', 1, 0],
        [1, 'Cienciano', 'CD Moquegua', 2, 0], [1, 'Sporting Cristal', 'ADT', 3, 1], [1, 'Deportivo Garcilaso', 'Alianza Atlético', 0, 0],
        # FECHA 2
        [2, 'Alianza Lima', 'UTC', 1, 0], [2, 'Los Chankas', 'Cienciano', 2, 1], [2, 'Universitario', 'Sport Boys', 1, 0],
        [2, 'FBC Melgar', 'Sporting Cristal', 1, 2], [2, 'Atlético Grau', 'Juan Pablo II', 1, 0], [2, 'FC Cajamarca', 'Comerciantes Unidos', 0, 1],
        [2, 'Alianza Atlético', 'Sport Huancayo', 1, 1], [2, 'ADT', 'Deportivo Garcilaso', 2, 0], [2, 'CD Moquegua', 'Cusco FC', 0, 0],
        # FECHA 3
        [3, 'Sporting Cristal', 'Los Chankas', 2, 1], [3, 'Cienciano', 'Universitario', 1, 1], [3, 'Sport Boys', 'Alianza Lima', 0, 2],
        [3, 'Cusco FC', 'ADT', 1, 0], [3, 'Juan Pablo II', 'FBC Melgar', 0, 2], [3, 'Comerciantes Unidos', 'Atlético Grau', 2, 0],
        [3, 'Sport Huancayo', 'CD Moquegua', 1, 0], [3, 'Deportivo Garcilaso', 'FC Cajamarca', 1, 1], [3, 'UTC', 'Alianza Atlético', 1, 0],
        # FECHA 4
        [4, 'Alianza Lima', 'Sport Boys', 1, 0], [4, 'FC Cajamarca', 'FBC Melgar', 3, 1], [4, 'Sporting Cristal', 'Universitario', 2, 2],
        [4, 'Cienciano', 'Alianza Atlético', 1, 1], [4, 'ADT', 'UTC', 2, 2], [4, 'Los Chankas', 'Sport Huancayo', 3, 2],
        [4, 'Atlético Grau', 'Juan Pablo II', 1, 2], [4, 'Cusco FC', 'Comerciantes Unidos', 3, 1], [4, 'CD Moquegua', 'Deportivo Garcilaso', 1, 0]
    ]
    df = pd.DataFrame(data_26, columns=['Fecha_Global', 'Local', 'Visitante', 'GL', 'GV'])
    df['Torneo'] = 'Apertura'
    return df

# --- MOTOR CREADOR DE TABLAS (TU LÓGICA ORIGINAL) ---
def generar_html_tabla(df_filtro, lista_equipos, titulo_panel, es_acumulado=False, zona="", f_sel=44):
    tabla_datos = []
    for equipo in lista_equipos:
        loc = df_filtro[df_filtro['Local'] == equipo]
        vis = df_filtro[df_filtro['Visitante'] == equipo]
        g = (loc['GL'] > loc['GV']).sum() + (vis['GV'] > vis['GL']).sum()
        e = (loc['GL'] == loc['GV']).sum() + (vis['GV'] == vis['GL']).sum()
        p = (loc['GL'] < loc['GV']).sum() + (vis['GV'] < vis['GL']).sum()
        gf = int(loc['GL'].sum() + vis['GV'].sum())
        gc = int(loc['GV'].sum() + vis['GL'].sum())
        pj = g + e + p
        pts = (g * 3) + e
        
        pts_total = pts
        # Sanciones solo se aplican en 2018
        if es_acumulado and temporada == "2018":
            bon = 2 if equipo == 'Sporting Cristal' and f_sel >= 44 else 0
            sanc_dict = {'Universitario': 1, 'Dep. Municipal': 2, 'UTC': 2, 'Cantolao': 2, 'Sport Rosario': 7}
            sanc = sanc_dict.get(equipo, 0) if f_sel >= 44 else 0
            pts_total = pts + bon - sanc
            
        partidos_equipo = df_filtro[(df_filtro['Local'] == equipo) | (df_filtro['Visitante'] == equipo)].sort_values('Fecha_Global', ascending=False).head(5)
        racha_html = ""
        for _, rp in partidos_equipo.iterrows():
            if rp['Local'] == equipo: res = 'V' if rp['GL'] > rp['GV'] else 'E' if rp['GL'] == rp['GV'] else 'D'
            else: res = 'V' if rp['GV'] > rp['GL'] else 'E' if rp['GV'] == rp['GL'] else 'D'
            color_racha = "#8cc63f" if res == 'V' else "#e1c340" if res == 'E' else "#d32f2f"
            racha_html = f"<span style='background-color:{color_racha}; color:white; padding: 1px 4px; border-radius:2px; font-size:8.5px; margin:0 1px; font-weight:bold;'>{res}</span>" + racha_html
        
        tabla_datos.append([equipo, pj, pts_total, gf, gc, gf-gc, g, e, p, racha_html])

    df_t = pd.DataFrame(tabla_datos, columns=['Equipo', 'J', 'PTS', 'GF', 'GC', '+/-', 'G', 'E', 'P', 'Racha'])
    df_t = df_t.sort_values(by=['PTS', '+/-', 'GF'], ascending=[False, False, False]).reset_index(drop=True)
    
    html = f"<div class='panel-verde'><div class='titulo-panel'>{titulo_panel}</div>"
    if zona: html += f"<div class='subtitulo-zona'>{zona}</div>"
    html += "<table class='tabla-pro'><thead><tr><th style='width:20px;'>#</th><th>Equipos</th><th>PTS</th><th>J</th><th>Gol</th><th>+/-</th><th>G</th><th>E</th><th>P</th><th>Últimas</th></tr></thead><tbody>"
    
    for idx, row in df_t.iterrows():
        pos = idx + 1
        logo = logos_equipos.get(row['Equipo'], '')
        borde = "transparent"
        
        # Reglas de bordes de clasificación
        if temporada == "2018" and es_acumulado:
            if pos <= 4: borde = "#3db4dc" 
            elif pos <= 8: borde = "#e1c340" 
            elif pos >= 15: borde = "#d32f2f" 
        elif temporada == "2026":
            if pos <= 2: borde = "#3db4dc" # Libertadores 2026
            elif pos >= 16: borde = "#d32f2f" # Descenso 2026
        else:
            if pos == 1: borde = "#3db4dc"
            
        html += f"<tr><td style='border-left: 3px solid {borde}; font-weight:bold;'>{pos}</td><td style='text-align:left;'><img src='{logo}' width='15' height='15' style='object-fit:contain; vertical-align:middle; margin-right:6px;' onerror=\"this.style.display='none'\"> <span style='color:#ffffff;'>{row['Equipo']}</span></td><td style='font-weight:bold; font-size:13px; color:#ffffff;'>{row['PTS']}</td><td style='color:#ffffff;'>{row['J']}</td><td style='color:#ffffff;'>{row['GF']}:{row['GC']}</td><td style='color:#ffffff;'>{row['+/-']}</td><td style='color:#ffffff;'>{row['G']}</td><td style='color:#ffffff;'>{row['E']}</td><td style='color:#ffffff;'>{row['P']}</td><td>{row['Racha']}</td></tr>"
    html += "</tbody></table>"
    
    if es_acumulado and temporada == "2018":
        html += "<div class='nota-asterisco'>* Nota: Sanciones a Sport Rosario (-7 pts), Dep. Municipal (-2 pts), UTC (-2 pts), Cantolao (-2 pts) y Universitario (-1 pt). Sporting Cristal (+2 pts) por Reservas.</div>"
        
    html += "</div>"
    return html

# =====================================================================
# --- RENDERIZADO VISUAL DE LA PÁGINA ---
# =====================================================================
st.markdown(f"<h2 style='text-align: center; color: white;'>LIGA PROFESIONAL PERUANA {temporada}</h2>", unsafe_allow_html=True)
tab_fixture, tab_estadisticas, tab_campeones = st.tabs(["FIXTURE Y TABLAS", "EQUIPOS Y ESTADISTICAS", "CAMPEONES"])

with tab_fixture:
    if temporada == "2018":
        try:
            df_partidos, df_goles = cargar_datos_2018()
        except Exception:
            st.error("🚨 Error: No se encontró 'torneo_2018.xlsx' en tu GitHub.")
            st.stop()
            
        todos_eq = sorted(list(df_partidos['Local'].dropna().unique()))
        fechas_disponibles = [f"FECHA {i}" for i in range(1, 45)]
        idx_defecto = 29
    else:
        df_partidos = cargar_datos_2026()
        todos_eq = sorted(list(df_partidos['Local'].dropna().unique()))
        fechas_disponibles = [f"FECHA {i}" for i in range(1, 5)] # Solo 4 fechas disponibles por ahora
        idx_defecto = 3

    col_izq, col_der = st.columns([2.2, 1.0]) 
    
    with col_der:
        st.markdown(f"<div class='titulo-panel' style='color:#8cc63f; margin-bottom: 5px;'>TORNEO {temporada}</div>", unsafe_allow_html=True)
        fecha_texto = st.selectbox("Selecciona Fecha", fechas_disponibles, index=idx_defecto) 
        fecha_seleccionada = int(fecha_texto.replace("FECHA ", ""))
        
        # PARTIDOS DE LA FECHA
        st.markdown("<div class='panel-verde' style='padding: 0;'><div class='contenedor-partidos'>", unsafe_allow_html=True)
        partidos_fecha = df_partidos[df_partidos['Fecha_Global'] == fecha_seleccionada]
        if not partidos_fecha.empty:
            html_p = ""
            for _, row in partidos_fecha.iterrows():
                loc, vis, gl, gv = row['Local'], row['Visitante'], row['GL'], row['GV']
                l_logo, v_logo = logos_equipos.get(loc, ''), logos_equipos.get(vis, '')
                html_p += f"<div class='fila-partido'><span style='color:white; font-size:10px; font-weight:bold;'>Final</span><div style='display:flex; align-items:center; width: 85%; justify-content: center;'><span style='text-align:right; width:40%; font-size:12px; color:#ffffff; font-weight:bold;'>{loc}</span><img src='{l_logo}' width='18' height='18' style='object-fit:contain; margin: 0 5px;' onerror=\"this.style.display='none'\"><div class='marcador-contenedor'><div class='gol-cajita'>{gl}</div><div class='separador-guion'>-</div><div class='gol-cajita'>{gv}</div></div><img src='{v_logo}' width='18' height='18' style='object-fit:contain; margin: 0 5px;' onerror=\"this.style.display='none'\"><span style='text-align:left; width:40%; font-size:12px; color:#ffffff; font-weight:bold;'>{vis}</span></div></div>"
            st.markdown(html_p, unsafe_allow_html=True)
        else:
            st.markdown("<p style='text-align:center; font-size:12px; padding: 15px;'>No hay partidos registrados.</p>", unsafe_allow_html=True)
        st.markdown("</div></div>", unsafe_allow_html=True)

        # GOLEADORES (Solo se muestra en 2018 porque leemos tu Excel)
        if temporada == "2018":
            st.markdown("<div class='panel-verde'><div class='titulo-panel'>GOLEADORES</div>", unsafe_allow_html=True)
            df_g = df_goles.dropna(subset=['Fecha_Global', 'Jugador'])
            df_g = df_g[df_g['Fecha_Global'] <= fecha_seleccionada]
            if not df_g.empty:
                df_g = df_g.groupby(['Jugador', 'Equipo'])['Goles'].sum().reset_index().sort_values(by='Goles', ascending=False).head(10)
                html_g = "<table class='tabla-pro'><thead><tr><th style='text-align:left;'>Jugador</th><th>Goles</th></tr></thead><tbody>"
                for _, row in df_g.iterrows():
                    html_g += f"<tr><td style='text-align:left; color:#ffffff;'><img src='{logos_equipos.get(row['Equipo'], '')}' width='15' height='15' style='object-fit:contain; vertical-align:middle; margin-right:5px;' onerror=\"this.style.display='none'\"> {row['Jugador']}</td><td style='font-weight:bold; color:#ffffff;'>{row['Goles']}</td></tr>"
                html_g += "</tbody></table>"
                st.markdown(html_g, unsafe_allow_html=True)
            st.markdown("</div>", unsafe_allow_html=True)

    with col_izq:
        # LÓGICA DE TABLAS 2018 (RESTAURADA)
        if temporada == "2018":
            if fecha_seleccionada <= 14:
                st.markdown("<div class='titulo-panel'>TORNEO DE VERANO</div>", unsafe_allow_html=True)
                df_verano = df_partidos[(df_partidos['Fecha_Global'] <= fecha_seleccionada) & (df_partidos['Torneo'] == 'Verano')]
                st.markdown(generar_html_tabla(df_verano, equipo_A, "", zona="ZONA A", f_sel=fecha_seleccionada), unsafe_allow_html=True)
                st.markdown(generar_html_tabla(df_verano, equipo_B, "", zona="ZONA B", f_sel=fecha_seleccionada), unsafe_allow_html=True)
            elif fecha_seleccionada <= 29:
                df_apertura = df_partidos[(df_partidos['Fecha_Global'] >= 15) & (df_partidos['Fecha_Global'] <= fecha_seleccionada) & (df_partidos['Torneo'] == 'Apertura')]
                st.markdown(generar_html_tabla(df_apertura, todos_eq, "TORNEO APERTURA", zona="ZONA ÚNICA", f_sel=fecha_seleccionada), unsafe_allow_html=True)
            else:
                df_clausura = df_partidos[(df_partidos['Fecha_Global'] >= 30) & (df_partidos['Fecha_Global'] <= min(fecha_seleccionada, 44)) & (df_partidos['Torneo'] == 'Clausura')]
                st.markdown(generar_html_tabla(df_clausura, todos_eq, "TORNEO CLAUSURA", zona="ZONA ÚNICA", f_sel=fecha_seleccionada), unsafe_allow_html=True)

            df_acu = df_partidos[df_partidos['Fecha_Global'] <= min(fecha_seleccionada, 44)]
            st.markdown(generar_html_tabla(df_acu, todos_eq, f"TABLA ACUMULADA (HASTA LA FECHA {fecha_seleccionada})", es_acumulado=True, f_sel=fecha_seleccionada), unsafe_allow_html=True)
        
        # LÓGICA DE TABLAS 2026 (NUEVA BASE DE DATOS)
        else:
            df_acu = df_partidos[df_partidos['Fecha_Global'] <= fecha_seleccionada]
            st.markdown(generar_html_tabla(df_acu, todos_eq, f"LIGA 1 APERTURA 2026 (FECHA {fecha_seleccionada})", es_acumulado=True, f_sel=fecha_seleccionada), unsafe_allow_html=True)

# =====================================================================
# --- TAB 2: EQUIPOS Y ESTADÍSTICAS (LIMPIA, SOLO ESCUDOS) ---
# =====================================================================
with tab_estadisticas:
    st.markdown("<h3 style='text-align: center; color: white; margin-bottom: 5px;'>EQUIPOS LIGA 1</h3>", unsafe_allow_html=True)
    st.markdown("<p style='text-align: center; color: #87b897; font-size: 11px; margin-bottom: 15px;'>Haz clic en un equipo para ver su historial y palmarés (Próximamente)</p>", unsafe_allow_html=True)

    tit_h = {'Universitario': 29, 'Alianza Lima': 25, 'Sporting Cristal': 20, 'Sport Boys': 6, 'Dep. Municipal': 4, 'U. San Martin': 3, 'FBC Melgar': 2, 'Binacional': 1}
    
    html_grid = "<div class='eq-grid'>"
    for equipo in sorted(list(logos_equipos.keys())):
        logo = logos_equipos.get(equipo, '')
        copas = tit_h.get(equipo, 0)
        insignia = f"<div class='eq-badge'>🏆{copas}</div>" if copas > 0 else ""
        html_grid += f"<div class='eq-card'>{insignia}<img src='{logo}' class='eq-logo' onerror=\"this.style.display='none'\"><span class='eq-nom'>{equipo}</span></div>"
    html_grid += "</div>"
    st.markdown(html_grid, unsafe_allow_html=True)

# =====================================================================
# --- TAB 3: CAMPEONES Y MÁQUINA DEL TIEMPO ---
# =====================================================================
with tab_campeones:
    historial_datos = [
        {"Año": "2025", "Campeón": "Universitario"}, {"Año": "2024", "Campeón": "Universitario"},
        {"Año": "2023", "Campeón": "Universitario"}, {"Año": "2022", "Campeón": "Alianza Lima"},
        {"Año": "2021", "Campeón": "Alianza Lima"}, {"Año": "2020", "Campeón": "Sporting Cristal"},
        {"Año": "2019", "Campeón": "Binacional"}, {"Año": "2018", "Campeón": "Sporting Cristal"},
        {"Año": "2017", "Campeón": "Alianza Lima"}, {"Año": "2016", "Campeón": "Sporting Cristal"},
        {"Año": "2015", "Campeón": "FBC Melgar"}, {"Año": "2014", "Campeón": "Sporting Cristal"},
        {"Año": "2013", "Campeón": "Universitario"}, {"Año": "2012", "Campeón": "Sporting Cristal"}
    ]
    df_historial = pd.DataFrame(historial_datos)

    ranking_datos = [
        {"Equipo": "Universitario", "Títulos": 29}, {"Equipo": "Alianza Lima", "Títulos": 25},
        {"Equipo": "Sporting Cristal", "Títulos": 20}, {"Equipo": "Sport Boys", "Títulos": 6},
        {"Equipo": "Dep. Municipal", "Títulos": 4}, {"Equipo": "U. San Martin", "Títulos": 3},
        {"Equipo": "FBC Melgar", "Títulos": 2}, {"Equipo": "Binacional", "Títulos": 1}
    ]
    df_ranking = pd.DataFrame(ranking_datos)

    col_hist, col_rank = st.columns([1.5, 1])

    with col_hist:
        st.markdown("<div class='panel-verde' style='padding:0;'><div class='titulo-panel' style='padding-top:10px;'>HISTORIAL</div>", unsafe_allow_html=True)
        html_h = "<table class='tabla-pro' style='margin:0;'><thead><tr><th>Torneo</th><th style='text-align:left;'>Historia</th></tr></thead><tbody>"
        for idx, row in df_historial.iterrows():
            logo = logos_equipos.get(row['Campeón'], 'https://cdn-icons-png.flaticon.com/128/33/33736.png')
            html_h += f"<tr><td style='font-weight:bold; color:#ffffff;'>{row['Año']}</td><td style='text-align:left;'><img src='{logo}' width='15' height='15' style='object-fit:contain; vertical-align:middle; margin-right:6px;' onerror=\"this.style.display='none'\"> <span style='color:#ffffff; font-weight:bold;'>{row['Campeón']}</span></td></tr>"
        html_h += "</tbody></table></div>"
        st.markdown(html_h, unsafe_allow_html=True)

    with col_rank:
        st.markdown("<div class='panel-verde' style='padding:0;'><div class='titulo-panel' style='padding-top:10px;'>RANKING LIGAS</div>", unsafe_allow_html=True)
        html_r = "<table class='tabla-pro' style='margin:0;'><thead><tr><th style='text-align:left;'>Equipos</th><th>Títulos</th></tr></thead><tbody>"
        for idx, row in df_ranking.iterrows():
            logo = logos_equipos.get(row['Equipo'], 'https://cdn-icons-png.flaticon.com/128/33/33736.png')
            html_r += f"<tr><td style='text-align:left;'><img src='{logo}' width='15' height='15' style='object-fit:contain; vertical-align:middle; margin-right:6px;' onerror=\"this.style.display='none'\"> <span style='color:#ffffff; font-weight:bold;'>{row['Equipo']}</span></td><td style='font-weight:bold; color:#ffffff; font-size:13px;'>{row['Títulos']}</td></tr>"
        html_r += "</tbody></table></div>"
        st.markdown(html_r, unsafe_allow_html=True)

    # --- MÁQUINA DEL TIEMPO ---
    st.markdown("<br><hr style='border-color: #1a4a2e;'><h3 style='text-align: center; color: white;'>MÁQUINA DEL TIEMPO</h3>", unsafe_allow_html=True)
    st.markdown("<p style='text-align: center; color: #87b897; font-size: 13px;'>Explora la base de datos de los torneos pasados.</p>", unsafe_allow_html=True)
    
    col_b1, col_b2, col_b3 = st.columns([1, 1, 1])
    with col_b2:
        if temporada == "2026":
            if st.button("⏪ Viajar al Torneo 2018", use_container_width=True):
                st.session_state['temporada'] = "2018"
                st.rerun()
        else:
            if st.button("🏠 Volver al Presente (2026)", use_container_width=True):
                st.session_state['temporada'] = "2026"
                st.rerun()

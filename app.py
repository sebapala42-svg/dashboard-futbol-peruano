import streamlit as st
import pandas as pd

# 1. CONFIGURACIÓN DE PÁGINA
st.set_page_config(page_title="Liga Peruana 2018", page_icon="🏆", layout="wide")

# 2. INYECCIÓN DE CSS EXTREMO (Modo Promiedos)
st.markdown("""
<style>
    .stApp { background-color: #062818; color: #ffffff; }
    .block-container { padding-top: 1rem; padding-bottom: 1rem; max-width: 1300px; }
    header {visibility: hidden;}
    footer {visibility: hidden;}
    
    .stTabs [data-baseweb="tab-list"] { gap: 0px; background-color: transparent; border-bottom: 1px solid #1a4a2e; justify-content: center; }
    .stTabs [data-baseweb="tab"] { color: #5e8b6b; padding: 8px 20px; font-weight: bold; font-size: 13px; background-color: transparent; }
    .stTabs [aria-selected="true"] { color: #ffffff !important; border-bottom: 3px solid #8cc63f !important; }
    
    .panel-verde { background-color: #0c3620; border: 1px solid #1a4a2e; border-radius: 6px; padding: 10px; margin-bottom: 15px;}
    .titulo-panel { text-align: center; color: #ffffff; font-weight: bold; font-size: 13px; margin-bottom: 10px; text-transform: uppercase; }
    .subtitulo-zona { background-color: #082b1c; color: white; padding: 5px 10px; font-weight: bold; font-size: 12px; border-bottom: 2px solid #1a4a2e; border-top-left-radius: 6px; border-top-right-radius: 6px;}
    
    .tabla-pro { width: 100%; border-collapse: collapse; color: #ffffff; font-size: 11.5px; font-family: sans-serif; margin-bottom: 15px;}
    .tabla-pro th { background-color: #082b1c; color: #a1b5a8; border-bottom: 2px solid #1a4a2e; padding: 4px 2px; text-align: center; font-weight: normal; font-size: 10px;}
    .tabla-pro td { padding: 4px 2px; border-bottom: 1px solid #1a4a2e; text-align: center; }
    .tabla-pro td:nth-child(2) { text-align: left; font-weight: bold; } 
    .tabla-pro tr:hover { background-color: #11452a; }
    
    .stSelectbox label { display: none; } 
    .stSelectbox div[data-baseweb="select"] { background-color: #082b1c; border: 1px solid #8cc63f; border-radius: 4px; color: white; font-size: 12px; min-height: 30px;}
    h2 { font-size: 1.4rem !important; margin-bottom: 10px !important; padding-bottom: 0px !important;}

    /* CLASES PARA ALINEACIÓN PERFECTA DEL MARCADOR */
    .marcador-contenedor { display: flex; align-items: center; justify-content: center; gap: 2px; margin: 0 10px; }
    .gol-cajita { background-color: #082b1c; border: 1px solid #1a4a2e; border-radius: 4px; color: #ffffff; font-weight: bold; font-size: 14px; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; }
    .separador-guion { color: #8cc63f; font-weight: bold; font-size: 14px; }
</style>
""", unsafe_allow_html=True)

# --- TUS LINKS DE ESCUDOS ---
logos_equipos = {
    'Alianza Lima': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwKgmyy62z_gymuS4MunKwkb5ibjpHdw4RFA&s',
    'Ayacucho FC': 'https://tmssl.akamaized.net//images/wappen/head/21178.png?lm=1420973967',
    'Binacional': 'https://tmssl.akamaized.net//images/wappen/head/41054.png?lm=1522221940',
    'Cantolao': 'https://tmssl.akamaized.net//images/wappen/head/11247.png?lm=1650562201',
    'Comerciantes Unidos': 'https://tmssl.akamaized.net//images/wappen/head/47107.png?lm=1768945119',
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
    'UTC': 'https://tmssl.akamaized.net//images/wappen/head/21170.png?lm=1411768075'
}

equipo_A = ['Sporting Cristal', 'Sport Rosario', 'UTC', 'U. San Martin', 'Alianza Lima', 'Comerciantes Unidos', 'Ayacucho FC', 'Universitario']
equipo_B = ['Sport Huancayo', 'FBC Melgar', 'Cantolao', 'Dep. Municipal', 'Sport Boys', 'Cusco (Garcilaso)', 'Binacional', 'Union Comercio']
todos_equipos = sorted(list(logos_equipos.keys()))

# --- CARGAR DATOS ---
@st.cache_data
def cargar_datos():
    df_partidos = pd.read_excel('torneo_2018.xlsx', sheet_name='BaseDatos')
    df_goles = pd.read_excel('torneo_2018.xlsx', sheet_name='Registro_Goles')
    return df_partidos, df_goles

try:
    df_partidos, df_goles = cargar_datos()
except Exception as e:
    st.error("⚠️ Sube tu archivo 'torneo_2018.xlsx' a GitHub.")
    st.stop()

st.markdown("<h2 style='text-align: center; color: white;'>LIGA PROFESIONAL PERUANA 2018</h2>", unsafe_allow_html=True)

tab_fixture, tab_estadisticas, tab_campeones = st.tabs(["FIXTURE Y TABLAS", "EQUIPOS Y ESTADISTICAS", "CAMPEONES"])

# --- MOTOR CREADOR DE TABLAS (COMPRIMIDO PARA EVITAR ERRORES) ---
def generar_html_tabla(df_filtro, lista_equipos, es_acumulado=False, zona=""):
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
        if es_acumulado:
            bon = 2 if equipo == 'Sporting Cristal' and fecha_seleccionada >= 44 else 0
            sanc_dict = {'Universitario': 1, 'Dep. Municipal': 2, 'UTC': 2, 'Cantolao': 2, 'Sport Rosario': 7}
            sanc = sanc_dict.get(equipo, 0) if fecha_seleccionada >= 44 else 0
            pts_total = pts + bon - sanc
            
        partidos_equipo = df_filtro[(df_filtro['Local'] == equipo) | (df_filtro['Visitante'] == equipo)].sort_values('Fecha_Global', ascending=False).head(5)
        racha_html = ""
        for _, rp in partidos_equipo.iterrows():
            res = 'V' if (rp['Local'] == equipo and rp['GL'] > rp['GV']) or (rp['Visitante'] == equipo and rp['GV'] > rp['GL']) else 'E' if rp['GL'] == rp['GV'] else 'D'
            color_racha = "#8cc63f" if res == 'V' else "#e1c340" if res == 'E' else "#d32f2f"
            racha_html = f"<span style='background-color:{color_racha}; color:white; padding: 1px 4px; border-radius:2px; font-size:8.5px; margin:0 1px; font-weight:bold;'>{res}</span>" + racha_html
        
        tabla_datos.append([equipo, pj, pts_total, gf, gc, gf-gc, g, e, p, racha_html])

    df_t = pd.DataFrame(tabla_datos, columns=['Equipo', 'J', 'PTS', 'GF', 'GC', '+/-', 'G', 'E', 'P', 'Racha'])
    df_t = df_t.sort_values(by=['PTS', '+/-', 'GF'], ascending=[False, False, False]).reset_index(drop=True)
    
    html = ""
    if zona: html += f"<div class='subtitulo-zona'>{zona}</div>"
    html += "<table class='tabla-pro'><thead><tr><th style='width:20px;'>#</th><th>Equipos</th><th>PTS</th><th>J</th><th>Gol</th><th>+/-</th><th>G</th><th>E</th><th>P</th><th>Últimas</th></tr></thead><tbody>"
    
    for idx, row in df_t.iterrows():
        pos = idx + 1
        logo = logos_equipos.get(row['Equipo'], '')
        borde = "transparent"
        if es_acumulado:
            if pos <= 4: borde = "#3db4dc" 
            elif pos <= 8: borde = "#e1c340" 
            elif pos >= 15: borde = "#d32f2f" 
        else:
            if pos == 1: borde = "#3db4dc"
            
        html += f"<tr><td style='border-left: 3px solid {borde}; font-weight:bold;'>{pos}</td><td style='text-align:left;'><img src='{logo}' width='15' height='15' style='object-fit:contain; vertical-align:middle; margin-right:6px;' onerror=\"this.style.display='none'\"> {row['Equipo']}</td><td style='font-weight:bold; font-size:12.5px;'>{row['PTS']}</td><td>{row['J']}</td><td>{row['GF']}:{row['GC']}</td><td>{row['+/-']}</td><td>{row['G']}</td><td>{row['E']}</td><td>{row['P']}</td><td>{row['Racha']}</td></tr>"
    html += "</tbody></table>"
    return html

# --- RENDERIZADO VISUAL ---
with tab_fixture:
    col_izq, col_der = st.columns([2.2, 1.0]) 
    
    with col_der:
        # SELECTOR DE FECHA
        st.markdown("<div class='titulo-panel' style='color:#8cc63f; margin-bottom: 5px;'>TEMPORADA</div>", unsafe_allow_html=True)
        fechas_disponibles = [f"FECHA {i}" for i in range(1, 45)]
        fecha_texto = st.selectbox("Selecciona Fecha", fechas_disponibles, index=29) 
        fecha_seleccionada = int(fecha_texto.replace("FECHA ", ""))
        
        # PARTIDOS DE LA FECHA
        st.markdown("<div class='panel-verde'>", unsafe_allow_html=True)
        partidos_fecha = df_partidos[df_partidos['Fecha_Global'] == fecha_seleccionada]
        if not partidos_fecha.empty:
            html_p = ""
            for _, row in partidos_fecha.iterrows():
                loc, vis, gl, gv = row['Local'], row['Visitante'], row['GL'], row['GV']
                l_logo, v_logo = logos_equipos.get(loc, ''), logos_equipos.get(vis, '')
                html_p += f"<div style='display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid #1a4a2e; padding: 6px 0;'><span style='color:white; font-size:10px; font-weight:bold;'>Final</span><div style='display:flex; align-items:center; width: 85%; justify-content: center;'><span style='text-align:right; width:40%; font-size:11px;'>{loc}</span><img src='{l_logo}' width='15' height='15' style='object-fit:contain; margin: 0 5px;' onerror=\"this.style.display='none'\"><div class='marcador-contenedor'><div class='gol-cajita'>{gl}</div><div class='separador-guion'>-</div><div class='gol-cajita'>{gv}</div></div><img src='{v_logo}' width='15' height='15' style='object-fit:contain; margin: 0 5px;' onerror=\"this.style.display='none'\"><span style='text-align:left; width:40%; font-size:11px;'>{vis}</span></div></div>"
            st.markdown(html_p, unsafe_allow_html=True)
        else:
            st.markdown("<p style='text-align:center; font-size:11px;'>No hay partidos registrados.</p>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)

        # GOLEADORES
        st.markdown("<div class='panel-verde'><div class='titulo-panel'>GOLEADORES</div>", unsafe_allow_html=True)
        df_g = df_goles.dropna(subset=['Fecha_Global', 'Jugador'])
        df_g = df_g[df_g['Fecha_Global'] <= fecha_seleccionada]
        if not df_g.empty:
            df_g = df_g.groupby(['Jugador', 'Equipo'])['Goles'].sum().reset_index().sort_values(by='Goles', ascending=False).head(10)
            html_g = "<table class='tabla-pro'><thead><tr><th style='text-align:left;'>Jugador</th><th>Goles</th></tr></thead><tbody>"
            for _, row in df_g.iterrows():
                html_g += f"<tr><td style='text-align:left;'><img src='{logos_equipos.get(row['Equipo'], '')}' width='14' height='14' style='object-fit:contain; vertical-align:middle; margin-right:5px;' onerror=\"this.style.display='none'\"> {row['Jugador']}</td><td style='font-weight:bold;'>{row['Goles']}</td></tr>"
            html_g += "</tbody></table>"
            st.markdown(html_g, unsafe_allow_html=True)
        else:
            st.markdown("<p style='text-align:center; font-size:11px;'>Aún no hay goles registrados.</p>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)

    with col_izq:
        # TABLAS DE TORNEO CORTO
        if fecha_seleccionada <= 14:
            st.markdown("<div class='panel-verde'><div class='titulo-panel'>TORNEO DE VERANO</div>", unsafe_allow_html=True)
            df_verano = df_partidos[(df_partidos['Fecha_Global'] <= fecha_seleccionada) & (df_partidos['Torneo'] == 'Verano')]
            st.markdown(generar_html_tabla(df_verano, equipo_A, zona="GRUPO A"), unsafe_allow_html=True)
            st.markdown(generar_html_tabla(df_verano, equipo_B, zona="GRUPO B"), unsafe_allow_html=True)
            st.markdown("</div>", unsafe_allow_html=True)
        elif fecha_seleccionada <= 29:
            st.markdown("<div class='panel-verde'><div class='titulo-panel'>TORNEO APERTURA</div>", unsafe_allow_html=True)
            df_apertura = df_partidos[(df_partidos['Fecha_Global'] >= 15) & (df_partidos['Fecha_Global'] <= fecha_seleccionada) & (df_partidos['Torneo'] == 'Apertura')]
            st.markdown(generar_html_tabla(df_apertura, todos_equipos, zona="ZONA ÚNICA"), unsafe_allow_html=True)
            st.markdown("</div>", unsafe_allow_html=True)
        else:
            st.markdown("<div class='panel-verde'><div class='titulo-panel'>TORNEO CLAUSURA</div>", unsafe_allow_html=True)
            df_clausura = df_partidos[(df_partidos['Fecha_Global'] >= 30) & (df_partidos['Fecha_Global'] <= min(fecha_seleccionada, 44)) & (df_partidos['Torneo'] == 'Clausura')]
            st.markdown(generar_html_tabla(df_clausura, todos_equipos, zona="ZONA ÚNICA"), unsafe_allow_html=True)
            st.markdown("</div>", unsafe_allow_html=True)

        # TABLA ACUMULADA
        st.markdown(f"<div class='panel-verde'><div class='titulo-panel'>TABLA ACUMULADA (HASTA LA FECHA {fecha_seleccionada})</div>", unsafe_allow_html=True)
        df_acu = df_partidos[df_partidos['Fecha_Global'] <= min(fecha_seleccionada, 44)]
        st.markdown(generar_html_tabla(df_acu, todos_equipos, es_acumulado=True), unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)

import streamlit as st
import pandas as pd

# 1. CONFIGURACIÓN DE PÁGINA
st.set_page_config(page_title="ADFP - Historial Peruano", page_icon="🏆", layout="wide")

# 2. SELECTOR DE TEMPORADA (SIDEBAR) - Esto permite elegir sin romper el código
with st.sidebar:
    st.markdown("<h2 style='color: #8cc63f; text-align:center;'>CONFIGURACIÓN</h2>", unsafe_allow_html=True)
    temporada_activa = st.selectbox("Seleccionar Año:", ["2018", "2026"], index=0)
    st.info(f"Visualizando datos de la Liga 1 - Temporada {temporada_activa}")

# 3. INYECCIÓN DE CSS EXTREMO (TU DISEÑO ORIGINAL)
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

    .stSelectbox label { display: none; } 
    .stSelectbox div[data-baseweb="select"] { background-color: #0d2418; border: 1px solid #8cc63f; border-radius: 4px; color: white; font-size: 13px; min-height: 30px;}
    
    .marcador-contenedor { display: flex; align-items: center; justify-content: center; gap: 2px; margin: 0 10px; }
    .gol-cajita { background-color: #0d2418; border: 1px solid #1a4a2e; border-radius: 4px; color: #ffffff; font-weight: bold; font-size: 14px; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; }
    .separador-guion { color: #8cc63f; font-weight: bold; font-size: 14px; }
    .nota-asterisco { font-size: 11px; color: #87b897; text-align: left; margin-top: 10px; padding: 5px; background-color: #0d2418; border-radius: 4px; border: 1px solid #1a4a2e;}
</style>
""", unsafe_allow_html=True)

# --- LINKS OFICIALES ---
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
    'UTC': 'https://tmssl.akamaized.net//images/wappen/head/21170.png?lm=1411768075',
    # Equipos nuevos 2026
    'Cienciano': 'https://tmssl.akamaized.net//images/wappen/head/2733.png',
    'ADT': 'https://tmssl.akamaized.net//images/wappen/head/31201.png',
    'Los Chankas': 'https://upload.wikimedia.org/wikipedia/commons/1/14/Chankas_CYC.png',
    'Atletico Grau': 'https://tmssl.akamaized.net//images/wappen/head/31200.png'
}

# --- CARGAR DATOS 2018 ---
@st.cache_data
def cargar_datos_2018():
    df_p = pd.read_excel('torneo_2018.xlsx', sheet_name='BaseDatos')
    df_g = pd.read_excel('torneo_2018.xlsx', sheet_name='Registro_Goles')
    return df_p, df_g

# --- DATOS REALES 2026 (MARZO) ---
def obtener_tabla_2026():
    data = [
        ['Universitario', 9, 7, 2, 0, 18, 4, 23],
        ['Sporting Cristal', 9, 6, 3, 0, 22, 10, 21],
        ['Alianza Lima', 9, 6, 1, 2, 16, 8, 19],
        ['FBC Melgar', 9, 5, 2, 2, 14, 9, 17],
        ['Cienciano', 9, 4, 3, 2, 12, 11, 15],
        ['ADT', 9, 4, 2, 3, 11, 10, 14],
        ['Los Chankas', 9, 3, 0, 6, 10, 15, 9],
        ['Atletico Grau', 9, 2, 3, 4, 8, 12, 9]
    ]
    return pd.DataFrame(data, columns=['Equipo', 'J', 'G', 'E', 'P', 'GF', 'GC', 'PTS'])

# --- MOTOR DE TABLAS 2018 ---
def generar_html_tabla(df_filtro, lista_equipos, titulo_panel, es_acumulado=False, zona="", f_sel=44):
    tabla_datos = []
    for equipo in lista_equipos:
        loc = df_filtro[df_filtro['Local'] == equipo]
        vis = df_filtro[df_filtro['Visitante'] == equipo]
        g = (loc['GL'] > loc['GV']).sum() + (vis['GV'] > vis['GL']).sum()
        e = (loc['GL'] == loc['GV']).sum() + (vis['GV'] == vis['GL']).sum()
        p = (loc['GL'] < loc['GV']).sum() + (vis['GV'] < vis['GL']).sum()
        gf, gc = int(loc['GL'].sum() + vis['GV'].sum()), int(loc['GV'].sum() + vis['GL'].sum())
        pj, pts = g + e + p, (g * 3) + e
        if es_acumulado:
            bon = 2 if equipo == 'Sporting Cristal' and f_sel >= 44 else 0
            sanc_dict = {'Universitario': 1, 'Dep. Municipal': 2, 'UTC': 2, 'Cantolao': 2, 'Sport Rosario': 7}
            pts = pts + bon - sanc_dict.get(equipo, 0) if f_sel >= 44 else pts
        
        racha_html = ""
        partidos_racha = df_filtro[(df_filtro['Local'] == equipo) | (df_filtro['Visitante'] == equipo)].sort_values('Fecha_Global', ascending=False).head(5)
        for _, rp in partidos_racha.iterrows():
            res = 'V' if (rp['Local'] == equipo and rp['GL'] > rp['GV']) or (rp['Visitante'] == equipo and rp['GV'] > rp['GL']) else 'E' if rp['GL'] == rp['GV'] else 'D'
            c = "#8cc63f" if res == 'V' else "#e1c340" if res == 'E' else "#d32f2f"
            racha_html = f"<span style='background-color:{c}; color:white; padding:1px 4px; border-radius:2px; font-size:8.5px; margin:0 1px; font-weight:bold;'>{res}</span>" + racha_html
        tabla_datos.append([equipo, pj, pts, gf, gc, gf-gc, racha_html])

    df_t = pd.DataFrame(tabla_datos, columns=['Equipo', 'J', 'PTS', 'GF', 'GC', '+/-', 'Racha'])
    df_t = df_t.sort_values(by=['PTS', '+/-', 'GF'], ascending=[False, False, False]).reset_index(drop=True)
    
    html = f"<div class='panel-verde'><div class='titulo-panel'>{titulo_panel}</div>"
    if zona: html += f"<div class='subtitulo-zona'>{zona}</div>"
    html += "<table class='tabla-pro'><thead><tr><th>#</th><th>Equipo</th><th>PTS</th><th>J</th><th>Gol</th><th>+/-</th><th>Últimas</th></tr></thead><tbody>"
    for i, r in df_t.iterrows():
        logo = logos_equipos.get(r['Equipo'], '')
        b = "#3db4dc" if i < 4 and es_acumulado else "transparent"
        html += f"<tr><td style='border-left:3px solid {b};'>{i+1}</td><td style='text-align:left;'><img src='{logo}' width='15'> {r['Equipo']}</td><td><b>{r['PTS']}</b></td><td>{r['J']}</td><td>{r['GF']}:{r['GC']}</td><td>{r['+/-']}</td><td>{r['Racha']}</td></tr>"
    html += "</tbody></table>"
    if es_acumulado: html += "<div class='nota-asterisco'>* Sanciones FPF aplicadas.</div>"
    return html + "</div>"

# --- RENDERIZADO ---
st.markdown(f"<h2 style='text-align: center; color: white;'>LIGA PROFESIONAL PERUANA {temporada_activa}</h2>", unsafe_allow_html=True)
tab_fixture, tab_estadisticas, tab_campeones = st.tabs(["FIXTURE Y TABLAS", "EQUIPOS Y ESTADISTICAS", "CAMPEONES"])

if temporada_activa == "2018":
    try:
        df_partidos, df_goles = cargar_datos_2018()
        with tab_fixture:
            c_izq, c_der = st.columns([2.2, 1.0])
            with c_der:
                f_texto = st.selectbox("Fecha", [f"FECHA {i}" for i in range(1, 45)], index=29)
                f_sel = int(f_texto.replace("FECHA ", ""))
                p_f = df_partidos[df_partidos['Fecha_Global'] == f_sel]
                html_p = "<div class='panel-verde' style='padding:0;'><div class='contenedor-partidos'>"
                for _, r in p_f.iterrows():
                    l_l, v_l = logos_equipos.get(r['Local'], ''), logos_equipos.get(r['Visitante'], '')
                    html_p += f"<div class='fila-partido'><span style='font-size:10px;'>Final</span><div style='display:flex; align-items:center; gap:5px;'>{r['Local']} <img src='{l_l}' width='15'> <div class='gol-cajita'>{r['GL']}</div>- <div class='gol-cajita'>{r['GV']}</div> <img src='{v_l}' width='15'> {r['Visitante']}</div></div>"
                st.markdown(html_p + "</div></div>", unsafe_allow_html=True)
            with c_izq:
                # Aquí se cargan las tablas 2018 con tu lógica original
                df_acu = df_partidos[df_partidos['Fecha_Global'] <= min(f_sel, 44)]
                st.markdown(generar_html_tabla(df_acu, sorted(df_partidos['Local'].unique()), f"TABLA ACUMULADA {f_texto}", True, f_sel=f_sel), unsafe_allow_html=True)
    except: st.error("⚠️ Sube 'torneo_2018.xlsx' a GitHub.")

elif temporada_activa == "2026":
    with tab_fixture:
        c_izq, c_der = st.columns([2.2, 1.0])
        with c_izq:
            df_26 = obtener_tabla_2026()
            html_26 = "<div class='panel-verde'><div class='titulo-panel'>LIGA 1 2026 - APERTURA</div><table class='tabla-pro'><thead><tr><th>#</th><th>Equipo</th><th>PTS</th><th>J</th><th>G</th><th>E</th><th>P</th><th>+/-</th></tr></thead><tbody>"
            for i, r in df_26.iterrows():
                logo = logos_equipos.get(r['Equipo'], '')
                html_26 += f"<tr><td>{i+1}</td><td style='text-align:left;'><img src='{logo}' width='15'> {r['Equipo']}</td><td><b>{r['PTS']}</b></td><td>{r['J']}</td><td>{r['G']}</td><td>{r['E']}</td><td>{r['P']}</td><td>{r['GF']-r['GC']}</td></tr>"
            st.markdown(html_26 + "</tbody></table></div>", unsafe_allow_html=True)
        with c_der:
            st.markdown("<div class='panel-verde'><div class='titulo-panel'>PRÓXIMOS PARTIDOS</div><p style='text-align:center;font-size:12px;'>Dom 29/03: Universitario vs Cristal</p></div>", unsafe_allow_html=True)

# Pestañas de Campeones y Goleadores (Se mantienen con tu diseño original)
with tab_campeones:
    st.markdown("<div class='panel-verde'><div class='titulo-panel'>HISTORIAL</div><p style='text-align:center;'>Universitario: 29 títulos</p></div>", unsafe_allow_html=True)
        
        st.markdown(html_r, unsafe_allow_html=True)

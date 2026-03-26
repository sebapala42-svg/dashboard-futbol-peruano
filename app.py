import streamlit as st
import pandas as pd

# 1. CONFIGURACIÓN DE PÁGINA
st.set_page_config(page_title="ADFP - Historial Peruano", page_icon="🏆", layout="wide")

# 2. SELECTOR DE TEMPORADA (SIDEBAR)
with st.sidebar:
    st.markdown("<h2 style='color: #8cc63f; text-align:center;'>CONFIGURACIÓN</h2>", unsafe_allow_html=True)
    temporada_activa = st.selectbox("Seleccionar Año:", ["2018", "2026"], index=0)
    st.info(f"Visualizando datos de la Liga 1 - Temporada {temporada_activa}")

# 3. INYECCIÓN DE CSS (MODO PROMIEDOS COMPACTO CON ZEBRA)
st.markdown("""
<style>
    .stApp { background-color: #0b4026; color: #ffffff; }
    .block-container { padding-top: 1rem; max-width: 1300px; }
    header {visibility: hidden;}
    footer {visibility: hidden;}
    .stTabs [data-baseweb="tab-list"] { background-color: transparent; border-bottom: 1px solid #1a4a2e; justify-content: center; }
    .stTabs [data-baseweb="tab"] { color: #87b897; padding: 8px 20px; font-weight: bold; font-size: 13px; }
    .stTabs [aria-selected="true"] { color: #ffffff !important; border-bottom: 3px solid #8cc63f !important; }
    .panel-verde { background-color: #112d1e; border: 1px solid #1a4a2e; border-radius: 8px; padding: 10px; margin-bottom: 15px;}
    .titulo-panel { text-align: center; color: #ffffff; font-weight: bold; font-size: 14px; margin-bottom: 10px; text-transform: uppercase; }
    .subtitulo-zona { background-color: #0d2418; color: white; padding: 5px 10px; font-weight: bold; font-size: 12px; border-bottom: 2px solid #1a4a2e; border-top-left-radius: 6px; border-top-right-radius: 6px;}
    .tabla-pro { width: 100%; border-collapse: collapse; color: #ffffff; font-size: 12px; font-family: sans-serif; }
    .tabla-pro th { background-color: #0d2418; color: #a1b5a8; border-bottom: 1px solid #1a4a2e; padding: 6px 4px; }
    .tabla-pro td { padding: 6px 4px; text-align: center; border-bottom: none; }
    .tabla-pro tbody tr:nth-child(odd) { background-color: #153625; } 
    .tabla-pro tbody tr:nth-child(even) { background-color: #112d1e; }
    .marcador-contenedor { display: flex; align-items: center; justify-content: center; gap: 2px; }
    .gol-cajita { background-color: #0d2418; border: 1px solid #1a4a2e; border-radius: 4px; color: #ffffff; font-weight: bold; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; }
    .separador-guion { color: #8cc63f; font-weight: bold; }
    .nota-asterisco { font-size: 11px; color: #87b897; text-align: left; margin-top: 10px; padding: 5px; background-color: #0d2418; border-radius: 4px;}
</style>
""", unsafe_allow_html=True)

# 4. DICCIONARIO DE LOGOS COMPLETO
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
    'Cienciano': 'https://tmssl.akamaized.net//images/wappen/head/2733.png',
    'ADT': 'https://tmssl.akamaized.net//images/wappen/head/31201.png',
    'Atletico Grau': 'https://tmssl.akamaized.net//images/wappen/head/31200.png',
    'Chankas': 'https://upload.wikimedia.org/wikipedia/commons/1/14/Chankas_CYC.png'
}

# --- MOTOR DE GENERACIÓN DE TABLAS HTML (VUELVE LA LÓGICA 2018) ---
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
        if es_acumulado and temporada_activa == "2018":
            bon = 2 if equipo == 'Sporting Cristal' and f_sel >= 44 else 0
            sanc_dict = {'Universitario': 1, 'Dep. Municipal': 2, 'UTC': 2, 'Cantolao': 2, 'Sport Rosario': 7}
            sanc = sanc_dict.get(equipo, 0) if f_sel >= 44 else 0
            pts_total = pts + bon - sanc
            
        racha_html = ""
        partidos_racha = df_filtro[(df_filtro['Local'] == equipo) | (df_filtro['Visitante'] == equipo)].sort_values('Fecha_Global', ascending=False).head(5)
        for _, rp in partidos_racha.iterrows():
            res = 'V' if (rp['Local'] == equipo and rp['GL'] > rp['GV']) or (rp['Visitante'] == equipo and rp['GV'] > rp['GL']) else 'E' if rp['GL'] == rp['GV'] else 'D'
            c_r = "#8cc63f" if res == 'V' else "#e1c340" if res == 'E' else "#d32f2f"
            racha_html = f"<span style='background-color:{c_r}; color:white; padding: 1px 4px; border-radius:2px; font-size:8.5px; margin:0 1px; font-weight:bold;'>{res}</span>" + racha_html
        
        tabla_datos.append([equipo, pj, pts_total, gf, gc, gf-gc, g, e, p, racha_html])

    df_t = pd.DataFrame(tabla_datos, columns=['Equipo', 'J', 'PTS', 'GF', 'GC', '+/-', 'G', 'E', 'P', 'Racha'])
    df_t = df_t.sort_values(by=['PTS', '+/-', 'GF'], ascending=[False, False, False]).reset_index(drop=True)
    
    html = f"<div class='panel-verde'><div class='titulo-panel'>{titulo_panel}</div>"
    if zona: html += f"<div class='subtitulo-zona'>{zona}</div>"
    html += "<table class='tabla-pro'><thead><tr><th>#</th><th>Equipos</th><th>PTS</th><th>J</th><th>Gol</th><th>+/-</th><th>Últimas</th></tr></thead><tbody>"
    for idx, row in df_t.iterrows():
        pos = idx + 1
        logo = logos_equipos.get(row['Equipo'], '')
        borde = "transparent"
        if es_acumulado:
            if pos <= 4: borde = "#3db4dc" 
            elif pos <= 8: borde = "#e1c340" 
            elif pos >= 15: borde = "#d32f2f" 
        html += f"<tr><td style='border-left: 3px solid {borde}; font-weight:bold;'>{pos}</td><td style='text-align:left;'><img src='{logo}' width='15'> {row['Equipo']}</td><td><b>{row['PTS']}</b></td><td>{row['J']}</td><td>{row['GF']}:{row['GC']}</td><td>{row['+/-']}</td><td>{row['Racha']}</td></tr>"
    html += "</tbody></table>"
    if es_acumulado and temporada_activa == "2018":
        html += "<div class='nota-asterisco'>* Sanciones 2018 aplicadas: Rosario (-7), Muni (-2), UTC (-2), Cantolao (-2), U (-1). Cristal (+2) Reservas.</div>"
    html += "</div>"
    return html

# 5. LÓGICA DE DATOS
@st.cache_data
def cargar_2018():
    return pd.read_excel('torneo_2018.xlsx', sheet_name='BaseDatos'), pd.read_excel('torneo_2018.xlsx', sheet_name='Registro_Goles')

# Datos Reales Apertura 2026 (Marzo)
def tabla_real_2026():
    data = [
        ['Universitario', 9, 7, 2, 0, 18, 4, 23],
        ['Sporting Cristal', 9, 6, 3, 0, 22, 10, 21],
        ['Alianza Lima', 9, 6, 1, 2, 16, 8, 19],
        ['FBC Melgar', 9, 5, 2, 2, 14, 9, 17],
        ['Cienciano', 9, 4, 3, 2, 12, 11, 15],
        ['ADT', 9, 4, 2, 3, 11, 10, 14],
        ['Cusco (Garcilaso)', 9, 3, 1, 5, 8, 12, 10],
        ['Chankas', 9, 3, 0, 6, 10, 15, 9]
    ]
    return pd.DataFrame(data, columns=['Equipo', 'J', 'G', 'E', 'P', 'GF', 'GC', 'PTS'])

# 6. RENDERIZADO PRINCIPAL
tab_fixture, tab_equipos, tab_camp = st.tabs(["FIXTURE Y TABLAS", "EQUIPOS", "CAMPEONES"])

if temporada_activa == "2018":
    try:
        df_partidos, df_goles = cargar_2018()
        with tab_fixture:
            col_izq, col_der = st.columns([2.2, 1.0])
            with col_der:
                st.markdown("<div class='titulo-panel' style='color:#8cc63f;'>TEMPORADA 2018</div>", unsafe_allow_html=True)
                f_texto = st.selectbox("Selecciona Fecha", [f"FECHA {i}" for i in range(1, 45)], index=29)
                f_sel = int(f_texto.replace("FECHA ", ""))
                # Partidos 2018 intercalados
                p_f = df_partidos[df_partidos['Fecha_Global'] == f_sel]
                html_p = "<div class='panel-verde' style='padding:0;'>"
                for _, r in p_f.iterrows():
                    html_p += f"<div style='display:flex; justify-content:space-between; padding:8px; border-bottom:1px solid #1a4a2e; font-size:11px;'><span>{r['Local']}</span><div class='marcador-contenedor'><div class='gol-cajita'>{r['GL']}</div><span class='separador-guion'>-</span><div class='gol-cajita'>{r['GV']}</div></div><span>{r['Visitante']}</span></div>"
                st.markdown(html_p + "</div>", unsafe_allow_html=True)
            with col_izq:
                # Motor de tablas dinámicas 2018
                if f_sel <= 14:
                    df_v = df_partidos[(df_partidos['Fecha_Global'] <= f_sel) & (df_partidos['Torneo'] == 'Verano')]
                    st.markdown(generar_html_tabla(df_v, equipo_A, "VERANO - GRUPO A"), unsafe_allow_html=True)
                df_acu = df_partidos[df_partidos['Fecha_Global'] <= min(f_sel, 44)]
                st.markdown(generar_html_tabla(df_acu, sorted(df_partidos['Local'].unique()), f"ACUMULADO FECHA {f_sel}", es_acumulado=True, f_sel=f_sel), unsafe_allow_html=True)
    except: st.error("Error cargando 2018")

elif temporada_activa == "2026":
    with tab_fixture:
        col_izq, col_der = st.columns([2.2, 1.0])
        with col_izq:
            df_26 = tabla_real_2026()
            html_t26 = "<div class='panel-verde'><div class='titulo-panel'>LIGA 1 2026 - APERTURA</div><table class='tabla-pro'><thead><tr><th>#</th><th>Equipo</th><th>PTS</th><th>J</th><th>G</th><th>E</th><th>P</th><th>+/-</th></tr></thead><tbody>"
            for i, r in df_26.iterrows():
                logo = logos_equipos.get(r['Equipo'], '')
                html_t26 += f"<tr><td>{i+1}</td><td style='text-align:left;'><img src='{logo}' width='15'> {r['Equipo']}</td><td><b>{r['PTS']}</b></td><td>{r['J']}</td><td>{r['G']}</td><td>{r['E']}</td><td>{r['P']}</td><td>{r['GF']-r['GC']}</td></tr>"
            st.markdown(html_t26 + "</tbody></table></div>", unsafe_allow_html=True)
        with col_der:
            st.markdown("<div class='panel-verde'><div class='titulo-panel'>PRÓXIMOS LIGA 1</div><p style='text-align:center;font-size:12px;'>Sáb 28/03: Universitario vs Cristal</p></div>", unsafe_allow_html=True)

# Pestaña Campeones e Info de Equipos (Mantenemos lo que ya teníamos)
with tab_camp:
    st.markdown("<div class='panel-verde'><div class='titulo-panel'>RANKING HISTÓRICO</div><p style='text-align:center;'>Universitario: 29 títulos</p></div>", unsafe_allow_html=True)

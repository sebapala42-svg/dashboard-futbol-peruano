import streamlit as st
import pandas as pd

# 1. CONFIGURACIÓN DE PÁGINA
st.set_page_config(page_title="Liga Peruana 2018", page_icon="🏆", layout="wide")

# 2. SELECTOR DE TEMPORADA (SIDEBAR)
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
    .fila-partido:hover { background-color: #1c4531; }

    .stSelectbox label { display: none; } 
    .stSelectbox div[data-baseweb="select"] { background-color: #0d2418; border: 1px solid #8cc63f; border-radius: 4px; color: white; font-size: 13px; min-height: 30px;}
    h2 { font-size: 1.5rem !important; margin-bottom: 10px !important; padding-bottom: 0px !important;}

    .marcador-contenedor { display: flex; align-items: center; justify-content: center; gap: 2px; margin: 0 10px; }
    .gol-cajita { background-color: #0d2418; border: 1px solid #1a4a2e; border-radius: 4px; color: #ffffff; font-weight: bold; font-size: 14px; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; }
    .separador-guion { color: #8cc63f; font-weight: bold; font-size: 14px; }
    
    .nota-asterisco { font-size: 11px; color: #87b897; text-align: left; margin-top: 10px; padding: 5px; background-color: #0d2418; border-radius: 4px; border: 1px solid #1a4a2e;}

    /* Grid Equipos */
    .eq-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;padding:5px;}
    .eq-card{background-color:#051d10;border:1px solid #1a4a2e;border-radius:6px;padding:15px 5px;text-align:center;position:relative;transition:0.2s;}
    .eq-card:hover{border-color:#8cc63f;background-color:#0c3620;transform:translateY(-3px);}
    .eq-logo{width:45px;height:45px;object-fit:contain;margin-bottom:8px;}
    .eq-nom{color:#ffffff;font-weight:bold;font-size:11px;text-transform:uppercase;display:block;}
    .eq-badge{position:absolute;top:5px;right:5px;color:#ffffff;font-size:9px;font-weight:bold;display:flex;align-items:center;gap:2px;}
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
    'Cienciano': 'https://tmssl.akamaized.net//images/wappen/head/2733.png',
    'ADT': 'https://tmssl.akamaized.net//images/wappen/head/31201.png',
    'Atletico Grau': 'https://tmssl.akamaized.net//images/wappen/head/31200.png',
    'Los Chankas': 'https://upload.wikimedia.org/wikipedia/commons/1/14/Chankas_CYC.png'
}

equipo_A = ['Sporting Cristal', 'Sport Rosario', 'UTC', 'U. San Martin', 'Alianza Lima', 'Comerciantes Unidos', 'Ayacucho FC', 'Universitario']
equipo_B = ['Sport Huancayo', 'FBC Melgar', 'Cantolao', 'Dep. Municipal', 'Sport Boys', 'Cusco (Garcilaso)', 'Binacional', 'Union Comercio']

# --- CARGAR DATOS ---
@st.cache_data
def cargar_datos():
    df_p = pd.read_excel('torneo_2018.xlsx', sheet_name='BaseDatos')
    df_g = pd.read_excel('torneo_2018.xlsx', sheet_name='Registro_Goles')
    return df_p, df_g

# --- MOTOR CREADOR DE TABLAS (LÓGICA TUYA) ---
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
            
        partidos_equipo = df_filtro[(df_filtro['Local'] == equipo) | (df_filtro['Visitante'] == equipo)].sort_values('Fecha_Global', ascending=False).head(5)
        racha_html = ""
        for _, rp in partidos_equipo.iterrows():
            res = 'V' if (rp['Local'] == equipo and rp['GL'] > rp['GV']) or (rp['Visitante'] == equipo and rp['GV'] > rp['GL']) else 'E' if rp['GL'] == rp['GV'] else 'D'
            color_racha = "#8cc63f" if res == 'V' else "#e1c340" if res == 'E' else "#d32f2f"
            racha_html = f"<span style='background-color:{color_racha}; color:white; padding: 1px 4px; border-radius:2px; font-size:8.5px; margin:0 1px; font-weight:bold;'>{res}</span>" + racha_html
        
        tabla_datos.append([equipo, pj, pts_total, gf, gc, gf-gc, g, e, p, racha_html])

    df_t = pd.DataFrame(tabla_datos, columns=['Equipo', 'J', 'PTS', 'GF', 'GC', '+/-', 'G', 'E', 'P', 'Racha'])
    df_t = df_t.sort_values(by=['PTS', '+/-', 'GF'], ascending=[False, False, False]).reset_index(drop=True)
    
    html = f"<div class='panel-verde'><div class='titulo-panel'>{titulo_panel}</div>"
    if zona: html += f"<div class='subtitulo-zona'>{zona}</div>"
    html += "<table class='tabla-pro'><thead><tr><th style='width:20px;'>#</th><th>Equipos</th><th>PTS</th><th>J</th><th>Gol</th><th>+/-</th><th>Últimas</th></tr></thead><tbody>"
    
    for idx, row in df_t.iterrows():
        pos = idx + 1
        logo = logos_equipos.get(row['Equipo'], '')
        borde = "transparent"
        if es_acumulado and temporada_activa == "2018":
            if pos <= 4: borde = "#3db4dc" 
            elif pos <= 8: borde = "#e1c340" 
            elif pos >= 15: borde = "#d32f2f" 
        elif pos == 1: borde = "#3db4dc"
            
        html += f"<tr><td style='border-left: 3px solid {borde}; font-weight:bold;'>{pos}</td><td style='text-align:left;'><img src='{logo}' width='15' height='15' style='object-fit:contain; vertical-align:middle; margin-right:6px;' onerror=\"this.style.display='none'\"> <span style='color:#ffffff;'>{row['Equipo']}</span></td><td style='font-weight:bold; font-size:13px; color:#ffffff;'>{row['PTS']}</td><td style='color:#ffffff;'>{row['J']}</td><td style='color:#ffffff;'>{row['GF']}:{row['GC']}</td><td style='color:#ffffff;'>{row['+/-']}</td><td>{row['Racha']}</td></tr>"
    html += "</tbody></table>"
    if es_acumulado and temporada_activa == "2018":
        html += "<div class='nota-asterisco'>* Nota: Resoluciones de la FPF aplicadas en esta tabla Acumulada 2018: Sanciones a Rosario (-7), Muni (-2), UTC (-2), Cantolao (-2) y U (-1). Cristal (+2) Reservas.</div>"
    html += "</div>"
    return html

# --- RENDERIZADO ---
st.markdown(f"<h2 style='text-align: center; color: white;'>LIGA PROFESIONAL PERUANA {temporada_activa}</h2>", unsafe_allow_html=True)
tab_fixture, tab_estadisticas, tab_campeones = st.tabs(["FIXTURE Y TABLAS", "EQUIPOS", "CAMPEONES"])

if temporada_activa == "2018":
    try:
        df_partidos, df_goles = cargar_datos()
        todos_equipos_2018 = sorted(list(df_partidos['Local'].unique()))
        with tab_fixture:
            col_izq, col_der = st.columns([2.2, 1.0])
            with col_der:
                st.markdown("<div class='titulo-panel' style='color:#8cc63f; margin-bottom: 5px;'>TEMPORADA 2018</div>", unsafe_allow_html=True)
                f_texto = st.selectbox("Fecha", [f"FECHA {i}" for i in range(1, 45)], index=29)
                f_sel = int(f_texto.replace("FECHA ", ""))
                p_f = df_partidos[df_partidos['Fecha_Global'] == f_sel]
                html_p = "<div class='panel-verde' style='padding:0;'><div class='contenedor-partidos'>"
                for _, r in p_f.iterrows():
                    l_logo, v_logo = logos_equipos.get(r['Local'], ''), logos_equipos.get(r['Visitante'], '')
                    html_p += f"<div class='fila-partido'><span style='color:white; font-size:10px; font-weight:bold;'>Final</span><div style='display:flex; align-items:center; width: 85%; justify-content: center;'><span style='text-align:right; width:40%; font-size:12px; color:#ffffff; font-weight:bold;'>{r['Local']}</span><img src='{l_logo}' width='18' height='18' style='margin: 0 5px;'><div class='marcador-contenedor'><div class='gol-cajita'>{r['GL']}</div><div class='separador-guion'>-</div><div class='gol-cajita'>{r['GV']}</div></div><img src='{v_logo}' width='18' height='18' style='margin: 0 5px;'><span style='text-align:left; width:40%; font-size:12px; color:#ffffff; font-weight:bold;'>{r['Visitante']}</span></div></div>"
                st.markdown(html_p + "</div></div>", unsafe_allow_html=True)
            with col_izq:
                if f_sel <= 14:
                    df_v = df_partidos[(df_partidos['Fecha_Global'] <= f_sel) & (df_partidos['Torneo'] == 'Verano')]
                    st.markdown(generar_html_tabla(df_v, equipo_A, "TORNEO DE VERANO", zona="GRUPO A"), unsafe_allow_html=True)
                    st.markdown(generar_html_tabla(df_v, equipo_B, "TORNEO DE VERANO", zona="GRUPO B"), unsafe_allow_html=True)
                df_acu = df_partidos[df_partidos['Fecha_Global'] <= min(f_sel, 44)]
                st.markdown(generar_html_tabla(df_acu, todos_equipos_2018, f"TABLA ACUMULADA (HASTA LA {f_texto})", True, f_sel=f_sel), unsafe_allow_html=True)
    except: st.error("⚠️ Sube tu archivo 'torneo_2018.xlsx' a GitHub.")

elif temporada_activa == "2026":
    # Datos Reales Liga 1 2026 (Marzo 2026)
    data_2026 = [['Universitario', 9, 23, 18, 4, 14], ['Sporting Cristal', 9, 21, 22, 10, 12], ['Alianza Lima', 9, 19, 16, 8, 8], ['FBC Melgar', 9, 17, 14, 9, 5], ['Cienciano', 9, 15, 12, 11, 1], ['ADT', 9, 14, 11, 10, 1], ['Los Chankas', 9, 9, 10, 15, -5], ['Atletico Grau', 9, 9, 8, 12, -4]]
    df_26 = pd.DataFrame(data_2026, columns=['Equipo', 'J', 'PTS', 'GF', 'GC', '+/-'])
    with tab_fixture:
        c_izq, c_der = st.columns([2.2, 1.0])
        with c_izq:
            html_26 = "<div class='panel-verde'><div class='titulo-panel'>LIGA 1 2026 - APERTURA</div><table class='tabla-pro'><thead><tr><th>#</th><th>Equipo</th><th>PTS</th><th>J</th><th>Gol</th><th>+/-</th></tr></thead><tbody>"
            for i, r in df_26.iterrows():
                logo = logos_equipos.get(r['Equipo'], '')
                html_26 += f"<tr><td style='border-left:3px solid {'#3db4dc' if i==0 else 'transparent'};'>{i+1}</td><td style='text-align:left;'><img src='{logo}' width='15'> {r['Equipo']}</td><td><b>{r['PTS']}</b></td><td>{r['J']}</td><td>{r['GF']}:{r['GC']}</td><td>{r['+/-']}</td></tr>"
            st.markdown(html_26 + "</tbody></table></div>", unsafe_allow_html=True)
        with c_der:
            st.markdown("<div class='panel-verde'><div class='titulo-panel'>PRÓXIMOS PARTIDOS</div><p style='text-align:center;font-size:12px;'>Dom 29/03: Universitario vs Cristal</p></div>", unsafe_allow_html=True)

with tab_estadisticas:
    st.markdown("<h3 style='text-align: center; color: white;'>EQUIPOS LIGA 1</h3>", unsafe_allow_html=True)
    tit_h = {'Universitario': 29, 'Alianza Lima': 25, 'Sporting Cristal': 20, 'Sport Boys': 6, 'Dep. Municipal': 4, 'U. San Martin': 3, 'FBC Melgar': 2, 'Binacional': 1}
    html_grid = "<div class='eq-grid'>"
    for eq, logo in logos_equipos.items():
        copas = tit_h.get(eq, 0)
        badge = f"<div class='eq-badge'>🏆{copas}</div>" if copas > 0 else ""
        html_grid += f"<div class='eq-card'>{badge}<img src='{logo}' class='eq-logo'><span class='eq-nom'>{eq}</span></div>"
    st.markdown(html_grid + "</div>", unsafe_allow_html=True)

with tab_campeones:
    col_hist, col_rank = st.columns([1.5, 1])
    with col_hist:
        st.markdown("<div class='panel-verde' style='padding:0;'><div class='titulo-panel' style='padding-top:10px;'>HISTORIAL</div>", unsafe_allow_html=True)
        hist_data = [["2025", "Universitario"], ["2024", "Universitario"], ["2023", "Universitario"], ["2022", "Alianza Lima"]]
        html_h = "<table class='tabla-pro' style='margin:0;'><tbody>"
        for r in hist_data:
            html_h += f"<tr><td style='font-weight:bold;'>{r[0]}</td><td style='text-align:left;'><img src='{logos_equipos.get(r[1], '')}' width='15'> {r[1]}</td></tr>"
        st.markdown(html_h + "</tbody></table></div>", unsafe_allow_html=True)
    with col_rank:
        st.markdown("<div class='panel-verde' style='padding:0;'><div class='titulo-panel' style='padding-top:10px;'>RANKING LIGAS</div>", unsafe_allow_html=True)
        rank_data = [["Universitario", 29], ["Alianza Lima", 25], ["Sporting Cristal", 20]]
        html_r = "<table class='tabla-pro' style='margin:0;'><tbody>"
        for r in rank_data:
            html_r += f"<tr><td style='text-align:left;'><img src='{logos_equipos.get(r[0], '')}' width='15'> {r[0]}</td><td style='font-weight:bold;'>{r[1]}</td></tr>"
        st.markdown(html_r + "</tbody></table></div>", unsafe_allow_html=True)

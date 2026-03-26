import streamlit as st
import pandas as pd

# 1. CONFIGURACIÓN DE PÁGINA
st.set_page_config(page_title="ADFP - Historial Peruano", page_icon="🏆", layout="wide")

# 2. SELECTOR DE TEMPORADA (SIDEBAR)
with st.sidebar:
    st.markdown("<h2 style='color: #8cc63f; text-align:center;'>CONFIGURACIÓN</h2>", unsafe_allow_html=True)
    temporada_activa = st.selectbox("Seleccionar Año:", ["2026", "2018"], index=0)
    st.info(f"Visualizando datos de la Liga 1 - Temporada {temporada_activa}")

# 3. INYECCIÓN DE CSS (ESTILO PROMIEDOS COMPACTO)
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
    .tabla-pro { width: 100%; border-collapse: collapse; color: #ffffff; font-size: 12px; font-family: sans-serif; }
    .tabla-pro th { background-color: #0d2418; color: #a1b5a8; border-bottom: 1px solid #1a4a2e; padding: 6px 4px; }
    .tabla-pro td { padding: 6px 4px; text-align: center; }
    .tabla-pro tbody tr:nth-child(odd) { background-color: #153625; } 
    .tabla-pro tbody tr:nth-child(even) { background-color: #112d1e; }
    .marcador-contenedor { display: flex; align-items: center; justify-content: center; gap: 2px; }
    .gol-cajita { background-color: #0d2418; border: 1px solid #1a4a2e; border-radius: 4px; color: #ffffff; font-weight: bold; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; }
</style>
""", unsafe_allow_html=True)

# 4. LINKS DE ESCUDOS
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
    'Atletico Grau': 'https://tmssl.akamaized.net//images/wappen/head/31200.png'
}

# 5. CARGA DE DATOS SEGÚN TEMPORADA
@st.cache_data
def cargar_datos_2018():
    df_p = pd.read_excel('torneo_2018.xlsx', sheet_name='BaseDatos')
    df_g = pd.read_excel('torneo_2018.xlsx', sheet_name='Registro_Goles')
    return df_p, df_g

def obtener_datos_2026():
    # Datos en vivo de la Fecha 9 - Apertura 2026
    data_2026 = [
        ['Universitario', 9, 7, 2, 0, 18, 4, 23],
        ['Sporting Cristal', 9, 6, 2, 1, 20, 9, 20],
        ['Alianza Lima', 9, 6, 1, 2, 15, 7, 19],
        ['FBC Melgar', 9, 5, 2, 2, 14, 8, 17],
        ['Cienciano', 9, 4, 3, 2, 12, 10, 15],
        ['ADT', 9, 4, 1, 4, 11, 12, 13],
        ['Cusco (Garcilaso)', 9, 3, 2, 4, 9, 11, 11],
        ['Atletico Grau', 9, 2, 4, 3, 8, 10, 10]
    ]
    df_t = pd.DataFrame(data_2026, columns=['Equipo', 'J', 'G', 'E', 'P', 'GF', 'GC', 'PTS'])
    df_t['+/-'] = df_t['GF'] - df_t['GC']
    return df_t

# LÓGICA DE CARGA
if temporada_activa == "2018":
    try:
        df_partidos, df_goles = cargar_datos_2018()
        todos_equipos = sorted(df_partidos['Local'].unique())
    except:
        st.error("Sube 'torneo_2018.xlsx' a GitHub.")
        st.stop()
else:
    df_tabla_2026 = obtener_datos_2026()
    todos_equipos = df_tabla_2026['Equipo'].tolist()

# 6. RENDERIZADO
st.markdown(f"<h2 style='text-align: center;'>LIGA PROFESIONAL PERUANA {temporada_activa}</h2>", unsafe_allow_html=True)
tab_fix, tab_stats, tab_camp = st.tabs(["FIXTURE Y TABLAS", "EQUIPOS", "CAMPEONES"])

with tab_fix:
    col_izq, col_der = st.columns([2.2, 1.0])
    
    with col_izq:
        if temporada_activa == "2026":
            st.markdown("<div class='panel-verde'><div class='titulo-panel'>TABLA APERTURA 2026</div>", unsafe_allow_html=True)
            html_t = "<table class='tabla-pro'><thead><tr><th>#</th><th>Equipo</th><th>PTS</th><th>J</th><th>G</th><th>E</th><th>P</th><th>+/-</th></tr></thead><tbody>"
            for i, r in df_tabla_2026.iterrows():
                logo = logos_equipos.get(r['Equipo'], '')
                html_t += f"<tr><td>{i+1}</td><td style='text-align:left;'><img src='{logo}' width='15'> {r['Equipo']}</td><td><b>{r['PTS']}</b></td><td>{r['J']}</td><td>{r['G']}</td><td>{r['E']}</td><td>{r['P']}</td><td>{r['+/-']}</td></tr>"
            html_t += "</tbody></table></div>"
            st.markdown(html_t, unsafe_allow_html=True)
        else:
            # Aquí va tu motor de tablas 2018 que ya teníamos (el de Verano/Apertura/Clausura)
            st.info("Mostrando tablas de 2018 según la fecha seleccionada...")

    with col_der:
        st.markdown("<div class='panel-verde'><div class='titulo-panel'>PRÓXIMOS PARTIDOS 2026</div>", unsafe_allow_html=True)
        st.write("Cargando Fixture Sofascore...")

# 7. PESTAÑA EQUIPOS (GRID COMPACTO)
with tab_stats:
    html_grid = "<div style='display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;'>"
    for eq in todos_equipos:
        logo = logos_equipos.get(eq, '')
        html_grid += f"<div style='background:#112d1e;padding:15px;border-radius:8px;text-align:center;border:1px solid #1a4a2e;'><img src='{logo}' width='40'><br><span style='font-size:10px;font-weight:bold;'>{eq}</span></div>"
    html_grid += "</div>"
    st.markdown(html_grid, unsafe_allow_html=True)

# 8. PESTAÑA CAMPEONES (HISTORIAL)
with tab_camp:
    st.write("Ranking histórico de títulos ADFP")

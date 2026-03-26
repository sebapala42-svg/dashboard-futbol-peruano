import streamlit as st
import pandas as pd

# 1. CONFIGURACIÓN DE PÁGINA
st.set_page_config(page_title="Liga Peruana 2018", page_icon="🏆", layout="wide")

# 2. INYECCIÓN DE CSS (CLONANDO LA ESTÉTICA DE LA IMAGEN)
st.markdown("""
<style>
    /* Fondo principal verde oscuro */
    .stApp { background-color: #062818; color: #ffffff; }
    
    /* Ocultar elementos por defecto de Streamlit para que parezca una app real */
    header {visibility: hidden;}
    footer {visibility: hidden;}
    
    /* Pestañas principales (FIXTURE, EQUIPOS, CAMPEONES) */
    .stTabs [data-baseweb="tab-list"] { gap: 0px; background-color: transparent; border-bottom: 1px solid #1a4a2e; justify-content: center; }
    .stTabs [data-baseweb="tab"] { color: #5e8b6b; padding: 15px 30px; font-weight: bold; font-size: 16px; background-color: transparent; }
    .stTabs [aria-selected="true"] { color: #ffffff !important; border-bottom: 3px solid #8cc63f !important; background-color: transparent !important; }
    
    /* Contenedores verdes más claros */
    .panel-verde { background-color: #0c3620; border: 1px solid #1a4a2e; border-radius: 8px; padding: 15px; margin-bottom: 20px;}
    .titulo-panel { text-align: center; color: #ffffff; font-weight: bold; font-size: 18px; margin-bottom: 15px; text-transform: uppercase; }
    
    /* Tabla HTML Personalizada (Sin scroll) */
    .tabla-pro { width: 100%; border-collapse: collapse; color: #ffffff; font-size: 13px; font-family: sans-serif; }
    .tabla-pro th { background-color: #082b1c; color: #a1b5a8; border-bottom: 2px solid #1a4a2e; padding: 10px 5px; text-align: center; font-weight: normal; }
    .tabla-pro td { padding: 8px 5px; border-bottom: 1px solid #1a4a2e; text-align: center; }
    .tabla-pro td:nth-child(2) { text-align: left; font-weight: bold; } /* Nombre equipo alineado a la izquierda */
    .tabla-pro tr:hover { background-color: #11452a; }
    
    /* Modificar el Selectbox de Fecha */
    .stSelectbox label { display: none; } /* Ocultar el texto de arriba */
    .stSelectbox div[data-baseweb="select"] { background-color: #082b1c; border: 1px solid #8cc63f; border-radius: 5px; color: white;}
</style>
""", unsafe_allow_html=True)

# --- BASE DE DATOS DE ESCUDOS ---
logos_equipos = {
    'Sporting Cristal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Escudo_del_Club_Sporting_Cristal.svg/100px-Escudo_del_Club_Sporting_Cristal.svg.png',
    'Alianza Lima': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Escudo_Alianza_Lima_3_-_1988-2011.png/100px-Escudo_Alianza_Lima_3_-_1988-2011.png',
    'Universitario': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Logo_oficial_de_Universitario.png/100px-Logo_oficial_de_Universitario.png',
    'FBC Melgar': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/FBC_Melgar.png/100px-FBC_Melgar.png',
    'Sport Huancayo': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/62/Sport_Huancayo.png/100px-Sport_Huancayo.png',
    'UTC': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/UTC_Cajamarca.svg/100px-UTC_Cajamarca.svg.png',
    'U. San Martin': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Universidad_San_Martin.svg/100px-Universidad_San_Martin.svg.png',
    'Ayacucho FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Ayacucho_FC.png/100px-Ayacucho_FC.png',
    'Cusco (Garcilaso)': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Cusco_FC_logo.png/100px-Cusco_FC_logo.png', 
    'Binacional': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Deportivo_Binacional.png/100px-Deportivo_Binacional.png',
    'Sport Boys': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Sport_Boys_As.svg/100px-Sport_Boys_As.svg.png',
    'Dep. Municipal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Deportivo_Municipal.svg/100px-Deportivo_Municipal.svg.png',
    'Cantolao': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Academia_Deportiva_Cantolao.gif/100px-Academia_Deportiva_Cantolao.gif',
    'Comerciantes Unidos': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Logo_of_Comerciantes_Unidos_%282024%29.png/100px-Logo_of_Comerciantes_Unidos_%282024%29.png',
    'Union Comercio': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Union_Comercio.svg/100px-Union_Comercio.svg.png',
    'Sport Rosario': 'https://upload.wikimedia.org/wikipedia/ru/thumb/2/2d/Sport_Rosario_Logo.png/100px-Sport_Rosario_Logo.png'
}

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

# --- TÍTULO CENTRAL ---
st.markdown("<h2 style='text-align: center; color: white;'>LIGA PROFESIONAL PERUANA 2018</h2>", unsafe_allow_html=True)

# --- PESTAÑAS PRINCIPALES ---
tab_fixture, tab_estadisticas, tab_campeones = st.tabs(["FIXTURE Y TABLAS", "EQUIPOS Y ESTADISTICAS", "CAMPEONES"])

with tab_fixture:
    col_izq, col_der = st.columns([2.5, 1.2]) # Proporción de las columnas
    
    with col_der:
        # --- SELECTOR DE FECHA (Estilo Dropdown) ---
        st.markdown("<div class='titulo-panel' style='color:#8cc63f;'>TEMPORADA</div>", unsafe_allow_html=True)
        fechas_disponibles = [f"FECHA {i}" for i in range(1, 45)]
        fecha_texto = st.selectbox("Selecciona Fecha", fechas_disponibles, index=29) # Por defecto Fecha 30
        fecha_seleccionada = int(fecha_texto.replace("FECHA ", ""))
        
        # --- LISTA DE PARTIDOS HTML ---
        st.markdown("<div class='panel-verde'>", unsafe_allow_html=True)
        partidos_fecha = df_partidos[df_partidos['Fecha_Global'] == fecha_seleccionada]
        
        if not partidos_fecha.empty:
            html_partidos = ""
            for _, row in partidos_fecha.iterrows():
                loc, vis = row['Local'], row['Visitante']
                gl, gv = row['GL'], row['GV']
                l_logo = logos_equipos.get(loc, 'https://cdn-icons-png.flaticon.com/128/33/33736.png')
                v_logo = logos_equipos.get(vis, 'https://cdn-icons-png.flaticon.com/128/33/33736.png')
                
                html_partidos += f"""
                <div style='display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid #1a4a2e; padding: 10px 0;'>
                    <span style='color:white; font-size:12px; font-weight:bold;'>Final</span>
                    <div style='display:flex; align-items:center; width: 80%; justify-content: center;'>
                        <span style='text-align:right; width:40%; font-size:13px;'>{loc}</span>
                        <img src='{l_logo}' width='20' style='margin: 0 8px;'>
                        <strong style='font-size: 16px; margin: 0 5px;'>{gl} - {gv}</strong>
                        <img src='{v_logo}' width='20' style='margin: 0 8px;'>
                        <span style='text-align:left; width:40%; font-size:13px;'>{vis}</span>
                    </div>
                </div>
                """
            st.markdown(html_partidos, unsafe_allow_html=True)
        else:
            st.markdown("<p style='text-align:center;'>No hay partidos registrados en esta fecha.</p>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)

    with col_izq:
        # --- TABLA DE POSICIONES HTML ---
        st.markdown(f"<div class='panel-verde'><div class='titulo-panel'>TABLA ACUMULADA (HASTA LA {fecha_texto})</div>", unsafe_allow_html=True)
        
        # Lógica de la tabla y rachas
        df_filtro = df_partidos[df_partidos['Fecha_Global'] <= min(fecha_seleccionada, 44)]
        tabla_datos = []
        
        for equipo in todos_equipos:
            loc = df_filtro[df_filtro['Local'] == equipo]
            vis = df_filtro[df_filtro['Visitante'] == equipo]
            g = (loc['GL'] > loc['GV']).sum() + (vis['GV'] > vis['GL']).sum()
            e = (loc['GL'] == loc['GV']).sum() + (vis['GV'] == vis['GL']).sum()
            p = (loc['GL'] < loc['GV']).sum() + (vis['GV'] < vis['GL']).sum()
            gf = loc['GL'].sum() + vis['GV'].sum()
            gc = loc['GV'].sum() + vis['GL'].sum()
            pj = g + e + p
            pts = (g * 3) + e
            
            bon = 2 if equipo == 'Sporting Cristal' and fecha_seleccionada >= 44 else 0
            sanc_dict = {'Universitario': 1, 'Dep. Municipal': 2, 'UTC': 2, 'Cantolao': 2, 'Sport Rosario': 7}
            sanc = sanc_dict.get(equipo, 0) if fecha_seleccionada >= 44 else 0
            pts_total = pts + bon - sanc
            
            # Calcular Racha (Últimos 5 partidos)
            partidos_equipo = df_filtro[(df_filtro['Local'] == equipo) | (df_filtro['Visitante'] == equipo)].sort_values('Fecha_Global', ascending=False).head(5)
            racha_html = ""
            for _, rp in partidos_equipo.iterrows():
                if rp['Local'] == equipo:
                    res = 'V' if rp['GL'] > rp['GV'] else 'E' if rp['GL'] == rp['GV'] else 'D'
                else:
                    res = 'V' if rp['GV'] > rp['GL'] else 'E' if rp['GV'] == rp['GL'] else 'D'
                
                color_racha = "#8cc63f" if res == 'V' else "#e1c340" if res == 'E' else "#d32f2f"
                racha_html = f"<span style='background-color:{color_racha}; color:white; padding: 2px 6px; border-radius:3px; font-size:10px; margin:0 1px; font-weight:bold;'>{res}</span>" + racha_html
            
            tabla_datos.append([equipo, pj, pts_total, gf, gc, gf-gc, g, e, p, racha_html])

        # Ordenar tabla
        df_t = pd.DataFrame(tabla_datos, columns=['Equipo', 'J', 'PTS', 'GF', 'GC', '+/-', 'G', 'E', 'P', 'Racha'])
        df_t = df_t.sort_values(by=['PTS', '+/-'], ascending=[False, False]).reset_index(drop=True)
        
        # Generar HTML de la tabla
        html_tabla = "<table class='tabla-pro'><thead><tr><th style='width:30px;'>#</th><th>Equipos</th><th>PTS</th><th>J</th><th>Gol</th><th>+/-</th><th>G</th><th>E</th><th>P</th><th>Últimas</th></tr></thead><tbody>"
        
        for idx, row in df_t.iterrows():
            pos = idx + 1
            equipo = row['Equipo']
            logo = logos_equipos.get(equipo, '')
            
            # Colores de clasificación a la izquierda del número
            borde_color = "transparent"
            if pos <= 4: borde_color = "#3db4dc" # Azul Libertadores
            elif pos <= 8: borde_color = "#e1c340" # Amarillo Sudamericana
            elif pos >= 15: borde_color = "#d32f2f" # Rojo Descenso
            
            html_tabla += f"""
            <tr>
                <td style='border-left: 4px solid {borde_color}; font-weight:bold;'>{pos}</td>
                <td><img src='{logo}' width='20' style='vertical-align:middle; margin-right:8px;'> {equipo}</td>
                <td style='font-weight:bold; font-size:14px;'>{row['PTS']}</td>
                <td>{row['J']}</td>
                <td>{row['GF']}:{row['GC']}</td>
                <td>{row['+/-']}</td>
                <td>{row['G']}</td>
                <td>{row['E']}</td>
                <td>{row['P']}</td>
                <td>{row['Racha']}</td>
            </tr>
            """
        html_tabla += "</tbody></table></div>"
        st.markdown(html_tabla, unsafe_allow_html=True)

with tab_estadisticas:
    st.markdown("<div class='panel-verde'><div class='titulo-panel'>ESTADÍSTICAS PERSONALES - GOLEADORES</div>", unsafe_allow_html=True)
    df_goles_limpio = df_goles.dropna(subset=['Fecha_Global', 'Jugador'])
    df_goles_filtro = df_goles_limpio[df_goles_limpio['Fecha_Global'] <= fecha_seleccionada]
    
    if not df_goles_filtro.empty:
        df_g = df_goles_filtro.groupby(['Jugador', 'Equipo'])['Goles'].sum().reset_index().sort_values(by='Goles', ascending=False).head(10)
        
        html_goles = "<table class='tabla-pro'><thead><tr><th>Jugador</th><th>Goles</th></tr></thead><tbody>"
        for _, row in df_g.iterrows():
            logo = logos_equipos.get(row['Equipo'], '')
            html_goles += f"<tr><td><img src='{logo}' width='20' style='vertical-align:middle; margin-right:8px;'> {row['Jugador']}</td><td style='font-weight:bold;'>{row['Goles']}</td></tr>"
        html_goles += "</tbody></table>"
        st.markdown(html_goles, unsafe_allow_html=True)
    else:
        st.info("Aún no hay goles registrados.")
    st.markdown("</div>", unsafe_allow_html=True)

import streamlit as st
import pandas as pd

# 1. CONFIGURACIÓN DE PÁGINA
st.set_page_config(page_title="Liga Peruana 2018", page_icon="🏆", layout="wide")

# 2. INYECCIÓN DE CSS EXTREMO (CONTRASTE, ZEBRA TOTAL Y NOTAS)
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
    
    /* ZEBRA PARA TABLAS */
    .tabla-pro { width: 100%; border-collapse: collapse; color: #ffffff; font-size: 12px; font-family: sans-serif; margin-bottom: 5px;}
    .tabla-pro th { background-color: #0d2418; color: #a1b5a8; border-bottom: 1px solid #1a4a2e; padding: 6px 4px; text-align: center; font-weight: normal; font-size: 11px;}
    .tabla-pro td { padding: 6px 4px; border-bottom: none; text-align: center; color: #ffffff !important;}
    .tabla-pro td:nth-child(2) { text-align: left; font-weight: bold; } 
    .tabla-pro tbody tr:nth-child(odd) { background-color: #153625; } 
    .tabla-pro tbody tr:nth-child(even) { background-color: #112d1e; } 
    .tabla-pro tbody tr:hover { background-color: #1c4531; } 
    
    /* ZEBRA PARA PARTIDOS */
    .contenedor-partidos { display: flex; flex-direction: column; border-radius: 6px; overflow: hidden; }
    .fila-partido { display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; border-bottom: 1px solid #1a4a2e; }
    .fila-partido:nth-child(odd) { background-color: #153625; }
    .fila-partido:nth-child(even) { background-color: #112d1e; }
    .fila-partido:hover { background-color: #1c4531; }

    .stSelectbox label { display: none; } 
    .stSelectbox div[data-baseweb="select"] { background-color: #0d2418; border: 1px solid #8cc63f; border-radius: 4px; color: white; font-size: 13px; min-height: 30px;}
    h2 { font-size: 1.5rem !important; margin-bottom: 10px !important; padding-bottom: 0px !important;}

    /* MARCADORES ALINEADOS */
    .marcador-contenedor { display: flex; align-items: center; justify-content: center; gap: 2px; margin: 0 10px; }
    .gol-cajita { background-color: #0d2418; border: 1px solid #1a4a2e; border-radius: 4px; color: #ffffff; font-weight: bold; font-size: 14px; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; }
    .separador-guion { color: #8cc63f; font-weight: bold; font-size: 14px; }
    
    /* NOTA ACLARATORIA */
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

# --- MOTOR CREADOR DE TABLAS ---
def generar_html_tabla(df_filtro, lista_equipos, titulo_panel, es_acumulado=False, zona=""):
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
        if es_acumulado:
            if pos <= 4: borde = "#3db4dc" 
            elif pos <= 8: borde = "#e1c340" 
            elif pos >= 15: borde = "#d32f2f" 
        else:
            if pos == 1: borde = "#3db4dc"
            
        html += f"<tr><td style='border-left: 3px solid {borde}; font-weight:bold;'>{pos}</td><td style='text-align:left;'><img src='{logo}' width='15' height='15' style='object-fit:contain; vertical-align:middle; margin-right:6px;' onerror=\"this.style.display='none'\"> <span style='color:#ffffff;'>{row['Equipo']}</span></td><td style='font-weight:bold; font-size:13px; color:#ffffff;'>{row['PTS']}</td><td style='color:#ffffff;'>{row['J']}</td><td style='color:#ffffff;'>{row['GF']}:{row['GC']}</td><td style='color:#ffffff;'>{row['+/-']}</td><td style='color:#ffffff;'>{row['G']}</td><td style='color:#ffffff;'>{row['E']}</td><td style='color:#ffffff;'>{row['P']}</td><td>{row['Racha']}</td></tr>"
    html += "</tbody></table>"
    
    # Agregar la nota aclaratoria SOLO en la tabla acumulada
    if es_acumulado:
        html += "<div class='nota-asterisco'>* Nota: Resoluciones de la FPF aplicadas en esta tabla Acumulada: Sanciones a Sport Rosario (-7 pts), Dep. Municipal (-2 pts), UTC (-2 pts), Cantolao (-2 pts) y Universitario (-1 pt). Sporting Cristal (+2 pts) por Campeón de Reservas.</div>"
        
    html += "</div>"
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
        
        # PARTIDOS DE LA FECHA (CON EFECTO ZEBRA INTERCALADO)
        st.markdown("<div class='panel-verde' style='padding: 0;'><div class='contenedor-partidos'>", unsafe_allow_html=True)
        partidos_fecha = df_partidos[df_partidos['Fecha_Global'] == fecha_seleccionada]
        if not partidos_fecha.empty:
            html_p = ""
            for _, row in partidos_fecha.iterrows():
                loc, vis, gl, gv = row['Local'], row['Visitante'], row['GL'], row['GV']
                l_logo, v_logo = logos_equipos.get(loc, ''), logos_equipos.get(vis, '')
                # Usamos la clase .fila-partido para que agarre el color intercalado del CSS
                html_p += f"<div class='fila-partido'><span style='color:white; font-size:10px; font-weight:bold;'>Final</span><div style='display:flex; align-items:center; width: 85%; justify-content: center;'><span style='text-align:right; width:40%; font-size:12px; color:#ffffff; font-weight:bold;'>{loc}</span><img src='{l_logo}' width='18' height='18' style='object-fit:contain; margin: 0 5px;' onerror=\"this.style.display='none'\"><div class='marcador-contenedor'><div class='gol-cajita'>{gl}</div><div class='separador-guion'>-</div><div class='gol-cajita'>{gv}</div></div><img src='{v_logo}' width='18' height='18' style='object-fit:contain; margin: 0 5px;' onerror=\"this.style.display='none'\"><span style='text-align:left; width:40%; font-size:12px; color:#ffffff; font-weight:bold;'>{vis}</span></div></div>"
            st.markdown(html_p, unsafe_allow_html=True)
        else:
            st.markdown("<p style='text-align:center; font-size:12px; padding: 15px;'>No hay partidos registrados.</p>", unsafe_allow_html=True)
        st.markdown("</div></div>", unsafe_allow_html=True)

        # GOLEADORES
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
        else:
            st.markdown("<p style='text-align:center; font-size:12px;'>Aún no hay goles registrados.</p>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)

    with col_izq:
        # TABLAS DE TORNEO CORTO
        if fecha_seleccionada <= 14:
            st.markdown("<div class='titulo-panel'>TORNEO DE VERANO</div>", unsafe_allow_html=True)
            df_verano = df_partidos[(df_partidos['Fecha_Global'] <= fecha_seleccionada) & (df_partidos['Torneo'] == 'Verano')]
            st.markdown(generar_html_tabla(df_verano, equipo_A, "", zona="ZONA A"), unsafe_allow_html=True)
            st.markdown(generar_html_tabla(df_verano, equipo_B, "", zona="ZONA B"), unsafe_allow_html=True)
        elif fecha_seleccionada <= 29:
            df_apertura = df_partidos[(df_partidos['Fecha_Global'] >= 15) & (df_partidos['Fecha_Global'] <= fecha_seleccionada) & (df_partidos['Torneo'] == 'Apertura')]
            st.markdown(generar_html_tabla(df_apertura, todos_equipos, "TORNEO APERTURA", zona="ZONA ÚNICA"), unsafe_allow_html=True)
        else:
            df_clausura = df_partidos[(df_partidos['Fecha_Global'] >= 30) & (df_partidos['Fecha_Global'] <= min(fecha_seleccionada, 44)) & (df_partidos['Torneo'] == 'Clausura')]
            st.markdown(generar_html_tabla(df_clausura, todos_equipos, "TORNEO CLAUSURA", zona="ZONA ÚNICA"), unsafe_allow_html=True)

        # TABLA ACUMULADA (Siempre Visible y con la nota al final)
        df_acu = df_partidos[df_partidos['Fecha_Global'] <= min(fecha_seleccionada, 44)]
        st.markdown(generar_html_tabla(df_acu, todos_equipos, f"TABLA ACUMULADA (HASTA LA FECHA {fecha_seleccionada})", es_acumulado=True), unsafe_allow_html=True)
        # =====================================================================
# --- PESTAÑA 2: EQUIPOS (GRID DE ESCUDOS ESTILO PROMIEDOS) ---
# =====================================================================
with tab_estadisticas:
    st.markdown("<h3 style='text-align: center; color: white; margin-bottom: 5px;'>EQUIPOS</h3>", unsafe_allow_html=True)
    st.markdown("<p style='text-align: center; color: #87b897; font-size: 12px; margin-bottom: 20px;'>Pulsar en el equipo para ver su info detallada (Próximamente)</p>", unsafe_allow_html=True)

    # Definimos los títulos históricos para las insignias pequeñas (Badge)
    titulos_peru = {
        'Universitario': 29, 'Alianza Lima': 25, 'Sporting Cristal': 20,
        'Sport Boys': 6, 'Dep. Municipal': 4, 'U. San Martin': 3,
        'FBC Melgar': 2, 'Cusco (Garcilaso)': 0, 'UTC': 0, 'Sport Huancayo': 0,
        'Ayacucho FC': 0, 'Binacional': 1, 'Union Comercio': 0, 'Cantolao': 0,
        'Sport Rosario': 0, 'Comerciantes Unidos': 0
    }

    # CSS Especial para la cuadrícula de equipos
    st.markdown("""
    <style>
        .equipo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 15px;
            padding: 10px;
        }
        .equipo-card {
            background-color: #0c3620;
            border: 1px solid #1a4a2e;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            transition: transform 0.2s, border-color 0.2s;
            cursor: pointer;
            position: relative;
        }
        .equipo-card:hover {
            transform: translateY(-5px);
            border-color: #8cc63f;
            background-color: #11452a;
        }
        .equipo-logo {
            width: 50px;
            height: 50px;
            object-fit: contain;
            margin-bottom: 10px;
        }
        .equipo-nombre {
            color: #ffffff;
            font-weight: bold;
            font-size: 13px;
            display: block;
        }
        .badge-copa {
            position: absolute;
            top: 10px;
            right: 10px;
            background: transparent;
            color: #ffffff;
            font-size: 11px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 3px;
        }
    </style>
    """, unsafe_allow_html=True)

    # Generamos el HTML de la cuadrícula
    html_grid = "<div class='equipo-grid'>"
    
    for equipo in todos_equipos:
        logo = logos_equipos.get(equipo, '')
        copas = titulos_peru.get(equipo, 0)
        
        # Solo mostramos el número de copas si tiene al menos 1
        insignia = f"<div class='badge-copa'>🏆{copas}</div>" if copas > 0 else ""
        
        html_grid += f"""
        <div class='equipo-card'>
            {insignia}
            <img src='{logo}' class='equipo-logo' onerror="this.style.display='none'">
            <span class='equipo-nombre'>{equipo}</span>
        </div>
        """
    
    html_grid += "</div>"
    st.markdown(html_grid, unsafe_allow_html=True)

    # --- ESPACIO PARA MÁS ESTADÍSTICAS ---
    st.markdown("<br><hr style='border-color: #1a4a2e;'>", unsafe_allow_html=True)
    st.markdown("<h3 style='text-align: center; color: white;'>ESTADÍSTICAS PERSONALES</h3>", unsafe_allow_html=True)
    
    # Aquí reutilizamos el código de Goleadores que ya tenías pero más expandido
    col_goles, col_asist = st.columns(2)
    
    with col_goles:
        st.markdown("<div class='panel-verde'><div class='titulo-panel'>MÁXIMOS GOLEADORES</div>", unsafe_allow_html=True)
        # Lógica de goleadores (misma que ya tenemos en la home pero como tabla principal)
        df_g = df_goles.dropna(subset=['Jugador']).groupby(['Jugador', 'Equipo'])['Goles'].sum().reset_index().sort_values(by='Goles', ascending=False).head(15)
        html_g = "<table class='tabla-pro'><thead><tr><th>#</th><th>Jugador</th><th>Equipo</th><th>Goles</th></tr></thead><tbody>"
        for idx, row in df_g.iterrows():
            pos = idx + 1
            logo = logos_equipos.get(row['Equipo'], '')
            html_g += f"<tr><td>{pos}</td><td style='text-align:left;'>{row['Jugador']}</td><td><img src='{logo}' width='15'></td><td style='font-weight:bold;'>{row['Goles']}</td></tr>"
        html_g += "</tbody></table></div>", unsafe_allow_html=True)
        st.markdown(html_g, unsafe_allow_html=True)
        # =====================================================================
# --- PESTAÑA 3: CAMPEONES (BASE DE DATOS HISTÓRICA INYECTADA POR IA) ---
# =====================================================================
with tab_campeones:
    # 1. Base de datos del Historial (Últimos 25 años para no hacerla infinita)
    historial_datos = [
        {"Año": "2025", "Campeón": "Universitario"},
        {"Año": "2024", "Campeón": "Universitario"},
        {"Año": "2023", "Campeón": "Universitario"},
        {"Año": "2022", "Campeón": "Alianza Lima"},
        {"Año": "2021", "Campeón": "Alianza Lima"},
        {"Año": "2020", "Campeón": "Sporting Cristal"},
        {"Año": "2019", "Campeón": "Binacional"},
        {"Año": "2018", "Campeón": "Sporting Cristal"},
        {"Año": "2017", "Campeón": "Alianza Lima"},
        {"Año": "2016", "Campeón": "Sporting Cristal"},
        {"Año": "2015", "Campeón": "FBC Melgar"},
        {"Año": "2014", "Campeón": "Sporting Cristal"},
        {"Año": "2013", "Campeón": "Universitario"},
        {"Año": "2012", "Campeón": "Sporting Cristal"},
        {"Año": "2011", "Campeón": "Juan Aurich"}, # Nota: Faltaría el logo de Aurich, usaremos uno por defecto si no está
        {"Año": "2010", "Campeón": "U. San Martin"},
        {"Año": "2009", "Campeón": "Universitario"},
        {"Año": "2008", "Campeón": "U. San Martin"},
        {"Año": "2007", "Campeón": "U. San Martin"},
        {"Año": "2006", "Campeón": "Alianza Lima"},
        {"Año": "2005", "Campeón": "Sporting Cristal"},
        {"Año": "2004", "Campeón": "Alianza Lima"},
        {"Año": "2003", "Campeón": "Alianza Lima"},
        {"Año": "2002", "Campeón": "Sporting Cristal"},
        {"Año": "2001", "Campeón": "Alianza Lima"},
        {"Año": "2000", "Campeón": "Universitario"}
    ]
    df_historial = pd.DataFrame(historial_datos)

    # 2. Base de datos del Ranking Total (Los más ganadores de la historia peruana)
    ranking_datos = [
        {"Equipo": "Universitario", "Títulos": 29},
        {"Equipo": "Alianza Lima", "Títulos": 25},
        {"Equipo": "Sporting Cristal", "Títulos": 20},
        {"Equipo": "Sport Boys", "Títulos": 6},
        {"Equipo": "Dep. Municipal", "Títulos": 4},
        {"Equipo": "U. San Martin", "Títulos": 3},
        {"Equipo": "FBC Melgar", "Títulos": 2},
        {"Equipo": "Unión Huaral", "Títulos": 2}, # Histórico
        {"Equipo": "Atlético Chalaco", "Títulos": 2}, # Histórico
        {"Equipo": "Sport José Gálvez", "Títulos": 2}, # Histórico amateur
        {"Equipo": "Binacional", "Títulos": 1},
        {"Equipo": "Juan Aurich", "Títulos": 1},
        {"Equipo": "Defensor Lima", "Títulos": 1}, # Histórico
        {"Equipo": "San Agustín", "Títulos": 1} # Histórico
    ]
    df_ranking = pd.DataFrame(ranking_datos)

    # 3. Interfaz de dos columnas (Como la captura que me pasaste)
    col_hist, col_rank = st.columns([1.5, 1])

    with col_hist:
        st.markdown("<div class='panel-verde' style='padding:0;'><div class='titulo-panel' style='padding-top:10px;'>HISTORIAL</div>", unsafe_allow_html=True)
        
        html_h = "<table class='tabla-pro' style='margin:0;'><thead><tr><th>Torneo</th><th style='text-align:left;'>Historia</th></tr></thead><tbody>"
        for idx, row in df_historial.iterrows():
            logo = logos_equipos.get(row['Campeón'], 'https://cdn-icons-png.flaticon.com/128/33/33736.png') # Escudo por defecto si es muy antiguo
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


import streamlit as st
import pandas as pd

# 1. CONFIGURACIÓN DE PÁGINA
st.set_page_config(page_title="Liga Peruana 2018", page_icon="🏆", layout="wide")

# 2. INYECCIÓN DE CSS
st.markdown("""
<style>
    .stApp { background-color: #062818; color: #ffffff; }
    header {visibility: hidden;}
    footer {visibility: hidden;}
    
    .panel-verde { background-color: #0c3620; border: 1px solid #1a4a2e; border-radius: 8px; padding: 15px; margin-bottom: 20px;}
    .titulo-panel { text-align: center; color: #ffffff; font-weight: bold; font-size: 16px; margin-bottom: 15px; text-transform: uppercase; }
    
    .tabla-pro { width: 100%; border-collapse: collapse; color: #ffffff; font-size: 13px; font-family: sans-serif; }
    .tabla-pro th { background-color: #082b1c; color: #a1b5a8; border-bottom: 2px solid #1a4a2e; padding: 8px 4px; text-align: center; font-weight: normal; }
    .tabla-pro td { padding: 8px 4px; border-bottom: 1px solid #1a4a2e; text-align: center; }
    .tabla-pro td:nth-child(2) { text-align: left; font-weight: bold; } 
    .tabla-pro tr:hover { background-color: #11452a; }
    
    .stSelectbox label { display: none; } 
    .stSelectbox div[data-baseweb="select"] { background-color: #082b1c; border: 1px solid #8cc63f; border-radius: 5px; color: white;}
</style>
""", unsafe_allow_html=True)

# --- AQUI PEGAS TUS LINKS MANUALMENTE ---
# Busca la imagen en Google -> Clic derecho -> Copiar dirección de la imagen -> Pégalo entre las comillas
logos_equipos = {
    'Alianza Lima': 'LINK_AQUI',
    'Ayacucho FC': 'LINK_AQUI',
    'Binacional': 'LINK_AQUI',
    'Cantolao': 'LINK_AQUI',
    'Comerciantes Unidos': 'LINK_AQUI',
    'Cusco (Garcilaso)': 'LINK_AQUI',
    'Dep. Municipal': 'LINK_AQUI',
    'FBC Melgar': 'LINK_AQUI',
    'Sport Boys': 'LINK_AQUI',
    'Sport Huancayo': 'LINK_AQUI',
    'Sport Rosario': 'LINK_AQUI',
    'Sporting Cristal': 'LINK_AQUI',
    'U. San Martin': 'LINK_AQUI',
    'Union Comercio': 'LINK_AQUI',
    'Universitario': 'LINK_AQUI',
    'UTC': 'LINK_AQUI'
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

st.markdown("<h2 style='text-align: center; color: white; margin-bottom: 30px;'>LIGA PROFESIONAL PERUANA 2018</h2>", unsafe_allow_html=True)

# --- ESTRUCTURA DE COLUMNAS (TODO EN LA PÁGINA PRINCIPAL) ---
col_izq, col_der = st.columns([2.5, 1.2]) 

with col_der:
    # 1. SELECTOR DE FECHA
    st.markdown("<div class='titulo-panel' style='color:#8cc63f; margin-bottom: 5px;'>TEMPORADA</div>", unsafe_allow_html=True)
    fechas_disponibles = [f"FECHA {i}" for i in range(1, 45)]
    fecha_texto = st.selectbox("Selecciona Fecha", fechas_disponibles, index=29) 
    fecha_seleccionada = int(fecha_texto.replace("FECHA ", ""))
    
    # 2. PANEL DE PARTIDOS
    st.markdown("<div class='panel-verde'>", unsafe_allow_html=True)
    partidos_fecha = df_partidos[df_partidos['Fecha_Global'] == fecha_seleccionada]
    
    if not partidos_fecha.empty:
        html_partidos = ""
        for _, row in partidos_fecha.iterrows():
            loc, vis = row['Local'], row['Visitante']
            gl, gv = row['GL'], row['GV']
            l_logo = logos_equipos.get(loc, '')
            v_logo = logos_equipos.get(vis, '')
            # HTML en una sola línea para evitar errores de Streamlit
            html_partidos += f"<div style='display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid #1a4a2e; padding: 10px 0;'><span style='color:white; font-size:11px; font-weight:bold;'>Final</span><div style='display:flex; align-items:center; width: 85%; justify-content: center;'><span style='text-align:right; width:40%; font-size:12px;'>{loc}</span><img src='{l_logo}' width='18' height='18' style='object-fit:contain; margin: 0 8px;' onerror=\"this.style.display='none'\"><strong style='font-size: 15px; margin: 0 5px;'>{gl} - {gv}</strong><img src='{v_logo}' width='18' height='18' style='object-fit:contain; margin: 0 8px;' onerror=\"this.style.display='none'\"><span style='text-align:left; width:40%; font-size:12px;'>{vis}</span></div></div>"
        st.markdown(html_partidos, unsafe_allow_html=True)
    else:
        st.markdown("<p style='text-align:center; font-size:12px;'>No hay partidos registrados en esta fecha.</p>", unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)

    # 3. PANEL DE GOLEADORES (AHORA EN LA DERECHA, DEBAJO DE PARTIDOS)
    st.markdown("<div class='panel-verde'><div class='titulo-panel'>GOLEADORES</div>", unsafe_allow_html=True)
    df_goles_limpio = df_goles.dropna(subset=['Fecha_Global', 'Jugador'])
    df_goles_filtro = df_goles_limpio[df_goles_limpio['Fecha_Global'] <= fecha_seleccionada]
    
    if not df_goles_filtro.empty:
        df_g = df_goles_filtro.groupby(['Jugador', 'Equipo'])['Goles'].sum().reset_index().sort_values(by='Goles', ascending=False).head(10)
        html_goles = "<table class='tabla-pro'><thead><tr><th style='text-align:left;'>Jugador</th><th>Goles</th></tr></thead><tbody>"
        for _, row in df_g.iterrows():
            logo = logos_equipos.get(row['Equipo'], '')
            # HTML comprimido
            html_goles += f"<tr><td style='text-align:left;'><img src='{logo}' width='16' height='16' style='object-fit:contain; vertical-align:middle; margin-right:6px;' onerror=\"this.style.display='none'\"> {row['Jugador']}</td><td style='font-weight:bold;'>{row['Goles']}</td></tr>"
        html_goles += "</tbody></table>"
        st.markdown(html_goles, unsafe_allow_html=True)
    else:
        st.markdown("<p style='text-align:center; font-size:12px;'>Aún no hay goles registrados.</p>", unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)


with col_izq:
    # 4. TABLA ACUMULADA PRINCIPAL
    st.markdown(f"<div class='panel-verde'><div class='titulo-panel'>TABLA ACUMULADA (HASTA LA {fecha_texto})</div>", unsafe_allow_html=True)
    
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
        
        # Racha
        partidos_equipo = df_filtro[(df_filtro['Local'] == equipo) | (df_filtro['Visitante'] == equipo)].sort_values('Fecha_Global', ascending=False).head(5)
        racha_html = ""
        for _, rp in partidos_equipo.iterrows():
            if rp['Local'] == equipo:
                res = 'V' if rp['GL'] > rp['GV'] else 'E' if rp['GL'] == rp['GV'] else 'D'
            else:
                res = 'V' if rp['GV'] > rp['GL'] else 'E' if rp['GV'] == rp['GL'] else 'D'
            color_racha = "#8cc63f" if res == 'V' else "#e1c340" if res == 'E' else "#d32f2f"
            racha_html = f"<span style='background-color:{color_racha}; color:white; padding: 2px 5px; border-radius:3px; font-size:9px; margin:0 1px; font-weight:bold;'>{res}</span>" + racha_html
        
        tabla_datos.append([equipo, pj, pts_total, gf, gc, gf-gc, g, e, p, racha_html])

    df_t = pd.DataFrame(tabla_datos, columns=['Equipo', 'J', 'PTS', 'GF', 'GC', '+/-', 'G', 'E', 'P', 'Racha'])
    
    # ¡AQUI ESTA LA CORRECCIÓN! (Usando reglas reales para desempate: Puntos, luego Diferencia de Goles, luego Goles a Favor)
    df_t = df_t.sort_values(by=['PTS', '+/-', 'GF'], ascending=[False, False, False]).reset_index(drop=True)
    
    html_tabla = "<table class='tabla-pro'><thead><tr><th style='width:25px;'>#</th><th>Equipos</th><th>PTS</th><th>J</th><th>Gol</th><th>+/-</th><th>G</th><th>E</th><th>P</th><th>Últimas</th></tr></thead><tbody>"
    
    for idx, row in df_t.iterrows():
        pos = idx + 1
        equipo = row['Equipo']
        logo = logos_equipos.get(equipo, '')
        
        borde_color = "transparent"
        if pos <= 4: borde_color = "#3db4dc" 
        elif pos <= 8: borde_color = "#e1c340" 
        elif pos >= 15: borde_color = "#d32f2f" 
        
        # HTML comprimido en una línea por fila
        html_tabla += f"<tr><td style='border-left: 3px solid {borde_color}; font-weight:bold;'>{pos}</td><td><img src='{logo}' width='18' height='18' style='object-fit:contain; vertical-align:middle; margin-right:8px;' onerror=\"this.style.display='none'\"> {equipo}</td><td style='font-weight:bold; font-size:14px;'>{row['PTS']}</td><td>{row['J']}</td><td>{row['GF']}:{row['GC']}</td><td>{row['+/-']}</td><td>{row['G']}</td><td>{row['E']}</td><td>{row['P']}</td><td>{row['Racha']}</td></tr>"
        
    html_tabla += "</tbody></table></div>"
    st.markdown(html_tabla, unsafe_allow_html=True)

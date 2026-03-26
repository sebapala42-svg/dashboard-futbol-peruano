import streamlit as st
import pandas as pd

# Configuración de la página
st.set_page_config(page_title="Dashboard Descentralizado 2018", page_icon="⚽", layout="wide")

st.title("🏆 Dashboard Interactivo - Descentralizado 2018")
st.markdown("Bienvenido a la central de estadísticas. Cambia la fecha en el deslizador para viajar en el tiempo y ver cómo se movía la tabla y los goleadores.")

# Cargar los datos desde tu Excel
@st.cache_data
def cargar_datos():
    df_partidos = pd.read_excel('torneo_2018.xlsx', sheet_name='BaseDatos')
    df_goles = pd.read_excel('torneo_2018.xlsx', sheet_name='Registro_Goles')
    return df_partidos, df_goles

try:
    df_partidos, df_goles = cargar_datos()
except Exception as e:
    st.error("⚠️ No se encontró el archivo 'torneo_2018.xlsx'. Asegúrate de que el archivo de Excel esté subido a GitHub y se llame exactamente así.")
    st.stop()

# --- BUSCADOR DE FECHA ---
fecha_maxima = int(df_partidos['Fecha_Global'].max()) if not df_partidos.empty else 50
fecha_seleccionada = st.slider("▶ Desliza para cambiar la Fecha Global:", 1, fecha_maxima, 44)

# Filtramos la data para la tabla acumulada (Solo suma puntos hasta la fecha 44)
limite_acumulado = min(fecha_seleccionada, 44)
df_filtro_tabla = df_partidos[(df_partidos['Fecha_Global'] <= limite_acumulado) & (df_partidos['Torneo'].isin(['Verano', 'Apertura', 'Clausura']))]

# --- LÓGICA DE LA TABLA ACUMULADA ---
equipos = sorted(list(set(df_partidos['Local'].dropna().unique()) - {'', 0}))
tabla = []

for equipo in equipos:
    # Filtramos partidos locales y visitantes
    loc = df_filtro_tabla[df_filtro_tabla['Local'] == equipo]
    vis = df_filtro_tabla[df_filtro_tabla['Visitante'] == equipo]
    
    # Victorias, Empates, Derrotas
    g = (loc['GL'] > loc['GV']).sum() + (vis['GV'] > vis['GL']).sum()
    e = (loc['GL'] == loc['GV']).sum() + (vis['GV'] == vis['GL']).sum()
    p = (loc['GL'] < loc['GV']).sum() + (vis['GV'] < vis['GL']).sum()
    
    # Goles
    gf = loc['GL'].sum() + vis['GV'].sum()
    gc = loc['GV'].sum() + vis['GL'].sum()
    dif = gf - gc
    
    pj = g + e + p
    pts_cancha = (g * 3) + e
    
    # Puntos de mesa (Solo aplican al final del campeonato, fecha >= 44)
    bon = 2 if equipo == 'Sporting Cristal' and fecha_seleccionada >= 44 else 0
    sanc_dict = {'Universitario': 1, 'Dep. Municipal': 2, 'UTC': 2, 'Cantolao': 2, 'Sport Rosario': 7}
    sanc = sanc_dict.get(equipo, 0) if fecha_seleccionada >= 44 else 0
    
    pts_total = pts_cancha + bon - sanc
    
    tabla.append([equipo, pj, g, e, p, pts_cancha, bon, sanc, Total, gf, gc, dif])

# Convertir a DataFrame y ordenar
df_tabla = pd.DataFrame(tabla, columns=['Equipo', 'PJ', 'G', 'E', 'P', 'Pts Cancha', 'Bon', 'Sanc', 'Total', 'GF', 'GC', 'DIF'])
df_tabla = df_tabla.sort_values(by=['Total', 'DIF', 'GF'], ascending=[False, False, False]).reset_index(drop=True)
df_tabla.index = df_tabla.index + 1 # Que la tabla empiece en el puesto 1

# --- INTERFAZ VISUAL EN COLUMNAS ---
col1, col2 = st.columns([2, 1]) # La columna izquierda es más ancha

with col1:
    st.subheader("📊 Tabla Acumulada")
    st.dataframe(df_tabla, use_container_width=True)
    
    st.subheader(f"📅 Partidos de la Fecha {fecha_seleccionada}")
    partidos_fecha = df_partidos[df_partidos['Fecha_Global'] == fecha_seleccionada][['Torneo', 'Local', 'GL', 'GV', 'Visitante', 'Link_Video']]
    if not partidos_fecha.empty:
        # Configurar para que el link sea clickeable
        st.dataframe(
            partidos_fecha,
            column_config={"Link_Video": st.column_config.LinkColumn("Video Resumen")},
            use_container_width=True
        )
    else:
        st.info("No hay partidos programados para esta fecha.")

with col2:
    st.subheader("⚽ Goleadores en Tiempo Real")
    # Ignorar celdas vacías del Excel
    df_goles_limpio = df_goles.dropna(subset=['Fecha_Global', 'Jugador'])
    df_goles_filtro = df_goles_limpio[df_goles_limpio['Fecha_Global'] <= fecha_seleccionada]
    
    if not df_goles_filtro.empty:
        df_goleadores = df_goles_filtro.groupby(['Jugador', 'Equipo'])['Goles'].sum().reset_index()
        df_goleadores = df_goleadores.sort_values(by='Goles', ascending=False).reset_index(drop=True)
        df_goleadores.index = df_goleadores.index + 1
        st.dataframe(df_goleadores, use_container_width=True)
    else:
        st.info("Aún no hay goles registrados hasta esta fecha.")

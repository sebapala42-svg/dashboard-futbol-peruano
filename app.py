import streamlit as st
import pandas as pd

# Configuración de la página
st.set_page_config(page_title="Dashboard Descentralizado 2018", page_icon="⚽", layout="wide")

st.title("🏆 Dashboard Interactivo - Descentralizado 2018")
st.markdown("Bienvenido a la central de estadísticas. Cambia la fecha en el deslizador para viajar en el tiempo.")

# Equipos y Grupos
equipo_A = ['Sporting Cristal', 'Sport Rosario', 'UTC', 'U. San Martin', 'Alianza Lima', 'Comerciantes Unidos', 'Ayacucho FC', 'Universitario']
equipo_B = ['Sport Huancayo', 'FBC Melgar', 'Cantolao', 'Dep. Municipal', 'Sport Boys', 'Cusco (Garcilaso)', 'Binacional', 'Union Comercio']
todos_equipos = sorted(equipo_A + equipo_B)

# Cargar los datos desde tu Excel
@st.cache_data
def cargar_datos():
    df_partidos = pd.read_excel('torneo_2018.xlsx', sheet_name='BaseDatos')
    df_goles = pd.read_excel('torneo_2018.xlsx', sheet_name='Registro_Goles')
    return df_partidos, df_goles

try:
    df_partidos, df_goles = cargar_datos()
except Exception as e:
    st.error("⚠️ No se encontró el archivo 'torneo_2018.xlsx'.")
    st.stop()

# --- BUSCADOR DE FECHA ---
fecha_maxima = int(df_partidos['Fecha_Global'].max()) if not df_partidos.empty else 50
fecha_seleccionada = st.slider("▶ Desliza para cambiar la Fecha Global:", 1, fecha_maxima, 44)

# --- MOTOR DE CÁLCULO DE TABLAS ---
def calcular_tabla(df_filtrado, lista_equipos, es_acumulada=False):
    tabla = []
    for equipo in lista_equipos:
        loc = df_filtrado[df_filtrado['Local'] == equipo]
        vis = df_filtrado[df_filtrado['Visitante'] == equipo]
        
        g = (loc['GL'] > loc['GV']).sum() + (vis['GV'] > vis['GL']).sum()
        e = (loc['GL'] == loc['GV']).sum() + (vis['GV'] == vis['GL']).sum()
        p = (loc['GL'] < loc['GV']).sum() + (vis['GV'] < vis['GL']).sum()
        gf = loc['GL'].sum() + vis['GV'].sum()
        gc = loc['GV'].sum() + vis['GL'].sum()
        dif = gf - gc
        pj = g + e + p
        pts = (g * 3) + e
        
        if es_acumulada:
            bon = 2 if equipo == 'Sporting Cristal' and fecha_seleccionada >= 44 else 0
            sanc_dict = {'Universitario': 1, 'Dep. Municipal': 2, 'UTC': 2, 'Cantolao': 2, 'Sport Rosario': 7}
            sanc = sanc_dict.get(equipo, 0) if fecha_seleccionada >= 44 else 0
            pts_total = pts + bon - sanc
            tabla.append([equipo, pj, g, e, p, pts, bon, sanc, pts_total, gf, gc, dif])
        else:
            tabla.append([equipo, pj, g, e, p, pts, gf, gc, dif])
            
    if es_acumulada:
        cols = ['Equipo', 'PJ', 'G', 'E', 'P', 'Pts Cancha', 'Bon', 'Sanc', 'Total', 'GF', 'GC', 'DIF']
        sort_cols = ['Total', 'DIF', 'GF']
    else:
        cols = ['Equipo', 'PJ', 'G', 'E', 'P', 'Pts', 'GF', 'GC', 'DIF']
        sort_cols = ['Pts', 'DIF', 'GF']
        
    df_t = pd.DataFrame(tabla, columns=cols)
    df_t = df_t.sort_values(by=sort_cols, ascending=[False, False, False]).reset_index(drop=True)
    df_t.index = df_t.index + 1
    return df_t

# --- COLORES PARA LA ACUMULADA ---
def colorear_filas(row):
    if row.name <= 4: return ['background-color: #d4edda; color: #155724'] * len(row) # Verde Libertadores
    elif row.name <= 8: return ['background-color: #fff3cd; color: #856404'] * len(row) # Amarillo Sudamericana
    elif row.name >= 15: return ['background-color: #f8d7da; color: #721c24'] * len(row) # Rojo Descenso
    return [''] * len(row)

# --- INTERFAZ VISUAL ---
col1, col2 = st.columns([2, 1]) 

with col1:
    tab1, tab2 = st.tabs(["🏆 Tabla Acumulada", "🔥 Torneo Corto Activo"])
    
    with tab1:
        limite_acumulado = min(fecha_seleccionada, 44)
        df_filtro_acu = df_partidos[(df_partidos['Fecha_Global'] <= limite_acumulado) & (df_partidos['Torneo'].isin(['Verano', 'Apertura', 'Clausura']))]
        df_acumulada = calcular_tabla(df_filtro_acu, todos_equipos, es_acumulada=True)
        st.dataframe(df_acumulada.style.apply(colorear_filas, axis=1), use_container_width=True)
        
    with tab2:
        if fecha_seleccionada <= 14:
            st.subheader("☀️ Torneo de Verano - Grupo A")
            df_va = calcular_tabla(df_partidos[(df_partidos['Fecha_Global'] <= fecha_seleccionada) & (df_partidos['Torneo'] == 'Verano')], equipo_A)
            st.dataframe(df_va, use_container_width=True)
            
            st.subheader("☀️ Torneo de Verano - Grupo B")
            df_vb = calcular_tabla(df_partidos[(df_partidos['Fecha_Global'] <= fecha_seleccionada) & (df_partidos['Torneo'] == 'Verano')], equipo_B)
            st.dataframe(df_vb, use_container_width=True)
            
        elif fecha_seleccionada <= 29:
            st.subheader("🍂 Torneo Apertura")
            df_ap = calcular_tabla(df_partidos[(df_partidos['Fecha_Global'] >= 15) & (df_partidos['Fecha_Global'] <= fecha_seleccionada) & (df_partidos['Torneo'] == 'Apertura')], todos_equipos)
            st.dataframe(df_ap, use_container_width=True)
            
        else:
            st.subheader("🔥 Torneo Clausura")
            df_cl = calcular_tabla(df_partidos[(df_partidos['Fecha_Global'] >= 30) & (df_partidos['Fecha_Global'] <= min(fecha_seleccionada, 44)) & (df_partidos['Torneo'] == 'Clausura')], todos_equipos)
            st.dataframe(df_cl, use_container_width=True)

    st.subheader(f"📅 Partidos de la Fecha {fecha_seleccionada}")
    partidos_fecha = df_partidos[df_partidos['Fecha_Global'] == fecha_seleccionada][['Torneo', 'Local', 'GL', 'GV', 'Visitante', 'Link_Video']]
    if not partidos_fecha.empty:
        st.dataframe(partidos_fecha, column_config={"Link_Video": st.column_config.LinkColumn("Video Resumen")}, use_container_width=True)
    else:
        st.info("No hay partidos de fase regular en esta fecha (posibles Playoffs).")

with col2:
    st.subheader("⚽ Goleadores en Tiempo Real")
    df_goles_limpio = df_goles.dropna(subset=['Fecha_Global', 'Jugador'])
    df_goles_filtro = df_goles_limpio[df_goles_limpio['Fecha_Global'] <= fecha_seleccionada]
    
    if not df_goles_filtro.empty:
        df_goleadores = df_goles_filtro.groupby(['Jugador', 'Equipo'])['Goles'].sum().reset_index()
        df_goleadores = df_goleadores.sort_values(by='Goles', ascending=False).reset_index(drop=True)
        df_goleadores.index = df_goleadores.index + 1
        st.dataframe(df_goleadores, use_container_width=True)
    else:
        st.info("Aún no hay goles registrados hasta esta fecha.")

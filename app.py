import streamlit as st
import pandas as pd

# 1. CONFIGURACIÓN DE PÁGINA Y TEMA
st.set_page_config(page_title="Dashboard Descentralizado 2018 - Estilo Pro", page_icon="⚽", layout="wide")

# Inyección de CSS para Tema Oscuro y Acentos Verdes (Estilo imagen de referencia)
st.markdown("""
<style>
    /* Fondo general oscuro */
    .stApp { background-color: #1a1d24; color: #f1f3f4; }
    
    /* Títulos Principales en Verde Neón */
    h1, h2, h3, .stHeader { color: #3ddc84 !important; font-family: 'Segoe UI', sans-serif; }
    
    /* Estilo para las Tabs (Pestañas) */
    .stTabs [data-baseweb="tab-list"] { gap: 8px; }
    .stTabs [data-baseweb="tab"] {
        background-color: #2e333b;
        border-radius: 4px 4px 0px 0px;
        color: #f1f3f4;
        padding: 10px 20px;
    }
    .stTabs [aria-selected="true"] {
        background-color: #3ddc84 !important;
        color: #1a1d24 !important;
        font-weight: bold;
    }

    /* Estilo de Dataframes (Tablas) */
    .dataframe {
        border: 1px solid #3ddc84;
        background-color: #2e333b;
    }
    .dataframe thead th {
        background-color: #2e333b !important;
        color: #3ddc84 !important;
        font-weight: bold;
        text-align: center;
    }
    .dataframe tbody td { text-align: center; }
</style>
""", unsafe_allow_html=True)

st.title("🏆 Dashboard - Descentralizado 2018")
st.markdown("Bienvenido a la central de estadísticas. Cambia la fecha en el deslizador para viajar en el tiempo.")

# --- BASE DE DATOS DE ESCUDOS 2018 ---
# (Mental Check: URLs obtenidas de búsqueda web)
logos_equipos = {
    'Sporting Cristal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Escudo_del_Club_Sporting_Cristal.svg/100px-Escudo_del_Club_Sporting_Cristal.svg.png',
    'Alianza Lima': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Escudo_Alianza_Lima_3_-_1988-2011.png/100px-Escudo_Alianza_Lima_3_-_1988-2011.png',
    'Universitario': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Logo_oficial_de_Universitario.png/100px-Logo_oficial_de_Universitario.png',
    'FBC Melgar': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/FBC_Melgar.png/100px-FBC_Melgar.png',
    'Sport Huancayo': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/62/Sport_Huancayo.png/100px-Sport_Huancayo.png',
    'UTC': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/UTC_Cajamarca.svg/100px-UTC_Cajamarca.svg.png',
    'U. San Martin': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Universidad_San_Martin.svg/100px-Universidad_San_Martin.svg.png',
    'Ayacucho FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Ayacucho_FC.png/100px-Ayacucho_FC.png',
    'Cusco (Garcilaso)': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Cusco_FC_logo.png/100px-Cusco_FC_logo.png', # Nota: Contexto 2018 es Real Garcilaso
    'Binacional': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Deportivo_Binacional.png/100px-Deportivo_Binacional.png',
    'Sport Boys': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Sport_Boys_As.svg/100px-Sport_Boys_As.svg.png',
    'Dep. Municipal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Deportivo_Municipal.svg/100px-Deportivo_Municipal.svg.png',
    'Cantolao': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Academia_Deportiva_Cantolao.gif/100px-Academia_Deportiva_Cantolao.gif',
    'Comerciantes Unidos': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Logo_of_Comerciantes_Unidos_%282024%29.png/100px-Logo_of_Comerciantes_Unidos_%282024%29.png', # Nota: Logo actual
    'Union Comercio': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Union_Comercio.svg/100px-Union_Comercio.svg.png',
    'Sport Rosario': 'https://upload.wikimedia.org/wikipedia/ru/thumb/2/2d/Sport_Rosario_Logo.png/100px-Sport_Rosario_Logo.png'
}

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
    st.error("⚠️ No se encontró el archivo 'torneo_2018.xlsx'. Asegúrate de que el archivo de Excel esté subido y se llame exactamente así.")
    st.stop()

# --- BUSCADOR DE FECHA ---
fecha_maxima = int(df_partidos['Fecha_Global'].max()) if not df_partidos.empty else 50
fecha_seleccionada = st.slider("▶ Desliza para cambiar la Fecha Global:", 1, fecha_maxima, 44)

# --- MOTOR DE CÁLCULO DE TABLAS (AHORA CON LOGOS) ---
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
        
        # Obtener Logo
        logo_url = logos_equipos.get(equipo, '')
        
        if es_acumulada:
            bon = 2 if equipo == 'Sporting Cristal' and fecha_seleccionada >= 44 else 0
            sanc_dict = {'Universitario': 1, 'Dep. Municipal': 2, 'UTC': 2, 'Cantolao': 2, 'Sport Rosario': 7}
            sanc = sanc_dict.get(equipo, 0) if fecha_seleccionada >= 44 else 0
            pts_total = pts + bon - sanc
            tabla.append([logo_url, equipo, pj, pts_total, g, e, p, gf, gc, dif])
        else:
            tabla.append([logo_url, equipo, pj, pts, g, e, p, gf, gc, dif])
            
    if es_acumulada:
        cols = ['Escudo', 'Equipo', 'PJ', 'Total', 'G', 'E', 'P', 'GF', 'GC', 'DIF']
        sort_cols = ['Total', 'DIF', 'GF']
    else:
        cols = ['Escudo', 'Equipo', 'PJ', 'Pts', 'G', 'E', 'P', 'GF', 'GC', 'DIF']
        sort_cols = ['Pts', 'DIF', 'GF']
        
    df_t = pd.DataFrame(tabla, columns=cols)
    df_t = df_t.sort_values(by=sort_cols, ascending=[False, False, False]).reset_index(drop=True)
    df_t.index = df_t.index + 1
    return df_t

# --- COLORES PARA LA ACUMULADA (Ajustados para Dark Mode) ---
def colorear_filas(row):
    # Usando colores pastel oscuros para no quemar la vista
    if row.name <= 4: return ['background-color: #1e4620; color: #ffffff'] * len(row) # Verde Libertadores Oscuro
    elif row.name <= 8: return ['background-color: #5e4a1c; color: #ffffff'] * len(row) # Amarillo Sudamericana Oscuro
    elif row.name >= 15: return ['background-color: #581e23; color: #ffffff'] * len(row) # Rojo Descenso Oscuro
    return [''] * len(row)

# Configuración de columnas para mostrar imágenes
config_logos = {
    "Escudo": st.column_config.ImageColumn("Escudo", help="Escudo oficial del club"),
    "Equipo": st.column_config.TextColumn("Equipo", width="large")
}

# --- INTERFAZ VISUAL EN COLUMNAS ---
col1, col2 = st.columns([2.2, 1]) 

with col1:
    st.subheader("📊 Panel de Posiciones")
    tab1, tab2 = st.tabs(["🏆 Tabla Acumulada", "🔥 Torneo Corto Activo"])
    
    with tab1:
        limite_acumulado = min(fecha_seleccionada, 44)
        df_filtro_acu = df_partidos[(df_partidos['Fecha_Global'] <= limite_acumulado) & (df_partidos['Torneo'].isin(['Verano', 'Apertura', 'Clausura']))]
        df_acumulada = calcular_tabla(df_filtro_acu, todos_equipos, es_acumulada=True)
        # Reordenar para tener Puntos y DIF juntos (como en la referencia)
        df_acumulada = df_acumulada[['Escudo', 'Equipo', 'PJ', 'Total', 'DIF', 'G', 'E', 'P', 'GF', 'GC']]
        st.dataframe(df_acumulada.style.apply(colorear_filas, axis=1), column_config=config_logos, use_container_width=True)
        
    with tab2:
        if fecha_seleccionada <= 14:
            st.subheader("☀️ Verano - Grupo A")
            df_va = calcular_tabla(df_partidos[(df_partidos['Fecha_Global'] <= fecha_seleccionada) & (df_partidos['Torneo'] == 'Verano')], equipo_A)
            st.dataframe(df_va, column_config=config_logos, use_container_width=True)
            
            st.subheader("☀️ Verano - Grupo B")
            df_vb = calcular_tabla(df_partidos[(df_partidos['Fecha_Global'] <= fecha_seleccionada) & (df_partidos['Torneo'] == 'Verano')], equipo_B)
            st.dataframe(df_vb, column_config=config_logos, use_container_width=True)
            
        elif fecha_seleccionada <= 29:
            st.subheader("🍂 Apertura")
            df_ap = calcular_tabla(df_partidos[(df_partidos['Fecha_Global'] >= 15) & (df_partidos['Fecha_Global'] <= fecha_seleccionada) & (df_partidos['Torneo'] == 'Apertura')], todos_equipos)
            st.dataframe(df_ap, column_config=config_logos, use_container_width=True)
            
        else:
            st.subheader("🔥 Clausura")
            df_cl = calcular_tabla(df_partidos[(df_partidos['Fecha_Global'] >= 30) & (df_partidos['Fecha_Global'] <= min(fecha_seleccionada, 44)) & (df_partidos['Torneo'] == 'Clausura')], todos_equipos)
            st.dataframe(df_cl, column_config=config_logos, use_container_width=True)

    st.subheader(f"📅 Partidos y Resultados - Fecha {fecha_seleccionada}")
    partidos_fecha = df_partidos[df_partidos['Fecha_Global'] == fecha_seleccionada][['Torneo', 'Local', 'GL', 'GV', 'Visitante', 'Link_Video']]
    if not partidos_fecha.empty:
        # Añadir logos a la vista de partidos (diseño más bonito)
        partidos_fecha['L_Logo'] = partidos_fecha['Local'].map(logos_equipos)
        partidos_fecha['V_Logo'] = partidos_fecha['Visitante'].map(logos_equipos)
        partidos_fecha = partidos_fecha[['Torneo', 'L_Logo', 'Local', 'GL', 'GV', 'Visitante', 'V_Logo', 'Link_Video']]
        st.dataframe(
            partidos_fecha, 
            column_config={
                "L_Logo": st.column_config.ImageColumn(""),
                "V_Logo": st.column_config.ImageColumn(""),
                "Link_Video": st.column_config.LinkColumn("Video")
            }, 
            use_container_width=True
        )
    else:
        st.info("No hay partidos de fase regular en esta fecha.")

with col2:
    st.subheader("⚽ Goleadores")
    df_goles_limpio = df_goles.dropna(subset=['Fecha_Global', 'Jugador'])
    df_goles_filtro = df_goles_limpio[df_goles_limpio['Fecha_Global'] <= fecha_seleccionada]
    
    if not df_goles_filtro.empty:
        df_goleadores = df_goles_filtro.groupby(['Jugador', 'Equipo'])['Goles'].sum().reset_index()
        # Añadir logo del equipo del goleador
        df_goleadores['Escudo'] = df_goleadores['Equipo'].map(logos_equipos)
        df_goleadores = df_goleadores[['Escudo', 'Jugador', 'Equipo', 'Goles']]
        df_goleadores = df_goleadores.sort_values(by='Goles', ascending=False).reset_index(drop=True)
        df_goleadores.index = df_goleadores.index + 1
        st.dataframe(
            df_goleadores, 
            column_config={"Escudo": st.column_config.ImageColumn("")},
            use_container_width=True
        )
    else:
        st.info("Aún no hay goles registrados.")

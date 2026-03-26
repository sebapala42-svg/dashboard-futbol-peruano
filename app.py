import streamlit as st
import pandas as pd

# 1. CONFIGURACIÓN DE PÁGINA Y TEMA ROBUSTO
st.set_page_config(page_title="Dashboard Descentralizado 2018 - Modo Pro", page_icon="⚽", layout="wide")

# INYECCIÓN DE CSS AVANZADO: Fondo Verde Oscuro de la referencia, texto blanco y acentos
st.markdown("""
<style>
    /* 1. Fondo principal verde oscuro como la imagen de referencia */
    .stApp { background-color: #0c211b; color: #ffffff; }

    /* 2. Títulos Principales en blanco neón */
    h1, h2, h3, h4, .stHeader { color: #ffffff !important; font-family: 'Segoe UI', sans-serif; font-weight: bold;}
    
    /* 3. Estilo para las Tabs (Pestañas) - Fondo oscuro, texto blanco, acento verde al seleccionar */
    .stTabs [data-baseweb="tab-list"] { gap: 8px; background-color: #0c211b; border-bottom: 2px solid #2e333b; }
    .stTabs [data-baseweb="tab"] {
        background-color: transparent;
        color: #ffffff;
        padding: 10px 20px;
        font-weight: normal;
    }
    .stTabs [aria-selected="true"] {
        background-color: transparent !important;
        color: #3ddc84 !important; /* Verde Neón de acento al seleccionar */
        font-weight: bold;
        border-bottom: 2px solid #3ddc84 !important;
    }

    /* 4. Estilo de Dataframes (Tablas) - Fondo muy oscuro, borde verde */
    .dataframe {
        border: 1px solid #3ddc84;
        background-color: #0c1613 !important;
    }
    .dataframe thead th {
        background-color: #0c1613 !important;
        color: #3ddc84 !important; /* Cabeceras verdes */
        font-weight: bold;
        text-align: center;
        border-bottom: 2px solid #3ddc84;
    }
    .dataframe tbody td { text-align: center; color: #ffffff; background-color: #0c1613 !important; border: 1px solid #1a1d24;}

    /* 5. Colores específicos para la Acumulada (Sutiles en modo oscuro) */
    .Libertadores-f { background-color: #1e4620 !important; color: #ffffff !important; } /* Verde Oscuro */
    .Sudamericana-f { background-color: #5e4a1c !important; color: #ffffff !important; } /* Amarillo Oscuro */
    .Descenso-f { background-color: #581e23 !important; color: #ffffff !important; } /* Rojo Oscuro */

    /* 6. Deslizador de Fecha - Color verde */
    .stSlider [data-baseweb="slider-track"] > div > div { background: #3ddc84 !important; }
    .stSlider [data-baseweb="slider-handle"] { background: #3ddc84 !important; }

</style>
""", unsafe_allow_html=True)

st.title("⚽ Dashboard Interactivo - Descentralizado 2018")
st.markdown("Bienvenido a la central de estadísticas. Cambia la fecha en el deslizador para viajar en el tiempo.")

# --- BASE DE DATOS DE ESCUDOS 2018 (Enlaces Directos y Robustos) ---
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
    'Comerciantes Unidos': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Logo_of_Comerciantes_Unidos_%282024%29.png/100px-Logo_of_Comerciantes_Unidos_%282024%29.png',
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
    # Asegúrate de que el archivo Excel esté subido y se llame así
    df_partidos = pd.read_excel('torneo_2018.xlsx', sheet_name='BaseDatos')
    df_goles = pd.read_excel('torneo_2018.xlsx', sheet_name='Registro_Goles')
    return df_partidos, df_goles

try:
    df_partidos, df_goles = cargar_datos()
except Exception as e:
    st.error("⚠️ No se encontró el archivo 'torneo_2018.xlsx' en tu GitHub. Asegúrate de subirlo y que el nombre sea exacto.")
    st.stop()

# --- BUSCADOR DE FECHA ---
fecha_maxima = int(df_partidos['Fecha_Global'].max()) if not df_partidos.empty else 50
fecha_seleccionada = st.slider("▶ Desliza para cambiar la Fecha Global:", 1, fecha_maxima, 30)

# --- MOTOR DE CÁLCULO DE TABLAS (MAQUETACIÓN ESTILO REFERENCIA) ---
def calcular_tabla(df_filtrado, lista_equipos, es_acumulada=False):
    tabla = []
    for equipo in lista_equipos:
        # Debugeo rápido: ¿Hay logos para este equipo?
        if equipo not in logos_equipos:
             st.warning(f"Aviso: El nombre '{equipo}' del Excel no tiene logo configurado en Python. Asegúrate de que coincida letra por letra.")
        
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
        logo_url = logos_equipos.get(equipo, 'https://cdn-icons-png.flaticon.com/128/33/33736.png') # Logo genérico si no lo encuentra
        
        if es_acumulada:
            bon = 2 if equipo == 'Sporting Cristal' and fecha_seleccionada >= 44 else 0
            # Sanciones reales 2018
            sanc_dict = {'Universitario': 1, 'Dep. Municipal': 2, 'UTC': 2, 'Cantolao': 2, 'Sport Rosario': 7}
            sanc = sanc_dict.get(equipo, 0) if fecha_seleccionada >= 44 else 0
            pts_total = pts + bon - sanc
            # Maquetación estilo referencia: Escudo | Puesto | Equipo | PTS | J | Gol (F:C) | DIF | ...
            tabla.append([logo_url, equipo, pj, pts_total, f"{gf}:{gc}", dif, g, e, p])
        else:
            tabla.append([logo_url, equipo, pj, pts, f"{gf}:{gc}", dif, g, e, p])
            
    if es_acumulada:
        cols = ['#', 'Equipo', 'J', 'PTS', 'Gol (F:C)', '+/-', 'G', 'E', 'P']
        sort_cols = ['PTS', '+/-']
    else:
        cols = ['#', 'Equipo', 'J', 'PTS', 'Gol (F:C)', '+/-', 'G', 'E', 'P']
        sort_cols = ['PTS', '+/-']
        
    df_t = pd.DataFrame(tabla, columns=cols)
    df_t = df_t.sort_values(by=sort_cols, ascending=[False, False]).reset_index(drop=True)
    df_t.index = df_t.index + 1
    return df_t

# --- COLORES PARA LA ACUMULADA (Estilo Modo Oscuro) ---
def colorear_filas(row):
    # Colores sutiles de fondo para Libertadores (Verde), Sudamericana (Amarillo), Descenso (Rojo)
    if row.name <= 4: return ['background-color: #1e4620 !important; color: #ffffff !important'] * len(row) # Verde Libertadores
    elif row.name <= 8: return ['background-color: #5e4a1c !important; color: #ffffff !important'] * len(row) # Amarillo Sudamericana
    elif row.name >= 15: return ['background-color: #581e23 !important; color: #ffffff !important'] * len(row) # Rojo Descenso
    return [''] * len(row)

# Configuración de columnas para imágenes (logos)
config_logos = {
    "#": st.column_config.ImageColumn("", width="small"),
    "Equipo": st.column_config.TextColumn("Equipo", width="large")
}

# --- INTERFAZ VISUAL EN COLUMNAS ---
col1, col2 = st.columns([2.3, 1]) 

with col1:
    st.subheader("📊 Panel de Posiciones")
    tab1, tab2 = st.tabs(["🏆 Tabla Acumulada", "🔥 Torneo Corto Activo"])
    
    with tab1:
        limite_acumulado = min(fecha_seleccionada, 44)
        df_filtro_acu = df_partidos[(df_partidos['Fecha_Global'] <= limite_acumulado) & (df_partidos['Torneo'].isin(['Verano', 'Apertura', 'Clausura']))]
        df_acumulada = calcular_tabla(df_filtro_acu, todos_equipos, es_acumulada=True)
        # Aplicamos el estilo coloreado sutil
        st.dataframe(df_acumulada.style.apply(colorear_filas, axis=1), column_config=config_logos, use_container_width=True, hide_index=False)
        
    with tab2:
        if fecha_seleccionada <= 14:
            st.subheader("☀️ Torneo de Verano")
            df_va = calcular_tabla(df_partidos[(df_partidos['Fecha_Global'] <= fecha_seleccionada) & (df_partidos['Torneo'] == 'Verano')], equipo_A)
            st.dataframe(df_va, column_config=config_logos, use_container_width=True)
        elif fecha_seleccionada <= 29:
            st.subheader("🍂 Torneo Apertura")
            df_ap = calcular_tabla(df_partidos[(df_partidos['Fecha_Global'] >= 15) & (df_partidos['Fecha_Global'] <= fecha_seleccionada) & (df_partidos['Torneo'] == 'Apertura')], todos_equipos)
            st.dataframe(df_ap, column_config=config_logos, use_container_width=True)
        else:
            st.subheader("🔥 Torneo Clausura")
            df_cl = calcular_tabla(df_partidos[(df_partidos['Fecha_Global'] >= 30) & (df_partidos['Fecha_Global'] <= min(fecha_seleccionada, 44)) & (df_partidos['Torneo'] == 'Clausura')], todos_equipos)
            st.dataframe(df_cl, column_config=config_logos, use_container_width=True)

    st.subheader(f"📅 Partidos y Resultados - Fecha Global {fecha_seleccionada}")
    partidos_fecha = df_partidos[df_partidos['Fecha_Global'] == fecha_seleccionada][['Torneo', 'Local', 'GL', 'GV', 'Visitante', 'Link_Video']]
    if not partidos_fecha.empty:
        # Añadir logos a la vista de partidos (diseño más visual)
        partidos_fecha['L_Logo'] = partidos_fecha['Local'].map(logos_equipos)
        partidos_fecha['V_Logo'] = partidos_fecha['Visitante'].map(logos_equipos)
        # Reordenar: LocalLogo | LocalName | GL | GV | VisitanteName | VisitanteLogo | LinkVideo
        partidos_fecha = partidos_fecha[['Torneo', 'L_Logo', 'Local', 'GL', 'GV', 'Visitante', 'V_Logo', 'Link_Video']]
        st.dataframe(
            partidos_fecha, 
            column_config={
                "L_Logo": st.column_config.ImageColumn("", width="small"),
                "V_Logo": st.column_config.ImageColumn("", width="small"),
                "Link_Video": st.column_config.LinkColumn("Video Resumen")
            }, 
            use_container_width=True
        )
    else:
        st.info("No hay partidos de fase regular en esta fecha (posibles Playoffs).")

with col2:
    st.subheader("⚽ Goleadores")
    # Ignorar celdas vacías del Excel
    df_goles_limpio = df_goles.dropna(subset=['Fecha_Global', 'Jugador'])
    df_goles_filtro = df_goles_limpio[df_goles_limpio['Fecha_Global'] <= fecha_seleccionada]
    
    if not df_goles_filtro.empty:
        df_goleadores = df_goles_filtro.groupby(['Jugador', 'Equipo'])['Goles'].sum().reset_index()
        # Añadir logo del equipo del goleador
        df_goleadores['#'] = df_goleadores['Equipo'].map(logos_equipos)
        df_goleadores = df_goleadores[['#', 'Jugador', 'Equipo', 'Goles']]
        df_goleadores = df_goleadores.sort_values(by='Goles', ascending=False).reset_index(drop=True)
        df_goleadores.index = df_goleadores.index + 1
        st.dataframe(
            df_goleadores, 
            column_config={"#": st.column_config.ImageColumn("", width="small")},
            use_container_width=True
        )
    else:
        st.info("Aún no hay goles registrados hasta esta fecha.")

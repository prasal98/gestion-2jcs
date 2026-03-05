"""
Sistema de Gestión · 2° Juzgado Civil de Santiago
Coordinación: Pedro Antonio Salazar Núñez
"""

import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime, date
import io
import xlrd
import warnings
warnings.filterwarnings('ignore')

# ─── CONFIGURACIÓN ────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="2° JCS · Gestión",
    page_icon="⚖️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ─── USUARIOS AUTORIZADOS ─────────────────────────────────────────────────────
# Para agregar un usuario nuevo: agrega una línea con 'usuario': ('Nombre Completo', 'contraseña')
# Para cambiar contraseña: modifica el valor entre comillas
USUARIOS = {
    'pedro':        ('Pedro Salazar · Coordinador',  'jcs2026'),
    'figueroa':     ('Juez Figueroa · Titular',       'juez2026'),
    'coordinador':  ('Coordinador · Tribunal',        'tribunal2026'),
}

def check_password(usuario: str, password: str) -> bool:
    user_data = USUARIOS.get(usuario.lower().strip())
    if not user_data:
        return False
    _, pwd_correcta = user_data
    return password == pwd_correcta

def login_screen():
    st.markdown("""
    <style>
    .login-box {
        max-width: 420px;
        margin: 80px auto;
        background: white;
        border-radius: 16px;
        padding: 2.5rem;
        box-shadow: 0 8px 32px rgba(31,56,100,0.15);
    }
    .login-logo { text-align:center; font-size:3rem; margin-bottom:0.5rem; }
    .login-title { text-align:center; font-size:1.3rem; font-weight:700;
                   color:#1F3864; margin-bottom:0.2rem; }
    .login-sub   { text-align:center; font-size:0.8rem; color:#888;
                   margin-bottom:1.8rem; }
    </style>
    <div class="login-box">
        <div class="login-logo">⚖️</div>
        <div class="login-title">2° Juzgado Civil de Santiago</div>
        <div class="login-sub">Sistema de Gestión Administrativa · 2026</div>
    </div>
    """, unsafe_allow_html=True)

    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        st.markdown("### Iniciar sesión")
        usuario  = st.text_input("Usuario", placeholder="ej: pedro")
        password = st.text_input("Contraseña", type="password")
        if st.button("Ingresar", use_container_width=True, type="primary"):
            if check_password(usuario, password):
                nombre = USUARIOS[usuario.lower().strip()][0]
                st.session_state['autenticado'] = True
                st.session_state['usuario']     = usuario.lower().strip()
                st.session_state['nombre']      = nombre
                st.rerun()
            else:
                st.error("Usuario o contraseña incorrectos.")
        st.caption("Acceso restringido · Solo personal autorizado del tribunal")

# ─── CONTROL DE ACCESO ────────────────────────────────────────────────────────
if 'autenticado' not in st.session_state:
    st.session_state['autenticado'] = False

if not st.session_state['autenticado']:
    login_screen()
    st.stop()  # Detiene todo lo demás si no está autenticado

# ─── ESTILOS ──────────────────────────────────────────────────────────────────
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* { font-family: 'Inter', sans-serif; }

.main { background-color: #F8F9FC; }

/* Header institucional */
.inst-header {
    background: linear-gradient(135deg, #1F3864 0%, #2E75B6 100%);
    color: white;
    padding: 1.2rem 2rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
}
.inst-header h1 { font-size: 1.4rem; font-weight: 700; margin: 0; letter-spacing: -0.5px; }
.inst-header p  { font-size: 0.85rem; margin: 0.2rem 0 0; opacity: 0.85; }

/* KPI Cards */
.kpi-card {
    background: white;
    border-radius: 12px;
    padding: 1.2rem 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    border-left: 4px solid #2E75B6;
    margin-bottom: 0.5rem;
}
.kpi-card.alerta { border-left-color: #C00000; }
.kpi-card.ok     { border-left-color: #375623; }
.kpi-card.warn   { border-left-color: #BF8F00; }
.kpi-val  { font-size: 2rem; font-weight: 700; color: #1F3864; line-height: 1; }
.kpi-lab  { font-size: 0.75rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; }
.kpi-meta { font-size: 0.72rem; color: #999; margin-top: 2px; }

/* Semáforo badge */
.sem-verde  { background:#E2EFDA; color:#375623; padding:2px 10px; border-radius:20px; font-size:0.8rem; font-weight:600; }
.sem-amarillo { background:#FFF2CC; color:#7D5A00; padding:2px 10px; border-radius:20px; font-size:0.8rem; font-weight:600; }
.sem-rojo   { background:#FCE4D6; color:#C00000; padding:2px 10px; border-radius:20px; font-size:0.8rem; font-weight:600; }

/* Tabla */
.stDataFrame { border-radius: 10px; overflow: hidden; }
thead tr th { background-color: #1F3864 !important; color: white !important; }

/* Sidebar */
[data-testid="stSidebar"] {
    background: linear-gradient(180deg, #1F3864 0%, #1a305a 100%);
}
[data-testid="stSidebar"] * { color: white !important; }
[data-testid="stSidebar"] .stRadio label { color: white !important; font-size: 0.9rem; }

/* Upload zone */
[data-testid="stFileUploader"] {
    border: 2px dashed #2E75B6;
    border-radius: 10px;
    padding: 1rem;
}

/* Urgente banner */
.urgente {
    background: linear-gradient(90deg, #C00000, #FF4444);
    color: white;
    padding: 0.7rem 1.2rem;
    border-radius: 8px;
    font-weight: 600;
    margin-bottom: 1rem;
    animation: pulse 2s infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.85} }

/* Section title */
.sec-title {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #2E75B6;
    border-bottom: 2px solid #2E75B6;
    padding-bottom: 4px;
    margin: 1.5rem 0 1rem;
}
</style>
""", unsafe_allow_html=True)

# ─── NOMBRES DE FUNCIONARIOS ──────────────────────────────────────────────────
NAME_MAP = {
    'alexis juan olivares oyarcel':                'Alexis Olivares',
    'solange margarita valenzuela saavedra':        'Solange Valenzuela',
    'fabiola alejandra droguett norambuena':        'Fabiola Droguet',
    'juan valenzuela guerrero':                     'Juan Valenzuela',
    'macarena campos parada':                       'Macarena Campos',
    'max naguil cisternas':                         'Max Ñaguil',
    'carola andrea pedregal toledo':                'Carola Pedregal',
    'patricia veronica salas abarza':               'Patricia Salas',
    'nicolas lorenzoni espinosa':                   'Nicolás Lorenzoni',
    'francisca christiny lópez':                    'Francisca Cristiny',
    'valentina paz garrido saguas':                 'Valentina Garrido',
    'cristian javier rivera carcamo':               'Cristián Rivas',
    'cesar antonio bravo vera':                     'César Bravo',
    'camila belén riveros sánchez':                 'Camila Rivera',
    'jorge andres alburquenque alarcon':            'Jorge',
    'robinson sepulveda benedetti':                 'Robinson',
    'marcos javier rios angulo':                    'Marcos Ríos',
    'manuel jesus figueroa salas':                  'Juez Figueroa',
    'angela becerra olmedo':                        'Ángela Becerra',
    'camilo ross oyarzo':                           'Camilo Ross',
    'cristina nataly velasquez amaro':              'Cristina Velásquez',
    'coordinador funcionarios tramitación':         'Coordinador',
    'pedro antonio salazar nuñez':                  'Pedro Salazar',
    'montserrat maritza ortiz silva':               'Montserrat Ortiz',
}

def normalize_name(raw: str) -> str:
    key = raw.strip().lower()
    return NAME_MAP.get(key, raw.strip().title())

# ─── METAS KPI ────────────────────────────────────────────────────────────────
METAS = {
    'clearance_rate':      {'meta': 100, 'alerta': 90,  'label': 'Clearance Rate (%)',     'unit': '%'},
    'plazo_tramitacion':   {'meta': 180, 'alerta': 200, 'label': 'Plazo Tramitación (días)','unit': 'd', 'inv': True},
    'cumplimiento_plazos': {'meta': 90,  'alerta': 80,  'label': 'Cumplimiento Plazos (%)','unit': '%'},
    'meta_baja_dia':       {'meta': 60,  'alerta': 50,  'label': 'Meta Baja Complejidad/día','unit': ''},
    'meta_ejecutiva_dia':  {'meta': 45,  'alerta': 38,  'label': 'Meta Ejecutiva/día',     'unit': ''},
    'meta_fondo_dia':      {'meta': 25,  'alerta': 21,  'label': 'Meta Fondo/día',         'unit': ''},
}

def semaforo(valor, meta, alerta, inv=False):
    if inv:
        if valor <= meta:   return '🟢', 'ok'
        if valor <= alerta: return '🟡', 'warn'
        return '🔴', 'alerta'
    else:
        if valor >= meta:   return '🟢', 'ok'
        if valor >= alerta: return '🟡', 'warn'
        return '🔴', 'alerta'

# ─── PARSERS ──────────────────────────────────────────────────────────────────
def detect_file_type(df_head: list) -> str:
    """Detecta tipo de archivo SITCI por encabezados."""
    headers = ' '.join(str(h).lower() for h in df_head)
    if 'funcionario de bloqueo' in headers or 'nomenclatura' in headers:
        return 'resoluciones'
    if 'tipo escrito' in headers and 'complejidad' in headers:
        return 'escritos'
    if 'tipo cuaderno' in headers and 'estado cuaderno' in headers:
        return 'incidentes'
    if 'fecha para fallo' in headers or 'boletín' in headers.replace('boletin','boletín') or 'estado boletin' in headers:
        return 'fallos'
    return 'desconocido'

@st.cache_data(show_spinner=False)
def parse_xls(file_bytes: bytes, filename: str):
    """Lee XLS de SITCI y retorna DataFrame + tipo detectado."""
    try:
        wb = xlrd.open_workbook(file_contents=file_bytes)
        sh = wb.sheets()[0]
        # Buscar fila de encabezado (primera fila con ≥ 3 celdas no vacías)
        header_row = 0
        for i in range(min(10, sh.nrows)):
            vals = [str(sh.cell_value(i, j)).strip() for j in range(sh.ncols)]
            if sum(1 for v in vals if v and v != '') >= 3:
                header_row = i
                break
        headers = [str(sh.cell_value(header_row, j)).strip() for j in range(sh.ncols)]
        data = []
        for i in range(header_row + 1, sh.nrows):
            row = [str(sh.cell_value(i, j)).strip() for j in range(sh.ncols)]
            if any(r for r in row if r and r != ''):
                data.append(row)
        df = pd.DataFrame(data, columns=headers)
        tipo = detect_file_type(headers)
        return df, tipo
    except Exception as e:
        return None, f'error: {e}'

# ─── MÓDULOS ──────────────────────────────────────────────────────────────────

def modulo_resoluciones(df: pd.DataFrame):
    st.markdown('<div class="sec-title">📊 Productividad por Funcionario</div>', unsafe_allow_html=True)

    # Detectar columna de funcionario
    func_col = next((c for c in df.columns if 'funcionario' in c.lower() or 'bloqueo' in c.lower()), None)
    fecha_col = next((c for c in df.columns if 'firma' in c.lower() or 'fecha' in c.lower()), None)

    if not func_col:
        st.error("No se encontró columna de funcionario.")
        return

    df['_func'] = df[func_col].apply(normalize_name)
    df['_fecha'] = pd.to_datetime(df[fecha_col], format='%d/%m/%Y', errors='coerce') if fecha_col else None

    # Calcular días hábiles
    if df['_fecha'].notna().any():
        fechas_unicas = df.dropna(subset=['_fecha'])['_fecha'].dt.date.unique()
        dias_habiles = len(fechas_unicas)
    else:
        dias_habiles = 21

    total_df = df.groupby('_func').size().reset_index(name='Total')
    if df['_fecha'].notna().any():
        dias_df = df.dropna(subset=['_fecha']).groupby('_func')['_fecha'].nunique().reset_index(name='Días')
    else:
        dias_df = pd.DataFrame({'_func': total_df['_func'], 'Días': dias_habiles})

    res = total_df.merge(dias_df, on='_func', how='left')
    res['Prom/Día'] = (res['Total'] / res['Días'].replace(0, 1)).round(1)

    # Excluir juez y no asignados
    excluir = ['Juez Figueroa', '--', 'Sin asignar', '']
    res = res[~res['_func'].isin(excluir)]
    res = res.sort_values('Total', ascending=False).reset_index(drop=True)

    # Semáforos
    meta_d = 60
    def sem_row(prom):
        if prom >= meta_d:   return '🟢'
        if prom >= meta_d * 0.85: return '🟡'
        return '🔴'
    res['Semáforo'] = res['Prom/Día'].apply(sem_row)
    res.index = res.index + 1
    res.columns = ['Funcionario', 'Total Mes', 'Días Trabajados', 'Prom/Día', 'Semáforo']

    # Métricas globales
    total_resoluciones = res['Total Mes'].sum()
    prom_global = res['Prom/Día'].mean().round(1)
    top = res.iloc[0]['Funcionario']

    c1, c2, c3, c4 = st.columns(4)
    with c1:
        st.markdown(f'<div class="kpi-card ok"><div class="kpi-val">{total_resoluciones:,}</div><div class="kpi-lab">Total Resoluciones</div><div class="kpi-meta">Mes completo</div></div>', unsafe_allow_html=True)
    with c2:
        st.markdown(f'<div class="kpi-card"><div class="kpi-val">{prom_global}</div><div class="kpi-lab">Prom. Global/Día</div><div class="kpi-meta">Meta: 60</div></div>', unsafe_allow_html=True)
    with c3:
        st.markdown(f'<div class="kpi-card ok"><div class="kpi-val">{dias_habiles}</div><div class="kpi-lab">Días Hábiles</div></div>', unsafe_allow_html=True)
    with c4:
        st.markdown(f'<div class="kpi-card"><div class="kpi-val" style="font-size:1.2rem">{top}</div><div class="kpi-lab">Mayor Rendimiento</div></div>', unsafe_allow_html=True)

    st.dataframe(res, use_container_width=True, height=480)

    # Gráfico
    fig = px.bar(res.sort_values('Prom/Día'), x='Prom/Día', y='Funcionario',
                 orientation='h', color='Prom/Día',
                 color_continuous_scale=['#C00000', '#BF8F00', '#375623'],
                 range_color=[0, max(res['Prom/Día'].max(), meta_d * 1.1)])
    fig.add_vline(x=meta_d, line_dash='dash', line_color='#1F3864',
                  annotation_text=f'Meta {meta_d}', annotation_position='top right')
    fig.update_layout(height=420, plot_bgcolor='white', paper_bgcolor='white',
                      margin=dict(l=10, r=20, t=20, b=10),
                      coloraxis_showscale=False,
                      xaxis_title='Resoluciones por día', yaxis_title='')
    st.plotly_chart(fig, use_container_width=True)


def modulo_escritos(df: pd.DataFrame):
    st.markdown('<div class="sec-title">📨 Ingreso de Escritos por Funcionario</div>', unsafe_allow_html=True)

    func_col = next((c for c in df.columns if 'funcionario' in c.lower()), None)
    comp_col = next((c for c in df.columns if 'complejidad' in c.lower()), None)

    if not func_col:
        st.error("No se encontró columna de funcionario.")
        return

    df['_func'] = df[func_col].apply(normalize_name)
    excluir = ['Juez Figueroa', '--', 'Sin asignar', '']

    # Por funcionario y complejidad
    total = df[~df['_func'].isin(excluir)].groupby('_func').size().reset_index(name='Total')

    if comp_col:
        comp = df[~df['_func'].isin(excluir)].groupby(['_func', comp_col]).size().unstack(fill_value=0)
        comp.columns = [f'Comp.{c}' for c in comp.columns]
        res = total.merge(comp, left_on='_func', right_index=True, how='left')
    else:
        res = total

    res['Prom/Día'] = (res['Total'] / 21).round(1)
    prom_grupo = res['Total'].mean()
    res['Índice Equidad'] = (res['Total'] / prom_grupo * 100).round(0).astype(int).astype(str) + '%'
    res = res.sort_values('Total', ascending=False).reset_index(drop=True)
    res.index += 1
    res.rename(columns={'_func': 'Funcionario'}, inplace=True)

    total_esc = res['Total'].sum()
    c1, c2, c3 = st.columns(3)
    with c1:
        st.markdown(f'<div class="kpi-card"><div class="kpi-val">{total_esc:,}</div><div class="kpi-lab">Total Escritos Ingresados</div></div>', unsafe_allow_html=True)
    with c2:
        st.markdown(f'<div class="kpi-card"><div class="kpi-val">{prom_grupo:.0f}</div><div class="kpi-lab">Promedio por Funcionario</div></div>', unsafe_allow_html=True)
    with c3:
        max_func = res.iloc[0]['Funcionario']
        max_val = res.iloc[0]['Total']
        st.markdown(f'<div class="kpi-card warn"><div class="kpi-val" style="font-size:1.1rem">{max_func}</div><div class="kpi-lab">Mayor Carga · {max_val} escritos</div></div>', unsafe_allow_html=True)

    st.dataframe(res, use_container_width=True, height=420)

    if comp_col:
        comp_totales = df[comp_col].value_counts().reset_index()
        comp_totales.columns = ['Complejidad', 'Total']
        comp_totales = comp_totales[comp_totales['Complejidad'].str.strip() != '']
        fig = px.pie(comp_totales, names='Complejidad', values='Total',
                     color_discrete_sequence=['#1F3864','#2E75B6','#BDD7EE','#DDEBF7'],
                     title='Distribución por Complejidad')
        fig.update_layout(height=300, paper_bgcolor='white')
        st.plotly_chart(fig, use_container_width=True)


def modulo_incidentes(df: pd.DataFrame):
    st.markdown('<div class="sec-title">⚖️ Análisis de Incidentes</div>', unsafe_allow_html=True)

    tipo_col   = next((c for c in df.columns if 'cuaderno' in c.lower() and 'tipo' in c.lower()), None)
    estado_col = next((c for c in df.columns if 'estado' in c.lower()), None)
    fecha_col  = next((c for c in df.columns if 'fallo' in c.lower() and 'fecha' in c.lower()), None)
    rol_col    = next((c for c in df.columns if c.strip().upper() in ('ROL', 'Rol')), None)

    if not tipo_col or not estado_col:
        st.error("No se reconoció la estructura del archivo.")
        return

    total = len(df)
    concluidos   = df[df[estado_col].str.strip() == 'Concluido'].shape[0]
    pendientes   = df[df[estado_col].str.strip() == 'Tramitación'].shape[0]
    suspendidos  = df[df[estado_col].str.strip() == 'Suspendido'].shape[0]
    tasa = round(concluidos / total * 100, 1) if total else 0

    # Abandono → depende de partes
    abandono_pend = df[(df[tipo_col].str.contains('Abandono', na=False)) &
                       (df[estado_col].str.strip().isin(['Tramitación','Suspendido']))].shape[0]
    tribunal_pend = pendientes - abandono_pend

    c1, c2, c3, c4, c5 = st.columns(5)
    cards = [
        (str(total),        'Total Incidentes',       'kpi-card'),
        (str(concluidos),   'Concluidos',             'kpi-card ok'),
        (f'{tasa}%',        'Tasa Resolución',        'kpi-card ok' if tasa >= 65 else 'kpi-card alerta'),
        (str(tribunal_pend),'Pend. Tribunal',         'kpi-card warn'),
        (str(abandono_pend),'Pend. Partes',           'kpi-card'),
    ]
    for col, (val, lab, cls) in zip([c1,c2,c3,c4,c5], cards):
        with col:
            st.markdown(f'<div class="{cls}"><div class="kpi-val">{val}</div><div class="kpi-lab">{lab}</div></div>', unsafe_allow_html=True)

    # Tabla por tipo
    st.markdown("**Por tipo de incidente**")
    by_tipo = df.groupby(tipo_col)[estado_col].value_counts().unstack(fill_value=0).reset_index()
    by_tipo['Total'] = by_tipo.select_dtypes('number').sum(axis=1)
    if 'Concluido' in by_tipo.columns:
        by_tipo['% Resolución'] = (by_tipo.get('Concluido', 0) / by_tipo['Total'] * 100).round(1).astype(str) + '%'
    pend_col = 'Tramitación' if 'Tramitación' in by_tipo.columns else None
    if pend_col:
        by_tipo['Pendientes'] = by_tipo[pend_col]
    by_tipo = by_tipo.sort_values('Total', ascending=False)
    st.dataframe(by_tipo, use_container_width=True, height=380)

    # Evolución mensual
    if fecha_col:
        df['_fecha'] = pd.to_datetime(df[fecha_col], format='%d/%m/%Y', errors='coerce')
        mensual = df.dropna(subset=['_fecha']).groupby(
            df['_fecha'].dt.to_period('M')
        ).size().reset_index(name='Resueltos')
        mensual['Mes'] = mensual['_fecha'].astype(str)
        if not mensual.empty:
            fig = px.bar(mensual, x='Mes', y='Resueltos',
                         color_discrete_sequence=['#2E75B6'],
                         title='Incidentes resueltos por mes')
            fig.update_layout(height=280, plot_bgcolor='white', paper_bgcolor='white',
                              margin=dict(l=10,r=10,t=30,b=10))
            st.plotly_chart(fig, use_container_width=True)

    # Pendientes priorizados
    st.markdown("**Pendientes resolvibles por el tribunal (para fallo)**")
    pen_df = df[(df[estado_col].str.strip() == 'Tramitación') &
                (~df[tipo_col].str.contains('Abandono', na=False))].copy()
    if not pen_df.empty:
        cols_show = [c for c in [rol_col, tipo_col, 'Procedimiento', 'Materia'] if c and c in pen_df.columns]
        st.dataframe(pen_df[cols_show].reset_index(drop=True), use_container_width=True, height=320)
        st.caption(f"Total pendientes resolvibles: {len(pen_df)}")


def modulo_fallos(df: pd.DataFrame):
    st.markdown('<div class="sec-title">📋 Gestión de Fallos</div>', unsafe_allow_html=True)

    tipo_col   = next((c for c in df.columns if 'tipo' in c.lower() and 'causa' in c.lower()), None)
    fecha_pf   = next((c for c in df.columns if 'para fallo' in c.lower()), None)
    fecha_fallo= next((c for c in df.columns if 'de fallo' in c.lower() and 'para' not in c.lower()), None)
    proc_col   = next((c for c in df.columns if 'procedimiento' in c.lower()), None)
    rol_col    = next((c for c in df.columns if c.strip().upper() == 'ROL'), None)

    if tipo_col:
        para_fallo = df[df[tipo_col].str.strip() == 'Para Fallo']
        falladas   = df[df[tipo_col].str.strip() == 'Falladas']
    else:
        para_fallo = df
        falladas   = pd.DataFrame()

    hoy = pd.Timestamp.today()

    # Antigüedad
    if fecha_pf and fecha_pf in df.columns:
        para_fallo = para_fallo.copy()
        para_fallo['_fpf'] = pd.to_datetime(para_fallo[fecha_pf], format='%d/%m/%Y', errors='coerce')
        para_fallo['Meses Pendiente'] = ((hoy - para_fallo['_fpf']).dt.days / 30).round(0).astype('Int64')
        alerta_3m = para_fallo[para_fallo['Meses Pendiente'].notna() & (para_fallo['Meses Pendiente'] >= 3)]
        alerta_6m = para_fallo[para_fallo['Meses Pendiente'].notna() & (para_fallo['Meses Pendiente'] >= 6)]
    else:
        alerta_3m = pd.DataFrame()
        alerta_6m = pd.DataFrame()

    c1,c2,c3,c4 = st.columns(4)
    with c1:
        st.markdown(f'<div class="kpi-card warn"><div class="kpi-val">{len(para_fallo)}</div><div class="kpi-lab">Para Fallo</div></div>', unsafe_allow_html=True)
    with c2:
        st.markdown(f'<div class="kpi-card ok"><div class="kpi-val">{len(falladas)}</div><div class="kpi-lab">Dictados este mes</div></div>', unsafe_allow_html=True)
    with c3:
        cls = 'alerta' if len(alerta_3m) > 0 else 'ok'
        st.markdown(f'<div class="kpi-card {cls}"><div class="kpi-val">{len(alerta_3m)}</div><div class="kpi-lab">&gt; 3 meses</div><div class="kpi-meta">Meta: 0</div></div>', unsafe_allow_html=True)
    with c4:
        cls = 'alerta' if len(alerta_6m) > 0 else 'ok'
        st.markdown(f'<div class="kpi-card {cls}"><div class="kpi-val">{len(alerta_6m)}</div><div class="kpi-lab">&gt; 6 meses</div><div class="kpi-meta">Crítico</div></div>', unsafe_allow_html=True)

    tab1, tab2 = st.tabs(["📌 Para Fallo (pendientes)", "✅ Dictados"])

    with tab1:
        if not para_fallo.empty:
            cols_show = [c for c in [rol_col, 'Caratulado', proc_col, fecha_pf, 'Meses Pendiente'] if c and c in para_fallo.columns]
            df_show = para_fallo[cols_show].sort_values('Meses Pendiente', ascending=False) if 'Meses Pendiente' in para_fallo.columns else para_fallo[cols_show]

            def highlight_old(row):
                val = row.get('Meses Pendiente', 0)
                if pd.isna(val): return [''] * len(row)
                if val >= 6: return ['background-color: #FCE4D6'] * len(row)
                if val >= 3: return ['background-color: #FFF2CC'] * len(row)
                return [''] * len(row)

            st.dataframe(df_show.reset_index(drop=True), use_container_width=True, height=420)
            if len(alerta_6m) > 0:
                st.warning(f"⚠️ {len(alerta_6m)} causas llevan 6+ meses sin fallo. Revisar con urgencia.")

    with tab2:
        if not falladas.empty:
            cols_show = [c for c in [rol_col, 'Caratulado', proc_col, fecha_pf, fecha_fallo, 'Juez'] if c and c in falladas.columns]
            st.dataframe(falladas[cols_show].reset_index(drop=True), use_container_width=True, height=380)
        else:
            st.info("Sin fallos dictados en el período.")

    # Distribución por procedimiento
    if proc_col and proc_col in para_fallo.columns:
        dist = para_fallo[proc_col].value_counts().head(8).reset_index()
        dist.columns = ['Procedimiento', 'Cantidad']
        fig = px.bar(dist, x='Cantidad', y='Procedimiento', orientation='h',
                     color_discrete_sequence=['#2E75B6'],
                     title='Para Fallo · Por tipo de procedimiento')
        fig.update_layout(height=300, plot_bgcolor='white', paper_bgcolor='white',
                          margin=dict(l=10,r=10,t=30,b=10))
        st.plotly_chart(fig, use_container_width=True)


def modulo_asignacion():
    st.markdown('<div class="sec-title">📌 Generador de Asignaciones</div>', unsafe_allow_html=True)
    st.info("Sube el archivo de incidentes para generar asignaciones por funcionario.")

    funcionarios = [
        'Jorge', 'Robinson', 'Camila Rivera', 'Cristián Rivas',
        'Francisca Cristiny', 'Nicolás Lorenzoni', 'Max Ñaguil',
        'Camilo Ross', 'Marcos Ríos'
    ]

    col1, col2 = st.columns([1, 2])
    with col1:
        st.markdown("**Configurar asignación**")
        n_por_func = st.number_input("Causas por funcionario", min_value=1, max_value=10, value=4)
        incluir_dilatorias = st.checkbox("Excepciones Dilatorias", value=True)
        incluir_nulidad    = st.checkbox("Nulidad de lo Obrado", value=True)
        incluir_acumulacion = st.checkbox("Incidente Acumulación", value=True)
        urgente_rol = st.text_input("ROL urgente (opcional)", placeholder="C-15500-2025")
        urgente_func = st.selectbox("Asignar urgente a", [''] + funcionarios) if urgente_rol else ''

    with col2:
        st.markdown("**Estado actual de pendientes**")
        st.markdown("""
        | Tipo | Pendientes | % Resolución |
        |------|-----------|-------------|
        | 🔵 Excepciones Dilatorias | 54 | 54.6% |
        | 🟡 Nulidad de lo Obrado | 48 | 67.3% |
        | 🔴 Incidente Acumulación | 17 | **0%** |
        | Desistimiento | 9 | 90.3% |
        """)
        if urgente_rol:
            st.markdown(f'<div class="urgente">⚠ URGENTE: {urgente_rol} → {urgente_func}</div>', unsafe_allow_html=True)

    st.caption("La asignación detallada con roles reales requiere subir el archivo de incidentes actualizado.")


def modulo_dashboard():
    st.markdown('<div class="sec-title">📊 Dashboard KPIs Institucionales</div>', unsafe_allow_html=True)

    st.markdown("""
    <div style="background:white;border-radius:12px;padding:1.2rem;box-shadow:0 2px 8px rgba(0,0,0,0.06);margin-bottom:1rem;">
    <p style="margin:0;color:#666;font-size:0.85rem;">Sube los archivos SITCI del período para calcular los KPIs automáticamente.
    El sistema detecta el tipo de archivo y actualiza cada módulo de forma independiente.</p>
    </div>
    """, unsafe_allow_html=True)

    kpis_demo = {
        'Clearance Rate':         ('≥ 100%', '—', '—', False),
        'Plazo Tramitación':      ('≤ 180 d', '—', '—', False),
        'Cumplimiento Plazos':    ('≥ 90%', '—', '—', False),
        'Reducción Inventario':   ('−5% trim.', '—', '—', False),
        'Meta Baja / día':        ('60 res.', '—', '—', False),
        'Meta Ejecutiva / día':   ('45 res.', '—', '—', False),
        'Meta Fondo / día':       ('25 res.', '—', '—', False),
        'Fallos alerta > 3m':     ('0', '—', '—', False),
    }

    cols = st.columns(4)
    for i, (kpi, (meta, val, sem, ok)) in enumerate(kpis_demo.items()):
        with cols[i % 4]:
            st.markdown(f"""
            <div class="kpi-card">
            <div class="kpi-val" style="font-size:1.4rem">{val}</div>
            <div class="kpi-lab">{kpi}</div>
            <div class="kpi-meta">Meta: {meta}</div>
            </div>
            """, unsafe_allow_html=True)

    st.markdown("---")
    st.markdown("### 📁 Historial de archivos procesados")
    if 'historial' in st.session_state and st.session_state.historial:
        hist_df = pd.DataFrame(st.session_state.historial)
        st.dataframe(hist_df, use_container_width=True)
    else:
        st.info("Ningún archivo procesado aún en esta sesión.")


# ─── SIDEBAR ─────────────────────────────────────────────────────────────────
with st.sidebar:
    nombre_usuario = st.session_state.get('nombre', '')
    st.markdown(f"""
    <div style="text-align:center;padding:1rem 0 1rem;">
        <div style="font-size:2.5rem;">⚖️</div>
        <div style="font-weight:700;font-size:1rem;letter-spacing:-0.3px;">2° JCS</div>
        <div style="font-size:0.75rem;opacity:0.8;">Sistema de Gestión · 2026</div>
        <div style="font-size:0.7rem;opacity:0.7;margin-top:0.5rem;background:rgba(255,255,255,0.1);
                    border-radius:6px;padding:4px 8px;">👤 {nombre_usuario}</div>
    </div>
    """, unsafe_allow_html=True)
    if st.button("🚪 Cerrar sesión", use_container_width=True):
        st.session_state['autenticado'] = False
        st.session_state['usuario']     = ''
        st.session_state['nombre']      = ''
        st.rerun()
    modulo = st.radio("Módulo", [
        "🏠  Inicio / Upload",
        "📊  Resoluciones",
        "📨  Escritos",
        "⚖️   Incidentes",
        "📋  Fallos",
        "📌  Asignaciones",
        "📈  Dashboard KPIs",
    ])

    st.markdown("---")
    st.markdown("""
    <div style="font-size:0.72rem;opacity:0.7;padding-top:0.5rem;">
    <b>Juez Titular:</b> Figueroa<br>
    <b>Suplente:</b> Burchard<br>
    <b>Coordinador:</b> P. Salazar<br>
    <b>Inventario:</b> 18.273 causas<br>
    <b>Funcionarios:</b> 20<br>
    <b>Carga:</b> 130%
    </div>
    """, unsafe_allow_html=True)

# ─── HEADER ──────────────────────────────────────────────────────────────────
st.markdown("""
<div class="inst-header">
    <h1>⚖️ 2° Juzgado Civil de Santiago · Sistema de Gestión</h1>
    <p>Coordinación: Pedro Antonio Salazar Núñez &nbsp;·&nbsp; Juez Titular: Figueroa &nbsp;·&nbsp; 2026</p>
</div>
""", unsafe_allow_html=True)

# Inicializar session state
if 'historial' not in st.session_state:
    st.session_state.historial = []
if 'datos' not in st.session_state:
    st.session_state.datos = {}

# ─── MÓDULO PRINCIPAL ─────────────────────────────────────────────────────────
if modulo.startswith("🏠"):
    st.markdown("### Subir archivo SITCI")
    st.markdown("El sistema detecta automáticamente el tipo de archivo y actualiza el módulo correspondiente.")

    uploaded = st.file_uploader(
        "Arrastra aquí el archivo Excel exportado del SITCI",
        type=['xls', 'xlsx'],
        help="Resoluciones, Escritos, Incidentes o Fallos"
    )

    if uploaded:
        with st.spinner("Procesando archivo..."):
            file_bytes = uploaded.read()
            df, tipo = parse_xls(file_bytes, uploaded.name)

        if df is None:
            st.error(f"Error al leer el archivo: {tipo}")
        elif tipo == 'desconocido':
            st.warning("No se pudo detectar el tipo de archivo. Verifica que sea un reporte SITCI.")
            st.dataframe(df.head(5))
        else:
            tipo_label = {
                'resoluciones': '📊 Resoluciones / Productividad',
                'escritos':     '📨 Escritos Ingresados',
                'incidentes':   '⚖️ Incidentes',
                'fallos':       '📋 Fallos',
            }.get(tipo, tipo)

            st.success(f"✅ Archivo detectado: **{tipo_label}**  ·  {len(df):,} registros")
            st.session_state.datos[tipo] = df
            st.session_state.historial.append({
                'Archivo': uploaded.name,
                'Tipo': tipo_label,
                'Registros': len(df),
                'Procesado': datetime.now().strftime('%d/%m/%Y %H:%M'),
            })
            st.info(f"👉 Ve al módulo **{tipo_label}** en el menú lateral para ver el análisis completo.")

    # Estado de datos cargados
    if st.session_state.datos:
        st.markdown("### Datos disponibles en esta sesión")
        for t, d in st.session_state.datos.items():
            st.markdown(f"- **{t.capitalize()}**: {len(d):,} registros")

    # Instrucciones
    with st.expander("ℹ️ Instrucciones de uso"):
        st.markdown("""
        **Flujo de trabajo:**
        1. Exporta el reporte desde el SITCI en formato XLS
        2. Súbelo aquí — el sistema detecta el tipo automáticamente
        3. Ve al módulo correspondiente para ver el análisis
        4. Los KPIs se calculan con las metas institucionales del tribunal

        **Archivos aceptados:**
        - **Resoluciones**: Informe de bloqueos/resoluciones por funcionario
        - **Escritos**: Consulta de escritos ingresados
        - **Incidentes**: Informe de causas con incidentes
        - **Fallos**: Boletín de fallos del mes
        """)

elif modulo.startswith("📊"):
    if 'resoluciones' in st.session_state.datos:
        modulo_resoluciones(st.session_state.datos['resoluciones'])
    else:
        st.info("📁 Sube el archivo de **Resoluciones** en el módulo Inicio para ver el análisis.")
        st.markdown("*Ejemplo: RESOLUCIONES_ENERO_2026.xls*")

elif modulo.startswith("📨"):
    if 'escritos' in st.session_state.datos:
        modulo_escritos(st.session_state.datos['escritos'])
    else:
        st.info("📁 Sube el archivo de **Escritos** en el módulo Inicio para ver el análisis.")
        st.markdown("*Ejemplo: INGRESO_ESCRITO_ENERO.xls*")

elif modulo.startswith("⚖️"):
    if 'incidentes' in st.session_state.datos:
        modulo_incidentes(st.session_state.datos['incidentes'])
    else:
        st.info("📁 Sube el archivo de **Incidentes** en el módulo Inicio para ver el análisis.")
        st.markdown("*Ejemplo: INCIDENTES_AL_28_DE_FEBRERO.xls*")

elif modulo.startswith("📋"):
    if 'fallos' in st.session_state.datos:
        modulo_fallos(st.session_state.datos['fallos'])
    else:
        st.info("📁 Sube el archivo de **Fallos** en el módulo Inicio para ver el análisis.")
        st.markdown("*Ejemplo: FALLOS_ENERO.xls*")

elif modulo.startswith("📌"):
    modulo_asignacion()

elif modulo.startswith("📈"):
    modulo_dashboard()

# ─── FOOTER ──────────────────────────────────────────────────────────────────
st.markdown("---")
st.markdown("""
<div style="text-align:center;font-size:0.72rem;color:#999;padding:0.5rem 0;">
2° Juzgado Civil de Santiago · Sistema de Gestión Administrativa · 2026 · 
Coordinador: Pedro Antonio Salazar Núñez
</div>
""", unsafe_allow_html=True)

# Cerebro Digital de Filosofía

Mapa interactivo que conecta filósofos, escuelas y conceptos mediante relaciones
(influencias, oposiciones, fundaciones, etc.), pensado para explorar cómo se
enlazan las ideas filosóficas de distintas tradiciones y épocas.

Es una aplicación web estática (HTML + CSS + JS puro, sin dependencias ni
backend), completamente independiente del sistema de gestión judicial de este
repositorio.

## Uso

Abre `index.html` en un navegador (doble clic o `python3 -m http.server` en
esta carpeta y visita `http://localhost:8000`).

- **Buscar**: escribe un nombre para resaltarlo en el mapa.
- **Filtros**: oculta nodos por época o por tipo (filósofo / escuela / concepto).
- **Clic en un nodo**: abre el panel de detalle con su descripción y todas sus
  conexiones (clic en una conexión para saltar a ese nodo).
- **Arrastrar un nodo**: lo reubica manualmente.
- **Rueda del ratón**: zoom. **Arrastrar el fondo**: desplaza el mapa.
- **+ Agregar**: agrega nuevos filósofos/conceptos/escuelas y nuevas
  relaciones. Se guardan en `localStorage` del navegador.
- **Exportar / Importar**: descarga o carga el grafo completo (base +
  agregados) como JSON, para respaldar o compartir tus adiciones.
- **Restablecer**: borra únicamente lo que agregaste tú (no afecta los datos
  base en `data.js`).

## Datos base

El contenido inicial (`data.js`, generado a partir de `data.json`) incluye ~70
filósofos, escuelas y conceptos de tradiciones antigua, medieval, moderna,
contemporánea y oriental, con sus relaciones principales. Puedes editar
`data.json` y regenerar `data.js` para ampliar el set base:

```bash
python3 -c "
import json
data = json.load(open('data.json', encoding='utf-8'))
open('data.js', 'w', encoding='utf-8').write('const PHILOSOPHY_DATA = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n')
"
```

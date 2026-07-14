# Cerebro Digital de Filosofía

Este repositorio contiene un único proyecto: `philosophy-brain/`, un grafo
interactivo (HTML/CSS/JS puro, sin dependencias) que conecta filósofos,
escuelas y conceptos mediante relaciones (influyó en, se opuso a, fundó,
etc.). Ver `philosophy-brain/README.md` para el detalle de uso.

## Instrucción permanente: alimentar el cerebro durante las conversaciones

Cada vez que en una conversación se estudie o discuta filosofía (un filósofo,
concepto, escuela, obra, relación entre ideas, etc.) que **no** esté ya en
`philosophy-brain/data.json`, agrégalo:

1. Edita `philosophy-brain/data.json`:
   - Nuevo **nodo**: `{ "id": "slug-en-minusculas", "name": "...", "type": "filosofo" | "escuela" | "concepto", "era": "Antigua" | "Medieval" | "Moderna" | "Contemporánea" | "Oriental", "desc": "1-2 frases en español" }`.
   - Nueva **relación**: `{ "source": "<id>", "target": "<id>", "relation": "influyo" | "opuso" | "fundo" | "desarrollo" | "parte_de" | "critico" | "personalizado", "label": "texto breve mostrado en el mapa (ej. 'influyó en')" }`.
   - No dupliques ids existentes; reutiliza los ids ya presentes al conectar con nodos existentes.
   - Campo opcional **`content`**: texto largo (varios párrafos separados por `\n\n`, en español, sin HTML) que desarrolla en profundidad el pensamiento de ese filósofo/concepto/escuela — no un resumen de una frase, sino una explicación sustantiva (metafísica, ética, lógica, etc., según corresponda). Se muestra en la sección "Pensamiento" del panel de detalle cuando el usuario hace clic en el nodo. No todos los nodos necesitan `content`; agrégalo cuando el usuario pida profundizar en un pensador o cuando el estudio de la conversación dé para más que 1-2 frases.
   - Fuente preferida para `content`: la colección **Copleston, Historia de la Filosofía** (9 tomos en epub) que vive en la carpeta de Google Drive que el usuario comparte para este proyecto. Usa `philosophy-brain/tools/extract_epub_chapter.py libro.epub inicio fin` para extraer el texto plano de los capítulos relevantes, léelo, y redacta el contenido **con tus propias palabras** (no copies párrafos textuales del libro).
2. Regenera `philosophy-brain/data.js` a partir de `data.json`:
   ```bash
   cd philosophy-brain
   python3 -c "
   import json
   data = json.load(open('data.json', encoding='utf-8'))
   open('data.js', 'w', encoding='utf-8').write('const PHILOSOPHY_DATA = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n')
   "
   ```
3. Haz commit de ambos archivos (`data.json` y `data.js` juntos) con un mensaje breve indicando qué se agregó (ej. "agrega a Spinoza y su relación con el racionalismo").

No hace falta preguntar antes de hacer esto — es el comportamiento esperado
por defecto en este repo. Sí conviene confirmar con el usuario antes de
push si la conversación no dejó claro que el cambio deba subirse de
inmediato.

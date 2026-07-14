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

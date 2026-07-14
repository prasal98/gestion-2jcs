#!/usr/bin/env python3
"""Extrae texto plano de un capítulo (o rango) de un epub de la colección
Copleston, para poder leerlo y redactar contenido para el cerebro.

Uso:
    python3 extract_epub_chapter.py libro.epub 27 34 > salida.txt

Descomprime el epub en un directorio temporal, limpia las etiquetas HTML de
cada OEBPS/Text/CapituloN.xhtml en el rango [inicio, fin] y las imprime.
"""
import sys
import re
import html
import zipfile
import tempfile
import pathlib


def extract(epub_path: str, start: int, end: int) -> str:
    with tempfile.TemporaryDirectory() as tmp:
        with zipfile.ZipFile(epub_path) as z:
            z.extractall(tmp)
        out = []
        for n in range(start, end + 1):
            path = pathlib.Path(tmp, "OEBPS", "Text", f"Capitulo{n}.xhtml")
            if not path.exists():
                continue
            raw = path.read_text(encoding="utf-8")
            raw = re.sub(r"<(script|style)[^>]*>.*?</\1>", "", raw, flags=re.S)
            text = re.sub(r"<[^>]+>", "\n", raw)
            text = html.unescape(text)
            text = re.sub(r"[ \t]+", " ", text)
            text = re.sub(r"\n\s*\n+", "\n\n", text).strip()
            out.append(f"===== Capítulo {n} =====\n{text}")
        return "\n\n".join(out)


if __name__ == "__main__":
    if len(sys.argv) not in (3, 4):
        print("Uso: extract_epub_chapter.py libro.epub inicio [fin]", file=sys.stderr)
        sys.exit(1)
    epub_path = sys.argv[1]
    start = int(sys.argv[2])
    end = int(sys.argv[3]) if len(sys.argv) == 4 else start
    print(extract(epub_path, start, end))

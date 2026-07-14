(function () {
  "use strict";

  const TYPE_COLORS = { filosofo: "#7dd3fc", escuela: "#c084fc", concepto: "#fbbf24" };
  const TYPE_LABELS = { filosofo: "Filósofo", escuela: "Escuela / corriente", concepto: "Concepto" };
  const REL_COLORS = {
    opuso: "rgba(248,113,113,0.55)",
    critico: "rgba(248,113,113,0.55)",
    fundo: "rgba(192,132,252,0.5)",
    parte_de: "rgba(192,132,252,0.5)",
    desarrollo: "rgba(251,191,36,0.5)",
  };
  const ERAS = ["Antigua", "Medieval", "Moderna", "Contemporánea", "Oriental"];
  const CUSTOM_KEY = "philosophy-brain-custom";

  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");

  // ── datos ──────────────────────────────────────────────────────────────
  function loadCustom() {
    try {
      const raw = JSON.parse(localStorage.getItem(CUSTOM_KEY));
      return raw && raw.nodes && raw.edges ? raw : { nodes: [], edges: [] };
    } catch (e) {
      return { nodes: [], edges: [] };
    }
  }
  function saveCustom() { localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom)); }

  let custom = loadCustom();
  let nodes = [];
  let edges = [];
  let nodeById = {};

  function slugify(name) {
    return normalize(name).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || ("n" + Date.now());
  }
  function normalize(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function rebuild() {
    const baseNodes = PHILOSOPHY_DATA.nodes;
    const baseEdges = PHILOSOPHY_DATA.edges;
    const prevPos = {};
    nodes.forEach((n) => (prevPos[n.id] = { x: n.x, y: n.y }));

    nodes = [...baseNodes, ...custom.nodes].map((n, i) => {
      const p = prevPos[n.id];
      const angle = (i / (baseNodes.length + custom.nodes.length)) * Math.PI * 2;
      return {
        ...n,
        x: p ? p.x : Math.cos(angle) * 320 + (Math.random() - 0.5) * 40,
        y: p ? p.y : Math.sin(angle) * 320 + (Math.random() - 0.5) * 40,
        vx: 0,
        vy: 0,
      };
    });
    nodeById = {};
    nodes.forEach((n) => (nodeById[n.id] = n));

    edges = [...baseEdges, ...custom.edges].filter((e) => nodeById[e.source] && nodeById[e.target]);

    nodes.forEach((n) => (n.degree = 0));
    edges.forEach((e) => {
      nodeById[e.source].degree++;
      nodeById[e.target].degree++;
    });

    updateStats();
    refreshEdgeFormOptions();
  }

  // ── cámara / vista ────────────────────────────────────────────────────
  let camX = 0, camY = 0, zoom = 1;
  let width = 0, height = 0;

  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);

  function worldToScreen(x, y) {
    return { x: (x - camX) * zoom + width / 2, y: (y - camY) * zoom + height / 2 };
  }
  function screenToWorld(x, y) {
    return { x: (x - width / 2) / zoom + camX, y: (y - height / 2) / zoom + camY };
  }

  // ── filtros / búsqueda ────────────────────────────────────────────────
  let activeEras = new Set(ERAS);
  let activeTypes = new Set(Object.keys(TYPE_LABELS));
  let searchTerm = "";

  function isVisible(n) {
    return activeEras.has(n.era) && activeTypes.has(n.type);
  }
  function matchesSearch(n) {
    return !searchTerm || normalize(n.name).includes(normalize(searchTerm));
  }

  // ── simulación de fuerzas ─────────────────────────────────────────────
  let dragNode = null;
  let panning = false;
  let panStart = null, camStartAt = null;
  let selected = null;
  let hovered = null;

  function step() {
    const vis = nodes.filter(isVisible);
    const REPEL = 9000;
    for (let i = 0; i < vis.length; i++) {
      const a = vis[i];
      let fx = 0, fy = 0;
      for (let j = 0; j < vis.length; j++) {
        if (i === j) continue;
        const b = vis[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const distSq = dx * dx + dy * dy + 0.01;
        const force = REPEL / distSq;
        const dist = Math.sqrt(distSq);
        fx += (dx / dist) * force;
        fy += (dy / dist) * force;
      }
      fx += -a.x * 0.0015;
      fy += -a.y * 0.0015;
      a._fx = fx;
      a._fy = fy;
    }
    edges.forEach((e) => {
      const a = nodeById[e.source], b = nodeById[e.target];
      if (!isVisible(a) || !isVisible(b)) return;
      const dx = b.x - a.x, dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
      const targetLen = 170;
      const force = (dist - targetLen) * 0.02;
      const fx = (dx / dist) * force, fy = (dy / dist) * force;
      a._fx += fx; a._fy += fy;
      b._fx -= fx; b._fy -= fy;
    });
    vis.forEach((n) => {
      if (n === dragNode) return;
      n.vx = (n.vx + n._fx * 0.02) * 0.82;
      n.vy = (n.vy + n._fy * 0.02) * 0.82;
      n.x += n.vx;
      n.y += n.vy;
    });
  }

  // ── render ────────────────────────────────────────────────────────────
  function nodeRadius(n) {
    return 9 + Math.min(n.degree, 10) * 1.3;
  }

  function relatedIds(n) {
    const s = new Set([n.id]);
    edges.forEach((e) => {
      if (e.source === n.id) s.add(e.target);
      if (e.target === n.id) s.add(e.source);
    });
    return s;
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const isDark = !window.matchMedia("(prefers-color-scheme: light)").matches;
    const edgeColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
    const edgeColorDim = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
    const labelColor = isDark ? "#e7e9ee" : "#1b1e27";

    const focusSet = selected ? relatedIds(selected) : null;
    const hasSearch = !!searchTerm;

    edges.forEach((e) => {
      const a = nodeById[e.source], b = nodeById[e.target];
      if (!isVisible(a) || !isVisible(b)) return;
      const dim = focusSet && !(focusSet.has(a.id) && focusSet.has(b.id));
      const pa = worldToScreen(a.x, a.y), pb = worldToScreen(b.x, b.y);
      ctx.strokeStyle = dim ? edgeColorDim : (REL_COLORS[e.relation] || edgeColor);
      ctx.lineWidth = dim ? 1 : 1.4;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
      if (!dim && zoom > 0.75) {
        const mx = (pa.x + pb.x) / 2, my = (pa.y + pb.y) / 2;
        ctx.fillStyle = isDark ? "rgba(231,233,238,0.55)" : "rgba(27,30,39,0.55)";
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(e.label, mx, my);
      }
    });

    nodes.forEach((n) => {
      if (!isVisible(n)) return;
      const p = worldToScreen(n.x, n.y);
      const r = nodeRadius(n) * Math.min(zoom, 1.4);
      const dimByFocus = focusSet && !focusSet.has(n.id);
      const dimBySearch = hasSearch && !matchesSearch(n);
      const dim = dimByFocus || dimBySearch;

      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = TYPE_COLORS[n.type] || "#999";
      ctx.globalAlpha = dim ? 0.15 : 1;
      ctx.fill();
      if (selected === n || hovered === n) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = labelColor;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      if (!dim && (zoom > 0.5 || selected === n)) {
        ctx.fillStyle = labelColor;
        ctx.font = selected === n ? "bold 12px sans-serif" : "11px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(n.name, p.x, p.y + r + 12);
      }
    });

    const visibleCount = nodes.filter(isVisible).length;
    document.getElementById("empty-hint").hidden = visibleCount > 0;
  }

  function tick() {
    step();
    if (camTarget) {
      camX += (camTarget.x - camX) * 0.12;
      camY += (camTarget.y - camY) * 0.12;
      if (Math.abs(camTarget.x - camX) + Math.abs(camTarget.y - camY) < 1) camTarget = null;
    }
    draw();
    requestAnimationFrame(tick);
  }

  // ── picking ──────────────────────────────────────────────────────────
  function nodeAt(sx, sy) {
    const w = screenToWorld(sx, sy);
    let found = null, bestDist = Infinity;
    for (const n of nodes) {
      if (!isVisible(n)) continue;
      const r = nodeRadius(n) + 4;
      const dx = n.x - w.x, dy = n.y - w.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < r && d < bestDist) { found = n; bestDist = d; }
    }
    return found;
  }

  // ── interacción de ratón ─────────────────────────────────────────────
  canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left, sy = e.clientY - rect.top;
    const n = nodeAt(sx, sy);
    if (n) {
      dragNode = n;
      canvas.classList.add("dragging-node");
    } else {
      panning = true;
      camTarget = null;
      panStart = { x: e.clientX, y: e.clientY };
      camStartAt = { x: camX, y: camY };
    }
  });
  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left, sy = e.clientY - rect.top;
    if (dragNode) {
      const w = screenToWorld(sx, sy);
      dragNode.x = w.x; dragNode.y = w.y;
      dragNode.vx = 0; dragNode.vy = 0;
    } else if (panning) {
      camX = camStartAt.x - (e.clientX - panStart.x) / zoom;
      camY = camStartAt.y - (e.clientY - panStart.y) / zoom;
    } else {
      hovered = nodeAt(sx, sy);
      canvas.style.cursor = hovered ? "pointer" : "grab";
    }
  });
  window.addEventListener("mouseup", (e) => {
    if (dragNode) {
      const rect = canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left, sy = e.clientY - rect.top;
      if (Math.abs(e.movementX) + Math.abs(e.movementY) < 2) {
        selectNode(dragNode);
      }
    }
    dragNode = null;
    panning = false;
    canvas.classList.remove("dragging-node");
  });
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left, sy = e.clientY - rect.top;
    const n = nodeAt(sx, sy);
    if (n) selectNode(n);
    else closeDetail();
  });
  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left, sy = e.clientY - rect.top;
    const before = screenToWorld(sx, sy);
    zoom *= e.deltaY < 0 ? 1.1 : 0.9;
    zoom = Math.max(0.25, Math.min(2.5, zoom));
    const after = screenToWorld(sx, sy);
    camX += before.x - after.x;
    camY += before.y - after.y;
  }, { passive: false });

  // ── panel de detalle ──────────────────────────────────────────────────
  const detailEl = document.getElementById("detail");
  let camTarget = null;
  function centerOn(n) {
    camTarget = { x: n.x, y: n.y };
    if (zoom < 0.8) zoom = 1;
  }
  function selectNode(n) {
    selected = n;
    document.getElementById("detail-type").textContent = TYPE_LABELS[n.type] || n.type;
    document.getElementById("detail-name").textContent = n.name;
    document.getElementById("detail-era").textContent = n.era;
    document.getElementById("detail-desc").textContent = n.desc || "";
    const ul = document.getElementById("detail-links");
    ul.innerHTML = "";
    edges.forEach((e) => {
      let otherId = null, rel = null, dir = null;
      if (e.source === n.id) { otherId = e.target; rel = e.label; dir = "→"; }
      else if (e.target === n.id) { otherId = e.source; rel = e.label; dir = "←"; }
      if (!otherId) return;
      const other = nodeById[otherId];
      if (!other) return;
      const li = document.createElement("li");
      li.innerHTML = `<span class="rel">${dir} ${rel}</span>${other.name}`;
      li.addEventListener("click", () => { selectNode(other); centerOn(other); });
      ul.appendChild(li);
    });
    detailEl.hidden = false;
  }
  function closeDetail() {
    selected = null;
    detailEl.hidden = true;
  }
  document.getElementById("detail-close").addEventListener("click", closeDetail);

  // ── filtros ──────────────────────────────────────────────────────────
  function buildFilterUI() {
    const eraBox = document.getElementById("filter-era");
    eraBox.innerHTML = "";
    ERAS.forEach((era) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" checked data-era="${era}"> ${era}`;
      label.querySelector("input").addEventListener("change", (e) => {
        if (e.target.checked) activeEras.add(era);
        else activeEras.delete(era);
      });
      eraBox.appendChild(label);
    });
    const typeBox = document.getElementById("filter-type");
    typeBox.innerHTML = "";
    Object.entries(TYPE_LABELS).forEach(([type, label]) => {
      const el = document.createElement("label");
      el.innerHTML = `<input type="checkbox" checked data-type="${type}"> ${label}`;
      el.querySelector("input").addEventListener("change", (e) => {
        if (e.target.checked) activeTypes.add(type);
        else activeTypes.delete(type);
      });
      typeBox.appendChild(el);
    });
  }

  document.getElementById("search").addEventListener("input", (e) => {
    searchTerm = e.target.value;
  });

  document.getElementById("btn-random").addEventListener("click", () => {
    const vis = nodes.filter(isVisible);
    if (!vis.length) return;
    const n = vis[Math.floor(Math.random() * vis.length)];
    selectNode(n);
    centerOn(n);
  });

  function updateStats() {
    document.getElementById("stats").textContent =
      `${nodes.length} nodos · ${edges.length} relaciones`;
  }

  // ── modal agregar ────────────────────────────────────────────────────
  const modal = document.getElementById("modal-backdrop");
  document.getElementById("btn-add").addEventListener("click", () => (modal.hidden = false));
  document.getElementById("modal-close").addEventListener("click", () => (modal.hidden = true));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.hidden = true; });

  function refreshEdgeFormOptions() {
    const srcSel = document.getElementById("f-source");
    const tgtSel = document.getElementById("f-target");
    const options = nodes
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name, "es"))
      .map((n) => `<option value="${n.id}">${n.name}</option>`)
      .join("");
    srcSel.innerHTML = options;
    tgtSel.innerHTML = options;
  }

  document.getElementById("form-node").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("f-name").value.trim();
    if (!name) return;
    const type = document.getElementById("f-type").value;
    const era = document.getElementById("f-era").value;
    const desc = document.getElementById("f-desc").value.trim();
    let id = slugify(name);
    while (nodeById[id]) id = id + "-2";
    custom.nodes.push({ id, name, type, era, desc });
    saveCustom();
    rebuild();
    e.target.reset();
  });

  document.getElementById("form-edge").addEventListener("submit", (e) => {
    e.preventDefault();
    const source = document.getElementById("f-source").value;
    const target = document.getElementById("f-target").value;
    const label = document.getElementById("f-label").value.trim();
    if (!source || !target || !label || source === target) return;
    custom.edges.push({ source, target, relation: "personalizado", label });
    saveCustom();
    rebuild();
    e.target.reset();
  });

  // ── exportar / importar / reset ─────────────────────────────────────
  document.getElementById("btn-export").addEventListener("click", () => {
    const merged = {
      nodes: [...PHILOSOPHY_DATA.nodes, ...custom.nodes],
      edges: [...PHILOSOPHY_DATA.edges, ...custom.edges],
    };
    const blob = new Blob([JSON.stringify(merged, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "cerebro-filosofia.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById("btn-import").addEventListener("click", () => {
    document.getElementById("file-import").click();
  });
  document.getElementById("file-import").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const baseIds = new Set(PHILOSOPHY_DATA.nodes.map((n) => n.id));
        const newNodes = (data.nodes || []).filter((n) => !baseIds.has(n.id));
        const newEdges = data.edges || [];
        custom.nodes = newNodes;
        custom.edges = newEdges;
        saveCustom();
        rebuild();
      } catch (err) {
        alert("Archivo JSON inválido.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  });

  document.getElementById("btn-reset").addEventListener("click", () => {
    if (!confirm("¿Borrar todos los nodos y relaciones agregados por ti?")) return;
    custom = { nodes: [], edges: [] };
    saveCustom();
    rebuild();
  });

  // ── init ──────────────────────────────────────────────────────────────
  buildFilterUI();
  rebuild();
  resize();
  requestAnimationFrame(tick);
})();

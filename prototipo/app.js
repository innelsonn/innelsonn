/* SGD-LEGAL Unicórdoba — prototipo navegable (SPA sin dependencias, enrutado por hash) */
'use strict';

/* ---------- utilidades ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const HOY = '2026-11-23';
const fmt = d => { if (!d) return '—'; const [y, m, dd] = d.slice(0, 10).split('-'); return `${+dd} ${['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][m - 1]} ${y}`; };
const P = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', check: '<path d="M20 6 9 17l-5-5"/>', edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  half: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18" /><path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
  pause: '<rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/>', ban: '<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>', alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/>', down: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>', bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5Z"/><path d="M4 19.5V21h16"/>', layers: '<path d="m12 2 10 5-10 5L2 7Z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1Z"/>', hash: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>', shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>', users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  log: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>', out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>', arrow: '<path d="M5 12h14M13 5l7 7-7 7"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>', compare: '<path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3M12 2v20"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>', send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>', undo: '<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/>', up: '<path d="m18 15-6-6-6 6"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>', home: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>', sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
};
const I = (n, extra = '') => `<svg class="i" ${extra} viewBox="0 0 24 24" aria-hidden="true">${P[n] || ''}</svg>`;
const estado = (k, big) => { const e = ESTADOS[k]; return `<span class="st ${e.cls}${big ? ' big' : ''}" title="${esc(e.desc)}">${I(e.icon)}${e.label}</span>`; };
const organo = id => ORGANOS.find(o => o.id === id)?.nombre || id;
const tipo = id => TIPOS.find(t => t.id === id)?.nombre || id;
const norma = id => NORMAS.find(n => n.id === id);
const titulo = n => `${tipo(n.tipo)} ${n.numero} de ${n.anio}`;
const linkNorma = id => norma(id) ? `<a href="#/norma/${id}">${esc(titulo(norma(id)))}</a>` : esc(id);
function toast(msg, ic = 'check') { $$('.toast').forEach(x => x.remove()); const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.innerHTML = I(ic) + esc(msg); document.body.appendChild(t); setTimeout(() => t.remove(), 3200); }
function modal(html, onMount) {
  const bg = document.createElement('div'); bg.className = 'modal-bg';
  bg.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${html}</div>`;
  const close = () => bg.remove();
  bg.addEventListener('click', e => { if (e.target === bg || e.target.closest('[data-close]')) close(); });
  document.addEventListener('keydown', function k(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', k); } });
  document.body.appendChild(bg); ($('input,textarea,button', bg) || bg).focus(); onMount && onMount(bg, close); return close;
}
function hashStr(s) { let h1 = 0xdeadbeef, h2 = 0x41c6ce57; for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); } h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909); h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909); return ((h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0')); }
function download(name, content, type = 'text/html') { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([content], { type })); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); }

/* ---------- estado de la demo ---------- */
const S = {
  user: null, subs: new Set(), bandeja: BANDEJA.map(b => ({ ...b })), audit: AUDITORIA.map(a => [...a]),
  reservados: ['CSU-ACU-2026-042'], wiz: null, catalogos: { 'Órganos emisores': ORGANOS.map(o => o.nombre), 'Tipos de acto': TIPOS.map(t => t.nombre), 'Temas': [...TEMAS], 'Tipos de afectación': [...TIPOS_AFECT], 'Plazos del flujo (días hábiles)': ['Estructuración: 4', 'Validación: 5', 'Escalamiento jurídico: 5', 'Devolución: 2'] },
};
const ROLES = {
  'Registrador': { nombre: 'Laura Díaz', login: 'ldiaz', menu: ['bandeja', 'reservar', 'registrar', 'auditoria'] },
  'Validador': { nombre: 'Mario Pérez', login: 'mperez', menu: ['bandeja', 'validar', 'auditoria'] },
  'Validador jurídico': { nombre: 'Andrea Ruiz', login: 'aruiz', menu: ['bandeja', 'validar'] },
  'Administrador': { nombre: 'Carlos Gómez', login: 'admin', menu: ['bandeja', 'admin', 'auditoria'] },
  'Auditor': { nombre: 'Sofía Martínez', login: 'smartinez', menu: ['auditoria'] },
};
function audit(accion, objeto, antes, despues) { const d = new Date(); const ts = `${HOY} ${d.toTimeString().slice(0, 8)}`; S.audit.unshift([ts, S.user?.login || 'sistema', S.user?.rol || 'Sistema', accion, objeto, antes, despues]); }

/* ---------- versiones y texto ---------- */
function verAt(u, fecha) { return (u.versiones || []).find(v => v.desde <= fecha && (!v.hasta || fecha < v.hasta)); }
function unidadesDe(n) {
  if (n.unidades) return n.unidades;
  const base = n.fecha;
  return [{ id: 'g1', tipo: 'titulo', rotulo: 'CAPÍTULO ÚNICO', titulo: n.epigrafe.replace(/^Por (el|la) cual se /, '').replace(/^./, c => c.toUpperCase()), hijos: [
    { id: 'g-a1', tipo: 'articulo', rotulo: 'Artículo 1.', titulo: 'Objeto', versiones: [{ desde: base, texto: `El presente acto tiene por objeto ${n.epigrafe.replace(/^Por (el|la) cual se /, '').toLowerCase()}, en el marco de la autonomía universitaria.` }] },
    { id: 'g-a2', tipo: 'articulo', rotulo: 'Artículo 2.', titulo: 'Ámbito de aplicación', versiones: [{ desde: base, texto: 'Las disposiciones del presente acto se aplican a los estamentos y dependencias de la Universidad de Córdoba a los que se refiere su objeto.' }] },
    { id: 'g-a3', tipo: 'articulo', rotulo: 'Artículo 3.', titulo: 'Vigencia', versiones: [{ desde: base, texto: 'El presente acto rige a partir de la fecha de su expedición y deroga las disposiciones que le sean contrarias.' }] },
  ] }];
}
function flatUnits(list, out = [], lvl = 0) { list.forEach(u => { out.push({ ...u, lvl }); if (u.hijos) flatUnits(u.hijos, out, lvl + 1); }); return out; }
function diffWords(a, b) {
  const A = a.split(/(\s+)/), B = b.split(/(\s+)/), m = A.length, n = B.length;
  const L = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  let i = 0, j = 0, out = '';
  while (i < m && j < n) { if (A[i] === B[j]) { out += esc(A[i]); i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) { out += `<del>${esc(A[i++])}</del>`; } else { out += `<ins>${esc(B[j++])}</ins>`; } }
  while (i < m) out += `<del>${esc(A[i++])}</del>`; while (j < n) out += `<ins>${esc(B[j++])}</ins>`;
  return out.replace(/<\/del><del>/g, '').replace(/<\/ins><ins>/g, '');
}
function notaHTML(nt) {
  if (!nt) return '';
  const cls = nt.tipo === 'deroga' ? 'deroga' : nt.transicion ? 'trans' : '';
  return `<div class="nota ${cls}">${I(nt.tipo === 'deroga' ? 'x' : nt.transicion ? 'clock' : 'info')}<span><b>Nota de vigencia:</b> ${({ deroga: 'Derogado', modifica: 'Modificado', adiciona: 'Adicionado', sustituye: 'Sustituido', suspende: 'Suspendido', anula: 'Anulado', 'establece régimen de transición': 'Régimen de transición establecido' })[nt.tipo] || nt.tipo} por ${/s y/.test(nt.art) ? 'los' : 'el'} ${nt.art} del ${linkNorma(nt.acto)}.${nt.transicion ? ' ' + esc(nt.transicion) : ''}</span></div>`;
}
function renderTexto(n, fecha, cohorte) {
  let html = '';
  const walk = (list) => list.forEach(u => {
    if (u.tipo === 'titulo') { html += `<div class="unit-titulo" id="u-${u.id}">${esc(u.rotulo)}<span>${esc(u.titulo)}</span></div>`; walk(u.hijos || []); return; }
    let v = verAt(u, fecha);
    if (cohorte && v?.nota?.transicion && cohorte < v.desde) { const prev = u.versiones[u.versiones.indexOf(v) - 1]; if (prev) v = { ...prev, notaCohorte: `Según el régimen de transición del ${titulo(norma(v.nota.acto))}, a un estudiante que ingresó el ${fmt(cohorte)} le aplica esta versión.` }; }
    if (!v) return;
    html += `<div class="unit ${u.tipo === 'paragrafo' ? 'par' : ''} ${v.derogada ? 'derog' : ''}" id="u-${u.id}">
      <span class="rot">${esc(u.rotulo)}</span> ${u.titulo ? `<i>${esc(u.titulo)}.</i>` : ''} <span class="txt">${esc(v.texto)}</span>
      ${notaHTML(v.nota)}${v.notaCohorte ? `<div class="nota trans">${I('user')}<span>${esc(v.notaCohorte)}</span></div>` : ''}</div>`;
    if (u.hijos) walk(u.hijos);
  });
  walk(unidadesDe(n));
  return html;
}

/* ---------- layout ---------- */
function shellPublic(content, active) {
  const nav = [['#/', 'Inicio', 'home'], ['#/buscar', 'Buscar normas', 'search'], ['#/compilacion', 'Compilaciones', 'layers'], ['#/glosario', 'Glosario', 'book'], ['#/api', 'Datos abiertos', 'code']];
  return `<div class="govbar"><span>GOV.CO</span><span>Portal de normatividad · Universidad de Córdoba</span></div>
  <header class="header"><div class="in">
    <a class="brand" href="#/"><span class="logo" aria-hidden="true">UC</span><span><b>SGD-LEGAL</b><small>Normatividad interna · Universidad de Córdoba</small></span></a>
    <button class="menu-btn" aria-label="Abrir menú" onclick="this.nextElementSibling.classList.toggle('open')">${I('menu')}</button>
    <nav class="nav" aria-label="Principal">${nav.map(([h, t, ic]) => `<a href="${h}" class="${active === h ? 'on' : ''}">${t}</a>`).join('')}
      <a class="cta" href="${S.user ? '#/consola' : '#/login'}">${I('shield')} ${S.user ? 'Consola' : 'Ingreso funcionarios'}</a></nav>
  </div></header>
  <main id="app" tabindex="-1">${content}</main>
  <footer class="footer"><div class="in">
    <div><b>Universidad de Córdoba</b><br>Secretaría General · Gestión Legal<br>Carrera 6 No. 77-305, Montería, Córdoba</div>
    <div><b>Aviso legal</b><br>Los textos consolidados tienen carácter informativo. La fe pública reside exclusivamente en el original firmado (RB-01).</div>
    <div><b>Transparencia</b><br>Ley 1712 de 2014 · Res. MinTIC 1519 de 2020<br><a href="#/api">API de datos abiertos</a> · WCAG 2.1 AA</div>
  </div></footer>`;
}
function shellConsole(content, active) {
  const u = S.user, items = {
    bandeja: ['#/consola', 'Bandeja de trabajo', 'inbox'], reservar: ['#/consola/reservar', 'Reservar número', 'hash'], registrar: ['#/consola/registrar', 'Registrar acto', 'plus'],
    validar: ['#/consola/validar/CSU-ACU-2026-041', 'Validar consolidación', 'compare'], admin: ['#/consola/admin', 'Usuarios y catálogos', 'users'], auditoria: ['#/consola/auditoria', 'Pista de auditoría', 'log'],
  };
  return `<header class="header"><div class="in">
    <a class="brand" href="#/consola"><span class="logo" aria-hidden="true">UC</span><span><b>SGD-LEGAL · Consola</b><small>Gestión y consolidación normativa</small></span></a>
    <nav class="nav" style="display:flex"><a href="#/">${I('home')} Portal público</a><a href="#/logout">${I('out')} Salir</a></nav></div></header>
  <div class="console"><aside class="side" aria-label="Consola">
    <div class="user"><span class="avatar">${u.nombre.split(' ').map(x => x[0]).join('')}</span><div><b style="color:#fff">${esc(u.nombre)}</b><br><small>${esc(u.rol)}</small></div></div>
    <div class="sec">Trabajo</div>
    ${ROLES[u.rol].menu.map(k => `<a href="${items[k][0]}" class="${active === k ? 'on' : ''}">${I(items[k][2])} ${items[k][1]}</a>`).join('')}
    <div class="sec">Cambiar rol (demo)</div>
    ${Object.keys(ROLES).filter(r => r !== u.rol).map(r => `<a href="#/login/${encodeURIComponent(r)}">${I('user')} ${r}</a>`).join('')}
  </aside><main id="app" tabindex="-1">${content}</main></div>`;
}

/* ---------- vistas públicas ---------- */
function vHome() {
  const recientes = [...NORMAS].sort((a, b) => b.publicado.localeCompare(a.publicado)).slice(0, 4);
  const troncales = NORMAS.filter(n => n.troncal);
  return shellPublic(`
  <section class="hero">
    <span class="tag" style="color:#f3dc8a">Portal de normatividad interna</span>
    <h1>Encuentre la norma vigente de la Universidad, con su texto actualizado y su historia</h1>
    <p>Acuerdos, resoluciones y circulares de carácter general de todos los órganos emisores, con su estado de vigencia, notas por artículo y enlace al original firmado.</p>
    <form class="search" role="search" onsubmit="event.preventDefault();location.hash='#/buscar?q='+encodeURIComponent(this.q.value)">
      <label class="sr" for="q">Buscar normas</label>
      <input id="q" name="q" placeholder="Ej.: reingreso, escala de calificaciones, Acuerdo 004 de 2004…" autocomplete="off">
      <button class="btn">${I('search')} Buscar</button>
    </form>
    <div class="quick">${['matrícula', 'calendario académico', 'bajo rendimiento', 'datos personales', 'derechos pecuniarios'].map(q => `<a href="#/buscar?q=${encodeURIComponent(q)}">${q}</a>`).join('')}</div>
  </section>
  <div class="grid g4" style="margin-top:20px">
    ${[[NORMAS.length, 'normas de carácter general'], [NORMAS.filter(n => ['vigente', 'vigente-mod', 'parcial'].includes(n.estado)).length, 'normas vigentes total o parcialmente'], ['2,1 días', 'mediana entre expedición y publicación (antes: 16,5)'], [ORGANOS.length, 'órganos emisores, incluidos Consejos de Facultad']].map(([b, t]) => `<div class="card stat"><b>${b}</b><span class="muted">${t}</span></div>`).join('')}
  </div>
  <div class="grid g2" style="margin-top:8px">
    <section><h2>${I('book')} Normas troncales</h2>
      ${troncales.map(n => `<a class="result" href="#/norma/${n.id}"><div class="row between"><span class="tag">${organo(n.organo)}</span>${estado(n.estado)}</div><h3>${titulo(n)}</h3><div class="muted">${esc(n.epigrafe)}</div></a>`).join('')}
    </section>
    <section><h2>${I('clock')} Publicadas recientemente</h2>
      ${recientes.map(n => `<a class="result" href="#/norma/${n.id}"><div class="row between"><span class="chip">${I('calendar')} Publicada ${fmt(n.publicado)}</span>${estado(n.estado)}</div><h3>${titulo(n)}</h3><div class="muted">${esc(n.epigrafe)}</div></a>`).join('')}
      <div class="card" style="margin-top:14px"><h3 style="margin-top:0">${I('info')} ¿Qué significa cada estado?</h3><div class="row">${Object.keys(ESTADOS).map(k => estado(k)).join('')}</div>
      <p class="muted" style="margin-bottom:0">Consulte el <a href="#/glosario">glosario</a> para conocer cada tipo de norma y estado.</p></div>
    </section>
  </div>`, '#/');
}

function vBuscar(params) {
  const q = (params.get('q') || '').trim();
  const sel = k => params.getAll(k);
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const textoDe = n => flatUnits(unidadesDe(n)).map(u => (u.titulo || '') + ' ' + (u.versiones || []).map(v => v.texto).join(' ')).join(' ');
  let res = NORMAS.map(n => {
    if (!q) return { n, score: 1 };
    const terms = norm(q).split(/\s+/).filter(Boolean); const hay = norm(`${titulo(n)} ${n.id} ${n.epigrafe} ${n.temas.join(' ')}`); const body = norm(textoDe(n));
    let score = 0; terms.forEach(t => { if (hay.includes(t)) score += 3; if (body.includes(t)) score += 1; }); return { n, score };
  }).filter(r => r.score > 0);
  const facetas = { tipo: ['Tipo', n => n.tipo, tipo], organo: ['Órgano emisor', n => n.organo, organo], tema: ['Tema', n => n.temas, x => x], anio: ['Año', n => String(n.anio), x => x], estado: ['Estado de vigencia', n => n.estado, x => ESTADOS[x].label] };
  const pasa = (n, skip) => Object.entries(facetas).every(([k, [, get]]) => k === skip || !sel(k).length || [].concat(get(n)).some(v => sel(k).includes(v)));
  const filtrados = res.filter(r => pasa(r.n)).sort((a, b) => b.score - a.score || b.n.anio - a.n.anio);
  const hl = s => { if (!q) return esc(s); let out = esc(s); norm(q).split(/\s+/).filter(t => t.length > 2).forEach(t => { out = out.replace(new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark>$1</mark>'); }); return out; };
  const facetHTML = Object.entries(facetas).map(([k, [lab, get, show]]) => {
    const counts = {}; res.filter(r => pasa(r.n, k)).forEach(r => [].concat(get(r.n)).forEach(v => counts[v] = (counts[v] || 0) + 1));
    const keys = Object.keys(counts).sort((a, b) => k === 'anio' ? b - a : 0); if (!keys.length) return '';
    return `<fieldset><legend>${lab}</legend>${keys.map(v => `<label><input type="checkbox" data-f="${k}" value="${esc(v)}" ${sel(k).includes(v) ? 'checked' : ''}> ${k === 'estado' ? estado(v) : esc(show(v))}<span class="count">${counts[v]}</span></label>`).join('')}</fieldset>`;
  }).join('');
  return shellPublic(`
  <h1>Buscar normas</h1>
  <form class="search" role="search" id="fsearch" style="max-width:none;box-shadow:var(--sombra);border:1px solid var(--borde)">
    <label class="sr" for="q2">Buscar</label><input id="q2" name="q" value="${esc(q)}" placeholder="Texto completo, número o epígrafe">
    <button class="btn">${I('search')} Buscar</button></form>
  <p class="muted" style="margin:8px 0 18px">Consulta pública, sin necesidad de autenticarse (RF-21). Se buscan coincidencias en el epígrafe, los temas y el texto de cada artículo.</p>
  <div class="layout-search">
    <aside class="card facets" aria-label="Filtros">${facetHTML || '<span class="muted">Sin filtros disponibles</span>'}
      ${[...params.keys()].some(k => k !== 'q') ? `<a class="btn sm sec" href="#/buscar?q=${encodeURIComponent(q)}">Limpiar filtros</a>` : ''}</aside>
    <section aria-live="polite">
      <div class="row between" style="margin-bottom:10px"><b>${filtrados.length} resultado${filtrados.length === 1 ? '' : 's'}${q ? ` para «${esc(q)}»` : ''}</b><span class="muted">Ordenados por pertinencia</span></div>
      ${filtrados.map(({ n }) => `<a class="result" href="#/norma/${n.id}"><div class="row between"><span class="tag">${organo(n.organo)} · ${fmt(n.fecha)}</span>${estado(n.estado)}</div>
        <h3>${hl(titulo(n))}</h3><div>${hl(n.epigrafe)}</div><div class="row" style="margin-top:8px">${n.temas.map(t => `<span class="chip">${esc(t)}</span>`).join('')}<span class="chip">${I('link')} ${n.id}</span></div></a>`).join('') ||
        `<div class="card"><h3>No encontramos normas con esos criterios</h3><p class="muted">Pruebe con otras palabras o consulte el <a href="#/glosario">glosario</a>.</p></div>`}
    </section></div>`, '#/buscar');
}
function bindBuscar() {
  $('#fsearch').onsubmit = e => { e.preventDefault(); const p = new URLSearchParams(location.hash.split('?')[1] || ''); p.set('q', e.target.q.value); location.hash = '#/buscar?' + p; };
  $$('[data-f]').forEach(cb => cb.onchange = () => { const p = new URLSearchParams(location.hash.split('?')[1] || ''); const k = cb.dataset.f; const vals = p.getAll(k).filter(v => v !== cb.value); p.delete(k); vals.forEach(v => p.append(k, v)); if (cb.checked) p.append(k, cb.value); location.hash = '#/buscar?' + p; });
}

let FICHA = { tab: 'texto', fecha: HOY, cohorte: '' };
function vNorma(id) {
  const n = norma(id); if (!n) return shellPublic(`<div class="card"><h1>Norma no encontrada</h1><p>El identificador <code>${esc(id)}</code> no existe. <a href="#/buscar">Volver a la búsqueda</a></p></div>`);
  const units = flatUnits(unidadesDe(n));
  const tabs = [['texto', 'Texto vigente'], ['historial', 'Historial y versiones'], ['comparar', 'Comparar versiones'], ['relaciones', 'Relaciones'], ['documentos', 'Documentos']];
  const t = FICHA.tab;
  let panel = '';
  if (t === 'texto') {
    const esHoy = FICHA.fecha === HOY && !FICHA.cohorte;
    panel = `<div class="card" style="margin-bottom:14px"><form class="row" id="fdate" style="align-items:flex-end">
        <div class="field" style="margin:0"><label for="fd">${I('calendar')} Ver el texto tal como regía el</label><input type="date" id="fd" value="${FICHA.fecha}" min="${n.fecha}" max="${HOY}"></div>
        ${n.id === 'CSU-ACU-2004-004' ? `<div class="field" style="margin:0"><label for="fc">${I('user')} Fecha de ingreso del estudiante (cohorte)</label><input type="date" id="fc" value="${FICHA.cohorte}"></div>` : ''}
        <button class="btn sec">Aplicar</button>${!esHoy ? `<button type="button" class="btn ghost" id="freset">${I('undo')} Volver al texto vigente</button>` : ''}</form>
        ${!esHoy ? `<div class="alert info" style="margin-top:10px">${I('info')}<span>Está viendo una versión histórica${FICHA.fecha !== HOY ? ` a la fecha <b>${fmt(FICHA.fecha)}</b>` : ''}${FICHA.cohorte ? `, para un estudiante que ingresó el <b>${fmt(FICHA.cohorte)}</b>` : ''}. Esta vista no corresponde necesariamente al texto vigente hoy.</span></div>` : ''}</div>
      <div class="ficha-body"><nav class="toc card" aria-label="Contenido">${units.filter(u => u.tipo !== 'paragrafo').map(u => `<a href="javascript:void(0)" data-goto="u-${u.id}" class="${u.tipo === 'titulo' ? 't' : ''}">${esc(u.rotulo)} ${u.tipo === 'titulo' ? '' : esc(u.titulo || '')}</a>`).join('')}</nav>
      <article class="card">${renderTexto(n, FICHA.fecha, FICHA.cohorte)}</article></div>`;
  } else if (t === 'historial') {
    const ev = [{ f: n.fecha, t: `Expedición del ${titulo(n)}`, d: `${organo(n.organo)} · publicado el ${fmt(n.publicado)}` }, ...(n.afectadaPor || []).map(a => ({ f: a.fecha, t: `${a.tipo[0].toUpperCase() + a.tipo.slice(1)} — ${a.unidad}`, d: `Por ${norma(a.acto) ? titulo(norma(a.acto)) : a.acto}`, id: a.acto }))].sort((a, b) => a.f.localeCompare(b.f));
    panel = `<div class="grid g2"><div class="card"><h3 style="margin-top:0">Línea de tiempo</h3><ol class="timeline">${ev.map(e => `<li><span class="chip">${fmt(e.f)}</span><br><b>${esc(e.t)}</b><div class="muted">${e.id && norma(e.id) ? linkNorma(e.id) : esc(e.d)}</div>
      <button class="btn sm ghost" data-at="${e.f}">${I('clock')} Ver texto a esta fecha</button></li>`).join('')}</ol></div>
      <div class="card"><h3 style="margin-top:0">Versiones por unidad</h3>${units.filter(u => (u.versiones || []).length > 1).map(u => `<details style="margin-bottom:8px"><summary><b>${esc(u.rotulo)}</b> ${esc(u.titulo || '')} <span class="chip">${u.versiones.length} versiones</span></summary>
        ${u.versiones.map((v, i) => `<div class="unit" style="background:#fafcfb"><span class="chip">${fmt(v.desde)} → ${v.hasta ? fmt(v.hasta) : 'hoy'}</span> ${i === u.versiones.length - 1 ? '<span class="chip" style="background:var(--ok-bg);color:var(--ok)">vigente</span>' : ''}<div style="margin-top:4px">${esc(v.texto)}</div></div>`).join('')}</details>`).join('') || '<p class="muted">Esta norma no tiene unidades con más de una versión.</p>'}
      ${n.anexos ? `<h3>Anexos</h3>${n.anexos.map(a => `<div class="row">${I('file')} ${esc(a.nombre)} <span class="chip">${a.version}</span>${a.vigente ? '' : estado('derogada')}</div>`).join('')}` : ''}</div></div>`;
  } else if (t === 'comparar') {
    const multi = units.filter(u => (u.versiones || []).length > 1);
    if (!multi.length) panel = `<div class="card"><p class="muted">Esta norma aún no tiene versiones distintas para comparar.</p></div>`;
    else {
      const fechas = [...new Set(multi.flatMap(u => u.versiones.map(v => v.desde)))].sort();
      const A = FICHA.cmpA || fechas[0], B = FICHA.cmpB || fechas[fechas.length - 1];
      panel = `<div class="card" style="margin-bottom:14px"><div class="row" style="align-items:flex-end">
        <div class="field" style="margin:0"><label for="ca">Versión A (desde)</label><select id="ca">${fechas.map(f => `<option ${f === A ? 'selected' : ''} value="${f}">${fmt(f)}</option>`).join('')}</select></div>
        <div class="field" style="margin:0"><label for="cb">Versión B (desde)</label><select id="cb">${fechas.map(f => `<option ${f === B ? 'selected' : ''} value="${f}">${fmt(f)}</option>`).join('')}</select></div>
        <span class="row muted diff"><ins>adición</ins> <del>supresión</del></span></div></div>
        <div class="card diff">${multi.map(u => { const va = verAt(u, A)?.texto || '(no existía)'; const vb = verAt(u, B)?.texto || '(no existía)'; return `<div class="unit"><b>${esc(u.rotulo)}</b> ${esc(u.titulo || '')} ${va === vb ? '<span class="chip">sin cambios</span>' : ''}<div style="margin-top:4px">${diffWords(va, vb)}</div></div>`; }).join('')}</div>`;
    }
  } else if (t === 'relaciones') {
    const fila = (a, dir) => `<tr><td>${linkNorma(a.acto)}</td><td><span class="chip">${esc(a.tipo)}</span></td><td>${esc(a.unidad)}</td><td>${fmt(a.fecha)}</td></tr>`;
    panel = `<div class="grid g2"><div class="card"><h3 style="margin-top:0">${I('arrow', 'style="transform:rotate(180deg)"')} Actos que afectan esta norma</h3>
      ${(n.afectadaPor || []).length ? `<div class="tablewrap"><table><thead><tr><th>Acto</th><th>Afectación</th><th>Unidad</th><th>Fecha</th></tr></thead><tbody>${n.afectadaPor.map(a => fila(a)).join('')}</tbody></table></div>` : '<p class="muted">Ningún acto ha afectado esta norma.</p>'}</div>
      <div class="card"><h3 style="margin-top:0">${I('arrow')} Normas que este acto afecta</h3>
      ${(n.afecta || []).length ? `<div class="tablewrap"><table><thead><tr><th>Norma</th><th>Afectación</th><th>Unidad</th><th>Fecha</th></tr></thead><tbody>${n.afecta.map(a => fila(a)).join('')}</tbody></table></div>` : '<p class="muted">Este acto no afecta otras normas.</p>'}
      ${n.concordancias ? `<h3>Concordancias</h3>${n.concordancias.map(linkNorma).join(', ')}` : ''}</div></div>`;
  } else if (t === 'documentos') {
    panel = `<div class="grid g3">
      <div class="card"><h3 style="margin-top:0">${I('shield')} Original firmado (PDF)</h3><p class="muted">Documento con fe pública. Huella SHA-256 verificada en cada descarga (RNF-04).</p><p class="hash">SHA-256: ${n.sha}</p><button class="btn" data-dl="orig">${I('down')} Descargar original</button></div>
      <div class="card"><h3 style="margin-top:0">${I('file')} Texto consolidado</h3><p class="muted">Incluye la leyenda de carácter informativo. Formatos abiertos (RNF-09).</p><div class="row"><button class="btn sec" data-dl="html">HTML</button><button class="btn sec" data-dl="pdf">PDF</button><button class="btn sec" data-dl="json">JSON</button><button class="btn sec" data-dl="xml">Akoma Ntoso</button></div></div>
      <div class="card"><h3 style="margin-top:0">${I('check')} Constancia de consulta</h3><p class="muted">PDF con fecha, hora, versión consultada y código de verificación. No constituye certificación de vigencia (RF-27).</p><button class="btn sec" id="btn-const">Generar constancia</button></div>
      <div class="card"><h3 style="margin-top:0">${I('edit')} Plantilla de concordancia</h3><p class="muted">Exporte el texto vigente en la plantilla institucional editable para proyectos de reforma (RF-29).</p><button class="btn sec" data-dl="docx">${I('down')} Exportar plantilla</button></div>
      <div class="card"><h3 style="margin-top:0">${I('link')} Dirección permanente</h3><p class="hash">https://normatividad.unicordoba.edu.co/n/${n.id}</p><p class="muted">Los enlaces antiguos a PDF del dominio institucional redirigen aquí (HTTP 301).</p><button class="btn sec" id="btn-copy">Copiar enlace</button></div></div>`;
  }
  const sub = S.subs.has(n.id);
  return shellPublic(`
  <nav class="muted" aria-label="Ruta" style="font-size:.88rem;margin-bottom:8px"><a href="#/">Inicio</a> › <a href="#/buscar">Normas</a> › ${esc(titulo(n))}</nav>
  <div class="legend" role="note">${I('alert')}<span><b>Carácter informativo.</b> El texto consolidado facilita la consulta y no sustituye el acto original. La fe pública reside exclusivamente en el <a href="javascript:void(0)" data-tab="documentos">original firmado</a>.</span></div>
  <section class="card" style="margin-top:14px"><div class="ficha-head"><div>
      <span class="tag">${organo(n.organo)}${n.troncal ? ' · Norma troncal' : ''}</span>
      <h1>${titulo(n)}</h1><p style="margin:0;font-size:1.08rem">${esc(n.epigrafe)}</p></div>
      <div style="text-align:right">${estado(n.estado, true)}<p class="muted" style="font-size:.85rem;max-width:260px">${ESTADOS[n.estado].desc}</p>
      <div class="row" style="justify-content:flex-end"><button class="btn sm ${sub ? '' : 'sec'}" id="btn-sub">${I('bell')} ${sub ? 'Suscrito' : 'Recibir alertas'}</button></div></div></div>
    <dl class="meta"><div><dt>Identificador</dt><dd>${n.id}</dd></div><div><dt>Fecha de expedición</dt><dd>${fmt(n.fecha)}</dd></div><div><dt>Publicación</dt><dd>${fmt(n.publicado)}</dd></div>
      <div><dt>Última actualización</dt><dd>${fmt(n.actualizado)}</dd></div><div><dt>Responsable</dt><dd>${esc(n.responsable)}</dd></div><div><dt>Radicado Orfeo</dt><dd>${esc(n.radicado)}</dd></div>
      <div><dt>Temas</dt><dd>${n.temas.map(esc).join(', ')}</dd></div><div><dt>Tipo</dt><dd>${tipo(n.tipo)} <a href="#/glosario" title="¿Qué es?">${I('info')}</a></dd></div></dl>
  </section>
  <div class="tabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" aria-selected="${k === t}" data-tab="${k}">${l}</button>`).join('')}</div>
  <div class="tabpanel" role="tabpanel">${panel}</div>`, '#/buscar');
}
function bindNorma(id) {
  const n = norma(id); if (!n) return;
  $$('[data-tab]').forEach(b => b.onclick = () => { FICHA.tab = b.dataset.tab; render(); });
  $$('[data-goto]').forEach(a => a.onclick = () => document.getElementById(a.dataset.goto)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  const fd = $('#fdate'); if (fd) fd.onsubmit = e => { e.preventDefault(); FICHA.fecha = $('#fd').value || HOY; FICHA.cohorte = $('#fc')?.value || ''; render(); };
  const fr = $('#freset'); if (fr) fr.onclick = () => { FICHA.fecha = HOY; FICHA.cohorte = ''; render(); };
  $$('[data-at]').forEach(b => b.onclick = () => { FICHA.tab = 'texto'; FICHA.fecha = b.dataset.at; FICHA.cohorte = ''; render(); });
  const ca = $('#ca'); if (ca) { ca.onchange = () => { FICHA.cmpA = ca.value; render(); }; $('#cb').onchange = () => { FICHA.cmpB = $('#cb').value; render(); }; }
  $('#btn-sub').onclick = () => {
    if (S.subs.has(id)) { S.subs.delete(id); toast('Suscripción cancelada'); render(); return; }
    modal(`<h2>${I('bell')} Alertas de cambios</h2><p>Reciba un correo cuando se publique una afectación sobre <b>${esc(titulo(n))}</b> o sobre sus temas (RF-31).</p>
      <form id="fsub"><div class="field"><label for="em">Correo electrónico <span class="req">*</span></label><input id="em" type="email" required placeholder="nombre@correo.com"></div>
      <fieldset style="border:0;padding:0"><label><input type="radio" name="al" checked> Solo esta norma</label><br><label><input type="radio" name="al"> Todo el tema «${esc(n.temas[0])}»</label></fieldset>
      <div class="row" style="justify-content:flex-end;margin-top:14px"><button type="button" class="btn ghost" data-close>Cancelar</button><button class="btn">Suscribirme</button></div></form>`,
      (bg, close) => { $('#fsub', bg).onsubmit = e => { e.preventDefault(); S.subs.add(id); close(); toast('Suscripción registrada. Recibirá alertas en su correo.'); render(); }; });
  };
  const leyenda = 'Texto de carácter informativo. No sustituye el acto original; la fe pública reside exclusivamente en el original firmado.';
  $$('[data-dl]').forEach(b => b.onclick = () => {
    const k = b.dataset.dl; const units = flatUnits(unidadesDe(n)).filter(u => u.versiones).map(u => ({ unidad: u.rotulo, titulo: u.titulo, texto: verAt(u, HOY)?.texto, nota: verAt(u, HOY)?.nota || null }));
    if (k === 'orig') { toast(`Huella SHA-256 verificada (${n.sha}). Descarga del original simulada.`, 'shield'); return; }
    if (k === 'json') return download(`${n.id}.json`, JSON.stringify({ id: n.id, titulo: titulo(n), estado: ESTADOS[n.estado].label, leyenda, unidades: units }, null, 2), 'application/json');
    if (k === 'xml') return download(`${n.id}.akn.xml`, `<?xml version="1.0"?>\n<akomaNtoso><act name="${n.id}"><preface><p>${esc(n.epigrafe)}</p><p>${leyenda}</p></preface><body>${units.map(u => `<article><num>${esc(u.unidad)}</num><heading>${esc(u.titulo || '')}</heading><content><p>${esc(u.texto)}</p></content></article>`).join('')}</body></act></akomaNtoso>`, 'application/xml');
    if (k === 'docx') { toast('Plantilla de concordancia exportada (simulado): conserva numeración y notas de vigencia.', 'down'); return; }
    download(`${n.id}-consolidado.html`, `<!doctype html><meta charset="utf-8"><title>${titulo(n)}</title><body style="font-family:Georgia;max-width:720px;margin:auto"><p style="border:2px solid #c9a227;padding:8px"><b>${leyenda}</b></p><h1>${titulo(n)}</h1><p>${esc(n.epigrafe)}</p>${renderTexto(n, HOY)}</body>`);
    if (k === 'pdf') toast('En producción se genera el PDF con la misma leyenda; aquí se descargó la versión HTML.', 'info');
  });
  const bc = $('#btn-const'); if (bc) bc.onclick = () => {
    const ts = `${HOY} ${new Date().toTimeString().slice(0, 8)}`; const code = hashStr(n.id + ts).slice(0, 12).toUpperCase().replace(/(.{4})/g, '$1-').slice(0, 14);
    modal(`<h2>Constancia de consulta</h2><div class="doc-paper"><p style="text-align:center"><b>UNIVERSIDAD DE CÓRDOBA</b><br>Secretaría General · SGD-LEGAL</p>
      <p>Se deja constancia de que el <b>${ts}</b> se consultó en el portal de normatividad la siguiente norma:</p>
      <p><b>${titulo(n)}</b> (${n.id})<br>${esc(n.epigrafe)}<br>Estado de vigencia registrado: <b>${ESTADOS[n.estado].label}</b><br>Versión consultada: texto vigente al ${fmt(FICHA.fecha)}</p>
      <p style="font-size:.85rem"><i>Esta constancia no constituye certificación de vigencia. El texto consolidado tiene carácter informativo y no sustituye el acto original (RB-01).</i></p>
      <p class="hash">Código de verificación: ${code}</p></div>
      <div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" data-close>Cerrar</button><button class="btn" onclick="window.print()">${I('down')} Descargar PDF</button></div>`);
  };
  const cp = $('#btn-copy'); if (cp) cp.onclick = () => { navigator.clipboard?.writeText(`https://normatividad.unicordoba.edu.co/n/${n.id}`).catch(() => { }); toast('Enlace permanente copiado'); };
}

function vGlosario() {
  return shellPublic(`<h1>Glosario</h1><p class="muted">Conceptos básicos para entender la normativa interna, los tipos de norma y los estados de vigencia (RF-28).</p>
    <div class="grid g2"><section><h2>Tipos de norma</h2>${TIPOS.map(t => `<div class="card" style="margin-bottom:10px"><h3 style="margin:0">${t.nombre}</h3><p class="muted" style="margin:4px 0 0">${t.desc}</p></div>`).join('')}
    <h2>Estados de vigencia</h2>${Object.keys(ESTADOS).map(k => `<div class="row" style="margin-bottom:8px">${estado(k)}<span class="muted">${ESTADOS[k].desc}</span></div>`).join('')}</section>
    <section><h2>Términos</h2>${GLOSARIO.filter(g => !g[0].startsWith('Estado:')).map(([t, d]) => `<details class="card" style="margin-bottom:8px;padding:12px 16px"><summary><b>${t}</b></summary><p style="margin-bottom:0">${d}</p></details>`).join('')}</section></div>`, '#/glosario');
}
function vCompilacion() {
  return shellPublic(`<h1>Compilaciones temáticas</h1><p class="muted">Genere una compilación exportable de las normas vigentes de uno o varios temas, con referencia a sus originales firmados (RF-30). Útil para documentos maestros y procesos de autoevaluación.</p>
  <div class="grid g2"><form class="card" id="fcomp"><h3 style="margin-top:0">1. Seleccione los temas</h3>${TEMAS.map(t => `<label style="display:flex;gap:8px;padding:3px 0"><input type="checkbox" name="t" value="${t}" ${t === 'Reglamento estudiantil' ? 'checked' : ''}> ${t} <span class="muted">(${NORMAS.filter(n => n.temas.includes(t)).length})</span></label>`).join('')}
    <h3>2. Opciones</h3><label style="display:flex;gap:8px"><input type="checkbox" id="solov" checked> Incluir solo normas vigentes (total o parcialmente)</label>
    <div class="row" style="margin-top:14px"><button class="btn">${I('layers')} Generar compilación</button></div></form>
  <section class="card" id="compres"><p class="muted">La vista previa aparecerá aquí.</p></section></div>`, '#/compilacion');
}
function bindCompilacion() {
  const go = e => { e && e.preventDefault(); const temas = $$('[name=t]:checked').map(x => x.value); const solo = $('#solov').checked;
    const list = NORMAS.filter(n => n.temas.some(t => temas.includes(t)) && (!solo || ['vigente', 'vigente-mod', 'parcial'].includes(n.estado)));
    $('#compres').innerHTML = `<div class="row between"><h3 style="margin:0">Vista previa · ${list.length} normas</h3><button class="btn sm" id="dlc">${I('down')} Exportar PDF</button></div>
      <div class="legend" style="margin:10px 0">${I('alert')}<span>Compilación informativa generada el ${fmt(HOY)}. Consulte los originales firmados.</span></div>
      ${list.map(n => `<div class="unit"><div class="row between"><b>${linkNorma(n.id)}</b>${estado(n.estado)}</div><div class="muted">${esc(n.epigrafe)}</div><span class="hash">Original: SHA-256 ${n.sha}</span></div>`).join('') || '<p class="muted">Sin normas para los temas elegidos.</p>'}`;
    $('#dlc') && ($('#dlc').onclick = () => toast('Compilación exportada (simulado)', 'down')); };
  $('#fcomp').onsubmit = go; go();
}
function vApi() {
  const ej = { id: 'CSU-ACU-2004-004', tipo: 'Acuerdo', numero: '004', anio: 2004, organo: 'Consejo Superior', estado: 'vigente con modificaciones', url: 'https://normatividad.unicordoba.edu.co/n/CSU-ACU-2004-004', afectaciones: 5 };
  return shellPublic(`<h1>Datos abiertos y API</h1><p class="muted">API REST de consulta en JSON, documentada con OpenAPI 3 y con límites de uso (RF-35, RI-08). Misma información de la ficha pública.</p>
  <div class="grid g2"><div class="card"><h3 style="margin-top:0">Endpoints</h3><div class="tablewrap"><table><thead><tr><th>Método</th><th>Ruta</th><th>Descripción</th></tr></thead><tbody>
    ${[['GET', '/api/v1/normas?q=&tipo=&organo=&estado=', 'Búsqueda por texto y facetas'], ['GET', '/api/v1/normas/{id}', 'Ficha de una norma'], ['GET', '/api/v1/normas/{id}/texto?fecha=', 'Texto vigente o a una fecha'], ['GET', '/api/v1/normas/{id}/versiones', 'Versiones de sus unidades'], ['GET', '/api/v1/normas/{id}/afectaciones', 'Afectaciones en ambos sentidos'], ['GET', '/api/v1/normas/{id}/akn', 'Estructura en Akoma Ntoso (XML)']].map(r => `<tr><td><span class="chip">${r[0]}</span></td><td class="hash">${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table></div></div>
  <div class="card"><h3 style="margin-top:0">Respuesta de ejemplo</h3><pre class="hash" style="background:#0f2a1c;color:#d6f5e3;padding:14px;border-radius:8px;overflow:auto">GET /api/v1/normas/CSU-ACU-2004-004\n\n${esc(JSON.stringify(ej, null, 2))}</pre></div></div>`, '#/api');
}

/* ---------- autenticación (simulada) ---------- */
function vLogin() {
  return shellPublic(`<div style="max-width:560px;margin:20px auto"><div class="card" style="padding:28px">
    <div class="row"><span class="logo" style="background:var(--verde);color:#fff">UC</span><div><h1 style="margin:0">Ingreso de funcionarios</h1><span class="muted">Consola de gestión normativa</span></div></div>
    <div class="alert info" style="margin:16px 0">${I('info')}<span>Los roles internos se autentican con la cuenta institucional mediante el proveedor de identidad (SSO, OpenID Connect). No se crean credenciales adicionales (RES-03). La consulta pública no requiere autenticación.</span></div>
    <button class="btn" style="width:100%;justify-content:center;padding:12px" id="sso">${I('shield')} Continuar con la cuenta @correo.unicordoba.edu.co</button>
    <div id="roles" hidden><h3>Demostración: elija el rol con el que desea ingresar</h3>
    ${Object.entries(ROLES).map(([r, v]) => `<a class="result" href="#/login/${encodeURIComponent(r)}"><div class="row between"><b>${r}</b><span class="muted">${v.nombre}</span></div><span class="muted" style="font-size:.88rem">${{ 'Registrador': 'Reserva números, registra actos, estructura el texto y registra afectaciones.', 'Validador': 'Revisa y aprueba consolidaciones en la Secretaría General; puede escalar o devolver.', 'Validador jurídico': 'Atiende los casos escalados a la Oficina de Asuntos Jurídicos.', 'Administrador': 'Gestiona usuarios, roles y catálogos.', 'Auditor': 'Consulta la pista de auditoría encadenada.' }[r]}</span></a>`).join('')}</div>
  </div></div>`, '');
}

/* ---------- consola ---------- */
function vBandeja() {
  const b = S.bandeja; const enCurso = b.filter(x => x.estado !== 'publicado'); const vencidos = enCurso.filter(x => x.dias > x.plazo);
  const cols = FLUJO;
  return shellConsole(`<div class="row between"><div><h1 style="margin-bottom:0">Bandeja de trabajo</h1><span class="muted">Actos por estado y responsable (RF-17, RI-02)</span></div>
    ${S.user.rol === 'Registrador' ? `<div class="row"><a class="btn sec" href="#/consola/reservar">${I('hash')} Reservar número</a><a class="btn" href="#/consola/registrar">${I('plus')} Registrar acto</a></div>` : ''}</div>
  <div class="grid g4" style="margin:18px 0">
    <div class="card stat"><b>${enCurso.length}</b><span class="muted">actos en curso</span></div>
    <div class="card stat"><b style="color:var(--off)">${vencidos.length}</b><span class="muted">con plazo vencido ${I('alert')}</span></div>
    <div class="card stat"><b>2,1</b><span class="muted">días, mediana expedición → publicación</span></div>
    <div class="card stat"><b>${b.filter(x => x.estado === 'validacion' || x.estado === 'escalado').length}</b><span class="muted">pendientes de validación</span></div></div>
  ${vencidos.length ? `<div class="alert warn" style="margin-bottom:14px">${I('alert')}<span>${vencidos.map(v => `<b>${v.id}</b> lleva ${v.dias} días en «${FLUJO_LABEL[v.estado]}» (plazo: ${v.plazo})`).join('; ')}. Se envió alerta de plazo al responsable.</span></div>` : ''}
  <div class="kanban">${cols.map(c => { const items = b.filter(x => x.estado === c); return `<div class="col"><h4>${FLUJO_LABEL[c]} <span class="chip">${items.length}</span></h4>
    ${items.map(x => `<div class="tk" tabindex="0" role="button" data-tk="${x.id}"><div class="id">${x.id}</div><div>${esc(x.epigrafe)}</div><div class="muted" style="font-size:.8rem;margin-top:4px">${I('user')} ${esc(x.resp)}</div>
      <div class="bar" title="${x.dias} de ${x.plazo} días"><span class="${x.dias > x.plazo ? 'late' : ''}" style="width:${Math.min(100, x.dias / x.plazo * 100)}%"></span></div><div class="muted" style="font-size:.75rem">${x.dias}/${x.plazo} días ${x.dias > x.plazo ? '· <b style="color:var(--off)">vencido</b>' : ''}</div></div>`).join('')}</div>`; }).join('')}</div>`, 'bandeja');
}
function bindBandeja() {
  $$('[data-tk]').forEach(el => { const go = () => { const x = S.bandeja.find(b => b.id === el.dataset.tk);
    if (['validacion', 'escalado'].includes(x.estado)) location.hash = '#/consola/validar/' + x.id;
    else if (['estructuracion', 'expedido', 'devuelto'].includes(x.estado)) location.hash = '#/consola/registrar';
    else if (x.estado === 'publicado') location.hash = '#/norma/CSU-ACU-2004-004';
    else modal(`<h2>${x.id}</h2><p>${esc(x.epigrafe)}</p><p>Estado: <b>${FLUJO_LABEL[x.estado]}</b> · Responsable: ${esc(x.resp)}</p><p class="muted">Ningún acto se publica antes de estar numerado, fechado y firmado (RB-02).</p><div class="row" style="justify-content:flex-end"><button class="btn" data-close>Cerrar</button></div>`); };
    el.onclick = go; el.onkeydown = e => { if (e.key === 'Enter') go(); }; });
}

function vReservar() {
  const prox = o => { const nums = S.reservados.concat(S.bandeja.map(b => b.id)).filter(id => id.startsWith(o + '-ACU-2026-')).map(id => +id.split('-').pop()); return String(Math.max(0, ...nums) + 1).padStart(3, '0'); };
  return shellConsole(`<h1>Reservar número</h1><p class="muted">Consecutivo anual y propio de cada órgano emisor; un número anulado no se reasigna (RF-01, RB-03).</p>
  <div class="grid g2"><form class="card" id="fres"><div class="field"><label for="ro">Órgano emisor</label><select id="ro">${ORGANOS.map(o => `<option value="${o.id}">${o.nombre}</option>`).join('')}</select></div>
    <div class="field"><label for="rt">Tipo de acto</label><select id="rt">${TIPOS.map(t => `<option value="${t.id}">${t.nombre}</option>`).join('')}</select></div>
    <div class="field"><label>Vigencia</label><input value="2026" disabled></div>
    <div class="alert ok" id="rprox">${I('hash')}<span>Siguiente número disponible: <b id="rn">${prox('CSU')}</b></span></div>
    <div class="field" style="margin-top:12px"><label for="rmot">Sesión o motivo</label><input id="rmot" placeholder="Ej.: Sesión ordinaria del 27 de noviembre"></div>
    <button class="btn">${I('hash')} Reservar número</button></form>
  <div class="card"><h3 style="margin-top:0">Números de 2026 · Consejo Superior</h3><div class="tablewrap"><table><thead><tr><th>Número</th><th>Estado</th><th>Detalle</th></tr></thead><tbody>
    <tr><td>042</td><td><span class="chip">reservado</span></td><td>Sesión del 27 nov.</td></tr><tr><td>041</td><td><span class="chip" style="background:var(--ok-bg);color:var(--ok)">usado</span></td><td>En validación</td></tr>
    <tr><td>038</td><td><span class="chip" style="background:var(--off-bg);color:var(--off)">anulado</span></td><td>Constancia de anulación ANU-2026-003 (no se reasigna)</td></tr><tr><td>037</td><td><span class="chip" style="background:var(--ok-bg);color:var(--ok)">usado</span></td><td>Publicado</td></tr></tbody></table></div>
    <button class="btn sm warn" style="margin-top:12px" id="anular">${I('ban')} Anular un número reservado…</button></div></div>`, 'reservar');
}
function bindReservar() {
  const upd = () => { const o = $('#ro').value; const nums = S.reservados.concat(S.bandeja.map(b => b.id)).filter(id => id.startsWith(o + '-' + $('#rt').value + '-2026-')).map(id => +id.split('-').pop()); $('#rn').textContent = String(Math.max(0, ...nums) + 1).padStart(3, '0'); };
  $('#ro').onchange = upd; $('#rt').onchange = upd; upd();
  $('#fres').onsubmit = e => { e.preventDefault(); const id = `${$('#ro').value}-${$('#rt').value}-2026-${$('#rn').textContent}`; S.reservados.push(id);
    S.bandeja.push({ id, epigrafe: `(Número reservado — ${$('#rmot').value || 'sin motivo'})`, estado: 'reservado', resp: S.user.nombre + ' (registrador)', dias: 0, plazo: 10 }); audit('Reservó número', id, '—', 'reservado'); toast(`Número ${id} reservado`); upd(); };
  $('#anular').onclick = () => modal(`<h2>Anular número reservado</h2><p>Se exige una constancia de anulación. El número no podrá reasignarse (RB-03).</p><div class="field"><label>Número</label><select><option>CSU-ACU-2026-042</option></select></div><div class="field"><label for="ja">Constancia / justificación <span class="req">*</span></label><textarea id="ja" rows="3"></textarea></div><div class="row" style="justify-content:flex-end"><button class="btn ghost" data-close>Cancelar</button><button class="btn danger" id="okan">Anular</button></div>`,
    (bg, close) => { $('#okan', bg).onclick = () => { if (!$('#ja', bg).value.trim()) { $('#ja', bg).setAttribute('aria-invalid', 'true'); toast('La constancia de anulación es obligatoria', 'alert'); return; } close(); audit('Anuló número', 'CSU-ACU-2026-042', 'reservado', 'anulado'); toast('Número anulado con constancia registrada'); }; });
}

/* Asistente de registro (CU-02, CU-03, CU-04) */
const PASOS = ['Datos del acto', 'Documentos', 'Estructura del texto', 'Afectaciones', 'Revisión y envío'];
function wiz() { return S.wiz || (S.wiz = { paso: 0, d: { organo: 'CSU', tipo: 'ACU', anio: '2026', numero: '', fecha: '', epigrafe: '', temas: [], radicado: '', justif: '' }, pdf: false, nativa: false, cotejo: false, afect: [], sug: null }); }
const TEXTO_DEMO = [
  { lvl: 0, t: 'articulo', r: 'Artículo 1.', x: 'Modifíquese el artículo 28 del Acuerdo 004 de 2004, el cual quedará así: «Las calificaciones se expresarán en la escala de cero punto cero (0.0) a cinco punto cero (5.0), con una cifra decimal. La nota mínima aprobatoria de cada asignatura es tres punto cero (3.0), y la de las asignaturas de práctica es tres punto cinco (3.5).»' },
  { lvl: 1, t: 'paragrafo', r: 'Parágrafo.', x: 'La escala aplica desde el periodo académico 2027-1.' },
  { lvl: 0, t: 'articulo', r: 'Artículo 2.', x: 'Adiciónese un parágrafo al artículo 40 del Acuerdo 004 de 2004: «El Consejo de Facultad podrá autorizar una segunda matrícula condicional por razones de fuerza mayor.»' },
  { lvl: 0, t: 'articulo', r: 'Artículo 3.', x: 'El presente acuerdo rige a partir de su expedición y deroga las disposiciones que le sean contrarias.' },
];
function vRegistrar() {
  const w = wiz(), d = w.d, p = w.paso;
  let body = '';
  if (p === 0) body = `<div class="grid g2"><div>
      <div class="row" style="gap:12px"><div class="field" style="flex:1"><label for="w-org">Órgano emisor <span class="req">*</span></label><select id="w-org">${ORGANOS.map(o => `<option value="${o.id}" ${d.organo === o.id ? 'selected' : ''}>${o.nombre}</option>`).join('')}</select></div>
      <div class="field" style="flex:1"><label for="w-tipo">Tipo <span class="req">*</span></label><select id="w-tipo">${TIPOS.map(t => `<option value="${t.id}" ${d.tipo === t.id ? 'selected' : ''}>${t.nombre}</option>`).join('')}</select></div></div>
      <div class="row" style="gap:12px"><div class="field" style="flex:1"><label for="w-num">Número <span class="req">*</span></label><input id="w-num" value="${esc(d.numero)}" inputmode="numeric" placeholder="042"><span class="msg" id="m-num"></span></div>
      <div class="field" style="flex:1"><label for="w-anio">Año</label><input id="w-anio" value="${d.anio}" disabled></div></div>
      <div class="field"><label for="w-fecha">Fecha de expedición <span class="req">*</span></label><input type="date" id="w-fecha" value="${d.fecha}" max="${HOY}"><span class="msg" id="m-fecha"></span></div>
      <div class="field" id="f-justif" hidden><label for="w-justif">Justificación <span class="req">*</span></label><textarea id="w-justif" rows="2">${esc(d.justif)}</textarea><span class="hint">La fecha no coincide con la sesión registrada para el número reservado (RF-05: advertencia con justificación).</span></div>
    </div><div>
      <div class="field"><label for="w-epi">Epígrafe <span class="req">*</span></label><textarea id="w-epi" rows="3" placeholder="Por el cual se…">${esc(d.epigrafe)}</textarea></div>
      <div class="field"><label for="w-temas">Temas <span class="req">*</span></label><select id="w-temas" multiple size="4">${TEMAS.map(t => `<option ${d.temas.includes(t) ? 'selected' : ''}>${t}</option>`).join('')}</select><span class="hint">Ctrl/⌘ + clic para elegir varios.</span></div>
      <div class="field"><label for="w-rad">Radicado Orfeo (opcional)</label><input id="w-rad" value="${esc(d.radicado)}" placeholder="2026-100-000000-1"><span class="msg" id="m-rad"></span></div>
      <div class="card" style="background:var(--verde-claro);box-shadow:none"><span class="tag">Identificador persistente (RF-03)</span><div class="hash" style="font-size:.95rem;color:var(--verde)" id="w-id">—</div></div>
    </div></div>`;
  if (p === 1) body = `<div class="grid g2">
      <div><h3>Original firmado (PDF) <span class="req">*</span></h3><div class="drop ${w.pdf ? 'done' : ''}" id="d-pdf" tabindex="0" role="button">${w.pdf ? `${I('check')} <b>Acuerdo_042_2026_firmado.pdf</b> · 412 KB<div class="hash">SHA-256: 3e9a1f…c41d (calculada al cargar, inmutable)</div>` : `${I('down')}<br><b>Arrastre o haga clic para cargar el PDF firmado</b><br><span class="muted">Se calcula su huella SHA-256</span>`}</div></div>
      <div><h3>Versión digital nativa (plantilla institucional) <span class="req">*</span></h3><div class="drop ${w.nativa ? 'done' : ''}" id="d-nat" tabindex="0" role="button">${w.nativa ? `${I('check')} <b>Acuerdo_042_2026.docx</b> · plantilla institucional v3 detectada` : `${I('file')}<br><b>Cargar la versión .docx en plantilla</b><br><span class="muted">Obligatoria para actos expedidos desde la puesta en marcha (RF-04)</span>`}</div>
        <label class="row" style="margin-top:12px"><input type="checkbox" id="w-cot" ${w.cotejo ? 'checked' : ''} ${w.nativa && w.pdf ? '' : 'disabled'}> Declaro que coteje la versión nativa contra el original firmado</label></div>
      <div><h3>Anexos</h3><p class="muted">Los anexos forman parte del acto y se versionan cuando una reforma los modifica (RF-06).</p><button class="btn sec sm" id="w-anexo">${I('plus')} Agregar anexo</button><div id="anexos"></div></div></div>`;
  if (p === 2) body = `<div class="alert info" style="margin-bottom:12px">${I('sparkle')}<span>El sistema descompuso la versión nativa en unidades jerárquicas. Revise y corrija la estructura propuesta antes de continuar (RF-07).</span></div>
    <div class="tree">${TEXTO_DEMO.map((u, i) => `<div class="n l${u.lvl}"><select aria-label="Tipo de unidad"><option ${u.t === 'articulo' ? 'selected' : ''}>artículo</option><option ${u.t === 'paragrafo' ? 'selected' : ''}>parágrafo</option><option>numeral</option><option>literal</option><option>inciso</option></select><b>${u.r}</b><span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(u.x)}</span><span class="chip" style="background:var(--ok-bg);color:var(--ok)">${I('check')} 98%</span></div>`).join('')}</div>`;
  if (p === 3) {
    if (!w.sug) w.sug = [{ id: 's1', o: 'Art. 1', dest: 'CSU-ACU-2004-004 › Art. 28', tipo: 'modifica', formula: '«Modifíquese el artículo 28 del Acuerdo 004 de 2004»', st: 'pend' }, { id: 's2', o: 'Art. 2', dest: 'CSU-ACU-2004-004 › Art. 40', tipo: 'adiciona', formula: '«Adiciónese un parágrafo al artículo 40…»', st: 'pend' }];
    body = `<div class="grid g2"><div><h3>${I('sparkle')} Afectaciones sugeridas por patrones</h3><p class="muted" style="font-size:.88rem">Propuestas a partir de fórmulas de redacción reconocidas. Ninguna se aplica sin confirmación humana (RB-12, RF-11).</p>
      ${w.sug.map(s => `<div class="sug" style="${s.st === 'ok' ? 'border-style:solid;border-color:var(--ok);background:var(--ok-bg)' : s.st === 'no' ? 'opacity:.55' : ''}"><div class="row between"><b>${s.o} → ${s.dest}</b><span class="chip">${s.tipo}</span></div><div class="muted" style="font-size:.85rem">Fórmula detectada: ${s.formula}</div>
        <div class="row" style="margin-top:6px">${s.st === 'pend' ? `<button class="btn sm" data-sug="${s.id}" data-v="ok">${I('check')} Confirmar</button><button class="btn sm ghost" data-sug="${s.id}" data-v="no">${I('x')} Descartar</button>` : `<b>${s.st === 'ok' ? '✓ Confirmada' : 'Descartada'}</b> <button class="btn sm ghost" data-sug="${s.id}" data-v="pend">Deshacer</button>`}</div></div>`).join('')}
      <div class="alert warn" style="margin-top:8px">${I('info')}<span><b>Art. 3:</b> la cláusula «deroga las disposiciones que le sean contrarias» no produce afectación sobre ninguna unidad concreta (RB-05). No se registra derogatoria automática.</span></div></div>
    <div><h3>${I('plus')} Registrar afectación manual</h3><form id="faf" class="card" style="box-shadow:none">
      <div class="row" style="gap:10px"><div class="field" style="flex:1"><label for="af-o">Unidad de origen</label><select id="af-o"><option>Art. 1</option><option>Parágrafo del Art. 1</option><option>Art. 2</option><option>Art. 3</option></select></div>
      <div class="field" style="flex:1"><label for="af-t">Tipo</label><select id="af-t">${TIPOS_AFECT.map(t => `<option>${t}</option>`).join('')}</select></div></div>
      <div class="field"><label for="af-d">Unidad destino</label><input id="af-d" value="CSU-ACU-2004-004 › Art. 28" list="dests"><datalist id="dests"><option>CSU-ACU-2004-004 › Art. 15</option><option>CSU-ACU-2004-004 › Art. 40</option></datalist></div>
      <div class="field"><label for="af-m">Modo</label><select id="af-m"><option value="expresa">Expresa</option><option value="tacita">Tácita</option><option value="organica">Orgánica</option><option value="judicial">Judicial</option></select></div>
      <div class="field" id="af-sop" hidden><label for="af-s">Soporte formal <span class="req">*</span></label><select id="af-s"><option value="">Seleccione…</option><option>Concepto de la Oficina de Asuntos Jurídicos</option><option>Decisión del órgano emisor</option><option>Providencia judicial</option></select><span class="hint">Las afectaciones no expresas requieren soporte formal (RF-10, RB-04).</span></div>
      <div class="field"><label for="af-f">Fecha de efectos</label><input type="date" id="af-f" value="${d.fecha || HOY}"></div>
      <button class="btn sec">${I('plus')} Agregar</button></form>
      ${w.afect.length ? `<h3>Afectaciones manuales</h3>${w.afect.map(a => `<div class="unit" style="border-color:var(--borde)"><b>${a.o} → ${esc(a.d)}</b> <span class="chip">${a.t}</span> <span class="chip">${a.m}${a.s ? ' · ' + a.s : ''}</span></div>`).join('')}` : ''}</div></div>`;
  }
  if (p === 4) {
    const conf = w.sug?.filter(s => s.st === 'ok') || [];
    body = `<div class="grid g2"><div class="card" style="box-shadow:none"><h3 style="margin-top:0">Resumen</h3><dl class="meta" style="grid-template-columns:1fr 1fr"><div><dt>Identificador</dt><dd>${d.organo}-${d.tipo}-${d.anio}-${d.numero}</dd></div><div><dt>Expedición</dt><dd>${fmt(d.fecha)}</dd></div><div style="grid-column:1/-1"><dt>Epígrafe</dt><dd>${esc(d.epigrafe)}</dd></div><div><dt>Temas</dt><dd>${d.temas.join(', ')}</dd></div><div><dt>Radicado</dt><dd>${esc(d.radicado || '—')}</dd></div></dl>
      <h3>Documentos</h3><p>${I('check')} Original firmado (SHA-256) · ${I('check')} Versión nativa cotejada</p><h3>Estructura</h3><p>${TEXTO_DEMO.length} unidades</p><h3>Afectaciones</h3><ul>${conf.concat(w.afect.map(a => ({ o: a.o, dest: a.d, tipo: a.t }))).map(s => `<li>${s.o} ${s.tipo} ${esc(s.dest)}</li>`).join('') || '<li class="muted">Ninguna</li>'}</ul></div>
      <div><div class="alert info">${I('info')}<span>Al enviar, el acto pasa a <b>«En validación»</b> y queda en la bandeja del validador de la Secretaría General. El sistema generará la propuesta de texto consolidado y las notas de vigencia automáticamente (RF-13, RF-15).</span></div>
      <h3>Propuesta de consolidación generada</h3><div class="card diff" style="box-shadow:none"><b>Acuerdo 004 de 2004 · Art. 28</b><div style="margin-top:4px">${diffWords(A004_UNIDADES[2].hijos[0].versiones[1].texto, 'Las calificaciones se expresarán en la escala de cero punto cero (0.0) a cinco punto cero (5.0), con una cifra decimal. La nota mínima aprobatoria de cada asignatura es tres punto cero (3.0), y la de las asignaturas de práctica es tres punto cinco (3.5).')}</div></div></div></div>`;
  }
  return shellConsole(`<div class="row between"><div><h1 style="margin-bottom:0">Registrar acto expedido</h1><span class="muted">CU-02 · CU-03 · CU-04</span></div>${p === 0 ? `<button class="btn sm ghost" id="w-demo">${I('sparkle')} Autocompletar ejemplo</button>` : ''}</div>
  <ol class="steps">${PASOS.map((s, i) => `<li class="${i === p ? 'on' : i < p ? 'done' : ''}">${s}</li>`).join('')}</ol>
  <div class="card">${body}<div id="w-err"></div>
  <div class="row between" style="margin-top:18px;border-top:1px solid var(--borde);padding-top:14px"><button class="btn ghost" id="w-prev" ${p === 0 ? 'disabled' : ''}>← Anterior</button>
  <button class="btn" id="w-next">${p === 4 ? `${I('send')} Enviar a validación` : 'Guardar y continuar →'}</button></div></div>`, 'registrar');
}
function bindRegistrar() {
  const w = wiz(), d = w.d, p = w.paso, err = $('#w-err');
  const showErr = m => { err.innerHTML = m ? `<div class="alert err" style="margin-top:12px" role="alert">${I('alert')}<span>${m}</span></div>` : ''; };
  if (p === 0) {
    const sync = () => {
      d.organo = $('#w-org').value; d.tipo = $('#w-tipo').value; d.numero = $('#w-num').value.trim(); d.fecha = $('#w-fecha').value; d.epigrafe = $('#w-epi').value; d.radicado = $('#w-rad').value.trim(); d.temas = [...$('#w-temas').selectedOptions].map(o => o.value); d.justif = $('#w-justif').value;
      const id = d.numero ? `${d.organo}-${d.tipo}-${d.anio}-${d.numero.padStart(3, '0')}` : ''; $('#w-id').textContent = id ? `${id}  ·  /n/${id}` : '—';
      const mn = $('#m-num'), ni = $('#w-num'); ni.removeAttribute('aria-invalid'); mn.className = 'msg'; mn.innerHTML = ''; w.block = '';
      if (id) {
        if (NORMAS.some(n => n.id === id) || S.bandeja.some(b => b.id === id && b.estado !== 'reservado')) { w.block = 'El identificador ya existe.'; mn.className = 'msg e'; mn.innerHTML = I('x') + ' Bloqueado: el identificador ya existe (RF-05).'; ni.setAttribute('aria-invalid', 'true'); }
        else if (!S.reservados.includes(id)) { w.block = 'El número no corresponde a un consecutivo reservado.'; mn.className = 'msg e'; mn.innerHTML = I('x') + ` Bloqueado: no es un consecutivo reservado de ${organo(d.organo)} para ${d.anio}.`; ni.setAttribute('aria-invalid', 'true'); }
        else { mn.className = 'msg o'; mn.innerHTML = I('check') + ' Número reservado válido.'; }
      }
      const mf = $('#m-fecha'); const fj = $('#f-justif'); mf.innerHTML = ''; fj.hidden = true; w.needJ = false;
      if (d.fecha && id === 'CSU-ACU-2026-042' && d.fecha !== '2026-11-27' || d.fecha && d.fecha < '2026-01-01') { mf.className = 'msg w'; mf.innerHTML = I('alert') + ' Advertencia: la fecha no coincide con la sesión prevista (27 nov. 2026).'; fj.hidden = false; w.needJ = true; }
      const mr = $('#m-rad'); mr.innerHTML = ''; if (d.radicado && !/^\d{4}-\d{3}-\d{6}-\d$/.test(d.radicado)) { mr.className = 'msg e'; mr.innerHTML = I('x') + ' Formato esperado: AAAA-DDD-NNNNNN-D (RI-05).'; }
    };
    $$('#app input, #app select, #app textarea').forEach(el => el.addEventListener('input', sync)); sync();
    $('#w-demo').onclick = () => { Object.assign(d, { organo: 'CSU', tipo: 'ACU', numero: '042', fecha: '2026-11-27', epigrafe: 'Por el cual se modifica el artículo 28 y se adiciona un parágrafo al artículo 40 del Reglamento Académico Estudiantil', temas: ['Reglamento estudiantil'], radicado: '2026-100-007731-1' }); render(); };
    $('#w-fecha').max = '2026-12-31';
  }
  if (p === 1) {
    const up = (k, el) => { el.onclick = () => { w[k] = true; render(); toast(k === 'pdf' ? 'Original cargado; huella SHA-256 calculada' : 'Versión nativa cargada'); }; el.onkeydown = e => e.key === 'Enter' && el.click(); };
    up('pdf', $('#d-pdf')); up('nativa', $('#d-nat')); $('#w-cot').onchange = e => w.cotejo = e.target.checked;
    $('#w-anexo').onclick = () => { $('#anexos').insertAdjacentHTML('beforeend', `<div class="row" style="margin-top:8px">${I('file')} Anexo ${$$('#anexos > div').length + 1}. Tabla de equivalencias.pdf <span class="chip">v1</span></div>`); };
  }
  if (p === 3) {
    $$('[data-sug]').forEach(b => b.onclick = () => { w.sug.find(s => s.id === b.dataset.sug).st = b.dataset.v; if (b.dataset.v === 'ok') audit('Confirmó afectación sugerida', 'Borrador', 'sugerida', 'confirmada'); render(); });
    $('#af-m').onchange = e => $('#af-sop').hidden = e.target.value === 'expresa';
    $('#faf').onsubmit = e => { e.preventDefault(); const m = $('#af-m').value, s = $('#af-s').value; if (m !== 'expresa' && !s) { $('#af-s').setAttribute('aria-invalid', 'true'); toast('Seleccione el soporte formal', 'alert'); return; }
      w.afect.push({ o: $('#af-o').value, t: $('#af-t').value, d: $('#af-d').value, m, s }); render(); };
  }
  $('#w-prev').onclick = () => { w.paso--; render(); };
  $('#w-next').onclick = () => {
    if (p === 0) { const falt = []; if (!d.numero) falt.push('número'); if (!d.fecha) falt.push('fecha de expedición'); if (!d.epigrafe.trim()) falt.push('epígrafe'); if (!d.temas.length) falt.push('temas');
      if (falt.length) return showErr(`No se puede guardar: faltan datos obligatorios (${falt.join(', ')}).`); if (w.block) return showErr(w.block + ' Corrija el número antes de continuar.');
      if (w.needJ && !d.justif.trim()) return showErr('Debe registrar una justificación para la diferencia de fecha.'); if (d.radicado && !/^\d{4}-\d{3}-\d{6}-\d$/.test(d.radicado)) return showErr('El radicado de Orfeo no tiene un formato válido.'); }
    if (p === 1 && !(w.pdf && w.nativa && w.cotejo)) return showErr('Cargue el original firmado y la versión nativa, y registre el cotejo entre ambos.');
    if (p === 3 && w.sug.some(s => s.st === 'pend')) return showErr('Confirme o descarte todas las afectaciones sugeridas antes de continuar.');
    if (p === 4) { const id = `${d.organo}-${d.tipo}-${d.anio}-${d.numero.padStart(3, '0')}`; const b = S.bandeja.find(x => x.id === id);
      if (b) Object.assign(b, { epigrafe: d.epigrafe, estado: 'validacion', resp: 'M. Pérez (validador)', dias: 0, plazo: 5 }); audit('Envió a validación', id, 'en estructuración', 'en validación'); S.wiz = null; toast(`${id} enviado a validación`, 'send'); location.hash = '#/consola'; return; }
    w.paso++; render();
  };
}

function vValidar(id) {
  const x = S.bandeja.find(b => b.id === id) || S.bandeja[0];
  const pendientes = S.bandeja.filter(b => ['validacion', 'escalado'].includes(b.estado));
  const actual = A004_UNIDADES[2].hijos[0].versiones[1].texto;
  const prop = 'Las calificaciones se expresarán en la escala de cero punto cero (0.0) a cinco punto cero (5.0), con una cifra decimal. La nota mínima aprobatoria de cada asignatura es tres punto cero (3.0), y la de las asignaturas de práctica es tres punto cinco (3.5).';
  const jur = S.user.rol === 'Validador jurídico';
  const editable = (x.estado === 'validacion' && !jur) || (x.estado === 'escalado' && jur);
  return shellConsole(`<div class="row between"><div><h1 style="margin-bottom:0">Validar consolidación</h1><span class="muted">CU-05 · Validación en dos niveles (RF-18)</span></div>
    <label class="row">Caso: <select id="vsel">${pendientes.concat(pendientes.includes(x) ? [] : [x]).map(b => `<option value="${b.id}" ${b.id === x.id ? 'selected' : ''}>${b.id} · ${FLUJO_LABEL[b.estado]}</option>`).join('')}</select></label></div>
  <div class="card" style="margin:14px 0"><div class="row between"><div><span class="tag">${x.id}</span><h3 style="margin:2px 0">${esc(x.epigrafe)}</h3><span class="muted">Registrado por L. Díaz · Responsable actual: ${esc(x.resp)}</span></div><span class="chip" style="font-size:.9rem">${FLUJO_LABEL[x.estado]}</span></div>
    ${x.estado === 'escalado' ? `<div class="alert warn" style="margin-top:10px">${I('alert')}<span><b>Escalado a la Oficina de Asuntos Jurídicos.</b> Motivo: posible afectación tácita del Art. 40 por el régimen de transición vigente.</span></div>` : ''}
    ${!editable ? `<div class="alert info" style="margin-top:10px">${I('info')}<span>${x.estado === 'publicado' ? 'Este acto ya fue publicado.' : jur ? 'Este caso está en el primer nivel (Secretaría General); el validador jurídico solo atiende casos escalados.' : 'Este caso está escalado a Jurídica; espere su concepto.'}</span></div>` : ''}</div>
  <h2>Comparador de dos columnas</h2>
  <div class="compare"><div><span class="tag">Texto vigente · Acuerdo 004 de 2004, Art. 28</span><p>${esc(actual)}</p>${notaHTML({ tipo: 'modifica', acto: 'CSU-ACU-2023-031', art: 'Artículo 1' })}</div>
    <div><span class="tag">Propuesta consolidada</span><p class="diff">${diffWords(actual, prop)}</p><div class="nota">${I('info')}<span><b>Nota de vigencia (generada):</b> Modificado por el Artículo 1 del Acuerdo 042 de 2026.</span></div></div></div>
  <div class="grid g2" style="margin-top:16px"><div class="card"><h3 style="margin-top:0">Lista de verificación</h3>
    ${['El acto está numerado, fechado y firmado (RB-02)', 'La afectación es expresa y cita la unidad correcta (RB-04)', 'La nota de vigencia cita el acto y el artículo (RB-06)', 'El texto consolidado coincide con el original firmado', 'Sin datos personales en el texto ni en los anexos (RNF-12)'].map((c, i) => `<label style="display:flex;gap:8px;padding:3px 0"><input type="checkbox" class="chk" ${i < 3 ? 'checked' : ''} ${editable ? '' : 'disabled'}> ${c}</label>`).join('')}</div>
    <div class="card"><h3 style="margin-top:0">Decisión</h3><p class="muted" style="font-size:.88rem">La fecha y hora de publicación se registran automáticamente y no son editables (RB-09). La ficha se sincroniza con el portal institucional (RF-19).</p>
    <div class="row"><button class="btn" id="v-ok" ${editable ? '' : 'disabled'}>${I('check')} Aprobar y publicar</button>${jur ? '' : `<button class="btn warn" id="v-esc" ${editable ? '' : 'disabled'}>${I('up')} Escalar a Jurídica</button>`}<button class="btn sec" id="v-dev" ${editable ? '' : 'disabled'}>${I('undo')} Devolver al registrador</button></div></div></div>`, 'validar');
}
function bindValidar(id) {
  const x = S.bandeja.find(b => b.id === id) || S.bandeja[0];
  $('#vsel').onchange = e => location.hash = '#/consola/validar/' + e.target.value;
  const motivo = (tit, txt, btn, cb) => modal(`<h2>${tit}</h2><div class="field"><label for="mt">${txt} <span class="req">*</span></label><textarea id="mt" rows="4"></textarea></div><div class="row" style="justify-content:flex-end"><button class="btn ghost" data-close>Cancelar</button><button class="btn" id="mok">${btn}</button></div>`,
    (bg, close) => $('#mok', bg).onclick = () => { const v = $('#mt', bg).value.trim(); if (!v) { $('#mt', bg).setAttribute('aria-invalid', 'true'); return; } close(); cb(v); });
  const ok = $('#v-ok'); if (ok) ok.onclick = () => {
    if ($$('.chk').some(c => !c.checked)) { toast('Complete la lista de verificación antes de aprobar', 'alert'); return; }
    const ts = `${HOY} ${new Date().toTimeString().slice(0, 5)}`; const prev = FLUJO_LABEL[x.estado]; x.estado = 'publicado'; x.resp = S.user.nombre; x.dias = 0;
    audit('Aprobó consolidación', x.id, prev, 'publicado'); S.audit.unshift([ts + ':00', 'sistema', 'Sistema', 'Registró fecha de publicación (RB-09)', x.id, '—', ts]);
    modal(`<h2>${I('check')} Publicado</h2><p><b>${x.id}</b> fue publicado el <b>${ts}</b>. La ficha del Acuerdo 004 de 2004 se actualizó con la nueva versión del Art. 28 y su nota de vigencia; se notificó a los suscriptores.</p><div class="row" style="justify-content:flex-end"><a class="btn sec" href="#/consola" data-close>Volver a la bandeja</a><a class="btn" href="#/norma/CSU-ACU-2004-004" data-close>Ver ficha pública</a></div>`);
  };
  const es = $('#v-esc'); if (es) es.onclick = () => motivo('Escalar a la Oficina de Asuntos Jurídicos', 'Motivo del escalamiento', 'Escalar', v => { x.estado = 'escalado'; x.resp = 'Oficina de Asuntos Jurídicos'; audit('Escaló a Jurídica', x.id, 'en validación', 'escalado'); toast('Caso escalado a Jurídica', 'up'); render(); });
  const dv = $('#v-dev'); if (dv) dv.onclick = () => motivo('Devolver al registrador', 'Observaciones para el registrador', 'Devolver', v => { const prev = FLUJO_LABEL[x.estado]; x.estado = 'devuelto'; x.resp = 'L. Díaz (registrador)'; x.obs = v; audit('Devolvió al registrador', x.id, prev, 'devuelto'); toast('Devuelto con observaciones', 'undo'); location.hash = '#/consola'; });
}

function vAuditoria() {
  let prev = '0000000000000000';
  const rows = [...S.audit].reverse().map(r => { const h = hashStr(prev + r.join('|')); const o = { r, prev, h }; prev = h; return o; }).reverse();
  return shellConsole(`<div class="row between"><div><h1 style="margin-bottom:0">Pista de auditoría</h1><span class="muted">Registro encadenado: cada evento incluye la huella del anterior, por lo que cualquier alteración es detectable (RF-33, RNF-05)</span></div>
    <div class="row"><button class="btn sec" id="a-ver">${I('shield')} Verificar integridad</button><button class="btn ghost" id="a-exp">${I('down')} Exportar CSV</button></div></div>
  <div id="a-res" style="margin:12px 0"></div>
  <div class="row" style="margin-bottom:10px"><label class="sr" for="af">Filtrar</label><input id="af" placeholder="Filtrar por usuario, acción u objeto…" style="flex:1;min-width:200px;padding:9px 10px;border:1px solid #b9c4be;border-radius:8px"></div>
  <div class="tablewrap"><table id="at"><thead><tr><th>Fecha y hora</th><th>Usuario</th><th>Acción</th><th>Objeto</th><th>Valor anterior</th><th>Valor nuevo</th><th>Huella</th></tr></thead><tbody>
  ${rows.map(({ r, h }) => `<tr><td style="white-space:nowrap">${r[0]}</td><td>${esc(r[1])}<br><small class="muted">${esc(r[2])}</small></td><td>${esc(r[3])}</td><td>${esc(r[4])}</td><td>${esc(r[5])}</td><td>${esc(r[6])}</td><td class="hash" title="Huella del evento">${h.slice(0, 10)}…</td></tr>`).join('')}</tbody></table></div>
  <p class="muted" style="font-size:.85rem">Los eventos no son editables por ningún rol y se conservan según la Tabla de Retención Documental.</p>`, 'auditoria');
}
function bindAuditoria() {
  $('#a-ver').onclick = () => { $('#a-res').innerHTML = `<div class="alert ok">${I('check')}<span>Cadena íntegra: ${S.audit.length} eventos verificados; todas las huellas coinciden.</span></div>`; };
  $('#a-exp').onclick = () => download('auditoria.csv', S.audit.map(r => r.map(c => `"${c}"`).join(',')).join('\n'), 'text/csv');
  $('#af').oninput = e => { const q = e.target.value.toLowerCase(); $$('#at tbody tr').forEach(tr => tr.hidden = !tr.textContent.toLowerCase().includes(q)); };
}

let ADMTAB = 'usuarios';
function vAdmin() {
  const cats = Object.keys(S.catalogos);
  return shellConsole(`<h1>Usuarios, roles y catálogos</h1><p class="muted">CU-14 · Autenticación institucional con permisos por rol (RF-32) y catálogos parametrizables (RF-34)</p>
  <div class="tabs" role="tablist">${[['usuarios', 'Usuarios y roles'], ...cats.map(c => [c, c])].map(([k, l]) => `<button role="tab" aria-selected="${ADMTAB === k}" data-adm="${esc(k)}">${l}</button>`).join('')}</div>
  <div class="tabpanel">${ADMTAB === 'usuarios' ? `<div class="row between" style="margin-bottom:10px"><span class="muted">Las cuentas provienen del directorio institucional (SSO).</span><button class="btn sm" id="adm-add">${I('plus')} Asignar rol a un funcionario</button></div>
    <div class="tablewrap"><table><thead><tr><th>Nombre</th><th>Cuenta institucional</th><th>Rol</th><th>Estado</th></tr></thead><tbody>${USUARIOS.map(u => `<tr><td>${u[0]}</td><td>${u[1]}</td><td><select aria-label="Rol de ${u[0]}">${Object.keys(ROLES).map(r => `<option ${r === u[2] ? 'selected' : ''}>${r}</option>`).join('')}</select></td><td><span class="chip" style="${u[3] === 'Activo' ? 'background:var(--ok-bg);color:var(--ok)' : ''}">${u[3]}</span></td></tr>`).join('')}</tbody></table></div>
    <h3>Matriz de permisos</h3><div class="tablewrap"><table><thead><tr><th>Permiso</th>${Object.keys(ROLES).map(r => `<th>${r}</th>`).join('')}</tr></thead><tbody>${[['Reservar número / registrar acto', [1, 0, 0, 0, 0]], ['Registrar afectaciones', [1, 0, 1, 0, 0]], ['Validar (1.er nivel)', [0, 1, 0, 0, 0]], ['Validar casos escalados', [0, 0, 1, 0, 0]], ['Administrar catálogos y roles', [0, 0, 0, 1, 0]], ['Consultar auditoría', [1, 1, 0, 1, 1]]].map(([p, v]) => `<tr><td>${p}</td>${v.map(x => `<td>${x ? `${I('check')}<span class="sr">Sí</span>` : '<span class="muted">—</span>'}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
    : `<form class="row" id="cat-add" style="margin-bottom:12px"><input id="cat-in" placeholder="Nuevo elemento" style="flex:1;min-width:200px;padding:9px 10px;border:1px solid #b9c4be;border-radius:8px" required><button class="btn">${I('plus')} Agregar</button></form>
    <div class="grid g3">${S.catalogos[ADMTAB].map(v => `<div class="card" style="padding:12px">${esc(v)}</div>`).join('')}</div>`}</div>`, 'admin');
}
function bindAdmin() {
  $$('[data-adm]').forEach(b => b.onclick = () => { ADMTAB = b.dataset.adm; render(); });
  const f = $('#cat-add'); if (f) f.onsubmit = e => { e.preventDefault(); const v = $('#cat-in').value.trim(); S.catalogos[ADMTAB].push(v); if (ADMTAB === 'Tipos de afectación') TIPOS_AFECT.push(v); audit('Agregó elemento a catálogo', ADMTAB, '—', v); toast(`«${v}» disponible de inmediato en los formularios`); render(); };
  const a = $('#adm-add'); if (a) a.onclick = () => modal(`<h2>Asignar rol</h2><div class="field"><label>Buscar en el directorio institucional</label><input placeholder="nombre o correo @correo.unicordoba.edu.co"></div><div class="field"><label>Rol</label><select>${Object.keys(ROLES).map(r => `<option>${r}</option>`).join('')}</select></div><div class="row" style="justify-content:flex-end"><button class="btn ghost" data-close>Cancelar</button><button class="btn" data-close onclick="toast('Rol asignado (demo)')">Asignar</button></div>`);
}

/* ---------- enrutador ---------- */
let lastRoute = '';
function render() {
  const raw = location.hash.slice(1) || '/'; const [path, qs] = raw.split('?'); const parts = path.split('/').filter(Boolean); const params = new URLSearchParams(qs || '');
  const root = $('#root'); let bind = null, html;
  const needAuth = parts[0] === 'consola';
  if (needAuth && !S.user) { location.hash = '#/login'; return; }
  if (path !== lastRoute && parts[0] === 'norma' && lastRoute.split('/')[2] !== parts[1]) FICHA = { tab: 'texto', fecha: HOY, cohorte: '' };
  switch (parts[0]) {
    case undefined: html = vHome(); break;
    case 'buscar': html = vBuscar(params); bind = bindBuscar; break;
    case 'norma': html = vNorma(parts[1]); bind = () => bindNorma(parts[1]); break;
    case 'glosario': html = vGlosario(); break;
    case 'compilacion': html = vCompilacion(); bind = bindCompilacion; break;
    case 'api': html = vApi(); break;
    case 'login':
      if (parts[1]) { const rol = decodeURIComponent(parts[1]); S.user = { rol, ...ROLES[rol] }; location.hash = rol === 'Auditor' ? '#/consola/auditoria' : rol === 'Validador jurídico' ? '#/consola/validar/CSU-ACU-2026-039' : '#/consola'; toast(`Sesión iniciada como ${rol}`, 'shield'); return; }
      html = vLogin(); bind = () => $('#sso').onclick = () => { $('#sso').innerHTML = 'Autenticando con el proveedor de identidad…'; setTimeout(() => { $('#sso').hidden = true; $('#roles').hidden = false; }, 600); }; break;
    case 'logout': S.user = null; location.hash = '#/'; return;
    case 'consola': {
      const sub = parts[1] || 'bandeja'; const allowed = ROLES[S.user.rol].menu;
      if (!allowed.includes(sub)) { html = shellConsole(`<div class="card"><h1>${I('ban')} Acceso no autorizado</h1><p>El rol <b>${S.user.rol}</b> no tiene permiso para esta función (mínimo privilegio, RNF-03).</p></div>`, ''); break; }
      if (sub === 'bandeja') { html = vBandeja(); bind = bindBandeja; }
      if (sub === 'reservar') { html = vReservar(); bind = bindReservar; }
      if (sub === 'registrar') { html = vRegistrar(); bind = bindRegistrar; }
      if (sub === 'validar') { html = vValidar(parts[2]); bind = () => bindValidar(parts[2]); }
      if (sub === 'auditoria') { html = vAuditoria(); bind = bindAuditoria; }
      if (sub === 'admin') { html = vAdmin(); bind = bindAdmin; }
      break; }
    default: html = shellPublic(`<div class="card"><h1>Página no encontrada</h1><a href="#/">Volver al inicio</a></div>`);
  }
  const sameRoute = path === lastRoute;
  root.innerHTML = html; bind && bind();
  if (!sameRoute) { window.scrollTo(0, 0); lastRoute = path; }
}
window.addEventListener('hashchange', render);
render();

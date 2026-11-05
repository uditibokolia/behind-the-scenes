(() => {
  const M = window.MEDIA || { categories: [], projects: {} };
  const S = window.SITE, J = window.JOKES;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const touch = matchMedia('(hover: none)').matches;
  // Phones in either orientation: narrow screens, and short landscape ones.
  const small = () => innerWidth <= 760 || (innerHeight <= 500 && innerWidth > innerHeight);

  /* ---------- Data ---------- */
  const titleCase = s => s.toLowerCase().replace(/(^|[\s-])\S/g, c => c.toUpperCase());
  const project = id => {
    const m = M.projects[id];
    if (!m || !m.items.length) return null;
    const info = window.PROJECTS[id] || {};
    const items = info.cover ? [...m.items].sort((a, b) => (b.name === info.cover) - (a.name === info.cover)) : m.items;
    return { id, title: info.title || titleCase(m.folder), client: info.client || '', type: info.type || '',
      summary: info.summary || '', intro: info.intro || '', role: info.role || '', year: info.year || '', items, raw: m.items, cover: items.find(i => i.type === 'image') || items[0] };
  };
  const folderCats = Object.fromEntries(M.categories.map(c => [c.folder, c]));
  const used = new Set();
  const categories = window.CATEGORIES.map(c => {
    let ids = c.projects || (folderCats[c.folder] ? folderCats[c.folder].projects : []);
    if (c.folder) used.add(c.folder);
    return { id: c.id, name: c.name, tile: c.tile, cover: c.cover, asFolder: c.asFolder, projects: ids.filter(project) };
  });
  M.categories.filter(c => !used.has(c.folder)).forEach(c =>
    categories.push({ id: c.id, name: titleCase(c.folder), projects: c.projects.filter(project) }));
  const cats = categories.filter(c => c.projects.length);
  const allProjects = [...new Set(cats.flatMap(c => c.projects))];
  const catOf = id => cats.filter(c => c.projects.includes(id)).map(c => c.name);

  /* ---------- SVG bits ---------- */
  const folderSVG = `<svg viewBox="0 0 70 58" aria-hidden="true">
    <defs><linearGradient id="fb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6cc4ff"/><stop offset="1" stop-color="#3a9bf0"/></linearGradient>
    <linearGradient id="ff" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3ff"/><stop offset="1" stop-color="#4fb0f7"/></linearGradient></defs>
    <path d="M3 9.5A4.5 4.5 0 0 1 7.5 5h17.3c1.3 0 2.5.5 3.3 1.5L31 10h31.5A4.5 4.5 0 0 1 67 14.5V51a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" fill="url(#fb)"/>
    <path d="M3 18.5A4.5 4.5 0 0 1 7.5 14h55a4.5 4.5 0 0 1 4.5 4.5V51a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" fill="url(#ff)"/>
    <path d="M3.5 18.5A4 4 0 0 1 7.5 14.5h55a4 4 0 0 1 4 4" fill="none" stroke="#c4e8ff" stroke-width="1"/></svg>`;
  const folderBack = `<svg viewBox="0 0 132 112" preserveAspectRatio="none"><path d="M4 14a8 8 0 0 1 8-8h32c2.4 0 4.6 1 6.2 2.7L57 16h63a8 8 0 0 1 8 8v80a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z" fill="#4ba8f2"/></svg>`;
  const folderFront = `<svg viewBox="0 0 132 112" preserveAspectRatio="none"><path d="M4 44a7 7 0 0 1 7-7h110a7 7 0 0 1 7 7v60a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z" fill="#7cc8fb" fill-opacity=".97"/><path d="M5 44a6 6 0 0 1 6-6h110a6 6 0 0 1 6 6" fill="none" stroke="#bfe5ff"/></svg>`;
  const pdfSVG = `<svg viewBox="0 0 46 58"><path d="M4 2h26l12 12v40a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#fff" stroke="#c9ccd2"/><path d="M30 2v10a2 2 0 0 0 2 2h10" fill="#eef0f3" stroke="#c9ccd2"/><rect x="2" y="34" width="30" height="13" rx="2" fill="#e5483f"/><text x="17" y="44" font-size="9" font-weight="700" fill="#fff" text-anchor="middle" font-family="system-ui">PDF</text><path d="M8 20h22M8 25h26M8 30h18" stroke="#d6d9de" stroke-width="2"/></svg>`;
  const sideIcon = `<svg viewBox="0 0 16 16"><path d="M1.5 4A1.5 1.5 0 0 1 3 2.5h3.2l1.3 1.5H13A1.5 1.5 0 0 1 14.5 5.5v6A1.5 1.5 0 0 1 13 13H3a1.5 1.5 0 0 1-1.5-1.5z" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>`;

  /* ---------- Clock ---------- */
  const clock = $('#clock');
  const tick = () => {
    const d = new Date();
    clock.textContent = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).replace(':', '.');
  };
  tick(); setInterval(tick, 15000);

  /* ---------- Toast ---------- */
  let toastT;
  const toast = msg => {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200);
  };

  /* ---------- Window manager ---------- */
  const layer = $('#windows');
  const wins = new Map();
  let z = 100, cascade = 0;

  function focusWin(w) {
    w.style.zIndex = ++z;
    wins.forEach(x => x.el.classList.toggle('front', x.el === w));
  }

  const traffic = (cls = '') => `<div class="traffic ${cls}"><button class="t-close" aria-label="Close"></button><button class="t-min" aria-label="Minimise"></button><button class="t-max" aria-label="Zoom"></button></div>`;
  const mbH = () => $('#menubar').offsetHeight;

  function openWindow(id, { title, w = 860, h = 600, slim = false, tools = '', body, side = '', dialog = false, onOpen, nav = false }) {
    if (wins.has(id)) { const x = wins.get(id).el; focusWin(x); return x; }
    const el = document.createElement('section');
    el.className = 'win' + (dialog ? ' dialog' : '');
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', title);
    if (dialog) {
      el.innerHTML = body;
    } else {
      const bar = `<div class="titlebar${slim ? ' slim' : ''}">
          ${side ? traffic('only-sm') : traffic()}
          ${nav ? '<div class="glass-cap nav-btns"><button class="nb-back" aria-label="Back" disabled><svg viewBox="0 0 16 16"><path d="M10 3 5 8l5 5"/></svg></button><button class="nb-fwd" aria-label="Forward" disabled><svg viewBox="0 0 16 16"><path d="m6 3 5 5-5 5"/></svg></button></div>' : ''}
          <div class="win-title">${esc(title)}</div>
          <div class="win-tools">${tools}</div>
        </div>`;
      el.classList.toggle('has-side', !!side);
      el.innerHTML = side
        ? `<div class="win-body"><aside class="side"><div class="side-top">${traffic()}</div>${side}</aside>
             <div class="main">${bar}${body}</div></div>`
        : `${bar}<div class="win-body">${body}</div>`;
    }
    const vw = innerWidth, vh = innerHeight - mbH() - 96;
    const W = Math.min(w, vw - 40), H = Math.min(h, vh - 10);
    const off = (cascade++ % 6) * 26;
    el.style.width = W + 'px';
    if (!dialog) el.style.height = H + 'px';
    el.style.left = Math.max(12, (vw - W) / 2 + off - 60) + 'px';
    el.style.top = (dialog ? Math.max(60, vh / 2 - 90) : Math.max(mbH() + 12, mbH() + (vh - H) / 2 + off - 30)) + 'px';
    layer.appendChild(el);
    wins.set(id, { el });
    focusWin(el);
    el.addEventListener('pointerdown', () => focusWin(el));
    const close = () => closeWindow(id);
    el.querySelectorAll('.t-close, .t-min').forEach(b => b.addEventListener('click', close));
    el.querySelectorAll('.t-max').forEach(b => b.addEventListener('click', () => toggleMax(el)));
    el.querySelectorAll('.titlebar, .side-top').forEach(bar => {
      bar.addEventListener('dblclick', e => { if (!e.target.closest('button')) toggleMax(el); });
      dragWindow(el, bar);
    });
    if (dialog) dragWindow(el, el);
    onOpen?.(el);
    syncDock();
    return el;
  }

  function closeWindow(id) {
    const x = wins.get(id); if (!x) return;
    wins.delete(id);
    x.el.querySelectorAll('video').forEach(v => v.pause());
    x.el.classList.add('closing');
    setTimeout(() => x.el.remove(), 170);
    const top = [...wins.values()].sort((a, b) => b.el.style.zIndex - a.el.style.zIndex)[0];
    if (top) focusWin(top.el);
    syncDock();
  }

  function toggleMax(el) {
    if (small()) return;
    if (el.dataset.prev) {
      Object.assign(el.style, JSON.parse(el.dataset.prev)); delete el.dataset.prev; el.classList.remove('maximized');
    } else {
      el.dataset.prev = JSON.stringify({ left: el.style.left, top: el.style.top, width: el.style.width, height: el.style.height });
      Object.assign(el.style, { left: '0px', top: mbH() + 'px', width: innerWidth + 'px', height: (innerHeight - mbH()) + 'px' });
      el.classList.add('maximized');
    }
  }

  function dragWindow(el, handle) {
    handle.addEventListener('pointerdown', e => {
      if (small() || e.button !== 0 || e.target.closest('button, a, input, textarea')) return;
      const sx = e.clientX, sy = e.clientY, ox = el.offsetLeft, oy = el.offsetTop;
      handle.setPointerCapture(e.pointerId);
      const move = ev => {
        el.style.left = Math.min(innerWidth - 80, Math.max(-el.offsetWidth + 120, ox + ev.clientX - sx)) + 'px';
        el.style.top = Math.min(innerHeight - 60, Math.max(mbH(), oy + ev.clientY - sy)) + 'px';
      };
      const up = () => { handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); };
      handle.addEventListener('pointermove', move); handle.addEventListener('pointerup', up);
    });
  }

  function syncDock() {
    const map = { work: 'finder', about: 'about', bts: 'bts', mail: 'mail' };
    document.querySelectorAll('.dock-item[data-action]').forEach(d => {
      const key = map[d.dataset.action];
      d.classList.toggle('running', !!key && [...wins.keys()].some(k => k === key || k.startsWith(key + ':')));
    });
  }

  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!$('#spotlight').hidden) return closeSpot();
    if (!$('#lightbox').hidden) return closeLightbox();
    if (pageEl) return closePage();
    if (socialEl) return closeSocial();
    if (aboutEl) return closeAbout();
    const top = [...wins.entries()].sort((a, b) => b[1].el.style.zIndex - a[1].el.style.zIndex)[0];
    if (top) closeWindow(top[0]);
  });

  /* ---------- Open on double-click (desktop) / tap (touch) ---------- */
  function activatable(el, open, group) {
    el.tabIndex = 0;
    el.addEventListener('click', e => {
      if (el.dataset.dragged) { delete el.dataset.dragged; return; }
      if (touch || small()) return open();
      document.querySelectorAll(group).forEach(x => x.classList.toggle('selected', x === el));
      e.stopPropagation();
    });
    el.addEventListener('dblclick', open);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  }

  /* ---------- Homepage: photo tiles, folders and the Photo Booth ---------- */
  const iconsEl = $('#icons'), stageEl = $('#stage'), booth = $('#booth');
  const catCover = c => {
    const [pid, name] = c.cover || [c.projects[0]];
    const p = project(pid) || project(c.projects[0]);
    return (name && p.items.find(i => i.name === name)) || p.cover;
  };
  const homeItems = [
    ...cats.filter(c => !c.asFolder).map(c => ({ id: 'cat-' + c.id, label: c.name, thumb: c.tile || catCover(c).thumb,
      open: () => openCategory(c) })),
    { id: 'about', label: 'About Me', open: () => openAbout() },
    ...(S.resume?.length ? [{ id: 'resume', label: 'Résumé', glyph: '<img src="media/home/resume-icon.png" alt="" draggable="false">', open: () => openResume() }] : []),
    ...cats.filter(c => c.asFolder).map(c => ({ id: 'cat-' + c.id, label: c.name, open: () => openCategory(c) }))
  ];
  homeItems.forEach((it, i) => {
    const el = document.createElement('div');
    el.className = 'icon ' + (it.thumb ? 'is-photo' : 'is-folder');
    el.setAttribute('role', 'listitem'); el.setAttribute('aria-label', it.label); el.dataset.id = it.id;
    el.innerHTML = `<div class="tile" style="animation-delay:${(0.12 + i * 0.06).toFixed(2)}s">
      ${it.thumb ? `<div class="frame"><img src="${it.thumb}" alt="" draggable="false"></div>` : `<div class="glyph${it.glyph ? ' notepad' : ''}">${it.glyph || folderSVG}</div>`}
      <div class="label">${esc(it.label)}</div></div>`;
    activatable(el, it.open, '.icon');
    dragIcon(el);
    iconsEl.appendChild(el);
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.icon, .f-item')) document.querySelectorAll('.icon.selected, .f-item.selected').forEach(x => x.classList.remove('selected'));
  });

  // Tile centres as % of the stage: a landscape set for laptops, a portrait set for phones.
  const WIDE = {
    photos: [[10, 17], [29, 11], [71, 11], [90, 17], [13, 50], [87, 47], [11, 83], [89, 81], [50, 95], [30, 95], [70, 95]],
    folders: [[27, 76], [73, 33], [27, 34], [73, 76]]
  };
  function layoutHome() {
    const W = innerWidth, vh = innerHeight - mbH();
    const tall = W < 640 || W / vh < 0.95;
    const dock = $('#dock').offsetHeight + 14;     // keep the bottom row clear of the dock
    stageEl.classList.toggle('tall', tall);
    const tile = tall ? Math.max(70, Math.min(116, W * 0.21)) : Math.max(92, Math.min(146, W * 0.073));
    stageEl.style.setProperty('--tile', tile + 'px');
    const icons = [...iconsEl.children];
    if (tall) {
      // Phones and portrait tablets: rows from the top (3 photos, 2 photos), the Photo Booth,
      // then the folders and the last photos, so no icon ever sits on the booth.
      const photos = icons.filter(el => !el.classList.contains('is-folder')), folders = icons.filter(el => el.classList.contains('is-folder'));
      const fs = Math.max(10, tile * .12), rh = tile * 9 / 16 + 7 + fs * 1.32 * 2 + 6, fh = tile * .66 + 5 + fs * 1.4 + 6;
      const g = Math.max(14, Math.min(30, vh * .025));
      const bw = Math.min(W * 0.66, 400), bh = bw / 1.2 + 84;
      const rows = [], xs = n => n === 1 ? [50] : n === 2 ? [32, 68] : n === 3 ? [17, 50, 83] : [...Array(n)].map((_, k) => 12 + k * 76 / (n - 1));
      let y = 14, pi = 0;
      const row = (list, h) => { rows.push([list, y + h / 2]); y += h + g; };
      row(photos.slice(0, 3), rh); row(photos.slice(3, 5), rh); pi = 5;
      const bt = y; y += bh + g + 4;
      if (folders.length) row(folders, fh);
      for (; pi < photos.length; pi += 3) row(photos.slice(pi, pi + 3), rh);
      const H = Math.max(vh, y - g + dock + 8);
      stageEl.style.height = H + 'px';
      const extra = (H - dock - (y - g)) / 2;      // centre the whole column when the screen is taller than it
      Object.assign(booth.style, { width: bw + 'px', left: (W - bw) / 2 + 'px', top: bt + Math.max(0, extra) + 'px' });
      rows.forEach(([list, cy]) => { const x = xs(list.length); list.forEach((el, k) => { if (el.dataset.moved) return; el.style.left = x[k] + '%'; el.style.top = cy + Math.max(0, extra) + 'px'; }); });
      return;
    }
    const H = Math.max(vh, 520);
    const Hu = H - dock;
    stageEl.style.height = H + 'px';
    const chrome = 94;                             // booth title bar + bottom bar
    const bw = Math.min(W * 0.29, (Hu * 0.66 - chrome) * 1.2, 580);
    const bh = bw / 1.2 + chrome;
    Object.assign(booth.style, { width: bw + 'px', left: (W - bw) / 2 + 'px', top: Hu * 0.54 - bh / 2 + 'px' });
    let p = 0, f = 0;
    icons.forEach(el => {
      const [x, y] = (el.classList.contains('is-folder') ? WIDE.folders[f++] : WIDE.photos[p++]) || [50, 97];
      if (el.dataset.moved) return;
      el.style.left = x + '%'; el.style.top = y / 100 * Hu + 'px';
    });
  }
  layoutHome(); addEventListener('resize', layoutHome);

  function dragIcon(el) {
    el.addEventListener('pointerdown', e => {
      if (small() || touch || e.button !== 0) return;
      const sx = e.clientX, sy = e.clientY, ox = el.offsetLeft, oy = el.offsetTop;
      let moving = false;
      const move = ev => {
        const dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (!moving && Math.hypot(dx, dy) < 5) return;
        if (!moving) { moving = true; el.setPointerCapture(e.pointerId); el.classList.add('dragging'); }
        el.style.left = Math.max(40, Math.min(stageEl.offsetWidth - 40, ox + dx)) + 'px';
        el.style.top = Math.max(40, Math.min(stageEl.offsetHeight - 40, oy + dy)) + 'px';
      };
      const up = () => {
        removeEventListener('pointermove', move); removeEventListener('pointerup', up);
        if (moving) { el.classList.remove('dragging'); el.dataset.moved = 1; el.dataset.dragged = 1; }
      };
      addEventListener('pointermove', move); addEventListener('pointerup', up);
    });
  }

  (() => {
    const B = window.BOOTH || {}, shots = B.shots || [];
    const shotBtn = $('.booth-shot', booth), img = $('img', shotBtn), thumbImg = $('.booth-thumb img', booth);
    const flash = $('.booth-flash', booth), vid = $('.booth-video', booth), modeBtn = $('.booth-mode', booth);
    let i = 0;
    const show = () => {
      if (!shots.length) return;
      img.src = shots[i];
      thumbImg.src = shots[(i + shots.length - 1) % shots.length].replace(/\.jpg$/, '-t.jpg');
    };
    show();
    $('.booth-shutter', booth).addEventListener('click', () => {
      if (!vid.hidden) setMode(false);
      flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go');
      setTimeout(() => { i = (i + 1) % Math.max(1, shots.length); show(); }, 160);
    });
    shotBtn.addEventListener('click', () => openAbout());
    $('.booth-thumb', booth).addEventListener('click', () => { if (!vid.hidden) setMode(false); i = (i + shots.length - 1) % Math.max(1, shots.length); show(); });
    const [vp, vi] = B.video || [];
    const vItem = project(vp)?.items.filter(x => x.type === 'video')[vi || 0];
    function setMode(on) {
      vid.hidden = !on; shotBtn.hidden = on;
      modeBtn.textContent = on ? 'photo' : 'video'; modeBtn.setAttribute('aria-pressed', on);
      if (on) { if (!vid.getAttribute('src')) { vid.poster = vItem.poster; vid.src = vItem.src; } vid.play().catch(() => {}); }
      else vid.pause();
    }
    if (vItem) modeBtn.addEventListener('click', () => setMode(vid.hidden)); else modeBtn.hidden = true;

    const note = $('.note', booth);
    $('#noteTitle').textContent = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase().replace(' ', ', ');
    if (B.note) $('p', note).textContent = B.note;
    note.addEventListener('click', e => {
      const b = e.target.closest('[data-note]'); if (!b) return;
      if (b.dataset.note === 'hi') openMail(); else note.classList.add('gone');
    });
  })();

  /* ---------- Finder ---------- */
  function openFinder(catId = 'all') {
    const id = 'finder:' + catId;
    if (wins.has(id)) return focusWin(wins.get(id).el);
    const hist = [catId]; let pos = 0, view = 'icons';
    const el = openWindow(id, {
      title: '', w: 920, h: 600, nav: true,
      tools: `<div class="glass-cap seg hide-sm"><button data-v="icons" class="on" aria-label="Icon view"><svg viewBox="0 0 16 16"><rect x="2" y="2" width="5" height="5" rx="1.2"/><rect x="9" y="2" width="5" height="5" rx="1.2"/><rect x="2" y="9" width="5" height="5" rx="1.2"/><rect x="9" y="9" width="5" height="5" rx="1.2"/></svg></button><button data-v="list" aria-label="List view"><svg viewBox="0 0 16 16"><path d="M2 4h12M2 8h12M2 12h12"/></svg></button></div>
        <button class="glass-cap search-cap hide-sm" data-spot aria-label="Search"><svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3 3"/></svg></button>`,
      side: `<nav class="f-side">
          <h6>Favourites</h6>
          <button data-go="about">${sideIcon}About Me</button>
          <button data-go="all">${sideIcon}All Work</button>
          <h6>Work</h6>
          ${cats.map(c => `<button data-go="${c.id}">${sideIcon}${esc(c.name)}</button>`).join('')}
          <h6>More</h6>
          <button data-go="bts">${sideIcon}Behind the scenes</button>
          <button data-go="mail">${sideIcon}Contact</button>
        </nav>`,
      body: `<div class="mobile-tabs"></div><div class="f-content scroll" style="flex:1"></div><div class="statusbar"></div>`
    });
    const content = $('.f-content', el), status = $('.statusbar', el), titleEl = $('.win-title', el);
    const back = $('.nb-back', el), fwd = $('.nb-fwd', el), tabs = $('.mobile-tabs', el);
    tabs.innerHTML = `<button data-go="all">All</button>` + cats.map(c => `<button data-go="${c.id}">${esc(c.name)}</button>`).join('');

    const clientFolders = (window.FINDER_FOLDERS || [])
      .map((f, i) => ({ ...f, key: 'f:' + i, ids: f.projects.filter(project) }))
      .filter(f => f.ids.length);
    // What a Finder location shows: the client folders, one folder's projects, or a category.
    const entries = cur => {
      if (cur === 'all' && clientFolders.length) {
        return { name: 'All Work', list: clientFolders.map(f => {
          const ps = f.ids.map(project);
          return { key: f.key, title: f.name, meta: ps.length > 1 ? ps.length + ' projects' : ps[0].items.length + ' files',
            client: ps.length > 1 ? '' : ps[0].client, type: ps.length > 1 ? 'Folder' : ps[0].type, count: ps.reduce((n, p) => n + p.items.length, 0),
            a: ps[0].cover, b: (ps[1] || ps[0]).items.find((it, k) => k > 0 && it.type === 'image') || ps[0].cover,
            open: () => ps.length > 1 ? go(f.key) : openProject(ps[0].id) };
        }) };
      }
      const folder = clientFolders.find(f => f.key === cur);
      const cat = cats.find(c => c.id === cur);
      const ids = folder ? folder.ids : cat ? cat.projects : allProjects;
      return { name: folder ? folder.name : cat ? cat.name : 'All Work', list: ids.map(project).map(p => ({
        key: p.id, title: p.title, meta: p.client && p.client !== p.title ? p.client : p.items.length + ' files',
        client: p.client, type: p.type, count: p.items.length, a: p.cover,
        b: p.items.filter(i => i.type === 'image')[1] || p.items[1] || p.cover, open: () => openProject(p.id) })) };
    };

    const render = () => {
      const cur = hist[pos];
      const { name, list } = entries(cur);
      titleEl.textContent = name;
      el.setAttribute('aria-label', name);
      el.querySelectorAll('[data-go]').forEach(b => b.classList.toggle('on', b.dataset.go === cur || (b.dataset.go === 'all' && cur.startsWith('f:'))));
      const on = tabs.querySelector('.on'); if (on) tabs.scrollLeft = on.offsetLeft - tabs.clientWidth / 2 + on.offsetWidth / 2;
      back.disabled = pos === 0; fwd.disabled = pos === hist.length - 1;
      status.textContent = `${list.length} item${list.length === 1 ? '' : 's'}`;
      const byKey = Object.fromEntries(list.map(e => [e.key, e]));
      if (view === 'list' && !small()) {
        content.innerHTML = `<div class="f-list"><table><thead><tr><th>Name</th><th>Client</th><th>Kind</th><th>Files</th></tr></thead><tbody>
          ${list.map(e => `<tr class="row" data-k="${e.key}" tabindex="0"><td><span class="li-name"><img src="${e.a.thumb}" alt="" loading="lazy">${esc(e.title)}</span></td>
          <td class="dim">${esc(e.client)}</td><td class="dim">${esc(e.type)}</td><td class="dim">${e.count}</td></tr>`).join('')}</tbody></table></div>`;
        content.querySelectorAll('tr.row').forEach(r => activatable(r, () => byKey[r.dataset.k].open(), 'tr.row'));
      } else {
        content.innerHTML = `<div class="f-grid">${list.map(e => `<div class="f-item" data-k="${e.key}" aria-label="${esc(e.title)}">
            <div class="thumb"><div class="fold">${folderBack}</div>
              <div class="peek b"><img src="${e.b.thumb}" alt="" loading="lazy"></div>
              <div class="peek"><img src="${e.a.thumb}" alt="" loading="lazy"></div>
              <div class="front">${folderFront}</div></div>
            <div class="name">${esc(e.title)}</div>
            <div class="meta">${esc(e.meta)}</div></div>`).join('')}</div>`;
        content.querySelectorAll('.f-item').forEach(f => activatable(f, () => byKey[f.dataset.k].open(), '.f-item'));
      }
      content.scrollTop = 0;
    };
    const go = to => {
      if (to === 'about') return openAbout();
      if (to === 'bts') return openBTS();
      if (to === 'mail') return openMail();
      if (to === hist[pos]) return;
      hist.splice(pos + 1); hist.push(to); pos++; render();
    };
    el.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => go(b.dataset.go)));
    back.addEventListener('click', () => { if (pos > 0) { pos--; render(); } });
    fwd.addEventListener('click', () => { if (pos < hist.length - 1) { pos++; render(); } });
    el.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => {
      view = b.dataset.v; el.querySelectorAll('.seg button').forEach(x => x.classList.toggle('on', x === b)); render();
    }));
    render();
  }

  /* ---------- Project window ---------- */
  function openProject(pid) {
    const p = project(pid); if (!p) return;
    const id = 'proj:' + pid;
    if (wins.has(id)) return focusWin(wins.get(id).el);
    const kinds = catOf(pid);
    const nImg = p.items.filter(i => i.type === 'image').length, nVid = p.items.length - nImg;
    const el = openWindow(id, {
      title: 'Info: ' + p.title, slim: true, w: 760, h: 680,
      body: `<div class="scroll" style="flex:1">
        <div class="p-head"><img src="${p.cover.thumb}" alt=""><div><h2>${esc(p.title)}</h2><div class="client">${esc(p.client)}</div></div></div>
        <div class="p-info">
          ${p.summary ? `<p class="p-summary">${esc(p.summary)}</p>` : ''}
          <div class="disclosure">Details</div>
          <dl class="kv">
            ${p.type ? `<dt>Type:</dt><dd>${esc(p.type)}</dd>` : ''}
            ${p.role ? `<dt>My role:</dt><dd>${esc(p.role)}</dd>` : ''}
            ${p.year ? `<dt>When:</dt><dd>${esc(p.year)}</dd>` : ''}
            ${kinds.length ? `<dt>Folders:</dt><dd>${esc(kinds.join(', '))}</dd>` : ''}
            <dt>Contains:</dt><dd>${[nImg && nImg + ' image' + (nImg > 1 ? 's' : ''), nVid && nVid + ' video' + (nVid > 1 ? 's' : '')].filter(Boolean).join(', ')}</dd>
          </dl>
          <div class="disclosure">Preview</div>
        </div>
        <div class="p-grid">${p.items.map((it, i) => `<button data-i="${i}" aria-label="Open ${it.type} ${i + 1}">
          <img src="${it.thumb}" alt="" loading="lazy" width="${it.w || ''}" height="${it.h || ''}" style="aspect-ratio:${it.w}/${it.h}">
          ${it.type === 'video' ? '<div class="play"><span>▶</span></div>' : ''}</button>`).join('')}</div>
      </div>`
    });
    el.querySelectorAll('.p-grid button').forEach(b => b.addEventListener('click', () => openLightbox(p, +b.dataset.i)));
  }

  /* ---------- Lightbox ---------- */
  const lb = $('#lightbox'), stage = $('.lb-stage', lb);
  let lbP, lbI = 0;
  function openLightbox(p, i) { lbP = p; lbI = i; lb.hidden = false; renderLB(); }
  function closeLightbox() { stage.innerHTML = ''; lb.hidden = true; }
  function renderLB() {
    const it = lbP.items[lbI];
    $('.lb-title', lb).textContent = lbP.title;
    $('.lb-count', lb).textContent = `${lbI + 1} / ${lbP.items.length}`;
    stage.innerHTML = (it.type === 'video'
      ? `<video src="${it.src}" poster="${it.poster}" controls controlslist="nodownload noplaybackrate" disablepictureinpicture autoplay playsinline></video>`
      : `<img src="${it.src}" alt="${esc(lbP.title)} ${lbI + 1}" draggable="false">`);
    const v = $('video', stage);
    if (v) { v.muted = false; const p = v.play(); if (p) p.catch(() => { v.muted = true; v.play().catch(() => {}); }); }
    const nxt = lbP.items[(lbI + 1) % lbP.items.length];
    if (nxt.type === 'image') new Image().src = nxt.src;
  }
  const step = d => { lbI = (lbI + d + lbP.items.length) % lbP.items.length; renderLB(); };
  $('.lb-prev', lb).addEventListener('click', () => step(-1));
  $('.lb-next', lb).addEventListener('click', () => step(1));
  $('.lb-close', lb).addEventListener('click', closeLightbox);
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
  let tx = null;
  stage.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });

  /* ---------- About (Notes) ---------- */
  /* ---------- About Me: a collage of phone-style cards ---------- */
  let aboutEl = null;
  function closeAbout() {
    if (!aboutEl) return;
    const el = aboutEl; aboutEl = null;
    clearInterval(el._lyrics);
    el.querySelectorAll(':scope > .win').forEach(w => { w.style.zIndex = ++z; layer.appendChild(w); });
    el.classList.add('closing'); setTimeout(() => el.remove(), 220);
  }
  function openAbout() {
    if (aboutEl) return;
    const ig = (S.instagram || '').replace(/^https?:\/\/(www\.)?instagram\.com\//, '@').replace(/\/$/, '');
    const icon = d => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
    const el = document.createElement('section');
    el.id = 'about'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'About ' + S.name);
    el.innerHTML = `
      <div class="ab-grid" aria-hidden="true"></div>
      <button class="ab-close" data-ab="close" aria-label="Close About me">✕</button>
      <div class="ab-stage">
        <span class="ab-dash" aria-hidden="true"></span>
        <p class="ab-cap ab-c1">Behind The Scenes —<br>portfolio of ${esc(S.name)}</p>
        <p class="ab-cap ab-num ab-c2">01</p>
        <p class="ab-cap ab-c3">${esc(S.roles[0])}<br><span>w/ ${esc(S.roles[1] || 'design')}</span></p>
        <p class="ab-cap ab-num ab-c4">06</p>
        <p class="ab-cap ab-c5">${esc(S.education)}</p>

        <article class="ab-card ab-letter">
          <header><img src="media/home/about-avatar.jpg" alt="" draggable="false"><div><b>${esc(S.name)}</b><small>${esc(ig)}</small></div>
            <button class="ab-mail" data-ab="mail" aria-label="Email ${esc(S.name)}">${icon('M3 6h18v12H3zM3.5 6.5 12 13l8.5-6.5')}</button></header>
          <h3>Hi, I’m Uditi.</h3>
          <div class="ab-body">${S.intro.map(p => `<p>${esc(p)}</p>`).join('')}</div>
          <footer><img src="media/home/about-avatar.jpg" alt="" draggable="false"><span>${esc(S.status)} · tap ✉ to say hi</span></footer>
        </article>

        <article class="ab-card ab-photo">
          <img src="media/home/about-portrait.jpg" alt="${esc(S.name)}" draggable="false">
          <div class="ab-photo-top"><b>About me</b><small>${esc(S.name)}</small></div>
          <button class="ab-flash" aria-hidden="true" tabindex="-1">${icon('M13 2 4 14h7l-1 8 9-12h-7z')}</button>
          <div class="ab-photo-foot">
            <button class="ab-heart" aria-label="Like">${icon('M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3.3 5 6.8 5c2 0 3.6 1.1 4.2 2.6h2C13.6 6.1 15.2 5 17.2 5c3.5 0 5.6 3.6 4.3 6.8C19.5 16.4 12 21 12 21z')}</button>
            <button class="ab-bubble" data-ab="mail" aria-label="Message">${icon('M12 3c5 0 9 3.6 9 8s-4 8-9 8c-1.2 0-2.4-.2-3.4-.6L4 20l1.2-3.7C3.8 14.9 3 13 3 11c0-4.4 4-8 9-8z')}</button>
            <span>add a comment on Uditi’s portfolio</span>
          </div>
        </article>

        <div class="ab-sheet" role="menu">
          <div class="ab-sheet-group">
            ${S.resume?.length ? '<button role="menuitem" data-ab="resume">View Résumé</button>' : ''}
            <button role="menuitem" data-ab="mail">Email Me</button>
          </div>
          <button class="ab-cancel" role="menuitem" data-ab="close">Close</button>
        </div>

        <aside class="ab-card ab-note">
          <a class="ab-ig" href="${S.instagram}" target="_blank" rel="noopener" aria-label="Instagram ${esc(ig)}">
            <span class="ab-ig-icon"><img src="media/home/ig-icon.png" alt="" draggable="false"></span>
            <span class="ab-ig-txt"><b>${esc(ig)}</b><small>Instagram</small></span>
          </a>
          <button class="ab-x" data-ab="hide-note" aria-label="Dismiss">✕</button>
        </aside>

        <article class="ab-card ab-lyrics">
          <header><img src="media/home/tiles/social-media.jpg" alt="" draggable="false"><div><small>Now showing</small><b>I can do…</b><span>${esc(S.name)}</span></div></header>
          <h4>Skills</h4>
          <ol class="ab-lines">${S.skills.map(k => `<li>${esc(k)}</li>`).join('')}</ol>
        </article>

        <div class="ab-pills">
          <button class="ab-pill" data-ab="close">Close</button>
          <button class="ab-pill on" data-ab="close">${esc(S.name)}</button>
        </div>
        <button class="ab-cap ab-c6" data-ab="mail"><span>Contact</span><br>${esc(S.email)}</button>
      </div>`;
    document.body.appendChild(el);
    aboutEl = el;
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-ab]');
      if (!b) return;
      const a = b.dataset.ab;
      if (a === 'close') closeAbout();
      else if (a === 'mail') mailOverAbout();
      else if (a === 'resume') { closeAbout(); openResume(); }
      else if (a === 'hide-note') b.closest('.ab-note').classList.add('gone');
    });
    $('.ab-heart', el).addEventListener('click', e => e.currentTarget.classList.toggle('on'));
    // Whatever you click comes to the front.
    let top = 10;
    el.querySelectorAll('.ab-card, .ab-sheet').forEach(c => c.addEventListener('pointerdown', () => { c.style.zIndex = ++top; }));
    // Skills light up one line at a time, like synced lyrics.
    const lines = [...el.querySelectorAll('.ab-lines li')], box = $('.ab-lines', el);
    let k = 0, pauseUntil = 0;
    const pause = () => { pauseUntil = Date.now() + 6000; };   // let people scroll the list themselves
    ['wheel', 'touchstart', 'pointerdown'].forEach(t => box.addEventListener(t, pause, { passive: true }));
    lines.forEach((li, i) => li.addEventListener('click', () => { k = i; pause(); lines.forEach((l, j) => { l.className = j === i ? 'now' : j === i + 1 ? 'next' : j < i ? 'past' : ''; }); }));
    const step = () => {
      if (Date.now() < pauseUntil) return;
      lines.forEach((li, i) => { li.className = i === k ? 'now' : i === k + 1 ? 'next' : i < k ? 'past' : ''; });
      box.scrollTo({ top: Math.max(0, lines[k].offsetTop - box.clientHeight * 0.28), behavior: 'smooth' });
      k = (k + 1) % lines.length;
    };
    step(); el._lyrics = setInterval(step, 1800);
  }

  /* ---------- Social Media: a 3D cover-flow of projects ---------- */
  let socialEl = null;
  function closeSocial(switching) {
    if (!socialEl) return;
    const el = socialEl; socialEl = null;
    if (switching) dropWins(el);
    removeEventListener('keydown', el._keys); removeEventListener('resize', el._layout);
    el.querySelectorAll(':scope > .win').forEach(w => { w.style.zIndex = ++z; layer.appendChild(w); });
    el.classList.add('closing'); setTimeout(() => el.remove(), 220);
  }
  function openSocial() {
    if (socialEl) return;
    const list = window.SOCIAL.map(sc => {
      const p = project(sc.project); if (!p) return null;
      const it = (sc.cover && p.items.find(i => i.name === sc.cover)) || p.cover;
      return { ...sc, p, img: sc.img || (it.type === 'video' ? it.poster : it.src) };
    }).filter(Boolean);
    if (!list.length) return;
    const el = document.createElement('section');
    el.id = 'sm'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Social Media Management');
    el.innerHTML = `
      <button class="sm-close" data-sm="close" aria-label="Close">✕</button>
      ${navHTML('social-media')}
      <div class="sm-deck">${list.map((c, i) => `<button class="sm-card" data-i="${i}" aria-label="${esc(c.name)}"><img src="${c.img}" alt="" draggable="false"></button>`).join('')}</div>
      <div class="sm-name" aria-live="polite"><b></b><span>Open project</span></div>
      <div class="sm-ticks">${list.map((c, i) => `<button data-t="${i}" aria-label="${esc(c.name)}"></button>`).join('')}</div>`;
    closePage(true);
    document.body.appendChild(el);
    socialEl = el;
    wireNav(el);
    const cards = [...el.querySelectorAll('.sm-card')], ticks = [...el.querySelectorAll('.sm-ticks button')];
    let a = 0;
    const layout = () => {
      const cw = cards[0].offsetWidth;
      cards.forEach((c, i) => {
        const d = i - a, n = Math.abs(d), sg = Math.sign(d);
        const x = n ? sg * (cw * 0.66 + (n - 1) * cw * 0.3) : 0;
        c.style.transform = `translateX(${x}px) translateZ(${-n * 150}px) rotateY(${-sg * 38}deg)`;
        c.style.zIndex = 20 - n; c.style.opacity = n > 3 ? 0 : 1;
        c.classList.toggle('on', n === 0); c.setAttribute('aria-current', n === 0);
      });
      ticks.forEach((t, i) => t.classList.toggle('on', i === a));
      $('.sm-name b', el).textContent = list[a].name;
    };
    const go = i => { a = Math.max(0, Math.min(list.length - 1, i)); layout(); };
    const openCard = () => (list[a].project === 'kj' && openKJ(el)) || (list[a].project === 'dm' && openDM(el)) || (list[a].project === 'mayin' && openMY(el)) || (list[a].project === 'vnest' && openVN(el)) || openGrid(el, list[a].name, list[a].p.items);
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-sm], .sm-card, [data-t], .sm-name');
      if (!b) return;
      if (b.dataset.sm === 'close') return closeSocial();
      if (b.dataset.sm === 'about') { closeSocial(); return openAbout(); }
      if (b.dataset.t) return go(+b.dataset.t);
      if (b.classList.contains('sm-name')) return openCard();
      const i = +b.dataset.i;
      i === a ? openCard() : go(i);
    });
    let wheelLock = 0;
    el.addEventListener('wheel', e => {
      if (e.target.closest('.win')) return;
      const v = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(v) < 8 || Date.now() < wheelLock) return;
      wheelLock = Date.now() + 420; go(a + (v > 0 ? 1 : -1));
    }, { passive: true });
    let sx = null;
    el.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 40) go(a + (dx < 0 ? 1 : -1)); });
    el._keys = e => { if (socialEl !== el || el.querySelector(':scope > .win')) return; if (e.key === 'ArrowRight') go(a + 1); if (e.key === 'ArrowLeft') go(a - 1); if (e.key === 'Enter') openCard(); };
    addEventListener('keydown', el._keys);
    el._layout = layout;
    requestAnimationFrame(layout);
    addEventListener('resize', layout);
  }

  /* ---------- Category pages: full-screen layouts, one per reference ---------- */
  let pageEl = null;
  // The category bar shown at the top of every opened folder.
  const navHTML = cur => `<nav class="sm-pill pg-pill" aria-label="Sections">${(window.NAV || []).map(id => cats.find(c => c.id === id)).filter(Boolean)
    .map(c => `<button data-cat="${c.id}"${c.id === cur ? ' class="on" aria-current="page"' : ''}>${esc((window.NAV_LABELS || {})[c.id] || c.name)}</button>`).join('')}</nav>`;
  const wireNav = el => {
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-cat]'); if (!b || b.classList.contains('on')) return;
      openCategory(cats.find(c => c.id === b.dataset.cat));
    });
    const on = el.querySelector('.pg-pill .on');
    if (on) setTimeout(() => { const n = on.parentNode; n.scrollTo({ left: on.offsetLeft - n.clientWidth / 2 + on.offsetWidth / 2, behavior: 'instant' }); }, 60);
  };
  const still = it => it.type === 'video' ? it.poster : it.src;
  const vid = (it, cls = '') => it.type === 'video'
    ? `<video class="${cls}" src="${it.src}" poster="${it.poster}" muted loop playsinline preload="none"></video>`
    : `<img class="${cls}" src="${it.src}" alt="" draggable="false" loading="lazy">`;
  // Videos inside a page play while hovered (or always, for the ones marked autoplay).
  const hoverPlay = el => el.querySelectorAll('video').forEach(v => {
    const box = v.closest('button, figure') || v;
    box.addEventListener('mouseenter', () => v.play().catch(() => {}));
    box.addEventListener('mouseleave', () => v.pause());
  });
  // Windows opened inside a page close with it when switching sections; otherwise they stay on the desktop.
  const dropWins = el => wins.forEach((w, id) => { if (w.el.parentNode === el) closeWindow(id); });
  function closePage(switching) {
    if (!pageEl) return;
    const el = pageEl; pageEl = null;
    (el._off || []).forEach(f => f());
    if (switching) dropWins(el);
    el.querySelectorAll(':scope > .win').forEach(w => { w.style.zIndex = ++z; layer.appendChild(w); });
    el.classList.add('closing'); setTimeout(() => el.remove(), 220);
  }
  function makePage(kind, cat, html) {
    closePage(true); closeSocial(true); closeAbout();
    const el = document.createElement('section');
    el.id = 'pg'; el.className = 'pg-' + kind; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', cat.name);
    el.innerHTML = html + `
      <button class="sm-close pg-x" data-pg="close" aria-label="Close">✕</button>
      ${navHTML(cat.id)}`;
    document.body.appendChild(el);
    pageEl = el; el._off = [];
    wireNav(el);
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-pg]'); if (!b) return;
      if (b.dataset.pg === 'close') closePage();
      if (b.dataset.pg === 'about') { closePage(); openAbout(); }
    });
    const on = (t, k, f, o) => { t.addEventListener(k, f, o); el._off.push(() => t.removeEventListener(k, f, o)); };
    el._on = on;
    return el;
  }
  // A project's work as a dotted, numbered scatter over the page that opened it (GRAPHICS/layrd/layrd ref.jpg).
  // The seven spots of the reference, in its own 1200-wide units (÷12 = % of the width):
  // spot left, top, width, height; dot centre; number centre. Each picture keeps its shape inside its spot.
  const SLOTS = [
    [90, 133, 281, 375, 370, 518, 305, 565], [488, 385, 248, 247, 623, 320, 688, 280],
    [838, 169, 266, 354, 1000, 580, 1035, 630], [162, 668, 264, 264, 97, 880, 118, 955],
    [693, 750, 359, 270, 646, 953, 609, 895], [220, 1078, 280, 350, 167, 1313, 110, 1268],
    [641, 1120, 359, 270, 1047, 1240, 1073, 1297]];
  // A swipeable strip of images, one centred at a time (Graphics > BEYOND YOU packaging). Native scroll-snap does the
  // swiping on touch screens and trackpads; a mouse can drag it; arrow keys and the dots move it; the centred image
  // opens full size, a side one is brought to the middle.
  const stripHTML = c => `<section class="gx-car" role="region" aria-roledescription="carousel" aria-label="${esc(c.label)}">
      <p class="gx-sub">( ${esc(c.label.toLowerCase())} )</p>
      <div class="gx-track" tabindex="0">${c.items.map((it, k) => `<figure class="gx-slide" data-k="${k}" role="group" aria-roledescription="slide" aria-label="${k + 1} of ${c.items.length}: ${esc(c.captions?.[k] || '')}"><div class="gx-sframe" style="--ar:${it.w || 4}/${it.h || 3}"><img src="${it.src}" alt="${esc(c.captions?.[k] || '')}" draggable="false" loading="lazy"></div>${c.captions ? `<figcaption><b>${String(k + 1).padStart(2, '0')}</b>${esc(c.captions[k])}</figcaption>` : ''}</figure>`).join('')}</div>
      <div class="gx-cbar"><span class="gx-dots">${c.items.map((_, k) => `<button data-k="${k}" aria-label="Show ${k + 1}"></button>`).join('')}</span><span class="gx-count" aria-live="polite"></span></div>
    </section>`;
  function wireStrip(root, open) {
    const track = $('.gx-track', root), slides = [...track.children], dots = [...root.querySelectorAll('.gx-dots button')], count = $('.gx-count', root);
    let a = -1;
    const centre = k => { const s = slides[k]; track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2, behavior: 'smooth' }); };
    const sync = () => {
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0, bd = Infinity;
      slides.forEach((s, k) => { const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = k; } });
      if (best === a) return;
      a = best;
      slides.forEach((s, k) => { s.classList.toggle('on', k === a); s.setAttribute('aria-current', k === a); });
      dots.forEach((d, k) => d.classList.toggle('on', k === a));
      count.textContent = `${String(a + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    };
    let raf = 0;
    track.addEventListener('scroll', () => { clearTimeout(raf); raf = setTimeout(sync, 16); }, { passive: true });
    dots.forEach(d => d.addEventListener('click', () => centre(+d.dataset.k)));
    track.addEventListener('keydown', e => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault(); e.stopPropagation(); centre(Math.max(0, Math.min(slides.length - 1, a + (e.key === 'ArrowRight' ? 1 : -1))));
    });
    // Mouse drag (touch and trackpads scroll natively).
    let x0 = null, s0 = 0, moved = false;
    track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.button) return; x0 = e.clientX; s0 = track.scrollLeft; moved = false; track.classList.add('drag'); });
    addEventListener('pointermove', e => { if (x0 === null) return; const dx = e.clientX - x0; if (Math.abs(dx) > 5) moved = true; track.scrollLeft = s0 - dx; });
    addEventListener('pointerup', () => { if (x0 === null) return; x0 = null; track.classList.remove('drag'); if (moved) { sync(); centre(a); } });
    slides.forEach((s, k) => s.addEventListener('click', () => { if (moved) { moved = false; return; } k === a ? open(k) : centre(k); }));
    track.scrollLeft = 0; sync();
    addEventListener('resize', () => { if (root.isConnected && a >= 0) centre(a); });
  }

  // opts: intro (text under the heading), layout ('scatter' | 'grid' | 'mc'), carousel ({ label, items, captions })
  // shown at the bottom. With an intro the heading sits above the work instead of inside the first block.
  function openDetail(host, title, items, back = true, opts = {}) {
    host.querySelector(':scope > .lr')?.remove();
    const fit = (it, j) => {
      const [l, t, w, h] = SLOTS[j], ar = (it.w || 4) / (it.h || 5);
      const fw = ar > w / h ? w : h * ar, fh = fw / ar;
      return { l: l + (w - fw) / 2, t: t + (h - fh) / 2, fw, fh };
    };
    // Up to seven pieces per block, spread evenly (eight pieces make two blocks of four, not seven and one).
    const blocks = [], per = Math.ceil(items.length / Math.ceil(items.length / 7));
    for (let k = 0; k < items.length; k += per) blocks.push(items.slice(k, k + per));
    const head = opts.intro !== undefined;
    const num = k => `(${String(k + 1).padStart(2, '0')})`;
    const tile = (it, k, cls = '') => `<figure class="gx-fig ${cls}" data-k="${k}" style="--ar:${it.w || 4}/${it.h || 5};--arn:${((it.w || 4) / (it.h || 5)).toFixed(3)}">${vid(it)}<span class="gx-n">${num(k)}</span></figure>`;
    let body;
    if (opts.layout === 'grid') {
      // A clean feed: every post the same size, in reading order.
      body = `<div class="gx-grid">${items.map((it, k) => tile(it, k)).join('')}</div>`;
    } else if (opts.layout === 'wide') {
      // Wide renders, each across the full width.
      body = `<div class="gx-wide">${items.map((it, k) => tile(it, k)).join('')}</div>`;
    } else if (opts.layout === 'mc') {
      // Mock-ups first (the first one large), then the flat artwork side by side at one height.
      const mock = items.map((it, k) => [it, k]).filter(([it]) => it.w > it.h * 1.3), flats = items.map((it, k) => [it, k]).filter(([it]) => !(it.w > it.h * 1.3));
      body = `<p class="gx-sub">( mock-ups )</p><div class="gx-mock">${mock.map(([it, k], j) => tile(it, k, j ? '' : 'gx-hero')).join('')}</div>
        ${flats.length ? `<p class="gx-sub">( dielines &amp; inserts )</p><div class="gx-flats">${flats.map(([it, k]) => tile(it, k)).join('')}</div>` : ''}`;
    }
    const sub = document.createElement('section');
    sub.className = 'lr' + (head ? ' gx-d' : '');
    sub.innerHTML = `${back ? '<button class="lr-back">← back</button>' : ''}${head ? `<header class="gx-head"><h2 class="gx-h">(${esc(String(title).toLowerCase())})</h2>${opts.intro ? `<p class="gx-intro">${esc(opts.intro)}</p>` : ''}</header>` : ''}<div class="lr-wrap${body ? ' gx-wrap' : ''}">${body || blocks.map((bl, bi) => {
      const fits = bl.map(fit), bottom = Math.max(...fits.map(q => q.t + q.fh), ...bl.map((_, j) => SLOTS[j][7])) + 70;
      return `<div class="lr-block" style="aspect-ratio:1200/${Math.round(bottom)}">${bi || head ? '' : `<h2 class="lr-title">(${esc(String(title).toLowerCase())})</h2>`}${bl.map((it, j) => {
        const [l, t, w, h, dx, dy, lx, ly] = SLOTS[j], q = fits[j], k = bi * per + j;
        const pc = (v, o, d) => ((v - o) / d * 100).toFixed(2) + '%';
        return `<figure class="lr-fig lr-${j + 1}" data-k="${k}" style="left:${(q.l / 12).toFixed(2)}cqw;top:${(q.t / 12).toFixed(2)}cqw;width:${(q.fw / 12).toFixed(2)}cqw;--ar:${it.w || 4}/${it.h || 5};--mw:${(58 * q.fw / w).toFixed(1)}vw">${vid(it)}<i class="lr-dot" style="left:${pc(dx, l, w)};top:${pc(dy, t, h)}"></i><span class="lr-n" style="left:${pc(lx, l, w)};top:${pc(ly, t, h)}">(${String(k + 1).padStart(2, '0')})</span></figure>`;
      }).join('')}</div>`;
    }).join('')}</div>${opts.carousel ? stripHTML(opts.carousel) : ''}`;
    host.appendChild(sub); host.classList.add('lr-open');
    hoverPlay(sub);
    sub.querySelectorAll('.lr-fig, .gx-fig').forEach(f => f.addEventListener('click', () => pageLB(title, items, +f.dataset.k)));
    if (opts.carousel) wireStrip($('.gx-car', sub), k => pageLB(opts.carousel.title || title, opts.carousel.items, k));
    const close = () => { sub.remove(); host.classList.remove('lr-open'); removeEventListener('keydown', onKey, true); };
    const onKey = e => {
      if (!sub.isConnected) return removeEventListener('keydown', onKey, true);
      if (e.key === 'Escape' && !document.querySelector('#lightbox:not([hidden])')) { e.stopImmediatePropagation(); close(); }
    };
    if (back) { addEventListener('keydown', onKey, true); $('.lr-back', sub).addEventListener('click', close); }
    return sub;
  }
  // A Social Media brand's posts as a pinned, Instagram-style grid, all visible at once (Downloads ssspin.io reference video).
  function openGrid(host, title, items) {
    host.querySelector(':scope > .lr')?.remove();
    const sub = document.createElement('section');
    sub.className = 'lr ig';
    sub.innerHTML = `<button class="lr-back">← back</button><h2 class="ig-title">${esc(title)}</h2>
      <div class="ig-grid">${items.map((it, k) => `<button class="ig-card" data-k="${k}" aria-label="${esc(title)} ${k + 1}">${vid(it)}${it.type === 'video' ? '<span class="ig-play" aria-hidden="true">▶</span>' : ''}</button>`).join('')}</div>`;
    host.appendChild(sub); host.classList.add('lr-open');
    hoverPlay(sub);
    sub.querySelectorAll('.ig-card').forEach(c => c.addEventListener('click', () => pageLB(title, items, +c.dataset.k)));
    const close = () => { sub.remove(); host.classList.remove('lr-open'); removeEventListener('keydown', onKey, true); };
    const onKey = e => {
      if (!sub.isConnected) return removeEventListener('keydown', onKey, true);
      if (e.key === 'Escape' && !document.querySelector('#lightbox:not([hidden])')) { e.stopImmediatePropagation(); close(); }
    };
    addEventListener('keydown', onKey, true);
    $('.lr-back', sub).addEventListener('click', close);
  }

  // Social Media > VNEST DUBAI > a category: only that category's reels, in a checkerboard grid with no gaps
  // (vnest/grid reference.jpg). Media and white cells alternate, four across (two on phones); each white cell sits
  // beside its reel and carries that reel's number. A reel opens full screen in the lightbox and plays.
  function openReelGrid(host, heading, lbTitle, items) {
    host.querySelector(':scope > .rg')?.remove();
    const sub = document.createElement('section');
    sub.className = 'lr rg';
    sub.innerHTML = `<button class="lr-back">← back</button><header class="rg-head"><h2>${esc(heading)}</h2><p>${items.length} ${items.every(i => i.type === 'video') ? (items.length === 1 ? 'reel' : 'reels') : 'pieces'}</p></header><div class="rg-grid"></div>`;
    host.appendChild(sub);
    const grid = $('.rg-grid', sub);
    let cols = 0;
    const build = () => {
      const c = grid.clientWidth < 560 ? 2 : 4; if (c === cols) return; cols = c;
      grid.style.setProperty('--c', c);
      const cells = []; let k = 0, r = 0;
      while (k < items.length) {
        for (let col = 0; col < c && k < items.length; col += 2, k++) {
          const it = items[k];
          const m = `<button class="rg-m" data-k="${k}" aria-label="${esc(heading)}, ${k + 1} of ${items.length}">${vid(it)}${it.type === 'video' ? '<i class="vid-play" aria-hidden="true">▶</i>' : ''}</button>`;
          const t = `<span class="rg-t" aria-hidden="true">${String(k + 1).padStart(2, '0')}</span>`;
          cells.push(r % 2 ? t + m : m + t);
        }
        r++;
      }
      grid.innerHTML = cells.join('');
      hoverPlay(grid);
      grid.querySelectorAll('.rg-m').forEach(b => b.addEventListener('click', () => pageLB(lbTitle, items, +b.dataset.k)));
    };
    build();
    const ro = new ResizeObserver(build); ro.observe(grid);
    const close = () => { ro.disconnect(); sub.remove(); removeEventListener('keydown', onKey, true); };
    const onKey = e => {
      if (!sub.isConnected) return removeEventListener('keydown', onKey, true);
      if (e.key === 'Escape' && !document.querySelector('#lightbox:not([hidden])')) { e.stopImmediatePropagation(); close(); }
    };
    addEventListener('keydown', onKey, true);
    $('.lr-back', sub).addEventListener('click', close);
    sub.focus?.();
  }

  // A brand as a case study in numbered chapters (overview, objectives, role, strategy, content, results),
  // after the Behance social media manager portfolio. Text comes from window.SOCIAL_CASE; anything not
  // supplied yet shows a "to supply" note. Used on the Performance Marketing page.
  function caseHTML(key, items, withContent = true) {
    const cs = (window.SOCIAL_CASE || {})[key] || {};
    const todo = t => t ? `<p class="cs-todo"><b>To supply</b>${esc(t)}</p>` : '';
    const list = a => a ? `<ul>${a.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
    const meta = (k, v, t) => `<div><dt>${k}</dt><dd>${v ? esc(v) : `<span class="cs-gap">${esc(t || 'To supply')}</span>`}</dd></div>`;
    const tall = it => (it.h || 5) / (it.w || 4) >= 1.5;
    const cards = (pairs, cls) => `<div class="cs-grid ${cls}">${pairs.map(([it, k]) => `<figure data-k="${k}">${vid(it)}</figure>`).join('')}</div>`;
    const all = items.map((it, k) => [it, k]), feed = all.filter(([it]) => !tall(it)), vert = all.filter(([it]) => tall(it));
    const chapters = [
      ['Overview', `<p>${esc(cs.overview || '')}</p>${todo(cs.overviewTodo)}`],
      ['Objectives', list(cs.objectives) + todo(cs.objectivesTodo)],
      ['My role', list(cs.tasks) + todo(cs.tasksTodo)],
      ['Strategy', list(cs.strategy) + todo(cs.strategyTodo)],
      withContent && ['Content', `${feed.length ? `<h4>Feed posts <sup>${feed.length}</sup></h4>${cards(feed, 'cs-feed')}` : ''}${vert.length ? `<h4>Stories &amp; reels <sup>${vert.length}</sup></h4>${cards(vert, 'cs-tall')}` : ''}`],
      ['Results', (cs.stats ? `<div class="cs-stats">${cs.stats.map(x => `<div><b>${esc(x.n)}</b><span>${esc(x.l)}</span></div>`).join('')}</div>${cs.statsNote ? `<p class="cs-src">Source: ${esc(cs.statsNote)}</p>` : ''}` : '') + list(cs.results) + todo(cs.resultsTodo)]
    ].filter(Boolean);
    return `<div class="cs"><dl class="cs-meta">${meta('Client', cs.client)}${meta('Role', cs.role, cs.roleTodo)}${meta('Period', cs.period)}${meta('Platforms', cs.platforms)}</dl>
      ${chapters.map(([t, h], i) => `<article class="cs-ch${t === 'Content' ? ' cs-content' : ''}"><h3><b>${i + 1}.</b>${t}</h3><div class="cs-body">${h}</div></article>`).join('')}</div>`;
  }
  // Social Media > KSHITIJ JALORI: the content of uditi.framer.website/kj (logo, intro, two grid + phone rows),
  // centred in the page. Its header, footer links and packaging section are left out.
  function openKJ(host) {
    const K = window.KJ_PAGE; if (!K) return false;
    host.querySelector(':scope > .lr')?.remove();
    const pics = [...K.grid1, ...K.grid2].map(x => ({ type: 'image', thumb: x.src, ...x }));
    const grid = (g, off) => `<div class="kjp-grid">${g.map((x, k) => `<button class="kjp-card" data-k="${off + k}" aria-label="Kshitij Jalori post ${off + k + 1}"><img src="${x.src}" alt="" draggable="false" loading="lazy"></button>`).join('')}</div>`;
    const phone = (v, k) => `<button class="kjp-phone" data-v="${k}" aria-label="Play Kshitij Jalori video ${k + 1}"><video src="${v.src}" poster="${v.poster}" muted loop playsinline preload="metadata"></video><span class="vid-play" aria-hidden="true">▶</span></button>`;
    const sub = document.createElement('section');
    sub.className = 'lr kjp';
    sub.innerHTML = `<button class="lr-back">← back</button><div class="kjp-c">
      <header class="kjp-head"><img class="kjp-logo" src="${K.logo}" alt="Kshitij Jalori, Ajmer" draggable="false"><p class="kjp-text">${K.text.map(esc).join(' <br>')}</p></header>
      <div class="kjp-row">${grid(K.grid1, 0)}${phone(K.phones[0], 0)}</div>
      <div class="kjp-row">${phone(K.phones[1], 1)}${grid(K.grid2, 9)}</div>
    </div>`;
    host.appendChild(sub); host.classList.add('lr-open');
    sub.querySelectorAll('.kjp-card').forEach(c => c.addEventListener('click', () => pageLB('Kshitij Jalori', pics, +c.dataset.k)));
    sub.querySelectorAll('.kjp-phone').forEach(b => b.addEventListener('click', () => pageLB('Kshitij Jalori', K.phones, +b.dataset.v)));
    // The phone recordings play while they are on screen.
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause()), { root: sub, threshold: .25 });
    sub.querySelectorAll('video').forEach(v => io.observe(v));
    const close = () => { io.disconnect(); sub.remove(); host.classList.remove('lr-open'); removeEventListener('keydown', onKey, true); };
    const onKey = e => {
      if (!sub.isConnected) return removeEventListener('keydown', onKey, true);
      if (e.key === 'Escape' && !document.querySelector('#lightbox:not([hidden])')) { e.stopImmediatePropagation(); close(); }
    };
    addEventListener('keydown', onKey, true);
    $('.lr-back', sub).addEventListener('click', close);
    return true;
  }
  // The short description under a Social Media brand's heading (window.PROJECTS summary).
  const socIntro = id => { const s = (window.PROJECTS[id] || {}).summary; return s ? `<p class="soc-intro">${esc(s)}</p>` : ''; };
  // A sideways two-finger swipe on a trackpad (or shift + mouse wheel) over `el` calls step(+1 / -1) once per gesture.
  function wheelSwipe(el, step) {
    let acc = 0, lock = 0, idle;
    el.addEventListener('wheel', e => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!dx) return;
      e.preventDefault();
      clearTimeout(idle); idle = setTimeout(() => { acc = 0; lock = 0; }, 180);
      if (lock) return;
      acc += dx;
      if (Math.abs(acc) > 30) { step(acc > 0 ? 1 : -1); acc = 0; lock = 1; }
    }, { passive: false });
  }

  // Social Media > DIVYAM MEHTA, from Uditi's wireframe: a carousel beside a 3x3 feed, a shoot strip that scrolls on
  // its own, then the two videos (played one after the other) beside a second carousel. Carousels advance by
  // themselves until a visitor clicks, drags or uses the arrows.
  function openDM(host) {
    const D = window.DM_PAGE; if (!D) return false;
    host.querySelector(':scope > .lr')?.remove();
    const title = 'Divyam Mehta', calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const media = (it, cls = '') => it.type === 'video'
      ? `<video class="${cls}" src="${it.src}" poster="${it.poster}" muted playsinline preload="none" aria-label="${title} video"></video>`
      : `<img class="${cls}" src="${it.src}" alt="" draggable="false" loading="lazy">`;
    const slides = (its, lbl) => its.map((it, k) => `<figure class="dm-slide" role="group" aria-roledescription="slide" aria-label="${lbl} ${k + 1} of ${its.length}" data-k="${k}">${media(it)}</figure>`).join('');
    const car = (key, label, auto) => `<div class="dm-car" data-key="${key}"${auto ? ' data-auto' : ''} role="region" aria-roledescription="carousel" aria-label="${label}" tabindex="0">
        <div class="dm-view"><div class="dm-track">${slides(D[key], 'Slide')}</div></div>
        <div class="dm-bar"><span class="dm-dots" aria-hidden="true">${D[key].map(() => '<i></i>').join('')}</span></div></div>`;
    const sub = document.createElement('section');
    sub.className = 'lr dm';
    sub.innerHTML = `<button class="lr-back">← back</button><div class="dm-c">
      <h2 class="dm-h">Divyam Mehta</h2>${socIntro('dm')}
      <div class="dm-row dm-r1">
        <div>${car('carousel1', 'Carousel 1', true)}</div>
        <div class="dm-feed">${D.feed.map((it, k) => `<button class="dm-tile" data-k="${k}" aria-label="Feed post ${k + 1}"><img src="${it.thumb}" alt="" draggable="false" loading="lazy"></button>`).join('')}</div>
      </div>
      <div class="dm-shoot" role="region" aria-label="Shoot photographs, scrolling" tabindex="0">
        <div class="dm-run">${[0, 1].map(c => D.shoot.map((it, k) => `<button class="dm-shot" data-k="${k}"${c ? ' aria-hidden="true" tabindex="-1"' : ''} aria-label="Photograph ${k + 1} of ${D.shoot.length}" style="aspect-ratio:${it.w}/${it.h}"><img src="${it.thumb}" alt="" draggable="false" loading="lazy"></button>`).join('')).join('')}</div>
      </div>
      <div class="dm-row dm-r3">
        <div class="dm-car dm-vid" data-key="videos" role="region" aria-roledescription="carousel" aria-label="Videos" tabindex="0">
          <div class="dm-view"><div class="dm-track">${slides(D.videos, 'Video')}</div><span class="vid-play" aria-hidden="true">▶</span></div>
          <div class="dm-bar"><span class="dm-dots" aria-hidden="true">${D.videos.map(() => '<i></i>').join('')}</span></div></div>
        <div>${car('carousel2', 'Carousel 2', true)}</div>
      </div>
    </div>`;
    host.appendChild(sub); host.classList.add('lr-open');
    const timers = [];

    // Videos only load and play while their slide is showing and on screen; none play with sound.
    const seen = new Set();
    const io = new IntersectionObserver(es => es.forEach(e => { e.isIntersecting ? seen.add(e.target) : seen.delete(e.target); e.target._sync?.(); }), { root: sub, threshold: .3 });
    const syncVideos = root => root.querySelectorAll('.dm-slide video').forEach(v => {
      const on = seen.has(root) && +v.closest('.dm-slide').dataset.k === root._i;
      if (on) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
    });

    // One image (or video) at a time; drag, swipe, buttons or arrow keys move it.
    sub.querySelectorAll('.dm-car').forEach(root => {
      const track = $('.dm-track', root), view = $('.dm-view', root), n = track.children.length;
      const items = D[root.dataset.key], isVid = root.classList.contains('dm-vid');
      root._i = 0;
      const go = k => {
        root._i = ((k % n) + n) % n;
        track.style.transform = `translateX(${-root._i * 100}%)`;
        [...track.children].forEach((s, j) => s.setAttribute('aria-hidden', j !== root._i));
        root.querySelectorAll('.dm-dots i').forEach((d, j) => d.classList.toggle('on', j === root._i));
        root.querySelectorAll('.dm-slide video').forEach(v => { if (+v.closest('.dm-slide').dataset.k !== root._i) v.currentTime = 0; });
        syncVideos(root);
      };
      // Image carousels step on their own at a steady pace until the visitor takes over.
      let manual = !root.hasAttribute('data-auto') || calm;
      const stop = () => { manual = true; };
      if (!manual) timers.push(setInterval(() => { if (!manual && seen.has(root)) go(root._i + 1); }, 3200));
      // The two videos play one after the other.
      if (isVid) root.querySelectorAll('video').forEach(v => v.addEventListener('ended', () => go(root._i + 1)));
      root._sync = () => syncVideos(root);
      wheelSwipe(view, d => { stop(); go(Math.max(0, Math.min(n - 1, root._i + d))); });
      root.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); stop(); go(root._i + (e.key === 'ArrowRight' ? 1 : -1)); }
      });
      let x0 = null, dx = 0, moved = false;
      view.addEventListener('pointerdown', e => { stop(); x0 = e.clientX; dx = 0; moved = false; view.setPointerCapture(e.pointerId); track.style.transition = 'none'; });
      view.addEventListener('pointermove', e => { if (x0 === null) return; dx = e.clientX - x0; if (Math.abs(dx) > 6) moved = true; track.style.transform = `translateX(calc(${-root._i * 100}% + ${dx}px))`; });
      const end = () => {
        if (x0 === null) return; x0 = null; track.style.transition = '';
        const k = root._i + (Math.abs(dx) > view.clientWidth * .15 ? (dx < 0 ? 1 : -1) : 0);
        go(Math.max(0, Math.min(n - 1, k)));
      };
      view.addEventListener('pointerup', end); view.addEventListener('pointercancel', end);
      // A click (not a drag) moves an image carousel on to its next slide, wrapping round at the end.
      if (!isVid) view.addEventListener('click', () => { if (!moved) { stop(); go(root._i + 1); } });
      else view.addEventListener('click', () => { if (!moved) pageLB(title, items, root._i); });
      io.observe(root);
      go(0);
    });

    // Feed: a 3x3 grid in file order; a tile opens the post at full size.
    sub.querySelectorAll('.dm-tile').forEach(t => t.addEventListener('click', () => pageLB(title, D.feed, +t.dataset.k)));

    // Shoot: two copies of the photographs drift left in an endless loop; dragging moves the strip by hand.
    const shoot = $('.dm-shoot', sub), run = $('.dm-run', shoot);
    let off = 0, held = false, sx = 0, start = 0, smoved = false, last = performance.now(), raf;
    const half = () => run.scrollWidth / 2;
    const tick = now => {
      const dt = Math.min(64, now - last); last = now;
      if (!held && !calm && seen.has(shoot)) off -= dt * .045;
      const h = half(); if (h) { off %= h; if (off > 0) off -= h; }
      run.style.transform = `translate3d(${off}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    io.observe(shoot);
    shoot.addEventListener('pointerdown', e => { held = true; sx = e.clientX; start = off; smoved = false; });
    shoot.addEventListener('pointermove', e => { if (!held) return; if (e.pointerType === 'mouse' && !e.buttons) { held = false; return; } const d = e.clientX - sx; if (Math.abs(d) > 6 && !smoved) { smoved = true; shoot.setPointerCapture(e.pointerId); } off = start + d; });
    const release = () => { held = false; };
    shoot.addEventListener('pointerup', release); shoot.addEventListener('pointercancel', release);
    shoot.addEventListener('keydown', e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); off += e.key === 'ArrowRight' ? -240 : 240; } });
    shoot.addEventListener('wheel', e => { const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0; if (dx) { e.preventDefault(); off -= dx; } }, { passive: false });
    shoot.querySelectorAll('.dm-shot').forEach(b => b.addEventListener('click', () => { if (!smoved) pageLB(title, D.shoot, +b.dataset.k); }));

    const close = () => { io.disconnect(); cancelAnimationFrame(raf); timers.forEach(clearInterval); sub.remove(); host.classList.remove('lr-open'); removeEventListener('keydown', onKey, true); };
    const onKey = e => {
      if (!sub.isConnected) return removeEventListener('keydown', onKey, true);
      if (e.key === 'Escape' && !document.querySelector('#lightbox:not([hidden])')) { e.stopImmediatePropagation(); close(); }
    };
    addEventListener('keydown', onKey, true);
    $('.lr-back', sub).addEventListener('click', close);
    return true;
  }

  // Social Media > MAYIN INDIA: a looping row of notched phone screens that slides on its own, three in view with the
  // middle one enlarged (mobile layout ref.mp4),
  // two carousels moved by swipe or drag, and a shoot gallery with the active photograph enlarged.
  function openMY(host) {
    const D = window.MY_PAGE; if (!D) return false;
    host.querySelector(':scope > .lr')?.remove();
    const title = 'Mayin India', calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const car = (key, label) => `<div class="dm-car my-car" data-key="${key}" role="region" aria-roledescription="carousel" aria-label="${label}" tabindex="0">
        <div class="dm-view"><div class="dm-track">${D[key].map((it, k) => `<figure class="dm-slide" role="group" aria-roledescription="slide" aria-label="${k + 1} of ${D[key].length}" data-k="${k}"><img src="${it.src}" alt="" draggable="false" loading="lazy" width="${it.w}" height="${it.h}"></figure>`).join('')}</div></div>
        <div class="dm-bar my-bar"><span class="my-count" aria-live="polite"></span></div></div>`;
    const sub = document.createElement('section');
    sub.className = 'lr dm my';
    sub.innerHTML = `<button class="lr-back">← back</button><div class="dm-c">
      <h2 class="dm-h">Mayin India</h2>${socIntro('mayin')}
      <div class="my-phones" role="region" aria-roledescription="carousel" aria-label="Instagram posts on phone screens" tabindex="0">${D.phones.map((it, k) => `<button class="my-phone" data-k="${k}" aria-label="Post ${k + 1} of ${D.phones.length}"><img src="${it.src}" alt="" draggable="false"><i class="my-notch" aria-hidden="true"></i></button>`).join('')}</div>
      <div class="my-cars">${car('carousel1', 'Carousel 1')}${car('carousel2', 'Carousel 2')}</div>
      <div class="my-shoot" role="region" aria-roledescription="carousel" aria-label="Shoot photographs" tabindex="0">
        <div class="my-stage"><div class="my-strip">${D.shoot.map((it, k) => `<button class="my-shot" data-k="${k}" aria-label="Photograph ${k + 1} of ${D.shoot.length}"><img src="${it.thumb}" alt="" draggable="false" loading="lazy"></button>`).join('')}</div></div>
        <div class="dm-bar my-sbar"><span class="my-count" aria-live="polite"></span></div>
      </div>
    </div>`;
    host.appendChild(sub); host.classList.add('lr-open');
    const seen = new Set();
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)), { root: sub, threshold: .2 });

    // Phones: one looping row. p is the (fractional) index of the phone in the middle; every phone is placed from its
    // distance to p, so the middle one is full size and its neighbours smaller, and the row glides on by itself.
    const row = $('.my-phones', sub), phones = [...row.children], np = phones.length;
    let p = 0, from = 0, to = 0, t0 = performance.now(), dur = 0, rest = 0, drag = null, dx = 0, moved = false, raf, wheelIdle;
    const wrap = d => ((d % np) + np + np / 2) % np - np / 2;
    const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    const goTo = (k, ms = 900) => { from = p; to = k; t0 = performance.now(); dur = calm ? 0 : ms; };
    const hold = () => { rest = performance.now() + 4000; };          // after a visitor moves it, wait before carrying on
    const placePhones = () => {
      const w = phones[0].offsetWidth, gap = Math.max(14, w * .1);
      phones.forEach((ph, k) => {
        const d = wrap(k - p), a = Math.abs(d), sg = Math.sign(d);
        const sc = a <= 1 ? 1 - a * .2 : .8;
        const x = sg * (a <= 1 ? a * (w * .9 + gap) : w * .9 + gap + (a - 1) * (w * .8 + gap));
        ph.style.transform = `translate3d(${x}px, 0, 0) scale(${sc})`;
        ph.style.opacity = a <= 1.2 ? 1 : Math.max(0, 1 - (a - 1.2) / .6);
        ph.style.zIndex = 100 - Math.round(a * 10);
        ph.classList.toggle('on', a < .5); ph.tabIndex = a < .5 ? 0 : -1;
        ph.setAttribute('aria-hidden', a > 1.5);
      });
    };
    const tickPhones = now => {
      if (drag === null) {
        if (now - t0 < dur) p = from + (to - from) * ease((now - t0) / dur);
        else { p = to; if (!calm && now > rest && seen.has(row) && now - t0 - dur > 2200) goTo(Math.round(to) + 1); }
      }
      placePhones(); raf = requestAnimationFrame(tickPhones);
    };
    io.observe(row);
    row.addEventListener('pointerdown', e => { drag = { x: e.clientX, p }; dx = 0; moved = false; });
    row.addEventListener('pointermove', e => { if (drag === null) return; if (e.pointerType === 'mouse' && !e.buttons) return letGo(); dx = e.clientX - drag.x; if (Math.abs(dx) > 6 && !moved) { moved = true; row.setPointerCapture(e.pointerId); } if (moved) p = drag.p - dx / (phones[0].offsetWidth * 1.05); });
    const letGo = () => { if (drag === null) return; drag = null; if (moved) { hold(); goTo(Math.round(p), 450); } };
    row.addEventListener('pointerup', letGo); row.addEventListener('pointercancel', letGo);
    row.addEventListener('wheel', e => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!d) return;
      e.preventDefault(); hold();
      p += d / (phones[0].offsetWidth * 1.05); from = to = p; dur = 0;
      clearTimeout(wheelIdle); wheelIdle = setTimeout(() => goTo(Math.round(p), 420), 140);
    }, { passive: false });
    row.addEventListener('keydown', e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); hold(); goTo(Math.round(to) + (e.key === 'ArrowRight' ? 1 : -1)); } });
    phones.forEach((ph, k) => ph.addEventListener('click', () => {
      if (moved) return;
      hold();
      if (ph.classList.contains('on')) openLightbox({ title, items: D.phones.map(x => ({ type: 'image', src: x.src, thumb: x.src })) }, k);
      else goTo(Math.round(to) + wrap(k - Math.round(to)));
    }));
    raf = requestAnimationFrame(tickPhones);

    // Carousels: one post at a time, moved by drag, swipe, the arrows or the keyboard; no automatic advance.
    sub.querySelectorAll('.my-car').forEach(root => {
      const track = $('.dm-track', root), view = $('.dm-view', root), items = D[root.dataset.key], n = items.length;
      let i = 0;
      const go = k => {
        i = Math.max(0, Math.min(n - 1, k));
        track.style.transform = `translateX(${-i * 100}%)`;
        [...track.children].forEach((s, j) => s.setAttribute('aria-hidden', j !== i));
        $('.my-count', root).textContent = `${i + 1} / ${n}`;
      };
      wheelSwipe(view, d => go(i + d));
      root.addEventListener('keydown', e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); go(i + (e.key === 'ArrowRight' ? 1 : -1)); } });
      let x0 = null, dx = 0, moved = false;
      view.addEventListener('pointerdown', e => { x0 = e.clientX; dx = 0; moved = false; view.setPointerCapture(e.pointerId); track.style.transition = 'none'; });
      view.addEventListener('pointermove', e => { if (x0 === null) return; dx = e.clientX - x0; if (Math.abs(dx) > 6) moved = true; track.style.transform = `translateX(calc(${-i * 100}% + ${dx}px))`; });
      const end = () => { if (x0 === null) return; x0 = null; track.style.transition = ''; go(i + (Math.abs(dx) > view.clientWidth * .15 ? (dx < 0 ? 1 : -1) : 0)); };
      view.addEventListener('pointerup', end); view.addEventListener('pointercancel', end);
      // A click (not a drag) moves on to the next post, wrapping round at the end.
      view.addEventListener('click', () => { if (!moved) go((i + 1) % n); });
      go(0);
    });

    // Shoot: the active photograph is enlarged, its neighbours stay smaller on either side.
    const shoot = $('.my-shoot', sub), stage = $('.my-stage', shoot), shots = [...shoot.querySelectorAll('.my-shot')], S = D.shoot;
    let si = 0;
    const place = () => {
      const H = stage.clientHeight, W = stage.clientWidth, gap = Math.max(10, W * .014);
      const size = S.map((it, k) => { const h = k === si ? H : H * .62; return [h * it.w / it.h, h]; });
      let x = 0; const xs = size.map(([w]) => { const at = x; x += w + gap; return at; });
      const shift = W / 2 - (xs[si] + size[si][0] / 2);
      shots.forEach((b, k) => {
        const [w, h] = size[k];
        b.style.width = w + 'px'; b.style.height = h + 'px';
        b.style.transform = `translate(${xs[k] + shift}px, ${(H - h) / 2}px)`;
        b.classList.toggle('on', k === si); b.tabIndex = k === si ? 0 : -1;
        const img = $('img', b); if (Math.abs(k - si) <= 1 && img.dataset.full !== '1') { img.src = S[k].src; img.dataset.full = '1'; }
      });
      $('.my-count', shoot).textContent = `${si + 1} / ${S.length}`;
    };
    const sgo = k => { si = Math.max(0, Math.min(S.length - 1, k)); place(); };
    wheelSwipe(stage, d => sgo(si + d));
    shoot.addEventListener('keydown', e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); sgo(si + (e.key === 'ArrowRight' ? 1 : -1)); } });
    let sx = null, sdx = 0, smoved = false;
    stage.addEventListener('pointerdown', e => { sx = e.clientX; sdx = 0; smoved = false; });
    stage.addEventListener('pointermove', e => { if (sx !== null) { sdx = e.clientX - sx; if (Math.abs(sdx) > 6) smoved = true; } });
    const send = () => { if (sx === null) return; sx = null; if (Math.abs(sdx) > 40) sgo(si + (sdx < 0 ? 1 : -1)); };
    stage.addEventListener('pointerup', send); stage.addEventListener('pointercancel', send); stage.addEventListener('pointerleave', send);
    shots.forEach((b, k) => b.addEventListener('click', () => { if (smoved) return; k === si ? pageLB(title, S, k) : sgo(k); }));
    const ro = new ResizeObserver(place); ro.observe(stage);
    sgo(0);

    const close = () => { io.disconnect(); ro.disconnect(); cancelAnimationFrame(raf); sub.remove(); host.classList.remove('lr-open'); removeEventListener('keydown', onKey, true); };
    const onKey = e => {
      if (!sub.isConnected) return removeEventListener('keydown', onKey, true);
      if (e.key === 'Escape' && !document.querySelector('#lightbox:not([hidden])')) { e.stopImmediatePropagation(); close(); }
    };
    addEventListener('keydown', onKey, true);
    $('.lr-back', sub).addEventListener('click', close);
    return true;
  }

  // Social Media > VNEST DUBAI: the logo above six rounded placards (COVER REFERENCE.mp4). The active card is largest,
  // its neighbours sit smaller behind it; the row turns on its own, pauses on a click, and can be dragged or swiped.
  function openVN(host) {
    const V = window.VN_PAGE; if (!V) return false;
    host.querySelector(':scope > .lr')?.remove();
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches, n = V.cards.length;
    const sub = document.createElement('section');
    sub.className = 'lr dm vn';
    sub.innerHTML = `<button class="lr-back">← back</button><div class="dm-c vn-c">
      <img class="vn-logo" src="${V.logo}" alt="Vnest" draggable="false">${socIntro('vnest')}
      <div class="vn-gal" role="region" aria-roledescription="carousel" aria-label="Vnest content categories">
        <button class="vn-play">Pause automatic movement</button>
        <div class="vn-stage">${V.cards.map((c, k) => `<button class="vn-card" data-k="${k}" aria-label="${esc(c.title)}"><img src="${c.src}" alt="" draggable="false" style="object-position:${c.pos}"><span>${esc(c.title)}</span>${c.project && (project(c.project)?.raw || []).some(i => i.type === 'video') ? '<i class="vid-play" aria-hidden="true">▶</i>' : ''}</button>`).join('')}</div>
      </div>
    </div>`;
    host.appendChild(sub); host.classList.add('lr-open');
    const gal = $('.vn-gal', sub), stage = $('.vn-stage', sub), cards = [...stage.children], play = $('.vn-play', sub);
    // Videos come from a project; image-only categories (Creatives) from a bundle in media/home/ds2.
    const openCat = k => {
      const c = V.cards[k], p = c.project && project(c.project), t = `Vnest · ${c.title}`;
      setPaused(true);
      const show = its => openReelGrid(host, c.title, t, its);
      const imgs = u => u.map(src => ({ type: 'image', src }));
      if (p && c.bundle) bundle(c.bundle).then(u => show([...p.raw, ...imgs(u)]));
      else if (p) show(p.raw);
      else if (c.bundle) bundle(c.bundle).then(u => show(imgs(u)));
    };
    // p is the (fractional) index of the card in front; every card is placed from its distance to p.
    let p = 0, from = 0, to = 0, t0 = 0, dur = 0, paused = calm, focusIn = false, hold = 0, intro = calm ? 1 : 0, raf;
    const wrap = d => ((d % n) + n + n / 2) % n - n / 2;
    const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    const place = () => {
      const w = cards[0].offsetWidth;
      cards.forEach((c, k) => {
        const d = wrap(k - p), a = Math.abs(d), sg = Math.sign(d);
        const x = sg * (a <= 1 ? a * .62 : .62 + (a - 1) * .4) * w * intro;
        const sc = a <= 1 ? 1 - a * .22 : .78 - (a - 1) * .18;
        const op = (a <= 1 ? 1 : a <= 2 ? 1 - (a - 1) * .45 : .55 * Math.max(0, (2.3 - a) / .3)) * (a < .5 ? 1 : intro);
        c.style.transform = `translate3d(${x}px, 0, 0) scale(${sc})`;
        c.style.opacity = op; c.style.zIndex = 100 - Math.round(a * 10);
        c.classList.toggle('on', a < .5); c.tabIndex = a < .5 ? 0 : -1;
        c.setAttribute('aria-hidden', a > 1.5);
      });
    };
    const goTo = (k, ms = 1000) => { from = p; to = k; t0 = performance.now(); dur = calm ? 0 : ms; };
    const step = d => goTo(Math.round(to) + d);
    const setPaused = v => { paused = v; play.textContent = v ? 'Resume automatic movement' : 'Pause automatic movement'; };
    const tick = now => {
      if (intro < 1) intro = Math.min(1, intro + 16 / 900);
      if (drag === null) {
        if (now - t0 < dur) p = from + (to - from) * ease((now - t0) / dur);
        else { p = to; if (intro >= 1 && !paused && !focusIn && !document.hidden && now - t0 - dur > 3000) step(1); }
      }
      place(); raf = requestAnimationFrame(tick);
    };
    // Drag or swipe: the row follows the pointer; letting go settles on the nearest card. A short press is a click.
    let drag = null, dx = 0, moved = false;
    stage.addEventListener('pointerdown', e => { drag = { x: e.clientX, p }; dx = 0; moved = false; });
    stage.addEventListener('pointermove', e => {
      if (drag === null) return; if (e.pointerType === 'mouse' && !e.buttons) return release();
      dx = e.clientX - drag.x; if (Math.abs(dx) > 6 && !moved) { moved = true; stage.setPointerCapture(e.pointerId); }
      if (moved) p = drag.p - dx / (cards[0].offsetWidth * .62);
    });
    const release = () => { if (drag === null) return; drag = null; if (moved) { setPaused(true); from = p; goTo(Math.round(p), 450); } };
    stage.addEventListener('pointerup', release); stage.addEventListener('pointercancel', release);
    // A sideways trackpad swipe (or shift + wheel) slides the whole row with the fingers, then settles on the nearest card.
    let wheelIdle;
    stage.addEventListener('wheel', e => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!d) return;
      e.preventDefault(); setPaused(true);
      p += d / (cards[0].offsetWidth * .62); from = to = p; dur = 0;
      clearTimeout(wheelIdle); wheelIdle = setTimeout(() => goTo(Math.round(p), 420), 140);
    }, { passive: false });
    cards.forEach((c, k) => c.addEventListener('click', () => {
      if (moved) return;
      if (c.classList.contains('on')) openCat(k);                  // the card in front: open its reels
      else goTo(Math.round(to) + wrap(k - Math.round(to)));      // a card behind: bring it forward
    }));
    play.addEventListener('click', () => setPaused(!paused));
    gal.addEventListener('focusin', () => { focusIn = true; });
    gal.addEventListener('focusout', e => { if (!gal.contains(e.relatedTarget)) focusIn = false; });
    gal.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); step(e.key === 'ArrowRight' ? 1 : -1); requestAnimationFrame(() => cards.find(c => c.classList.contains('on'))?.focus({ preventScroll: true })); }
    });
    t0 = performance.now(); raf = requestAnimationFrame(tick);
    const close = () => { cancelAnimationFrame(raf); host.querySelector(':scope > .rg')?.remove(); sub.remove(); host.classList.remove('lr-open'); removeEventListener('keydown', onKey, true); };
    const onKey = e => {
      if (!sub.isConnected) return removeEventListener('keydown', onKey, true);
      if (e.key === 'Escape' && !document.querySelector('#lightbox:not([hidden])') && !host.querySelector(':scope > .rg')) { e.stopImmediatePropagation(); close(); }
    };
    addEventListener('keydown', onKey, true);
    $('.lr-back', sub).addEventListener('click', close);
    return true;
  }

  // Design > a folder as a deck of landscape spreads, after the madelineweeden_ssspin.io GIF: a cover with the name on a
  // sage panel, an about spread, then split spreads (matted work on colour panels, full-bleed halves, a scattered
  // collage) and an index grid. One spread at a time; it turns on its own, or by click, drag, swipe or keys.
  function openDeck(host, key) {
    const D = (window.DS_PAGE || {})[key]; if (!D) return false;
    host.querySelector(':scope > .lr')?.remove();
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches, imgs = D.images;
    const img = (it, fit) => `<img ${it.c ? `data-c="${it.c}" data-i="${it.i}"` : `src="${it.src}" loading="lazy"`} alt="" draggable="false" style="object-fit:${fit || (it.kind === 'photo' ? 'cover' : 'contain')}">`;
    // Size a box (bw x bh, in % of a page or spread) to an image's shape. Pages are 8:9, spreads 16:9.
    const fit = (it, bw, bh, hw) => { const ar = it.w / it.h; return ar > bw / (bh * hw) ? `width:${bw}%;height:${bw / (ar * hw)}%` : `height:${bh}%;width:${bh * hw * ar}%`; };
    const at = (cx, cy) => `left:${cx}%;top:${cy}%`;
    const mat = (it, bw, bh, cx, cy, hw = 1.125) => `<figure class="dk-mat" style="${at(cx, cy)};${fit(it, bw, bh, hw)}">${img(it, 'cover')}</figure>`;
    const meta = D.meta.map(([k, ...v]) => `<div><dt>${esc(k)}</dt><dd>${v.map(esc).join('<br>')}</dd></div>`).join('');
    const spreads = [];
    const spread = (L, R, lc = '', rc = '') => spreads.push(`<div class="dk-pg ${lc}">${L}</div><div class="dk-pg ${rc}">${R}</div>`);
    // 1. Cover: the work peeks over a pale sage panel that carries the name.
    const c0 = imgs[D.cover || 0];
    spreads.push(`<div class="dk-band"><figure class="dk-peek">${img(c0, c0.kind === 'photo' ? 'cover' : 'contain')}</figure></div>
      <div class="dk-panel"><small>Design</small><h2>${esc(D.title)}</h2><p class="dk-mono">${esc(D.sub)}</p><dl class="dk-meta">${meta}</dl></div>`);
    // 2. About: work on the left under a big word, the story on the right.
    spread(`${mat(imgs[0], 80, 62, 50, 40)}<h3 class="dk-big">About</h3>`, `<p class="dk-mono dk-txt">${esc(D.about)}</p><dl class="dk-meta dk-meta-v">${meta}</dl>`, 'cream', 'paper');
    // 3. The rest of the work, through the reference's split layouts in turn.
    const queue = imgs.slice(1), looks = ['framed', 'bleed', 'pair', 'collage'];
    let n = 0;
    while (queue.length) {
      const look = looks[n++ % looks.length];
      if (look === 'framed' || queue.length < 2) {
        const it = queue.shift();
        spread(`<p class="dk-mono dk-q">${esc(D.title)} — ${esc(D.label)}</p><h3 class="dk-big">${esc(D.label)}</h3>`, mat(it, 70, 74, 50, 50), 'cream', n % 2 ? 'sage' : 'taupe');
      } else if (look === 'bleed') {
        const it = queue.shift();
        spread(`<h3 class="dk-mid">${esc(D.label)}<br>${esc(D.title)}</h3>`, it.kind === 'photo' ? `<figure class="dk-bleed">${img(it, 'cover')}</figure>` : mat(it, 80, 80, 50, 50), n % 3 ? 'blue' : 'taupe', it.kind === 'photo' ? '' : 'paper');
      } else if (look === 'pair') {
        const a = queue.shift(), b = queue.shift();
        spread(mat(a, 72, 78, 46, 50), `${mat(b, 46, 40, 50, 33)}<h3 class="dk-mid dk-low">${esc(D.title)}</h3><p class="dk-mono dk-cap">${esc(D.sub)}</p>`, 'cream', 'sage');
      } else {
        const take = queue.splice(0, Math.min(3, queue.length));
        const spots = [[18, 30, 20, 34], [52, 72, 22, 40], [84, 34, 22, 40]];
        spreads.push(`<div class="dk-collage">${take.map((it, k) => { const [cx, cy, bw, bh] = spots[k]; return `<figure class="dk-mat" style="${at(cx, cy)};${fit(it, bw, bh, .5625)}">${img(it, 'cover')}</figure>`; }).join('')}<h3 class="dk-across">Selected work</h3></div>`);
      }
    }
    // 4. Index: every piece in a grid, as on the reference's "Projects" spread.
    if (imgs.length >= 6) spread(`<ol class="dk-list dk-mono">${imgs.map((it, k) => `<li><span>${String(k + 1).padStart(2, '0')}</span>${esc(D.title)}</li>`).join('')}</ol><h3 class="dk-big">Work</h3>`,
      `<div class="dk-grid">${imgs.map(it => `<i>${img(it, 'cover')}</i>`).join('')}</div>`, 'cream', 'paper');
    const total = spreads.length;
    const sub = document.createElement('section');
    sub.className = 'lr dk';
    sub.innerHTML = `<button class="lr-back">← back</button>
      <div class="dk-stage" role="region" aria-roledescription="carousel" aria-label="${esc(D.title)}" tabindex="0">${spreads.map((h, k) => `<section class="dk-s${k ? '' : ' dk-cover'}" aria-roledescription="slide" aria-label="${k + 1} of ${total}">${h}<footer class="dk-ft"><span>Uditi Bokolia<br>${esc(D.title)}</span><span>${String(k + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}</span><span>Design<br>Portfolio</span></footer></section>`).join('')}</div>`;
    host.appendChild(sub); host.classList.add('lr-open');
    // Bundled images ({c, i}) fill in once their bundle arrives.
    [...new Set(imgs.filter(it => it.c).map(it => it.c))].forEach(c =>
      bundle(c).then(u => sub.querySelectorAll(`img[data-c="${c}"]`).forEach(im => { im.src = u[+im.dataset.i]; })));
    const stage = $('.dk-stage', sub), all = [...stage.children];
    let i = 0, rest = 0, timer;
    const show = k => {
      i = (k + total) % total;
      all.forEach((s, j) => { s.classList.toggle('on', j === i); s.classList.toggle('past', j < i); s.setAttribute('aria-hidden', j !== i); });
    };
    const go = d => { rest = Date.now() + 6000; show(i + d); };
    const stacked = () => matchMedia('(max-width: 760px)').matches;   // phones: spreads stack and scroll instead
    if (!calm) timer = setInterval(() => { if (!stacked() && Date.now() > rest && !document.hidden) show(i + 1); }, 3800);
    let x0 = null, dx = 0, moved = false;
    stage.addEventListener('pointerdown', e => { if (stacked()) return; x0 = e.clientX; dx = 0; moved = false; });
    stage.addEventListener('pointermove', e => { if (x0 !== null) { dx = e.clientX - x0; if (Math.abs(dx) > 8) moved = true; } });
    stage.addEventListener('pointerup', () => { if (x0 === null) return; x0 = null; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); });
    stage.addEventListener('click', () => { if (!moved && !stacked()) go(1); moved = false; });
    wheelSwipe(stage, d => { if (!stacked()) go(d); });
    stage.addEventListener('keydown', e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); go(e.key === 'ArrowRight' ? 1 : -1); } });
    show(0);
    const close = () => { clearInterval(timer); sub.remove(); host.classList.remove('lr-open'); removeEventListener('keydown', onKey, true); };
    const onKey = e => {
      if (!sub.isConnected) return removeEventListener('keydown', onKey, true);
      if (e.key === 'Escape' && !document.querySelector('#lightbox:not([hidden])')) { e.stopImmediatePropagation(); close(); }
    };
    addEventListener('keydown', onKey, true);
    $('.lr-back', sub).addEventListener('click', close);
    return true;
  }

  // Image bundles for the long Design pages: media/home/ds2/<name>.js calls DSX(name, [data URIs]) once loaded.
  const dsx = {}, dsxWait = {};
  window.DSX = (name, uris) => { dsx[name] = uris; (dsxWait[name] || []).forEach(f => f(uris)); delete dsxWait[name]; };
  // Bundles are read as data with fetch: the Artifact host does not run <script> tags added after the page loads.
  // Injecting a script stays as the fallback for when fetch is unavailable (e.g. opened from file://).
  const bundle = name => new Promise(res => {
    if (dsx[name]) return res(dsx[name]);
    if (!dsxWait[name]) {
      dsxWait[name] = [];
      const url = `media/home/ds2/${name}.js`;
      fetch(url).then(r => { if (!r.ok) throw r.status; return r.text(); })
        .then(t => window.DSX(name, JSON.parse(t.slice(t.indexOf(',') + 1, t.lastIndexOf(')')))))
        .catch(() => { const s = document.createElement('script'); s.src = url; s.async = true; (document.head || document.body).appendChild(s); });
    }
    dsxWait[name].push(res);
  });

  // Design > DIVYAM MEHTA, JAYPORE and PRINT DESIGNING as one long page: the boards stacked edge to edge, then (where
  // supplied) a swipeable row of photographs, a folding brochure beside a 3x3 grid of prints, and a flipbook of the PDF.
  function openLong(host, key) {
    const D = (window.DS_LONG || {})[key]; if (!D) return false;
    host.querySelector(':scope > .lr')?.remove();
    const pic = it => it.c
      ? `<img data-c="${it.c}" data-i="${it.i}" alt="" draggable="false" width="${it.w}" height="${it.h}">`
      : `<img src="${it.src}" alt="" draggable="false" loading="lazy" width="${it.w}" height="${it.h}">`;
    const S = D.stack, B = D.brochure, K = D.book;
    const stack = Array.from({ length: S.n }, (_, k) => `<figure class="lg-st" style="aspect-ratio:${S.w}/${S.h}">${pic({ c: S.c, i: S.i + k, w: S.w, h: S.h })}</figure>`).join('');
    const row = D.gallery ? `<div class="lg-car" role="region" aria-roledescription="carousel" aria-label="${esc(D.title)} photographs">
        <div class="lg-row" tabindex="0">${D.gallery.map((it, k) => `<figure class="lg-sl" style="aspect-ratio:${it.w}/${it.h}" aria-label="Photograph ${k + 1} of ${D.gallery.length}">${pic(it)}</figure>`).join('')}</div>
        ${D.nav ? '<button class="lg-btn lg-prev" aria-label="Previous photographs">‹</button><button class="lg-btn lg-next" aria-label="Next photographs">›</button>' : ''}</div>` : '';
    const face = (pos, back) => `<i class="br-f${back ? ' br-bk' : ''}" style="background-position:${pos}% 0"></i>`;
    const brochure = B ? `<div class="br" data-s="0">
        <div class="br-tabs">${B.sheets.map(([n], k) => `<button data-k="${k}"${k ? '' : ' class="on"'}>${esc(n)}</button>`).join('')}</div>
        <div class="br-scene" tabindex="0" role="button" aria-label="Brochure: click to unfold, turn over and fold" style="aspect-ratio:${B.w}/${B.h}"><div class="br-sheet">
          <div class="br-p br-p1">${face(0)}${face(100, 1)}<div class="br-p br-p2">${face(50)}${face(50, 1)}<div class="br-p br-p3">${face(100)}${face(0, 1)}</div></div></div>
        </div></div>
        <p class="lg-hint">Click to unfold</p></div>` : '';
    const prints = D.prints ? `<div class="lg-prints">${D.prints.map((it, k) => `<button class="lg-pr" data-k="${k}" style="aspect-ratio:${it.w}/${it.h}" aria-label="Print ${k + 1} of ${D.prints.length}">${pic(it)}</button>`).join('')}</div>` : '';
    const sub = document.createElement('section');
    sub.className = 'lr lg';
    sub.innerHTML = `<button class="lr-back">← back</button><div class="lg-c">
      <h2 class="lg-h">${esc(D.title)}</h2>
      <div class="lg-stack">${stack}</div>
      ${row}
      ${B ? `<div class="lg-two">${brochure}${prints}</div>` : ''}
    </div>`;
    host.appendChild(sub); host.classList.add('lr-open');

    // Bundled images fill in as their bundle arrives.
    const fill = (root, c) => bundle(c).then(u => root.querySelectorAll(`img[data-c="${c}"][data-i]`).forEach(im => { im.src = u[+im.dataset.i]; }));
    [...new Set([S.c, ...(D.gallery || []).filter(it => it.c).map(it => it.c)])].forEach(c => fill(sub, c));

    if (D.gallery) {
      // Photographs: a row that scrolls sideways (trackpad, touch, mouse drag); a click moves it on by one.
      const car = $('.lg-car', sub), rowEl = $('.lg-row', car);
      const stepRow = d => {
        const items = [...rowEl.children], x = rowEl.scrollLeft, max = rowEl.scrollWidth - rowEl.clientWidth;
        if (d > 0 && x >= max - 4) return rowEl.scrollTo({ left: 0, behavior: 'smooth' });
        const next = d > 0 ? items.find(f => f.offsetLeft > x + 4) : [...items].reverse().find(f => f.offsetLeft < x - 4);
        rowEl.scrollTo({ left: next ? next.offsetLeft : 0, behavior: 'smooth' });
      };
      let rx = null, rs = 0, rmoved = false;
      rowEl.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; rx = e.clientX; rs = rowEl.scrollLeft; rmoved = false; rowEl.setPointerCapture(e.pointerId); });
      rowEl.addEventListener('pointermove', e => { if (rx === null) return; const d = e.clientX - rx; if (Math.abs(d) > 6) { rmoved = true; rowEl.classList.add('drag'); } if (rmoved) rowEl.scrollLeft = rs - d; });
      const rEnd = () => { if (rx === null) return; rx = null; if (rmoved) { const x = rowEl.scrollLeft; rowEl.classList.remove('drag'); rowEl.scrollLeft = x; } };
      rowEl.addEventListener('pointerup', rEnd); rowEl.addEventListener('pointercancel', rEnd);
      rowEl.addEventListener('click', () => { if (!rmoved) stepRow(1); rmoved = false; });
      rowEl.addEventListener('keydown', e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); stepRow(e.key === 'ArrowRight' ? 1 : -1); } });
      car.querySelectorAll('.lg-btn').forEach(b => b.addEventListener('click', () => stepRow(b.classList.contains('lg-next') ? 1 : -1)));
    }

    // Brochure: a tri-fold sheet. Clicking unfolds it, turns it over to the inside, then folds it shut again.
    if (B) {
      const br = $('.br', sub), scene = $('.br-scene', br), hint = $('.lg-hint', br);
      const faces = [...br.querySelectorAll('.br-f')];   // p1 front/back, p2 front/back, p3 front/back
      let s = 0, sheet = 0, swap;
      const paint = k => bundle(B.c).then(u => { const [, f, b] = B.sheets[k]; faces.forEach((el, j) => { el.style.backgroundImage = `url(${u[j % 2 ? b : f]})`; }); });
      const state = n => { s = n; br.dataset.s = n; hint.textContent = ['Click to unfold', 'Click to turn over', 'Click to fold'][n]; };
      const turn = d => state(Math.max(0, Math.min(2, s + d)));
      scene.addEventListener('click', () => state((s + 1) % 3));
      scene.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); state((s + 1) % 3); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); turn(e.key === 'ArrowRight' ? 1 : -1); }
      });
      wheelSwipe(scene, turn);
      br.querySelectorAll('.br-tabs button').forEach(t => t.addEventListener('click', () => {
        const k = +t.dataset.k; if (k === sheet) return;
        sheet = k; br.querySelectorAll('.br-tabs button').forEach(x => x.classList.toggle('on', x === t));
        clearTimeout(swap);
        if (s) { state(0); swap = setTimeout(() => paint(k), 1100); } else paint(k);
      }));
      paint(0);
      sub.querySelectorAll('.lg-pr').forEach(b => b.addEventListener('click', () => pageLB(`${D.title} prints`, D.prints.map(it => ({ type: 'image', src: it.src })), +b.dataset.k)));
    }

    // Flipbook: leaves turn on the spine. Desktops see the open spread; phones see one page and follow the turn.
    let stopBook = () => {};
    if (K) {
      // A "split" book's PDF pages are already two-page spreads: each one is cut down the spine and the book opens on it.
      const sheets = K.chunks.flatMap(([c, n]) => Array.from({ length: n }, (_, i) => ({ c, i })));
      const pages = K.split ? [null, ...sheets.flatMap(p => [{ ...p, h: 'l' }, { ...p, h: 'r' }])] : sheets;
      const leaves = Math.ceil(pages.length / 2), pw = K.split ? K.w / 2 : K.w;
      const fmin = K.split ? 1 : 0, fmax = pages.length % 2 ? leaves - 1 : leaves;
      const pg = k => pages[k] ? `<img data-c="${pages[k].c}" data-p="${pages[k].i}"${pages[k].h ? ` class="h-${pages[k].h}"` : ''} alt="Page ${K.split ? pages[k].i + 1 : k + 1}" draggable="false">` : '';
      const book = `<div class="fb" role="region" aria-roledescription="flipbook" aria-label="${esc(D.title)} flipbook" tabindex="0" style="--ar:${2 * pw}/${K.h};--arn:${2 * pw / K.h}">
          <div class="fb-view"><div class="fb-book">${Array.from({ length: leaves }, (_, j) => `<div class="fb-leaf"><div class="fb-pg fb-fr">${pg(2 * j)}</div><div class="fb-pg fb-bk">${pg(2 * j + 1)}</div></div>`).join('')}</div></div>
          <p class="lg-hint fb-n"></p></div>`;
      $('.lg-c', sub).insertAdjacentHTML('beforeend', book);
      const fb = $('.fb', sub), bookEl = $('.fb-book', fb), leafEls = [...bookEl.children], num = $('.fb-n', fb);
      const one = () => matchMedia('(max-width: 700px)').matches;
      let f = fmin, side = K.split ? 0 : 1, top = 0, seen = false;   // f leaves turned; side 1 = right-hand page in view (phones)
      const render = () => {
        leafEls.forEach((l, j) => {
          l.classList.toggle('flip', j < f);
          if (!l._moving) l.style.zIndex = j < f ? j + 1 : leaves - j;
          const near = j >= f - 2 && j <= f + 2;
          l.style.visibility = near ? '' : 'hidden';
          if (near && seen) l.querySelectorAll('img[data-p]:not([src])').forEach(im => bundle(im.dataset.c).then(u => { im.src = u[+im.dataset.p]; }));
        });
        // Load the next bundle a little before the reader reaches it.
        if (seen) { const ahead = pages[Math.min(pages.length - 1, 2 * f + 20)]; if (ahead) bundle(ahead.c); }
        const x = one() ? (side ? -50 : 0) : (f === 0 ? -25 : f === leaves ? 25 : 0);
        bookEl.style.transform = `translateX(${x}%)`;
        const a = 2 * f, shown = (one() ? [side ? a + 1 : a] : [a, a + 1]).filter(p => p >= 1 && p <= pages.length);
        num.textContent = K.split ? `${f} / ${sheets.length}` : `${shown.join('–') || 1} / ${pages.length}`;
      };
      const lift = j => { const l = leafEls[j]; if (!l) return; l._moving = 1; l.style.zIndex = 2 * leaves + (++top); clearTimeout(l._t); l._t = setTimeout(() => { l._moving = 0; render(); }, 950); };
      // Phones step a page at a time: turning to a leaf's back pans to the left-hand page, the next front pans back.
      const next = () => {
        if (one()) { if (side && pages[2 * f + 1]) { lift(f); f++; side = 0; } else if (!side && pages[2 * f]) side = 1; }
        else if (f < fmax) { lift(f); f++; }
        render();
      };
      const prev = () => {
        if (one()) { if (side && f > 0 && pages[2 * f - 1]) side = 0; else if (!side && f > 0 && pages[2 * f - 2]) { f--; lift(f); side = 1; } }
        else if (f > fmin) { f--; lift(f); }
        render();
      };
      let fx = null, fdx = 0;
      fb.addEventListener('pointerdown', e => { fx = e.clientX; fdx = 0; });
      fb.addEventListener('pointermove', e => { if (fx !== null) fdx = e.clientX - fx; });
      fb.addEventListener('pointerup', e => {
        if (fx === null) return; fx = null;
        if (Math.abs(fdx) > 40) return fdx < 0 ? next() : prev();
        const r = $('.fb-view', fb).getBoundingClientRect();
        if (e.clientX - r.left < r.width * (one() ? .3 : .5)) prev(); else next();
      });
      fb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); e.key === 'ArrowRight' ? next() : prev(); } });
      wheelSwipe(fb, d => d > 0 ? next() : prev());
      const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting) && !seen) { seen = true; render(); } }, { root: sub, rootMargin: '800px 0px' });
      io.observe(fb);
      addEventListener('resize', render);
      render();
      stopBook = () => { io.disconnect(); removeEventListener('resize', render); };
    }

    const close = () => { stopBook(); sub.remove(); host.classList.remove('lr-open'); removeEventListener('keydown', onKey, true); };
    const onKey = e => {
      if (!sub.isConnected) return removeEventListener('keydown', onKey, true);
      if (e.key === 'Escape' && !document.querySelector('#lightbox:not([hidden])')) { e.stopImmediatePropagation(); close(); }
    };
    addEventListener('keydown', onKey, true);
    $('.lr-back', sub).addEventListener('click', close);
    return true;
  }

  // Design > KSHITIJ JALORI as full-width slides one after another, after the Behance "IN BLOOM" floral print project:
  // a title band, a scattered mood board, then each print board in turn (matted on plum, split beside a close crop of
  // the print, full bleed, small on dark plum) and a closing row of every print.
  function openBloom(host, key) {
    const D = (window.DS_BLOOM || {})[key]; if (!D) return false;
    host.querySelector(':scope > .lr')?.remove();
    const pic = it => it.c
      ? `<img data-c="${it.c}" data-i="${it.i}" alt="" draggable="false">`
      : `<img src="${it.src}" alt="" draggable="false" loading="lazy">`;
    const at = (it, cx, cy, w, k) => `<figure class="bl-im"${k == null ? '' : ` data-k="${k}"`} style="left:${cx}%;top:${cy}%;width:${w}%;aspect-ratio:${it.w}/${it.h}">${pic(it)}</figure>`;
    const n = D.boards.length, two = k => String(k + 1).padStart(2, '0');
    const crop = (b, k) => `<figure class="bl-crop" data-k="${k}">${pic(b.crop)}</figure>`;
    const spots = [[14, 30, 9], [25, 24, 7], [10, 72, 8], [33, 64, 9], [47, 70, 8], [61, 78, 7], [72, 44, 8], [89, 22, 8]];
    const slides = [
      `<section class="bl-s bl-head"><h2>${esc(D.title)}</h2><p class="bl-k">${esc(D.kicker)}</p><p class="bl-t">${esc(D.about)}</p></section>`,
      `<section class="bl-s bl-plum">${D.mood.map((it, k) => { const [cx, cy, w] = spots[k % spots.length]; return at(it, cx, cy, w); }).join('')}
        <div class="bl-txt" style="left:46%;top:16%"><h3>Visual language</h3><p>${esc(D.moodNote)}</p></div></section>`,
    ];
    const looks = ['mat', 'splitR', 'bleed', 'splitL', 'dark'];
    D.boards.forEach((b, k) => {
      const look = looks[k % looks.length], label = `Print ${two(k)}`;
      if (look === 'mat') slides.push(`<section class="bl-s bl-plum">${at(b, 38, 50, 58, k)}<div class="bl-txt" style="left:72%;top:70%"><h3>${label}</h3><p>${esc(D.title)}</p></div></section>`);
      else if (look === 'bleed') slides.push(`<section class="bl-s bl-white">${at(b, 50, 50, 100, k)}</section>`);
      else if (look === 'dark') slides.push(`<section class="bl-s bl-dark">${at(b, 34, 44, 34, k)}
        <span class="bl-c" style="left:4%;top:6%">${esc(D.title)}</span><span class="bl-c" style="right:4%;top:6%">Prints</span>
        <div class="bl-txt" style="left:4%;top:80%"><h3>${label}</h3></div><span class="bl-c" style="right:4%;bottom:6%">${two(k)} / ${two(n - 1)}</span></section>`);
      else {
        const plum = `<div class="bl-half bl-plum">${look === 'splitR'
          ? `${at(b, 50, 46, 64, k)}<span class="bl-v">${label} — ${esc(D.title)}</span>`
          : `<i class="bl-dot"></i><div class="bl-txt" style="left:8%;top:74%"><h3>${label}</h3><p>${esc(D.kicker)}</p></div>`}</div>`;
        slides.push(`<section class="bl-s bl-split">${look === 'splitR' ? crop(b, k) + plum : plum + crop(b, k)}</section>`);
      }
    });
    slides.push(`<section class="bl-s bl-plum"><div class="bl-txt" style="left:4%;top:8%"><h3>The collection</h3><p>${two(n - 1)} prints for ${esc(D.title)}</p></div>
      <div class="bl-row">${D.boards.map((b, k) => crop(b, k)).join('')}</div></section>`);
    const sub = document.createElement('section');
    sub.className = 'lr bl';
    sub.innerHTML = `<button class="lr-back">← back</button><div class="bl-c-wrap">${slides.join('')}</div>`;
    host.appendChild(sub); host.classList.add('lr-open');
    [...new Set([...sub.querySelectorAll('img[data-c]')].map(im => im.dataset.c))].forEach(c =>
      bundle(c).then(u => sub.querySelectorAll(`img[data-c="${c}"]`).forEach(im => { im.src = u[+im.dataset.i]; })));
    // Any board or print crop opens the boards full size.
    const full = D.boards.map(b => ({ type: 'image', src: b.src }));
    sub.querySelectorAll('[data-k]').forEach(f => f.addEventListener('click', () => pageLB(D.title, full, +f.dataset.k)));
    const close = () => { sub.remove(); host.classList.remove('lr-open'); removeEventListener('keydown', onKey, true); };
    const onKey = e => {
      if (!sub.isConnected) return removeEventListener('keydown', onKey, true);
      if (e.key === 'Escape' && !document.querySelector('#lightbox:not([hidden])')) { e.stopImmediatePropagation(); close(); }
    };
    addEventListener('keydown', onKey, true);
    $('.lr-back', sub).addEventListener('click', close);
    return true;
  }

  // A project opened from inside a page shows its work in the dotted layout above.
  const pageProject = (el, pid, name) => { const p = project(pid); if (p) openDetail(el, name || p.title, p.items); };
  // Performance Marketing keeps the project window.
  const pageWindow = (el, pid) => { openProject(pid); liftWin('proj:' + pid, el); };
  const pageLB = (title, items, i) => openLightbox({ title, items }, i);

  // The hovered item's title, shown at the bottom of the page the same way as on Content Creation.
  function hoverCap(el, pairs) {
    let cap = $('.pg-hcap', el);
    if (!cap) { cap = document.createElement('div'); cap.className = 'cc-cap pg-hcap'; cap.setAttribute('aria-live', 'polite'); cap.innerHTML = '<b></b>'; el.appendChild(cap); }
    pairs.forEach(([node, title]) => {
      node.addEventListener('mouseenter', () => { $('b', cap).textContent = title; cap.classList.add('on'); });
      node.addEventListener('mouseleave', () => cap.classList.remove('on'));
      // Touch screens have no hover: a tap shows the caption for a moment instead.
      node.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse') return; $('b', cap).textContent = title; cap.classList.add('on'); clearTimeout(cap._t); cap._t = setTimeout(() => cap.classList.remove('on'), 2600); });
    });
  }
  const coarse = () => matchMedia('(hover: none)').matches;
  const PAGES = {
    /* AI: a vertical name, floating blurred pieces and a numbered index (ai reference.mp4) */
    ai(cat) {
      // Projects 1-5 shown in the order 1, 3, 4, 2, 5 (Uditi, Nov 5 2026), renumbered as they appear.
      const all = cat.projects.map(project).filter(Boolean);
      const ps = [0, 2, 3, 1, 4].map(i => all[i]).filter(Boolean);
      const el = makePage('ai', cat, `
        <h1 class="sr-only">AI</h1>
        <div class="ai-stage">
          <div class="ai-float">${ps.map((p, i) => `<button class="ai-pc" data-i="${i}" style="--d:${i}" aria-label="${esc(p.title)}"><em>(0${i + 1})</em>${vid(p.cover)}</button>`).join('')}</div>
          <div class="ai-proj" hidden></div>
        </div>
        <nav class="ai-list"><hr>${ps.map((p, i) => `<button data-i="${i}"><span><b>${esc(p.title)}</b>${esc(p.type.split('>').pop().trim())}</span><em>(0${i + 1})</em></button>`).join('')}</nav>
`);
      const pcs = [...el.querySelectorAll('.ai-pc')], rows = [...el.querySelectorAll('.ai-list button')];
      const stage = $('.ai-proj', el), float = $('.ai-float', el);
      let open = -1;
      const hi = i => { pcs.forEach((p, k) => p.classList.toggle('on', k === i)); rows.forEach((r, k) => r.classList.toggle('on', k === (open > -1 ? open : i))); };
      const show = i => {
        open = i; hi(i);
        if (i < 0) { stage.hidden = true; float.hidden = false; el.classList.remove('ai-open'); return; }
        const p = ps[i];
        stage.innerHTML = `<h2>${esc(p.title)}</h2>
          <div class="ai-text"><p>${esc(p.summary)}</p><small>${esc(p.client)}${p.year ? ', ' + esc(p.year) : ''}<br><b>${esc(p.type)}</b></small><button class="ai-back">← all work</button></div>
          <div class="ai-media scroll">${p.raw.map((it, k) => `<figure data-k="${k}">${vid(it)}</figure>`).join('')}</div>`;
        stage.hidden = false; float.hidden = true; el.classList.add('ai-open');
        stage.querySelectorAll('video').forEach(v => { v.preload = 'metadata'; v.autoplay = true; v.play().catch(() => {}); });
        stage.querySelectorAll('figure').forEach(f => f.addEventListener('click', () => pageLB(p.title, p.raw, +f.dataset.k)));
        $('.ai-back', stage).addEventListener('click', () => show(-1));
      };
      pcs.concat(rows).forEach(b => {
        b.addEventListener('mouseenter', () => open < 0 && hi(+b.dataset.i));
        b.addEventListener('click', () => show(open === +b.dataset.i ? -1 : +b.dataset.i));
      });
      float.addEventListener('mouseleave', () => open < 0 && hi(0));
      hi(0);
    },

    /* Creative Direction: a tower of three placards, KSHITIJ JALORI, JAYPORE and DIVYAM MEHTA (the earlier layout).
       The active one is in front; scroll, swipe or the arrow keys move the tower. Clicking a placard opens that brand's
       own creative direction page (window.CD_LONG, media/home/cd) over this one, with a back link. */
    'creative-direction'(cat) {
      const subs = window.SUBSECTIONS?.[cat.id] || cat.projects.map(id => ({ project: id }));
      const L = window.CD_LONG || {};
      const cards = subs.map(x => ({ ...x, p: project(x.project), img: L[x.project] })).filter(x => x.p);
      const nm = c => c.name || c.p.title;
      const el = makePage('cd', cat, `
        <div class="cd-tower">${cards.map((c, i) => `<button class="cd-card" data-i="${i}" aria-label="Open ${esc(nm(c))}"><img src="${c.p.cover.src}" alt="" draggable="false"><span class="cd-name">${esc(nm(c))}</span></button>`).join('')}</div>`);
      const els = [...el.querySelectorAll('.cd-card')];
      let a = 0;
      const layout = () => {
        const h = els[0].offsetHeight, n = els.length;
        els.forEach((c, i) => {
          let d = i - a;
          if (d > n / 2) d -= n; if (d < -n / 2) d += n;
          const k = Math.abs(d), s = Math.max(0.3, 1 - 0.13 * k), sg = Math.sign(d);
          const y = k ? sg * (h / 2 + k * h * 0.12 - s * h / 2) : 0;
          c.style.transform = `translateY(${y}px) scale(${s})`;
          c.style.zIndex = 50 - k; c.classList.toggle('on', !k);
        });
      };
      const go = i => { a = (i + els.length) % els.length; layout(); };
      const openBrand = i => {
        const c = cards[i];
        if (!c.img) return pageProject(el, c.p.id, nm(c));
        el.querySelector(':scope > .lr')?.remove();
        const sub = document.createElement('section');
        sub.className = 'lr cdl-one';
        sub.innerHTML = `<button class="lr-back">← back</button><section class="cdl-sec" aria-label="${esc(nm(c))}">
            <header class="cdl-head"><em>Creative Direction</em><h2>${esc(nm(c))}</h2><p>${esc(c.img.intro || c.p.summary)}</p></header>
            <img class="cdl-img" src="${c.img.src}" width="${c.img.w}" height="${c.img.h}" alt="${esc(c.p.title)}: creative direction" draggable="false">
          </section>`;
        el.appendChild(sub); el.classList.add('lr-open');
        const close = () => { sub.remove(); el.classList.remove('lr-open'); removeEventListener('keydown', onKey, true); els[i].focus({ preventScroll: true }); };
        const onKey = e => {
          if (!sub.isConnected) return removeEventListener('keydown', onKey, true);
          if (e.key === 'Escape' && !document.querySelector('#lightbox:not([hidden])')) { e.stopImmediatePropagation(); close(); }
        };
        addEventListener('keydown', onKey, true);
        $('.lr-back', sub).addEventListener('click', close);
        sub.tabIndex = -1; sub.focus({ preventScroll: true });
      };
      els.forEach((c, i) => c.addEventListener('click', () => { go(i); openBrand(i); }));
      hoverCap(el, els.map((c, i) => [c, nm(cards[i])]));
      const inBrand = () => el.querySelector(':scope > .lr');
      let lock = 0;
      el.addEventListener('wheel', e => { if (inBrand() || e.target.closest('.win') || Date.now() < lock || Math.abs(e.deltaY) < 8) return; lock = Date.now() + 380; go(a + Math.sign(e.deltaY)); }, { passive: true });
      let sy = null;
      el.addEventListener('touchstart', e => { sy = inBrand() ? null : e.touches[0].clientY; }, { passive: true });
      el.addEventListener('touchend', e => { if (sy === null) return; const d = sy - e.changedTouches[0].clientY; sy = null; if (Math.abs(d) > 30) go(a + Math.sign(d)); });
      el._on(window, 'resize', layout);
      el._on(window, 'keydown', e => { if (inBrand() || e.target.closest?.('.win')) return; if (e.key === 'ArrowDown' || e.key === 'ArrowRight') go(a + 1); if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') go(a - 1); });
      requestAnimationFrame(layout); layout();
    },

    /* Design: the four category placards side by side as one group, centred in the page with even gaps (two by two
       on phones). Hovering lifts a placard. DIVYAM MEHTA and JAYPORE open as long pages (openLong), the others as decks. */
    design(cat) {
      const decks = window.DS_PAGE || {};
      const list = (window.SUBSECTIONS?.[cat.id] || []).filter(x => decks[x.deck]).map(x => ({ ...x, d: decks[x.deck] }));
      const el = makePage('ds', cat, `
        <div class="ds-row">${list.map((x, i) => { const c = project(x.project)?.cover || x.d.images[x.d.cover || 0]; return `<button class="ds-card" data-i="${i}" aria-label="${esc(x.name)}"><img src="${c.thumb || c.src}" alt="" draggable="false"></button>`; }).join('')}</div>`);
      const cards = [...el.querySelectorAll('.ds-card')];
      // Speed: a deck's first image bundle starts downloading on hover/touch, and on fast connections as soon as
      // the Design page opens, so the deck is usually ready by the time it is clicked.
      const warmDeck = k => { const m = JSON.stringify([window.DS_LONG?.[k], window.DS_BLOOM?.[k], decks[k]]).match(/"c":"([\w-]+)"/); if (m) bundle(m[1]); };
      cards.forEach((c, i) => ['pointerenter', 'touchstart', 'focus'].forEach(ev => c.addEventListener(ev, () => warmDeck(list[i].deck), { once: true, passive: true })));
      if (fastNet()) el._t = setTimeout(() => list.forEach(x => warmDeck(x.deck)), 400);
      cards.forEach((c, i) => c.addEventListener('click', () => {
        const k = list[i].deck;
        (window.DS_LONG?.[k] ? openLong : window.DS_BLOOM?.[k] ? openBloom : openDeck)(el, k);
      }));
      hoverCap(el, cards.map((c, i) => [c, list[i].name]));
    },

    /* Graphics: floating blurred folders and a numbered index, centred (graphics reference.mp4).
       A folder opens into a dotted, numbered scatter of its work (GRAPHICS/layrd/layrd ref.jpg). */
    graphics(cat) {
      const subs = window.SUBSECTIONS?.[cat.id] || cat.projects.map(id => ({ project: id }));
      const ps = subs.map(x => ({ ...x, p: project(x.project) })).filter(x => x.p);
      const nm = x => x.name || x.p.title;
      // Just the floating folders and their index, centred on the page.
      const el = makePage('ai', cat, `
        <div class="gx-c">
          <div class="ai-stage">
            <div class="ai-float">${ps.map((x, i) => `<button class="ai-pc" data-i="${i}" style="--d:${i}" aria-label="${esc(nm(x))}"><em>(0${i + 1})</em><img src="${x.p.cover.thumb || still(x.p.cover)}" alt="" draggable="false"></button>`).join('')}</div>
          </div>
          <nav class="ai-list"><hr>${ps.map((x, i) => `<button data-i="${i}"><span><b>${esc(nm(x))}</b>${esc(x.p.type.split('>').pop().trim())}</span><em>(0${i + 1})</em></button>`).join('')}</nav>
        </div>`);
      el.classList.add('pg-gx');
      const pcs = [...el.querySelectorAll('.ai-pc')], rows = [...el.querySelectorAll('.ai-list button')];
      const hi = i => { pcs.forEach((p, k) => p.classList.toggle('on', k === i)); rows.forEach((r, k) => r.classList.toggle('on', k === i)); };
      // Each sub-folder opens with its heading and description; some get their own layout (window.GX_LAYOUT).
      const openSub = i => {
        const p = ps[i].p, L = (window.GX_LAYOUT || {})[p.id] || {}, opts = { intro: p.intro };
        if (L.layout) opts.layout = L.layout;
        const go = () => openDetail(el, nm(ps[i]), L.layout ? p.raw : p.items, true, opts);
        const C = L.carousel;
        // A carousel from a bundle (every page of the packaging PDFs, tools/build_packaging.py) or from a project.
        if (C?.bundle) return bundle(C.bundle).then(u => { opts.carousel = { label: C.label, title: C.title, items: u.map((src, k) => ({ type: 'image', src, w: C.slides[k]?.w, h: C.slides[k]?.h })), captions: u.map((_, k) => C.slides[k]?.caption || '') }; go(); });
        if (C) {
          const c = project(C.project);
          if (c) opts.carousel = { label: C.label, title: C.title, items: c.raw, captions: c.raw.map(it => C.caption ? it.name.replace(new RegExp(C.caption), '$1').trim() : '') };
        }
        go();
      };
      pcs.concat(rows).forEach(b => {
        b.addEventListener('mouseenter', () => hi(+b.dataset.i));
        b.addEventListener('click', () => openSub(+b.dataset.i));
      });
      $('.ai-float', el).addEventListener('mouseleave', () => hi(0));
      hoverCap(el, pcs.map((b, i) => [b, nm(ps[i])]));
      hi(0);
      // Centre the cloud of folders itself (not just the box it floats in) beside the index.
      const float = $('.ai-float', el), stageBox = $('.ai-stage', el), gx = $('.gx-c', el);
      const centreCloud = () => {
        float.style.translate = '';
        if (getComputedStyle(gx).position !== 'absolute') return;
        const s = stageBox.getBoundingClientRect(), r = pcs.map(p => { const b = p.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom]; });
        const l = Math.min(...r.map(q => q[0])), t = Math.min(...r.map(q => q[1])), rr = Math.max(...r.map(q => q[2])), b = Math.max(...r.map(q => q[3]));
        float.style.translate = `${Math.round((s.left + s.right) / 2 - (l + rr) / 2)}px ${Math.round((s.top + s.bottom) / 2 - (t + b) / 2)}px`;
      };
      // Run once laid out (and again as the opening animation and pictures settle).
      [0, 300, 900].forEach(ms => setTimeout(centreCloud, ms));
      pcs.forEach(p => $('img', p)?.addEventListener('load', centreCloud, { once: true }));
      el._on(window, 'resize', centreCloud);
    },

    /* Video Editing: a numbered visual diary (video editing.mp4): the "video diary" title with the films scattered
       around it, numbered 1 to 10. Hovering previews a film; a click (or tap) opens it full screen in the lightbox,
       playing, with a Close control back to the diary. */
    'video-editing'(cat) {
      // Only the videos in the video editing folder, all of them, in order.
      const its = cat.projects.map(project).filter(Boolean).flatMap(p => p.items.filter(i => i.type === 'video').map(it => ({ ...it, p }))).slice(0, 10);
      const feat = ['featuring', ...[...new Set(its.map(i => i.p.title.replace(/^UGC: /, 'ugc · ').toLowerCase()))]];
      const el = makePage('ve', cat, `
        <div class="ve-stage">
          <h1 class="ve-title">video<br><span>diary</span></h1>
          <p class="ve-feat">${feat.map(esc).join('<br>')}</p>
          <span class="ve-lately">( lately )</span>
          ${its.map((it, k) => `<button class="ve-pc ve-${k + 1}" data-k="${k}" style="animation-delay:${0.25 + k * 0.22}s;aspect-ratio:${it.w}/${it.h}" aria-label="Play video ${k + 1} of ${its.length}"><em>( ${k + 1} )</em><img src="${it.poster}" alt="" draggable="false"><video src="${it.src}" muted loop playsinline preload="none"></video></button>`).join('')}
        </div>`);
      el.querySelectorAll('.ve-pc').forEach(b => {
        const v = $('video', b);
        b.addEventListener('mouseenter', () => { if (coarse()) return; b.classList.add('play'); v.play().catch(() => {}); });
        b.addEventListener('mouseleave', () => { b.classList.remove('play'); v.pause(); });
        b.addEventListener('click', () => { b.classList.remove('play'); v.pause(); pageLB('Video diary', its, +b.dataset.k); });
      });
    },

    /* Content Creation: a card grows, shuffles as a stack, then fans out in a tilted row (CONTENT CREATION referenece.mp4) */
    'content-creation'(cat) {
      const its = cat.projects.map(project).filter(Boolean).flatMap(p => p.items.slice(0, p.id === 'travel' ? 3 : 2).map(it => ({ ...it, p }))).slice(0, 9);
      const el = makePage('cc', cat, `
        <div class="cc-row">${its.map((it, k) => `<button class="cc-card" data-k="${k}" aria-label="${esc(it.p.title)}"><img src="${still(it)}" alt="" draggable="false">${it.type === 'video' ? `<video src="${it.src}" muted loop playsinline preload="none"></video>` : ''}</button>`).join('')}</div>
        <div class="cc-cap" aria-live="polite"><b>${esc(cat.name)}</b><span>hover to play · click to watch</span></div>
        <button class="cc-again">stack again</button>`);
      const cards = [...el.querySelectorAll('.cc-card')], n = cards.length;
      let mode = 'dot', timers = [];
      const later = (f, t) => timers.push(setTimeout(f, t));
      el._off.push(() => timers.forEach(clearTimeout));
      const place = () => {
        const cw = cards[0].offsetWidth;
        cards.forEach((c, k) => {
          const m = k - (n - 1) / 2;
          c.style.transform = mode === 'dot' ? 'scale(.04)' : mode === 'stack'
            ? `translate(${(k % 3 - 1) * 3}px, ${(k % 2) * -3}px) rotate(${(k % 3 - 1) * 1.5}deg)`
            : `perspective(900px) translateX(${m * cw * 0.72}px) rotateY(-30deg)`;
          c.style.zIndex = mode === 'fan' ? 10 + k : c.style.zIndex || k;
        });
        el.classList.toggle('cc-fanned', mode === 'fan');
      };
      const play = () => {
        timers.forEach(clearTimeout); timers = [];
        mode = 'dot'; cards.forEach((c, k) => { c.style.zIndex = k; }); place();
        later(() => { mode = 'stack'; place(); }, 120);
        for (let i = 0; i < n; i++) later(() => { cards[i].style.zIndex = 20 + i; }, 650 + i * 140);
        later(() => { mode = 'fan'; place(); }, 700 + n * 140);
      };
      cards.forEach(c => {
        const v = $('video', c), it = its[+c.dataset.k];
        c.addEventListener('mouseenter', () => { if (mode !== 'fan') return; $('.cc-cap b', el).textContent = it.p.title; v?.play().catch(() => {}); c.classList.add('play'); });
        c.addEventListener('mouseleave', () => { v?.pause(); c.classList.remove('play'); });
        c.addEventListener('click', () => {
          // One click or tap opens the piece full screen in the lightbox (videos play); the rest are a swipe away.
          if (mode !== 'fan') { mode = 'fan'; place(); }
          cards.forEach(o => { o.classList.remove('play', 'lift'); $('video', o)?.pause(); });
          pageLB(it.p.title, its, +c.dataset.k);
        });
      });
      // The cards are tilted in 3D, so a tap near a card's edge can land on the row behind it: open the nearest card.
      el.addEventListener('click', e => {
        if (e.target.closest('.cc-card, button, a, nav')) return;
        const rs = cards.map(c => [c.getBoundingClientRect(), c]);
        const top = Math.min(...rs.map(([r]) => r.top)), bottom = Math.max(...rs.map(([r]) => r.bottom));
        const left = Math.min(...rs.map(([r]) => r.left)), right = Math.max(...rs.map(([r]) => r.right));
        if (e.clientY < top || e.clientY > bottom || e.clientX < left || e.clientX > right) return;
        rs.sort((a, b) => Math.abs(e.clientX - (a[0].left + a[0].width / 2)) - Math.abs(e.clientX - (b[0].left + b[0].width / 2)))[0][1].click();
      });
      $('.cc-again', el).addEventListener('click', play);
      el._on(window, 'resize', place);
      requestAnimationFrame(play);
    },

    /* Performance Marketing: a dark case-study site in a frame, with counting numbers (performance marketing reference.mp4) */
    'performance-marketing'(cat) {
      const p = project(cat.projects[0]);
      // The grid shows only the five best-performing reels (window.PM_TOP). The hero and the story frame use other
      // Vnest footage, so each of those five appears on the page once.
      const vids = p.items.filter(i => i.type === 'video');
      const top = window.PM_TOP || { reels: [] }, tours = project('vn-tours')?.items || [];
      const other = n => tours.find(i => i.name === n);
      const hero = other('Video-52196.mp4') || vids[0] || p.cover, storyVid = other('Video-55236.mp4') || vids[1] || hero;
      const stats = window.PERF_STATS || [], kj = project('kj');
      const words = 'For 2026, I ran Veda Nest’s Meta Ads end to end, turning real-estate reels into qualified leads.'.split(' ');
      const el = makePage('pm', cat, `
        <img class="pm-mark" src="media/home/logo.png" alt="" draggable="false">
        <div class="pm-frame"><div class="pm-site scroll">
          <section class="pm-hero">${vid(hero, 'pm-bg')}<div class="pm-shade"></div>
            <small>Real estate, Dubai<br>Performance marketing</small><h1>VNEST&nbsp;DUBAI</h1></section>
          <section class="pm-story">
            <small>${esc(p.client)}<br>${esc(p.role)}</small>
            <h2>${words.map(w => `<span>${esc(w)} </span>`).join('')}</h2>
            <figure>${vid(storyVid)}</figure>
            <p>${esc(window.PM_SUMMARY || p.summary)}</p>
            <div class="pm-stats">${stats.map(s => `<div><b data-n="${s.n}">0</b><span>${esc(s.label)}</span></div>`).join('')}</div>
          </section>
          <section class="pm-light"><h3>The <span>five best-performing reels</span></h3><button class="pm-btn" data-pm="proj">Open project</button>
            <div class="pm-grid">${vids.map((v, k) => { const r = top.reels[k] || {}; return `<figure data-k="${k}" aria-label="${esc(`${k + 1}. ${r.t || ''}, ${r.r || ''}`)}">${vid(v)}<figcaption><em>${String(k + 1).padStart(2, '0')}</em><b>${esc(r.t || '')}</b><span>${esc(r.r || '')}</span></figcaption></figure>`; }).join('')}</div>
            ${top.note ? `<p class="pm-note">${esc(top.note)}</p>` : ''}</section>
          <section class="pm-case" data-p="${p.id}"><small>(01) Vnest Dubai, case study</small>${caseHTML('vnest', p.items, false)}</section>
          ${kj ? `<section class="pm-hero pm-next">${vid(kj.items.find(i => i.name === '11th2.png') || kj.cover, 'pm-bg')}<div class="pm-shade"></div>
            <small>Kshitij Jalori, Ajmer<br>Social media design</small><h1>KSHITIJ&nbsp;JALORI</h1></section>
          <section class="pm-case" data-p="kj"><small>(02) Kshitij Jalori, case study</small>${caseHTML('kj', kj.items)}</section>` : ''}
        </div></div>
        <button class="pm-more" data-pg="close">MORE WORK LIKE THIS<br>ON THE DESKTOP</button>`);
      const site = $('.pm-site', el);
      const bg = $('.pm-bg', el); if (bg) { bg.preload = 'auto'; bg.autoplay = true; bg.play().catch(() => {}); }
      $('.pm-story figure video', el)?.setAttribute('autoplay', ''); $('.pm-story figure video', el)?.play().catch(() => {});
      el.querySelectorAll('.pm-grid figure').forEach(f => f.addEventListener('click', () => pageLB(p.title, vids, +f.dataset.k)));
      hoverPlay($('.pm-grid', el));
      el.querySelectorAll('.pm-case').forEach(c => {
        const q = project(c.dataset.p);
        hoverPlay(c);
        c.querySelectorAll('.cs-grid figure').forEach(f => f.addEventListener('click', () => pageLB(q.title, q.items, +f.dataset.k)));
      });
      $('[data-pm="proj"]', el).addEventListener('click', () => pageWindow(el, p.id));
      const spans = [...el.querySelectorAll('.pm-story h2 span')], nums = [...el.querySelectorAll('.pm-stats b')];
      let counted = false;
      const onScroll = () => {
        const h2 = $('.pm-story h2', el).getBoundingClientRect(), fr = site.getBoundingClientRect();
        const t = Math.max(0, Math.min(1, (fr.bottom - h2.top) / (fr.height * 0.9)));
        spans.forEach((s, k) => s.classList.toggle('lit', k / spans.length < t * 1.25));
        const st = $('.pm-stats', el).getBoundingClientRect();
        if (!counted && st.top < fr.bottom - 40) {
          counted = true;
          nums.forEach(b => { const n = +b.dataset.n, t0 = performance.now();
            const f = now => { const k = Math.min(1, (now - t0) / 1400); const v = Math.round(n * (1 - Math.pow(1 - k, 3))); b.textContent = n >= 10000 ? v.toLocaleString('en-US') : v; if (k < 1) requestAnimationFrame(f); };
            requestAnimationFrame(f); });
        }
      };
      site.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }
  };
  // Folders without a layout of their own: one project shows its work in the dotted layout; several open their window.
  const plainPage = c => {
    const el = makePage('plain', c, '');
    if (c.projects.length === 1) { const p = project(c.projects[0]); openDetail(el, p.title, p.items, false); }
    else { openFinder(c.id); liftWin('finder:' + c.id, el); }
  };
  const openCategory = c => {
    if (!c) return;
    if (PAGES[c.id]) return PAGES[c.id](c);
    if (c.id === 'social-media' && window.SOCIAL?.length) { closeAbout(); return openSocial(); }
    plainPage(c);
  };

  // Put a window opened from a full-screen page (About Me, Social Media) on top of it.
  function liftWin(id, host) {
    const w = wins.get(id);
    if (w && host) { host.appendChild(w.el); w.el.style.zIndex = 1000; }
  }

  // The email window, opened on top of About Me instead of behind it.
  function mailOverAbout() {
    openMail();
    const w = wins.get('mail');
    if (w && aboutEl) { w.el.style.zIndex = 1000; aboutEl.appendChild(w.el); focusWin(w.el); w.el.style.zIndex = 1000; }
  }

  function copyEmail() {
    (navigator.clipboard?.writeText(S.email) || Promise.reject()).then(() => toast('Email copied'), () => toast(S.email));
  }

  /* ---------- Behind the scenes (Photos) ---------- */
  function openBTS() {
    const ids = ['bts'].filter(project);
    // Without a dedicated BTS folder, show every project's videos: the making-of moments.
    const p = project('bts') || {
      id: 'bts', title: 'Behind the scenes', client: 'Shoots, screen recordings and reels from the work',
      type: '', summary: '', items: allProjects.flatMap(id => project(id).items.filter(i => i.type === 'video')),
    };
    if (!ids.length) p.cover = p.items[0];
    if (!p.items.length) return toast('Nothing here yet');
    const id = 'bts';
    if (wins.has(id)) return focusWin(wins.get(id).el);
    const el = openWindow(id, {
      title: 'Behind the scenes', slim: true, w: 900, h: 640,
      body: `<div class="scroll" style="flex:1">
        <div class="p-head"><img src="${p.cover.thumb}" alt=""><div><h2>Behind the scenes</h2><div class="client">${esc(p.client)}</div></div></div>
        <div class="p-grid" style="padding-top:16px">${p.items.map((it, i) => `<button data-i="${i}" aria-label="Open video ${i + 1}">
          <img src="${it.thumb}" alt="" loading="lazy" style="aspect-ratio:${it.w}/${it.h}">${it.type === 'video' ? '<div class="play"><span>▶</span></div>' : ''}</button>`).join('')}</div></div>`
    });
    el.querySelectorAll('.p-grid button').forEach(b => b.addEventListener('click', () => openLightbox(p, +b.dataset.i)));
  }

  /* ---------- Mail ---------- */
  function openMail() {
    const el = openWindow('mail', {
      title: 'New Message', slim: true, w: 560, h: 440,
      tools: '',
      body: `<div style="flex:1;display:flex;flex-direction:column;min-width:0">
        <div class="m-fields">
          <div><label>To:</label><span class="m-chip">${esc(S.name)} &lt;${esc(S.email)}&gt;</span></div>
          <div><label for="msub">Subject:</label><input id="msub" value="Let's work together"></div>
        </div>
        <textarea class="m-body" id="mbody" placeholder="Hi Uditi, …">Hi Uditi,

I saw your portfolio and </textarea>
        <div style="display:flex;gap:8px;padding:12px 16px;border-top:.5px solid var(--hair);justify-content:flex-end">
          <button class="pill-btn" data-send>Open in email app</button>
          <button class="pill-btn primary" data-copy>Copy address</button>
        </div></div>`
    });
    $('[data-copy]', el).addEventListener('click', copyEmail);
    $('[data-send]', el).addEventListener('click', () => {
      const s = encodeURIComponent($('#msub', el).value), b = encodeURIComponent($('#mbody', el).value);
      location.href = `mailto:${S.email}?subject=${s}&body=${b}`;
    });
  }

  /* ---------- Résumé (opens like Preview) ---------- */
  function openResume() {
    const pages = S.resume || []; if (!pages.length) return;
    // Size the window so the whole page fits on screen (A4: width = height × 0.707).
    const avail = innerHeight - mbH() - 120, bar = 46, pad = 28;
    const pageH = Math.max(320, avail - bar - pad);
    const w = Math.round(pageH * 0.707 + pad), h = Math.round(pageH + bar + pad);
    openWindow('resume', {
      title: 'Résumé — Uditi Bokolia', slim: true, w, h,
      body: `<div class="cv${pages.length > 1 ? ' scroll' : ''}">${pages.map((src, i) => `<img src="${src}" alt="Uditi Bokolia résumé, page ${i + 1}" draggable="false">`).join('')}</div>`
    });
  }

  /* ---------- Spotify (mini player) ---------- */
  function openSpotify() {
    const T = window.SPOTIFY; if (!T) return joke('spotify');
    const svg = (d, extra = '') => `<svg viewBox="0 0 24 24" aria-hidden="true" ${extra}><path d="${d}"/></svg>`;
    const el = openWindow('spotify', {
      title: 'Spotify', w: 320, h: 440,
      body: `<div class="sp">
        <div class="sp-top">
          <button class="t-close sp-close" aria-label="Close"></button>
          <span class="sp-grip" aria-hidden="true"></span>
          <a class="sp-icon" href="${T.url}" target="_blank" rel="noopener" aria-label="Open in Spotify">${svg('M4 7h10M18 7h2M4 17h4M12 17h8M14 4v6M8 14v6', 'fill="none"')}</a>
        </div>
        <a class="sp-art" href="${T.url}" target="_blank" rel="noopener" aria-label="Play ${esc(T.title)} on Spotify">
          <img src="${T.cover}" alt="${esc(T.title)} cover" draggable="false">
          <span class="sp-play">${svg('M8 5v14l11-7z')}</span>
        </a>
        <div class="sp-meta">
          <div class="sp-txt"><b>${esc(T.title)}</b><span>${esc(T.artists)}</span></div>
          <a class="sp-add" href="${T.url}" target="_blank" rel="noopener" aria-label="Save on Spotify">${svg('M12 7v10M7 12h10', 'fill="none"')}</a>
        </div>
      </div>`
    });
    el.classList.add('win-spotify');
    dragWindow(el, $('.sp-top', el));
    return el;
  }

  /* ---------- Dialogs ---------- */
  const dialogIcon = `<svg class="d-icon" viewBox="0 0 64 64"><rect x="6" y="6" width="52" height="52" rx="13" fill="url(#dg)"/><defs><linearGradient id="dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd86b"/><stop offset="1" stop-color="#f7a928"/></linearGradient></defs><text x="32" y="43" font-size="30" text-anchor="middle" font-family="system-ui" font-weight="800" fill="#fff">!</text></svg>`;
  function joke(key) {
    const j = J[key]; const id = 'joke:' + key;
    const el = openWindow(id, {
      dialog: true, title: j.title, w: 290,
      body: `${dialogIcon}<h4>${esc(j.title)}</h4><p>${esc(j.body)}</p><button class="pill-btn primary">${esc(j.button)}</button>`
    });
    $('.pill-btn', el).addEventListener('click', () => closeWindow(id));
    $('.pill-btn', el).focus();
  }

  /* ---------- Spotlight ---------- */
  const spot = $('#spotlight'), spotIn = $('input', spot), spotList = $('.spot-results', spot);
  const spotEntries = [
    { label: 'About Me', sub: S.roles.join(' & '), kind: 'Note', go: () => openAbout() },
    { label: 'Contact', sub: S.email, kind: 'Mail', go: openMail },
    ...cats.map(c => ({ label: c.name, sub: c.projects.length + ' projects', kind: 'Folder', go: () => openFinder(c.id) })),
    ...allProjects.map(project).map(p => ({ label: p.title, sub: [p.client, ...catOf(p.id)].filter((x, i, a) => x && a.indexOf(x) === i).join(' · '),
      kind: 'Project', thumb: p.cover.thumb, go: () => openProject(p.id) }))
  ];
  let spotHits = [], spotSel = 0;
  function openSpot() { spot.hidden = false; spotIn.value = ''; renderSpot(); setTimeout(() => spotIn.focus(), 10); }
  function closeSpot() { spot.hidden = true; }
  function renderSpot() {
    const q = spotIn.value.trim().toLowerCase();
    spotHits = (q ? spotEntries.filter(e => (e.label + ' ' + e.sub + ' ' + e.kind).toLowerCase().includes(q)) : spotEntries.filter(e => e.kind !== 'Project')).slice(0, 8);
    spotSel = 0;
    spotList.innerHTML = spotHits.length ? spotHits.map((e, i) => `<li role="option" data-i="${i}">
      ${e.thumb ? `<img src="${e.thumb}" alt="">` : `<span class="spot-ico">${e.kind === 'Mail' ? '✉️' : e.kind === 'Note' ? '📝' : folderSVG}</span>`}
      <span class="spot-txt"><b>${esc(e.label)}</b><small>${esc(e.sub)}</small></span><em>${e.kind}</em></li>`).join('')
      : `<li class="spot-empty">No results for “${esc(spotIn.value)}”</li>`;
    markSpot();
  }
  const markSpot = () => spotList.querySelectorAll('li[data-i]').forEach(li => li.classList.toggle('on', +li.dataset.i === spotSel));
  const runSpot = i => { const e = spotHits[i]; if (e) { closeSpot(); e.go(); } };
  spotIn.addEventListener('input', renderSpot);
  spotIn.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); spotSel = (spotSel + (e.key === 'ArrowDown' ? 1 : -1) + spotHits.length) % Math.max(1, spotHits.length); markSpot(); }
    if (e.key === 'Enter') runSpot(spotSel);
    if (e.key === 'Escape') { e.stopPropagation(); closeSpot(); }
  });
  spotList.addEventListener('click', e => { const li = e.target.closest('li[data-i]'); if (li) runSpot(+li.dataset.i); });
  spot.addEventListener('click', e => { if (e.target === spot) closeSpot(); });
  addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === ' ')) { e.preventDefault(); spot.hidden ? openSpot() : closeSpot(); }
  }, true);
  document.addEventListener('click', e => { if (e.target.closest('[data-spot]')) openSpot(); });

  /* ---------- Protect the work: no right-click, saving, dragging, copying or printing ---------- */
  (() => {
    const editable = el => el && el.closest && el.closest('input, textarea, [contenteditable="true"]');
    ['contextmenu', 'copy', 'cut', 'dragstart', 'selectstart'].forEach(type =>
      document.addEventListener(type, e => { if (!editable(e.target)) e.preventDefault(); }, true));
    const shield = $('#shield');
    let timer;
    const cover = (on, ms) => {
      clearTimeout(timer);
      shield.hidden = !on;
      if (on && ms) timer = setTimeout(() => { shield.hidden = true; }, ms);
    };
    addEventListener('keydown', e => {
      const k = (e.key || '').toLowerCase(), mod = e.metaKey || e.ctrlKey;
      if (k === 'printscreen') {                       // Windows screenshot key
        cover(true, 2500);
        navigator.clipboard?.writeText('© Uditi Bokolia').catch(() => {});
        e.preventDefault();
      } else if (e.shiftKey && (e.metaKey || k === 'meta' || k === 'os')) {
        cover(true);                                   // ⌘⇧3/4/5 on Mac, Win+Shift+S on Windows
      } else if (mod && ['s', 'p', 'u'].includes(k)) {
        e.preventDefault();                            // save page, print, view source
      } else if (mod && ['c', 'x', 'a'].includes(k) && !editable(e.target)) {
        e.preventDefault();
      }
    }, true);
    addEventListener('keyup', e => { if (!shield.hidden && !e.shiftKey) cover(true, 900); }, true);
    addEventListener('blur', () => cover(true));        // a screenshot tool or another app took focus
    addEventListener('focus', () => cover(false));
    document.addEventListener('visibilitychange', () => cover(document.hidden));
    shield.addEventListener('click', () => cover(false));
    addEventListener('beforeprint', () => cover(true));
    addEventListener('afterprint', () => cover(false));
  })();

  /* ---------- Warm-up ----------
     Once the desktop has loaded and the browser is idle, quietly download what each section shows the moment it
     opens (covers, placards, posters), then, on fast connections, the next layer (Illustrations, Creative Direction
     pages, the Kshitij Jalori grid). Sections then open from the cache instead of waiting on the network.
     Skipped when the visitor has Data Saver on or is on a 2G/3G connection. */
  function fastNet() { const c = navigator.connection || {}; return !c.saveData && !/(^|[^4])[23]g/.test(c.effectiveType || ''); }
  (function warm() {
    if (!fastNet()) return;
    const seen = new Set(), first = [], next = [];
    const add = (q, u) => { if (u && typeof u === 'string' && !u.startsWith('data:') && !seen.has(u)) { seen.add(u); q.push(u); } };
    const still = it => it && (it.type === 'video' ? it.poster : it.src);
    allProjects.forEach(id => add(first, still(project(id)?.cover)));
    (window.SOCIAL || []).forEach(x => add(first, x.img));
    (window.VN_PAGE?.cards || []).forEach(x => add(first, x.src));
    ['video-editing', 'vnest', 'vn-tours'].forEach(id => (project(id)?.items || []).forEach(it => add(first, it.poster)));
    (project('kj')?.items || []).forEach(it => add(next, still(it)));
    (project('illustrations')?.items || []).slice(0, 12).forEach(it => add(next, still(it)));
    Object.values(window.CD_LONG || {}).forEach(x => add(next, x.src));
    const K = window.KJ_PAGE; if (K) [...K.grid1, ...K.grid2].slice(0, 9).forEach(x => add(next, x.src));
    // Phones (usually on mobile data) only warm the first layer.
    const q = matchMedia('(hover: hover) and (pointer: fine)').matches ? [...first, ...next] : first; let i = 0, live = 0;
    const pump = () => { while (live < 3 && i < q.length) { const im = new Image(); live++; im.decoding = 'async'; im.onload = im.onerror = () => { live--; setTimeout(pump, 30); }; im.src = q[i++]; } };
    const start = () => (window.requestIdleCallback || (f => setTimeout(f, 300)))(pump, { timeout: 2500 });
    if (document.readyState === 'complete') setTimeout(start, 1200); else addEventListener('load', () => setTimeout(start, 1200), { once: true });
  })();

  /* ---------- Actions ---------- */
  const actions = {
    work: () => openFinder('all'), about: () => openAbout(), bts: openBTS, mail: openMail,
    trash: () => joke('trash'), battery: () => joke('battery'), help: () => joke('help'), focus: () => joke('focus'),
    claude: () => joke('claude'), spotify: openSpotify
  };
  document.querySelectorAll('.dock-item[data-href-key]').forEach(a => {
    const href = S[a.dataset.hrefKey];
    if (href) a.href = href; else a.remove();
  });
  document.querySelectorAll('[data-action]').forEach(b => b.addEventListener('click', () => {
    const d = b.closest('.dock-item');
    if (d) { d.classList.remove('bounce'); void d.offsetWidth; d.classList.add('bounce'); }
    actions[b.dataset.action]?.();
  }));
})();

/* Site overlays for v4.6: utilities (1993 well & septic), future barn well/septic option, future-concept cottage and drives.
   Positions come from DEAL_LAYOUT. Everything is approximate and not a survey. No permit numbers. */
(function () {
  if (!window.deal || !window.THREE) return;
  const THREE = window.THREE;
  const deal = window.deal;
  const L = deal.layout || window.DEAL_LAYOUT;
  const scene = deal.scene;
  const U = L.utilities;
  const F = L.futureConcept;
  const B = L.siteBarns || {};

  const utilities = new THREE.Group(); utilities.name = 'utilities';
  const futureUtil = new THREE.Group(); futureUtil.name = 'futureUtil';
  const future = new THREE.Group(); future.name = 'future';
  scene.add(utilities); scene.add(futureUtil); scene.add(future);
  deal.groups.utilities = utilities;
  deal.groups.futureUtil = futureUtil;
  deal.groups.future = future;

  const overlay = { utilities: false, futureUtil: false, future: false };

  function mat(color, opacity) {
    return new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity, depthWrite: false, side: THREE.DoubleSide });
  }
  function lineMat(color, dashed) {
    const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.95 });
    return m;
  }
  function polyLine(group, pts, y, color, closed) {
    const v = pts.map(([x, z]) => new THREE.Vector3(x, y, z));
    if (closed) v.push(v[0].clone());
    const g = new THREE.BufferGeometry().setFromPoints(v);
    const ln = new THREE.Line(g, lineMat(color));
    group.add(ln);
    return ln;
  }
  function flatBox(group, x, z, w, d, y, color, opacity) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.15, d), mat(color, opacity));
    m.position.set(x + w / 2, y, z + d / 2);
    m.receiveShadow = false;
    group.add(m);
    return m;
  }
  function disc(group, x, z, r, y, color, opacity) {
    const m = new THREE.Mesh(new THREE.CircleGeometry(r, 64), mat(color, opacity));
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, y, z);
    group.add(m);
    return m;
  }
  function ring(group, x, z, r, y, color) {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      pts.push([x + Math.cos(a) * r, z + Math.sin(a) * r]);
    }
    return polyLine(group, pts, y, color, false);
  }
  function wellHead(group, x, z, y, color) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.3, 2.2, 16), new THREE.MeshStandardMaterial({ color, metalness: 0.3, roughness: 0.6 }));
    m.position.set(x, y + 1.1, z);
    group.add(m);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.35, 0.25, 16), new THREE.MeshStandardMaterial({ color: 0x22262b }));
    cap.position.set(x, y + 2.3, z);
    group.add(cap);
  }
  function hatchField(group, x, z, w, d, y, color) {
    flatBox(group, x, z, w, d, y, color, 0.35);
    const step = 4;
    for (let i = -d; i < w + d; i += step) {
      const a = [x + Math.max(0, i), z + Math.max(0, -i)];
      const b = [x + Math.min(w, i + d), z + Math.min(d, w - i)];
      if (a[0] < x + w && a[1] < z + d) polyLine(group, [a, b], y + 0.2, color, false);
    }
  }
  function lbl(group, text, x, y, z, size) {
    // reuse model.js label if present via a small canvas sprite
    const c = document.createElement('canvas');
    c.width = 1024; c.height = 128;
    const ctx = c.getContext('2d');
    ctx.fillStyle = 'rgba(14,20,28,0.9)';
    ctx.fillRect(0, 0, 1024, 128);
    ctx.strokeStyle = '#b99a69';
    ctx.strokeRect(2, 2, 1020, 124);
    ctx.fillStyle = '#f4ead8';
    ctx.font = '500 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, 512, 78, 990);
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), depthTest: false, transparent: true }));
    s.position.set(x, y, z);
    s.scale.set(size * 5, size * 0.625, 1);
    group.add(s);
    if (deal.labels) deal.labels.push(s);
    return s;
  }

  const Y = 0.4;

  // ——— Existing 1993 system ———
  const ex = U.existing;
  wellHead(utilities, ex.well.x, ex.well.z, 0, 0x3d6ea8);
  disc(utilities, ex.well.x, ex.well.z, ex.wellRadiusFt, Y, 0x3d6ea8, 0.12);
  ring(utilities, ex.well.x, ex.well.z, ex.wellRadiusFt, Y + 0.15, 0x6aa4d8);
  lbl(utilities, 'WELL · north of the house · approximate, 1993 sketch, not surveyed', ex.well.x, 10, ex.well.z - 8, 2.4);
  lbl(utilities, '50 ft well setback', ex.well.x + 38, 8, ex.well.z, 1.8);

  flatBox(utilities, ex.tank.x - ex.tank.w / 2, ex.tank.z - ex.tank.d / 2, ex.tank.w, ex.tank.d, Y + 0.3, 0x6b5344, 0.9);
  lbl(utilities, ex.tank.label, ex.tank.x, 8, ex.tank.z, 2.0);

  hatchField(utilities, ex.field.x, ex.field.z, ex.field.w, ex.field.d, Y, 0xb85c38);
  lbl(utilities, ex.field.label, ex.field.x + ex.field.w / 2, 9, ex.field.z + ex.field.d / 2, 2.3);
  lbl(utilities, 'Approximate, from the 1993 sketch, not surveyed', ex.field.x + ex.field.w / 2, 6, ex.field.z + ex.field.d + 8, 2.0);

  polyLine(utilities, ex.sewer, Y + 0.35, 0xc9a36a, false);
  lbl(utilities, 'House-to-tank sewer (approx.)', 8, 6, 50, 1.7);

  // 10 ft property-line setback along the shared east line (no parcel numbers)
  const eastLine = [[99.6, -487], [100.99, -487.24], [94.96, 429.85]];
  polyLine(utilities, eastLine, Y + 0.2, 0xd7c39a, false);
  const setback = eastLine.map(([x, z]) => [x - 10, z]);
  polyLine(utilities, setback, Y + 0.2, 0x8a7a5a, false);
  lbl(utilities, 'Property line (10 ft setback dashed) · no survey', 110, 10, 80, 2.0);
  // dashed look: second offset line
  polyLine(utilities, eastLine.map(([x, z]) => [x + 10, z]), Y + 0.2, 0x8a7a5a, false);

  // Option A routes (shown with existing utilities)
  if (U.optionA) {
    polyLine(utilities, U.optionA.sewerRoute, Y + 0.45, 0x5aa0c8, false);
    polyLine(utilities, U.optionA.waterRoute, Y + 0.45, 0x4a88aa, false);
    lbl(utilities, 'Option A sewer / water — skirt the field, do not trench it', 85, 9, 140, 2.0);
    // direct “do not trench” path
    const avoid = U.optionA.avoid;
    const bad = polyLine(utilities, avoid, Y + 0.5, 0xc0453a, false);
    lbl(utilities, 'Do not trench a direct barn-to-tank line — it crosses the field', 48, 8, 160, 2.0);
  }

  // Airstream path that stays outside the well radius
  polyLine(utilities, [[-50, 50], [-50, -100], [20, -100], [81.55, -54]], Y + 0.3, 0xb8a07a, false);
  lbl(utilities, 'Airstream access · stay outside the 50 ft well radius', 10, 8, -110, 2.0);

  // ——— Future option B: barn well + septic ———
  const ob = U.optionB;
  wellHead(futureUtil, ob.well.x, ob.well.z, 0, 0x2f8f6b);
  disc(futureUtil, ob.well.x, ob.well.z, ob.wellRadiusFt, Y, 0x2f8f6b, 0.12);
  ring(futureUtil, ob.well.x, ob.well.z, ob.wellRadiusFt, Y + 0.15, 0x5ec49a);
  lbl(futureUtil, ob.well.label, ob.well.x, 11, ob.well.z, 2.3);
  lbl(futureUtil, '50 ft setback · future option', ob.well.x + 36, 8, ob.well.z + 16, 1.7);
  flatBox(futureUtil, ob.tank.x - ob.tank.w / 2, ob.tank.z - ob.tank.d / 2, ob.tank.w, ob.tank.d, Y + 0.3, 0x3e6b55, 0.9);
  lbl(futureUtil, ob.tank.label, ob.tank.x, 8, ob.tank.z, 1.8);
  hatchField(futureUtil, ob.field.x, ob.field.z, ob.field.w, ob.field.d, Y, 0x3e8f6b);
  lbl(futureUtil, ob.field.label, ob.field.x + ob.field.w / 2, 8, ob.field.z + ob.field.d / 2, 1.9);
  lbl(futureUtil, 'FUTURE OPTION · accessory bath only (no bedroom / kitchen) · estimates · permits required', ob.field.x + 30, 12, ob.field.z + 30, 2.2);

  // ——— Future concept: cottage, drives, buffer, trail ———
  const cot = F.cottage;
  const cottageMesh = new THREE.Mesh(
    new THREE.BoxGeometry(cot.w, 16, cot.d),
    new THREE.MeshStandardMaterial({ color: 0xd8c4a4, transparent: true, opacity: 0.88, roughness: 0.8 })
  );
  cottageMesh.position.set(cot.x, 8, cot.z);
  future.add(cottageMesh);
  const porch = new THREE.Mesh(
    new THREE.BoxGeometry(cot.w * 0.7, 1, 8),
    new THREE.MeshStandardMaterial({ color: 0x8a7355 })
  );
  porch.position.set(cot.x, 0.6, cot.z - cot.d / 2 - 3);
  future.add(porch);
  lbl(future, 'FUTURE CONCEPT · 1,000–1,400 sf cottage · 2 bed · north porch · not a construction plan', cot.x, 22, cot.z - 8, 2.6);

  function ribbon(group, pts, width, color, y) {
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      const dx = b[0] - a[0], dz = b[1] - a[1];
      const len = Math.hypot(dx, dz) || 1;
      const m = new THREE.Mesh(new THREE.BoxGeometry(width, 0.18, len + 0.4), mat(color, 0.92));
      m.position.set((a[0] + b[0]) / 2, y, (a[1] + b[1]) / 2);
      m.rotation.y = Math.atan2(dx, dz);
      group.add(m);
    }
  }
  ribbon(future, F.driveway.existing, 12, 0x6b6e72, 0.12);
  ribbon(future, F.driveway.spur, 12, 0x8a8680, 0.16);
  ribbon(future, F.driveway.hammerhead, 20, 0x8a8680, 0.16);
  ribbon(future, F.driveway.trail, 4, 0x6a5a40, 0.14);
  lbl(future, 'Existing drive (from the north, west side of the house)', -40, 8, 20, 2.0);
  lbl(future, 'Recommended spur · stays south of the drain field · estimates, not a bid', 80, 10, 230, 2.1);
  lbl(future, 'Turnaround / hammerhead (fire access to confirm)', cot.x, 8, cot.z + 28, 1.8);
  lbl(future, 'Foot trail (schematic)', 100, 7, 120, 1.6);

  // evergreen buffer on cottage NW side
  const bufX = cot.x - 28, bufZ = cot.z - 28;
  for (let i = 0; i < 14; i++) {
    const x = bufX + (i % 7) * 6 - 4;
    const z = bufZ + Math.floor(i / 7) * 8;
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 6, 6), new THREE.MeshStandardMaterial({ color: 0x65503b }));
    trunk.position.set(x, 3, z);
    future.add(trunk);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(4, 14, 7), new THREE.MeshStandardMaterial({ color: 0x2f5a3c }));
    cone.position.set(x, 12, z);
    future.add(cone);
  }
  lbl(future, 'Proposed evergreen / mixed buffer (20–30 ft) on the NW side', bufX, 16, bufZ - 8, 2.0);

  // Sightline from east deck toward cottage (bare-earth does not hide it)
  polyLine(future, [[36, 36], [cot.x, cot.z]], 8, 0xd4c07a, false);
  lbl(future, 'Sightline from the east deck (bare-earth is not blocked — screening needed)', 90, 16, 140, 2.0);

  // East-land outline, no numbers
  const eastLand = [[294.35, 132.68], [298.34, -485.94], [298.98, -585.25], [99.64, -587.24], [100.99, -487.24], [94.96, 429.85], [106.71, 429.99], [293.88, 432.17]];
  polyLine(future, eastLand, Y + 0.1, 0xc5b48a, true);
  lbl(future, 'East land (future concept) · outline only', 200, 12, 50, 2.2);

  // House-parcel “property” outline for context (no PIN, no acreage)
  const houseRing = [[100.99, -487.24], [-102.95, -489.19], [-103.26, -290.55], [-104.37, 427.52], [94.96, 429.85]];
  polyLine(future, houseRing, Y + 0.08, 0x9aa58a, true);

  // Enlarged ground plane and open east yard: fade the old circular trees that land on the field / east land / cottage
  if (deal.groups.site) {
    deal.groups.site.traverse((o) => {
      if (o.isMesh && o.geometry && (o.geometry.type === 'ConeGeometry' || (o.geometry.type === 'CylinderGeometry' && o.position.y < 5))) {
        const x = o.position.x, z = o.position.z;
        // hide trees sitting on the drain field, east open land, or driveway apron
        if (x > 20 && z > -40) o.visible = false;
        if (x > -10 && z > 100 && x < 60 && z < 150) o.visible = false; // field
      }
    });
    // larger quiet ground to the south/east so the cottage is not in the void
    const ground = new THREE.Mesh(
      new THREE.BoxGeometry(700, 1, 1100),
      new THREE.MeshStandardMaterial({ color: 0x84916d, roughness: 1 })
    );
    ground.position.set(80, -1.6, -80);
    ground.receiveShadow = true;
    deal.groups.site.add(ground);
  }

  function applyOverlayVis() {
    utilities.visible = overlay.utilities;
    futureUtil.visible = overlay.futureUtil;
    future.visible = overlay.future;
  }
  applyOverlayVis();

  const tools = document.getElementById('tools');
  function addToggle(id, caption, key, title) {
    const b = document.createElement('button');
    b.id = id;
    b.type = 'button';
    b.textContent = caption + ': off';
    b.title = title;
    b.setAttribute('aria-pressed', 'false');
    b.onclick = () => {
      overlay[key] = !overlay[key];
      b.textContent = caption + (overlay[key] ? ': on' : ': off');
      b.setAttribute('aria-pressed', overlay[key] ? 'true' : 'false');
      applyOverlayVis();
    };
    tools.appendChild(b);
    return b;
  }
  if (tools) {
    addToggle('utilToggle', 'Utilities: well & septic', 'utilities',
      '1993 well, tank, drain field, sewer, and setbacks. Approximate, from the sketch, not surveyed.');
    addToggle('futureUtilToggle', 'Future option: barn well & septic', 'futureUtil',
      'Separate well and small septic near the rear barn. Accessory use only. Estimates; permits required.');
    addToggle('futureToggle', 'Future concept', 'future',
      'Cottage-style house on the east land, driveway spur, trail, and screening. Concept only.');
  }

  const inner = deal.jump;
  function jump(k) {
    const r = inner(k);
    applyOverlayVis();
    return r;
  }
  deal.jump = jump;
  window.setView = jump;

  // Extra views
  const views = deal.views;
  views.utilities = {
    name: 'Utilities: well & septic',
    pos: [80, 180, 280],
    target: [30, 2, 40],
    show: ['site', 'main', 'upper', 'lower', 'garage', 'front', 'gym', 'deck'],
    text: 'Approximate layout from the 1993 as-built sketch, not a survey: well north of the house (50 ft setback ring), 2,000-gal tank about 22 ft south of the house, 21×50 ft drain bed about 22 ft beyond the tank (no-drive / no-build), and the house-to-tank sewer. A straight trench from the gym barn to the tank would cut the field — option A must go around it. Use the Future option toggle for a separate barn well and septic. No permit numbers on this overlay. Locate lids and the wellhead on the ground.'
  };
  views.future = {
    name: 'Future concept · east land',
    pos: [280, 280, 520],
    target: [150, 4, 220],
    show: ['site', 'main', 'upper', 'lower', 'garage', 'front', 'gym', 'deck'],
    text: 'Future concept only: a 1,000–1,400 sf, 1.5-story, 2-bedroom cottage-style house southeast of the gym barn, porch facing north toward distant Elk Lake views. Reached by a spur off the existing driveway (the east land has no Deal Rd frontage) with a turnaround. An evergreen buffer on the north-west side helps screen the main house’s east deck — bare-earth sightlines are not blocked by terrain. A future barn well on this overlay could also serve the cottage. Zoning, perc, setbacks, and legal access still to verify. Not a construction plan.'
  };
  const sel = document.getElementById('view');
  if (sel && !sel.querySelector('option[value="utilities"]')) {
    for (const [k, name] of [['utilities', views.utilities.name], ['future', views.future.name]]) {
      const op = document.createElement('option');
      op.value = k; op.textContent = name; sel.append(op);
    }
    sel.onchange = () => {
      if (sel.value === 'utilities') { overlay.utilities = true; document.getElementById('utilToggle') && (document.getElementById('utilToggle').textContent = 'Utilities: well & septic: on', document.getElementById('utilToggle').setAttribute('aria-pressed', 'true')); }
      if (sel.value === 'future') { overlay.future = true; document.getElementById('futureToggle') && (document.getElementById('futureToggle').textContent = 'Future concept: on', document.getElementById('futureToggle').setAttribute('aria-pressed', 'true')); }
      jump(sel.value);
    };
  }


  // Terrain drape (USGS 3DEP height + Esri World Imagery). Approximate, 2016 bare-earth.
  (function addTerrain(){
    const grid = {x0:-200,x1:360,z0:-960,z1:480,zmin:739.13,zmax:850.79,house:809.73};
    const segsX=139, segsZ=179;
    const img = new Image();
    img.onload = function(){
      const c=document.createElement('canvas');
      c.width=img.width; c.height=img.height;
      const ctx=c.getContext('2d'); ctx.drawImage(img,0,0);
      const pix=ctx.getImageData(0,0,c.width,c.height).data;
      const geo=new THREE.PlaneGeometry(grid.x1-grid.x0, grid.z1-grid.z0, segsX, segsZ);
      const pos=geo.attributes.position, uv=geo.attributes.uv;
      const nx=segsX+1, nz=segsZ+1;
      for(let j=0;j<nz;j++){
        for(let i=0;i<nx;i++){
          const k=j*nx+i;
          const x=grid.x0+i/segsX*(grid.x1-grid.x0);
          const z=grid.z0+j/segsZ*(grid.z1-grid.z0);
          const px=Math.min(c.width-1, Math.round(i/segsX*(c.width-1)));
          const py=Math.min(c.height-1, Math.round(j/segsZ*(c.height-1)));
          const v=pix[(py*c.width+px)*4]/255;
          const y=(grid.zmin + v*(grid.zmax-grid.zmin)) - grid.house;
          pos.setXYZ(k, x, y, z);
          uv.setXY(k, i/segsX, 1-j/segsZ);
        }
      }
      geo.computeVertexNormals();
      const tex=new THREE.TextureLoader().load('assets/site-imagery.jpg');
      if (THREE.sRGBEncoding) tex.encoding=THREE.sRGBEncoding;
      const mesh=new THREE.Mesh(geo, new THREE.MeshStandardMaterial({map:tex, roughness:0.95, metalness:0}));
      mesh.receiveShadow=true; mesh.name='terrainDrape';
      deal.groups.site.add(mesh);
      deal.groups.site.traverse(function(o){
        if(o.isMesh && o.geometry && o.geometry.type==='BoxGeometry'){
          const p=o.geometry.parameters;
          if(p && p.width>=300 && p.depth>=300) o.visible=false;
        }
      });
    };
    img.src='assets/site-terrain-height.png';
  })();

  // Gym cost-by-category panel
  (function gymPanel(){
    const box=document.getElementById('gymcosts');
    const body=document.getElementById('gymcosts-body');
    const C=(L && L.gymCosts) || {};
    if(!box||!body||!C.categories) return;
    function money(n){return n===0?'$0 (already coming)':'$'+Math.round(n).toLocaleString('en-US');}
    let html='<table><tr><th>Category</th><th>Estimate</th></tr>';
    C.categories.forEach(function(cat){
      html+='<tr><td>'+cat.name+(cat.budget==='envelope'?' <span class="muted">(envelope)</span>':'')+'</td><td>'+money(cat.low)+' – '+money(cat.high)+'</td></tr>';
    });
    html+='</table>';
    html+='<p class="muted">Gym equipment + ¾ in mats (incl. 6% MI tax): about $'+(C.headlineWithTax&&C.headlineWithTax.low?C.headlineWithTax.low/1000:'13.5')+'K–$'+(C.headlineWithTax&&C.headlineWithTax.high?C.headlineWithTax.high/1000:'25')+'K, a separate line from the under-$100k house/barn-envelope budget. '+((C && C.note)||'')+'</p>';
    body.innerHTML=html;
    function sync(){
      const on = (deal.jump && document.getElementById('view') && ['gym','recovery'].indexOf(document.getElementById('view').value)>=0);
      box.hidden=!on;
      box.style.display=on?'block':'none';
    }
    const sel=document.getElementById('view');
    if(sel){ const prev=sel.onchange; sel.onchange=function(e){ if(prev) prev.call(this,e); else jump(sel.value); sync(); }; }
    const inner=deal.jump;
    // already wrapped once above; wrap again for panel
    deal.jump=function(k){ const r=inner(k); sync(); return r; };
    window.setView=deal.jump;
    sync();
  })();

  deal.overlays = overlay;
  window.SITE_LAYERS_READY = true;
})();

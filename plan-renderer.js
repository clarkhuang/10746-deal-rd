/* Pure SVG renderer: reads the same room/link definitions as model.js. North is up, east is right. */
(function(root){
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function wrap(s,n){const lines=[];for(const word of String(s).split(' ')){if(!lines.length||lines[lines.length-1].length+word.length+1>n)lines.push(word);else lines[lines.length-1]+=' '+word;}return lines;}
const UNC='#c25a1c';
function render(level){
 const sc=14,pad=46,top=96,bottom=150,x0=Math.min(...level.rooms.map(r=>r.x)),z0=Math.min(...level.rooms.map(r=>r.z)),x1=Math.max(...level.rooms.map(r=>r.x+r.w)),z1=Math.max(...level.rooms.map(r=>r.z+r.d));
 const W=Math.max(760,(x1-x0)*sc+pad*2),H=(z1-z0)*sc+top+bottom,X=x=>(x-x0)*sc+pad,Z=z=>(z-z0)*sc+top;
 const a=[`<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc" viewBox="0 0 ${W} ${H}"><title id="title">${esc(level.name)} — north-up reconstruction</title><desc id="desc">North is up. East (right) is the East Deck toward Elk Lake; garage doors face west. Listing dimensions shown where the listing gives them; other sizes are approximate and unmeasured. Orange dashed items are unverified.</desc><rect width="${W}" height="${H}" fill="#f3eee2"/>`];
 a.push(`<text x="${pad}" y="34" font-family="Georgia,serif" font-size="22" fill="#22333e">${esc(level.name)}</text><text x="${pad}" y="58" font-family="system-ui,sans-serif" font-size="12" fill="#5b6870">North up · East Deck / Elk Lake to the right · garage doors west · listing sizes marked ″ · unlisted sizes approximate (unmeasured)</text>`);
 // north arrow
 const nx=W-pad-20;a.push(`<g font-family="system-ui,sans-serif"><path d="M${nx} 30 l-11 30 l11 -8 l11 8 z" fill="#22333e"/><text x="${nx}" y="78" text-anchor="middle" font-size="14" font-weight="700" fill="#22333e">N</text><text x="${nx+38}" y="50" text-anchor="middle" font-size="10" fill="#5b6870">E · lake</text></g>`);
 const palette={hall:'#ded4be',bath:'#cbdad9',outdoor:'#dde0c8',stairs:'#e7d5ac',void:'#eae4d6',garage:'#d5d6d1'};
 for(const r of level.rooms){const u=r.uncertain,dash=['stairs','outdoor','void'].includes(r.kind)||u;
  a.push(`<g><title>${esc(r.label+(r.dim?' · listing '+r.dim:'')+(r.use?' · proposed: '+r.use:'')+(u?' · UNVERIFIED: '+u:''))}</title><rect x="${X(r.x)}" y="${Z(r.z)}" width="${r.w*sc}" height="${r.d*sc}" fill="${palette[r.kind]||'#f9f6ee'}" stroke="${u?UNC:'#374653'}" stroke-width="${u?1.6:2.2}" ${dash?'stroke-dasharray="6 4"':''}/></g>`);
  if(r.kind==='stairs')for(let i=1;i<11;i++)a.push(`<path d="M${X(r.x)} ${Z(r.z+r.d*i/11)}h${r.w*sc}" stroke="#b6a37c" stroke-width="1"/>`);
  if(r.kind==='stairs'){if(r.rise==='W')a.push(`<path d="M${X(r.x+r.w-.8)} ${Z(r.z+r.d/2)}H${X(r.x+.8)}" stroke="#8e712e" stroke-width="2" marker-end="url(#ar)"/>`);else a.push(`<path d="M${X(r.x+r.w/2)} ${Z(r.z+.8)}V${Z(r.z+r.d-.8)}" stroke="#8e712e" stroke-width="2" marker-end="url(#ar)"/>`);}
 }
 a.push('<defs><marker id="ar" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="#8e712e"/></marker></defs>');
 for(const w of level.windows||[]){const h=w.axis==='z';const x=h?X(w.start):X(w.at),y=h?Z(w.at):Z(w.start),dx=h?(w.end-w.start)*sc:0,dz=h?0:(w.end-w.start)*sc;
  a.push(`<path d="M${x} ${y}l${dx} ${dz}" stroke="#f3eee2" stroke-width="6"/><path d="M${x} ${y}l${dx} ${dz}" stroke="#3c8b99" stroke-width="2"/><path d="M${x+(h?0:3)} ${y+(h?3:0)}l${dx} ${dz}" stroke="#3c8b99" stroke-width="1"><title>Window</title></path>`);}
 for(const l of level.links){const x=l.axis==='x'?l.at:l.start,z=l.axis==='z'?l.at:l.start,dx=l.axis==='z'?(l.end-l.start)*sc:0,dz=l.axis==='x'?(l.end-l.start)*sc:0;
  const glass=['glass','slider','glassdoor'].includes(l.kind),col=l.uncertain?UNC:glass?'#2e7f8e':'#a8792f';
  a.push(`<path d="M${X(x)} ${Z(z)}l${dx} ${dz}" stroke="#f3eee2" stroke-width="8"/><path d="M${X(x)} ${Z(z)}l${dx} ${dz}" stroke="${col}" stroke-width="${l.kind==='open'?3:5}" ${l.kind==='open'?'stroke-dasharray="4 3"':''}><title>${esc(l.a+' ↔ '+l.b+' · '+l.kind+(l.note?' · '+l.note:'')+(l.uncertain?' · UNVERIFIED: '+l.uncertain:''))}</title></path>`);
  if(l.uncertain)a.push(`<text x="${X(x)+dx/2+(l.axis==='x'?7:0)}" y="${Z(z)+dz/2+(l.axis==='z'?-6:4)}" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="${UNC}">?</text>`);
 }
 for(const r of level.rooms){if(r.kind==='void'&&r.w<4)continue;const n=Math.max(7,Math.floor(r.w*sc/7.2)),lines=wrap(r.label,n);let extra=[];
  if(r.dim)extra.push([r.dim+(r.listingRoom?' · '+r.listingRoom:'')+' (listing)','#1f5c66',11]);else if(!['outdoor','void','stairs','hall'].includes(r.kind))extra.push(['size not listed · approx','#8a7a62',10]);
  if(r.use)extra.push(['Proposed: '+r.use,'#866020',10]);
  if(r.uncertain&&r.kind!=='outdoor')extra.push(['? unverified','#c25a1c',10]);
  if(r.w<7.5||r.d<6.5)extra=extra.filter(e=>e[1]==='#c25a1c'||e[1]==='#1f5c66');
  const total=lines.length*15+extra.length*13,cx=X(r.x+r.w/2);let y=Z(r.z+r.d/2)-total/2+11;
  a.push(`<text x="${cx}" y="${y}" text-anchor="middle" fill="#22333e" font-family="system-ui,sans-serif" font-size="12.5" font-weight="600">${lines.map((s,i)=>`<tspan x="${cx}" dy="${i?15:0}">${esc(s)}</tspan>`).join('')}</text>`);y+=lines.length*15-2;
  for(const [t,c,fs] of extra){const wl=wrap(t,Math.max(10,Math.floor(r.w*sc/(fs*.56))));a.push(`<text x="${cx}" y="${y}" text-anchor="middle" fill="${c}" font-family="system-ui,sans-serif" font-size="${fs}">${wl.map((s,i)=>`<tspan x="${cx}" dy="${i?12:0}">${esc(s)}</tspan>`).join('')}</text>`);y+=wl.length*12+1;}
 }
 // proposed furniture footprints (from DEAL_LAYOUT.furniture)
 const furn=(root.DEAL_LAYOUT&&root.DEAL_LAYOUT.furniture||[]).filter(f=>f.level===level.id);
 for(const f of furn){const col=f.kind==='art'?'#5a6b78':f.kind==='bar'?'#8a6a3e':f.kind==='piano'?'#1a1c1e':f.kind==='sofa'?'#6d737a':f.kind==='sauna'?'#8b5a2b':f.kind==='bath'?'#7a9e9b':f.kind==='plunge'?'#5b8fa8':'#3d2a22';
  const dash=f.uncertain?'stroke-dasharray="4 3"':'';
  a.push(`<g><title>${esc(f.label+(f.detail?' · '+f.detail:'')+(f.note?' · '+f.note:''))}</title><rect x="${X(f.x)}" y="${Z(f.z)}" width="${f.w*sc}" height="${f.d*sc}" fill="${col}" fill-opacity=".22" stroke="${col}" stroke-width="1.6" ${dash}/></g>`);
  if(f.kind==='piano'){/* lid hint toward north (fireplace) */a.push(`<path d="M${X(f.x+f.w/2)} ${Z(f.z+f.d)}v${-12}" stroke="${col}" stroke-width="1.5" marker-end="url(#ar)"/><text x="${X(f.x+f.w/2)+6}" y="${Z(f.z)-6}" font-family="system-ui,sans-serif" font-size="9" fill="${col}">lid → fire</text>`);}
  const cx=X(f.x+f.w/2),cy=Z(f.z+f.d/2);
  const fs=f.w*sc<40?8:9;
  a.push(`<text x="${cx}" y="${cy+3}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${fs}" font-weight="600" fill="${col}">${esc(f.label)}</text>`);
 }
 // scale bar + legend
 const ly=H-bottom+38;a.push(`<g font-family="system-ui,sans-serif" font-size="11" fill="#34434c"><path d="M${pad} ${ly}h${10*sc}" stroke="#22333e" stroke-width="3"/><text x="${pad}" y="${ly+16}">10 ft (drawing scale; not a measurement)</text>`);
 const items=[['#a8792f','Door',''],['#a8792f','Opening','4 3'],['#2e7f8e','Glass / slider door',''],['#3c8b99','Window',''],['#1a1c1e','Proposed furniture',''],[UNC,'Unverified (?)','6 4']];
 items.forEach(([c,t,d],i)=>{const lx=pad+i*(W-2*pad)/6;a.push(`<path d="M${lx} ${ly+44}h28" stroke="${c}" stroke-width="4" ${d?`stroke-dasharray="${d}"`:''}/><text x="${lx+34}" y="${ly+48}">${t}</text>`);});
 a.push(`<text x="${pad}" y="${ly+78}" fill="#5b6870">Concept reconstruction from listing dimensions, photos and walkthrough stills. Not an as-built or measured drawing.</text></g></svg>`);
 return a.join('');
}
root.renderDealPlan=render;if(typeof module!=='undefined')module.exports={render};
})(typeof window!=='undefined'?window:globalThis);

/* Pure SVG renderer: reads the same room/link definitions as model.js. */
(function(root){
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function wrap(s,n){const lines=[];for(const word of s.split(' ')){if(!lines.length||lines[lines.length-1].length+word.length+1>n)lines.push(word);else lines[lines.length-1]+=' '+word;}return lines;}
function render(level){
 const sc=13,pad=28,x0=Math.min(...level.rooms.map(r=>r.x)),z0=Math.min(...level.rooms.map(r=>r.z)),x1=Math.max(...level.rooms.map(r=>r.x+r.w)),z1=Math.max(...level.rooms.map(r=>r.z+r.d));
 const W=(x1-x0)*sc+pad*2,H=(z1-z0)*sc+pad*2,X=x=>(x-x0)*sc+pad,Z=z=>(z-z0)*sc+pad;
 let a=[`<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc" viewBox="0 0 ${W} ${H}"><title id="title">${esc(level.name)} — schematic walkthrough reconstruction</title><desc id="desc">Room connections from walkthrough. All sizes and alignments estimated. No measured dimensions or surveyed compass. Gold gaps are connections; dashed outlines are outdoor areas or stair placeholders.</desc><rect width="${W}" height="${H}" fill="#f3eee2"/>`];
 const palette={hall:'#ded4be',bath:'#cbdad9',outdoor:'#dde0c8',stairs:'#e7d5ac',void:'#f3eee2',garage:'#d5d6d1'};
 for(const r of level.rooms){a.push(`<g><title>${esc(r.label+(r.use?' · Proposed use: '+r.use:'')+' · schematic, unmeasured')}</title><rect x="${X(r.x)}" y="${Z(r.z)}" width="${r.w*sc}" height="${r.d*sc}" fill="${palette[r.kind]||'#f9f6ee'}" stroke="#374653" stroke-width="2" ${['stairs','outdoor','void'].includes(r.kind)?'stroke-dasharray="6 4"':''}/></g>`);
 if(r.kind==='stairs')for(let i=1;i<10;i++)a.push(`<path d="M${X(r.x)} ${Z(r.z+r.d*i/10)}h${r.w*sc}" stroke="#b6a37c" stroke-width="1"/>`);
 }
 for(const l of level.links){const x=l.axis==='x'?l.at:l.start,z=l.axis==='z'?l.at:l.start,dx=l.axis==='z'?(l.end-l.start)*sc:0,dz=l.axis==='x'?(l.end-l.start)*sc:0;
 a.push(`<path d="M${X(x)} ${Z(z)}l${dx} ${dz}" stroke="#f3eee2" stroke-width="7"/><path d="M${X(x)} ${Z(z)}l${dx} ${dz}" stroke="${['glass','slider'].includes(l.kind)?'#3c8b99':'#ba9049'}" stroke-width="3" ${l.kind==='open'?'stroke-dasharray="3 3"':''}><title>${esc(l.a+' ↔ '+l.b+' · '+l.kind)}</title></path>`);
 }
 for(const r of level.rooms){const n=Math.max(8,Math.floor(r.w*sc/6.5)),lines=wrap(r.label,n),cx=X(r.x+r.w/2),cy=Z(r.z+r.d/2)-(lines.length-1)*7-(r.use?10:0);
 a.push(`<text x="${cx}" y="${cy}" text-anchor="middle" fill="#22333e" font-family="system-ui,sans-serif" font-size="12" font-weight="600">${lines.map((s,i)=>`<tspan x="${cx}" dy="${i?15:0}">${esc(s)}</tspan>`).join('')}</text>`);
 if(r.use){const use=wrap('Proposed: '+r.use,Math.max(10,Math.floor(r.w*sc/5.3)));a.push(`<text x="${cx}" y="${cy+lines.length*15+2}" text-anchor="middle" fill="#866020" font-family="system-ui,sans-serif" font-size="10">${use.map((s,i)=>`<tspan x="${cx}" dy="${i?12:0}">${esc(s)}</tspan>`).join('')}</text>`);}
 }
 a.push('</svg>');return a.join('');
}
root.renderDealPlan=render;if(typeof module!=='undefined')module.exports={render};
})(typeof window!=='undefined'?window:globalThis);

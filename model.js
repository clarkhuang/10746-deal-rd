/* Deal Rd conceptual workup. Feet throughout; inferred geometry, not surveyed. Adapted Samels scene structure/libraries. */
(()=>{'use strict';
const renderer=new THREE.WebGLRenderer({canvas:document.getElementById('c3d'),antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setSize(innerWidth,innerHeight);renderer.outputEncoding=THREE.sRGBEncoding;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;
const scene=new THREE.Scene();scene.background=new THREE.Color('#b7ccd2');const camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,.1,1500);const controls=new THREE.OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.maxPolarAngle=Math.PI*.49;controls.minDistance=2;controls.maxDistance=480;
const amb=new THREE.HemisphereLight(0xd8eaff,0x6e6049,.9);scene.add(amb);const sun=new THREE.DirectionalLight(0xffdfb0,1.4);sun.position.set(40,100,55);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-170,right:170,top:170,bottom:-170,near:1,far:400});sun.shadow.bias=-.001;scene.add(sun);
const groups={};['site','main','upper','lower','garage','front','gym','deck'].forEach(k=>{groups[k]=new THREE.Group();scene.add(groups[k]);});const roofs=[],labels=[],clubLights=[];let showLabels=true,roofOn=false,walking=false,current='site',night=false,tourTimer=null;
const TL=new THREE.TextureLoader();function material(color,map,repeat=[1,1],rough=.72,metal=0){let m=new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});if(map){let t=TL.load('assets/tex/'+map);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(...repeat);t.encoding=THREE.sRGBEncoding;m.map=t;}return m;}
const wood=material(0xb9a17d,'oak_wood_planks_gray.jpg',[7,5]),ply=material(0xc8a475,'plywood_diff.jpg',[4,2]),rubber=material(0x292b2e,'rubber_tiles_diff.jpg',[8,8]),metal=material(0x273038,null,[1,1],.35,.7),leather=material(0x452c20,null,[1,1],.46),gold=material(0xb38c4d,null,[1,1],.3,.75),wall=material(0xe2d8c1),stone=material(0x817b6c),dark=material(0x14181e),glass=new THREE.MeshStandardMaterial({color:0xa8d3df,transparent:true,opacity:.28,roughness:.1,metalness:.05});
function B(g,x,y,z,w,h,d,m){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),typeof m==='object'?m:material(m));o.position.set(x,y+h/2,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
function C(g,x,y,z,r,h,m,r2){const o=new THREE.Mesh(new THREE.CylinderGeometry(r2===undefined?r:r2,r,h,24),typeof m==='object'?m:material(m));o.position.set(x,y+h/2,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
function sphere(g,x,y,z,r,m){let o=new THREE.Mesh(new THREE.SphereGeometry(r,18,12),typeof m==='object'?m:material(m));o.position.set(x,y,z);g.add(o);o.castShadow=true;return o;}
function bar(g,a,b,r,m){const A=new THREE.Vector3(...a),D=new THREE.Vector3(...b).sub(A);const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,D.length(),12),typeof m==='object'?m:material(m));o.position.copy(A.addScaledVector(D,.5));o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),D.normalize());g.add(o);o.castShadow=true;return o;}
function label(g,text,x,y,z,size=3){const c=document.createElement('canvas');c.width=1024;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle='rgba(14,20,28,.89)';ctx.fillRect(0,0,1024,128);ctx.strokeStyle='#b99a69';ctx.strokeRect(2,2,1020,124);ctx.fillStyle='#f4ead8';ctx.font='500 39px sans-serif';ctx.textAlign='center';ctx.fillText(text,512,78,990);const mat=new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false,transparent:true});const s=new THREE.Sprite(mat);s.position.set(x,y,z);s.scale.set(size*5,size*.625,1);g.add(s);labels.push(s);return s;}
function rug(g,x,y,z,w,d,color){B(g,x,y+.025,z,w,.045,d,color);for(let i=-1;i<=1;i+=2){B(g,x,y+.06,z+i*(d/2-.18),w-.25,.01,.04,0x93806a);B(g,x+i*(w/2-.18),y+.06,z,.04,.01,d-.25,0x93806a);}}
function room(g,x,z,w,d,y=10){B(g,x,y-.35,z,w,.35,d,wood);B(g,x,y,z-d/2,w,8,.23,wall);B(g,x-w/2,y,z,.23,8,d,wall);/* open two faces for dollhouse */}
function partition(g,x,y,z,w,d,h=7){B(g,x,y,z,w,h,d,wall);}
function windowUnit(g,x,y,z,w,h){B(g,x,y,z,w,h,.12,glass);for(const s of [-1,1])B(g,x+s*w/2,y-.1,z,.12,h+.2,.18,0xf5f0de);B(g,x,y-.1,z,w+.2,.12,.2,0xf5f0de);B(g,x,y+h,z,w+.2,.12,.2,0xf5f0de);B(g,x,y,z,.09,h,.18,0xf5f0de);}
function chair(g,x,y,z,rot=0,m=leather){const q=new THREE.Group();q.position.set(x,y,z);q.rotation.y=rot;g.add(q);B(q,0,.7,0,2.6,.65,2.65,m);B(q,0,1.2,-1.15,2.6,2,.45,m);for(const s of [-1,1]){B(q,s*1.15,1.1,0,.38,1.1,2.6,m);for(const t of [-1,1])B(q,s*.95,0,t*.95,.16,.75,.16,gold);}return q;}
function bench(g,x,y,z,w=4){B(g,x,y+.5,z,w,.6,1.6,leather);for(let i=0;i<7;i++)for(let j=0;j<2;j++)sphere(g,x-w*.42+i*w*.14,y+1.11,z-.4+j*.8,.05,gold);for(const s of [-1,1])B(g,x+s*(w/2-.3),y,z,.16,.5,1.1,gold);}
function piano(g,x,y,z){const q=new THREE.Group();q.position.set(x,y,z);q.rotation.y=.25;g.add(q);const sh=new THREE.Shape();sh.moveTo(-2.42,-3.46);sh.lineTo(2.42,-3.46);sh.lineTo(2.42,0);sh.bezierCurveTo(2.3,3.6,-1.4,4,-2.15,1.9);sh.bezierCurveTo(-2.5,.8,-1.3,-.4,-2.42,-1.1);sh.closePath();const geo=new THREE.ExtrudeGeometry(sh,{depth:.5,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.07,bevelThickness:.07});geo.rotateX(Math.PI/2);const o=new THREE.Mesh(geo,material(0x080909,null,[1,1],.16,.35));o.position.y=2.9;q.add(o);o.castShadow=true;for(const [a,b] of [[-1.9,-2.6],[1.9,-2.6],[.4,2.35]]){C(q,a,.2,b,.13,2.4,dark);sphere(q,a,.15,b,.16,gold);}B(q,0,2.55,-3.4,4.9,.25,1,0x080909);for(let i=0;i<52;i++)B(q,-2.28+i*.088,2.83,-3.6,.08,.08,.64,0xf6f2de);for(let i=0;i<36;i++)if(i%7!==2&&i%7!==6)B(q,-2.2+i*.126,2.93,-3.42,.05,.1,.35,0x050505);const lid=new THREE.Mesh(geo,material(0x111113,null,[1,1],.23,.3));lid.scale.z=.13;lid.rotation.z=-.22;lid.position.set(-.3,4.05,0);q.add(lid);bar(q,[1.65,2.9,1],[1.65,4.5,1],.055,gold);bench(q,0,0,-5,2.6);B(q,0,3.06,-2.65,1.7,.5,.07,dark);}
function desk(g,x,y,z){B(g,x,y+2.4,z,5,.12,2.4,glass);for(const s of [-1,1]){B(g,x+s*2,y,z,.12,2.4,2.2,metal);}B(g,x,y+2.55,z-.65,1.7,1,.12,dark);B(g,x,y+2.5,z+.3,1.5,.05,.5,0xcccccc);chair(g,x,y,z+2,Math.PI,metal);}
function bed(g,x,y,z,w=5,d=6.5){B(g,x,y+.25,z,w,.75,d,0x594333);B(g,x,y+1,z,w,.65,d,0xe4dfd1);B(g,x,y+.4,z-d/2,w,3,.28,0x725b48);B(g,x,y+1.65,z+.6,w-.1,.14,d*.6,0x646e76);for(const s of [-1,1]){B(g,x+s*w*.25,y+1.65,z-d*.32,w*.4,.3,1.25,0xf6f0e1);B(g,x+s*(w/2+1.05),y,z-d*.3,1.55,1.85,1.55,wood);}}
function plant(g,x,y,z){C(g,x,y,z,.55,1,0xb8afa0,.7);for(let i=0;i<6;i++){const a=i*2.4;bar(g,[x,y+1,z],[x+Math.cos(a)*.65,y+3.7-i*.2,z+Math.sin(a)*.65],.025,0x3a5b32);const s=sphere(g,x+Math.cos(a)*.65,y+3.3-i*.2,z+Math.sin(a)*.65,.55,0x3a6739);s.scale.set(.65,1.5,.4);}}
function light(g,x,y,z,color,power=20){const p=new THREE.PointLight(color,power,22,2);p.position.set(x,y,z);g.add(p);clubLights.push(p);}
// Diagrammatic site. No parcel boundary or surveyed bearing represented.
B(groups.site,0,-1.2,0,340,1,340,material(0x84916d,'leafy_grass_diff.jpg',[30,30]));B(groups.site,10,-.4,62,150,.12,16,0x73777b);B(groups.site,-6,-.35,52,22,.12,14,0x73777b);
for(let i=0;i<58;i++){const a=i*2.399,r=135+(i%6)*4;const x=Math.cos(a)*r,z=Math.sin(a)*r;C(groups.site,x,-1,z,.55,8,0x65503b);const tree=new THREE.Mesh(new THREE.ConeGeometry(4+(i%3),19,7),material(i%2?0x405f44:0x587342));tree.position.set(x,15,z);groups.site.add(tree);}label(groups.site,'ILLUSTRATIVE SITE · NOT A SURVEY · barns placed by owner-stated direction only',0,3,125,5);
// North marker: lakes north = -Z.
B(groups.site,0,0,-118,2,.4,22,0x1c2a33);{const t=new THREE.Mesh(new THREE.ConeGeometry(3,6,3),material(0x1c2a33));t.rotation.x=-Math.PI/2;t.position.set(0,1,-131);groups.site.add(t);}label(groups.site,'N · LAKES',0,8,-134,3.4);

// Seller sheet features: positions are diagrammatic, not established by a survey.
const sg=groups.site;
B(sg,30,0,-22,4,2.8,2.2,0xb8b6a7);for(let i=0;i<7;i++)B(sg,31.99,.45+i*.25,-22,.04,.08,1.7,0x555b5d);
label(sg,'GENERAC 10 kW · position unverified',30,6,-22,2.7);
for(const z of [-80,-50]){for(let x=-95;x<=-55;x+=8)B(sg,x,0,z,.25,4,.25,wood);for(let h of [1.3,2.7,3.8])bar(sg,[-95,h,z],[-55,h,z],.075,wood);}
for(const x of [-95,-55]){for(let z=-80;z<=-50;z+=6)B(sg,x,0,z,.25,4,.25,wood);for(let h of [1.3,2.7,3.8])bar(sg,[x,h,-80],[x,h,-50],.075,wood);}
label(sg,'HORSE CORRAL · position / size estimated',-75,7,-65,3);
label(sg,'817 ft paved road · schematic segment, not full length',10,2,72,4);

// Shared walkthrough topology replaces the old photo-inferred house entirely.
const L=window.DEAL_LAYOUT, O={x:20,z:20};
function roof(g,x,y,z,w,d,rise,color){const q=new THREE.Group();g.add(q);for(const s of [-1,1]){const len=Math.hypot(w/2,rise),o=B(q,x+s*w/4,y+rise/2,z,len,.3,d,color);o.rotation.z=s*-Math.atan2(rise,w/2);}q.visible=false;roofs.push(q);return q;}
const houseRooms={};
for(const level of L.levels){
 const base=groups[level.id],y=level.elevation, lines=new Map();
 for(const r of level.rooms){
  const g=r.kind==='garage'?groups.garage:base,cx=r.x+r.w/2-O.x,cz=r.z+r.d/2-O.z;houseRooms[r.id]={...r,g,y,cx,cz};
  if(r.kind==='void'){if(r.id==='void')label(g,'OPEN TO LIVING BELOW',cx,y+1,cz,1.6);continue;}
  B(g,cx,y-.25,cz,r.w,.25,r.d,r.kind==='outdoor'&&!r.id.includes('deck')?material(0x979384):r.kind==='hall'?material(0xc2b899):wood);
  label(g,(r.uncertain&&r.kind!=='outdoor'?'? ':'')+r.label+(r.dim?' · '+r.dim:''),cx,y+4.8,cz,Math.min(2.1,Math.max(1,r.w/8)));
  if(['stairs','outdoor'].includes(r.kind)){
   // Straight flights rise toward the south (+Z) on both levels; the lower flight is stacked beneath the main one (inferred).
   if(r.kind==='stairs')for(let i=0;i<12;i++)B(g,cx,y+i*10/12,r.z-O.z+(i+.5)*r.d/12,r.w-.5,.3,r.d/12,wood);
   continue;
  }
  for(const [axis,at,a,b] of [['x',r.x,r.z,r.z+r.d],['x',r.x+r.w,r.z,r.z+r.d],['z',r.z,r.x,r.x+r.w],['z',r.z+r.d,r.x,r.x+r.w]]){
   const side=axis==='x'?(at===r.x?'w':'e'):(at===r.z?'n':'s');if((r.open||[]).includes(side))continue;
   const key=axis+':'+at;if(!lines.has(key))lines.set(key,{axis,at,spans:[],g});lines.get(key).spans.push([a,b]);
  }
 }
 for(const {axis,at,spans,g} of lines.values()){
  spans.sort((a,b)=>a[0]-b[0]);const merged=[];for(const [a,b]of spans){const last=merged[merged.length-1];if(last&&a<=last[1])last[1]=Math.max(last[1],b);else merged.push([a,b]);}
  const gaps=level.links.filter(l=>l.axis===axis&&l.at===at);
  for(const [a,b]of merged){let pieces=[[a,b]];for(const gap of gaps)pieces=pieces.flatMap(([l,r])=>gap.end<=l||gap.start>=r?[[l,r]]:[[l,Math.max(l,gap.start)],[Math.min(r,gap.end),r]].filter(([l,r])=>r-l>.02));
   for(const [l,r]of pieces){const c=(l+r)/2;B(g,axis==='x'?at-O.x:c-O.x,y,axis==='x'?c-O.z:at-O.z,axis==='x'?.18:r-l,3.4,axis==='x'?r-l:.18,wall);}
  }
 }
 for(const l of level.links){
  const x=(l.axis==='x'?l.at:(l.start+l.end)/2)-O.x,z=(l.axis==='z'?l.at:(l.start+l.end)/2)-O.z,w=l.end-l.start;
  // Gold thresholds expose actual circulation connections without invented door swings.
  B(base,x,y+.025,z,l.axis==='x'?.45:w,.035,l.axis==='x'?w:.45,['open'].includes(l.kind)?0x77a79a:0xc39c63);
  if(['glass','slider','glassdoor'].includes(l.kind))B(base,x,y,z,l.axis==='x'?.08:w,6.5,l.axis==='x'?w:.08,glass);
  if(l.uncertain)label(base,'? '+(l.note||l.kind),x,y+3.2,z,.9);
 }
 // Windows (glass only, no door).
 for(const w of level.windows||[]){const len=w.end-w.start,c=(w.start+w.end)/2;const x=(w.axis==='x'?w.at:c)-O.x,z=(w.axis==='z'?w.at:c)-O.z;B(base,x,y+2.2,z,w.axis==='x'?.12:len,5.5,w.axis==='x'?len:.12,glass);}
 if(level.id==='upper'){const h=level.rooms.find(r=>r.id==='balcony'),zz=h.z-O.z;
  for(let x=0;x<=h.x+h.w;x+=1.5)B(base,x-O.x,y,zz,.08,3,.08,wood);
  bar(base,[-O.x,y+3,zz],[h.x+h.w-O.x,y+3,zz],.07,wood);
 }
}
const m=groups.main,u=groups.upper,lo=groups.lower;
const R=id=>houseRooms[id];
// Proposed furniture is deliberately separate from observed architectural topology.
let r=R('living');rug(m,r.cx,10,r.cz,16,12,0x2c2634);piano(m,r.cx-4,10,r.cz-2);chair(m,r.cx+4,10,r.cz,Math.PI);chair(m,r.cx+4,10,r.cz+4,2.4);bench(m,r.cx,10,r.cz+5);B(m,r.x-O.x+.6,10,r.cz,1.2,11,7,stone);label(m,'STONE FIREPLACE · west wall',r.x-O.x+2,22,r.cz,1.7);light(m,r.cx,16,r.cz,0xffb352,2);light(m,r.cx+5,15,r.cz+2,0xbd78ff,1);
r=R('kitchen');B(m,r.cx,10,r.cz,7,3,3,wood);B(m,r.cx,13,r.cz,7.2,.18,3.2,0xbdbcb3);for(let x=-4;x<=4;x+=2)B(m,r.cx+x,10,r.z-O.z+1,1.8,3,2,wood);
r=R('dining');B(m,r.cx,12.3,r.cz,6,.2,3,wood);chair(m,r.cx,10,r.cz+3);chair(m,r.cx,10,r.cz-3,Math.PI);
r=R('primary');bed(m,r.cx,10,r.cz,6.3,6.6);label(m,'Vaulted suite / skylight observed',r.cx,18,r.cz,1.6);
r=R('laundry');for(let x of [-2,1])B(m,r.cx+x,10,r.cz,2.6,3,2.6,0xd9dfdf);B(m,r.cx+4,10,r.cz,2.3,3,2.4,wood);
for(const id of ['primarybath','powder','upperbath','lowerbath']){r=R(id);B(r.g,r.cx,r.y,r.cz,2.5,2,2.6,0xe3e5e2);B(r.g,r.cx-2,r.y,r.cz-2,2,2.5,1.6,wood);}
for(const id of ['east','west']){r=R(id);desk(r.g,r.cx,r.y,r.cz);label(r.g,id==='east'?'PROPOSED: CLARK’S OFFICE':'PROPOSED: JENNY’S OFFICE',r.cx,r.y+7,r.cz,1.7);}
r=R('center');for(const x of [r.x+1,r.x+r.w-1]){B(u,x-O.x,20,r.cz,1.5,6.5,r.d-1,wood);bar(u,[x-O.x,25,r.z+1-O.z],[x-O.x,25,r.z+r.d-1-O.z],.05,metal);}label(u,'PROPOSED: JENNY’S CLOSET',r.cx,27,r.cz,1.8);
r=R('lowerliving');rug(lo,r.cx,0,r.cz,16,12,0x7c847e);B(lo,r.cx,0,r.cz+3,11,1.4,3,0x353b40);B(lo,r.cx,1,r.cz+4,11,1.4,.6,0x353b40);B(lo,r.cx-4.5,0,r.cz+1,2,1.4,6,0x353b40);B(lo,r.cx,2.5,r.z-O.z+.6,5.5,3,.15,0x101822);
for(const id of ['bed1','bed2']){r=R(id);bed(lo,r.cx,0,r.cz,4.5,6.3);}
r=R('kitchenette');for(let x=-4;x<=4;x+=2.5){B(lo,r.cx+x,0,r.z-O.z+1,2.3,2.9,2,wood);B(lo,r.cx+x,2.9,r.z-O.z+1,2.4,.15,2.1,0xc4c3b6);}B(lo,r.cx+5,0,r.cz,2.5,5.5,2.2,0xd5d6d2);
r=R('mechanical');C(lo,r.cx,0,r.cz,.9,5,0xc7c8c5);B(lo,r.cx-3,0,r.cz,2.4,4,2,0x3d6f8d);
label(m,'LISTING ROOM SIZES + WALKTHROUGH DOORS · other sizes approximate',0,30,10,3.5);
{const rs=L.levels[0].rooms.filter(r=>!['outdoor','garage'].includes(r.kind));const x0=Math.min(...rs.map(r=>r.x)),x1=Math.max(...rs.map(r=>r.x+r.w)),z0=Math.min(...rs.map(r=>r.z)),z1=Math.max(...rs.map(r=>r.z+r.d));roof(m,(x0+x1)/2-O.x,29,(z0+z1)/2-O.z,x1-x0+2,z1-z0+2,8,0x53565b);}
// Attached 2.5-car garage per seller sheet and generic vehicle envelopes.
function car(g,x,y,z,type,color){const q=new THREE.Group();q.position.set(x,y,z);g.add(q);const van=type==='van',len=van?24.5:(type==='sport'?15:15.8),wid=van?6.65:6.5,hei=van?9.5:5.4;B(q,0,y===0?.75:.75,0,wid,van?5.8:1.5,len,material(color,null,[1,1],.28,.65));B(q,0,van?6.4:2.2,van?-2:-.4,wid*.9,van?2.35:2,len*(van?.73:.55),material(color,null,[1,1],.3,.5));const wind=B(q,0,van?6.7:2.5,len*(van?.32:.28)+.1,wid*.84,van?1.8:1.4,.1,glass);wind.rotation.x=van?-.12:-.4;for(const s of [-1,1]){B(q,s*wid*.46,van?6.8:2.5,-1,.08,van?1.7:1.2,len*.4,glass);for(const t of [-1,1]){const wheel=C(q,s*(wid/2),.4,t*len*.31,van?1.25:1.05,.6,0x101214);wheel.rotation.z=Math.PI/2;wheel.position.y=1.25;const hub=C(q,s*(wid/2+.32),.4,t*len*.31,.58,.05,0xa0a3a4);hub.rotation.z=Math.PI/2;hub.position.y=1.25;}}B(q,0,1.2,len/2+.06,wid*.85,.6,.1,0xe7e4cc);if(van){B(q,0,8.75,-3,4,.35,6,0x252b30);B(q,0,8.75,6,4,.35,5,0x252b30);B(q,-3.7,7,0,.15,.25,15,metal);}return q;}
const ga=groups.garage;let gr=R('garage');car(ga,gr.cx-5,10,gr.cz,'suv',0xd0d3d6);car(ga,gr.cx+5,10,gr.cz,'suv',0x6e747a);label(ga,'MODEL Y + JENNY’S XT5 · proposed, fit unverified',gr.cx,18,gr.cz,2.7);
// Front 30 × 40 per seller sheet; conflicts with MLS 35 × 40. BOTH sliding + overhead doors.
function barnShell(g,x,z,w,d,ceiling=10){B(g,x,-.2,z,w,.2,d,0x9a9b96);B(g,x,0,z-d/2,w,ceiling,.22,ply);B(g,x-w/2,0,z,.22,ceiling,d,ply);for(let a=-w/2+1;a<w/2;a+=6)for(let t of [-1,1])B(g,x+a,0,z+t*(d/2-.3),.2,ceiling,.25,wood);for(let j=0;j<5;j++)bar(g,[x-w/2,ceiling,z-d/2+j*d/4],[x,ceiling+5,z-d/2+j*d/4],.13,wood);roof(g,x,ceiling,z,w+1,d+1,5,0x71787b);}
const fr=groups.front;fr.position.set(120,0,-125);/* local barn coords; group offset places it NE of house */barnShell(fr,-45,55,30,40,12);car(fr,-55,0,54,'van',0x8e979c);car(fr,-45,0,55,'sport',0x263d4c);car(fr,-35,0,55,'sport',0xa84c35);label(fr,'AIRSTREAM · 24X 4x4',-55,11,59,2);label(fr,'PORSCHE · wishlist',-45,7,63,1.8);label(fr,'MUSTANG · owned',-35,7,63,1.8);
// Front door lintels, open door leaves at ends, tracked sliding section.
B(fr,-45,11,75,30,.35,.4,metal);B(fr,-58,0,75,.3,11,.3,metal);B(fr,-45,0,75,.3,11,.3,metal);B(fr,-33,0,75,.3,11,.3,metal);B(fr,-28.5,0,75,7.5,10,.15,material(0x9ba4a4,'box_profile_metal_sheet_gray.jpg',[4,1]));B(fr,-39,10,74.5,11,.2,3,0xb0b4b5);label(fr,'SLIDING SECTION · owner confirms clearance',-53,13,76,2.7);label(fr,'OVERHEAD DOOR',-38,12,76,1.8);label(fr,'FRONT BARN · NE of house · 30 × 40 vs 35 × 40 unresolved · rotation unverified',-45,18,38,3.4);
// Rear 30 × 40 CrossFit box, plywood lining and insulated upper perimeter.
const gy=groups.gym;gy.position.set(118,0,135);/* SE of house; barn rotation unverified */barnShell(gy,-48,-55,30,40,9.5);B(gy,-48,.025,-55,29.7,.12,39.7,rubber);B(gy,-62.6,8,-55,.25,1.5,40,0x484f52);B(gy,-48,8,-74.6,30,1.5,.25,0x484f52);B(gy,-48,.18,-70,26,.05,4.5,0x526848);label(gy,'TURF / SLED LANE',-48,2.5,-70,2);B(gy,-39,0,-69.8,3,.3,2,metal);for(const z of [-70.5,-69.1])bar(gy,[-39,0,z],[-39,3,z],.09,metal);
function plate(g,x,y,z,r=.9){const o=C(g,x,y,z,r,.18,dark);o.rotation.z=Math.PI/2;o.position.y=y;return o;}
function barbell(g,x,y,z){bar(g,[x-3.6,y,z],[x+3.6,y,z],.045,0xaeb2b5);for(const s of [-1,1])for(let i=0;i<3;i++)plate(g,x+s*(2.4+i*.2),y,z,.9);}
// Four stations, 12 × 4 rig and operating zones.
for(const x of [-55,-49,-43])for(const z of [-58,-54]){B(gy,x,0,z,.18,9,.18,metal);for(let h=3;h<=5;h+=1)B(gy,x,h,z,.4,.08,.5,metal);}for(const z of [-58,-54])bar(gy,[-55,8.8,z],[-43,8.8,z],.065,metal);for(const x of [-55,-49,-43])bar(gy,[x,8.8,-58],[x,8.8,-54],.065,metal);
for(const x of [-52,-46])for(const z of [-62,-50]){B(gy,x,.18,z,7.6,.1,6,material(0x574f43));barbell(gy,x,1.1,z);}
for(const x of [-51,-47]){bar(gy,[x,8.8,-56],[x,6,-56],.025,0x303030);const o=new THREE.Mesh(new THREE.TorusGeometry(.32,.045,8,24),gold);o.position.set(x,5.7,-56);gy.add(o);}
label(gy,'FOUR-STATION CROSSFIT RIG',-49,12,-56,2.5);
// Dumbbell / kettlebell storage, bumper plates, wall balls and bar holder.
for(let j=0;j<3;j++){B(gy,-61,1+j*1.2,-57,1.6,.12,12,metal);for(let i=0;i<8;i++){const z=-62+i*1.5;bar(gy,[-61.5,1.25+j*1.2,z],[-60.5,1.25+j*1.2,z],.06,0xa7aaab);for(const s of [-1,1])sphere(gy,-61+s*.6,1.25+j*1.2,z,.23+j*.05,dark);}}
for(let i=0;i<6;i++){const z=-62+i*1.7;sphere(gy,-61,4.1,z,.35,0x41474a);const o=new THREE.Mesh(new THREE.TorusGeometry(.18,.045,8,16),metal);o.position.set(-61,4.55,z);gy.add(o);}for(let i=0;i<7;i++)plate(gy,-60+i*.4,1,-66,.85);for(let i=0;i<3;i++)bar(gy,[-59+i*.5,1,-74],[-59+i*.5,7,-74],.045,0xaaaaaa);for(let i=0;i<5;i++)sphere(gy,-56+i*2.1,.9,-73,.65,i%2?0x8d553b:0x263947);B(gy,-54,7,-74,2,.2,.12,0xe4c48d);
// Cardio side: Peloton, rower, SkiErg, treadmill, benches and plyo boxes.
function bike(x,z){bar(gy,[x,1,z-1],[x,2.8,z],.1,metal);bar(gy,[x,2.8,z],[x,1,z+1],.1,metal);for(const a of [-1,1]){const o=C(gy,x,1,z+a, .8,.14,0x41464b);o.rotation.z=Math.PI/2;}B(gy,x,2.9,z-.2,1,.15,.6,dark);B(gy,x,3.4,z+1.1,1.3,.8,.12,dark);}bike(-35.7,-67);B(gy,-35.6,.2,-61,2,.25,7,metal);C(gy,-35.6,.4,-64,.8,1.6,0x4c5359);B(gy,-35.6,.5,-60,1.3,.3,1.4,dark);B(gy,-35.6,0,-55,2.8,7,.35,metal);for(const s of [-1,1])bar(gy,[-35.6+s*.8,6,-55],[-35.6+s,3.5,-54.5],.03,0x999999);B(gy,-35.7,.15,-48,3.2,.6,6,metal);B(gy,-35.7,.8,-48,2.7,.04,5.5,dark);for(const x of [-37,-34.4])bar(gy,[x,.6,-50],[x,4,-50],.075,metal);B(gy,-35.7,4,-50,2.8,.8,.15,dark);bench(gy,-53,0,-44,4);B(gy,-59,0,-43,2.5,2,2.2,ply);B(gy,-56,0,-43,2,1.5,2,ply);B(gy,-62,0,-38,2,5,2,0xd0d2ce);
// Rear barn front face: sliding door left, man door right; second side/rear man door.
B(gy,-61.5,0,-34.9,3,8,.18,0x889697);B(gy,-48,0,-35,.25,8,.2,metal);B(gy,-37,0,-35,3,6.7,.12,0x3e4b4f);
label(gy,'SLIDING DOOR · LEFT',-55,10,-35,2);label(gy,'MAN DOOR · RIGHT',-37,9,-35,1.7);B(gy,-62.8,0,-65,.15,6.7,3,0x3e4b4f);label(gy,'SECOND MAN DOOR · side / rear',-63,10,-65,2);
// Separate recovery zone: primary rear sauna + massage chair, optional plunge.
B(gy,-48,.2,-38.7,27,.08,6.3,material(0x85745f));function sauna(g,x,y,z){const q=new THREE.Group();q.position.set(x,y,z);g.add(q);B(q,0,0,0,7,.2,6,wood);B(q,0,0,-3,7,7,.2,ply);B(q,-3.5,0,0,.2,7,6,ply);B(q,3.5,0,0,.2,7,6,ply);for(let j=0;j<15;j++)B(q,0,j*.44,-2.84,6.8,.04,.05,0x8a6743);B(q,0,1,-1.9,6,1.1,1.5,wood);B(q,0,0,-.6,6,.8,1,wood);B(q,1.6,0,2.9,3.6,6.7,.1,glass);B(q,-2.1,.3,1.5,1.4,2,1.4,metal);for(let i=0;i<8;i++)sphere(q,-2.1+(i%2)*.25,2.4,1.2+Math.floor(i/2)*.2,.2,stone);label(q,'SAUNA · dedicated heater',0,8,0,1.9);return q;}
sauna(gy,-55,.2,-38.7);const massage=chair(gy,-43,.2,-39,Math.PI*.05,material(0x383e42));B(massage,0,.1,2.3,2.2,.8,2.1,0x383e42);label(gy,'MASSAGE / RECOVERY',-43,6,-39,2);function plunge(g,x,y,z){B(g,x,y,z,5.55,2.17,2.63,0xf3f2eb);B(g,x,y+2.18,z,4.9,.04,2,material(0x609aa5,null,[1,1],.2,.2));}
plunge(gy,-37,.2,-39);label(gy,'Plunge · OR deck location',-37,4.5,-39,1.7);
// Observed black stove on rear barn left wall near corner; exact offset estimated.
B(gy,-60.5,0,-69,2.5,3,2,0x17191b);C(gy,-60.5,3,-69,.22,8,0x25292b);label(gy,'OBSERVED WOOD STOVE · exact offset estimated',-59,13,-69,2.5);label(gy,'REAR GYM BARN · SE of house · size / rotation unverified',-48,17,-74,3.2);
// Deck and optional spa / sauna + outdoor plunge concept.
const de=groups.deck,dr=R('sidedeck'),wd=R('wrapdeck');label(de,'NORTH DECK · reached from outside via patio; no living-room door',wd.cx,17,wd.cz,2.6);
const spaG=new THREE.Group();de.add(spaG);B(spaG,dr.cx-2,10,dr.cz,6,2.5,6,0x716457);B(spaG,dr.cx-2,12.5,dr.cz,5.5,.1,5.5,glass);
const deckSauna=sauna(de,dr.cx-2,10,dr.cz);deckSauna.visible=false;const deckPlunge=new THREE.Group();de.add(deckPlunge);plunge(deckPlunge,dr.cx+3.5,10,dr.cz);label(de,'220V reported · loads / fit NOT verified',dr.cx,19,dr.cz,2.5);
const VC=id=>{const r=R(id);return [r.cx,r.y,r.cz];},off=(p,d)=>[p[0]+d[0],p[1],p[2]+d[1]];const FR=[120,-125],GY=[118,135];
const views={
site:{name:'Property overview',pos:[150,170,230],target:[40,4,10],show:['site','main','upper','lower','garage','front','gym','deck'],text:'North (lakes) is toward −Z, marked “N · LAKES”. Front Airstream barn shown NE and rear gym barn SE of the house, per owner; distances, rotations and sizes are diagrammatic, not surveyed. Seller sheet: both barns 30 × 40 ft; MLS says 30 × 40 + 35 × 40 ft, unresolved.'},
lounge:{name:'Main-floor nightclub lounge',pos:[VC('living')[0]+14,34,VC('living')[2]+22],target:[VC('living')[0]-2,12,VC('living')[2]-3],show:['main'],night:true,text:'Living 22′11″ × 17′ (listing). North glass is windows only — no door. Stone fireplace on the west wall; open stair rises south along the east side. Proposed Steinway B and cigar chairs.'},
main:{name:'Main level + primary suite',pos:[60,95,95],target:[5,10,5],show:['main','garage','deck'],text:'North up. Primary bedroom (17′5″ × 13′10″) is east of the living room. Main hall runs north–south between them; primary door on its east side. Kitchen 14′3″ × 12′11″ and dining 13′5″ × 8′8″ south of living; dining slider to the west patio. Garage opens directly to the hall. Orange “?” marks unverified items.'},
primary:{name:'Main-level primary suite',pos:[VC('primary')[0]+18,40,VC('primary')[2]+26],target:[VC('primary')[0],10,VC('primary')[2]],show:['main'],text:'Primary bedroom 17′5″ × 13′10″ (listing), north lake windows, entered from the main hall. Bath size and door position not listed.'},
kitchen:{name:'Kitchen + dining',pos:[VC('kitchen')[0]+12,38,VC('kitchen')[2]+26],target:[VC('kitchen')[0]-4,10,VC('kitchen')[2]],show:['main'],text:'Kitchen 14′3″ × 12′11″ open to living (north) and dining (west). Dining 13′5″ × 8′8″ with slider to the stone patio; its axis is unverified. Cabinets are schematic.'},
upper:{name:'Upstairs offices + closet room',pos:[40,80,70],target:[-6,20,2],show:['upper'],text:'Stair rises south to a landing: bath straight ahead, east room at the east end, balcony hall west with the rail on the north over the living room, middle room on the bath’s south wall, west room at the west end. Which listing bedroom (13′ × 12′6″, 11′1″ × 9′6″, 12′11″ × 10′) is which is unverified.'},
lower:{name:'Lower apartment + sectional',pos:[55,70,75],target:[0,0,5],show:['lower'],text:'Lower living 19′ × 16′10″ (listing) with half-glass door to the covered patio. Wooden door to bedroom 1; bath has two doors (bedroom 1 and hall); hall opens wide to living and leads to bedroom 2 and the kitchenette, which has the second exterior exit. Other sizes not listed.'},
front:{name:'Front vehicle barn',pos:off([-16,29,96],FR),target:off([-46,3,54],FR),show:['front'],text:'NE of the house per owner. Modeled 30 × 40 ft (MLS dimensional conflict unresolved); 12 ft ceiling assignment assumed. Overhead AND sliding barn doors. 2022 Airstream Interstate 24X 4x4 on 2021 Mercedes Sprinter 3500 chassis + Porsche (wishlist) + owned Mustang. Barn rotation and door heights unverified.'},
gym:{name:'Rear CrossFit box',pos:off([-13,31,-20],GY),target:off([-49,3,-57],GY),show:['gym'],text:'SE of the house per owner. Seller ceiling 9 ft 6 in vs narrator estimate 10 ft; unmeasured. 30 × 40 ft insulated / plywood-lined CrossFit box proposal. Sliding door left and man door right on the entry face; second man door opposite. Rotation unverified.'},
recovery:{name:'Rear recovery + observed stove',pos:off([-54,15,-22],GY),target:off([-48,3,-40],GY),show:['gym'],text:'Rear sauna + massage chair; plunge here OR on the house deck. Black wood stove observed at the far-left corner from the entry; not established as the seller-sheet ducted heating system. Sauna shown with its own heater.'},
deck:{name:'Deck spa alternatives',pos:[VC('sidedeck')[0]+30,45,VC('sidedeck')[2]+30],target:[VC('sidedeck')[0],10,VC('sidedeck')[2]],show:['deck','main'],text:'Small side deck by the hall’s south end (position approximate) with owner-reported 220V; hot tub OR sauna plus optional plunge are proposals needing structural and electrical review. Large north deck is reached from outside — the living room has no deck door.'},
garage:{name:'Attached garage · Tesla + Cadillac',pos:[VC('garage')[0]+30,50,VC('garage')[2]+40],target:[VC('garage')[0],10,VC('garage')[2]],show:['garage','main'],text:'Garage opens directly into the main hall. MLS 2-car vs seller 2.5-car; size not listed. Proposed Model Y and Jenny’s Cadillac XT5; clearances not verified.'}
};
const sel=document.getElementById('view');for(const [k,v] of Object.entries(views)){const op=document.createElement('option');op.value=k;op.textContent=v.name;sel.append(op);}
function setNight(n){night=n;amb.intensity=n?.25:.9;sun.intensity=n?.15:1.4;scene.background.set(n?0x17202d:0xb7ccd2);renderer.toneMappingExposure=n?1.25:1.12;clubLights.forEach(p=>p.intensity=(n?1:.32)*p.userData.power);}
clubLights.forEach(p=>p.userData.power=p.intensity);
function jump(k){const v=views[k]||views.site;current=k;sel.value=k;Object.entries(groups).forEach(([name,g])=>g.visible=v.show.includes(name));camera.position.set(...v.pos);controls.target.set(...v.target);controls.update();setNight(!!v.night);document.getElementById('viewtitle').textContent=v.name;document.getElementById('caption').textContent=v.text;labels.forEach(s=>s.visible=showLabels);roofs.forEach(q=>q.visible=roofOn);return true;}
window.deal={layout:L,houseRooms,jump,views,renderer,scene,camera,controls,groups,setLabels:(v)=>{showLabels=v;labels.forEach(l=>l.visible=v)},setRoof:(v)=>{roofOn=v;roofs.forEach(l=>l.visible=v)}};window.setView=jump;
sel.onchange=()=>jump(sel.value);document.getElementById('labels').onclick=()=>{showLabels=!showLabels;labels.forEach(x=>x.visible=showLabels);};document.getElementById('night').onclick=()=>setNight(!night);document.getElementById('roof').onclick=()=>{roofOn=!roofOn;roofs.forEach(x=>x.visible=roofOn);};document.getElementById('spa').onchange=e=>{spaG.visible=e.target.value==='hot';deckSauna.visible=e.target.value==='sauna';deckPlunge.visible=e.target.value!=='none';};document.getElementById('full').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();document.getElementById('walk').onclick=()=>{walking=!walking;document.getElementById('walk').textContent=walking?'Orbit mode':'Walk mode';controls.maxPolarAngle=walking?Math.PI*.65:Math.PI*.49;};
let idx=0;document.getElementById('tour').onclick=()=>{if(tourTimer){clearInterval(tourTimer);tourTimer=null;document.getElementById('tour').textContent='▶ Tour';return;}const keys=Object.keys(views);idx=0;jump(keys[0]);tourTimer=setInterval(()=>jump(keys[(++idx)%keys.length]),6500);document.getElementById('tour').textContent='■ Stop tour';};
const keys={};onkeydown=e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d'].includes(e.key)){keys[e.key]=true;if(walking)e.preventDefault();}};onkeyup=e=>keys[e.key]=false;onresize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);};let last=performance.now();function tick(){requestAnimationFrame(tick);const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;if(walking){const f=controls.target.clone().sub(camera.position);f.y=0;f.normalize();const r=new THREE.Vector3().crossVectors(f,new THREE.Vector3(0,1,0));const dir=new THREE.Vector3();if(keys.w||keys.ArrowUp)dir.add(f);if(keys.s||keys.ArrowDown)dir.sub(f);if(keys.a||keys.ArrowLeft)dir.sub(r);if(keys.d||keys.ArrowRight)dir.add(r);dir.multiplyScalar(dt*12);camera.position.add(dir);controls.target.add(dir);}controls.update();renderer.render(scene,camera);}jump(new URLSearchParams(location.search).get('view')||'site');if(new URLSearchParams(location.search).has('render'))document.body.classList.add('render');tick();window.MODEL_READY=true;
})();

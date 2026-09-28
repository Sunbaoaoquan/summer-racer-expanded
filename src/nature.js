(()=>{const {T}=W;
// Sculpted, pointed leaves: a bent centre rib, thin edges, no spherical crowns.
const leafGeo=new T.BufferGeometry();leafGeo.setAttribute('position',new T.Float32BufferAttribute([0,0,0,-.32,.36,.01,-.23,.76,.005,0,1.06,0,.23,.76,.005,.32,.36,.01,0,.45,.035,0,.78,.025],3));leafGeo.setAttribute('uv',new T.Float32BufferAttribute([.5,0,0,.36,.2,.76,.5,1,.8,.76,1,.36,.5,.45,.5,.78],2));leafGeo.setIndex([0,1,6,1,2,6,2,7,6,2,3,7,3,4,7,4,6,7,4,5,6,5,0,6]);leafGeo.computeVertexNormals();
const canvas=document.createElement('canvas');canvas.width=64;canvas.height=128;const ctx=canvas.getContext('2d'),grad=ctx.createLinearGradient(0,0,64,0);grad.addColorStop(0,'#788b44');grad.addColorStop(.48,'#e1e5ac');grad.addColorStop(.53,'#b0c278');grad.addColorStop(1,'#859d52');ctx.fillStyle=grad;ctx.fillRect(0,0,64,128);ctx.strokeStyle='#d2d79288';ctx.lineWidth=1;for(let y=20;y<120;y+=15){ctx.beginPath();ctx.moveTo(32,y);ctx.lineTo(1,y+18);ctx.moveTo(32,y);ctx.lineTo(63,y+18);ctx.stroke();}const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
const leafMat=new T.MeshStandardMaterial({map:texture,color:'#dce0ce',roughness:.91,side:T.DoubleSide});leafMat.onBeforeCompile=shader=>{shader.uniforms.uWind=W.wind;shader.vertexShader='uniform float uWind;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n#ifdef USE_INSTANCING\ntransformed.x += sin(uWind*0.72+instanceMatrix[3].x*0.6+instanceMatrix[3].z*0.4)*0.10*position.y;\n#endif');};
const dummy=new T.Object3D();function leafBatch(items){const m=new T.InstancedMesh(leafGeo,leafMat,items.length);items.forEach((a,i)=>{dummy.position.set(a.x,a.y,a.z);dummy.rotation.set(a.rx,a.ry,a.rz);dummy.scale.set(a.s,a.s,a.s);dummy.updateMatrix();m.setMatrixAt(i,dummy.matrix);m.setColorAt(i,a.color);});m.castShadow=true;m.receiveShadow=true;m.computeBoundingSphere();return m}
function leaf(x,y,z,s){return{x,y,z,s,rx:W.range(-2.6,2.6),ry:W.range(0,6.28),rz:W.range(-3,3),color:new T.Color().setHSL(W.range(.19,.28),W.range(.32,.56),W.range(.24,.46))};}
W.tree=(x,z,size=1,base=null)=>{const y=base===null?W.height(x,z):base,g=W.group(x,y,z),h=5.4*size;W.cyl(.085*size,.21*size,h*.74,0,h*.37,0,W.m.wood,g,10);const leaves=[];
 for(let b=0;b<9;b++){const a=b*2.399+W.range(-.3,.3),r=W.range(1.1,2.0)*size,by=h*W.range(.49,.84),bx=Math.cos(a)*r,bz=Math.sin(a)*r;W.beam([0,h*.40,0],[bx,by,bz],.032*size,W.m.wood,g);for(let j=0;j<3;j++){const ex=bx+W.range(-.8,.8)*size,ey=by+W.range(.3,.9)*size,ez=bz+W.range(-.8,.8)*size;W.beam([bx,by,bz],[ex,ey,ez],.014*size,W.m.wood,g);for(let k=0;k<28;k++){const t=W.rand()*Math.PI*2,rr=Math.sqrt(W.rand())*.93*size;leaves.push(leaf(ex+Math.cos(t)*rr,ey+W.range(-.3,.45)*size,ez+Math.sin(t)*rr,W.range(.18,.38)*size));}}}
 const lod=new T.LOD();lod.addLevel(leafBatch(leaves),0);lod.addLevel(leafBatch(leaves.filter((_,i)=>i%3===0).map(a=>({...a,s:a.s*1.42}))),38);lod.addLevel(leafBatch(leaves.filter((_,i)=>i%8===0).map(a=>({...a,s:a.s*2}))),83);g.add(lod);W.treeLODs.push(lod);W.obstacle(x,z,.42*size,.42*size);return g;
};
const shrubs=[];W.shrub=(x,z,size=1,y=null)=>{y=y??W.height(x,z);for(let i=0;i<35;i++){const a=W.rand()*6.28,r=Math.sqrt(W.rand())*size;shrubs.push(leaf(x+Math.cos(a)*r,y+W.range(.12,.85)*size,z+Math.sin(a)*r,W.range(.16,.38)*size));}};
W.buildNature=()=>{W.setSeed(98231);
 // Intentional foreground framing and vegetation over the terrace.
 [[-6.8,10,1.55],[-9,6,1.28],[19,-13,1.75],[18,-25,1.7],[4,-21,1.1],[23,1,1.5],[22,13,1.4],[-25,-7,1.5],[-33,-27,1.4]].forEach(a=>W.tree(...a));
 for(let z=-35;z<=12;z+=2){W.shrub(20,z,1.6);if(z<-11)W.shrub(15,z,1.2)}
 for(let z=-5;z<10;z+=1.5){W.shrub(7.3,z,.8);W.shrub(-6.3,z,.85)}
 // Tall arching canopy makes the western lane visibly distinct.
 for(let z=-28;z<=5;z+=7){W.tree(-71,z,1.8);W.tree(-57,z,1.55);W.shrub(-69,z,1.3);W.shrub(-59,z,1.1)}
 const placed=[];for(let i=0;i<95;i++){const x=W.range(-100,101),z=W.range(-118,65);if((x>-4&&x<18&&z>-32&&z<5)||W.nearestRoad(x,z).distance<8||W.blocked(x,z,3))continue;if(placed.some(p=>Math.hypot(x-p.x,z-p.z)<7))continue;placed.push({x,z});W.tree(x,z,W.range(.95,1.65));}
 // Dense perimeter without exposing a hard scene edge.
 for(let i=0;i<18;i++){const a=i/18*6.28,x=Math.cos(a)*126,z=Math.sin(a)*123-23;if(W.nearestRoad(x,z).distance>8)W.tree(x,z,W.range(1.8,2.7));}
 for(const h of W.houses){for(let i=0;i<3;i++){const x=h.x-h.w/2-1.7,z=h.z-h.d/2+i*1.3;if(W.nearestRoad(x,z).distance>4)W.shrub(x,z,.72);}}
 // Large individual hosta leaves and flower stems in the near right planter.
 for(let z=1;z<10;z+=.7){const x=7.7+W.rand()*.7,y=W.height(x,z)+.15;for(let k=0;k<10;k++){const a=k/10*6.28;shrubs.push({...leaf(x+Math.cos(a)*.25,y,z+Math.sin(a)*.25,W.range(.5,.85)),rx:Math.cos(a)*.9,rz:Math.sin(a)*.9});}if(z<6)for(let k=0;k<3;k++){const xx=x+W.range(-.4,.4),zz=z+W.range(-.3,.3);W.beam([xx,y,zz],[xx,y+.7,zz],.009,'#71834b');const flower=W.mesh(new T.SphereGeometry(.055,6,4),'#efe5b5');flower.position.set(xx,y+.7,zz);}}
 // Ivy clings to fence height instead of floating as green balls.
 for(let i=0;i<260;i++){const z=W.range(-4,8),x=8.15+W.range(-.09,.09),y=W.height(x,z)+W.range(.4,2.4);if(Math.sin(z*1.3+y)>.0)shrubs.push(leaf(x,y,z,.22));}
 // Natural understorey screens the open ground and housing foundations.
 for(let zz=-12;zz>=-36;zz-=2.1){for(const xx of [3,5,17,19,21]){if(!W.blocked(xx,zz,.2)&&W.nearestRoad(xx,zz).distance>4)W.shrub(xx,zz,1.5)}}
 for(let xx=-37;xx<20;xx+=2.4){const zz=-42;if(W.nearestRoad(xx,zz).distance>5&&!W.blocked(xx,zz,.3))W.shrub(xx,zz,1.6)}
 for(let i=0;i<290;i++){const x=W.range(-98,98),z=W.range(-113,56);if(W.nearestRoad(x,z).distance>5&&!W.blocked(x,z,1))W.shrub(x,z,W.range(.7,1.5));}
 // Chunk shrubs spatially for frustum culling.
 const chunks=new Map();shrubs.forEach(a=>{const key=Math.floor(a.x/24)+','+Math.floor(a.z/24);if(!chunks.has(key))chunks.set(key,[]);chunks.get(key).push(a)});for(const list of chunks.values())W.scene.add(leafBatch(list));
};
W.buildSky=()=>{const mat=new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{},vertexShader:'varying vec3 vWorld; void main(){vWorld=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:`varying vec3 vWorld;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}float fbm(vec2 p){float n=0.,a=.5;for(int i=0;i<5;i++){n+=a*noise(p);p=p*2.05+7.1;a*=.5;}return n;}
 void main(){vec3 d=normalize(vWorld);float h=max(d.y,0.);vec3 color=mix(vec3(.76,.86,.86),vec3(.20,.53,.73),pow(h,.45));vec2 uv=d.xz/(h+.19)*1.9;float n=fbm(uv);float cloud=smoothstep(.49,.69,n)*smoothstep(.02,.18,h);vec3 cc=mix(vec3(.78,.84,.83),vec3(.99,.98,.91),smoothstep(.49,.78,n));color=mix(color,cc,cloud*.94);float sun=pow(max(0.,dot(d,normalize(vec3(-.65,.8,.5)))),260.);color+=vec3(.12,.10,.05)*sun;gl_FragColor=vec4(color,1.);}`});const sky=new T.Mesh(new T.SphereGeometry(380,32,16),mat);sky.frustumCulled=false;W.scene.add(sky);W.sky=sky;};
})();

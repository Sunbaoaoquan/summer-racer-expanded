(()=>{const {T}=W;W.houses=[];
const wallColors=['#d7d6c5','#b6c6c0','#d6c8b2','#b7b4a2','#c7d0c6','#c7b6a0'];const walls=wallColors.map(c=>{const m=W.m.plaster.clone();m.color.set(c);return m});
const roofs=['#596a70','#626c68','#725d51'].map(c=>new T.MeshStandardMaterial({color:c,roughness:.75,metalness:.12}));
function roof(g,w,d,h,type,mat){const rise=type===2?.75:1.7;
 W.box(w+.8,.075,d+.7,0,h-.04,0,'#9b9d8e',g);
 if(type===3){W.box(w+.6,.22,d+.6,0,h+.1,0,mat,g);for(const x of [-w/2,w/2])W.box(.16,.45,d+.4,x,h+.4,0,walls[3],g);return;}
 const pos=[-w/2-.45,h,-d/2-.4,w/2+.45,h,-d/2-.4,0,h+rise,-d/2-.4,-w/2-.45,h,d/2+.4,w/2+.45,h,d/2+.4,0,h+rise,d/2+.4];const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setIndex([0,2,1,3,4,5,0,3,5,0,5,2,2,5,4,2,4,1]);geo.computeVertexNormals();W.mesh(geo,mat,g);
 for(const z of [-d/2-.43,d/2+.43]){W.beam([-w/2-.5,h,z],[0,h+rise+.02,z],.062,W.m.white,g);W.beam([0,h+rise+.02,z],[w/2+.5,h,z],.062,W.m.white,g);}
 W.beam([0,h+rise+.06,-d/2-.47],[0,h+rise+.06,d/2+.47],.10,mat,g);
 for(let z=-d/2;z<=d/2;z+=.38){for(const side of [-1,1])W.beam([0,h+rise+.025,z],[side*(w/2+.42),h+.025,z],.019,mat,g)}
 for(const side of [-1,1])W.beam([side*(w/2+.44),h,-d/2-.4],[side*(w/2+.44),h,d/2+.4],.055,W.m.metal,g);
}
function windowUnit(g,x,y,z,w=1.5,h=1.45,side=false){const f=new T.Group();f.position.set(x,y,z);if(side)f.rotation.y=Math.PI/2;g.add(f);W.box(w+.13,h+.14,.15,0,0,0,W.m.metal,f);W.box(w,h,.045,0,0,.087,W.m.glass,f);for(const xx of [-w/2,0,w/2])W.box(.045,h,.075,xx,0,.13,W.m.white,f);for(const yy of [-h/2,h/2])W.box(w,.04,.065,0,yy,.13,W.m.white,f);W.box(w+.25,.07,.32,0,-h/2-.08,.1,W.m.concrete,f);W.box(w+.25,.07,.47,0,h/2+.13,.06,W.m.metal,f);
 // Warm curtains occupy the interior plane and leave reflected glass exposed.
 for(const xx of [-w*.35,w*.35])W.box(w*.20,h-.09,.01,xx,0,.117,'#c4c4b2',f);
}
function balcony(g,w,h,d,type){const z=d/2+.6,y=h-2.9;W.box(w*.8,.2,1.25,0,y,z,W.m.concrete,g);if(type%2===0){W.box(w*.82,.82,.13,0,y+.53,z+.6,walls[type%6],g);}else{for(let x=-w*.4;x<w*.4;x+=.18)W.box(.024,.96,.035,x,y+.57,z+.58,W.m.metal,g);}W.box(w*.83,.07,.08,0,y+1.05,z+.61,W.m.metal,g);for(const x of [-w*.4,w*.4])W.box(.045,1,1.18,x,y+.54,z,W.m.metal,g);}
W.house=(x,z,type=0,angle=0,extra=0)=>{const w=[7.5,6.4,9,6.8,8.2,6][type],d=[6,7.4,5.6,6.2,7,5.8][type],h=[6.3,6.8,3.8,8.2,6,5.5][type];const ground=W.height(x,z),base=ground+.3+extra;const g=W.group(x,base,z,angle);const corners=[];for(const xx of [-w/2-.35,w/2+.35])for(const zz of [-d/2-.3,d/2+.3])corners.push(W.height(x+xx*Math.cos(angle)+zz*Math.sin(angle),z-xx*Math.sin(angle)+zz*Math.cos(angle)));const pad=base-Math.min(...corners)+.18;W.box(w+.65,pad,d+.5,0,-pad/2,0,W.m.concrete,g);W.box(w,h,d,0,h/2,0,walls[type],g);
 roof(g,w,d,h,type,roofs[type%3]);if(type===1||type===4){W.box(w*.45,h*.65,d*.37,-w*.2,h*.325,d*.62,walls[type],g);const wing=new T.Group();wing.position.set(-w*.2,0,d*.62);g.add(wing);roof(wing,w*.45,d*.37,h*.65,2,roofs[type%3]);}
 if(type===5){for(let y=.5;y<h;y+=.19)W.box(w+.015,.021,d+.016,0,y,0,'#938979',g);}
 for(let floor=0;floor<(type===2?1:type===3?3:2);floor++){const y=1.75+floor*(type===3?2.4:2.95);for(const xx of [-w*.25,w*.25])windowUnit(g,xx,y,d/2+.045,w*.26,1.5);for(const zz of [-d*.26,d*.24])windowUnit(g,w/2+.045,y,zz,1.2,1.35,true);}
 if(type!==2)balcony(g,w,h,d,type);
 W.box(1.15,2.1,.1,w*.27,1.1,d/2+.16,W.m.wood,g);for(let k=0;k<8;k++)W.box(.017,1.94,.018,w*.27-.43+k*.12,1.12,d/2+.223,'#a39c85',g);W.box(.035,.32,.06,w*.27+.38,1.1,d/2+.26,W.m.metal,g);W.box(1.8,.09,1.25,w*.27,2.4,d/2+.5,W.m.metal,g);W.box(1.4,.16,.7,w*.27,.08,d/2+.4,W.m.concrete,g);
 // Exterior service hardware is modelled at human scale.
 for(const xx of [-w/2-.08,w/2+.08]){W.cyl(.036,.036,h-.15,xx,(h-.15)/2,d/2-.1,'#aaa99c',g);W.beam([xx,h-.12,d/2-.1],[xx,h,d/2+.35],.037,'#aaa99c',g);}
 W.box(.85,.57,.35,-w*.28,.7,d/2+.2,W.m.white,g);const fan=W.cyl(.21,.21,.025,-w*.28,.72,d/2+.39,W.m.metal,g,24);fan.rotation.x=Math.PI/2;for(let k=0;k<8;k++)W.box(.55,.014,.03,-w*.28,.47+k*.07,d/2+.425,'#aeb4ad',g);
 W.box(.23,.36,.12,w*.46,1.75,d/2+.12,W.m.white,g);W.cyl(.055,.055,.035,w*.46,1.8,d/2+.20,W.m.metal,g,16).rotation.x=Math.PI/2;const plate=W.label(['青木','山本','佐藤','高橋','森田','小林'][type],.25,.13,'#dfdccb','#424c44',65);plate.position.set(w*.44,1.45,d/2+.19);g.add(plate);
 if(type===0){const laundry=W.box(.75,.8,.025,.35,h-1.95,d/2+1.1,'#dedbc6',g);laundry.rotation.z=.08;W.beam([-1.5,h-.7,d/2+.9],[1.8,h-.7,d/2+.9],.016,W.m.metal,g);}
 if(type===3){W.box(1.7,.5,2.4,-1.4,h+.46,-.7,'#415f70',g).rotation.z=.12;}
 W.obstacle(x,z,w+.3,d+.3,angle);if(type===1||type===4){const xx=-w*.2,zz=d*.62;W.obstacle(x+xx*Math.cos(angle)+zz*Math.sin(angle),z-xx*Math.sin(angle)+zz*Math.cos(angle),w*.45,d*.37,angle)}W.houses.push({x,z,w,d,type,base,angle});return g;};
W.buildArchitecture=()=>{W.house(10,-21,0,-.10,2.0);W.house(-12,-1,4,.04);W.house(-19,-16,1,.12);W.house(-26,-30,2,.25);W.house(19,9,5,-.25);W.house(-15,19,3,.2);
 // Curated setbacks keep routes clear. Each road gets varied, oriented homes.
 const specs=[[28,-53,2,.9],[52,-29,1,-1.6],[78,-22,4,1.5],[51,8,0,-1.4],[31,39,2,3.0],[9,43,5,3.1],[-29,32,1,2.8],[-51,21,2,2.6],[-77,-3,4,1.5],[-50,-15,0,-1.5],[-73,-34,5,.6],[-43,-50,2,0],[-84,-108,3,1.5],[-7,-70,4,0],[4,-77,1,.2],[59,-79,2,1.3],[64,-100,5,3.3],[-29,-97,0,.6],[-52,-95,2,.6]];
 specs.forEach(a=>W.house(...a));
 // Garden boundary walls use terrain-following bases and masonry caps.
 for(const home of W.houses){if(home.x===10)continue;for(const side of [-1,1]){const off=side*(home.w/2+.9),x=home.x+off*Math.cos(home.angle),z=home.z-off*Math.sin(home.angle);let safe=true;for(let k=-.5;k<=.5;k+=.1){const xx=x+k*(home.d+1)*Math.sin(home.angle),zz=z+k*(home.d+1)*Math.cos(home.angle),r=W.nearestRoad(xx,zz);if(r.distance<r.width/2+.9)safe=false}if(!safe)continue;const y=W.height(x,z),wall=W.group(x,y,z,home.angle);W.box(.18,.72,home.d+1,0,.3,0,W.m.concrete,wall);W.box(.26,.08,home.d+1.1,0,.71,0,'#898d80',wall);W.obstacle(x,z,.26,home.d+1.1,home.angle);}}
};})();

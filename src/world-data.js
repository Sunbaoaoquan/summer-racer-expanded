(function(root){'use strict';const SR=root.SR||(root.SR={});
const residential=[[0,25],[0,12],[-3,0],[-12,-15],[-18,-35],[-8,-55],[15,-66],[45,-60],[65,-40],[65,0],[45,22],[15,30]];
const WORLD_DATA={
 roads:[{id:'residential',name:'夏日住宅街',width:6.8,closed:true,points:residential},
 {id:'alley',name:'绿荫小巷',width:5.2,points:[[-18,-35],[-42,-39],[-61,-28],[-65,0],[-38,22],[0,25]]},
 {id:'upper',name:'住宅坡道',width:5.6,points:[[45,-60],[47,-85],[22,-100],[-5,-97],[-29,-72],[-18,-35]]},
 {id:'extension',name:'山海环线',width:8.2,points:[[-18,-35],[-42,-65],[-72,-91],[-114,-107],[-136,-143],[-106,-170],[-60,-172],[-43,-207],[-75,-229],[-39,-253],[15,-247],[67,-263],[108,-248],[138,-212],[167,-184],[216,-177],[235,-139],[235,-79],[224,-22],[231,33],[211,73],[164,86],[123,63],[99,26],[65,0]]}],
 regions:[{id:'town',name:'夏日住宅街',subtitle:'YAMATE / 01',x:0,z:5},{id:'forest',name:'林间山道',subtitle:'KOMOREBI / 02',x:-108,z:-142},{id:'summit',name:'山顶观景台',subtitle:'AOZORA / 03',x:65,z:-259},{id:'coast',name:'海岸公路',subtitle:'SHIOSAI / 04',x:228,z:-32}],
 parking:[{x:4,z:6,r:5},{x:66,z:-273,r:12},{x:222,z:42,r:10},{x:-142,z:-143,r:7}],
 junctions:[{x:65,z:0,r:6.2},{x:-18,z:-35,r:6},{x:0,z:25,r:5},{x:45,z:-60,r:5}],
 routes:[{id:'residential',name:'住宅街短环',closed:true,spans:[['residential',0,1]]},{id:'grand',name:'山海大环',closed:true,spans:[['residential',0,[-18,-35]],['extension',0,1],['residential',[65,0],1]]},
 {id:'sprint-forest',name:'穿越绿荫',closed:false,spans:[['extension',0,.40]],initialSeconds:22,bonusSeconds:12},
 {id:'sprint-coast',name:'海风追逐',closed:false,spans:[['extension',.59,1]],initialSeconds:22,bonusSeconds:12},
 {id:'sprint-tour',name:'山海穿梭',closed:false,spans:[['extension',0,1]],initialSeconds:22,bonusSeconds:12}],
 collectibles:[],
 challengeEntrances:[{id:'town',x:0,z:25,routeId:'residential',mode:'race'},{id:'forest',x:-18,z:-35,routeId:'sprint-forest',mode:'checkpoint'},{id:'coast',x:235,z:-139,routeId:'sprint-coast',mode:'checkpoint'}],
 viewpoints:{reference:{position:[-1,2.6,18],target:[3,4,-10]},vending:{position:[-.4,2,4],target:[3.3,1.7,-1]},forest:{position:[-128,0,-124],target:[-126,0,-151]},overlook:{position:[64,0,-279],target:[190,4,6]},coast:{position:[212,0,68],target:[237,0,15]},night:{position:[1,0,16],target:[3,3,-8]}}
};
for(const [region,roadId,lo,hi] of [['town','alley',.08,.92],['forest','extension',.05,.34],['summit','extension',.37,.58],['coast','extension',.64,.97]])for(let i=0;i<6;i++)WORLD_DATA.collectibles.push({id:region+'-'+i,region,roadId,fraction:lo+(hi-lo)*i/5});
function baseHeight(x,z){const core=.022*x-.035*z+2.1*Math.exp(-(((x-17)/17)**2+((z+20)/27)**2))+.00085*Math.max(0,-z-25)**2+4.5*Math.exp(-(((z+104)/17)**2));const north=22*Math.exp(-(((x-45)/110)**2+((z+250)/110)**2))+13*Math.exp(-(((x+115)/110)**2+((z+170)/100)**2))+3;const d=Math.max(Math.abs(x)/115,Math.max(0,-z)/120,Math.max(0,z)/80);const t=Math.min(1,Math.max(0,(d- .8)/.5));const smooth=t*t*(3-2*t);const h=core*(1-smooth)+north*smooth;const coast=Math.min(1,Math.max(0,(x-140)/75));return h*(1-coast*coast*(3-2*coast))+2.2*coast*coast*(3-2*coast);}
Object.assign(SR,{WORLD_DATA,baseHeight});if(typeof module!=='undefined')module.exports={WORLD_DATA,baseHeight};
})(typeof window!=='undefined'?window:globalThis);

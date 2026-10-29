/* Orbit motion · ressort critique, interruptions à partir de la valeur visible. */
(function(g){
class Spring{
 constructor(value,render,{response=.34,damping=1}={}){this.value={...value};this.target={...value};this.velocity=Object.fromEntries(Object.keys(value).map(k=>[k,0]));this.render=render;this.response=response;this.damping=damping;this.frame=0;this.last=0;this.tick=this.tick.bind(this);render(this.value)}
 snap(value){cancelAnimationFrame(this.frame);this.frame=0;Object.assign(this.value,value);Object.assign(this.target,value);for(const k in value)this.velocity[k]=0;this.render(this.value);return this}
 to(target){Object.assign(this.target,target);if(document.documentElement.dataset.reduce==='true'||matchMedia('(prefers-reduced-motion: reduce)').matches)return this.snap(this.target);if(!this.frame){this.last=performance.now();this.frame=requestAnimationFrame(this.tick)}return this}
 tick(now){let dt=Math.min((now-this.last)/1000,.032);this.last=now;const omega=2*Math.PI/this.response;let moving=false;for(const k in this.target){let v=this.velocity[k],x=this.value[k];const steps=Math.max(1,Math.ceil(dt/.008)),h=dt/steps;for(let i=0;i<steps;i++){v+=(-omega*omega*(x-this.target[k])-2*this.damping*omega*v)*h;x+=v*h}if(Math.abs(x-this.target[k])>.001||Math.abs(v)>.01)moving=true;else{x=this.target[k];v=0}this.value[k]=x;this.velocity[k]=v}this.render(this.value);this.frame=moving?requestAnimationFrame(this.tick):0}
 stop(){cancelAnimationFrame(this.frame);this.frame=0}
}
g.OrbitMotion={Spring};
})(window);

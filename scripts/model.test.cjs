const assert=require('node:assert/strict');require('../model.js');const {model}=globalThis.OrbitModel;
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} differs from ${b}`);
const standard=model();close(standard.revenue,12000);close(standard.cost,4240);close(standard.net,7760);assert.equal(standard.even,4);
// Les coûts existent pendant le pilote et la première adaptation est incluse.
const allFree=model({pilot:12});assert.equal(allFree.revenue,0);close(allFree.cost,4240);assert.equal(allFree.even,null);
const half=model({pilotRate:.5});close(half.revenue-standard.revenue,1200);close(half.cost,standard.cost);close(half.net-standard.net,1200);
// Une campagne et 50 % d’IA forment un mix moyen, sans arrondi mensuel.
const fraction=model({perMonth:1,pilot:0});close(fraction.revenue,7200);close(fraction.rows[1].ai,.5);
const none=model({perMonth:0});assert.equal(none.revenue,0);close(none.cost,1700);assert.equal(none.even,null);
const noIA=model({iaShare:0});close(noIA.revenue,10000);close(noIA.cost,4000);
const moreIA=model({iaPrice:400});close(moreIA.revenue,14000);close(moreIA.cost,4240);
for(let n=0;n<=8;n++)for(const share of [0,25,50,100])for(const pilot of [0,2,6]){const r=model({perMonth:n,iaShare:share,pilot});close(r.revenue-r.cost,r.net);assert.equal(r.rows.length,13);close(r.rows.at(-1).cumulative,r.net);r.rows.slice(1).forEach(row=>close(row.net,row.revenue-row.cost))}
console.log('Modèle financier : scénarios, rodage, mix IA et 108 combinaisons validés.');

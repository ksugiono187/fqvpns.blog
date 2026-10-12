import raw from './reference-plans.json';import {suppliedBrands} from './supplied-brands';
export type ReferencePlan={name:string;price:number;currency:string;period:string;trafficGB:number|null;trafficPeriod:string;trafficText:string};
export const catalog=suppliedBrands.map(b=>{const r=raw.find(x=>x.slug===b.slug)!;const plans=r.status==='reference'?r.plans as ReferencePlan[]:[];return {...b,plans,sourceUrl:r.sourceUrl,status:r.status,imported:'2026-10-12',sourceRecorded:'2026-10-03',note:r.status==='missing'?'指定来源暂未收录':r.status==='disputed'?'来源标注套餐归属疑点，暂不参加金额排序':b.slug==='v2yun'?'至尊版流量存在分歧，该档不参加容量比较':b.slug==='wavenet'?'入门档流量不明，不计算该档每 GB 成本':'第三方参考，当前在售与倍率需确认'};});
export type CatalogBrand=typeof catalog[number];
export function monthlyPlans(b:CatalogBrand){return b.plans.filter(p=>p.period==='month'&&Number.isFinite(p.price)&&p.price>0).sort((a,c)=>a.price-c.price);}
export function capacityPlans(b:CatalogBrand){return monthlyPlans(b).filter(p=>p.trafficPeriod==='month'&&p.trafficGB&&p.trafficGB>0&&!(b.slug==='v2yun'&&p.name.includes('至尊')));}
export function monthlyStart(b:CatalogBrand){return monthlyPlans(b)[0];}
export function unitPrice(p:ReferencePlan){return p.period==='month'&&p.trafficPeriod==='month'&&p.trafficGB&&p.trafficGB>0?p.price/p.trafficGB:undefined;}
export function matchedPlan(b:CatalogBrand,need=0,budget=Infinity){return capacityPlans(b).find(p=>p.trafficGB!>=need&&p.price<=budget);}
export function referenceRank(kind:string){const rows=catalog.flatMap(b=>{const plans=kind==='value'?capacityPlans(b):monthlyPlans(b);const p=kind==='overall'?matchedPlan(b,200):kind==='value'?[...plans].sort((a,c)=>unitPrice(a)!-unitPrice(c)!||a.price-c.price)[0]:plans[0];return p?[{b,p,value:kind==='value'?unitPrice(p)!:p.price}]:[];}).sort((a,c)=>a.value-c.value||catalog.indexOf(a.b)-catalog.indexOf(c.b));return rows.map(r=>({...r,rank:rows.findIndex(x=>Math.abs(x.value-r.value)<1e-9)+1}));}
export const totalPlans=catalog.reduce((n,b)=>n+b.plans.length,0);

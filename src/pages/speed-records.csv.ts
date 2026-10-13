import type {APIRoute} from 'astro';
import {speedBatches} from '../data/speed-tests';import {suppliedBrands} from '../data/supplied-brands';
export const GET:APIRoute=()=>{
 const rows=[['品牌','测试时间','环境','统计口径','地区','节点数','下载速度','TLS RTT','样本说明','局限','来源','核对日期'],...speedBatches.flatMap(b=>b.rows.map(r=>[suppliedBrands.find(s=>s.slug===b.slug)!.name,b.tested,b.environment,b.basis,r.region,String(r.nodes),r.download,r.latency,r.note,b.notes,b.url,'2026-10-13']))];
 return new Response('\uFEFF'+rows.map(r=>r.map(v=>'"'+v.replaceAll('"','""')+'"').join(',')).join('\r\n'),{headers:{'Content-Type':'text/csv; charset=utf-8'}});
};

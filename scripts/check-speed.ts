import fs from 'node:fs';import {load} from 'cheerio';import {speedBatches} from '../src/data/speed-tests';import {suppliedBrands} from '../src/data/supplied-brands';import {saveResult} from './lib';
const errors:string[]=[];const $=load(fs.readFileSync('dist/speedtest/index.html','utf8'));
for(const b of speedBatches){
 if(!suppliedBrands.some(s=>s.slug===b.slug)||!b.tested||!b.environment||!b.url.startsWith('https://')||!b.basis)errors.push('Incomplete provenance '+b.slug);
 const detail=load(fs.readFileSync(`dist/airport/${b.slug}/index.html`,'utf8'));
 for(const dom of [$,detail]){const section=dom(`[data-speed-record="${b.slug}"]`);if(section.find('tbody tr').length!==b.rows.length||!section.find(`a[href="${b.url}"]`).length)errors.push('Missing rows/source '+b.slug);for(const r of b.rows)if(!section.text().includes(r.download)||!section.text().includes(r.note))errors.push('Missing metric/anomaly '+b.slug);}
}
const count=speedBatches.reduce((n,b)=>n+b.rows.length,0);const csv=fs.readFileSync('dist/speed-records.csv','utf8');if(csv.trim().split('\r\n').length!==count+1)errors.push('CSV coverage');
const search=fs.readFileSync('dist/search-index.json','utf8');if(!search.includes('/speedtest/')||!fs.readFileSync('dist/sitemap-0.xml','utf8').includes('/speedtest/'))errors.push('Discovery');
saveResult('speed-audit',[{label:'Attributed speed records, CSV and brand pages',status:errors.length?'FAIL':'PASS',detail:`${speedBatches.length} batches; ${count} regional rows. ${errors.join('; ')||'Sources and anomaly notes preserved in hub and brand detail.'}`},{label:'Independent measurement or screenshot authenticity',status:'NOT TESTED',detail:'Public-source transcription only; no live service tests or independent proof of screenshot authenticity.'}]);

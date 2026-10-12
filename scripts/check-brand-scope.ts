import fs from 'node:fs';import assert from 'node:assert/strict';import {suppliedBrands,couponBrands} from '../src/data/supplied-brands';import {pages} from './lib';
const all=pages();const allowed=new Set(suppliedBrands.map(b=>'/airport/'+b.slug+'/'));
const profiles=all.filter(p=>/^\/airport\/[^/]+\/$/.test(p.url));
assert.equal(profiles.length,29);for(const p of profiles)assert.ok(allowed.has(p.url),p.url);
for(const p of all)assert.doesNotMatch(p.html,/Proton|Mullvad|IVPN|Windscribe|hide\.me/i,p.url);
for(const slug of ['proton-vpn','mullvad','ivpn','windscribe','hide-me'])assert.equal(fs.existsSync('dist/airport/'+slug+'/index.html'),false);
const search=JSON.parse(fs.readFileSync('dist/search-index.json','utf8'));assert.deepEqual(search.filter((e:{url:string})=>e.url.startsWith('/airport/')).map((e:{url:string})=>e.url).sort(),[...allowed].sort());
const compare=all.find(p=>p.url==='/compare/')!;const payload=JSON.parse(compare.$('#compare-data').text());assert.deepEqual(payload.map((e:{slug:string})=>e.slug).sort(),suppliedBrands.map(b=>b.slug).sort());assert.equal(all.find(p=>p.url==='/coupons/')!.$('[data-copy-code]').length,couponBrands.length);
console.log('PASS Brand scope: only 29 supplied brands in profiles, search and comparison; 11 coupon mappings preserved; removed pages absent.');

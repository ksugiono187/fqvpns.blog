import fs from 'node:fs';import {createHash} from 'node:crypto';import {domain,files,pages} from './lib';
const previous:Record<string,{hash:string;lastmod:string}>=fs.existsSync('docs/page-history.json')?JSON.parse(fs.readFileSync('docs/page-history.json','utf8')):{};
const current:typeof previous={};const today=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Shanghai'});
for(const p of pages()){if(p.$('meta[name=robots]').attr('content')?.includes('noindex'))continue;const hash=createHash('sha256').update(p.html).digest('hex');current[domain+p.url]={hash,lastmod:previous[domain+p.url]?.hash===hash?previous[domain+p.url].lastmod:today};}
fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/page-history.json',JSON.stringify(current,null,2));
for(const file of files('dist','.xml')){let xml=fs.readFileSync(file,'utf8');if(!xml.includes('<urlset'))continue;xml=xml.replace(/<url>([\s\S]*?)<\/url>/g,(_full,body)=>{const url=body.match(/<loc>(.*?)<\/loc>/)?.[1];if(!url||!current[url])throw Error(`Unexpected sitemap URL ${url}`);return '<url>'+body.replace(/<lastmod>.*?<\/lastmod>/g,'')+`<lastmod>${current[url].lastmod}</lastmod></url>`;});fs.writeFileSync(file,xml);}
if(process.env.INDEXNOW_KEY){if(!/^[a-zA-Z0-9-]{8,128}$/.test(process.env.INDEXNOW_KEY))throw Error('Invalid IndexNow key');fs.writeFileSync(`dist/${process.env.INDEXNOW_KEY}.txt`,process.env.INDEXNOW_KEY);}
console.log(`Postbuild: ${Object.keys(current).length} indexable pages; lastmod changes only when output changes.`);

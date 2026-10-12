import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import {suppliedBrands} from './src/data/supplied-brands.ts';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ site: 'https://fqvpns.blog', output: 'static', trailingSlash: 'always', integrations: [sitemap({ filter: url => !url.includes('/404') && !url.endsWith('/ranking/stable/') && !suppliedBrands.some(b=>url.endsWith('/airport/'+b.slug+'/')) })], vite: { plugins: [tailwindcss()] } });

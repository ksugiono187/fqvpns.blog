import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ site: 'https://fqvpns.blog', output: 'static', trailingSlash: 'always', integrations: [sitemap({ filter: url => !url.includes('/404') && !url.endsWith('/ranking/stable/') })], vite: { plugins: [tailwindcss()] } });

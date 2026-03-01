import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://channel47.dev',
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    functionPerRoute: false,
    runtime: 'nodejs20.x'
  }),
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/ecosystem') &&
        !page.includes('/build') &&
        !page.includes('/hire') &&
        !page.includes('/coming-soon') &&
        !page.endsWith('/tools/') &&
        !page.endsWith('/skills/') &&
        !page.endsWith('/mcps/')
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});

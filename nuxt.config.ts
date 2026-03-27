// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      Orbitron: [400, 500, 600, 700, 800, 900],
      'DM Sans': [300, 400, 500, 600],
    },
    display: 'swap',
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'HexaLabs Hosting — Game Servers in France',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Affordable, high-performance game servers hosted in France. Built for players, by players. Minecraft, Rust, CS2, Valheim and more.',
        },
        { name: 'theme-color', content: '#060614' },
        { property: 'og:title', content: 'HexaLabs Hosting — Game Servers in France' },
        {
          property: 'og:description',
          content: 'Affordable game servers hosted in France. Fast, reliable, and easy to set up.',
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
      ],
    },
  },

  // Future-ready: easy to add runtime config, auth, DB later
  runtimeConfig: {
    // Private keys — server only (set via NUXT_ env vars)
    panelUrl: process.env.NUXT_PANEL_URL,
    panelApiKey: process.env.NUXT_PANEL_API_KEY,
    public: {
      // Keys exposed to client
      siteName: 'HexaLabs Hosting',
      contactEmail: 'contact@hexalabshosting.fr',
      panelUrl: process.env.NUXT_PUBLIC_PANEL_URL,
    },
  },

  compatibilityDate: '2024-11-01',
})

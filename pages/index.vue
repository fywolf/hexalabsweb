<template>
  <div class="homepage">
    <HeroSection />

    <div class="hex-divider" style="margin: 0 2rem;"></div>

    <FeaturesSection />

    <div class="hex-divider" style="margin: 0 2rem;"></div>

    <StoreSection />

    <div class="hex-divider" style="margin: 0 2rem;"></div>

    <FAQSection />
  </div>
</template>

<script setup>
// Future: fetch dynamic content (plans, server count, etc.) here
// const { data: plans } = await useFetch('/api/plans')

useHead({
  title: 'HexaLabs Hosting — Affordable Game Servers in France',
})
</script>

<style scoped>
.homepage {
  background: var(--bg-void);
}
</style>

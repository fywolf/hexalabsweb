<template>
  <header class="app-header" :class="{ scrolled: isScrolled }">
    <div class="container header-inner">
      <!-- Logo -->
      <NuxtLink to="/" class="logo-link" aria-label="HexaLabs Hosting — Home">
        <img src="/logo.png" alt="HexaLabs Hosting" class="logo-img" />
        <div class="logo-text">
          <span class="logo-name">HexaLabs</span>
          <span class="logo-sub">Hosting</span>
        </div>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="nav-links" aria-label="Main navigation">
        <NuxtLink to="/#features" class="nav-link">Features</NuxtLink>
        <NuxtLink to="/#games" class="nav-link">Games</NuxtLink>
        <NuxtLink to="/store" class="nav-link">Store</NuxtLink>
        <NuxtLink to="/#faq" class="nav-link">FAQ</NuxtLink>
        <NuxtLink to="/privacy" class="nav-link">Legal</NuxtLink>
      </nav>

      <!-- CTA -->
      <div class="header-actions">
        <a :href="panelUrl" class="btn-primary">
          <span>Get Started</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      <!-- Hamburger -->
      <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="mobile-nav">
        <NuxtLink to="/#features" class="mobile-link" @click="menuOpen = false">Features</NuxtLink>
        <NuxtLink to="/#games" class="mobile-link" @click="menuOpen = false">Games</NuxtLink>
        <NuxtLink to="/store" class="mobile-link" @click="menuOpen = false">Store</NuxtLink>
        <NuxtLink to="/#faq" class="mobile-link" @click="menuOpen = false">FAQ</NuxtLink>
        <NuxtLink to="/privacy" class="mobile-link" @click="menuOpen = false">Legal</NuxtLink>
        <a :href="panelUrl" class="btn-primary" style="margin-top:0.5rem;" @click="menuOpen = false">
          <span>Get Started</span>
        </a>
      </div>
    </Transition>
  </header>
</template>

<script setup>
const { public: publicConfig } = useRuntimeConfig()
const panelUrl = publicConfig.panelUrl

const isScrolled = ref(false)
const menuOpen = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
})
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.25rem 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-header.scrolled {
  background: rgba(6, 6, 20, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(124, 58, 237, 0.15);
  padding: 0.85rem 0;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* Logo */
.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-img {
  height: 40px;
  width: auto;
  filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.4));
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.logo-name {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.02em;
}

.logo-sub {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 400;
  color: var(--accent-cyan);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

/* Nav */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: auto;
}

.nav-link {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--text-primary);
  background: rgba(124, 58, 237, 0.1);
}

/* Header Actions */
.header-actions {
  flex-shrink: 0;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-left: auto;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: var(--transition);
  transform-origin: center;
}

.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile Nav */
.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 1.5rem 1.5rem;
  background: rgba(6, 6, 20, 0.97);
  border-top: 1px solid var(--border-subtle);
}

.mobile-link {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.7rem 0.5rem;
  border-bottom: 1px solid rgba(124, 58, 237, 0.1);
  transition: var(--transition);
}

.mobile-link:hover { color: var(--accent-cyan); }

/* Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-links,
  .header-actions { display: none; }
  .hamburger { display: flex; }
}
</style>

<template>
  <footer class="app-footer">
    <!-- Top divider -->
    <div class="hex-divider"></div>

    <div class="container footer-inner">
      <!-- Brand -->
      <div class="footer-brand">
        <NuxtLink to="/" class="logo-link">
          <img src="/logo.png" alt="HexaLabs Hosting" class="footer-logo" />
          <div class="logo-text">
            <span class="logo-name">HexaLabs</span>
            <span class="logo-sub">Hosting</span>
          </div>
        </NuxtLink>
        <p class="footer-tagline">Affordable game servers,<br>proudly hosted in France 🇫🇷</p>
        <div class="footer-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          99.9% uptime SLA
        </div>
      </div>

      <!-- Links -->
      <div class="footer-col">
        <h4 class="footer-col-title">Navigate</h4>
        <nav>
          <NuxtLink to="/#features" class="footer-link">Features</NuxtLink>
          <NuxtLink to="/#games" class="footer-link">Supported Games</NuxtLink>
          <NuxtLink to="/#faq" class="footer-link">FAQ</NuxtLink>
        </nav>
      </div>

      <div class="footer-col">
        <h4 class="footer-col-title">Legal</h4>
        <nav>
          <NuxtLink to="/privacy" class="footer-link">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms" class="footer-link">Terms of Service</NuxtLink>
        </nav>
      </div>

      <div class="footer-col">
        <h4 class="footer-col-title">Contact</h4>
        <nav>
          <a href="mailto:contact@hexalabshosting.com" class="footer-link">contact@hexalabshosting.com</a>
          <a href="mailto:support@hexalabshosting.com" class="footer-link">support@hexalabshosting.com</a>
        </nav>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p class="footer-copy">
          © {{ new Date().getFullYear() }} HexaLabs Hosting. All rights reserved. Hosted in France 🇫🇷 — GDPR Compliant.
        </p>
        <div class="footer-legal-links">
          <NuxtLink to="/privacy">Privacy</NuxtLink>
          <span class="sep">·</span>
          <NuxtLink to="/terms">Terms</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Future: pull contact email from runtimeConfig
</script>

<style scoped>
.app-footer {
  background: var(--bg-deep);
  position: relative;
  margin-top: 4rem;
}

.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  padding: 4rem 1.5rem 3rem;
}

/* Brand */
.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  margin-bottom: 1rem;
}

.footer-logo {
  height: 36px;
  width: auto;
  filter: drop-shadow(0 0 6px rgba(0, 212, 255, 0.3));
}

.logo-text { display: flex; flex-direction: column; line-height: 1.1; }
.logo-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
}
.logo-sub {
  font-size: 0.65rem;
  color: var(--accent-cyan);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.footer-tagline {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.footer-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: var(--accent-cyan);
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 999px;
  padding: 0.35rem 0.85rem;
}

/* Columns */
.footer-col-title {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
}

.footer-col nav {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-link {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition);
}

.footer-link:hover { color: var(--accent-cyan); }

/* Bottom bar */
.footer-bottom {
  border-top: 1px solid var(--border-subtle);
}

.footer-bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.footer-copy {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.footer-legal-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.footer-legal-links a {
  color: var(--text-muted);
  text-decoration: none;
  transition: var(--transition);
}

.footer-legal-links a:hover { color: var(--accent-cyan); }

.sep { color: var(--text-muted); }

/* Responsive */
@media (max-width: 900px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 480px) {
  .footer-inner {
    grid-template-columns: 1fr;
  }
  .footer-bottom-inner {
    flex-direction: column;
    text-align: center;
  }
}
</style>

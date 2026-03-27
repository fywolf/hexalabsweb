<template>
  <section class="hero-section">
    <!-- Hex grid bg -->
    <HexBackground />

    <!-- Glow orbs -->
    <div class="glow-orb orb-purple" aria-hidden="true"></div>
    <div class="glow-orb orb-cyan" aria-hidden="true"></div>

    <!-- Scan line effect -->
    <div class="scan-line" aria-hidden="true"></div>

    <div class="container hero-inner">
      <!-- Badge -->
      <div class="hero-badge animate-fade-up">
        <span class="badge-dot"></span>
        Servers online · France 🇫🇷
      </div>

      <!-- Headline -->
      <h1 class="hero-title animate-fade-up animate-delay-1">
        Your server,<br>
        <span class="gradient-text">your community</span>
      </h1>

      <!-- Subtitle -->
      <p class="hero-subtitle animate-fade-up animate-delay-2">
        Affordable Minecraft hosting built for casual players and small communities —
        Vanilla, Fabric, Forge or NeoForge, live in minutes, hosted in France.
      </p>

      <!-- CTAs -->
      <div class="hero-actions animate-fade-up animate-delay-3">
        <a :href="panelUrl" class="btn-primary">
          <span>Start Hosting</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <NuxtLink to="/store" class="btn-ghost">
          <span>See Plans</span>
        </NuxtLink>
      </div>

      <!-- Stats row -->
      <div class="hero-stats animate-fade-up animate-delay-4">
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Floating game tags -->
      <div class="game-tags animate-fade-up animate-delay-5">
        <span class="game-tag" v-for="game in games" :key="game">{{ game }}</span>
      </div>
    </div>

    <!-- Hero bottom fade -->
    <div class="hero-fade" aria-hidden="true"></div>
  </section>
</template>

<script setup>
const { public: publicConfig } = useRuntimeConfig()
const panelUrl = publicConfig.panelUrl

const stats = [
  { value: '<20ms', label: 'Avg. Latency (FR)' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: 'Free', label: 'Trial Available' },
  { value: '🇫🇷', label: 'Hosted in France' },
]

const games = ['Minecraft · Vanilla', 'Minecraft · Fabric', 'Minecraft · Forge', 'Minecraft · NeoForge']
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 10rem 0 6rem;
  overflow: hidden;
  background: linear-gradient(180deg, var(--bg-void) 0%, var(--bg-deep) 100%);
}

/* Orbs */
.orb-purple {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%);
  top: -150px;
  right: -100px;
  animation: floatOrb 12s ease-in-out infinite;
}

.orb-cyan {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%);
  bottom: 0;
  left: -50px;
  animation: floatOrb 15s ease-in-out infinite reverse;
}

/* Scan line */
.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.5), transparent);
  animation: scanLine 8s linear infinite;
  pointer-events: none;
  z-index: 1;
}

/* Inner */
.hero-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

/* Badge */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent-cyan);
  background: rgba(0, 212, 255, 0.07);
  border: 1px solid rgba(0, 212, 255, 0.25);
  border-radius: 999px;
  padding: 0.4rem 1.1rem;
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px #22c55e;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 6px #22c55e; }
  50%       { box-shadow: 0 0 14px #22c55e, 0 0 24px rgba(34, 197, 94, 0.4); }
}

/* Title */
.hero-title {
  max-width: 800px;
  color: var(--text-primary);
  line-height: 1.05;
}

/* Subtitle */
.hero-subtitle {
  max-width: 600px;
  font-size: 1.1rem;
  line-height: 1.75;
  color: var(--text-secondary);
}

/* Actions */
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

/* Stats */
.hero-stats {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-subtle);
  width: 100%;
  max-width: 700px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-violet));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.35rem;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Game tags */
.game-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  max-width: 600px;
}

.game-tag {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
  transition: var(--transition);
  cursor: default;
}

.game-tag:hover {
  color: var(--accent-cyan);
  border-color: rgba(0, 212, 255, 0.3);
  background: rgba(0, 212, 255, 0.05);
}

/* Bottom fade */
.hero-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, transparent, var(--bg-void));
  pointer-events: none;
  z-index: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section { padding: 8rem 0 5rem; }
  .hero-stats { gap: 1.5rem; }
}
</style>

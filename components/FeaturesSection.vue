<template>
  <section id="features" class="section features-section">
    <HexBackground />

    <div class="container" style="position:relative;z-index:2;">
      <!-- Header -->
      <div class="section-header">
        <span class="section-tag">Why HexaLabs?</span>
        <h2>Everything you need,<br><span class="gradient-text">nothing you don't</span></h2>
        <p class="section-desc">
          We keep things simple: great hardware, fair prices, and friendly support
          whenever you need us. Hosted in France for the best European experience.
        </p>
      </div>

      <!-- Main features grid -->
      <div class="features-grid" id="features-grid">
        <div
          class="feature-card glass-card"
          v-for="(feature, i) in features"
          :key="feature.title"
          :style="`animation-delay: ${i * 0.08}s`"
        >
          <div class="feature-icon">
            <div class="icon-hex" v-html="feature.icon"></div>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.desc }}</p>
        </div>
      </div>

      <div class="hex-divider" style="margin-top:5rem;"></div>

      <!-- Games section — built from catalog categories -->
      <div id="games" class="games-section" style="scroll-margin-top: 5rem;">
        <div class="section-header">
          <span class="section-tag">Available now</span>
          <h2>Choose your<br><span class="gradient-text">game server</span></h2>
        </div>
        <div v-if="catalogStatus === 'pending'" class="games-loading">
          <div class="games-spinner"></div>
        </div>
        <div v-else-if="categories.length" class="games-grid">
          <div class="game-card glass-card" v-for="cat in categories" :key="cat.name">
            <div class="game-icon">{{ categoryEmoji(cat.name) }}</div>
            <div class="game-info">
              <div class="game-name">{{ cat.name }}</div>
              <div class="game-type">{{ (cat.packs || []).length }} plan{{ (cat.packs || []).length !== 1 ? 's' : '' }} available</div>
            </div>
            <div class="game-status">
              <span class="status-dot"></span>
              Available
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    title: 'SSD Storage',
    desc: 'All servers run on SSD storage — your world loads fast and stays responsive, even under heavy load.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  },
  {
    title: 'DDoS Protection',
    desc: 'Enterprise-grade DDoS mitigation is included on every plan. Your server stays online even when under attack.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  },
  {
    title: 'High Availability',
    desc: 'We maintain a high uptime SLA so your server is there when your community logs on — no unexpected downtime.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  },
  {
    title: 'Fast Deployment',
    desc: 'Your server is live within minutes of your order. Pick a plan, complete your purchase, and start playing right away.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
  },
  {
    title: 'SFTP Access',
    desc: 'Connect via SFTP to upload modpacks, manage plugins and edit config files directly. Full control over your server files.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  },
  {
    title: 'Backups & Automation',
    desc: 'Schedule automatic backups and programmable actions from the panel. Your world is protected and your setup stays consistent.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  },
  {
    title: 'Free Trial Plans',
    desc: 'Not sure yet? Eligible plans include a free trial period so you can test everything before committing.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  },
  {
    title: 'Support via Tickets',
    desc: 'Open a support ticket directly from your panel. Our team will get back to you as quickly as possible.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  },
]

const { data: catalog, status: catalogStatus } = await useFetch('/api/catalog')

const categories = computed(() => catalog.value?.categories ?? [])

function categoryEmoji(name) {
  const n = name.toLowerCase()
  if (n.includes('minecraft')) return '⛏️'
  if (n.includes('rust')) return '🔧'
  if (n.includes('valheim')) return '⚔️'
  if (n.includes('ark')) return '🦕'
  if (n.includes('terraria')) return '🌿'
  if (n.includes('gmod') || n.includes('garry')) return '🔩'
  if (n.includes('cs') || n.includes('counter')) return '🎯'
  if (n.includes('vrising') || n.includes('v rising')) return '🧛'
  return '🖥️'
}
</script>

<style scoped>
.features-section {
  background: linear-gradient(180deg, var(--bg-void) 0%, var(--bg-deep) 50%, var(--bg-void) 100%);
  overflow: hidden;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-desc {
  max-width: 560px;
  margin: 1rem auto 0;
  font-size: 1.05rem;
  color: var(--text-secondary);
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.feature-card {
  padding: 1.75rem 1.5rem;
  animation: fadeUp 0.6s ease both;
}

.feature-icon {
  margin-bottom: 1.25rem;
}

.icon-hex {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(0, 212, 255, 0.1));
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 12px;
  color: var(--accent-cyan);
}

.icon-hex :deep(svg) {
  width: 22px;
  height: 22px;
}

.feature-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.6rem;
  line-height: 1.3;
}

.feature-desc {
  font-size: 0.88rem;
  line-height: 1.65;
  color: var(--text-secondary);
}

/* Games section */
.games-section {
  margin-top: 5rem;
}

.games-loading {
  display: flex;
  justify-content: center;
  padding: 3rem 0;
}

.games-spinner {
  width: 28px;
  height: 28px;
  border: 2px solid var(--border-subtle);
  border-top-color: var(--accent-cyan);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.games-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.game-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
}

.game-icon {
  font-size: 1.6rem;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.04);
  border-radius: 10px;
}

.game-info { flex: 1; min-width: 0; }

.game-name {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.game-type {
  font-size: 0.72rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
}

.game-status {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.7rem;
  color: #22c55e;
  white-space: nowrap;
  flex-shrink: 0;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 6px #22c55e;
}

/* Responsive */
@media (max-width: 1100px) {
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .games-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .features-grid { grid-template-columns: 1fr; }
  .games-grid { grid-template-columns: 1fr; }
}
</style>

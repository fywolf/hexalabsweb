<template>
  <div class="store-page">
    <HexBackground />

    <!-- Page header -->
    <div class="store-hero">
      <div class="hero-glow glow-1"></div>
      <div class="hero-glow glow-2"></div>
      <div class="container" style="position:relative;z-index:2;">
        <NuxtLink to="/" class="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to home
        </NuxtLink>
        <div class="store-hero-content">
          <span class="section-tag">Plans & Pricing</span>
          <h1>Choose your <span class="gradient-text">game server</span></h1>
          <p class="hero-desc">Transparent pricing, no hidden fees. Your server is live within minutes of ordering.</p>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="status === 'pending'" class="state-container">
      <div class="loading-spinner"></div>
      <p>Loading plans...</p>
    </div>

    <!-- Error -->
    <div v-else-if="status === 'error'" class="state-container">
      <p class="state-text">Could not load plans right now. Please try again later.</p>
    </div>

    <!-- Catalog -->
    <div v-else-if="catalog?.categories?.length" class="container catalog-container">

      <!-- Category tabs -->
      <div class="category-tabs" v-if="catalog.categories.length > 1">
        <button
          class="tab-btn"
          :class="{ active: activeCategory === null }"
          @click="activeCategory = null"
        >All</button>
        <button
          v-for="cat in catalog.categories"
          :key="cat.name"
          class="tab-btn"
          :class="{ active: activeCategory === cat.name }"
          @click="activeCategory = cat.name"
        >{{ cat.name }}</button>
      </div>

      <!-- Categories -->
      <div
        v-for="category in visibleCategories"
        :key="category.name"
        class="store-category"
      >
        <div class="category-header">
          <span class="category-dot"></span>
          <h2 class="category-title">{{ category.name }}</h2>
          <span class="category-count">{{ (category.packs || []).length }} pack{{ (category.packs || []).length !== 1 ? 's' : '' }}</span>
        </div>

        <div class="products-grid">
          <div
            v-for="pack in (category.packs || [])"
            :key="pack.id"
            class="product-card glass-card"
            :class="{ 'card-oos': !pack.is_available }"
          >
            <!-- Out of stock overlay -->
            <div v-if="!pack.is_available" class="oos-badge">Out of Stock</div>

            <!-- Card top: image + name -->
            <div class="card-top">
              <div class="product-img-wrap">
                <img v-if="pack.image" :src="pack.image" :alt="pack.name" class="product-img" />
                <div v-else class="product-img-fallback">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/></svg>
                </div>
              </div>
              <div class="product-meta">
                <div class="product-name">{{ pack.name }}</div>
                <div class="product-desc" v-if="pack.description">{{ pack.description }}</div>
                <div v-if="pack.stock_available !== null && pack.stock_available !== undefined && pack.is_available" class="stock-indicator">
                  <span class="stock-dot"></span>
                  {{ pack.stock_available }} slot{{ pack.stock_available !== 1 ? 's' : '' }} left
                </div>
              </div>
            </div>

            <!-- Expansions -->
            <div v-if="pack.expansions && pack.expansions.length" class="expansions-section">
              <div class="expansions-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:12px;height:12px"><path d="M12 5v14M5 12h14"/></svg>
                Available add-ons
              </div>
              <div class="expansions-list">
                <div
                  v-for="exp in pack.expansions"
                  :key="exp.id"
                  class="expansion-tag"
                  :class="{ 'expansion-oos': !exp.is_available }"
                  :title="exp.description || ''"
                >
                  <span class="expansion-name">{{ exp.name }}</span>
                  <span class="expansion-price">+{{ formatPrice(exp.cost, catalog.currency) }}</span>
                  <span v-if="!exp.is_available" class="expansion-oos-label">OOS</span>
                </div>
              </div>
            </div>

            <!-- Price tiers -->
            <div class="prices">
              <template v-if="pack.is_available">
                <a
                  v-for="price in (pack.prices || [])"
                  :key="price.id"
                  :href="panelUrl"
                  class="price-btn"
                  :class="price.renewable ? 'price-btn--sub' : 'price-btn--onetime'"
                >
                  <div class="price-body">
                    <div class="price-type-badge">
                      <template v-if="price.renewable">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:9px;height:9px"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
                        Subscription
                      </template>
                      <template v-else>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:9px;height:9px"><polyline points="20 6 9 17 4 12"/></svg>
                        One-time
                      </template>
                    </div>

                    <span v-if="price.name" class="price-name">{{ price.name }}</span>

                    <div class="price-specs" v-if="price.cores || price.memory || price.disk">
                      <span v-if="price.cores" class="price-spec-pill">{{ price.cores }} {{ price.cores === 1 ? 'Core' : 'Cores' }}</span>
                      <span v-if="price.memory" class="price-spec-pill">{{ formatMemory(price.memory) }} RAM</span>
                      <span v-if="price.disk" class="price-spec-pill">{{ formatMemory(price.disk) }} Disk</span>
                      <span v-if="price.backup_limit" class="price-spec-pill">{{ price.backup_limit }} Backups</span>
                    </div>

                    <div class="price-row">
                      <span class="price-amount">{{ formatPrice(price.cost, catalog.currency) }}</span>
                      <template v-if="price.renewable">
                        <span class="price-sep">/</span>
                        <span class="price-interval">{{ formatInterval(price) }}</span>
                      </template>
                      <span v-else class="price-interval">one-time</span>
                    </div>
                    <span v-if="price.trial_days" class="price-trial">{{ price.trial_days }}-day free trial</span>
                  </div>
                  <svg class="price-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </template>
              <div v-else class="oos-prices">
                <span>Currently unavailable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div v-else class="state-container">
      <p class="state-text">No plans available yet. Check back soon!</p>
    </div>
  </div>
</template>

<script setup>
useHead({ title: 'Store — HexaLabs Hosting' })

const { public: publicConfig } = useRuntimeConfig()
const panelUrl = publicConfig.panelUrl

const { data: catalog, status } = await useFetch('/api/catalog')

const activeCategory = ref(null)

const visibleCategories = computed(() => {
  if (!catalog.value?.categories) return []
  if (!activeCategory.value) return catalog.value.categories
  return catalog.value.categories.filter(c => c.name === activeCategory.value)
})

function formatMemory(mb) {
  if (mb === 0) return 'Unlimited'
  if (mb >= 1024) return (mb / 1024).toFixed(mb % 1024 === 0 ? 0 : 1) + ' GB'
  return mb + ' MB'
}

function formatPrice(cost, currency) {
  if (!cost) return 'Free'
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'USD' }).format(cost)
}

function formatInterval(price) {
  const v = price.interval_value
  const t = price.interval_type
  if (v === 1) return t
  return `${v} ${t}s`
}
</script>

<style scoped>
.store-page {
  min-height: 100vh;
  background: var(--bg-void);
  position: relative;
}

/* ─── Hero ─────────────────────────────────── */
.store-hero {
  position: relative;
  overflow: hidden;
  padding: 9rem 0 4rem;
  text-align: center;
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.glow-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%);
  top: -120px; left: 50%;
  transform: translateX(-60%);
}

.glow-2 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%);
  top: 0; right: 10%;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: 2.5rem;
  transition: var(--transition);
}

.back-link:hover { color: var(--accent-cyan); }

.store-hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.hero-desc {
  max-width: 520px;
  margin: 0 auto;
  font-size: 1.05rem;
  color: var(--text-secondary);
}

/* ─── Catalog ───────────────────────────────── */
.catalog-container {
  padding-bottom: 6rem;
}

/* ─── Category tabs ─────────────────────────── */
.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-subtle);
}

.tab-btn {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  padding: 0.5rem 1.1rem;
  cursor: pointer;
  transition: var(--transition);
}

.tab-btn:hover {
  color: var(--text-primary);
  border-color: var(--border-subtle);
}

.tab-btn.active {
  color: var(--accent-cyan);
  background: rgba(0, 212, 255, 0.08);
  border-color: rgba(0, 212, 255, 0.3);
}

/* ─── Category section ──────────────────────── */
.store-category {
  margin-bottom: 4rem;
}

.store-category:last-child {
  margin-bottom: 0;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
}

.category-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-cyan);
  box-shadow: 0 0 8px var(--accent-cyan);
  flex-shrink: 0;
}

.category-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0;
}

.category-count {
  font-size: 0.75rem;
  color: var(--text-muted);
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
  margin-left: auto;
}

/* ─── Products grid ─────────────────────────── */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* ─── Product card ──────────────────────────── */
.product-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem;
  position: relative;
}

.card-oos {
  opacity: 0.65;
}

.oos-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #fff;
  background: rgba(239, 68, 68, 0.85);
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  z-index: 1;
}

.card-top {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.product-img-wrap {
  flex-shrink: 0;
}

.product-img {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  object-fit: cover;
}

.product-img-fallback {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(0, 212, 255, 0.1));
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: var(--radius-md);
  color: var(--accent-cyan);
}

.product-img-fallback svg { width: 26px; height: 26px; }

.product-meta { flex: 1; min-width: 0; }

.product-name {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
}

.product-desc {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.3rem;
  line-height: 1.5;
}

.stock-indicator {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.4rem;
  font-size: 0.72rem;
  color: var(--accent-cyan);
}

.stock-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-cyan);
  box-shadow: 0 0 4px var(--accent-cyan);
  flex-shrink: 0;
}

/* ─── Per-price spec pills ───────────────────── */
.price-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 0.4rem;
}

.price-spec-pill {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
}

.price-trial {
  font-size: 0.68rem;
  color: #22c55e;
  font-weight: 500;
  margin-top: 0.2rem;
  display: block;
}

/* ─── Expansions ────────────────────────────── */
.expansions-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.expansions-label {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.expansions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.expansion-tag {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: rgba(124, 58, 237, 0.08);
  border: 1px solid rgba(124, 58, 237, 0.25);
  font-size: 0.68rem;
}

.expansion-oos {
  opacity: 0.5;
}

.expansion-name {
  color: var(--text-secondary);
  font-weight: 500;
}

.expansion-price {
  color: var(--accent-cyan);
  font-weight: 600;
}

.expansion-oos-label {
  font-size: 0.6rem;
  font-weight: 700;
  color: rgb(239, 68, 68);
  text-transform: uppercase;
}

/* ─── Prices ─────────────────────────────────── */
.prices {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
}

.price-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.8rem 1.25rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.price-btn--sub {
  background: linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.08));
  border: 1px solid rgba(0,212,255,0.2);
}

.price-btn--onetime {
  background: linear-gradient(135deg, rgba(245,158,11,0.08), rgba(234,88,12,0.05));
  border: 1px solid rgba(245,158,11,0.25);
}

.price-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.price-btn--sub::before {
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
}

.price-btn--onetime::before {
  background: linear-gradient(135deg, rgb(245,158,11), rgb(234,88,12));
}

.price-btn:hover {
  border-color: transparent;
  transform: translateY(-1px);
}

.price-btn--sub:hover { box-shadow: 0 6px 24px rgba(0,212,255,0.2); }
.price-btn--onetime:hover { box-shadow: 0 6px 24px rgba(245,158,11,0.2); }

.price-btn:hover::before { opacity: 1; }
.price-btn:hover .price-name,
.price-btn:hover .price-amount,
.price-btn:hover .price-sep,
.price-btn:hover .price-interval { color: var(--bg-void); }
.price-btn:hover .price-arrow { color: var(--bg-void); }
.price-btn:hover .price-type-badge { color: var(--bg-void); border-color: transparent; background: rgba(0,0,0,0.15); }

.price-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 999px;
  padding: 0.15rem 0.5rem;
  margin-bottom: 0.25rem;
  width: fit-content;
  transition: var(--transition);
  position: relative;
  z-index: 1;
}

.price-btn--sub .price-type-badge {
  background: rgba(0,212,255,0.12);
  border: 1px solid rgba(0,212,255,0.3);
  color: var(--accent-cyan);
}

.price-btn--onetime .price-type-badge {
  background: rgba(245,158,11,0.12);
  border: 1px solid rgba(245,158,11,0.3);
  color: rgb(251,191,36);
}

.price-body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  position: relative;
  z-index: 1;
  flex: 1;
  min-width: 0;
}

.price-name {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  transition: var(--transition);
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.price-amount {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  transition: var(--transition);
}

.price-sep {
  font-size: 0.85rem;
  color: var(--text-muted);
  transition: var(--transition);
}

.price-interval {
  font-size: 0.8rem;
  color: var(--text-secondary);
  transition: var(--transition);
}

.price-arrow {
  width: 14px;
  height: 14px;
  color: var(--accent-cyan);
  margin-left: auto;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  transition: var(--transition);
}

.price-btn:hover .price-arrow { transform: translateX(3px); }

.oos-prices {
  padding: 0.8rem 1.25rem;
  border-radius: var(--radius-md);
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border-subtle);
  font-size: 0.82rem;
  color: var(--text-muted);
  text-align: center;
}

/* ─── States ─────────────────────────────────── */
.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 6rem 0;
  color: var(--text-muted);
}

.loading-spinner {
  width: 32px; height: 32px;
  border: 2px solid var(--border-subtle);
  border-top-color: var(--accent-cyan);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.state-text { font-size: 1rem; color: var(--text-muted); }

/* ─── Responsive ─────────────────────────────── */
@media (max-width: 1100px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .products-grid { grid-template-columns: 1fr; }
  .store-hero { padding: 7rem 0 3rem; }
}
</style>

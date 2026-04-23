<template>
  <section id="store" class="section store-section" style="scroll-margin-top: 5rem;">
    <HexBackground />

    <div class="container" style="position:relative;z-index:2;">
      <div class="section-header">
        <span class="section-tag">Our Plans</span>
        <h2>Pick your game,<br><span class="gradient-text">launch your server</span></h2>
        <p class="section-desc">
          Transparent pricing, no hidden fees. Choose a plan and your server will be
          live within minutes.
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="status === 'pending'" class="store-loading">
        <div class="loading-spinner"></div>
        <p>Loading plans...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="status === 'error'" class="store-empty">
        <p>Could not load plans right now. Please try again later.</p>
      </div>

      <!-- Catalog -->
      <div v-else-if="catalog?.categories?.length">
        <div
          v-for="(category, ci) in catalog.categories"
          :key="category.name"
          class="store-category"
          :style="`animation-delay: ${ci * 0.1}s`"
        >
          <h3 class="category-title">
            <span class="category-dot"></span>
            {{ category.name }}
          </h3>

          <div class="products-grid">
            <div
              v-for="(pack, pi) in (category.packs || [])"
              :key="pack.id"
              class="product-card glass-card"
              :style="`animation-delay: ${(ci * 0.1) + (pi * 0.06)}s`"
            >
              <!-- Pack header -->
              <div class="product-header">
                <img
                  v-if="pack.image"
                  :src="pack.image"
                  :alt="pack.name"
                  class="product-image"
                />
                <div class="product-image-fallback" v-else>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/></svg>
                </div>
                <div>
                  <div class="product-name">{{ pack.name }}</div>
                  <div class="product-desc" v-if="pack.description">{{ pack.description }}</div>
                </div>
              </div>

              <!-- Unavailable / Out of stock badge -->
              <div v-if="!pack.is_available" class="out-of-stock-badge">
                {{ pack.stock_available !== null && pack.stock_available <= 0 ? 'Out of Stock' : 'Currently Unavailable' }}
              </div>

              <!-- Prices -->
              <div class="product-prices" v-else>
                <a
                  v-for="price in (pack.prices || [])"
                  :key="price.id"
                  :href="panelUrl"
                  class="price-btn"
                  :class="price.renewable ? 'price-btn--sub' : 'price-btn--onetime'"
                >
                  <span class="price-type-label">
                    <template v-if="price.renewable">↻ Subscription</template>
                    <template v-else>✓ One-time</template>
                  </span>
                  <span v-if="price.name" class="price-name">{{ price.name }}</span>
                  <div v-if="price.cores || price.memory || price.disk" class="price-specs">
                    <span v-if="price.cores" class="price-spec-pill">{{ price.cores }} {{ price.cores === 1 ? 'Core' : 'Cores' }}</span>
                    <span v-if="price.memory" class="price-spec-pill">{{ formatMemory(price.memory) }} RAM</span>
                    <span v-if="price.disk" class="price-spec-pill">{{ formatMemory(price.disk) }} Disk</span>
                    <span v-if="price.backup_limit" class="price-spec-pill">{{ price.backup_limit }} Backups</span>
                  </div>
                  <span class="price-row">
                    <span class="price-amount">{{ formatPrice(price.cost, catalog.currency) }}</span>
                    <span v-if="price.renewable" class="price-interval">/ {{ formatInterval(price) }}</span>
                    <span v-else class="price-interval">one-time</span>
                  </span>
                  <span v-if="price.trial_days" class="price-trial">{{ price.trial_days }}-day free trial</span>
                </a>
              </div>

              <!-- Stock remaining hint -->
              <div v-if="pack.is_available && pack.stock_available !== null && pack.stock_available > 0 && pack.stock_available <= 5" class="stock-hint">
                Only {{ pack.stock_available }} slot{{ pack.stock_available === 1 ? '' : 's' }} left
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="store-empty">
        <p>No plans available yet. Check back soon!</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const { public: publicConfig } = useRuntimeConfig()
const panelUrl = publicConfig.panelUrl

const { data: catalog, status } = await useFetch('/api/catalog')

function formatMemory(mb) {
  if (mb === 0) return 'Unlimited'
  if (mb >= 1024) return (mb / 1024).toFixed(mb % 1024 === 0 ? 0 : 1) + ' GB'
  return mb + ' MB'
}

function formatPrice(cost, currency) {
  if (!cost) return 'Free'
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency || 'USD',
  }).format(cost)
}

function formatInterval(price) {
  const v = price.interval_value
  const t = price.interval_type
  if (v === 1) return t
  return `${v} ${t}s`
}
</script>

<style scoped>
.store-section {
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

/* Category */
.store-category {
  margin-bottom: 3.5rem;
  animation: fadeUp 0.6s ease both;
}

.store-category:last-child {
  margin-bottom: 0;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-subtle);
}

.category-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-cyan);
  box-shadow: 0 0 8px var(--accent-cyan);
}

/* Products grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.product-card {
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  animation: fadeUp 0.6s ease both;
}

/* Pack header */
.product-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-image {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
}

.product-image-fallback {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(0, 212, 255, 0.1));
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 10px;
  color: var(--accent-cyan);
  flex-shrink: 0;
}

.product-image-fallback svg {
  width: 22px;
  height: 22px;
}

.product-name {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
}

.product-desc {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
  line-height: 1.4;
}

/* Price buttons */
.product-prices {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.price-btn {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--bg-void);
  border-radius: var(--radius-md);
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.price-btn--sub {
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
}

.price-btn--onetime {
  background: linear-gradient(135deg, rgb(245,158,11), rgb(234,88,12));
}

.price-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.price-btn--sub::before {
  background: linear-gradient(135deg, var(--accent-violet), var(--accent-cyan));
}

.price-btn--onetime::before {
  background: linear-gradient(135deg, rgb(234,88,12), rgb(245,158,11));
}

.price-btn:hover {
  transform: translateY(-2px);
  color: var(--bg-void);
}

.price-btn--sub:hover { box-shadow: 0 6px 24px rgba(0,212,255,0.3); }
.price-btn--onetime:hover { box-shadow: 0 6px 24px rgba(245,158,11,0.3); }

.price-btn:hover::before { opacity: 1; }

.price-type-label,
.price-name,
.price-amount,
.price-interval {
  position: relative;
  z-index: 1;
}

.price-type-label {
  display: block;
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.8;
  line-height: 1;
  margin-bottom: 0.15rem;
}

.price-name {
  display: block;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.85;
  line-height: 1;
  margin-bottom: 0.2rem;
}

.price-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
  position: relative;
  z-index: 1;
}

.price-spec-pill {
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 999px;
  padding: 0.1rem 0.45rem;
  opacity: 0.9;
}

.price-row {
  display: inline-flex;
  align-items: baseline;
  gap: 0.3rem;
  position: relative;
  z-index: 1;
}

.price-interval {
  font-weight: 400;
  opacity: 0.8;
  font-size: 0.6rem;
}

.price-trial {
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.7);
  background: rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  padding: 0.1rem 0.45rem;
  position: relative;
  z-index: 1;
  margin-top: 0.1rem;
}

/* Out of stock */
.out-of-stock-badge {
  margin-top: auto;
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  padding: 0.55rem 1.2rem;
  cursor: not-allowed;
  width: fit-content;
}

.stock-hint {
  font-size: 0.7rem;
  color: #f59e0b;
  margin-top: -0.5rem;
  font-weight: 500;
}

/* States */
.store-loading {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-muted);
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 2px solid var(--border-subtle);
  border-top-color: var(--accent-cyan);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.store-empty {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-muted);
}

/* Responsive */
@media (max-width: 1100px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .products-grid { grid-template-columns: 1fr; }
}
</style>

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
              v-for="(product, pi) in category.products"
              :key="product.id"
              class="product-card glass-card"
              :style="`animation-delay: ${(ci * 0.1) + (pi * 0.06)}s`"
            >
              <!-- Product header -->
              <div class="product-header">
                <img
                  v-if="product.image"
                  :src="product.image"
                  :alt="product.name"
                  class="product-image"
                />
                <div class="product-image-fallback" v-else>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/></svg>
                </div>
                <div>
                  <div class="product-name">{{ product.name }}</div>
                  <div class="product-desc" v-if="product.description">{{ product.description }}</div>
                </div>
              </div>

              <!-- Specs -->
              <div class="product-specs">
                <div class="spec-item" v-if="product.cores">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/></svg>
                  <span>{{ product.cores }} {{ product.cores === 1 ? 'Core' : 'Cores' }}</span>
                </div>
                <div class="spec-item" v-if="product.memory">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>
                  <span>{{ formatMemory(product.memory) }} RAM</span>
                </div>
                <div class="spec-item" v-if="product.disk">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                  <span>{{ formatMemory(product.disk) }} Disk</span>
                </div>
                <div class="spec-item" v-if="product.backup_limit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <span>{{ product.backup_limit }} Backups</span>
                </div>
              </div>

              <!-- Prices -->
              <div class="product-prices">
                <a
                  v-for="price in product.prices"
                  :key="price.id"
                  :href="panelUrl"
                  class="price-btn"
                >
                  <span class="price-amount">{{ formatPrice(price.cost, catalog.currency) }}</span>
                  <span class="price-interval">/ {{ formatInterval(price) }}</span>
                </a>
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

/* Product header */
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

/* Specs */
.product-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.spec-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(124, 58, 237, 0.15);
  border-radius: 999px;
  padding: 0.3rem 0.7rem;
}

.spec-item svg {
  width: 12px;
  height: 12px;
  color: var(--accent-cyan);
  flex-shrink: 0;
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
  align-items: baseline;
  gap: 0.3rem;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--bg-void);
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
  border-radius: var(--radius-md);
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.price-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-violet), var(--accent-cyan));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.price-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 212, 255, 0.3);
  color: var(--bg-void);
}

.price-btn:hover::before { opacity: 1; }

.price-amount,
.price-interval {
  position: relative;
  z-index: 1;
}

.price-interval {
  font-weight: 400;
  opacity: 0.8;
  font-size: 0.6rem;
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

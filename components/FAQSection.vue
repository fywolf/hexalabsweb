<template>
  <section id="faq" class="section faq-section">
    <div class="container" style="position:relative;z-index:2;">
      <!-- Header -->
      <div class="section-header">
        <span class="section-tag">FAQ</span>
        <h2>Got questions?<br><span class="gradient-text">We've got answers</span></h2>
        <p class="section-desc">
          Can't find what you're looking for? Shoot us an email at
          <a href="mailto:contact@hexalabs.fr">contact@hexalabs.fr</a>
          — we're always happy to chat!
        </p>
      </div>

      <!-- FAQ Items -->
      <div class="faq-list">
        <div
          class="faq-item glass-card"
          v-for="(item, i) in faqs"
          :key="i"
          :class="{ open: openIndex === i }"
          @click="toggle(i)"
        >
          <div class="faq-question">
            <span>{{ item.q }}</span>
            <div class="faq-chevron">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
          </div>
          <Transition name="faq-answer">
            <div v-if="openIndex === i" class="faq-answer">
              <p>{{ item.a }}</p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- CTA Banner -->
      <div class="faq-cta">
        <HexBackground />
        <div class="faq-cta-inner">
          <div class="cta-logo">
            <img src="/logo.png" alt="HexaLabs" />
          </div>
          <div class="cta-text">
            <h3>Ready to launch your server?</h3>
            <p>Get started today — your gaming community is waiting.</p>
          </div>
          <a href="mailto:contact@hexalabs.fr" class="btn-primary">
            <span>Get in Touch</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const openIndex = ref(null)

const toggle = (i) => {
  openIndex.value = openIndex.value === i ? null : i
}

const faqs = [
  {
    q: 'Where are your servers physically located?',
    a: "All of our servers are hosted in France 🇫🇷. This means low latency for European players and full compliance with GDPR data regulations. We don't use any third-party data centers outside of France.",
  },
  {
    q: 'How long does it take to set up a server?',
    a: 'Most servers are deployed within minutes of your order. Once your plan is activated, you\'ll receive access to the control panel right away and can start configuring your server immediately.',
  },
  {
    q: 'What games do you support?',
    a: 'We currently support Minecraft, Rust, Counter-Strike 2, Valheim, ARK: Survival Evolved, Terraria, Garry\'s Mod, V Rising, and more. If you don\'t see your game listed, reach out — we may be able to add support for it!',
  },
  {
    q: 'Do you offer DDoS protection?',
    a: 'Yes! All of our servers come with enterprise-grade DDoS mitigation included at no extra cost. Your server stays online even when under attack, so your players can keep playing without interruption.',
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: "Absolutely. You can upgrade your plan at any time as your community grows. Downgrades are also possible at the end of your billing cycle. We're flexible — we grow with you.",
  },
  {
    q: 'Are automatic backups included?',
    a: 'Yes, we automatically back up your server data on a regular schedule. You can also trigger manual backups from the control panel at any time. Your world is safe with us.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept major credit/debit cards, PayPal, and other common payment methods. All transactions are processed securely. Contact us if you have a specific payment request.',
  },
  {
    q: 'Is my data GDPR compliant?',
    a: 'Yes. Since we host everything in France (EU), your data is fully subject to GDPR protections. We only collect what\'s necessary, never sell your data, and you can request deletion at any time. Read our Privacy Policy for full details.',
  },
]
</script>

<style scoped>
.faq-section {
  background: var(--bg-void);
}

.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.section-desc {
  max-width: 520px;
  margin: 1rem auto 0;
}

/* FAQ List */
.faq-list {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.faq-item {
  cursor: pointer;
  border-radius: var(--radius-md) !important;
  overflow: hidden;
  transition: var(--transition);
}

.faq-item.open {
  border-color: rgba(0, 212, 255, 0.3) !important;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.06);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.35rem 1.5rem;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.01em;
  user-select: none;
}

.faq-chevron {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  color: var(--accent-cyan);
  transition: transform 0.3s ease;
}

.faq-chevron svg { width: 100%; height: 100%; }

.faq-item.open .faq-chevron {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.5rem 1.35rem;
  border-top: 1px solid var(--border-subtle);
}

.faq-answer p {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.7;
  padding-top: 1rem;
}

/* FAQ Answer Transition */
.faq-answer-enter-active,
.faq-answer-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.faq-answer-enter-from,
.faq-answer-leave-to {
  opacity: 0;
  max-height: 0;
}

.faq-answer-enter-to,
.faq-answer-leave-from {
  opacity: 1;
  max-height: 300px;
}

/* CTA Banner */
.faq-cta {
  position: relative;
  margin-top: 5rem;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-subtle);
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(0, 212, 255, 0.08));
  overflow: hidden;
  padding: 3rem;
}

.faq-cta-inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.cta-logo img {
  height: 56px;
  width: auto;
  filter: drop-shadow(0 0 12px rgba(0, 212, 255, 0.5));
}

.cta-text {
  flex: 1;
  min-width: 220px;
}

.cta-text h3 {
  font-size: 1.4rem;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.cta-text p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

@media (max-width: 600px) {
  .faq-cta-inner { justify-content: center; text-align: center; }
}
</style>

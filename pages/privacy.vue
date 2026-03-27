<template>
  <div class="legal-page">
    <!-- Subtle hex bg -->
    <HexBackground />

    <div class="container legal-container">
      <!-- Back -->
      <NuxtLink to="/" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back to Home
      </NuxtLink>

      <!-- Header -->
      <div class="legal-header">
        <img src="/logo.png" alt="HexaLabs Hosting" class="legal-logo" />
        <span class="section-tag">Legal</span>
        <h1>Privacy Policy</h1>
        <p class="legal-meta">Last updated: <time>{{ lastUpdated }}</time> · Effective immediately</p>
      </div>

      <div class="legal-content">
        <div class="legal-intro">
          <p>
            At <strong>HexaLabs Hosting</strong>, your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services. We are committed to transparency and to full compliance with the General Data Protection Regulation (GDPR).
          </p>
          <p>
            All of our infrastructure is hosted in France 🇫🇷, meaning your data remains within the European Union and is subject to EU data protection law.
          </p>
        </div>

        <div class="legal-section" v-for="section in sections" :key="section.title">
          <h2>{{ section.title }}</h2>
          <div v-for="(block, i) in section.content" :key="i">
            <h3 v-if="block.subtitle">{{ block.subtitle }}</h3>
            <p v-if="block.text">{{ block.text }}</p>
            <ul v-if="block.list">
              <li v-for="item in block.list" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

        <!-- Contact block -->
        <div class="legal-contact">
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
          <div class="contact-card">
            <div><strong>HexaLabs Hosting</strong></div>
            <div>Hosted in France 🇫🇷</div>
            <div>Email: <a href="mailto:privacy@hexalabs.fr">privacy@hexalabs.fr</a></div>
            <div>General: <a href="mailto:contact@hexalabs.fr">contact@hexalabs.fr</a></div>
          </div>
          <p style="margin-top:1rem;">You also have the right to lodge a complaint with the <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés), the French data protection authority, at <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({ title: 'Privacy Policy — HexaLabs Hosting' })

const lastUpdated = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })

const sections = [
  {
    title: '1. Who We Are',
    content: [
      { text: 'HexaLabs Hosting is a game server hosting company based in France. We operate the website hexalabs.fr and provide game server hosting services. For GDPR purposes, HexaLabs Hosting acts as the data controller for personal data collected through our website and services.' },
    ],
  },
  {
    title: '2. Information We Collect',
    content: [
      { subtitle: '2.1 Account & Contact Information' },
      { text: 'When you create an account or contact us, we may collect:', list: ['Full name', 'Email address', 'Billing address', 'Payment information (processed securely via our payment provider — we do not store raw card data)', 'Communications you send to our support team'] },
      { subtitle: '2.2 Usage & Technical Data' },
      { text: 'We automatically collect certain technical data when you visit our website:', list: ['IP address', 'Browser type and version', 'Pages visited and time spent', 'Referring URL', 'Device and operating system type'] },
      { subtitle: '2.3 Server Activity Data' },
      { text: 'For the servers you manage with us, we may collect performance metrics, resource usage statistics, and activity logs for the purpose of providing and improving our hosting services. This data relates to server activity, not the content of communications between players.' },
    ],
  },
  {
    title: '3. How We Use Your Information',
    content: [
      { text: 'We use your personal data to:', list: [
        'Create and manage your hosting account',
        'Process payments and send invoices',
        'Provide technical support',
        'Monitor server health and performance',
        'Send important service notifications (e.g., maintenance windows)',
        'Comply with legal obligations',
        'Improve our website and services',
      ] },
      { text: 'We will only send you marketing communications if you have explicitly opted in, and you can unsubscribe at any time.' },
    ],
  },
  {
    title: '4. Legal Basis for Processing (GDPR)',
    content: [
      { text: 'Under the GDPR, we rely on the following legal bases:', list: [
        'Contract performance: processing necessary to fulfill our hosting services agreement with you',
        'Legal obligation: processing required to comply with applicable laws',
        'Legitimate interests: such as fraud prevention, network security, and service improvement',
        'Consent: where you have specifically consented, such as to marketing emails',
      ] },
    ],
  },
  {
    title: '5. Data Sharing & Third Parties',
    content: [
      { text: 'We do not sell your personal data to anyone, ever. We may share data with trusted third parties only as necessary:', list: [
        'Payment processors — to securely handle billing (e.g., Stripe). These providers operate under their own privacy policies and GDPR compliance frameworks.',
        'Infrastructure providers — hosting partners operating within the EU/France.',
        'Legal authorities — if required by law, court order, or to protect the rights and safety of HexaLabs or our users.',
      ] },
    ],
  },
  {
    title: '6. Data Retention',
    content: [
      { text: 'We retain your personal data only for as long as necessary to provide our services and comply with legal obligations. Account data is retained for the duration of your account. After account deletion, we may retain anonymised usage data and billing records for up to 5 years as required by French law.' },
    ],
  },
  {
    title: '7. Your Rights Under GDPR',
    content: [
      { text: 'As a user in the EU, you have the following rights regarding your personal data:', list: [
        'Right of access: request a copy of the personal data we hold about you',
        'Right to rectification: request correction of inaccurate data',
        'Right to erasure: request deletion of your data ("right to be forgotten")',
        'Right to restriction: request that we limit how we process your data',
        'Right to data portability: receive your data in a machine-readable format',
        'Right to object: object to processing based on legitimate interests',
        'Right to withdraw consent: at any time, without affecting prior processing',
      ] },
      { text: 'To exercise any of these rights, contact us at privacy@hexalabs.fr. We will respond within 30 days as required by GDPR.' },
    ],
  },
  {
    title: '8. Cookies',
    content: [
      { text: 'Our website uses a minimal set of cookies, strictly necessary for operation (e.g., session management). We do not use advertising cookies or third-party tracking cookies. If we introduce analytics in the future, we will update this policy and request your consent where required.' },
    ],
  },
  {
    title: '9. Security',
    content: [
      { text: 'We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or disclosure. All data is transmitted over encrypted connections (HTTPS/TLS). Access to personal data is strictly limited to authorised personnel.' },
    ],
  },
  {
    title: '10. Changes to This Policy',
    content: [
      { text: 'We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or by placing a prominent notice on our website. The date at the top of this page reflects the most recent update.' },
    ],
  },
]
</script>

<style scoped>
.legal-page {
  position: relative;
  min-height: 100vh;
  background: var(--bg-void);
  padding-top: 7rem;
  padding-bottom: 6rem;
}

.legal-container {
  position: relative;
  z-index: 2;
  max-width: 860px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: 2.5rem;
  transition: var(--transition);
}

.back-link:hover { color: var(--accent-cyan); }

/* Header */
.legal-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 3rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--border-subtle);
}

.legal-logo {
  height: clamp(80px, 10vw, 180px);
  width: auto;
  align-self: flex-start;
  filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.35));
}

@media (max-width: 768px) {
  .legal-logo {
    height: clamp(60px, 15vw, 100px);
  }
}

.legal-header h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--text-primary);
}

.legal-meta {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.4;
}

/* Intro */
.legal-intro {
  background: rgba(124, 58, 237, 0.06);
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: var(--radius-md);
  padding: 1.5rem 1.75rem;
  margin-bottom: 2.5rem;
}

.legal-intro p {
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.legal-intro p:last-child { margin-bottom: 0; }

/* Sections */
.legal-section {
  margin-bottom: 2.5rem;
}

.legal-section h2 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-subtle);
}

.legal-section h3 {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent-cyan);
  margin: 1rem 0 0.5rem;
}

.legal-section p {
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.legal-section ul {
  margin: 0.5rem 0 0.75rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.legal-section li {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  list-style-type: disc;
  marker-color: var(--accent-purple);
}

/* Contact */
.legal-contact {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-subtle);
}

.legal-contact h2 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.legal-contact p {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.contact-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1.25rem 1.5rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.contact-card strong {
  color: var(--text-primary);
}
</style>

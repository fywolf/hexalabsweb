<template>
  <div class="legal-page">
    <HexBackground />

    <div class="container legal-container">
      <NuxtLink to="/" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back to Home
      </NuxtLink>

      <div class="legal-header">
        <img src="/logo.png" alt="HexaLabs Hosting" class="legal-logo" />
        <span class="section-tag">Legal</span>
        <h1>Terms of Service</h1>
        <p class="legal-meta">Last updated: <time>{{ lastUpdated }}</time> · Effective immediately</p>
      </div>

      <div class="legal-content">
        <div class="legal-intro">
          <p>
            Welcome to <strong>HexaLabs Hosting</strong>. By accessing or using our services, you agree to be bound by these Terms of Service. Please read them carefully. If you disagree with any part of these terms, you may not use our services.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and HexaLabs Hosting, a hosting company operating in France and subject to French and EU law.
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

        <div class="legal-contact">
          <h2>Contact</h2>
          <p>Questions about these Terms? Reach out to us:</p>
          <div class="contact-card">
            <div><strong>HexaLabs Hosting</strong></div>
            <div>Hosted in France 🇫🇷</div>
            <div>Email: <a href="mailto:legal@hexalabs.fr">legal@hexalabs.fr</a></div>
            <div>General: <a href="mailto:contact@hexalabs.fr">contact@hexalabs.fr</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({ title: 'Terms of Service — HexaLabs Hosting' })

const lastUpdated = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: [
      { text: 'By registering an account, purchasing a plan, or using any HexaLabs Hosting service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, as well as our Privacy Policy, which is incorporated herein by reference.' },
    ],
  },
  {
    title: '2. Eligibility',
    content: [
      { text: 'You must be at least 16 years of age to use our services. If you are under the age of majority in your jurisdiction, you must have the consent of a parent or legal guardian. By using our services, you represent that you meet these eligibility requirements.' },
    ],
  },
  {
    title: '3. Services Description',
    content: [
      { text: 'HexaLabs Hosting provides game server hosting services. All servers are hosted on infrastructure located in France. We reserve the right to modify, suspend, or discontinue any service at any time, with reasonable notice provided to affected customers.' },
    ],
  },
  {
    title: '4. Account Registration',
    content: [
      { text: 'To access our services, you may need to create an account. You agree to:', list: [
        'Provide accurate and complete registration information',
        'Keep your account credentials secure and confidential',
        'Notify us immediately of any unauthorised use of your account',
        'Be responsible for all activity that occurs under your account',
      ] },
      { text: 'We reserve the right to suspend or terminate accounts that provide false information or violate these Terms.' },
    ],
  },
  {
    title: '5. Acceptable Use Policy',
    content: [
      { text: 'You agree to use our services only for lawful purposes. The following activities are strictly prohibited:', list: [
        'Hosting content that is illegal under French or EU law',
        'Conducting DDoS attacks or any form of network abuse',
        'Hosting, distributing, or facilitating malware, spyware, or viruses',
        'Mining cryptocurrency without prior written authorisation',
        'Sending spam or unsolicited bulk communications',
        'Infringing intellectual property rights',
        'Hosting child sexual abuse material (CSAM) — zero tolerance; immediate termination and reporting to authorities',
        'Attempting to breach or circumvent our security measures',
        'Reselling or subletting services without our written consent',
        'Using our services to facilitate illegal gambling or fraud',
      ] },
      { text: 'Violation of this policy may result in immediate suspension or termination without refund, and may be reported to law enforcement authorities where applicable.' },
    ],
  },
  {
    title: '6. Payment & Billing',
    content: [
      { subtitle: '6.1 Plans and Pricing' },
      { text: 'All pricing is displayed on our website. Prices are listed in Euros (EUR) inclusive of applicable taxes unless stated otherwise.' },
      { subtitle: '6.2 Payment' },
      { text: 'Payment is due at the start of each billing cycle. By providing payment information, you authorise us to charge your payment method for the applicable fees.' },
      { subtitle: '6.3 Late Payment' },
      { text: 'Services may be suspended for non-payment. We will attempt to notify you before suspension. Outstanding balances must be settled to reactivate services.' },
      { subtitle: '6.4 Refunds' },
      { text: 'We offer a 48-hour money-back guarantee for new orders. After this period, refunds are granted at our discretion and only in cases of verifiable service failures on our end. Refunds are not provided for misuse, policy violations, or cancellations after the refund window.' },
    ],
  },
  {
    title: '7. Uptime & Service Level',
    content: [
      { text: 'We target 99.9% uptime for our services. Scheduled maintenance windows will be communicated in advance. We are not liable for downtime caused by circumstances beyond our reasonable control (force majeure), including but not limited to natural disasters, internet outages, or upstream provider failures.' },
    ],
  },
  {
    title: '8. Data & Backups',
    content: [
      { text: 'We provide automatic backups as a convenience. However, you are ultimately responsible for maintaining your own backups of important data. HexaLabs Hosting is not liable for data loss, and we strongly encourage you to keep local copies of your server worlds and configurations.' },
    ],
  },
  {
    title: '9. Intellectual Property',
    content: [
      { text: 'All content on the HexaLabs Hosting website — including text, graphics, logos, and software — is owned by or licensed to HexaLabs Hosting and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.' },
    ],
  },
  {
    title: '10. Privacy',
    content: [
      { text: 'Our collection and use of personal data is governed by our Privacy Policy, available at hexalabs.fr/privacy. By using our services, you consent to the data practices described therein.' },
    ],
  },
  {
    title: '11. Limitation of Liability',
    content: [
      { text: 'To the fullest extent permitted by applicable law, HexaLabs Hosting shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, loss of revenue, or loss of profits arising from your use of or inability to use our services. Our total liability to you for any claim shall not exceed the amount you paid us in the three months preceding the claim.' },
    ],
  },
  {
    title: '12. Indemnification',
    content: [
      { text: 'You agree to indemnify and hold harmless HexaLabs Hosting and its officers, employees, and partners from any claims, damages, losses, or expenses (including legal fees) arising from your use of our services, your violation of these Terms, or your violation of any third-party rights.' },
    ],
  },
  {
    title: '13. Termination',
    content: [
      { text: 'Either party may terminate the service agreement at any time. You may cancel your account by contacting us. We reserve the right to terminate accounts for violations of these Terms, with or without notice. Upon termination, your access to services will cease and your data may be deleted after a reasonable grace period.' },
    ],
  },
  {
    title: '14. Governing Law & Dispute Resolution',
    content: [
      { text: 'These Terms are governed by and construed in accordance with the laws of France. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts of France. For consumer disputes, the European Online Dispute Resolution platform is available at ec.europa.eu/consumers/odr.' },
    ],
  },
  {
    title: '15. Changes to These Terms',
    content: [
      { text: 'We may update these Terms of Service from time to time. Material changes will be communicated by email or a notice on our website at least 14 days before they take effect. Continued use of our services after changes take effect constitutes acceptance of the revised Terms.' },
    ],
  },
]
</script>

<style scoped>
/* Reuse styles from privacy page */
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
}

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
}

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

.contact-card strong { color: var(--text-primary); }
</style>

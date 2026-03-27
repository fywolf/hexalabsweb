<template>
  <div class="hex-bg-wrap" aria-hidden="true">
    <svg
      class="hex-grid"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id="hexPattern"
          x="0"
          y="0"
          width="80"
          height="92"
          patternUnits="userSpaceOnUse"
        >
          <!-- Flat-top hex rows -->
          <polygon
            points="40,0 80,23 80,69 40,92 0,69 0,23"
            fill="none"
            stroke="url(#hexStroke)"
            stroke-width="0.8"
          />
          <polygon
            points="40,46 80,69 80,115 40,138 0,115 0,69"
            fill="none"
            stroke="url(#hexStroke)"
            stroke-width="0.8"
          />
          <!-- Offset column -->
          <polygon
            points="80,0 120,23 120,69 80,92 40,69 40,23"
            fill="none"
            stroke="url(#hexStroke)"
            stroke-width="0.8"
          />
        </pattern>
        <linearGradient id="hexStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7c3aed" />
          <stop offset="100%" stop-color="#00d4ff" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexPattern)" />
    </svg>
  </div>
</template>

<style scoped>
.hex-bg-wrap {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.hex-grid {
  width: 100%;
  height: 100%;
  opacity: 0.05;
  animation: hexPulse 8s ease-in-out infinite;
}

@keyframes hexPulse {
  0%, 100% { opacity: 0.04; }
  50%       { opacity: 0.09; }
}
</style>

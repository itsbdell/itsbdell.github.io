---
layout: default
title: Brian Dell
permalink: /
---

<div class="landing-page">
  <h1>Brian Dell</h1>
  <div class="social-links">
    <a href="https://twitter.com/itsbdell" class="social-link">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
      </svg>
      <span>@itsbdell</span>
    </a>
    <a href="https://www.linkedin.com/in/brianjdell/" class="social-link">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
      <span>LinkedIn</span>
    </a>
    <a href="mailto:dell.brian@gmail.com" class="social-link">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
      <span>Email</span>
    </a>
  </div>
</div>

<style>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.landing-page h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 400;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: opacity 0.2s;
}

.social-link:hover {
  opacity: 0.7;
}

.social-link svg {
  flex-shrink: 0;
}

@media (min-width: 480px) {
  .social-links {
    flex-direction: row;
    gap: 2rem;
  }
}
</style>

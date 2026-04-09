---
layout: default
title: Library
permalink: /library/
published: true
---

<a href="/" class="back-link">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
  Back
</a>

<h1 class="post-title">Library</h1>
{% assign items = site.data.library %}
{% assign read = items | where: "status", "read" %}

<p class="library-intro">Books, articles, podcasts, and films that shaped my thinking.</p>

<div class="library-grid">
  {% for item in read %}
    {% include library-card.html item=item %}
  {% endfor %}
</div>

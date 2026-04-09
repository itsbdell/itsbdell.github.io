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
{% assign want = items | where: "status", "want" %}

<input type="checkbox" id="library-toggle" class="library-toggle-input">

<p class="library-intro library-intro--read">Books, articles, podcasts, and films that shaped my thinking.</p>
<p class="library-intro library-intro--want">Books I want to have read.</p>

<div class="library-tabs">
  <label for="library-toggle" class="library-tab library-tab--library">Library</label>
  <label for="library-toggle" class="library-tab library-tab--anti">Antilibrary</label>
</div>

<div class="library-grid library-grid--read">
  {% for item in read %}
    {% include library-card.html item=item %}
  {% endfor %}
</div>

<div class="library-grid library-grid--want">
  {% for item in want %}
    {% include library-card.html item=item %}
  {% endfor %}
</div>

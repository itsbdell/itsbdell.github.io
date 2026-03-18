---
layout: default
title: Library
permalink: /library/
published: true
---

<section class="post">
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
</section>

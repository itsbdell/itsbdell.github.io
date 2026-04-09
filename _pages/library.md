---
layout: default
title: Library
permalink: /library/
published: true
---

<a href="/" class="back-link">&larr;</a>

<h1 class="post-title">Library</h1>
{% assign items = site.data.library %}
{% assign read = items | where: "status", "read" %}

<p class="library-intro">Books, articles, podcasts, and films that shaped my thinking.</p>

<div class="library-grid">
  {% for item in read %}
    {% include library-card.html item=item %}
  {% endfor %}
</div>

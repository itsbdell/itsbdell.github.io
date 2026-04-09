---
layout: default
title: Brian Dell
permalink: /
---

<div class="intro">
  <p class="intro-bio">Hi. I'm Brian. I'm a dad, product and biz person based in Brooklyn, NY. I write about strategy, foresight, and organizational change at <a href="https://littlefutures.substack.com/">Little Futures</a>. Browse my <a href="/library/">library</a>.</p>
</div>

<hr>

{% if site.data.writing.size > 0 %}
<h2 class="section-heading">Writing</h2>

<ul class="item-list">
{% for item in site.data.writing %}
  {% include writing-list-item.html item=item %}
{% endfor %}
</ul>
{% endif %}

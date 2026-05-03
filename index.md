---
layout: default
title: Brian Dell
permalink: /
---

<div class="intro">
  <p class="intro-bio">Hi. I'm Brian. I'm a dad, product and biz person based in Brooklyn, NY. I write about strategy, foresight, and organizational change at <a href="https://littlefutures.substack.com/">Little Futures</a>. Browse my <a href="/library/">library</a> or <a href="/apps/">apps</a>.</p>
</div>

<hr>

{% if site.data.writing.size > 0 %}
<div class="filter-section">
  <input type="radio" name="filter" id="filter-all" class="filter-input" checked>
  <input type="radio" name="filter" id="filter-writing" class="filter-input">
  <input type="radio" name="filter" id="filter-projects" class="filter-input">

  <div class="filter-header">
    <h2 class="section-heading">Latest</h2>
    <div class="filter-tabs">
      <label for="filter-all" class="filter-tab">All</label>
      <label for="filter-writing" class="filter-tab">Writing</label>
      <label for="filter-projects" class="filter-tab">Projects</label>
    </div>
  </div>

  <ul class="item-list">
  {% for item in site.data.writing %}
    {% include writing-list-item.html item=item %}
  {% endfor %}
  </ul>
</div>
{% endif %}

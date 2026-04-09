---
layout: default
title: Brian Dell
permalink: /
---

<div class="intro">
  <p class="intro-bio">{{ site.tagline }} I write about strategy, foresight, and organizational change at <a href="https://littlefutures.substack.com/">Little Futures</a>. See what I'm up to <a href="/now/">now</a>, or browse my <a href="/library/">library</a>.</p>
</div>

<hr>

<h2 class="section-heading">Projects</h2>

<ul class="item-list">
{% assign sorted_projects = site.data.projects | sort: "date" | reverse %}
{% for project in sorted_projects %}
  {% include project-list-item.html project=project %}
{% endfor %}
</ul>

{% if site.data.writing.size > 0 %}
<h2 class="section-heading">Writing</h2>

<ul class="item-list">
{% for item in site.data.writing %}
  {% include writing-list-item.html item=item %}
{% endfor %}
</ul>
{% endif %}

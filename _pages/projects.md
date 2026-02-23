---
layout: default
title: Projects
permalink: /projects/
published: true
nav_parent: /writing/
---

<section class="stream">
<div class="writing-filters">
  <a href="/writing/">All</a>
  <a href="/notes/">Notes</a>
  <a href="/essays/">Essays</a>
  <a href="/projects/" class="active">Projects</a>
</div>
{% assign current_year = "" %}
{% assign projects = site.posts | where: "type", "project" %}
{% for post in projects %}
  {% assign post_year = post.date | date: "%Y" %}
  {% if post_year != current_year %}
    {% assign first_of_year = true %}
    {% assign current_year = post_year %}
  {% else %}
    {% assign first_of_year = false %}
  {% endif %}
  {% include stream-item.html item=post first_of_year=first_of_year year=current_year %}
{% endfor %}
</section>

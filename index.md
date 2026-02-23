---
layout: default
title: Brian Dell
permalink: /
---

<h2 class="section-heading">Writing</h2>

<section class="stream">
{% assign current_year = "" %}
{% for post in site.posts %}
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

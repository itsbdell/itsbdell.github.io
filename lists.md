---
layout: page
title: Lists
---

{% for lists in site.lists %}

<a href="{{ lists.url }}">
  <h4>{{ lists.title }}</h4>
</a>

<p class="post-excerpt">{{ lists.description | truncate: 160 }}</p>

{% endfor %}  

---
layout: page
title: Lists
---

{% for lists in site.lists %}

<a href="{{ lists.url | prepend: site.baseurl }}">
  <h2>{{ lists.title }}</h2>
</a>

<p class="post-excerpt">{{ lists.description | truncate: 160 }}</p>

{% endfor %}  

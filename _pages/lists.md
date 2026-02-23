---
layout: page
title: Lists
permalink: /lists/
published: true
---

{% for lists in site.lists %}

<h4><a href="{{ lists.url }}">{{ lists.title }}</a></h4>

<p class="post-excerpt">{{ lists.description }}</p>

<br>

{% endfor %}  

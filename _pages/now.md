---
layout: page
title: Now
permalink: /now/
published: true
---

{% if site.data.bio.now.bullets %}
<ul class="bio-list">
  {% for bullet in site.data.bio.now.bullets %}
    <li>{{ bullet | markdownify }}</li>
  {% endfor %}
</ul>
{% endif %}

{% if site.data.bio.now.paragraphs %}
  {% for paragraph in site.data.bio.now.paragraphs %}
{{ paragraph | markdownify }}
  {% endfor %}
{% endif %}

{% if site.data.bio.now.blockquote %}
> {{ site.data.bio.now.blockquote }}
{% endif %}

---

*This is a [/now page](https://nownownow.com/about).*

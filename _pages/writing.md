---
title: Writing
permalink: /writing/
---

{% assign writing_items = site.data.writing | where: "type", "writing" | sort: "date" | reverse %}
{% if writing_items.size > 0 %}
<ul>
{% for item in writing_items %}
  <li>
    <a href="{{ item.url }}" {% if item.external %}target="_blank" rel="noopener noreferrer"{% endif %}>{{ item.title }}</a>
    <span class="muted">({{ item.date | date: "%b %-d, %Y" }})</span>
  </li>
{% endfor %}
</ul>
{% endif %}

---
title: Writing
permalink: /writing/
---

{% assign writing_items = site.data.writing | where: "type", "writing" | sort: "date" | reverse %}
{% if writing_items.size > 0 %}
<ul class="item-list">
{% for item in writing_items %}
  <li class="item-list-entry">
    <a href="{{ item.url }}" class="item-link" {% if item.external %}target="_blank" rel="noopener noreferrer"{% endif %}>
      <div class="item-row">
        <span class="item-title">{{ item.title }}</span>
        <span class="item-date">{{ item.date | date: "%B %-d, %Y" }}</span>
      </div>
    </a>
  </li>
{% endfor %}
</ul>
{% endif %}

---
layout: default
title: Software
permalink: /apps/
---

<p>Small things I've built: apps, skills, standards, and experiments. The feed at <a href="/apps.json"><code>/apps.json</code></a> is the source of truth.</p>

<ul>
{% for app in site.data.apps %}
  <li>
    <a href="{{ app.url }}" target="_blank" rel="noopener noreferrer">{{ app.name }}</a>{% if app.description %} - {{ app.description }}{% endif %}
    {% if app.targets %}
    <span class="muted">({% for t in app.targets %}<a href="{{ t.url }}" target="_blank" rel="noopener noreferrer">{{ t.label | default: t.kind }}</a>{% unless forloop.last %}, {% endunless %}{% endfor %})</span>
    {% endif %}
  </li>
{% endfor %}
</ul>

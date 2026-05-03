---
layout: default
title: Apps
permalink: /apps/
---

<p class="apps-intro">Small things I've built — apps, skills, and standards. Most are vibe-coded with AI. The feed at <a href="/apps.json"><code>/apps.json</code></a> is the source of truth.</p>

<ul class="item-list">
{% for app in site.data.apps %}
  <li class="item-list-entry">
    <a href="{{ app.url }}" class="item-link" target="_blank" rel="noopener noreferrer">
      <div class="item-row">
        <span class="item-title">
          {{ app.name }}{% if app.vibe_coded %}<span class="app-badge" aria-label="Vibe-coded">vibe-coded</span>{% endif %}
        </span>
      </div>
      {% if app.description %}<div class="item-description">{{ app.description }}</div>{% endif %}
    </a>
    {% assign extra_count = 0 %}
    {% if app.targets %}{% for t in app.targets %}{% unless t.url == app.url %}{% assign extra_count = extra_count | plus: 1 %}{% endunless %}{% endfor %}{% endif %}
    {% if app.tags or extra_count > 0 %}
    <div class="app-meta">
      {% if app.tags %}<span class="app-tags">{% for tag in app.tags %}<span class="app-tag">#{{ tag }}</span>{% endfor %}</span>{% endif %}
      {% if extra_count > 0 %}<span class="app-extras">{% for t in app.targets %}{% unless t.url == app.url %}<a href="{{ t.url }}" class="app-extra-link" target="_blank" rel="noopener noreferrer">{{ t.label | default: t.kind }}</a>{% endunless %}{% endfor %}</span>{% endif %}
    </div>
    {% endif %}
  </li>
{% endfor %}
</ul>

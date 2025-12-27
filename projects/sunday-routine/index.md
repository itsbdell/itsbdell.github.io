---
layout: page
title: Sunday Routine
---

<style>
.sunday-routine-index {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.sunday-routine-index h1 {
  margin-bottom: 3rem;
  font-size: 2.5rem;
}

.sunday-routine-index h2 {
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
}

.sunday-routine-index .category:first-child h2 {
  margin-top: 0;
}

.interview-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.interview-item {
  margin: 1.5rem 0;
}

.interview-item a {
  text-decoration: none;
  color: inherit;
  font-size: 1.2rem;
  display: inline-block;
  transition: opacity 0.2s;
}

.interview-item a:hover {
  opacity: 0.7;
}

.interview-meta {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.3rem;
}
</style>

<div class="sunday-routine-index">
  <h1>Sunday Routine</h1>
  <p style="margin-bottom: 3rem; color: #666; font-style: italic;">how we find peace, order, and enjoy our lives. on the weekends.</p>

  {% assign artists = site.sunday-routine | where: "category", "artists" | sort: "title" %}
  {% assign foodies = site.sunday-routine | where: "category", "foodies-makers" | sort: "title" %}
  {% assign entrepreneurs = site.sunday-routine | where: "category", "entrepreneurs" | sort: "title" %}
  {% assign writers = site.sunday-routine | where: "category", "writers" | sort: "title" %}

  {% if artists.size > 0 %}
  <div class="category">
    <h2>Artists</h2>
    <ul class="interview-list">
      {% for interview in artists %}
      <li class="interview-item">
        <a href="{{ interview.url }}">{{ interview.title }}</a>
        {% if interview.profession or interview.location %}
        <div class="interview-meta">
          {% if interview.profession %}{{ interview.profession }}{% endif %}{% if interview.profession and interview.location %} • {% endif %}{% if interview.location %}{{ interview.location }}{% endif %}
        </div>
        {% endif %}
      </li>
      {% endfor %}
    </ul>
  </div>
  {% endif %}

  {% if foodies.size > 0 %}
  <div class="category">
    <h2>Foodies & Makers</h2>
    <ul class="interview-list">
      {% for interview in foodies %}
      <li class="interview-item">
        <a href="{{ interview.url }}">{{ interview.title }}</a>
        {% if interview.profession or interview.location %}
        <div class="interview-meta">
          {% if interview.profession %}{{ interview.profession }}{% endif %}{% if interview.profession and interview.location %} • {% endif %}{% if interview.location %}{{ interview.location }}{% endif %}
        </div>
        {% endif %}
      </li>
      {% endfor %}
    </ul>
  </div>
  {% endif %}

  {% if entrepreneurs.size > 0 %}
  <div class="category">
    <h2>Entrepreneurs</h2>
    <ul class="interview-list">
      {% for interview in entrepreneurs %}
      <li class="interview-item">
        <a href="{{ interview.url }}">{{ interview.title }}</a>
        {% if interview.profession or interview.location %}
        <div class="interview-meta">
          {% if interview.profession %}{{ interview.profession }}{% endif %}{% if interview.profession and interview.location %} • {% endif %}{% if interview.location %}{{ interview.location }}{% endif %}
        </div>
        {% endif %}
      </li>
      {% endfor %}
    </ul>
  </div>
  {% endif %}

  {% if writers.size > 0 %}
  <div class="category">
    <h2>Writers</h2>
    <ul class="interview-list">
      {% for interview in writers %}
      <li class="interview-item">
        <a href="{{ interview.url }}">{{ interview.title }}</a>
        {% if interview.profession or interview.location %}
        <div class="interview-meta">
          {% if interview.profession %}{{ interview.profession }}{% endif %}{% if interview.profession and interview.location %} • {% endif %}{% if interview.location %}{{ interview.location }}{% endif %}
        </div>
        {% endif %}
      </li>
      {% endfor %}
    </ul>
  </div>
  {% endif %}
</div>



---
layout: page
title: About me
permalink: /about/
---

<div class="bio-container">
  <img src="/images/8bit_brian.png" alt="8bit Brian" width="130"/>

  <h2>Hi, I'm Brian</h2>

  <div class="bio-controls">
    <div class="bio-view-controls">
      <button id="view-prose" class="bio-view-btn active">Prose</button>
      <button id="view-list" class="bio-view-btn">List</button>
      <button id="view-timeline" class="bio-view-btn">Timeline</button>
    </div>
    <div class="bio-filters" style="display: none;">
      <button id="filter-all" class="bio-filter-btn active">All</button>
      <button id="filter-work" class="bio-filter-btn">Work</button>
      <button id="filter-projects" class="bio-filter-btn">Projects</button>
    </div>
  </div>

  <div id="bio-prose" class="bio-content">
    {% for paragraph in site.data.bio.prose %}
      <p>{{ paragraph }}</p>
    {% endfor %}
  </div>

  <div id="bio-list" class="bio-content" style="display: none;">
    <ul class="bio-list">
      {% for item in site.data.bio.list %}
        <li>{{ item.text }}</li>
      {% endfor %}
    </ul>
  </div>

  <div id="bio-timeline" class="bio-content" style="display: none;">
    <div class="timeline">
      {% assign sorted_timeline = site.data.bio.timeline | sort: "date" | reverse %}
      {% assign current_year = "" %}
      {% for event in sorted_timeline %}
        {% assign event_year = event.date | truncate: 4, "" %}
        {% if event_year != current_year %}
          {% if current_year != "" %}
            </div>
          </div>
          {% endif %}
          {% assign current_year = event_year %}
          <div class="timeline-year-group">
            <div class="timeline-year">{{ current_year }}</div>
            <div class="timeline-events">
        {% endif %}
        <div class="timeline-event" data-category="{{ event.category }}">
          <span class="timeline-verb">{{ event.verb }}</span> <span class="timeline-name">{{ event.name }}</span>
        </div>
      {% endfor %}
      {% if current_year != "" %}
          </div>
        </div>
      {% endif %}
    </div>
  </div>

  <div class="bio-contact">
    <p>Get in touch: <a href="mailto:dell.brian@gmail.com" class="contact-link"><svg class="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> email</a> <a href="https://twitter.com/itsbdell" class="contact-link"><svg class="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg> @itsbdell</a> <a href="https://www.linkedin.com/in/brianjdell/" class="contact-link"><svg class="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> linkedin</a></p>
  </div>

  <div class="bio-credit">
    <p>Inspired by <a href="https://www.gabrielvaldivia.com/about" target="_blank" rel="noopener">Gabriel Valdivia's about page</a></p>
  </div>
</div>

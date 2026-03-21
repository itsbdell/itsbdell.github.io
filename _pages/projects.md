---
layout: default
title: Projects
permalink: /projects/
published: true
---

<section class="post">
  <h1 class="post-title">Projects</h1>
  <p class="project-intro">Things I've built, explored, or shipped.</p>

  {% assign projects = site.data.projects | sort: "date" | reverse %}

  <div class="project-grid">
    {% for project in projects %}
      {% include project-card.html project=project %}
    {% endfor %}
  </div>
</section>

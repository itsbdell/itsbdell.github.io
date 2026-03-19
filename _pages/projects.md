---
layout: default
title: Projects
permalink: /projects/
published: true
---

<section class="post">
  <h1 class="post-title">Projects</h1>
  <div class="post-content page-prose">
    <div class="project-grid">
      {% for project in site.data.projects %}
        {% include project-card.html project=project %}
      {% endfor %}
    </div>
  </div>
</section>

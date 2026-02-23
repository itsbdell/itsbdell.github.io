---
layout: page
title: About
permalink: /about/
published: true
---

{% for paragraph in site.data.bio.prose %}
{{ paragraph }}

{% endfor %}

See what I'm up to [now](/now/).

Get in touch: [email](mailto:{{ site.social.email }}), [@{{ site.social.twitter }}](https://twitter.com/{{ site.social.twitter }}), [LinkedIn](https://www.linkedin.com/in/{{ site.social.linkedin }}/).

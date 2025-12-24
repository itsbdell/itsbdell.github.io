---
layout: default
title: Hi, I'm Brian
permalink: /
---

<div class="intro" markdown="1">

I'm based in Brooklyn, NY. I help big companies grapple with the future, and startups grapple with the present, primarily through standing up new strategies and capabilities - like innovation, incubation and accelerator programs.

Get in touch: [dell.brian@gmail.com](mailto:dell.brian@gmail.com) / [@itsbdell](https://twitter.com/itsbdell) / [linkedin](https://www.linkedin.com/in/brianjdell/)

</div>

<section class="posts">
<ul>
{% for post in site.posts %}
<li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%m.%d.%Y" }}</time></li>
{% endfor %}
</ul>
</section>

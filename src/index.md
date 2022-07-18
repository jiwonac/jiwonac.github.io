---
title: About
tags: page
date: 1970-01-01
image: /assets/profile.png
---

Hello! I am Jiwon Chang, a computer science student at the university of Rochester. I research representative data selection and integration under professor [Fatemeh Nargesian](https://fnargesian.com/) and PhD student [Pranay Mundra](https://mundrapranay.github.io/).

Outside of computer science, I can be found waxing philosophical about topics ranging biology, technocriticism, and environmentalism. I like walking simulators, card games, science fiction, plant-based cooking and cycling.

This website is the central catalog of interesting things I've done, from personal coding projects to research papers, non-academic writings and the occassional blog posts. Like a more human CV. (A relatively up-to-date PDF version is also down below.) The simple raw HTML/CSS design that evokes early internet aesthetics is intentional. 

<div class="centertext">
    {% for link in metadata.links %} {% if link.url != NULL %} <a href="{{ link.url }}">{{ link.name }}</a> {% else %} {{ link.name }} {% endif %} {% endfor %}
</div>
<br>
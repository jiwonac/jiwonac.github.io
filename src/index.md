---
title: About
tags: page
date: 1970-01-01
---

![Profile Picture](_assets/profile.png)

Hello! I am Jiwon Chang, a computer science student at the university of Rochester. I research representative data selection and integration under professor [Fatemeh Nargesian](https://fnargesian.com/) and PhD student [Pranay Mundra](https://mundrapranay.github.io/).

Outside of computer science, I can be found waxing philosophical about topics ranging biology, technocriticism, and environmentalism. I like walking simulators, card games, science fiction, plant-based cooking and cycling.

<div class="centertext">
    {% for link in metadata.links %} {% if link.url != NULL %} <a href="{{ link.url }}">{{ link.name }}</a> {% else %} {{ link.name }} {% endif %} {% endfor %}
</div>
<br>
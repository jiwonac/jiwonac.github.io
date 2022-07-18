---
title: Projects
tags: page
date: 1970-01-02
---

{% for project in projects %}
* {% if project.url != NULL %} [{{ project.name }}]({{ project.url }}) {% else %} {{project.name}} {% endif %}
{% endfor %}
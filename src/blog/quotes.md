---
title: "My Favorite Quotes"
tags: blog
date: 2024-01-02
date_str: "Jan 02, 2024"
blurb: ""
---

*🪴 This page is a garden that I update over time.*

{% for quote in metadata.quotes %}
<blockquote>
  <i>"{{quote.quote}}"</i><br>- {{quote.by}}{% if quote.source %} ({{quote.source}}){% endif %}
</blockquote>
{% endfor %}
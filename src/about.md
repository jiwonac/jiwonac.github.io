---
title:
tags: 
 - home
 - featured
date: 9999-12-31
date_str: false
permalink: false
---
<p class="poster-text">Hi! I'm <strong class="highlight">JIWON CHANG</strong>, a <span class="highlight">computer science PhD student</span>. I research <span class="highlight">data management for/with ML</span> at the University of Rochester with professor <a href="https://fnargesian.com/">Fatemeh Nargesian</a>.</p>

My current research interest is two-fold. First, how can we acquire data from data repositores to improve downstream model objectives? Second, how can we optimize queries where some clauses are given by models? The two objectives are synergistic, since data acquisition tasks are often best modelled using machine learning themselves. I like to view both queries from a set optimization perspective, valuing datasets and query results holistically. 

My interests outside of computer science include bug friends and houseplants, science fiction, gaming, minimal and intentional living. 

This is my home on the interwebs. You can find [blog posts](/blog), a more casual [microblog](/microblog), my "online CV" — [education](/education), [professional](/professional), [research](/research), external [writings](/writings) — and what I'm up to [now](/now). 

{% for link in metadata.links %}<span style="margin-right: 0.5%;"><img src="{{ link.image }}" class="textsize-image" alt="{{ link.name }}"> <a href="{{ link.url }}">{{ link.name }}</a></span>{% endfor %}
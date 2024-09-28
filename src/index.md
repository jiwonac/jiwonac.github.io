---
eleventyExcludeFromCollections: true
title: Home
---

<p class="poster-text">Hi! I'm <strong class="highlight">JIWON CHANG</strong>, a <span class="highlight">computer science PhD student</span>. I research <span class="highlight">data acquisition for ML</span> at the University of Rochester with professor <a href="https://fnargesian.com/">Fatemeh Nargesian</a>.</p>

My current research interest is two-fold. First, how can we **acquire data** from data repositores to **improve model performance?** Second, how can we optimize queries where some **clauses are given by models?** The two objectives are synergistic, since data acquisition tasks are often modelled using machine learning themselves. I like to view both queries from a set optimization perspective, valuing datasets and query results holistically. 

My interests outside of computer science include bug friends and houseplants, science fiction, gaming, minimal and intentional living. 

My office hours Fall 2024 are Mon/Wed 10:30AM, Tue/Thu 12PM, and Fri 1PM, 1 hour each, at Wegmans Hall 2311. 

{% for link in metadata.links %}<span style="margin-right: 0.5%;"><img src="{{ link.image }}" class="textsize-image" alt="{{ link.name }}"> <a href="{{ link.url }}">{{ link.name }}</a></span>{% endfor %}
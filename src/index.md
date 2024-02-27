---
eleventyExcludeFromCollections: true
title: Home
---

<p class="poster-text">Hi! I'm <strong class="highlight">JIWON CHANG</strong>, a <span class="highlight">computer science PhD student</span>. I research <span class="highlight">data management algorithms</span> at the University of Rochester's <a href="https://dataintelligencecrew.github.io/">Data Intelligence Lab</a> with professor <a href="https://fnargesian.com/">Fatemeh Nargesian</a>.</p>

My current research interest lies at the intersection of data management, AI/ML, and sampling algorithms. I aim to enable **in-database machine learning at interactive speed** through **approximate (core)set query algorithms**. Some topics of current interest include:

* Coresets in databases. 
* Data acquisition and debugging for model improvement. 
* Fast sampling algorithms for big data processing. 

My interests outside of computer science include bug friends and houseplants, science fiction, gaming, minimal and intentional living. 

Relevant links: {% for link in metadata.links %}<span style="margin-right: 0.5%;"><img src="{{ link.image }}" class="textsize-image" alt="{{ link.name }}"> <a href="{{ link.url }}">{{ link.name }}</a></span>{% endfor %}

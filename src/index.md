---
eleventyExcludeFromCollections: true
title: Home
---

<section class="landing-intro">
    <p>A data management technology nerd doing a PhD. I work at the University of Rochester with <a href="https://fnargesian.com/">Fatemeh Nargesian</a>. My focus is on AI-driven SQL extensions and their optimization in databases.</p>
    <p>You can find me in my natural habitat ranting about my various lifelong learning fixations.</p>
</section>

<section class="landing-links">
    {% for link in metadata.largelinks %}
    <a href="{{link.url}}" class="link-card">
        <span class="link-card-text">
            <span class="link-card-title">{{link.name}}</span>
            <span class="link-card-description">{{link.description}}</span>
        </span>
    </a>
    {% endfor %}
</section>

<section class="landing-external-links">
    <div class="external-links-grid">
        {% for link in metadata.smalllinks %}
        <a href="{{link.url}}" class="external-link">
            <img src="{{link.image}}" class="external-link-icon" alt="{{link.name}}">
            <span>{{ link.name }}</span>
        </a>
        {% endfor %}
    </div>
</section>
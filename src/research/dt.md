---
title: Data Distribution Tailoring
image: "/assets/research/dt.png"
alt: The DT pipeline where data sources are combined with RatioColl or EpsilonGreedy to form a balanced unified dataset. 
collaborators: 
 - Bohan Cui
 - Fatemeh Nargesian
date: 2023-01-31
date_str: "2023"
tags:
 - research
permalink: false
---

We study the data distribution tailoring (DT) problem, which aims to collect a unified dataset from multiple data sources such that groups of interest are adequately represented. In doing so, we ensure a baseline level of fairness in downstream tasks. We demonstrate the suboptimality of the prior paper's <textsc>CoupColl</textsc> algorithm and present a strictly better <textsc>RatioColl</textsc> algorithm. Furthermore, we generalize the prior authors' <textsc>UCB</textsc> algorithm for situations in which demographic statistics are not available through our <textsc>EpsilonGreedy<textsc> algorithm.</p>
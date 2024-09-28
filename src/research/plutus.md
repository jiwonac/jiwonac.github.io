---
title: "PLUTUS: Understanding Data Distribution Tailoring for Machine Learning"
image: "/assets/research/plutus-sketch.svg"
alt: "The PLUTUS pipeline consists of a cycle: model training, sliceline to identify problematic subgroups, and distribution tailoring to acquire additional data."
small_image: false
collaborators:
 - Christina Dionysio
 - Fatemeh Nargesian
 - Matthias Boehm
date: 2024-06-09
date_str: "2024"
tags:
 - research
links:
 - 
    name: Paper
    url: 'https://dl.acm.org/doi/pdf/10.1145/3626246.3654745'
    image: '/assets/icons/pdf.png'
 - 
    name: Poster
    url: '/assets/docs/plutus-poster.pdf'
    image: '/assets/icons/poster.png'
blurb: ""
---

## Abstract

Existing data debugging tools allow users to trace model performance problems all the way to the data by efficiently identifying slices (conjunctions of features and values) for which a trained model performs significantly worse than the entire dataset. To ensure accurate and fair models, one solution is to acquire enough data for these slices. In addition to crowdsourcing, recent data acquisition techniques design cost-effective algorithms to obtain such data from a union of external sources such as data lakes and data markets. We demonstrate PLUTUS, a tool for human-in-the-loop and model-aware data acquisition pipeline, on SystemDS, as an open source ML system for the end-to-end data science lifecycle. In PLUTUS, a user can efficiently identify problematic slices, connect to external data sources, and acquire the right amount of data for these slices in a cost-effective manner.

## Laymen's Abstract

When data scientists train machine learning models from a dataset, the model might not be accurate for all subgroups. Subgroups are subsets of data, such as "male" or "young male". This may be caused by the lack of data for some subgroups, especially minorities. Or, it may be that some subgroups are simply harder to learn. For example, training a machine vision model to identify a Roseate Spoonbill is much harder than having it learn what a bird is. 

PLUTUS is our prototype system where we propose a workflow to remedy this issue. First, we train a model on some data. Then, we use a tool called Sliceline that exhaustively searches through all subgroups in a dataset and identifies the subgroups with the worst performance. It can search a very large number of subgroups for a very large dataset in just a few seconds. 

Then, we acquire additional data for the worst subgroups, as identified by Sliceline, using a Distribution Tailoring (DT) algorithm. DT algorithms efficiently sample data from a data repository containing many different datasets. Its goal is to assemble a collection of data points that have an adequate number of data points from each subgroup. It adaptively changes the target of its sampling procedure to minimize latency. 

Finally, we shuffle the additional data back into the additional dataset, and we re-train the model. Hopefully, this process has improved the model's overall performance and/or group fairness. We repeat this process until satisfied. 
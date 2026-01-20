---
title: Data Distribution Tailoring
image: "/assets/research/dt.png"
alt: The DT pipeline where data sources are combined with RatioColl or EpsilonGreedy to form a balanced unified dataset.
collaborators: 
 - Bohan Cui
 - Fatemeh Nargesian
date: 2024-01-01
tags:
 - research
links:
 -
     name: Paper
     url: 'https://link.springer.com/epdf/10.1007/s00778-024-00849-w?sharing_token=2bonB5NahTVl2kK5rGrNb_e4RwlQNchNByi7wbcMAY5kEMlWJtUwo8rlfs37zl_ObD_kpCeyoTf7q8ym65v9X7B-oBV6l08CTdzqVhaNsuyCgn38KzlaxxbxGHw9R8hgJFZ_WGtVt8Jm0r9IrwamIVr9ENtCVYEsn9QESg-tAqM%3D'
     image: '/assets/icons/pdf.png'
 -
     name: Paper
     url: 'https://doi.org/10.1007/s00778-024-00849-w'
     image: '/assets/icons/doi.png'
 - 
     name: Poster
     url: '/assets/docs/dt-poster.pdf'
     image: '/assets/icons/poster.png'
blurb: "Cost-efficient algorithms for collecting data from multiple sources while ensuring adequate representation across demographic groups."
---

## Abstract

Data scientists frequently construct datasets for analysis, leveraging various data sources available to them. A significant challenge lies in ensuring that the analyzed dataset adequately represents relevant demographic groups, meeting desired distribution requirements. Whether obtained through experimentation, data providers, or human-annotators data from a single source may fall short of meeting these requirements, necessitating the collection of data from multiple sources. The Data Distribution Tailoring (DT) problem aims to cost-efficiently collect a unified data set from multiple sources. In this paper, we present major optimizations and generalizations to previous algorithms for this problem. In situations when group distributions are known in sources, we present a novel algorithm RatioColl that outperforms the existing algorithm, based on the Coupon Collector’s problem. If distributions are unknown, we propose decaying exploration rate multi-armed-bandit algorithms that, unlike the existing algorithm used for unknown DT, does not require prior information. Through theoretical analysis and extensive experiments, we demonstrate the effectiveness of our proposed algorithms.

## Laymen's Abstract

Modern machine learning (ML) requires a lot of training data. Collecting all of that data costs a lot of money. As such, data scientists often combine datasets that already exist and engineer the data to get the training data they need.

An important feature for many ML models is fairness. In its simplest form, fairness can be defined as: the model is accurate for all (racial, age, gender, etc.) demographic groups. An important way to ensure that a model is fair in this manner is to ensure that the training data has adequate number of samples from each group. If not, then the model does not have enough information to learn about under-represented groups.

We studied a problem that combines these objectives: how can we combine existing datasets such that the combined data has adequate representation across groups, while staying cost-efficient?

We achieve the goal by designing adaptive sampling algorithms. Adaptive means that in each iteration, the algorithm chooses the dataset to sample from. It prioritizes datasets that are likely to contain a large proportion of data points from the group that will be the bottleneck.

Our algorithm can also be applied to the setting where data scientists are collecting data from several sources, such as surveying different populations. It can help reduce data collection cost while ensuring that the collected data is representative in a manner similar to quota sampling in statistics. 
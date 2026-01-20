---
title: "Single Exposure Fusion"
image: "/assets/research/sef.png"
alt: The pipeline. An SDR image is made brighter and darker, then denoising is applied. The resultant three images are combined with Mertens' fusion.
collaborators: 
 - Yuhao Zhu
date: 2021-12-15
tags:
 - research
links:
 - 
     name: code
     url: "https://github.com/jiwonac/singleexposurefusion"
     image: "/assets/icons/github.png"
 - 
     name: report
     url: "/assets/docs/sef.pdf"
     image: "/assets/icons/pdf.png"
blurb: "Extend the perceptual dynamic range of a single photograph using classic denoising and exposure fusion, no machine learning required."
---

## Abstract

Photographers can extend the perceptual dynamic range of a photograph by utilizing the exposure fusion method, in which multiple photographs taken at different exposures are combined. However, this technique is susceptible to blur if the camera or subject moves.

I developed an alternate SDR to HDR pipeline which only requires one medium-exposure SDR photograph and will not be blurred due to camera or subject's movement. Unlike existing alternatives, single exposure fusion is a simple combination of classic denoising and exposure fusion algorithms that does not require machine learning.

## Laymen's Abstract

A photograph is said to have "high perceptual dynamic range" if you can see the details clearly for both very bright and very dark parts of an image. Photographers want this property in their images. This goal hard to achieve due to fundamental limitations in cameras. Increasing exposure reveals details from dark parts, but over-exposes bright parts that become washed. On the other hand, decreasing exposure reveals details from light parts, but under-exposes dark parts that become pitch black.

Photographers can take images taken of the same shot with different exposures, then combine them using an image processing algorithm to achieve high perceptual dynamic range. This technique is called exposure fusion. However, in order for exposure fusion to work well, the scene needs to be completely static between different shots. As such, it would be ideal if photographers could take just one photo, then apply a filter onto it to make it appear to be high dynamic range.

The best method for making a single image to be high perceptual dynamic range is by training a machine learning model. However, existing models do not perform well for all types of subjects, and requires a lot of money to collect data and train the model.

In this project, I explored an alternative technique. I first apply basic filters to the image to make a really bright copy, and a really dark copy. Then, I apply a traditional exposure fusion algorithm to mimic the effect of real exposure fusion from a single image. (Hence, single exposure fusion.) There is one downside though: cranking up the brightness of an image makes it very noisy. To combat this problem, I use denoising algorithms to reduce the noise from the brightened up image.

The result of single exposure fusion is, of course, not as good as real exposure fusion nor machine learning. The upside is that it can be applied to fast-moving subjects, and that it is much cheaper than model training. 
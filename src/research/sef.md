---
title: "Single Exposure Fusion"
image: "/assets/research/sef.png"
alt: The pipeline. An SDR image is made brighter and darker, then denoising is applied. The resultant three images are combined with Mertens' fusion. 
collaborators: 
 - Yuhao Zhu
date: 2021-12-15
date_str: "2022"
tags:
 - research
 - featured
links:
 - 
     name: code
     url: "https://github.com/jiwonac/singleexposurefusion"
     image: "/assets/icons/github.png"
 - 
     name: report
     url: "/assets/Single_Exposure_Fusion.pdf"
     image: "/assets/icons/pdf.png"
permalink: false
---

Photographers can extend the perceptual dynamic range of a photograph by utilizing the exposure fusion method, in which multiple photographs taken at different exposures are combined. However, this technique is susceptible to blur if the camera or subject moves.

I developed an alternate SDR to HDR pipeline which only requires one medium-exposure SDR photograph and will not be blurred due to camera or subject's movement. Unlike existing alternatives, single exposure fusion is a simple combination of classic denoising and exposure fusion algorithms that does not require machine learning.
---
title: "CoolerSpace: A Language for Physically Correct and Computationally Efficient Color Programming"
collaborators: 
 - Ethan Chen
 - Yuhao Zhu
date: 2024-08-01
tags:
 - research
links:
 -
     name: Paper
     url: 'https://dl.acm.org/doi/pdf/10.1145/3689741'
     image: '/assets/icons/pdf.png'
 -
     name: Paper
     url: 'https://arxiv.org/abs/2409.02771'
     image: '/assets/icons/arxiv.png'
blurb: ""
---

## Abstract

Color programmers manipulate lights, materials, and the resulting colors from light-material interactions. Existing libraries for color programming provide only a thin layer of abstraction around matrix operations. Color programs are, thus, vulnerable to bugs arising from mathematically permissible but physically meaningless matrix computations. Correct implementations are difficult to write and optimize. We introduce CoolerSpace to facilitate physically correct and computationally efficient color programming. CoolerSpace raises the level of abstraction of color programming by allowing programmers to focus on describing the logic of color physics. Correctness and efficiency are handled by CoolerSpace. The type system in CoolerSpace assigns physical meaning and dimensions to user-defined objects. The typing rules permit only legal computations informed by color physics and perception. Along with type checking, CoolerSpace also generates performance-optimized programs using equality saturation. CoolerSpace is implemented as a Python library and compiles to ONNX, a common intermediate representation for tensor computations. CoolerSpace not only prevents common errors in color programming, but also does so without run-time overhead: even unoptimized CoolerSpace programs out-perform existing Python-based color programming systems by up to 5.7 times; our optimizations provide up to an additional 1.4 times speed-up.

## Laymen's Abstract

The physical concepts of light, color, chroma, and pigments are intuitive in daily life but challenging to model. Each of these concepts can be encoded in numerous ways, resulting in a variety of color spaces, such as sRGB variants, LMS, XYZ, CIELAB, and CIELUV, among others.

Color scientists often develop code to manipulate these concepts and their encodings, but this process is prone to programming errors. The main limitation of existing programming models is their tendency to treat all physical concepts and encodings as interchangeable vectors and matrices, which increases the likelihood of mistakes.

To address this issue, we propose a Python-based metaprogramming language that encapsulates different physical concepts and encodings as types, enabling static checks to ensure program correctness. Our type system is translationally sound: it guarantees the correctness of translations but cannot fully ensure correctness in the target language.

Color spaces are typically defined in relation to existing spaces, which we model as a directed graph of valid type castings. We then use this graph during type checking to validate operations.

To further enhance performance, we optimize the compiled programs. Our optimization uses equality saturation, a technique that has been proven for optimizing machine learning (ML) models. The fundamental similarity between ML model inference and color programming—both relying heavily on vectors and matrices—allows us to build on recent advances in ML optimization.
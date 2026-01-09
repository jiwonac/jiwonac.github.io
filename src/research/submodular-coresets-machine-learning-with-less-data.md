---
title: 'Submodular coresets: Machine learning with less data'
collaborators: []
date: 2025-02-28
date_str: Feb 28, 2025
tags:
  - research
blurb: ''
links: []
---
Training machine learning models is expensive for a variety of reasons. Data movement costs immense time and power and backpropagation is computationally intensive. Furthermore, both model and dataset sizes are growing exponentially.

![](/assets/scaling.png)

Let's focus on the very last bottleneck: the growing size of datasets. Bigger datasets improve the model performance, but we don't always want to pay high costs. Such scenarios include hyperparameter tuning, ad-hoc model training, and model training on a budget. Wouldn't it be nice if there was a free way to save model training costs—GPU time, monetary costs, etc.—while maintaining competitive model performance? One potential solution is _coresets for machine learning, _which aims to remove redundant or uninformative data.

### What is a coreset?

The term originates from computational geometry. Let \(S\) be a set of points. Let \(f\) be a function that assigns a value to \(S\). Then, a coreset \(C\) is a subset of \(S\) such that \(f(C)\) is nearly the same as \(f(S)\), allowing for some constant wiggle room.[1](#footnote-1) Essentially, finding a coreset is about finding a small subset that retains the most important information to the function \(f\).

![](/assets/coreset.png)

<small>Left: A set of points and the smallest ball that contains them. Right: A coreset consisting of two points that preserve the radius of the smallest containing ball.</small>

In machine learning, we say that (S) is the collection of training data. (f) is the gradient of a model's weights computed on the data. Our goal is to find a small subset of training data that represents the entire dataset well such that its gradient is nearly the same as that of the whole dataset. Then, we can be assured that the model's weights will converge to nearly the same point as if we used the whole dataset.

![](/assets/Screenshot_20250228_134424_Concepts.png)

### The CRAIG algorithm

The most notable coreset construction algorithm for machine learning is CRAIG, proposed by a UCLA team in 2020.[2](#footnote-2) Researchers have since iterated on, and improved, the general formula for CRAIG.[3](#footenote-3)

To construct a coreset using CRAIG, we first train the model on the entire dataset for a few epochs. Then, we apply backpropagation on each data point for the final layer only. These operations are relatively cheap compared to training the model to convergence on full data and give us a good _sketch_ of each data point's gradient.

(A fact that is used implicitly here is that the gradients of the final layer of a neural network capture most of the information of the full gradient.)

Great—we now have the gradients of each data point. The total gradient, after one epoch, will be the Euclidean mean of all of these gradients. CRAIG summarizes the information in the total gradient with a small subset by finding the \(k\)-medoids of the data points' gradients.

The term \(k\)-medoids requires a definition for the unacquainted. Suppose \(S\) is a set of points that live in Euclidean space. (e.g. the set of gradients of a dataset.) \(C\) is a subset of \(S\) with \(k\) data points, which minimizes the total Euclidean distance between each point in \(S\) and its closest exemplar in \(C\). Formally,

\[C = \underset{C \subseteq S,\, |C| \le k}{\text{argmin}} \sum_{s \in S} \underset{c \in C}{\text{min}}\; \text{distance}(s, c). \]

One way to conceptualize medoids is to try to solve the \(k\)-means clustering problem with the additional constraint that cluster centroids must be elements of \(S\), rather than being any point in the space.

Next, we weigh the medoids by the number of points in the dataset that are closest to each medoid. This ensures that a medoid that represents many data points is weighted highly for model training.

![](/assets/craig-1.png)

<small>Black dots represent data points. Blue dots represent examplars in the coreset. The numbers are weights assigned to each exemplar.</small>

The authors of the CRAIG paper proved that weighted (k)-medoids minimize the difference between the gradient of the whole dataset and the coreset. Furthermore, they presented empirical evidence that coresets selected from the CRAIG algorithm perform nearly as well as models trained on the whole dataset.

![](/assets/image.png)

<small>Authors empirically demonstrated that CRAIG out-performs random subsets.</small>

### Submodularity

None of this matters if \(k\)-medoids of some set of points are more computationally expensive than training the model on the whole data. Thankfully, due to recent progress in the theory of _submodular maximization_, we can find the coreset in just \(O(n \log n)\) time.

On a high level, submodularity means that the marginal gains of adding an element to the coreset have a diminishing returns property. Increasing the size of the coreset initially gives us a lot of information about the gradient, but tapers off as we approach the whole dataset.

Formally, let \(U\) be a universe of all possible elements, and let \(f: 2^U \to \mathbb{R}\) be a function that assigns a value to a subset of \(U\). Then, \(f\) is _submodular_ iff

\[f(S \cup \{x\}) - f(S) \ge f(T \cup \{x\}) - f(T) \qquad \forall S \subseteq T \subset U, \; x \in U \setminus T.\]

That is, adding the same element \(x\) to a small set \(S\) incurs greater benefits than adding it to a larger set \(T\).

Thanks to this diminishing returns property, myopically adding the best element, one at a time, can never be too suboptimal. As such, a simple greedy algorithm, which starts with an empty coreset and adds the candidate that seems most promising at the time until we hit the cap \(k\), is at least 63% (i.e. \(1-1/e\)) as good as the best possible coreset of the same size—while taking much less time than exhaustive enumeration.[4](#footnote-4)

Submodularity is a surprisingly powerful structural property, which allows for all sorts of good approximation under various assumptions. As such, there has been a flurry of interest in submodular optimization in the machine learning community. For example, if we allow random samples, we can reduce the time complexity of the CRAIG algorithm from \(O(k n ^ 2)\) to \(O(n ^ 2)\) time. If we allow for some further wiggle room in our approximation, the algorithm runs in \(O(n \log n)\) time.[5](#footnote-5)

### Concluding Remarks

Submodular set functions formalize a notion of diminishing returns property for selecting a subset of elements from some large collection. It appears everywhere if you care to look, from classical computer science problems to recent research on machine learning and data management. Once you show that a problem reduces to submodular function maximization, you know that it is efficiently solvable. It is a tool that is worth having in your problem-solving toolbox. 

### Footnotes & References

<small><ol>

  <li><a name="footnote-1"></a>Formally, let \(S \subset \mathbb{R} ^ d\) be some set of points in Euclidean space. Let \(f: \mathbb{R} ^ d \to \mathbb{R}\). Then some subset \(C \subseteq S\) is an \(\varepsilon\)-coreset of \(S\) w.r.t. \(f\) if \((1 - \varepsilon) f(S) \le f(C) \le (1 + \varepsilon) f(S)\).</li>

  <li><a name="footnote-2"></a>CRAIG was first proposed in <b>Coresets for Data-efficient Training of Machine Learning Models</b> (PMLR 2020) by Mirzasoleiman et al. <a href="https://proceedings.mlr.press/v119/mirzasoleiman20a.html">[paper]</a></li>

  <li><a name="footnote-3"></a>For example, Mirzasoleiman's team developed a coreset algorithm for deep learning in <b>Towards Sustainable Learning: Coresets for Data-efficient Deep Learning</b> (PMLR 2023). CRAIG was usable on deep learning, but was not well-tailored for deep learning's volatile and nonconvex loss landscape.</li>

  <li><a name="footnote-4"></a>Formally, if \(f\) is normalized, monotone, and submodular, then the greedy algorithm achieves \((1-1/e)\)-approximation of the optimal. Furthermore, unless \(P = NP\), there is no PTIME algorithm that achieves a better approximation factor. See <b>An analysis of approximations for maximizing submodular set functions</b> (Mathematical Programming 1978) by Nemhauser and Wolsey.</li>

  <li><a name="footnote-5"></a>The greedy algorithm takes \(O(n ^ 3)\) time because for \(k\) iterations, we enumerate up to \(n\) candidates, and evaluate their marginal gains. The marginal gains function takes \(O(n)\) time. Stochastic greedy algorithm reduces the total number of function calls to just \(O(n\). We can also approximate the function by taking a \(\Theta (n)\) number of samples.</li>

</ol></small>

---
title: "Understanding the LazyLazy Algorithm for Submodular Maximization"
tags: blog
date: 2023-07-10
date_str: "Jul 10, 2023"
blurb: ""
---

### Motivation

Submodularity is the discrete analog of concavity and models diminishing returns. Intuitively, it means that adding an item to a collection early is more beneficial than adding it later. 

Formally, let $V$ be a universe of of items and let $2^V$ be its powerset. The function $f: 2^V \to \mathbb{R}$ is submodular iff
$$f(S \cup \{v\}) - f(S) \ge f(T \cup \{v\}) - f(T)$$
for all $S \subseteq T \subseteq \Omega$ and $v \in V \setminus T$. This is equivalent to
$$f(S) + f(T) \ge f(S \cup T) + f(S \cap T)$$
for all $S, T \subseteq V$. 

Submodular maximization is an incredibly useful model for many problems in real life, where we must select a subset of available items that exhibit diminishing returns. For instance, the problem of grocery shopping under a budget to maximize enjoyment could be modelled as submodular optimization under a knapsack constraint. This is because adding apples to the grocery haul is less beneficial when our bag is already full of similar items like pears. 

A remarkable array of computer science problems can be reduced to submodular maximization. The following are but a subset of problems that can be modelled as such. 

1. Facility location problem
2. Set (multi-)cover problem
3. Vertex cover and tuple domination problem
4. k-medoids clustering
5. Robust sensor placement
6. Feature selection
7. Active learning

Like all of these problems, submodular maximization is NP-Complete, and thus admits no exact polynomial time algorithm unless $P=NP$ or some moral equivalent. 

Fortunately, submodular maximization under cardinality constraint can be approximated by a constant factor of $1 - 1/e$ with $O(nk)$ query complexity by a greedy algorithm, where $n = |V|$ and $k$ is the cardinality constraint. Query complexity stands for the number of times the function $f(S)$ must be evaluated. 

Unfortunately, with a never-ending appetite for big data, $O(nk)$ time complexity leaves much to be desired, and a linear $O(n)$ query complexity would be ideal. In fact, it is impossible to guarantee more than $1 - 1/e - \epsilon$ approximation factor in expectation with less than $O(n)$ query complexity. 

The holy grail of $O(n)$ query complexity, $1 - 1/e - \epsilon$ approximation was achieved by Mirzasoleiman et al. in their 2015 paper "Lazier than Lazy Greedy." They called this algorithm `StochasticGreedy`, though I personally prefer the colloquial name `LazyLazy`. 

Suppose $A$ is the collection that we have so far. In each iteration, `LazyLazy` samples $s = (n/k)\log (1 / \epsilon)$ candidate items from $V \setminus A$ uniformly randomly with replacement to obtain a candidate set $R$. They then choose the item in $R$ which greedily maximizes marginal gains, denoted $\Delta(a | A)$. This item $a_i$ is added to $A$. This process is repeated $k$ times. 

### Theory

Theoretical analysis behind the `LazyLazy` is nontrivial and at times unintuitive. In this post, I will try my best to explain the analysis as simply as possible. 

*Proof sketch.* The main gist of the proof is that adding a random element from $A^\*$ to $A$ is optimal. Why is that? Suppose we have an optimal algorithm. It doesn't matter what order it collects $A^\*$ so as long as it ends up with $A^*$ after $k$ iterations. This is because the set function $f(A^\*)$ only cares about what $A^\*$ is and not how it was obtained. 

Thus, an algorithm which adds a random point from $A^* \setminus A$ to $A$ in each iteration is optimal. This magic algorithm does not exist. However, if an algorithm exists where it adds a random point from $A^* \setminus A$ to $A$ with high probability then it could have a good approximation factor. Furthermore, if it adds *any* point in each iteration with at least that much marginal gain, then the same approximation factor holds. 

**Lemma.** Given a current solution $A$, the expected gain of `LazyLazy` in one step is at least $\frac{1 - \epsilon}{k} \sum_{a \in A^* \setminus A} \Delta(a | A)$. 

*Proof.* We first bound the probability that $R \cap (A^\* \setminus A) \neq \emptyset$. 

Since $R$ consists of $s = \frac{n}{k}\log \frac{1}{\epsilon}$ random samples from $A \setminus A$, 

$$
\begin{align*}
    Pr[R \cap (A^\* \setminus A) = \emptyset] 
    &= \left(1 - Pr[\text{one sample is in } A^\* \setminus A]\right)^s\\\\
    &= \left( 1 - \frac{|A^\* \setminus A|}{|V \setminus A|} \right)^s\\
\end{align*}
$$

Here, we take a detour and prove an inequality closely related to the Bernoulli's inequality: $(1 - t)^s \le e^{-st}$ for $s, t > 0$. 

Our starting point is $1 - t \le e^{-t}$ for $t \ge 0$. This can be shown via differentiation or more informally by graphing. 

![](/assets/blog/1-t_le_e-t.png)

$$
\begin{align*}
    1 - t &\le e^{-t}\\\\
    \ln(1 - t) &\le \ln(e^{-t}) &\text{by taking log}\\\\
    \ln(1 - t) &\le -t\\\\
    s\ln(1 - t) &\le -st &\text{since } s > 0\\\\
    \ln(1-t)^s &\le \ln(e^{-st}) &\text{by log definition}\\\\
    \therefore (1-t)^s &\le e^{-st} &\text{by taking exponent}
\end{align*}
$$

Since $\frac{A^\* \setminus A}{V \setminus A} \ge 0$, and clearly $s > 0$, so we can apply our result to simplify the inequality. 

$$
\begin{align*}
    Pr[R \cap (A^\* \setminus A) = \emptyset] &\le \left(1 - \frac{|A^\* \setminus A|}{|V \setminus A|}\right)^s\\\\
    &\le e^{-s\frac{|A^\* \setminus A|}{|V \setminus A|}} &\text{by inequality above}\\\\
    &\le e^{-\frac{s}{n}|A^\* \setminus A|} &\text{since } \frac{|V \setminus A|}{n} \le 1\\\\
\end{align*}
$$

Since we're interested in the probability that $R$ and $A\^* \setminus A$ does *not* overlap, inverse the inequality. 

$$
\begin{align*}
    Pr[R \cap (A\^* \setminus A) \neq \emptyset] &\ge 1 - e^{-\frac{s}{n}|A^\* \setminus A|}\\\\
    &\ge \frac{|A^\* \setminus A|}{k} - e^{-\frac{s}{n}|A^\* \setminus A|} &\text{since } \frac{|A\^* \setminus A|}{k} \le 1\\\\
    &\ge \frac{|A^\* \setminus A|}{k} - e^{-\frac{sk}{n}\frac{|A^\* \setminus A|}{k}}\\\\
\end{align*}
$$

Here, we make use of the fact that $xe^{-\frac{sk}{n}} \le e^{-\frac{sk}{n}x}$ for $x \le 1$. This is because $xe^{-\frac{sk}{n}}$ is monotonically increasing and $e^{-\frac{sk}{n}x}$ is monotonically decreasing with an intersection when $x = 1$. Since $\frac{|A^\* \setminus A|}{k} \le 1$, 

$$
\begin{align*}
    Pr[R \cap (A^\* \setminus A) \neq \emptyset] &\ge \frac{|A^\* \setminus A|}{k} - \frac{|A^\* \setminus A|}{k}e^{-\frac{sk}{n}}\\\\
    &= \frac{|A^\* \setminus A|}{k}\left(1 - e^{-\frac{s}{n}}\right).
\end{align*}
$$

Now substitute $s = \frac{n}{k}\log \frac{1}{\epsilon}$, then
$$Pr[R \cap (A^\* \setminus A) \neq \emptyset] \ge (1 - \epsilon)\frac{|A\^* \setminus A|}{k}.$$

If $R$ and $A^\* \setminus A$ overlap, then the greedy element in $R$ must be at least as good as a random element from $R \cap (A^\* \setminus A)$. This is trivially true, since the greedy element in $R$ is at least as good a *any* element in $R$. 

Now consider $\mathbb{E}[\Delta(a|A)]$, the marginal gain in this iteration. In the worst case, any element in $R \setminus (A^\* \setminus A)$ may have zero marginal gain. 

$$\mathbb{E}[\Delta(a|A)] \ge Pr[R \cap (A^\*\setminus A) \neq \emptyset] \times \frac{1}{|A^\* \setminus A|}\sum_{a \in A^\*\setminus A}\Delta(a|A)$$

Here, $\frac{1}{|A^\* \setminus A|}\sum_{a \in A^\*\setminus A}\Delta(a|A)$ is the expected gain from a random element in $A^\* \setminus A$. 

By substitution of probability, 

$$
\begin{align*}
\mathbb{E}[\Delta(a|A)] &\ge (1 - \epsilon)\frac{|A\^* \setminus A|}{k} \times \frac{1}{|A^\* \setminus A|}\sum_{a \in A^\*\setminus A}\Delta(a|A)\\\\
&= \frac{1 - \epsilon}{k}\sum_{a \in A^\* \setminus A} \Delta(a|A).
\end{align*}
$$

An equivalent definition of submodularity states that
$$\sum_{v \in T \setminus S} \Delta(v|S) \ge f(T) - f(S)$$
which follows from an inductive application of the marginal gains definition. Thus, 

$$\mathbb{E}[\Delta(a|A)] \ge \frac{1 - \epsilon}{k}(f(A^\*) - f(A)),$$
$$\mathbb{E}[f(A_{i+1}) - f(A_i)] \ge \frac{1 - \epsilon}{k}\mathbb{E}[f(A^\*) - f(A_i)].$$

At the beginning, $f(A_0) = f(\emptyset) = 0$. In each iteration, the remaining difference between $f(A)$ and $f(A^\*)$ is reduced by at least a $\frac{1 - \epsilon}{k}$ fraction in expectation. Thus, after $k$ iterations, 
$$
\begin{align*}
\mathbb{E}[f(A_k)] &\ge f(A^\*) \sum_{i=1}^k \left(\frac{1 - \epsilon}{k}\right)^i\\\\
&= f(A^\*) \left(\frac{1 - \left(\frac{1 - \epsilon}{k}\right)^k}{1 - \frac{1 - \epsilon}{k}}\right)\\\\
&= f(A^\*)
\end{align*}
$$
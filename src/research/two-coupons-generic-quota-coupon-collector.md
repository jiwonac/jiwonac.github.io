---
title: The Two Coupons, Generic Quota Coupon Collector's Problem
collaborators: []
date: 2023-07-07
tags:
  - research
blurb: Suppose there are two distinct coupons. In each iteration, the probability of sampling type-1 coupon is $p$ and that for type-2 coupon is $q = 1 - p$. Our goal is to collect at least $k$ of type-1 and $r$ of type-2. How many iterations does it take, in expectation, to complete a full collection?
links: []
---
### Coupon Collector's Problem

The classic coupon collector's problem asks:

> There are $n$ distinct coupons, and we wish to collect each coupon at least once. We may draw a random coupon uniformly in each iteration. How many iteration does it take, in expectation, to complete a full collection?

The problem attracted significant attention over the years, since many stochastic situations can be modelled as the coupon collector's problem or one of its variants.

It is now well-known that $\mathbb{E}[T] = n \cdot H_n \approx n\log n$ where $T$ is the time steps required to complete the collection, and $H_n$ is the $n$<sup>th</sup> [harmonic number](https://en.wikipedia.org/wiki/Harmonic_number).

### The Two Coupons, Generic Quota Coupon Collector's Problem

Recently, I took interest in one of many generalized versions of the coupon collector's problem, which is as stated below.

> Suppose there are two distinct coupons. In each iteration, the probability of sampling type-1 coupon is $p$ and that for type-2 coupon is $q = 1 - p$. Our goal is to collect at least $k$ of type-1 and $r$ of type-2. How many iterations does it take, in expectation, to complete a full collection?

Brown and Ross<sup>[1]</sup> addressed this and related problems in 2015. Let $N_{k,r}$ be the time it takes to complete our collection. The summary of their result is
$$\mathbb{E}[N_{k,r}] = \frac{k}{q} + \sum_{j=0}^{k-1}\frac{r-j}{p}{k + j - 1 \choose j}p^rq^j,$$
a relatively nice analytical equation.

Brown and Ross, being mathematicians, thought this problem trivial and did not show the steps required to achieve this expression. Since I am a mathematical dunce compared to them, I would have liked a detailed explanation! Such explanation doesn't seem to exist. So in this post I'll explain every step to replicate their result.

### Derivation

We split all possible outcomes into a series of infinite disjoint events. Event $\mathcal{E}_j$ is the event in which $j$ copies of type-2 coupon is found by the time $k$ type-1 coupons are found. Clearly, all possible outomes fall into event $\mathcal{E}_j$ for some $j \ge 0$. Thus,

$$\mathbb{E}[N_{k,r}] = \sum_{j=0}^{\infty} (\text{expected cost given } \mathcal{E}_j) \cdot \mathbb{P}[\mathcal{E}_j].$$

#### Part I

Let's find expressions for the two terms. The left term is easy. If we collected $k$ type-1 coupons and $j$ type-2 coupons, we only have to collect $\mathrm{max}(0, r - j)$ more type-2 coupons. This remaining task takes $\mathrm{max}(0, r - j)/q$ iterations in expectation. As such, total expected cost given $\mathcal{E}_j$ is $k + j + \mathrm{max}(0, r - j)/q$.

The right term is trickier. So far, we have collected $k$ type-1 coupons and $j$ type-2 coupons in $k + j$ iterations. Of all iterations, the last iteration is fixed: it must always be type-1. (Otherwise, we would not be in event $\mathcal{E}_j$.) All other iterations could have been either a type-1 coupon or a type-2 coupon, with corresponding probabilities. This situation is essentially a binomial trial, where there are $k + j - 1$ total iterations and a success probability $q$. And the probability that we're looking for is $\mathbb{P}[Bin(k + j - 1, q) = j]$ times $p$ since the last iteration had to be type-1.

Combining the two terms, we get

$$\mathbb{E}[N_{k,r}] = \sum_{j=0}^{\infty} \left(k + j + \frac{\mathrm{max}(0, r - j)}{q}\right) \cdot \mathbb{P}[Bin(k + j - 1, q) = j] \cdot p.$$

Substitute the binomial equation: $\mathbb{P}[Bin(n, p) = k] = {n \choose k} p^k q^{n - k}$.

$$\mathbb{E}[N_{k,r}] = \sum_{j=0}^{\infty} \left(k + j + \frac{\mathrm{max}(0, r - j)}{q}\right) \cdot {k + j - 1 \choose  j} p^k q^j.$$

Split the left term into two.

$$\mathbb{E}[N_{k,r}] = \sum_{j=0}^{\infty} (k + j) {k + j - 1 \choose  j} p^k q^j + \sum_{j=0}^{\infty} \left(\frac{\mathrm{max}(0, r - j)}{q}\right) {k + j - 1 \choose  j} p^k q^j$$

The left term represents the expected number of iterations required to collect $k$ copies of type-1 coupon. The right term represents the expected number of iterations required to collect the remaining type-1 coupons.

#### Part II

An easy way to simplify the left term is to assert that the expected number of iterations required to collect $k$ copies of type-1 coupons is clearly $k / p$. Let us, however, derive it from scratch.

Let us simplify the left term $\sum_{j=0}^{\infty} (k + j) {k + j - 1 \choose  j} p^k q^j$ first. Since ${n \choose k} = n!/k!(n-k)!$, we have

$${k + j - 1 \choose j} = \frac{(k + j - 1)!}{j! (k - 1)!}, \quad {k + j \choose j} = \frac{(k + j)!}{j!k!}.$$

Thus, $(k + j) {k + j - 1 \choose j} = k {k + j \choose j}$, and the term simplifies to $k\sum_{j=0}^{\infty}{k + j \choose j} p^k q^j$. As explained in [2], $\sum_{j=0}^{\infty}{k + j \choose j} p^k q^j = 1/p$. Thus, the left term is $k/p$.

#### Part III

The ugliest part of the right term is the $\mathrm{max}$ operator. Notice that when $j \ge r$, the entire right term becomes zero. Thus, we can get rid of the $\mathrm{max}$ operator by summing from $j = 0$ to $r - 1$ instead of all the way to $\infty$. Thus, the right term is simplified as
$$\sum_{j=0}^{r - 1} \left(\frac{r-j}{q}\right) {k + j - 1 \choose  j} p^k q^j.$$

Bringing both Part II and part III together, we obtain

$$\mathbb{E}[N_{k,r}] = \frac{k}{p} + \sum_{j=0}^{r - 1} \left(\frac{r-j}{q}\right) {k + j - 1 \choose  j} p^k q^j.$$

By symmetry,

$$\mathbb{E}[N_{k,r}] = \frac{r}{p} + \sum_{j=0}^{k - 1} \left(\frac{k-j}{q}\right) {r + j - 1 \choose  j} p^j q^r.$$

<!--#### Part IV

One nagging question remains: How do we show that $\sum_{j=0}^{\infty}{k + j \choose j} p^k q^j = 1/p$? I'll follow the arguments of [2] with more explanation. First, we sum from $n = j$ to $\infty$ instead of $j = 0$ to $\infty$, to follow [2]'s argument.

$$X = \sum_{j=0}^{\infty}{k + j \choose j} p^k q^j = \sum_{n = j}^{\infty} {n \choose j} p^j q^{n-j}$$

A property of ${n \choose k}$ is that ${n \choose k} = n!/k!(n-k)! = {n \choose n - k}$. Also notice that $p, j$ are constants, so $p^j$ is as well. Thus, $X = p^j \sum_{n = j}^{\infty} {n \choose n - j} q^{n-j}$.

At this point, we need a new technique to simplify $n \choose n - j$: generalization of $n \choose k$ s.t. $n$ can be negative. The definition that everyone uses for ${-n \choose k}$ is
$$
\begin{align\*}
    {-n \choose k} &= \frac{-n \cdot (-n - 1) \cdot (-n - 2) \cdots (-n - (k - 2))\cdot (-n - (k - 1))}{k!}\
    &= (-1)^k \frac{n \cdot (n + 1) \cdot (n + 2) \ldots (n + (k - 2)) \cdot (n + (k - 1))}{k!}\
    &= (-1)^k \frac{(n + k - 1)!}{k! (n - 1)!}\
    &= (-1)^k {n + k - 1 \choose k}.
\end{align\*}
$$

As a direct consequence, ${-j - 1 \choose n - j} = {-(j + 1) \choose n - j} = (-1)^{n-j} {n \choose n - j}$. Conversely, ${n \choose n - j} = (-1)^{n - j} {- j - 1 \choose n - j}$. Thus, by substitution,

$$X = p^j \sum_{n=j}^{\infty} {-j-1 \choose n -j} (-1)^{n-j} q^{n-j}.$$

We see that $n - j$ is a repeated term. For simplification, substitute $n - j = l$.

$$X = p^j \sum_{l=0}^{\infty}{-j - 1 \choose l} (-1)^l q^l = p^j \sum_{l=0}^{\infty} {-j - 1 \choose l} (-q)^l$$
$$X = p^j \sum_{l = 0}^{\infty} (-1)^l {j + l \choose l} (-q)^l = p^j \sum_{l = 0}^{\infty} {j + l \choose l} q^l$$-->

### Conclusion

When mathematicians go from one equation to another, they are skipping entire pages worth of derivation. Darn it, mathematicians!

<hr>

[1] Mark Brown and Sheldon M. Ross. 2016. Optimality Results for Coupon Collection. Journal of Applied Probability 53, 3 (September 2016), 930–937. DOI:https://doi.org/10.1017/jpr.2016.51

[[2] Felix Marin. Infinite binomial sum. Mathematics Stack Exchange. Retrieved from https://math.stackexchange.com/a/3106913/1102894](https://math.stackexchange.com/a/3106913/1102894).

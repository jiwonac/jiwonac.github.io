---
title: Surprising $O(n)$ Algorithms, Golang and More | What I Learned
tags: blog
date: 2023-03-05
date_str: "Mar 05, 2023"
blurb: ""
---

I'm starting a new semi-weekly post series, in which I go over what I recently learned. The post series is to serve as a little public accountability for getting on with material which I always mean to study, yet rarely find the time to work through. 

This semester, I'm learning things related to my job as a research assistant. Furthermore, I'm investing some time into fundamental math and theoretical computer science topics I didn't get to study in undergrad. I am revisiting [linear algebra](https://matematicas.unex.es/~navarro/algebralineal/lax.pdf), this time from a proof-based maths approach rather than an engineering approach, with additional content such as duality. I am also making effort to study algorithms in the book [Geometric Approximation Algorithms](https://bookstore.ams.org/view?ProductCode=SURV/173). 

****

The past weeks, I learned:

### **The [Go](https://go.dev/) Programming Language**

Go is an interesting language. It is lower-level than other scripting languages like of Python, with binary compilation, static type checking, C-style syntax, and pointers. At the same time, it also builds in the slice data structure, which is somwhere between an array and a list in terms of abstraction. Slices and arrays are reference types, which is certainly easier to use than C's philosophy that an array is simply a syntactic sugar for pointers. 

The key strength of go is that concurrenct programming is treated as a first-class citizen, which is not as easy to write in other compiled C-style languages like C++ or Rust. In go's concurrency model, a function prepended with the `go` keyword becomes a goroutine, which is a function that becomes its own process during runtime, and is run in parallel if possible. Goroutines (i.e. processes) communicate with each other by using a shared channel, which is essentially a concurrent FIFO queue. I quite like go's concurrent programming model; it's substantially more intuitive than Java's. 

### **MongoDB**

While I conceptually understand the difference between relational and NoSQL databases, I have not used databases extensively for work barring some SQLite. In the past weeks, I learned to use Mongo, a popular key-value database format, with a Javascript-based scripting frontend and a convenient Go API. I became familiar with cursors and the notion of batching for optimizing database accesses using locality. 

### **Quotient Space**
I never quite understood what a quotient space is when I took linear algebra in undergrad. The following explanation makes things clearer for me. 

We can add two vector spaces as $X + Y$ by taking vectors $z$ of form $z = x + y$ where $x \in X$ and $y \in Y$. Can we also "divide" vector spaces? 

Consider $X = \mathbb{R}^3$ and $Y = \\{(x, y, 0) \mid y, z \in \mathbb{R}\\}$. That is, $X$ is the 3D space and its subspace $Y$ is the plane defined by $z = 0$. We say that two vectors $a, b \in \mathbb{R}^3$ are *congruent* w.r.t. $Y$ if $a - b \in Y$. In our example, this means that $a$ and $b$ have the same $z$-value. Thus, any two vectors which are congruent w.r.t. $Y$ lies in the same horizontal plane. A set of all points which are congruent to each other will form the entire horizontal plane. 

<img src="/assets/blog/zyx.png"></img>
<small>The 3D space and congruent planes.</small>

Now, let us consider the space of all such congruence classes. In our example, this is the set of all horizontal planes in 3D. Each element (a plane) in this space (set of horizontal planes) can be uniquely defined by a single number, which defines the $z$-intercept. 

Furthermore, each element can be considered a vector, and the entire space as its own vector space. For instance, adding two horizontal planes in 3D amounts to adding the two planes' $z$-intercepts $z_1 + z_2$, and similarly for scalar multiplication. This shows us that a quotient space is sort of like a subspace where we "throw away" some dimensions of information from $X$. 

Depending on how many dimensions of information we throw away from $X$, we end up with a vector space of planes, a vector space of lines, or a vector space of points. 

This vector space is called the *quotient space* and is written as $X \setminus Y$. 

### **$O(n)$ algorithm for closest pair of points in $\mathbb{R}^2$**

Suppose there are $n$ points in $\mathbb{R}^2$. If we are only allowed to get the distance between two points, it takes $\Omega(n\log n)$ time to find the closest pair of points using divide-and-conquer. However, with some geometry, hashing and randomization, we can find the correct solution in expected $O(1)$ time. 

The algorithm is fairly simple in principle. We split the plane into a uniform grid, where the width and height of each cell is the shortest distance between any two points that we found so far. (The grid is implemented as a hash table of linked lists.) With a packing argument, we establish that there can be at most 4 points in each cell. Then, whenever we add a point to the grid, we check the cell it belong to and its 9 neighbors, which may contain points that are the shortest pair. There are at most 36 such points in total. We rebuild the grid if necessary, until we're done with all points. 

There are $n$ iterations in total, and each iteration takes $O(1)$ time without rebuilding the grid, but takes $O(i)$ time where $i$ is the iteration count, if the grid needs to be rebuilt. As such, the worst-case time complexity is $O(n^2)$. 

If we randomize the permuation of points, however, we are much more likely to rebuild the grid in the earlier iterations than in later iterations. It turns out that the probability of rebuilding the grid on the $i$<sup>th</sup> iteration is $O(2 / i)$, which means the expected time taken in each iteration is $O(1)$. Thus, in expectation, we have an exact $O(n)$ algorithm. 
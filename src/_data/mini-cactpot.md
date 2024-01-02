---
title: "An Algorithm for FFXIV's Mini Cactbot Minigame"
tags: blog
date: 2024-01-02
date_str: "Jan 2, 2024"
small_image: true
blurb: ""
draft: true
permalink: false
---
<article>
<p>A semester just ended, which gives us slaves graduate students a much needed break from the deluge of coursework and research obligations. So I was doing some routine grind in the critically acclaimed MMORPG Final Fantasy XIV. Being an online game, it of course allows you to gamble.<label class="sidenote-number"></label><span class="sidenote">Lorem ipsum dolar sit emit. Lorem ipsum dolar sit emit. Lorem ipsum dolar sit emit.</span></p>

The game in question is mini Cactbot. It is initialized by randomly placing numbers 1 to 9 on a 3x3 grid. The player’s goal is to choose a row, column, or diagonal, which gives a payout based on the sum of the chosen numbers. The twist is that only one number is revealed to start with, and the player can sequentially choose just three positions to reveal before making their choice. See the screenshots below for a demonstration. 

In the example above, I chose three arbitrary tiles to reveal 3, 5, and 4. According to the payout chart, a sum of 6 gives the largest payout of 10,000 currency. We also see that the rightmost column has the numbers 2 and 3 revealed, which means the largest payout is still possible. As such, I heuristically choose said column and get lucky: the hidden number in the chosen column is 1. Thus, I walk away with 10,000 coins. 

The aforementioned heuristic works decently well, especially since the game costs mere 10 in-game currency to play. After all, the minigame is just for fun. Over time, players can grow their wallet even with imperfect heuristics. 

The heuristic doesn’t satisfy the computer scientist side of my brain. What is the optimal strategy for Mini Cactpot? Furthermore, can we generalize the game to larger problem sizes (say, a 100x100 board) and still solve the problem quickly?

In the rest of this article I present an algorithm which combines Markov chain Monte Carlo (MCMC) with submodular optimization. This algorithm obtains a near-optimal solution almost surely within polynomial time. If you have no idea what these technical jargon means, then don’t worry, as I will do my best to explain. 

I’ve no doubt that others have already solved this problem in various different ways. I have not looked at anyone else’s solution so as not to ruin the puzzle for myself. If you can figure out any improvements, let me know down in the comments!

Breaking the Problem Down

Examining a game of Mini Cactpot, we see that there are actually two major challenges. 

Given limited information, how can we determine which row, column, or diagonal gives the highest payout?

How can we choose tiles to reveal so as to give us the most information that we can use to maximize payout?

The first is a matter of probability theory, whereas the second is a sequential decision-making problem. Before we get to solving each, let us precisely define the problem at hand for clarity. Here, we generalize the minigame to encompass arbitrary matrix sizes and 

Definition. The n-Cactpot Problem. Let M be a uniformly random n by n matrix containing the integers 1…n2 
</article>

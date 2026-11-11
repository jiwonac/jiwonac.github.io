---
title: A better way to do markdown todo lists
date: 2026-11-11
tags: blog
image: ''
alt: ''
blurb: ''
---

I've been a Markdown user since long before README.md, AI, MCP, OKP, etc., took over, but there's just one problem with the default syntax: todo lists suck!

Look at this:

```plain
- [ ] This is a task
- [x] This is a completed task
```

This is horrible! Typing `[` followed by a space followed by a `]` is three somewhat finger-twisting keystrokes to identify the simple concept that something is a task. 

Checking the task off is even worse: you have to move your cursor from where it is (probably at the rightmost edge of the sentence) ALL the way to the very left of the sentence, place it at the left of `]`, press backspace, then press `x`. 

My suggestion is to borrow an idea from Bullet Journal, the analog journaling system centered around the idea of rapid logging. 

Bujo uses the following bullet types, all designed to be fast to write on paper:

```plain
· Action (todo/task)
× Completed action
- Note
= Mood
⚬ Event
```

You can also decorate any bullet with a signifier to mark its importance:

```plain
·! Call mom
⚬! John's birthday party
```

It's simple to adopt these bullet types into markdown lists. Must simpler than the defaults of `[ ]` and `[x]`, in my opinion. With this format, every single bullet type is just one letter that decorates a standard markdown list. 

```plain
- . Send email to Mary
- x Call mom
- o! John's birthday party
```

You might notice that, instead of the pretty unicode symbols of × (multiplication symbol) and ⚬ (small circle), I am using the much simpler English alphabets x and o. 

The only downside for personal use is not looking very pretty. Nothing that can't be fixed with a CSS snippet, especially in an age where there are capable AI models to help you write bespoke scripts for personal use.

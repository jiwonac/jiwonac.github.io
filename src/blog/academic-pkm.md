---
title: "My Academic Knowledge Management Setup"
tags: blog
date: 2023-03-27
date_str: "Mar 27, 2023"
blurb: "The concept of a PKM isn't inherently life-saving nor terrible. It's just a tool that could be useful."
---

I've been following the personal knowledge management (PKM) space for a while now. The promises of a second brain that helps you make novel connections and organize the haphazard pile of primary, secondary and original text, is appealing to an academic like me. 

Yet, I had trouble finding a system that works for me. [Zettelkasten](https://zettelkasten.de/posts/overview/#the-introduction-to-the-zettelkasten-method) is too orthodox in its insistence of a flat hierarchy and atomic notes, as I don't really think like that. I don't have an incentive to cultivate a [digital garden](https://nesslabs.com/digital-garden-set-up). [Johnny Decimal](https://johnnydecimal.com/)? Too restrictive. [PARA](https://fortelabs.com/blog/para/) is better, though categorizing everything as either a project or an area doesn't mesh too well with my workflow. 

Ultimately, I decided to start from scratch and assess my needs. 
1. I need a way to organize scientific literature and literature notes. 
2. I want to be able to discover non-obvious connection between literature. 
3. I need a way to take notes on *subjects* for studying and for future reference. 
4. I need a way to take notes on *projects* that may cite multiple *literature notes* or *subject notes*. 

To summarize, there are three fundamental types of notes I take: literature, subject, and project notes. 

Since I need to manage hundreds of papers, I decided to use a reference manager, with my choice being goold 'ol free and open source [Zotero](https://zotero.org). For note-taking, I'm sticking with [Obsidian](https://obsidian.md), since I like that it uses raw markdown files for future-proofing. 

My whole workflow looks like this; it's nothing too special. I use the Zotero [browser plugin](https://www.zotero.org/download/) for literature collection, and Obsidian's [Citations](https://github.com/hans/obsidian-citation-plugin) plugin for seamless Zotero integration. 

![](/assets/blog/academic-pkm.png)

The following template for literature notes works well for me. The title of the literature notes are citekeys, but I can also quick switch via a paper's title using the alias field. I can also quickly switch to the item in Zotero by clicking on the Zotero URI. In the topics field, I tag a paper by its topic and I also have a simple paper reading tracking system where I tag them as #toread or #done. 

```
---
alias: "\{\{title\}\}"
---
# \{\{title\}\}

Author: \{\{authorString\}\}
URL: \{\{URL\}\}
[Zotero URI](\{\{zoteroSelectURI\}\})
Topics:
Status:

\{\{abstract\}\}

## Notes

> A blockquote summarizing the paper in one sentence. 

* Some bullet points. 
```
Now, I want to discuss certain factors that I designed into my systems that might not be obvious. 

## What's Not in Obsidian

Although Obsidian is an excellent tool, it can't do everything. Trying to shove everything into a centralized PKM and/or a single app is a phenomenon in the PKM space that I dislike. 

**I discover literature via external sources.** Manual recommendations by colleagues, email alerts, RSS feeds, and searching archives like Google Scholar, arXiv or ACM DL are much better methods of literature discovery than anything within Obsidian.

**I read papers on Zotero or as a hard copy, not on Obsidian.** Zotero takes care of PDF and highlight management. Zotero is much more mature in terms of reference management & PDF management than Obsidian. I can still integrate the two platforms by including a "Open in Zotero" link in Obsidian's literature notes. 

**I only take notes related to research and academic topics on Obsidian.** This is to avoid the [collector's fallacy](https://zettelkasten.de/posts/collectors-fallacy/). Yes, I love the idea of learning everything, but my time on Earth is limited. I'm paid to research computer science. I'm not paid to take notes about note-taking. 

**I don't take meeting, lecture, conference, or math notes on Obsidian.** I prefer to take physical notes for these purposes, as I tend to focus better and make better progress with math equations, arrows and diagrams. I will transfer some important tidbits of these paper notes afterwards to Obsidian. 

**I don't incorporate time and task management on Obsidian.** I think plain text is a horrible format for these tasks. I prefer using pen & paper with the occasional help from a digital Calendar. I like the tactility and physicality. I like being able to doodle a time block without being confined to the limitations of markdown when it comes to hyper-text. 

**I dont' write the final output on Obsidian.** I mainly produce two types of outputs: LaTeX manuscripts and code. Overleaf is the de-facto LaTeX collaboration platform among academics. GitHub is the programmer's equivalent. Trying to shove LaTeX manuscript writing into Obsidian via a complicated pandoc setup makes no sense. Obsidian is fine for writing draft notes or snippets, though. 

## Hierarchy of Subjects

I think of *subjects as a hierchy, not a web*. I think it's so weird that the Zettelkasten people insist on a purely flat structure, when scientific papers are ategorized as a hierarchy. 

For instance, a [paper](https://asudeh.github.io/indexlab/tutorial22.htm) I recently read can be categorized as follows. 
1. Computer science → data management systems → data integration
2. Computer science → AI/ML → algorithmic fairness → fair pre-processing
3. Computer science → data mining → dataset discovery → rare dataset mining

Here's another [paper](https://proceedings.neurips.cc/paper/2013/hash/f4573fc71c731d5c362f0d7860945b88-Abstract.html) as an example. 
1. Computer science → algorithms → randomized algorithms → multi-armed bandits
2. Computer science → algorithms → NP-hard problems → submodular maximization → adaptive submodular maximization
3. Computer science → AI/ML → active learning

My point is that **the most sensible way to link a literature note with subject(s) is by tagging it with one or more hierarchical topics**. The granularity of this tree of topics depends on my investment in each subject. For subjects that I only occasionally read about, such as history, a single layer of categorization may be necessary. For computer science, some of my categories are half a dozen levels deep. 

Finally, you do not have to stick to an "official" categorization system like ACM's Computing Categorization System (CCS). It is a *flexible* hierarchy, where tailoring the tree to your needs and refactoring the tree is encouraged. For instance, I categorize the topic of "algorithmic fairness" right below "computer science" even though nobody (ACM, IEEE, arXiv...) does that in an official archive. 

Obsidian supports hierarchical tags. Unfortunately, a *tag note* doesn't exist. If I tag a paper with `#CS/AIML/active-learning`, then I can't take notes about active learning in general. The solution I came up with is to use the [Folder Notes](https://github.com/aidenlx/alx-folder-note) plugin. Since folders are inherently hierarchical, it makes sense to nest topics in a folder structure. Folder Notes streamline the process of taking notes *about a folder.* 

I configured the Folder Notes plugin such that it automatically inserts a waypoint template when a new folder note is created. 
```
## Waypoint
%% Waypoint %%
```

This uses the [Waypoint](https://github.com/IdreesInc/Waypoint) plugin to create a list of child notes. For instance, my "computer science" folder note has the following waypoint. 

- <u>AI & ML</u>
- <u>algorithmic fairness</u>
- <u>algorithms</u>
- <u>data management</u>
- <u>data mining</u>
- <u>data visualization</u>
- <u>programming language</u>
- <u>visual computing</u>

The "data management" note has the following waypoint. 

- <u>big data</u>
- <u>biomedical data management</u>
- <u>data integration</u>
- <u>relational database</u>

Waypoints make it easier to navigate my fairly large tree of topics. Typically, a single refernce is related to one to three topics. If I'm studying a particular topic, or doing a literature survey on a subject, then I take detailed subject notes on the appropriate folder note. 

This system also helps with discoverability. By tagging each literature to multiple topics, I can discover connections that I otherwise may not have made by using the backlinks feature on Obsidian. "Oh right, that paper also uses this algorithm to solve a completely different problem! I should review my notes for that paper to remind myself what the authors did." 

## Takeaways

The concept of a PKM isn't inherently life-saving nor terrible. It's just a tool that could be useful. It's easy to make mistakes due to the passionate ferver around the topic. My tips are as follows. 

1. Assess your needs; find the simplest system that best accomplishes your needs. 
2. It's good to have many aspects of your knowledge work or life stay outside of your PKM. 
3. Hierarchical folder notes might be a good middle ground between purely flat Zettelkasten and a prescriptive system where an item must belong to a *single* folder. 
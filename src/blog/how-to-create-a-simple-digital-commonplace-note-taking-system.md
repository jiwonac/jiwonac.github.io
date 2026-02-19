---
title: How to create a simple digital commonplace note-taking system
date: 2026-02-19
tags: blog
image: ''
alt: ''
blurb: In the note-taking and stationery hobby space of the internet, people are sharing their commonplacing routines and strategies, with varying degrees of pretty handwriting. This is my take on a digital commonplace book.
---

Apparently, commonplace books, the Renaissance-era phenomenon of collecting significant quotations on a notebook, is having its own modern renaissance. In the note-taking and stationery hobby space of the internet, people are sharing their commonplacing routines and strategies, with varying degrees of pretty handwriting.

This is my take on a digital commonplace book. It is dead-simple, and works on the majority of digital note-taking apps. RemNote is my app of choice, but it comes down to personal preference about a few specific features; Notion is probably the most popular app that easily handles this system. Let me first describe the workflow before zooming out and discussing its differences from other systems.

### **The System**

#### Tags

First, create some tags. Depending on the app, it may use hashtag notations (e.g. #songbirds) or the equivalent alternative could be to create a few empty notes and then use the interlinking notation (e.g. [[songbirds]]). Create a tag for each topic that you would like to write about.

You can also create a few tags to denote the status of a note. I suggest starting with "process later" or "read later." The final type of tag that you might want to consider are tags that indicate that you're writing about some reference, like #book, #video, #podcast, etc.

Some applications support hierarchical tags. For example, Obsidian supports notation like #animals/songbirds. RemNote allows you to tag a tag (!!). For example, I can tag the "songbirds" tag with the "animals" tag, which makes "animals" a parent of "songbirds."

Below is a visualization of a subset of tags that I use. Notice the use of hierarchical tags to organize complex topics. Also note that in topics related to my work or my main interests, I have a more fine-grained division of topics than on topics that I only rarely write about. I also have tags for topics that are not related to work, but I sometimes write about in a casual, hobbyist manner.

![](/assets/tags.png)

<small>Tags categorize notes into topics, assign statuses, or specify that a note is about some external reference.</small>

#### Daily notes

Daily notes are the main workhorse of my system, because the vast majority of notes are primarily organized in a chronological fashion, rather than via topics or alphabetical order.

At the start of each day, create a daily note. This daily note is a "parent note" or a "note container." Its function is to hold all notes that you write during the day.

![](/assets/daily%20notes.png)

<small>Notes are organized in a chronological fashion, one daily note per day.</small>

Whenever you have an interesting thought, attend a meeting, read a section of a textbook, or a coworker suggests something, create a new "child note", "block", or a "bullet" (depending on the terminology of the specific app) within the daily note. Write down your thoughts.

Then, after writing down the note, tag it with all appropriate tags. A note may be tagged with multiple tags if it is speaking to multiple topics at once.

![](/assets/daily%20note%20example.png)

<small>A daily note contains all thoughts that I have in a day. Each thought is tagged with the appropriate topic.</small>

#### Projects

Some thoughts or ideas can be fully understood and captured in a note within a single day. Some projects, on the other hand, last for many weeks or months. These projects can benefit from having their own organizational view.

The way I accomplish this is by using interlinks (a.k.a. references) that are now supported in many apps. Each project is simply a reference to all note (each of which lives in a daily note) that is about this project.

I use project notes to read a textbook, accomplish work projects, and get personal projects done.

Below is a snippet of an actual personal project of mine: reading a textbook on biogeography, a field that has fascinated me as a hobbyist naturalist for a long time.

![](/assets/project%20note.png)

<small>A project note contains interlinks to notes that are related to the project. The notes themselves live in daily notes.</small>

#### Summary

A note lives in the corresponding daily note. Each note is tagged with topics and other metadata. Projects are special types of notes, separate from daily notes. Each project contains interlinks to relevant notes.

### Differences with Other Systems

#### Traditional Commonplacing

There are many similarities between my system and traditional commonplace books. Like the latter, I write snippets of notes, then categorize it. I collect interesting ideas from books and other sources.

Traditional commonplace books were written in notebooks with categorical indexes to categorize notes for later retrieval. It was rather common for practitioners to pre-define some categories of interest, or categorize notes based on alphabetical keywords.

My digital system generalizes the categories by using hierarchical tags. A note that is tagged #songbirds is automatically also part of the #animals collection. Furthermore, a note can have multiple tags, which elegantly handles notes that touch on more than one topics.

The topic that I put into my system is also more expansive. Traditional commonplace books typically included rhetorical snippets or quotations from books. In addition to snippets and quotations, I also take notes on random ideas that I have, meeting notes, project ideas, questions, and so on.

#### Digital Zettelkasten

A digital Zettelkasten is characterized by short, evergreen notes, each containing one idea, that are tightly interconnected with each other via a network structure.

My system is a direct result of experimenting with a digital Zettelkasten and discovering its main pain points. First, it is a very time-consuming hobby. Second, the network can be difficult to navigate, especially in scenarios where a little top-down planning can simplify the organization. Third, its bottom-up, wiki-like structure incentivizes too much pseudo-productive procrastination.

My digital commonplace book addresses all issues. It has low time and effort overhead. All I have to do each day is create a new daily note, write down some notes, and tag them. It is also easy to retrieve old notes by searching for all notes that contain the relevant tag. It is also (real-)productivity oriented, helping me get stuff done each day, rather than incentivizing rabbit holes that feel productive but don't move the needle.

### RemNote-Specific Details

As aforementioned, my specific implementation uses RemNote, a note-taking app designed for students and lifelong learners. It has specific features for flashcards or learning from YouTube videos. Beyond all that bells and whistle, it is a damn good infinite outliner, and I love a good outliner. I've also considered other outliner apps like Workflowy, Dynalist, and Tana, but no other app has active development and support on par with RemNote, and no other app has first-class support for PDFs and videos and math equations. 

RemNote has a built-in daily note feature. Each daily note is a "document" that holds "rems", a.k.a. bullet points. Each bullet point can itself hold other bullet points, theoretically infinitely. RemNote calls bullet points _rems_. I tag each rem that is a direct descendant of a daily note with tags. As aforementioned, RemNote supports hierarchical tags, like #animals/songbirds, by simply tagging the #songbirds rem with the #animals rem. Interlinking is also well-supported via references. 

### Some Tag Ideas

- **#classics**: I tag all academic papers or books that are the "classics", "must read", or "foundational" works within a field as #classics. 
- **#learning from people**: This is a parent tag that contains three child tags: #meetings, #talks (which mainly refers to one-off conference lectures and tutorials) and #courses (which includes both in-person and online courses). 
- **Hobbies:** Don't confine the topic of your note-taking to "serious" topics. I have tags such as #Overwatch and #Deadlock (my main video games these days) as well as tags like #showerthought, #birds, and #journal. Topics should cover all topics that interest you, and you'd like to take some notes on. 

### Q&A

**Q: Do you edit individual notes/thoughts after writing them?**
**A:** Yes, if I have a small amount of edits or addition to make. If the edit would need to be extensive, then I prefer instead to create a new note within today's daily note. 

**Q: Is there a distinction between different "types" of notes, like literature notes, fleeting notes, and main notes?**
**A:** No. Each note can simultaneously contain some fleeting thoughts, some "evergreen" thoughts, and  some commentary on some literature source. 

**Q: Do you organize project notes into sections and subsections?**
**A:** Sometimes, if appropriate. For example, for a project that's about reading a textbook, organizing the project note into sections that reflect the textbook's sections works well for me.

---
title: The Flat File Lifestyle
tags: blog
date: 2022-12-28
image: /assets/blog/flatfile.jpg
alt: Document icons with popular file formats. 
blurb: Over the years, I've grown increasingly wary of using any application that stores its data in a nonstandard format or in a relational database. 
small_image: true
---

Over the years, I've grown increasingly wary of using any application that stores its data in a nonstandard format or in a relational database. 

My main concern is longevity: I've jumped apps enough times to know that most software companies or projects don't last long. If your file format isn't a popular open standard like txt, html, pdf, or png, it could break at any time. Evernote did not support Linux for a long time, so dealing with their proprietary .enex file format was a pain. The same could be said about Clip Studio's .clip file format. 

The secondary concern is a desire to understand what is really happening with the apps that I use. Zotero, for instance, is an awesome application. However, there are often small discrepancies between what I intended and the BibTeX file that is exported in the end, due to the sqlite middleman. I decided to work directly with BibTeX files to gain fine control over the BibTeX exports. Put another way, although SQL databases are reliable for a software programmer, they are less human-readable for the end user. 

The third factor is platform freedom. If the developers decide to add a lot of junk features, or get bought out by a scummy owner, then I can easily switch to a different app that also uses the popular, open file format. 

Migrating to an almost flat-file-based workflow was not too difficult. 

1. Handwritten notes: Onyx Boox notes app (sqlite database) → annotating a PDF notebook template
2. Typed notes: Evernote (enex, a proprietary format built on XML) → plain text markdown files
3. Reference manager: Zotero (sqlite database) → JabRef (raw BibTeX files)
4. Photo management: Photos app (Apple's proprietary format) → flat image files
5. Office documents: Work with Microsoft or Google's file formats to collaborate → archive final product in odf (open document format) and PDF. 

There certainly is a learning curve, particularly with learning the flat file format's specifications and its idiosyncrasies. At the end of the day, though, I like understanding what my data means. 
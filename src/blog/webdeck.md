---
title: Using Web Apps on the Steam Deck's Gaming Mode
tags: blog
date: 2022-12-12
date_str: "Dec 12, 2022"
image: /assets/blog/webdeck.jpg
small_image: true
alt: Streaming service Nebula running as a web app on the Steam Deck. 
blurb: For this reason, turning a website into a desktop "app" with Chromium and adding it to Steam as a non-Steam game is the best solution.
---

I've been fiddling around with my Steam Deck to turn it into a [specialized](/blog/singlepurpose) entertainment device, capable of gaming and media streaming. Since the Steam Deck runs on Linux, it is difficult to procure apps that were purpose-built for a streaming service, with a few exceptions. The [podcasts](https://flathub.org/apps/details/org.gnome.Podcasts) app and the [FreeTube](https://flathub.org/apps/details/io.freetubeapp.FreeTube) app work well, though the latter is for those who want a very minimal Youtube experience without any algorithmic recommendations. 

For this reason, turning a website into a desktop "app" with Chromium and adding it to Steam as a non-Steam game is the best solution. Why not just browse through the Chromium or Firefox browser? You would know if you tried, that web browsing on Gaming mode is very clunky! Encapsulating a single website as a web app improves the user experience. 

As a prerequisite, you should do the following:

1. Access the [Desktop mode](https://help.steampowered.com/en/faqs/view/671A-4453-E8D2-323C). 
2. Install [Chromium](https://flathub.org/apps/details/org.chromium.Chromium) from the Discover Store. 
3. Add Chromium to Steam as a [non-Steam game](https://help.steampowered.com/en/faqs/view/4B8B-9697-2338-40EC). 

Now, we figure out how Chromium was added to Steam. 

1. Right click on Chromium in the Steam library. 
2. Click "Properties..". At the moment, the fields are as follows. Copy the launch options text for use later. 

Target: "/usr/bin/flatpak"
Start in: "/usr/bin/"
Launch options: run --branch=stable --arch=x86 --command=/app/bin/chromium --file-forwarding org.chromium.Chromium @@u @@

Once these steps are done, navigate to the desired website and install a shortcut to it as an app by following [Google's documentation](https://support.google.com/chrome_webstore/answer/3060053?hl=en). 

Next, we will examine the [desktop file](https://wiki.archlinux.org/title/desktop_entries) of the newly installed web app. Although you could do it on the command line or on the file browser, the following method is the simplest. 

1. Click on the Application Launcher (bottom left corner) and find the web app. 
2. Right click (left trigger) and choose "Edit Application..". 
3. Navigate to the "Applications" tab. 
4. Examine the "Command" field. Among other things, it will contain a command of the form: --app-id:agimnkijcaahngcdmfeangaknmldooml. The actual app id might differ. Copy this portion and save for use in the next step. 

Finally, we can add this app to Steam. 

1. Add the application as a non-Steam game. 
2. Right click on the web app in the Steam library and click "Properties..".
3. Set the visible fields as following:

Target: "/usr/bin/flatpak"
Start in: "/usr/bin/"
Launch options: run --branch=stable --arch=x86 --command=/app/bin/chromium --file-forwarding org.chromium.Chromium @@u @@ --app-id:agimnkijcaahngcdmfeangaknmldooml. 

Note that the launch option is a combination of the launch options for Chromium we saved earlier, and the app id field that we found from the app's desktop file. I think that the --file-forwarding launch option is the critical piece for making Chromium work. 

And the app should launch now! As optional steps, you can set some [custom artworks](https://www.steamgriddb.com/) and enable adblocking on Chromium for a nicer experience. 😉
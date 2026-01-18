---
name: "IG_FOLLOW_CHECKER"
description: "A bookmarklet to view your Instagram follower statistics"
tech: "Javascript"
---

## Project Overview

This first started as an idea because my girlfriend wanted to check who hasn't followed her back or unfollowed her on Instagram. There were some popular services for this, but I'm guessing Meta/Instagram cut off access to their APIs. After digging around a bit, I found a lot of solutions requiring the user to paste in some javascript code into the devtools console.

However, it is not easy for a non-technical person to run these scripts. I thought it would be a lot nicer to convert it into a bookmarklet and have some UI that displays the results.


## Features

- Modal UI
- Tabs for various follower/following comparisons
- Search for logged in user or specify username
- Copy list as JSON, string list
- Export to CSV


### Demo

**Step 1: Login to Instagram and click on the bookmarklet**

![Picture of the bookmarklet in bookmark bar](/assets/ig-follow-checker-demo-1.png)

**Step 2: The script runs...**

![Picture of the bookmarklet retrieving followers](/assets/ig-follow-checker-demo-2.png)

**Step 3: Done!**

![Picture of the results, tabs, and export options](/assets/ig-follow-checker-demo-3.png)


## How to Use

1. Drag the bookmarklet to your bookmarks bar.
2. Open Instagram and log in.
3. Click on the bookmarklet, and the UI will pop up.
4. View results.
5. Click `Run again` or `Change user` and input an Instagram handle.


## Technical Details

This code uses the Instagram GraphQL endpoint to scrape the followers and following list and compares them into some useful lists. I found the source code on some Stack Overflow post, which just had the user scraping logic. I improved the code, converted it to a bookmarklet, and added some useful features.


### Challenges

- Displaying information without user needing to open devtools
- Sharing bookmarklet in a drag & drop format

### Solutions

- Modal UI, never requiring the devtools to be opened
- React workaround


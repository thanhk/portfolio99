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


## Security & Privacy

**Your data stays private.** This bookmarklet runs entirely in your browser - no data is sent to me or any third party. Here's what it does:

- **Runs locally**: All code executes on your machine within the Instagram.com page
- **Direct API calls**: Communicates only with Instagram's own GraphQL endpoints (the same ones Instagram's website uses)
- **No external servers**: Your follower/following data never leaves your browser
- **No tracking**: No analytics, no logging, no data collection
- **Open source**: Full source code is viewable (see "View Source Code" button above)

**Permissions needed**: You must be logged into Instagram for this to work, as it uses your existing session to fetch your follower data.


## How to Verify the Code is Safe

You can inspect what this bookmarklet does before using it:

1. **View the source code**: Click the "View Source Code" button on the projects page to see the unminified, readable code
2. **Check the bookmark URL**: Right-click the bookmarklet in your bookmarks bar → Properties/Edit → You'll see it starts with `javascript:` followed by code
3. **Read the code**: The source code is commented and explains each step
4. **Check network requests**: Open your browser's Developer Tools (F12) → Network tab → Run the bookmarklet and verify it only makes requests to `instagram.com` domains

**What to look for**: The code should only make fetch requests to `www.instagram.com/graphql/query` and `www.instagram.com/web/search/topsearch/`. No other domains should be contacted.


## How to Use

1. **Review the code** (optional but recommended): Click "View Source Code" on the projects page to inspect what the bookmarklet does
2. **Drag the bookmarklet** to your bookmarks bar
3. **Open Instagram** and log in to your account
4. **Navigate to any Instagram profile** (or stay on your feed)
5. **Click the bookmarklet** in your bookmarks bar
6. **Wait for loading**: The script will fetch your followers and following lists
7. **View results**: A modal will appear showing:
   - Who doesn't follow you back
   - Who you don't follow back
   - Mutual followers
   - All followers/following lists
8. **Export data** (optional): Use the copy/download buttons to save results as JSON or CSV
9. **Search other users**: Click "Change user" to analyze any public Instagram account


## What This Code Does

Here's a breakdown of the bookmarklet's operations:

1. **Gets your Instagram username**: Either detects it from the current page URL or prompts you to enter one
2. **Fetches user ID**: Makes a request to Instagram's search API to convert username → user ID
3. **Retrieves followers**: Uses Instagram's GraphQL API to fetch your complete followers list (paginated in batches of 50)
4. **Retrieves following**: Uses the same API to fetch your complete following list
5. **Compares lists**: Performs set operations to find:
   - People who don't follow you back
   - People you don't follow back
   - Mutual connections
6. **Displays results**: Creates a modal overlay with tabs to browse different lists
7. **Provides export options**: Allows downloading data as CSV or copying as JSON/text

**Rate limiting**: The code includes 150ms delays between paginated requests to avoid overwhelming Instagram's servers.


## Technical Details

This code uses the Instagram GraphQL endpoint to scrape the followers and following list and compares them into some useful lists. I found the source code on some Stack Overflow post, which just had the user scraping logic. I improved the code, converted it to a bookmarklet, and added some useful features.

**Technologies Used:**
- Vanilla JavaScript (no external dependencies)
- Instagram GraphQL API (endpoints that Instagram's own web interface uses)
- Browser Fetch API for network requests
- LocalStorage for caching the last-used username
- HTML5 Drag and Drop API for bookmarklet installation

**API Endpoints:**
- `https://www.instagram.com/graphql/query` - Fetches followers and following lists
- `https://www.instagram.com/web/search/topsearch/` - Converts username to user ID


## Troubleshooting

**"Failed to get user ID"**: Make sure you're logged into Instagram and the username is spelled correctly.

**"Failed to fetch followers/following"**: Instagram may have rate-limited you. Wait a few minutes and try again. Also ensure you're still logged in.

**Bookmarklet doesn't work**: Make sure you dragged it to your bookmarks bar (not just clicked it). Also ensure you're on an Instagram page when clicking it.

**Results seem incomplete**: If you have a very large follower/following count (10k+), Instagram may impose additional rate limits. The code includes delays to minimize this.


## Limitations

- **Instagram's terms**: This bookmarklet uses Instagram's internal APIs, which may change without notice
- **Rate limits**: Instagram may limit how quickly you can fetch data
- **Private accounts**: You can only see followers/following for accounts you have permission to view
- **API changes**: Instagram occasionally updates their GraphQL query hashes, which may break the bookmarklet until updated


### Challenges

- Displaying information without user needing to open devtools
- Sharing bookmarklet in a drag & drop format
- Building trust: Users are rightfully cautious about running arbitrary JavaScript

### Solutions

- Modal UI, never requiring the devtools to be opened
- React workaround for bookmarklet drag-and-drop
- Comprehensive documentation with security explanations and code transparency


# portfolio99 - thanhk's personal portfolio website

My personal portfolio themed after older/retro websites with modern elements for ease of access.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

### Build

```bash
npm run build
npm start
```

## Customization

### Adding Your Information

1. **Home Page**: Edit `src/app/page.tsx` to update your name and work experience
2. **Projects**: Edit `src/app/projects/page.tsx` to add your projects
3. **Links**: Edit `src/app/links/page.tsx` to add your social links and resume

### Adding Assets

Drop your images, GIFs, and icons into the `public/assets/` folder. You can reference them in your pages like:

```tsx
<img src="/assets/your-image.gif" alt="Description" />
```

### Adding Blog Posts

1. Create an HTML file in `public/blog/`
2. Name it with the format: `YYYY-MM-DD-title.html` (e.g., `2024-12-16-my-first-post.html`)
   - Or just `title.html` for simpler naming
3. Write your blog post content in HTML
4. The blog listing page will automatically pick it up!

Example blog post (`public/blog/2024-12-16-welcome.html`):

```html
<h1>Welcome to My Blog!</h1>
<p>This is my first blog post. I can write HTML directly here.</p>
<p>Feel free to use any HTML tags you want!</p>
```

### Styling

The retro styling is defined in `src/styles/globals.css`. You can customize:
- Colors (CSS variables in `:root`)
- Fonts (currently using VT323 and Courier New)
- Animations and effects
- Component styles

### Updating Bookmarklets

The ig-follow-checker bookmarklet is fetched from its [GitHub repo](https://github.com/thanhk/ig-follow-checker) at build time. To update:

1. Push changes to the repo and tag a new version
2. Update the version in `scripts/fetch-bookmarklets.mjs`
3. Run `npm run fetch-bookmarklets`


## Tech Stack

- **Next.js 16**
- **TypeScript**
- **Tailwind CSS**

# Portfolio 99 - Retro 90s Portfolio Website

A retro/90s-themed portfolio website built with Next.js, featuring a nostalgic aesthetic with modern functionality.

## Features

- 🎨 Retro 90s styling with neon colors, pixel fonts, and animated effects
- 📄 Simple home page with name and work experience
- 🚀 Projects page for showcasing your work
- 🔗 Links page for social media and resume
- 📝 Blog system that reads HTML files from `public/blog/`
- 🎯 Easy to customize and update

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

## Project Structure

```
portfolio99/
├── public/
│   ├── assets/          # Your images, GIFs, icons
│   └── blog/            # HTML blog post files
├── src/
│   ├── app/
│   │   ├── layout.tsx   # Root layout with Navigation
│   │   ├── page.tsx     # Home page
│   │   ├── projects/    # Projects page
│   │   ├── links/       # Socials & Resume page
│   │   └── blog/        # Blog pages
│   ├── components/
│   │   ├── Navigation.tsx
│   │   └── RetroButton.tsx
│   └── styles/
│       └── globals.css   # Retro styling
└── package.json
```

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS (minimal usage, mostly custom CSS)
- **Custom CSS** - Retro 90s styling

## Inspiration

This portfolio is inspired by classic 90s websites like:
- [The Library of Dead and Abandoned Malls](https://deadmalls-library.neocities.org/)
- [Berkshire Hathaway](https://www.berkshirehathaway.com/)

## License

Feel free to use this template for your own portfolio!

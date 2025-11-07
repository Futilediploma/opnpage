# opnpage.me Landing Page

A production-ready landing page for opnpage — a human-centered social dashboard where people share progress metrics.

## Design Philosophy

This site embodies a modern, minimalist, trustworthy aesthetic that feels genuinely human. No AI-generated visual clichés, no gradients or glowing effects — just clean typography, thoughtful spacing, and a warm color palette.

## Brand Guidelines

### Color Palette
- **Burnt Orange** `#F25C05` — Primary accent
- **Navy** `#0F2233` — Text and logo
- **Soft Beige** `#F8F5F2` — Background
- **Warm Gray** `#E6E3DF` — Borders and subtle elements

### Typography
- **Font**: Inter (from Google Fonts)
- Large, confident headings with generous white space
- Readable line-height (1.7-1.85)
- Hierarchy through size and weight, not color tricks

### Layout
- 8-point grid system
- Subtle shadows for depth
- Rounded corners (8-16px)
- Respects `prefers-reduced-motion`

## Tech Stack

- **React 18** — Component framework
- **Vite** — Build tool
- **TailwindCSS 3** — Utility-first styling
- **Semantic HTML** — Accessible markup with ARIA labels

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see the site.

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
OpnPage/
├── public/
│   └── assets/
│       ├── opnpage_logo.png   ← Place your logo here
│       └── README.md
├── src/
│   ├── components/
│   │   ├── Header.jsx         ← Navigation with logo and CTAs
│   │   ├── Hero.jsx           ← Tagline, subtext, and dashboard preview
│   │   ├── Features.jsx       ← 3×2 feature grid
│   │   ├── Testimonials.jsx   ← Three user quotes
│   │   ├── CTA.jsx            ← Email signup form
│   │   └── Footer.jsx         ← Copyright and navigation
│   ├── App.jsx                ← Main component wrapper
│   ├── main.jsx               ← React entry point
│   └── index.css              ← Global styles and animations
├── tailwind.config.js         ← Brand color tokens and theme
├── vite.config.js
├── package.json
└── README.md
```

## Logo Setup

Place your `opnpage_logo.png` file in the [public/assets/](public/assets/) directory. The logo is used in:
- [Header.jsx:17](src/components/Header.jsx#L17)
- [Footer.jsx:12](src/components/Footer.jsx#L12)

Recommended specs:
- PNG format with transparent background
- 200-300px wide
- Navy (#0F2233) color

## Accessibility Features

- Skip-to-content link for keyboard navigation
- Semantic HTML with proper heading hierarchy
- ARIA labels on navigation and forms
- Focus states on all interactive elements
- Respects `prefers-reduced-motion` user preference
- High contrast ratios for text readability

## Copy & Tone

All copy is written in warm, confident, plain English. No buzzwords, no synthetic inspiration — everything feels calm and sincere, like a marketing veteran wrote it.

### Key Messages
- **Tagline**: "Share your stats, not your opinions."
- **Value Prop**: Track what matters and share your progress with a beautiful, simple dashboard
- **Tone**: Human, trustworthy, calm, confident

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive design
- Supports dark mode preferences (via browser defaults)

## License

© 2025 opnpage. All rights reserved.

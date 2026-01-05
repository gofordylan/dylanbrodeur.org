# dylanbrodeur.org

A creative, animated, and colorful personal website built with modern web technologies.

## Features

- **Vibrant Design** - Colorful gradients, playful animations, and modern UI
- **Smooth Animations** - GSAP-powered scroll animations and interactions
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **Dark Mode** - Toggle between light and dark themes
- **Performance Optimized** - Fast loading with lazy loading and efficient animations
- **Accessible** - WCAG compliant with keyboard navigation support
- **No Build Process** - Pure HTML/CSS/JS for easy deployment

## Tech Stack

### Core Technologies
- **HTML5** - Semantic markup
- **CSS3** - Modern layouts (Grid, Flexbox), custom properties
- **JavaScript (ES6+)** - Vanilla JS for interactions

### Libraries (CDN-loaded "Plugins")
- **GSAP 3.12** - Professional-grade animation library
- **ScrollTrigger** - Scroll-based animations
- **Google Fonts** - Inter & Space Grotesk typography

## Project Structure

```
dylanbrodeur.org/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main styles & design system
│   ├── animations.css     # Animation definitions
│   └── responsive.css     # Media queries
├── js/
│   ├── main.js            # Core interactions
│   ├── animations.js      # GSAP animation code
│   └── utils.js           # Helper functions
├── assets/
│   ├── images/            # Images and icons
│   └── fonts/             # Custom fonts (if needed)
└── README.md              # This file
```

## Getting Started

### 1. Local Development

Simply open `index.html` in your browser:

```bash
# Navigate to project directory
cd ~/projects/dylanbrodeur.org

# Option 1: Open directly in browser
open index.html

# Option 2: Use Python's built-in server
python3 -m http.server 8000
# Then visit http://localhost:8000

# Option 3: Use Node.js http-server
npx http-server -p 8000
# Then visit http://localhost:8000

# Option 4: Use PHP's built-in server
php -S localhost:8000
```

### 2. Adding Your Profile Image

Replace the placeholder profile image:

```bash
# Add your profile photo (recommended: square, min 400x400px)
cp /path/to/your/photo.jpg assets/images/profile.jpg
```

Or update the image path in `index.html`:

```html
<img src="assets/images/profile.jpg" alt="Dylan Brodeur" class="hero-image">
```

### 3. Customization

#### Update Content

Edit `index.html` to update:
- Personal information
- Projects
- Work experience
- Education
- Social links

#### Customize Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --color-primary: #6366f1;
    --color-secondary: #ec4899;
    --color-accent: #f59e0b;
    /* ... more colors */
}
```

#### Adjust Animations

Modify animation timing in `js/animations.js`:

```javascript
gsap.from('.hero-title', {
    y: 50,
    opacity: 0,
    duration: 0.8  // Adjust duration
});
```

## Deployment

### Option 1: Netlify (Recommended)

1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Done! Your site is live

**Or use Netlify CLI:**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd ~/projects/dylanbrodeur.org
netlify deploy --prod
```

### Option 2: Vercel

1. Create account at [vercel.com](https://vercel.com)
2. Install Vercel CLI:

```bash
npm install -g vercel
```

3. Deploy:

```bash
cd ~/projects/dylanbrodeur.org
vercel --prod
```

### Option 3: GitHub Pages

1. Create a GitHub repository
2. Push your code:

```bash
cd ~/projects/dylanbrodeur.org
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/dbro20/dylanbrodeur.org.git
git push -u origin main
```

3. Enable GitHub Pages in repository settings
4. Select `main` branch and root directory
5. Your site will be at `https://dbro20.github.io/dylanbrodeur.org`

### Option 4: Traditional Hosting

Upload files via FTP to your web host:
- Upload all files to `public_html` or `www` directory
- Ensure `index.html` is in the root

## Using "Plugins" (Libraries)

This website uses external libraries loaded via CDN. Here's what each does:

### GSAP (GreenSock Animation Platform)

**What it does:** Professional animation library for smooth, performant animations

**How it's loaded:** Via CDN in `index.html`

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

**Usage example:**

```javascript
gsap.from('.hero-title', {
    y: 50,
    opacity: 0,
    duration: 0.8
});
```

**Documentation:** [greensock.com/docs](https://greensock.com/docs/)

### Google Fonts

**What it does:** Provides high-quality web fonts

**How it's loaded:** Via CDN in `index.html`

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome)

## Performance Tips

1. **Optimize Images**
   ```bash
   # Use ImageOptim, TinyPNG, or similar
   # Keep images under 200KB
   ```

2. **Enable Compression**
   - Most hosting providers enable gzip automatically
   - For custom servers, enable gzip in your web server config

3. **Add Caching Headers**
   - Configure your hosting to cache static assets

## Accessibility

This website includes:
- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Respects `prefers-reduced-motion`
- High contrast mode support
- Screen reader friendly

## Troubleshooting

### Animations not working?

Check browser console for errors. Ensure GSAP is loading:

```javascript
console.log(typeof gsap); // Should output "object"
```

### Images not showing?

Check file paths are correct:
- Use relative paths: `assets/images/profile.jpg`
- Not absolute paths: `/Users/...`

### Mobile menu not working?

Ensure JavaScript is enabled and check console for errors.

## Future Enhancements

Potential additions:
- [ ] Contact form with backend
- [ ] Blog integration
- [ ] Project case studies
- [ ] Analytics integration
- [ ] Newsletter signup
- [ ] RSS feed

## License

© 2025 Dylan Brodeur. All rights reserved.

## Contact

- **Website:** [dylanbrodeur.org](https://dylanbrodeur.org)
- **X/Twitter:** [@gofordylan](https://x.com/gofordylan)
- **Farcaster:** [@limes.eth](https://warpcast.com/limes.eth)

---

Built with creativity and code 🚀

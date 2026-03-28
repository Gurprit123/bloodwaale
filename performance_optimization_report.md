# Bloodwaale Performance Optimization Report

## Completed

- Deferred main JavaScript with `defer`.
- Optimized `logo.jpg` from about `110 KB` to about `47 KB`.
- Added explicit `width` and `height` for logo assets to reduce layout shift.
- Added `fetchpriority="high"` to the hero logo on the homepage.
- Kept CSS and JS as small standalone files for a static site.
- Moved navigation/footer to static HTML, reducing runtime work and improving first-render usefulness.

## Expected Core Web Vitals Impact

- LCP: improved through optimized hero image and simpler render path.
- CLS: improved through explicit image dimensions and stable layout.
- INP: good for current site scale because JavaScript is minimal and interaction surfaces are light.

## Recommended Next Actions

- Self-host fonts to remove third-party font dependency.
- Generate WebP and AVIF image variants once a suitable image pipeline is available.
- Add long-term caching headers at hosting level for CSS, JS, and images.
- Minify CSS and JS in the deployment pipeline.
- Add Brotli or gzip compression at hosting or CDN level.
- Consider pre-rendered blog pages with limited inline critical CSS for key landing pages.

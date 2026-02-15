# Images Directory

This directory contains all static images for the portfolio website.

## Structure

- `projects/` - Project screenshots and thumbnails
  - Currently contains SVG placeholders that can be replaced with actual project screenshots
  - Recommended dimensions: 800x600px or 16:9 aspect ratio
  - Supported formats: PNG, JPG, WebP, AVIF, SVG

## Image Optimization

All images are automatically optimized by Next.js Image component:
- Automatic format conversion to WebP/AVIF for supported browsers
- Responsive image sizing based on viewport
- Lazy loading by default
- Automatic quality optimization

## Adding New Images

1. Place images in the appropriate subdirectory
2. Update the corresponding data file (e.g., `data/projects.ts`)
3. Use the Next.js Image component in your components
4. Specify appropriate `sizes` prop for responsive images

## Current Placeholders

The following placeholder images are included:
- `projects/ecommerce.svg` - E-Commerce Platform placeholder
- `projects/taskdash.svg` - Task Management Dashboard placeholder

Replace these with actual project screenshots when available.

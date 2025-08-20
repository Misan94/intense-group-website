# Nitex Website Recreation - Next.js

A modern, SEO-optimized recreation of the Nitex fashion supply chain website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Next.js 14** with App Router for optimal performance and SEO
- **Server-Side Rendering (SSR)** for better search engine optimization
- **TypeScript** for type safety and better development experience
- **Tailwind CSS** for responsive, modern styling
- **Custom Fonts**: DM Serif Display for headings, Quicksand for body text
- **Smooth Animations** with CSS transitions and scroll-triggered effects
- **Mobile-First Design** with full responsive layout
- **SEO Optimized** with:
  - Comprehensive meta tags
  - Open Graph and Twitter Card support
  - Structured data (JSON-LD)
  - Automatic sitemap generation
  - Robots.txt configuration
  - Semantic HTML structure

## 📱 Sections

1. **Hero Section** - Animated introduction with call-to-action
2. **Our Story** - Company background and global presence
3. **What We Do** - Services and supply chain solutions
4. **Our Beliefs** - Company philosophy and approach
5. **How We Help** - 5-step benefit breakdown
6. **Your Needs** - Targeted solutions for different audiences
7. **Footer** - Comprehensive links and contact information

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (DM Serif Display, Quicksand)
- **Icons**: Lucide React
- **Animations**: CSS Transitions + Intersection Observer API

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with SEO meta tags
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # SEO robots configuration
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   ├── HeroSection.tsx     # Landing hero section
│   ├── OurStorySection.tsx # Company story
│   ├── WhatWeDoSection.tsx # Services overview
│   ├── BeliefsSection.tsx  # Company philosophy
│   ├── HowWeHelpSection.tsx# Benefits breakdown
│   ├── YourNeedsSection.tsx# Audience-specific solutions
│   └── StructuredData.tsx  # SEO structured data
└── public/                 # Static assets (add your images here)
```

## 🎨 Customization

### Colors
The color scheme is defined in `tailwind.config.js`:
- Primary: Black (#000000)
- Secondary: White (#ffffff)
- Accent: Light Gray (#f5f5f5)
- Text: Gray (#666666)

### Fonts
- **Headings**: DM Serif Display
- **Body Text**: Quicksand

### Content
All content can be easily modified in the respective component files. The website is fully customizable for your marketing agency needs.

## 🔍 SEO Features

- **Meta Tags**: Comprehensive title, description, and keyword optimization
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Structured Data**: JSON-LD markup for search engines
- **Sitemap**: Automatically generated XML sitemap
- **Robots.txt**: Search engine crawler instructions
- **Semantic HTML**: Proper heading hierarchy and semantic elements

## 📈 Performance

- **Server-Side Rendering** for faster initial page load
- **Image Optimization** with Next.js Image component
- **Font Optimization** with next/font
- **Code Splitting** automatic with Next.js App Router
- **Compression** enabled in production

## 🌐 Deployment

This project is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any hosting service supporting Node.js**

For Vercel deployment:
```bash
npm install -g vercel
vercel
```

## 📝 License

This project is created for educational/commercial purposes. Please ensure you have the right to use any content, images, or branding elements.

---

Built with ❤️ using Next.js and modern web technologies for optimal SEO and user experience.

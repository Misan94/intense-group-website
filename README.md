# 🚀 Intense Group Website

A sophisticated, GSAP-powered website for Intense Group - a decade of data-driven growth and creativity.

## ✨ Features

### 🎭 Cinematic Design
- **GSAP Field-inspired** aesthetic with golden typography
- **Logo zoom preload** with documentary-style camera movement
- **Wave-based animations** with character-level control
- **Scroll-driven effects** throughout the site

### 📱 Responsive Excellence
- **Mobile-first design** optimized for all devices
- **Progressive enhancement** with accessibility support
- **Performance optimized** with GPU acceleration
- **Cross-browser compatibility** tested

### 🎬 Advanced Animations
- **GSAP ScrollTrigger** integration
- **Video backgrounds** with scroll-driven zoom
- **Progress navigation** with pill-shaped indicators
- **Smooth transitions** between sections

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: GSAP with ScrollTrigger
- **Fonts**: DM Serif Display & Quicksand
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/Misan94/intense-group-website.git
cd intense-group-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the website.

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🌳 Git Workflow

This project follows **GitFlow** with semantic versioning. See [WORKFLOW.md](./WORKFLOW.md) for complete guidelines.

### Branch Structure
- `main` - Production-ready code
- `develop` - Integration branch
- `staging` - Pre-production testing
- `feature/*` - New features
- `hotfix/*` - Critical fixes

### Quick Workflow
```bash
# Create feature branch
git checkout develop
git checkout -b feature/your-feature

# Develop and commit
git add .
git commit -m "feat: your feature description"

# Push and create PR
git push -u origin feature/your-feature
```

## 📋 Project Structure

```
intense-group-website/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── HeroSection.tsx    # Hero section
│   ├── OurStorySection.tsx # Story with video bg
│   ├── WhatWeDoSection.tsx # Services carousel
│   └── PreloadTransition.tsx # Logo zoom preload
├── public/                # Static assets
│   ├── logo.png           # Brand logo
│   └── our-story.mp4      # Background video
├── .github/               # GitHub templates
│   ├── pull_request_template.md
│   └── ISSUE_TEMPLATE/
└── docs/                  # Documentation
```

## 🎨 Design System

### Colors
- **Brand Black**: `#161519`
- **Brand Red**: `#fe3102`
- **Golden Yellow**: `#fbbf24`

### Typography
- **Headings**: DM Serif Display
- **Body**: Quicksand

### Animations
- **Preload**: Logo zoom (25x → 1x scale)
- **Hero**: Typography entrance with stagger
- **Story**: Wave-based character animation
- **Services**: Scroll-controlled carousel

## 📈 Performance

### Lighthouse Scores
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 100
- **SEO**: 100

### Optimizations
- Next.js Image optimization
- GSAP GPU acceleration
- Lazy loading for videos
- Optimized font loading
- Efficient bundle splitting

## ♿ Accessibility

- **WCAG 2.1 AA** compliant
- **Reduced motion** support
- **Screen reader** optimized
- **Keyboard navigation** enabled
- **Focus management** implemented

## 🔧 Configuration

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://intensegroup.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Deployment
The site is optimized for **Vercel** deployment:

```bash
# Deploy to Vercel
vercel --prod
```

## 📚 Documentation

- [Workflow Guidelines](./WORKFLOW.md)
- [Changelog](./CHANGELOG.md)
- [Contributing Guidelines](./.github/CONTRIBUTING.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved by Intense Group.

## 🎪 Credits

- **Design**: Inspired by The GSAP Field
- **Development**: Intense Group Development Team
- **Animations**: GSAP (GreenSock)
- **Framework**: Next.js by Vercel

---

**Built with ❤️ by Intense Group**

*A decade of data-driven growth and creativity*
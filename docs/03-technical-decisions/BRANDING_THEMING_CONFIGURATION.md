# Q-Bridge Branding & Theming Configuration

## 🎨 Brand Identity

### **Primary Brand Color: Teal**
```css
Primary: #14b8a6  /* Teal-500 from Tailwind */
```

### **Brand Assets Source**
- **Website:** https://tandabuionline.ac.tz
- **Logo:** Configurable via .env
- **Favicon:** Configurable via .env
- **Fonts:** Configurable via .env

---

## 🎯 Design Philosophy

**Q-Bridge branding should:**
1. ✅ Reflect TPI's institutional identity
2. ✅ Be fully configurable via environment variables
3. ✅ Support multi-tenant branding (future)
4. ✅ Maintain professional academic aesthetic
5. ✅ Ensure accessibility (WCAG 2.1 AA compliance)

---

## 📋 Environment Configuration

### **.env Configuration**

```bash
# .env

# ============================================
# BRANDING CONFIGURATION
# ============================================

# Primary Brand Color (Teal)
NEXT_PUBLIC_PRIMARY_COLOR=#14b8a6
NEXT_PUBLIC_SECONDARY_COLOR=#0f766e
NEXT_PUBLIC_ACCENT_COLOR=#06b6d4

# Typography
NEXT_PUBLIC_FONT_FAMILY=Inter,sans-serif
NEXT_PUBLIC_FONT_URL=https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap

# Brand Assets (from tandabuionline.ac.tz)
NEXT_PUBLIC_LOGO_URL=https://tandabuionline.ac.tz/assets/logo.png
NEXT_PUBLIC_LOGO_DARK_URL=https://tandabuionline.ac.tz/assets/logo-dark.png
NEXT_PUBLIC_FAVICON_URL=https://tandabuionline.ac.tz/assets/favicon.ico
NEXT_PUBLIC_INSTITUTION_NAME=Tandabui Polytechnic Institute
NEXT_PUBLIC_INSTITUTION_SHORT_NAME=TPI

# App Branding
NEXT_PUBLIC_APP_NAME=Q-Bridge
NEXT_PUBLIC_APP_TAGLINE=AI-Powered Quality Assurance Management System
NEXT_PUBLIC_APP_DESCRIPTION=Automated quality assurance data collection, analysis, and reporting for Tandabui Polytechnic Institute

# Contact Information
NEXT_PUBLIC_SUPPORT_EMAIL=support@tpi.ac.tz
NEXT_PUBLIC_SUPPORT_PHONE=+255 XXX XXX XXX
NEXT_PUBLIC_INSTITUTION_WEBSITE=https://tandabuionline.ac.tz
```

---

## 🎨 Color Palette

### **Primary Colors (Teal-based)**

```typescript
// tailwind.config.ts

export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',   // Lightest teal
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',  // PRIMARY BRAND COLOR
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',  // Darkest teal
          950: '#042f2e',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',  // Cyan accent
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        success: '#10b981',  // Green
        warning: '#f59e0b',  // Amber
        error: '#ef4444',    // Red
        info: '#3b82f6',     // Blue
      }
    }
  }
}
```

### **Color Usage Guidelines**

```typescript
// Color application rules

Primary (Teal):
- Main navigation
- Primary buttons
- Active states
- Links
- Progress indicators
- Auto-flagged items (≤3) use error red, not primary

Secondary (Blue):
- Secondary buttons
- Hover states
- Badges
- Tags

Accent (Cyan):
- Highlights
- Notifications
- Special features
- AI-powered elements

Semantic Colors:
- Success (Green): Completed items, positive feedback
- Warning (Amber): Pending items, moderate alerts
- Error (Red): Critical items, scores ≤3, errors
- Info (Blue): Informational messages
```

---

## 🔤 Typography Configuration

### **Font Loading (Next.js)**

```typescript
// app/layout.tsx

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

### **Dynamic Font Loading (from .env)**

```typescript
// lib/fonts.ts

export function loadCustomFont() {
  const fontUrl = process.env.NEXT_PUBLIC_FONT_URL
  const fontFamily = process.env.NEXT_PUBLIC_FONT_FAMILY || 'Inter,sans-serif'
  
  if (fontUrl) {
    const link = document.createElement('link')
    link.href = fontUrl
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  
  document.documentElement.style.setProperty('--font-family', fontFamily)
}
```

### **Typography Scale**

```css
/* globals.css */

:root {
  --font-family: var(--font-inter), Inter, sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  
  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}

body {
  font-family: var(--font-family);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}
```

---

## 🖼️ Logo & Favicon Configuration

### **Logo Component (React)**

```typescript
// components/Logo.tsx

import Image from 'next/image'
import { useTheme } from 'next-themes'

export function Logo({ className = '' }: { className?: string }) {
  const { theme } = useTheme()
  
  const logoUrl = theme === 'dark' 
    ? process.env.NEXT_PUBLIC_LOGO_DARK_URL 
    : process.env.NEXT_PUBLIC_LOGO_URL
  
  const institutionName = process.env.NEXT_PUBLIC_INSTITUTION_NAME || 'TPI'
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src={logoUrl || '/logo.png'}
        alt={institutionName}
        width={40}
        height={40}
        className="object-contain"
      />
      <div className="flex flex-col">
        <span className="text-lg font-bold text-primary-600">
          {process.env.NEXT_PUBLIC_APP_NAME || 'Q-Bridge'}
        </span>
        <span className="text-xs text-gray-500">
          {process.env.NEXT_PUBLIC_INSTITUTION_SHORT_NAME || 'TPI'}
        </span>
      </div>
    </div>
  )
}
```

### **Favicon Configuration**

```typescript
// app/layout.tsx

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Q-Bridge',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  icons: {
    icon: process.env.NEXT_PUBLIC_FAVICON_URL || '/favicon.ico',
    apple: process.env.NEXT_PUBLIC_FAVICON_URL || '/apple-touch-icon.png',
  },
}
```

### **PWA Manifest (manifest.json)**

```json
{
  "name": "Q-Bridge - Quality Assurance Management",
  "short_name": "Q-Bridge",
  "description": "AI-Powered Quality Assurance Management System for TPI",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#14b8a6",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 🎨 Logo Design Specifications

### **Logo Requirements**

```
Format: PNG with transparent background
Sizes needed:
- Logo: 200x200px (square)
- Logo wide: 400x100px (horizontal)
- Favicon: 32x32px, 64x64px
- PWA icons: 192x192px, 512x512px
- Apple touch icon: 180x180px

Color variations:
- Full color (on white background)
- White version (on teal background)
- Dark version (on dark backgrounds)
```

### **Logo Design Concept**

```
Q-Bridge Logo Elements:
┌─────────────────────────────────────┐
│                                     │
│   ┌───┐                             │
│   │ Q │  ←  Letter Q (Quality)      │
│   └─┬─┘                             │
│     │  ←  Bridge connecting         │
│   ┌─┴─┐                             │
│   │TPI│  ←  Institution initials    │
│   └───┘                             │
│                                     │
│  Primary Color: Teal (#14b8a6)     │
│  Accent: Cyan (#06b6d4)            │
│  Font: Inter Bold                   │
│                                     │
└─────────────────────────────────────┘

Design notes:
- Modern, clean, professional
- Represents connection (bridge) between quality and institution
- Incorporates AI element (subtle circuit pattern optional)
- Works well at small sizes (favicon)
- Maintains TPI brand identity
```

---

## 🎨 Tailwind Configuration

### **tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#14b8a6',
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',  // PRIMARY
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        secondary: {
          DEFAULT: process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#0f766e',
          // ... shades
        },
      },
      fontFamily: {
        sans: [
          process.env.NEXT_PUBLIC_FONT_FAMILY || 'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config
```

---

## 🌓 Dark Mode Support

### **Theme Toggle**

```typescript
// components/ThemeToggle.tsx

'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-primary-500" />
      ) : (
        <Moon className="w-5 h-5 text-primary-500" />
      )}
    </button>
  )
}
```

### **Dark Mode Colors**

```css
/* globals.css */

:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --primary: #14b8a6;
}

.dark {
  --background: #0f172a;
  --foreground: #f8fafc;
  --primary: #2dd4bf;  /* Lighter teal for dark mode */
}
```

---

## 📱 Responsive Logo Behavior

```typescript
// components/ResponsiveLogo.tsx

export function ResponsiveLogo() {
  return (
    <>
      {/* Mobile: Icon only */}
      <div className="md:hidden">
        <Image src="/logo-icon.png" alt="Q-Bridge" width={32} height={32} />
      </div>
      
      {/* Desktop: Full logo with text */}
      <div className="hidden md:flex items-center gap-3">
        <Image src="/logo.png" alt="Q-Bridge" width={40} height={40} />
        <span className="text-xl font-bold text-primary-600">
          Q-Bridge
        </span>
      </div>
    </>
  )
}
```

---

## 🎨 Component Theming Examples

### **Primary Button**

```typescript
// components/Button.tsx

export function Button({ children, variant = 'primary' }) {
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50',
  }
  
  return (
    <button className={`px-4 py-2 rounded-lg font-medium ${variants[variant]}`}>
      {children}
    </button>
  )
}
```

### **Dashboard Card**

```typescript
// components/DashboardCard.tsx

export function DashboardCard({ title, value, status }) {
  const statusColors = {
    success: 'bg-green-50 border-green-500 text-green-700',
    warning: 'bg-amber-50 border-amber-500 text-amber-700',
    error: 'bg-red-50 border-red-500 text-red-700',
    info: 'bg-primary-50 border-primary-500 text-primary-700',
  }
  
  return (
    <div className={`p-6 rounded-lg border-l-4 ${statusColors[status]}`}>
      <h3 className="text-sm font-medium opacity-75">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  )
}
```

---

## ✅ Branding Checklist

- [ ] `.env` configured with brand colors
- [ ] Logo files obtained from tandabuionline.ac.tz
- [ ] Favicon created and configured
- [ ] PWA icons generated (192x192, 512x512)
- [ ] Font family configured
- [ ] Tailwind config updated with brand colors
- [ ] Logo component created
- [ ] Dark mode logo variant prepared
- [ ] Theme toggle implemented
- [ ] Responsive logo behavior tested
- [ ] All UI components use theme colors
- [ ] Accessibility tested (color contrast)
- [ ] Brand guidelines documented

---

## 🎯 Summary

**Q-Bridge branding is fully configurable via .env:**

```bash
# Primary brand color: Teal
NEXT_PUBLIC_PRIMARY_COLOR=#14b8a6

# Logo and favicon from TPI website
NEXT_PUBLIC_LOGO_URL=https://tandabuionline.ac.tz/assets/logo.png
NEXT_PUBLIC_FAVICON_URL=https://tandabuionline.ac.tz/assets/favicon.ico

# Typography
NEXT_PUBLIC_FONT_FAMILY=Inter,sans-serif
```

**Benefits:**
- ✅ Consistent TPI branding
- ✅ Easy to update without code changes
- ✅ Multi-tenant ready (future)
- ✅ Professional academic aesthetic
- ✅ Accessible color combinations
- ✅ Dark mode support

**Ready for implementation!** 🎨

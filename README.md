# CTI Summit 2025 - CISO Conclave Landing Page

A modern, animated single-page landing website for the Cyber Threat Intelligence Summit 2025 - CISO Conclave event, featuring scroll-triggered animations, loading effects, and a beautiful responsive design.

## 🚀 Features

### Frontend
- ✅ Modern React 19 + TypeScript + Vite
- ✅ Tailwind CSS with Dark Theme
- ✅ Single-Page Application (SPA)
- ✅ Scroll-Triggered Animations
- ✅ Loading Screen with Animations
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Smooth Scroll Navigation
- ✅ Interactive Hover Effects
- ✅ Lucide React Icons

### Sections
- ✅ Hero Section with Animated Background
- ✅ Features Section
- ✅ About Section with Central Topic & Theme
- ✅ Featured Speakers Section
- ✅ Event Schedule Section
- ✅ Sponsors Section
- ✅ Registration Form Section
- ✅ Footer with Social Links

### Animations
- ✅ Page Loading Animation
- ✅ Intersection Observer for Scroll Animations
- ✅ Staggered Card Animations
- ✅ Fade-in and Slide-up Effects
- ✅ Floating Background Orbs
- ✅ Button Hover Effects
- ✅ Smooth Transitions

## 📁 Project Structure

```
CTIsummit/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── pages/
│   │   │   └── CTISummitLanding.tsx    # Main landing page component
│   │   ├── App.tsx                     # App entry point
│   │   ├── main.tsx                    # React DOM root
│   │   └── index.css                   # Global styles & animations
│   ├── public/                         # Static assets
│   ├── index.html                      # HTML template
│   └── package.json
│
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will run on `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 🎨 Design Features

### Color Scheme
- Primary Background: `#0A0E23` (Dark Navy)
- Secondary Background: `#0F172A` (Darker Navy)
- Accent Colors: Blue (`#3b82f6`) and Purple (`#8b5cf6`)
- Text: White/Gray scale

### Typography
- Primary Font: Source Sans Pro
- Display Font: Playfair Display (for headings)

### Animations
- **Loading Screen**: Spinning shield icon with gradient text
- **Hero Section**: Sequential fade-in animations with delays
- **Sections**: Fade-up animations triggered on scroll
- **Cards**: Staggered animations with individual delays
- **Schedule Items**: Slide-in from left with progressive delays
- **Buttons**: Scale and transform effects on hover

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎯 Event Information

- **Event Name**: CTI Summit 2025 - CISO Conclave
- **Date**: December 3, 2025
- **Location**: Mcs Qasid Complex, Rawalpindi
- **Duration**: 1 Day
- **Target Audience**: Chief Information Security Officers, cybersecurity professionals, threat intelligence analysts

### Central Topic
"Navigating the Evolving Cyber Threat Landscape: Strategic Intelligence, Proactive Defense, and Executive Leadership in the Age of Advanced Persistent Threats"

### Theme & Scope
- Strategic Threat Intelligence
- Advanced Persistent Threats (APTs)
- AI-Powered Security
- Zero Trust Architecture
- Incident Response & Crisis Management
- Regulatory Compliance & Risk Management
- Supply Chain Security
- Executive Leadership

## 🚦 Running the Application

1. Install dependencies: `cd frontend && npm install`
2. Start development server: `npm run dev`
3. Open browser: `http://localhost:5173`

## 📝 Key Components

### CTISummitLanding Component
Main landing page component featuring:
- Loading state management
- Scroll detection for navbar
- Intersection Observer for section animations
- All event sections and content

### Animation System
- Uses Intersection Observer API for performance
- CSS transitions and transforms
- Staggered delays for sequential animations
- Smooth scroll behavior

## 📚 Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 7.1.6** - Build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Lucide React 0.544.0** - Icon library
- **React Router DOM 7.9.1** - Routing (for navigation)

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🎬 Animation Details

### Loading Animation
- Duration: 1.5 seconds
- Spinning border with shield icon
- Gradient text pulse
- Smooth fade-out transition

### Scroll Animations
- Trigger: When section enters viewport (50px margin)
- Duration: 1000ms for sections, 700ms for cards
- Effects: Fade + Translate (up/down/left/right)
- Stagger: 50-150ms delays between items

### Hover Effects
- Buttons: Scale to 105% with arrow slide
- Cards: Lift up 8px with enhanced shadow
- Smooth transitions: 300ms cubic-bezier

## 🔧 Customization

### Update Event Details
Edit `frontend/src/pages/CTISummitLanding.tsx`:
- Change date, location, speakers
- Update schedule items
- Modify sponsors
- Edit central topic and theme

### Styling
- Global styles: `frontend/src/index.css`
- Tailwind config: `frontend/tailwind.config.js`
- Component styles: Inline Tailwind classes

### Colors
Update color scheme in:
- Component classes (bg-[#0A0E23], etc.)
- CSS custom properties (if added)
- Tailwind config for theme colors

## 📦 Build Output

Production build creates optimized files in `frontend/dist/`:
- Minified JavaScript
- Optimized CSS
- Compressed assets
- HTML with asset references

## 🚀 Deployment

### Netlify
The project includes `netlify.toml` for easy Netlify deployment:
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Other Platforms
1. Build: `npm run build`
2. Upload `dist/` folder to your hosting provider
3. Configure SPA routing (all routes → index.html)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues or questions about the CTI Summit 2025 landing page, please contact the development team.

## 📅 Event Details

**CTI Summit 2025 - CISO Conclave**
- Date: December 3, 2025
- Location: Mcs Qasid Complex, Rawalpindi
- Website: [Your Website URL]

---

Built with ❤️ for CTI Summit 2025

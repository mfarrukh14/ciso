# NextGen Forex Systems

A modern, professional forex trading platform built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🚀 **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- 🌙 **Dark/Light Mode**: Seamless theme switching with system preference detection
- 🔐 **Authentication**: Complete auth system with protected routes
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🎨 **Beautiful UI**: Professional trading platform interface
- ⚡ **Fast Performance**: Optimized with Vite for lightning-fast development
- 🛡️ **Type Safety**: Full TypeScript support for better development experience

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Main navigation header
│   ├── Footer.tsx      # Site footer
│   ├── Layout.tsx      # Main layout wrapper
│   └── ThemeToggle.tsx # Theme switcher component
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state management
│   └── ThemeContext.tsx # Theme state management
├── pages/              # Page components
│   ├── website/        # Public website pages
│   │   ├── Home.tsx    # Landing page
│   │   ├── About.tsx   # About page
│   │   ├── Trading.tsx # Trading platform page
│   │   └── Contact.tsx # Contact page
│   ├── auth/           # Authentication pages
│   │   ├── Login.tsx   # Login page
│   │   └── Register.tsx # Registration page
│   └── dashboard/      # Protected dashboard pages
│       ├── Dashboard.tsx # Main dashboard
│       └── Portfolio.tsx # Portfolio management
├── services/           # API services
│   └── auth.ts         # Authentication API calls
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types
└── utils/              # Utility functions
    └── constants.ts    # App constants and configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TxWebsite
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_APP_NAME=NextGen Forex Systems
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_VERSION=1.0.0
```

## Features Overview

### 🏠 Public Website
- **Home**: Landing page with hero section, features, and call-to-action
- **About**: Company information, team, and values
- **Trading**: Trading platform overview and features
- **Contact**: Contact form and company information

### 🔐 Authentication
- **Login**: Secure user authentication
- **Register**: User registration with validation
- **Protected Routes**: Automatic redirection for authenticated users

### 📊 Dashboard
- **Dashboard**: Overview of trading performance and quick actions
- **Portfolio**: Detailed portfolio management and position tracking

### 🎨 UI/UX Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Smooth Animations**: Polished interactions and transitions
- **Professional Design**: Clean, modern interface suitable for financial applications

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Context API
- **HTTP Client**: Fetch API

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@nextgenforex.com or visit our contact page.
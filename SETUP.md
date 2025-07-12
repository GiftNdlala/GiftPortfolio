# GiftPortfolio Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory with your Supabase credentials:

```env
# Supabase Configuration
# Get these values from your Supabase project dashboard
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: Service role key for admin functions (server-side only)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### 3. Get Supabase Credentials
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Go to Settings → API
4. Copy the "Project URL" and "anon public" key
5. Paste them in your `.env.local` file

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio!

## 📁 Project Structure

```
GiftPortfolio/
├── components/          # React components
│   ├── analytics/       # Analytics tracking
│   ├── layout/          # Layout components
│   ├── projects/        # Project-related components
│   └── ui/              # Reusable UI components
├── lib/                 # API and utility functions
├── pages/               # Next.js pages
├── styles/              # Global styles
├── middleware.js        # Next.js middleware for auth
└── package.json         # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Features

- ✅ **Dynamic Portfolio** - Real data from Supabase
- ✅ **Project Showcase** - Display your projects with details
- ✅ **Skills Display** - Organized by categories with proficiency levels
- ✅ **Contact Form** - Functional contact form with backend integration
- ✅ **Analytics Tracking** - Page views and link clicks
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Modern UI** - Clean, professional design

## 🐛 Troubleshooting

### "Missing script: dev"
Make sure you've run `npm install` to install dependencies.

### "Environment variables not found"
Create a `.env.local` file with your Supabase credentials.

### "API calls failing"
Check that your Supabase project has the required tables and Edge Functions set up.

## 📚 Next Steps

1. **Customize Content** - Update projects, skills, and profile information
2. **Add Images** - Upload project screenshots and profile images
3. **Deploy** - Deploy to Vercel, Netlify, or your preferred platform
4. **Analytics** - Monitor your portfolio's performance
5. **Admin Panel** - Set up authentication for content management 
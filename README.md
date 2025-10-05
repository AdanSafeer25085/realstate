# Helios Land - Real Estate Website

A modern real estate website built with Next.js, featuring property listings and contact forms for SCO plots, commercial, and residential properties in Gurgaon.

## Features

### User-Facing Features
- Property listings (Commercial, Residential, SCO Plots)
- Featured project showcase
- Contact forms with inquiry submission
- Responsive design with mobile support
- WhatsApp and phone integration
- Property details with external links


## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel ready

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Main website: http://localhost:3000

## Project Structure

```
├── components/
│   ├── Layout.js        # Main layout wrapper
│   ├── PropertyCard.js  # Property card component
│   ├── PropertySlider.js # Property carousel
│   ├── Header.js        # Navigation header
│   └── Footer.js        # Site footer
├── data/
│   └── properties.js    # Static property data
├── pages/
│   ├── about.js         # About page
│   ├── commercial.js    # Commercial properties
│   ├── contact.js       # Contact form
│   ├── index.js         # Homepage
│   ├── property/        # Property detail pages
│   ├── residential.js   # Residential properties
│   └── sco-plots.js     # SCO plots page
├── public/
│   └── images/          # Static images
├── styles/
│   └── globals.css      # Global styles and Tailwind
└── .env.local.example   # Environment variables template
```


## Configuration

### Brand Colors
- Primary Gold: `#FFD93D`
- Dark Blue: `#134686`
- Light Gray: `#F8F9FA`

### Contact Information
Update in `.env.local`:
- `NEXT_PUBLIC_PHONE`
- `NEXT_PUBLIC_WHATSAPP`
- `NEXT_PUBLIC_EMAIL`
- `NEXT_PUBLIC_BUSINESS_NAME`
- `NEXT_PUBLIC_OFFICE_ADDRESS`

## Deployment

### Vercel Deployment
1. Push to GitHub repository
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_PHONE=+919811677423
NEXT_PUBLIC_WHATSAPP=919811677423
NEXT_PUBLIC_EMAIL=your_email@domain.com
NEXT_PUBLIC_BUSINESS_NAME=Your Business Name
NEXT_PUBLIC_OFFICE_ADDRESS=Your Office Address
```

## Support

For issues or questions:
- Check the console for error messages
- Ensure all environment variables are set correctly

## License

This project is built for Helios Land real estate business.
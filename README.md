# Portfolio Website

A modern portfolio website for Melnar Ancit Cordova, built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: lucide-react

## Project Structure

```
portfolio-website/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── data/                 # Static data files
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy the environment variables template:

```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` with your values

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Environment Variables

See `.env.example` for required environment variables:

- `AUTH_TOKEN`: Secure token for authentication
- `ADMIN_PASSWORD`: Admin password for resume download
- `RESEND_API_KEY`: API key for email service
- `CONTACT_EMAIL`: Email address for contact form submissions

## Features

- 🎨 Modern dark theme with neon green accents
- 📱 Fully responsive design
- ⚡ Static site generation for optimal performance
- 🔒 Protected resume download with authentication
- 📧 Contact form with email integration
- 📝 Blog with markdown support
- ♿ Accessibility-focused components

## License

Private - All rights reserved

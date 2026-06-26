# AskWinFlow

![Next.js](https://img.shields.io/badge/Next.js-16.2.7-black)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4)

## What this project does

Ask WinFlow is a structured Q&A and Knowledge-sharing platform where professionals, educators and tech enthusiasts share and refine ideas through organized discussions. It supports threaded comments, voting, file attachments (PDFs, presentation links, images) and collaborative conversations.

- Email/password and Google sign-in flows
- Email verification, password reset, and session-based auth
- Guided onboarding with role selection, goals, and topics
- Protected user routes such as `/feed`, `/profile`, and `/onboarding`

The front end is built with Next.js 16, React 19, TypeScript, Tailwind CSS, and a custom API integration layer.

## Why AskWinFlow is useful

AskWinFlow is useful for building user-centric web apps that need:

- Fast auth setup with both email and third-party Google login
- Clear onboarding flow for profile completion
- User session management via cookies and middleware route protection
- A polished marketing style landing page

## Key features

- Sign up and sign in pages with validation
- Google authentication redirect support
- Email verification flow (`/verify-email`)
- Forgot password and reset password flows
- Onboarding pages for `role`, `goals`, and `topics`
- Protected routes using
- API wrapper and error normalization

## Getting started

### Prerequisites

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Add environment variables

Create a `.env.local` file and set at least:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.example.com
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for production

```bash
npm run build
npm run start
```

## Project structure

- `app/` - main Next.js application entry points and routes
- `app/components/` - reusable UI components and onboarding screens
- `app/lib/` - client utilities for auth, API requests, and redirects
- `services/` - service modules for auth, onboarding, and profile operations
- `public/` - static assets used by the UI
- `package.json` - project scripts and dependencies

## Common commands

- `npm run dev` - start the development server
- `npm run build` - build the production app
- `npm run start` - run the built app
- `npm run lint` - run ESLint checks

## How to use

After startup, use these routes for the main flows:

- `/` - landing page
- `/sign-up` - create a new account
- `/sign-in` - log in to an existing account
- `/verify-email` - complete email verification
- `/forgot-password` - request a password reset
- `/reset-password` - reset a forgotten password
- `/onboarding` - complete user onboarding
- `/feed` - protected authenticated content
- `/profile` - protected profile page

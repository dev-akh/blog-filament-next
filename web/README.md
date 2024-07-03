This is a Frontend Project using [Next.js](https://nextjs.org/).
# Blog Site
- Git clone `https://github.com/dev-akh/blog-filament-next.git`
- Go to `<project-path>/blog-filament-next/web` directory

## Getting Started
- Copy `.env.local.example` to `.env.local` ( local development)
- Copy `.env.local.example` to `.env.staging` ( build project)
- Copy `.env.local.example` to `.env.prod` ( build project for production)

* Make sure the API endpoint in .env.local file ( as local development) *
- Example `http://localhost:8000` ( Laravel running endpoint)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features
- Show the listing of bologs
- Can change theme as dark or white mode
- User Login | Logout | Profile


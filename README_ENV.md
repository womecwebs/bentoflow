# BentoFlow Pro - Environment Variables Guide

This document outlines the required environment variables for BentoFlow Pro to function correctly.

## Required Variables

### Supabase Configuration
These are required for authentication, database access, and storage.
- `VITE_SUPABASE_URL`: Your Supabase project URL (e.g., `https://xyz.supabase.co`).
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous API key.

### Payment Integration (ClickPesa)
Required for processing marketplace transactions and Pro upgrades.
- `CLICKPESA_KEY`: Your ClickPesa API key.
- `CLICKPESA_SECRET`: Your ClickPesa API secret.

### AI Integration (Google Gemini)
Required for the AI Bento Builder and SEO tools.
- `GEMINI_API_KEY`: Your Google Gemini API key.

## Setup Instructions

1. **Supabase**:
   - Create a project at [supabase.com](https://supabase.com).
   - Run the `supabase_schema.sql` script in the SQL Editor.
   - Enable Storage and create a bucket named `grid-previews` with public access.

2. **ClickPesa**:
   - Register at [clickpesa.com](https://clickpesa.com).
   - Obtain your API keys from the developer dashboard.

3. **Gemini**:
   - Get an API key from [aistudio.google.com](https://aistudio.google.com).

## Security Note
Never expose your `CLICKPESA_SECRET` or `GEMINI_API_KEY` in frontend code. These should only be used in the `server.ts` or via secure backend proxies.

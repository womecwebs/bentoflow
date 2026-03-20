-- Supabase Schema for BentoFlow Pro

-- 1. PROFILES TABLE
-- Stores additional user data linked to Supabase Auth
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  sites_created INTEGER DEFAULT 0,
  is_pro BOOLEAN DEFAULT false,
  balance NUMERIC(10, 2) DEFAULT 0.00,
  last_published_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 2. TEMPLATES TABLE
-- Stores the marketplace items
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) DEFAULT 0.00,
  is_premium BOOLEAN DEFAULT false,
  category TEXT,
  config_json JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on templates
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Templates are viewable by everyone." ON public.templates;
DROP POLICY IF EXISTS "Admins can manage templates." ON public.templates;

-- Templates Policies
CREATE POLICY "Templates are viewable by everyone." ON public.templates
  FOR SELECT USING (true);

-- Note: Insert/Update/Delete usually restricted to service_role or admin dashboard
CREATE POLICY "Admins can manage templates." ON public.templates
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- 3. PURCHASES TABLE
-- Links users to the templates they have bought
CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  template_id UUID REFERENCES public.templates NOT NULL,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  
  -- Prevent duplicate purchases for the same template
  UNIQUE(user_id, template_id)
);

-- Enable RLS on purchases
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own purchases." ON public.purchases;
DROP POLICY IF EXISTS "Service role can manage all purchases." ON public.purchases;

-- Purchases Policies
CREATE POLICY "Users can view their own purchases." ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Note: Insertions usually happen via server-side webhook (service_role)
CREATE POLICY "Service role can manage all purchases." ON public.purchases
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- 4. AUTOMATION: Create profile on signup
-- Trigger function to automatically create a profile entry when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run the function
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to increment sites_created
CREATE OR REPLACE FUNCTION public.increment_sites_created(user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET sites_created = sites_created + 1
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. COMMUNITY GRIDS TABLE
-- Stores the bento grids shared by the community
CREATE TABLE IF NOT EXISTS public.community_grids (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'SaaS',
  image_url TEXT NOT NULL,
  grid_json JSONB NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  upvotes INTEGER DEFAULT 0,
  is_for_sale BOOLEAN DEFAULT false,
  price NUMERIC(10, 2) DEFAULT 0.00,
  allow_hiring BOOLEAN DEFAULT false,
  is_promoted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on community_grids
ALTER TABLE public.community_grids ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Community grids are viewable by everyone." ON public.community_grids;
DROP POLICY IF EXISTS "Users can insert their own community grids." ON public.community_grids;
DROP POLICY IF EXISTS "Users can update their own community grids." ON public.community_grids;
DROP POLICY IF EXISTS "Users can delete their own community grids." ON public.community_grids;
DROP POLICY IF EXISTS "Anyone can upvote grids." ON public.community_grids;

-- Community Grids Policies
CREATE POLICY "Community grids are viewable by everyone." ON public.community_grids
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own community grids." ON public.community_grids
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own community grids." ON public.community_grids
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own community grids." ON public.community_grids
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can upvote grids." ON public.community_grids
  FOR UPDATE
  USING (true);

CREATE POLICY "Admins can manage all grids." ON public.community_grids
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- 6. SALES TABLE
-- Tracks marketplace transactions
CREATE TABLE IF NOT EXISTS public.sales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id UUID REFERENCES auth.users(id) NOT NULL,
  seller_id UUID REFERENCES auth.users(id) NOT NULL,
  grid_id UUID REFERENCES public.community_grids(id) NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  platform_fee NUMERIC(10, 2) NOT NULL,
  seller_share NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on sales
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

-- Sales Policies
DROP POLICY IF EXISTS "Users can view own sales" ON public.sales;
CREATE POLICY "Users can view own sales" ON public.sales 
  FOR SELECT USING (auth.uid() = seller_id OR auth.uid() = buyer_id);

DROP POLICY IF EXISTS "Users can record their own purchases" ON public.sales;
CREATE POLICY "Users can record their own purchases" ON public.sales
  FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Function to increment user balance
CREATE OR REPLACE FUNCTION public.increment_balance(user_id UUID, amount NUMERIC)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET balance = balance + amount
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. PAYOUT REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.payout_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  account_number TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on payout_requests
ALTER TABLE public.payout_requests ENABLE ROW LEVEL SECURITY;

-- Payout Requests Policies
DROP POLICY IF EXISTS "Users can view own payout requests" ON public.payout_requests;
CREATE POLICY "Users can view own payout requests" ON public.payout_requests 
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create payout requests" ON public.payout_requests;
CREATE POLICY "Users can create payout requests" ON public.payout_requests 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 9. STORAGE BUCKETS
-- Note: These must be created in the Supabase Dashboard
-- Bucket: grid-previews

-- We can't easily create buckets via SQL in the public schema, 
-- but we can define policies for the storage.objects table.
-- Run these in your Supabase SQL Editor:

/*
-- 1. Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('grid-previews', 'grid-previews', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Drop existing storage policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own previews" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own previews" ON storage.objects;
DROP POLICY IF EXISTS "Owner Delete" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;

-- 3. Allow public access to view images
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'grid-previews');

-- 4. Allow users to upload images to their own folder
CREATE POLICY "Users can upload their own previews" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'grid-previews' AND 
    (auth.uid())::text = (storage.foldername(name))[1]
  );

-- 5. Allow users to update their own previews
CREATE POLICY "Users can update their own previews" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'grid-previews' AND 
    (auth.uid())::text = (storage.foldername(name))[1]
  );

-- 6. Allow users to delete their own images
CREATE POLICY "Owner Delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'grid-previews' AND 
    (auth.uid())::text = (storage.foldername(name))[1]
  );
*/

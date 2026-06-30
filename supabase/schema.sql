-- Pamushika IN — Phase 1 schema (Supabase)
-- Paste this whole file into the Supabase SQL Editor (Project > SQL Editor > New query) and run it.
-- Safe to re-run: drops and recreates these 4 tables only.

drop table if exists vendor_posts;
drop table if exists products;
drop table if exists vendors;
drop table if exists healthy_tips;

-- ============================================================
-- Tables
-- ============================================================

create table vendors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  lat double precision,
  lng double precision,
  rating numeric not null default 0,
  review_count int not null default 0,
  categories text[] not null default '{}',
  verified boolean not null default false,
  plan text not null default 'Starter',
  created_at timestamptz not null default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references vendors(id) on delete cascade,
  name text not null,
  category text not null,
  price numeric not null,
  unit text not null,
  in_stock boolean not null default true,
  image_url text,
  description text,
  nutrition jsonb not null default '{}'::jsonb,
  benefits text[] not null default '{}',
  rating numeric not null default 0,
  created_at timestamptz not null default now()
);

create table vendor_posts (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references vendors(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  title text not null,
  body text not null,
  views int not null default 0,
  replies int not null default 0,
  created_at timestamptz not null default now()
);

create table healthy_tips (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  title text not null,
  description text not null,
  image_url text,
  published_at date not null default current_date
);

-- ============================================================
-- Row Level Security — public read-only catalog for Phase 1.
-- Owner-scoped writes arrive in Phase 2 once Firebase Auth supplies
-- a real auth.jwt()->>'sub' to check against.
-- ============================================================

alter table vendors enable row level security;
alter table products enable row level security;
alter table vendor_posts enable row level security;
alter table healthy_tips enable row level security;

create policy "Public read access" on vendors for select using (true);
create policy "Public read access" on products for select using (true);
create policy "Public read access" on vendor_posts for select using (true);
create policy "Public read access" on healthy_tips for select using (true);

-- ============================================================
-- Seed data — transcribed from src/data/mockData.ts and the
-- hardcoded posts array in src/screens/VendorPosts.tsx, so the
-- app looks identical to the mock version on first run.
-- Fixed UUIDs so vendor_posts/products can reference vendors
-- deterministically, and so the app can pin a "demo vendor"
-- (see src/services/vendors.ts DEMO_VENDOR_ID) until Phase 2 auth
-- replaces it with the logged-in vendor's real id.
-- ============================================================

insert into vendors (id, name, location, rating, review_count, categories, verified, plan) values
  ('11111111-1111-1111-1111-111111111111', 'Green Market Fresh',     'Avondale, Harare',      4.8, 124, array['Fruits','Vegetables','Herbs & Spices'],     true,  'Premium'),
  ('22222222-2222-2222-2222-222222222222', 'African Heritage Foods', 'Mbare, Harare',         4.9, 89,  array['Indigenous Foods','Grains & Cereals'],      true,  'Growth'),
  ('33333333-3333-3333-3333-333333333333', 'Organic Farm Co.',       'Mount Pleasant, Harare', 4.6, 67,  array['Fruits','Vegetables','Organic Foods'],      true,  'Growth'),
  ('44444444-4444-4444-4444-444444444444', 'Local Harvest Market',   'Borrowdale, Harare',    4.5, 42,  array['Fruits','Vegetables'],                      false, 'Starter');

insert into products (id, vendor_id, name, category, price, unit, image_url, description, nutrition, benefits, rating) values
  ('a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Fresh Ginger', 'Herbs & Spices', 0.50, 'per 100g',
    'https://images.unsplash.com/photo-1606854428728-5fe3eea23475?w=400',
    'Fresh organic ginger root, perfect for cooking and tea',
    '{"vitamins":["Vitamin C","Vitamin B6"],"minerals":["Potassium","Magnesium","Copper"],"protein":"1.8g","fiber":"2.0g"}',
    array['Supports immunity','Aids digestion','Anti-inflammatory properties','Helps with nausea'], 4.8),

  ('a2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Moringa Leaves', 'Indigenous Foods', 2.00, 'per bunch',
    'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400',
    'Fresh moringa leaves, a superfood packed with nutrients',
    '{"vitamins":["Vitamin A","Vitamin C","Vitamin E"],"minerals":["Calcium","Iron","Potassium"],"protein":"9.4g","fiber":"2.0g"}',
    array['Rich in antioxidants','Supports healthy blood sugar levels','Reduces inflammation','Provides essential amino acids'], 4.9),

  ('a3333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Sweet Potatoes', 'Vegetables', 1.50, 'per kg',
    'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400',
    'Orange-fleshed sweet potatoes, rich in beta-carotene',
    '{"vitamins":["Vitamin A","Vitamin C","Vitamin B6"],"minerals":["Potassium","Manganese"],"protein":"2.0g","fiber":"3.0g"}',
    array['Excellent source of beta-carotene','Supports eye health','Regulates blood sugar','High in fiber'], 4.7),

  ('a4444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'Baobab Fruit', 'Indigenous Foods', 3.00, 'per fruit',
    'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400',
    'Nutrient-dense baobab fruit, known as the ''Tree of Life''',
    '{"vitamins":["Vitamin C","Vitamin B6"],"minerals":["Calcium","Potassium","Magnesium"],"protein":"2.3g","fiber":"50g"}',
    array['Rich in Vitamin C','Supports gut health','Boosts energy levels','Antioxidant powerhouse'], 5.0),

  ('a5555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333', 'Fresh Avocados', 'Fruits', 0.80, 'each',
    'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
    'Creamy Hass avocados, perfectly ripe',
    '{"vitamins":["Vitamin K","Vitamin E","Vitamin C","B Vitamins"],"minerals":["Potassium","Magnesium"],"protein":"2.0g","fiber":"6.7g"}',
    array['Heart-healthy fats','Supports weight management','Rich in nutrients','Improves cholesterol levels'], 4.6),

  ('a6666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', 'Pumpkin Leaves', 'Vegetables', 1.00, 'per bunch',
    'https://images.unsplash.com/photo-1591271942183-6d5eca7ff60f?w=400',
    'Fresh pumpkin leaves, a staple in African cuisine',
    '{"vitamins":["Vitamin A","Vitamin C","Vitamin K"],"minerals":["Calcium","Iron","Magnesium"],"protein":"3.5g","fiber":"2.3g"}',
    array['Supports vision health','Strengthens bones','Boosts immune system','Rich in antioxidants'], 4.5),

  ('a7777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'Fresh Okra', 'Vegetables', 1.20, 'per 500g',
    'https://images.unsplash.com/photo-1599492812550-27f8aa91fca6?w=400',
    'Tender okra pods, fresh from the farm',
    '{"vitamins":["Vitamin C","Vitamin K","Folate"],"minerals":["Magnesium","Calcium"],"protein":"2.0g","fiber":"3.2g"}',
    array['Supports digestive health','Helps control blood sugar','Heart-healthy','Low in calories'], 4.4),

  ('a8888888-8888-8888-8888-888888888888', '22222222-2222-2222-2222-222222222222', 'Pearl Millet', 'Grains & Cereals', 2.50, 'per kg',
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    'Whole grain pearl millet, gluten-free and nutritious',
    '{"vitamins":["B Vitamins","Niacin"],"minerals":["Iron","Magnesium","Phosphorus"],"protein":"11.0g","fiber":"8.5g"}',
    array['Gluten-free grain','Rich in protein','Supports heart health','Good for diabetics'], 4.8);

insert into vendor_posts (vendor_id, product_id, title, body, views, replies) values
  ('11111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111',
    'Fresh ginger restocked', 'Organic ginger roots are ready for pickup today. Great for tea, soups, and marinades.', 84, 12),
  ('11111111-1111-1111-1111-111111111111', 'a3333333-3333-3333-3333-333333333333',
    'Weekend harvest bundle', 'Sweet potatoes, pumpkin leaves, and seasonal herbs packed for family meals.', 126, 18),
  ('11111111-1111-1111-1111-111111111111', 'a6666666-6666-6666-6666-666666666666',
    'Cooking tip: pumpkin leaves', 'Wash, slice, and simmer gently with tomatoes and peanut butter for a rich local dish.', 203, 27);

insert into healthy_tips (type, title, description, image_url) values
  ('fruit', 'Fruit of the Day: Baobab', 'Known as the ''Tree of Life'', baobab fruit is packed with Vitamin C and supports gut health.',
    'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400'),
  ('vegetable', 'Vegetable of the Day: Pumpkin Leaves', 'A traditional African vegetable rich in vitamins A, C, and K. Perfect for soups and stews.',
    'https://images.unsplash.com/photo-1591271942183-6d5eca7ff60f?w=400'),
  ('indigenous', 'Indigenous Spotlight: Moringa', 'This superfood has been used in African traditional medicine for centuries. It''s one of the most nutrient-dense plants.',
    'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400'),
  ('recipe', 'Healthy Recipe: Moringa Smoothie', 'Blend fresh moringa leaves with banana, mango, and yogurt for a nutritious breakfast.',
    'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400'),
  ('tip', 'Nutrition Tip', 'Eat a variety of colorful fruits and vegetables daily to ensure you get all essential vitamins and minerals.',
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400');

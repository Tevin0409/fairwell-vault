-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Messages Table
create table messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null, -- Enforce Name Required
  message text not null,
  type text default 'personal', -- 'personal' or 'stanley'
  is_favorite boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Videos Table
create table videos (
  id uuid default uuid_generate_v4() primary key,
  name text not null, -- Enforce Name Required
  url text not null,
  public_id text not null,
  is_favorite boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table messages enable row level security;
alter table videos enable row level security;

-- Policies for Messages
create policy "Public messages are insertable"
  on messages for insert
  with check (true);

-- Policies for Videos
create policy "Public videos are insertable"
  on videos for insert
  with check (true);

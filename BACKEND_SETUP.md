# Icebrag Backend Setup (Supabase)

This document explains how the backend for Icebrag is configured using Supabase.  
It includes database schema, RLS policies, test data insertion, and how the frontend should connect.

---

##  1. Supabase Project

A Supabase project was created at:  
- **Project Name:** icebrag  
- **Region:** Singapore  

---

##  2. Database Table: `questions`

Use the following SQL to create the table:

```sql
create extension if not exists "uuid-ossp";

create table if not exists questions (
  id uuid primary key default uuid_generate_v4(),
  text text not null,
  category text not null check (category in ('funny', 'professional', 'deep', 'other')),
  votes integer default 0,
  created_at timestamp with time zone default now(),
  created_by text
);

alter table questions enable row level security;

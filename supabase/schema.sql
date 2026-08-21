create table if not exists public.students (
  id text primary key,
  name text not null,
  date_of_birth date,
  gender text,
  class text,
  stream text,
  year integer default extract(year from now()),
  guardian text,
  guardian_phone text,
  address text,
  admission_date date,
  status text default 'Active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.students enable row level security;

create policy "Authenticated users can read students"
on public.students for select to authenticated using (true);

create policy "Authenticated users can insert students"
on public.students for insert to authenticated with check (true);

create policy "Authenticated users can update students"
on public.students for update to authenticated using (true) with check (true);

create policy "Authenticated users can delete students"
on public.students for delete to authenticated using (true);

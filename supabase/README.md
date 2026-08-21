# Supabase setup

1. Open your Supabase project.
2. Open **SQL Editor**.
3. Run `schema.sql`.
4. In Supabase **Authentication**, enable Email authentication.
5. Add the application's Supabase URL and anon/publishable key to the application's environment/configuration.

The `students` table is protected by Row Level Security. Only authenticated users can read, insert, update, or delete student records.

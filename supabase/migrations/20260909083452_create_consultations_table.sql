/*
# Create consultations table

## Purpose
Stores consultation booking requests made by students through the student portal.
This is a single-tenant app with no sign-in screen, so anon-key access is required.

## New Tables
- `consultations`
  - `id` (uuid, primary key)
  - `student_name` (text, not null) — full name of the student
  - `student_index` (text, not null) — university index/registration number
  - `lecturer` (text, not null) — selected academic staff member
  - `appointment_at` (timestamptz, not null) — chosen date and time
  - `reason` (text, not null) — reason for the consultation
  - `status` (text, default 'pending') — booking status for future lecturer view
  - `created_at` (timestamptz, default now())

## Security
- Enable RLS on `consultations`.
- Allow anon + authenticated CRUD since the student portal has no sign-in screen.
*/

CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  student_index text NOT NULL,
  lecturer text NOT NULL,
  appointment_at timestamptz NOT NULL,
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_consultations" ON consultations;
CREATE POLICY "anon_select_consultations" ON consultations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_consultations" ON consultations;
CREATE POLICY "anon_insert_consultations" ON consultations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_consultations" ON consultations;
CREATE POLICY "anon_update_consultations" ON consultations FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_consultations" ON consultations;
CREATE POLICY "anon_delete_consultations" ON consultations FOR DELETE
  TO anon, authenticated USING (true);

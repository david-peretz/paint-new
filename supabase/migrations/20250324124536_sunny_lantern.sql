/*
  # Form Submissions Schema

  1. New Tables
    - `form_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `phone` (text)
      - `message` (text)
      - `status` (text) - tracks submission status
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `sent_at` (timestamp) - when the form was sent to email
      - `error` (text) - stores any error messages

  2. Security
    - Enable RLS on `form_submissions` table
    - Add policy for inserting new submissions
*/

CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  sent_at timestamptz,
  error text
);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert new submissions
CREATE POLICY "Anyone can insert form submissions"
  ON form_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users can view submissions
CREATE POLICY "Only authenticated users can view submissions"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (true);
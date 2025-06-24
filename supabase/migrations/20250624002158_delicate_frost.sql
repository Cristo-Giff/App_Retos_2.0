/*
  # AI Challenge Generation Features

  1. New Tables
    - `user_ai_challenges`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `goal_prompt` (text)
      - `generated_challenges` (jsonb)
      - `generation_date` (timestamptz)
      - `package_name` (text)
      - `package_description` (text)
      - `package_icon` (text)
      - `package_color` (text)
      - `created_at` (timestamptz)
    
    - `ai_usage_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `month` (integer)
      - `year` (integer)
      - `query_count` (integer)
      - `created_at` (timestamptz)
    
    - `user_subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `is_premium` (boolean)
      - `subscription_start_date` (timestamptz)
      - `subscription_end_date` (timestamptz)
      - `revenuecat_subscriber_id` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create user_ai_challenges table
CREATE TABLE IF NOT EXISTS user_ai_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  goal_prompt text NOT NULL,
  generated_challenges jsonb NOT NULL,
  generation_date timestamptz DEFAULT now(),
  package_name text NOT NULL,
  package_description text NOT NULL,
  package_icon text NOT NULL,
  package_color text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create ai_usage_logs table
CREATE TABLE IF NOT EXISTS ai_usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  month integer NOT NULL,
  year integer NOT NULL,
  query_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, month, year)
);

-- Create user_subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  is_premium boolean DEFAULT false,
  subscription_start_date timestamptz,
  subscription_end_date timestamptz,
  revenuecat_subscriber_id text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE user_ai_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for user_ai_challenges
CREATE POLICY "Users can read own AI challenges"
  ON user_ai_challenges
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI challenges"
  ON user_ai_challenges
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own AI challenges"
  ON user_ai_challenges
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own AI challenges"
  ON user_ai_challenges
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for ai_usage_logs
CREATE POLICY "Users can read own usage logs"
  ON ai_usage_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage logs"
  ON ai_usage_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage logs"
  ON ai_usage_logs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for user_subscriptions
CREATE POLICY "Users can read own subscription"
  ON user_subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription"
  ON user_subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
  ON user_subscriptions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);
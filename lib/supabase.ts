import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

export type Database = {
  public: {
    Tables: {
      user_ai_challenges: {
        Row: {
          id: string;
          user_id: string;
          goal_prompt: string;
          generated_challenges: any[];
          generation_date: string;
          package_name: string;
          package_description: string;
          package_icon: string;
          package_color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          goal_prompt: string;
          generated_challenges: any[];
          generation_date?: string;
          package_name: string;
          package_description: string;
          package_icon: string;
          package_color: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          goal_prompt?: string;
          generated_challenges?: any[];
          generation_date?: string;
          package_name?: string;
          package_description?: string;
          package_icon?: string;
          package_color?: string;
          created_at?: string;
        };
      };
      ai_usage_logs: {
        Row: {
          id: string;
          user_id: string;
          month: number;
          year: number;
          query_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          month: number;
          year: number;
          query_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          month?: number;
          year?: number;
          query_count?: number;
          created_at?: string;
        };
      };
      user_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          is_premium: boolean;
          subscription_start_date: string | null;
          subscription_end_date: string | null;
          revenuecat_subscriber_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          is_premium?: boolean;
          subscription_start_date?: string | null;
          subscription_end_date?: string | null;
          revenuecat_subscriber_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          is_premium?: boolean;
          subscription_start_date?: string | null;
          subscription_end_date?: string | null;
          revenuecat_subscriber_id?: string | null;
          created_at?: string;
        };
      };
    };
  };
};
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qkofzevzyffbsnmcmwwo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrb2Z6ZXZ6eWZmYnNubWNtd3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyMzg1NzgsImV4cCI6MjAxNzgxNDU3OH0.Jp4A6fzqYue5dmd_sb9omEpqk1SR8v44fUV-pKST6hA",
);

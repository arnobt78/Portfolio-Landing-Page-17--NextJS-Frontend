import { useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";

/** Browser Supabase client; uses placeholders when env is missing so app does not throw. */
const PLACEHOLDER_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_ANON = "placeholder-anon-key";

/** Use in client components for auth or realtime. Single instance per request. */
export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || PLACEHOLDER_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON || PLACEHOLDER_ANON;
  return createBrowserClient(url, anon);
}

function useSupabaseClient() {
  return useMemo(getSupabaseBrowserClient, []);
}

export default useSupabaseClient;

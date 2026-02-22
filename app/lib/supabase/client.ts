import { useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";

const PLACEHOLDER_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_ANON = "placeholder-anon-key";

export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || PLACEHOLDER_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON || PLACEHOLDER_ANON;
  return createBrowserClient(url, anon);
}

function useSupabaseClient() {
  return useMemo(getSupabaseBrowserClient, []);
}

export default useSupabaseClient;

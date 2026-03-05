"use server";

/**
 * Supabase clients for server context. When env is missing, placeholders are used
 * so the app still runs (e.g. demo deploy); actual auth/DB calls will fail gracefully.
 */
import { createServerClient, type CookieOptions, createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const PLACEHOLDER_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_ANON = "placeholder-anon-key";

/** Cookie-based client for Server Components / Route Handlers; respects user session. */
export default async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || PLACEHOLDER_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON || PLACEHOLDER_ANON;

  return createServerClient(
    url,
    anon,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    },
  );
}

/// Admin client with service role key (for operations that need to bypass RLS)
export async function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || PLACEHOLDER_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key";
  return createClient(url, key);
}

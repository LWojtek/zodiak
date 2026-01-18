import { createClient } from "@supabase/supabase-js";
export default defineEventHandler(async (event) => {
  const token = getCookie(event, "sb-access-token");
  console.log("COOKIE TOKEN:", token ? token : "NO");
  if (!token) {
    throw createError({ statusCode: 401 });
  }

  const config = useRuntimeConfig();

  const supabase = createClient(config.supabaseUrl, config.supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    auth: { persistSession: false },
  });

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    throw createError({ statusCode: 401 });
  }

  return data.user;
});

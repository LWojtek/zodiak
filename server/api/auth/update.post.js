import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = getCookie(event, "sb-access-token");

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

  const data = {};

  if (body.first_name) data.first_name = body.first_name;
  if (body.last_name) data.last_name = body.last_name;

  if (!Object.keys(data).length) {
    throw createError({
      statusCode: 400,
      statusMessage: "Nothing to update",
    });
  }

  const { error } = await supabase.auth.updateUser({ data });

  if (error) {
    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.message,
    });
  }

  return { ok: true };
});

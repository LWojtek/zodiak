import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const supabase = await serverSupabaseClient(event);

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
  await supabase.auth.refreshSession();

  if (error) {
    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.message,
    });
  }

  return { ok: true };
});

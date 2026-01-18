import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body || {};

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: "Email i hasło są wymagane",
    });
  }

  const supabase = await serverSupabaseClient(event, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log(data);

  if (error) {
    throw createError({
      statusCode: 401,
      message: "Wprowadzono złe dane logowania",
    });
  }

  // ✅ NO manual cookies
  // ✅ Supabase handled session internally

  return {
    user: data.user,
  };
});

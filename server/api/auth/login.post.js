import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body || {};

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Adres email jest wymagany",
    });
  }
  if (!password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Hasło jest wymagane",
    });
  }

  const config = useRuntimeConfig();

  const supabase = createClient(config.supabaseUrl, config.supabaseKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Wprowadzono złe dane logowania",
    });
  }

  setCookie(event, "sb-access-token", data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: data.session.expires_in,
  });

  return {
    user: data.user,
  };
});

export default defineEventHandler(async (event) => {
  deleteCookie(event, "sb-access-token", {
    path: "/",
  });

  return { ok: true };
});

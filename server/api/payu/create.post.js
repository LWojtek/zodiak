import { serverSupabaseClient } from "#supabase/server";

import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { orderId } = body;

  const config = useRuntimeConfig();

  console.log(body);

  if (!orderId) {
    throw createError({ statusCode: 400, message: "orderId required" });
  }

  const tokenRes = await $fetch(
    `${config.payu.api}/pl/standard/user/oauth/authorize`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: config.payu.clientId,
        client_secret: config.payu.clientSecret,
      }).toString(),
    },
  );

  const accessToken = tokenRes.access_token;

  const supabase = await serverSupabaseClient(event);

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (!order) {
    throw createError({ statusCode: 404, message: "Order not found" });
  }

  if (Number(order.total_price) <= 0) {
    throw createError({ statusCode: 400, message: "Invalid total_price" });
  }

  const payuRes = await $fetch.raw(`${config.payu.api}/api/v2_1/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: {
      extOrderId: order.id,
      merchantPosId: config.payu.posId,
      description: `Order ${order.id}`,
      currencyCode: "PLN",
      totalAmount: String(Math.round(order.total_price * 100)),

      notifyUrl: `${config.public.siteUrl}/api/payu/notify`,
      continueUrl: `${config.public.siteUrl}/order/success?id=${order.id}`,

      customerIp:
        event.node.req.headers["x-forwarded-for"] ??
        event.node.req.socket.remoteAddress ??
        "127.0.0.1",

      buyer: {
        email: order.customer_email,
        firstName: order.customer_name.split(" ")[0],
        lastName: order.customer_name.split(" ").slice(1).join(" ") || "-",
      },

      products: [
        {
          name: "Zamówienie cateringowe",
          unitPrice: String(Math.round(order.total_price * 100)),
          quantity: 1,
        },
      ],
    },
  });

  return {
    redirectUrl: payuRes.url,
  };
});

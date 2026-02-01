import crypto from "crypto";
import { defineEventHandler, readRawBody, getHeader } from "h3";
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  /* --------------------------------------------------
   * 1️⃣ READ RAW BODY (REQUIRED BY PAYU)
   * -------------------------------------------------- */
  const rawBody = await readRawBody(event);
  if (!rawBody) {
    throw createError({ statusCode: 400, message: "Empty body" });
  }

  /* --------------------------------------------------
   * 2️⃣ VERIFY SIGNATURE
   * -------------------------------------------------- */
  const signatureHeader = getHeader(event, "openpayu-signature");

  if (!signatureHeader) {
    throw createError({ statusCode: 400, message: "Missing signature" });
  }

  const expectedMd5 = crypto
    .createHash("md5")
    .update(rawBody + config.payu.md5)
    .digest("hex");

  if (!signatureHeader.includes(expectedMd5)) {
    throw createError({ statusCode: 403, message: "Invalid signature" });
  }

  /* --------------------------------------------------
   * 3️⃣ PARSE PAYU PAYLOAD
   * -------------------------------------------------- */
  const payload = JSON.parse(rawBody);
  const order = payload.order;

  if (!order) {
    return "OK"; // PayU sometimes sends test pings
  }

  /*
    PAYU STATUS EXAMPLES:
    - PENDING
    - COMPLETED
    - CANCELED
    - REJECTED
  */
  const payuStatus = order.status;
  const payuOrderId = order.orderId;
  const extOrderId = order.extOrderId; // <-- YOUR order.id

  if (!extOrderId) {
    throw createError({
      statusCode: 400,
      message: "Missing extOrderId",
    });
  }

  /* --------------------------------------------------
   * 4️⃣ CONNECT TO SUPABASE (SERVICE ROLE)
   * -------------------------------------------------- */
  const supabase = createClient(config.supabaseUrl, config.supabaseSecretKey);

  /* --------------------------------------------------
   * 5️⃣ MAP PAYU STATUS → YOUR STATUS
   * -------------------------------------------------- */
  let update = null;

  if (payuStatus === "COMPLETED") {
    update = {
      payment_status: "paid",
      status: "new",
      payu_order_id: payuOrderId,
    };
  }

  if (payuStatus === "CANCELED" || payuStatus === "REJECTED") {
    update = {
      payment_status: "failed",
      status: "pending_payment",
      payu_order_id: payuOrderId,
    };
  }

  // Ignore PENDING → PayU will retry
  if (!update) {
    return "OK";
  }

  /* --------------------------------------------------
   * 6️⃣ UPDATE ORDER (IDEMPOTENT)
   * -------------------------------------------------- */
  const { error } = await supabase
    .from("orders")
    .update(update)
    .eq("id", extOrderId);

  if (error) {
    console.error("SUPABASE UPDATE ERROR:", error);
    throw createError({
      statusCode: 500,
      message: "Database update failed",
    });
  }

  /* --------------------------------------------------
   * 7️⃣ DONE — PAYU EXPECTS 200 OK
   * -------------------------------------------------- */
  return "OK";
});

import { ref } from "vue";

export const useAdminOrders = () => {
  const orders = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchOrders = async () => {
    loading.value = true;
    error.value = null;

    const supabase = useSupabaseClient();

    const { data, error: fetchError } = await supabase
      .from("orders")
      .select(
        `
        id,
        created_at,
        customer_name,
        customer_phone,
        customer_email,

        fulfillment_method,
        delivery_address,
        service_date,
        service_time,

        payment_method,
        payment_status,
        status,
        total_price,
        currency,

        notes,

        order_items (
          id,
          product_name,
          unit_price,
          qty,
          total_price
        ),

        invoice_details (
          company_name,
          company_nip,
          company_address
        )
      `,
      )
      .order("created_at", { ascending: false });

    if (fetchError) {
      error.value = "Nie udało się pobrać zamówień";
      orders.value = [];
    } else {
      orders.value = data || [];
    }

    loading.value = false;
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
  };
};

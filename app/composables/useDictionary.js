export const useDictionary = () => {
  const dictionary = {
    // FULFILLMENT METHODS
    fulfillmentMethods: {
      pickup: {
        value: "pickup",
        label: "Odbiór osobisty",
      },
      delivery: {
        value: "delivery",
        label: "Dostawa",
      },
    },

    // PAYMENT METHODS
    paymentMethods: {
      onsite: {
        value: "onsite",
        label: "Płatność na miejscu",
        description: "Gotówka lub karta",
      },
      online: {
        value: "online",
        label: "Płatność online (PayU)",
        description: "BLIK, przelew, karta",
      },
    },

    // ORDER STATUSES (stored in 'status' field)
    orderStatuses: {
      pending_payment: {
        value: "pending_payment",
        label: "Oczekiwanie na płatność",
        color: "warning",
      },
      new: {
        value: "new",
        label: "Nowe (opłacone)",
        color: "neutral",
      },
      in_progress: {
        value: "in_progress",
        label: "W realizacji",
        color: "info",
      },
      ready: {
        value: "ready",
        label: "Gotowe",
        color: "info",
      },
      completed: {
        value: "completed",
        label: "Zrealizowane",
        color: "success",
      },
      canceled: {
        value: "canceled",
        label: "Anulowane",
        color: "error",
      },
    },
    // PAYMENT STATUSES (stored in 'payment_status' field)
    paymentStatuses: {
      pending: {
        value: "pending",
        label: "Oczekujące",
        color: "warning",
      },
      paid: {
        value: "paid",
        label: "Opłacone",
        color: "success",
      },
      failed: {
        value: "failed",
        label: "Nieudana",
        color: "error",
      },
    },
  };

  return {
    dictionary,
    t: (key) => {
      const keys = key.split(".");
      let value = dictionary;
      for (const k of keys) {
        if (value[k]) {
          value = value[k];
        } else {
          return key;
        }
      }
      return typeof value === "string" ? value : value;
    },
    getStatusLabel: (status, statusType = "orderStatuses") => {
      return dictionary[statusType]?.[status]?.label || status;
    },
    getStatusColor: (status, statusType = "orderStatuses") => {
      return dictionary[statusType]?.[status]?.color || "gray";
    },
  };
};

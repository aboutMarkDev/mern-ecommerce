export const formatPrice = (price: string) => {
  return parseFloat(price).toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  });
};

export const orderIndicator = (status: string) => {
  let order;

  switch (status) {
    case "pending":
      order = "h-3 w-3 rounded-full bg-yellow-300 ";
      break;

    case "completed":
      order = "h-3 w-3 rounded-full bg-green-300 ";
      break;

    case "cancelled":
      order = "h-3 w-3 rounded-full bg-red-300 ";
      break;

    default:
      order = "h-3 w-3 rounded-full bg-gray-300 ";
      break;
  }

  return order;
};

export const productStatusBadge = (status: string) => {
  let badge;

  switch (status) {
    case "toPay":
      badge = "border bg-yellow-200 border-yellow-500 text-yellow-950";
      break;

    case "toReceive":
      badge = "border bg-yellow-200 border-yellow-500 text-yellow-950";
      break;

    case "delivered":
      badge = "border bg-green-200 border-green-500 text-green-950";
      break;

    default:
      badge = "border bg-red-200 border-red-500 text-red-950";
      break;
  }

  return badge;
};

export const capitalStatus = (status: string) => {
  if (!status) {
    return "";
  }

  // Capitalize the first letter of the string
  let formatedStatus = status[0].toUpperCase() + status.slice(1);

  // Insert a space before every uppercase letter (except the first character)
  formatedStatus = formatedStatus.replace(/([A-Z])/g, " $1").trim();

  return formatedStatus;
};

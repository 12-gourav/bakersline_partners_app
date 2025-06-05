const deliveryStatuses = [
  {
    title: "Successfully Delivered",
    description: "The order has been successfully delivered to the customer with all items received and confirmed.",
  },
  {
    title: "Order Returned by Customer",
    description: "The customer returned the order after delivery due to dissatisfaction or other reasons.",
  },
  {
    title: "Incorrect Item Delivered",
    description: "The items delivered did not match the order placed by the customer.",
  },
  {
    title: "Customer Didn't Pick Up",
    description: "The customer was unavailable or refused to pick up the order at the delivery location.",
  },
  {
    title: "Delivery Failed - Wrong Location",
    description: "The delivery failed due to an incorrect or unreachable delivery address.",
  },
  {
    title: "Cancelled by Customer",
    description: "The customer canceled the order before or during the delivery process.",
  },
  {
    title: "Delivery Failed - Supplier Not Found",
    description: "The delivery could not be completed because the supplier was unavailable or unreachable.",
  },
  {
    title: "Supplier Location Unavailable",
    description: "The delivery failed as the supplier's location was inaccessible or closed.",
  },
  {
    title: "Cancelled by Supplier",
    description: "The order was canceled by the supplier due to stock, availability, or internal issues.",
  },
  {
    title: "Delivery Delayed",
    description: "The delivery has been delayed due to traffic, weather, or logistical issues. The new ETA is updated.",
  },
  {
    title: "Rescheduled by Customer",
    description: "The customer requested to change the delivery time or date, and it has been rescheduled.",
  }
];


export default deliveryStatuses
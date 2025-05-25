const page = () => {
  const order = {
    id: "638a3a47-f237-44cc-86a4-435b0531e80a",
    userId: "bc75e50c-9443-4ee8-98fb-40c5bf41e1e5",
    shippingAddressId: "6922f19d-3032-48f5-91fb-0837bded99a6",
    status: "CONFIRMED",
    totalAmount: 3100.99,
    createdAt: "2025-05-21T04:48:51.022Z",
    totalItems: 2,
    payment: null,
    orderProducts: [
      {
        id: "49db9da8-6467-4bd1-8567-3209891c13fc",
        orderId: "638a3a47-f237-44cc-86a4-435b0531e80a",
        productId: "47e36b68-7bd6-4165-9231-5cbeb2e1f0a1",
        quantity: 2,
        price: 1200.5,
      },
      {
        id: "19089976-6354-4aca-a2c7-13ec90de663b",
        orderId: "638a3a47-f237-44cc-86a4-435b0531e80a",
        productId: "74fed3e4-4f2a-4448-9f4d-d3975c17680c",
        quantity: 1,
        price: 699.99,
      },
    ],
    shippingAddress: {
      id: "6922f19d-3032-48f5-91fb-0837bded99a6",
      userId: "bc75e50c-9443-4ee8-98fb-40c5bf41e1e5",
      type: "CURRENT",
      street: "456 Customer St",
      city: "Customer City",
      state: "Customer State",
      country: "Customer Land",
      zipCode: "67890",
    },
  };
  return <section></section>;
};

export default page;

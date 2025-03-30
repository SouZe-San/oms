import { PrismaClient, Role, AddressType, OrderStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      primaryMobile: "9999999999",
      password: hashedPassword,
      role: Role.ADMIN,
      dob: new Date("1990-01-01"),
      addresses: {
        create: [
          {
            type: AddressType.PERMANENT,
            street: "123 Admin St",
            city: "Admin City",
            state: "Admin State",
            country: "Admin Land",
            zipCode: "12345",
          },
        ],
      },
      carts: { create: {} },
    },
    include: { carts: true },
  });

  // Create Customer with Cart
  const customer = await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      firstName: "John",
      lastName: "Doe",
      email: "customer@example.com",
      primaryMobile: "8888888888",
      password: hashedPassword,
      role: Role.CUSTOMER,
      dob: new Date("1995-05-15"),
      addresses: {
        create: [
          {
            type: AddressType.CURRENT,
            street: "456 Customer St",
            city: "Customer City",
            state: "Customer State",
            country: "Customer Land",
            zipCode: "67890",
          },
        ],
      },
      carts: { create: {} }, //create cart when user is created
    },
    include: { carts: true },
  });

  const cart = customer.carts;

  // Create Products (Admin Managed)
  const product1 = await prisma.product.create({
    data: {
      adminId: admin.id,
      name: "Laptop",
      description: "High-performance laptop",
      price: 1200.5,
      stock: 10,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      adminId: admin.id,
      name: "Smartphone",
      description: "Latest smartphone with best camera",
      price: 699.99,
      stock: 20,
    },
  });

  // Add products to cart
  //@description: add product temporary into cart, until we make a order
  await prisma.cartProduct.createMany({
    data: [
      { productId: product1.id, quantity: 2, cartId: cart?.id },
      { productId: product2.id, quantity: 1, cartId: cart?.id },
    ],
  });

  // Fetch all Cart Products
  const cartProducts = await prisma.cartProduct.findMany({
    where: { cartId: cart?.id },
    include: { product: true },
  });

  // Calculate total amount
  const totalAmount = cartProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Create Order
  //@description: add all products from cart to order
  const order = await prisma.order.create({
    data: {
      userId: customer.id,
      status: OrderStatus.CONFIRMED,
      totalAmount,
      orderProducts: {
        create: cartProducts.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price, // Store price at order time
        })),
      },
    },
    include: { orderProducts: true }
  });

  //update stock
  //@description: update stock price when we order items
  await Promise.all(
    order.orderProducts.map((item) =>
      prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }, // Decrease stock
      })
    )
  );


  // Clear Cart
  //@description: remove products from cart after making order
  await prisma.cartProduct.deleteMany({
    where: { cartId: cart?.id },
  });

  console.log("✅ Order placed and cart cleared successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

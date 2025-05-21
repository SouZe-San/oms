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
    },
  });

  // Create Customer with Address
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
    },
    include: {
      addresses: true,
    },
  });

  // Get first address to use as shipping address
  const shippingAddress = customer.addresses[0];

  // Create Products
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
  await prisma.cartProduct.createMany({
    data: [
      { productId: product1.id, quantity: 2, userId: customer.id },
      { productId: product2.id, quantity: 1, userId: customer.id },
    ],
  });

  // Fetch cart products
  const cartProducts = await prisma.cartProduct.findMany({
    where: { userId: customer.id },
    include: { product: true },
  });

  // Calculate total amount
  const totalAmount = cartProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!shippingAddress) {
    throw new Error("Customer has no address to use for shipping.");
  }
  // Create Order with existing address
  const order = await prisma.order.create({
    data: {
      userId: customer.id,
      status: OrderStatus.CONFIRMED,
      totalAmount,
      totalItems: cartProducts.length,
      shippingAddressId: shippingAddress.id,
      orderProducts: {
        create: cartProducts.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
    include: { orderProducts: true },
  });

  // Update product stock
  await Promise.all(
    order.orderProducts.map((item) =>
      prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      })
    )
  );

  // Clear cart
  await prisma.cartProduct.deleteMany({
    where: { userId: customer.id },
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

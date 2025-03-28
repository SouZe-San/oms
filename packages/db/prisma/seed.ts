import { PrismaClient, Role, AddressType, OrderStatus, PaymentStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Hash password for users
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
        create: [{
          type: AddressType.PERMANENT,
          street: "123 Admin St",
          city: "Admin City",
          state: "Admin State",
          country: "Admin Land",
          zipCode: "12345",
        }],
      },
    },
  });

  // Create Customer
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
        create: [{
          type: AddressType.CURRENT,
          street: "456 Customer St",
          city: "Customer City",
          state: "Customer State",
          country: "Customer Land",
          zipCode: "67890",
        }],
      },
    },
  });

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

  // Create an Order for the customer
  const order = await prisma.order.create({
    data: {
      userId: customer.id,
      status: OrderStatus.CONFIRMED,
      totalAmount: product1.price + product2.price,
    },
  });

  // Create a Cart and link it to the Order
  const cart = await prisma.cart.create({
    data: {
      cartProducts: {
        create: [
          { productId: product1.id, quantity: 1 },
          { productId: product2.id, quantity: 1 },
        ],
      },
    },
  });

  // Create a Payment for the Order
  await prisma.payment.create({
    data: {
      orderId: order.id,
      amount: order.totalAmount,
      status: PaymentStatus.COMPLETED,
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

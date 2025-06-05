import { PrismaClient, Role, AddressType, OrderStatus, PaymentStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { appleAdmin } from "./seed/apple.seed";
import { samsungAdmin } from "./seed/samsung.seed";
import { googleAdmin } from "./seed/google.seed";
import { nothingAdmin } from "./seed/nothing.seed";
import { asusAdmin } from "./seed/asus.seed";
import { fashionAdmin } from "./seed/fashion.seed";
import { musicalAdmin } from "./seed/musical.seed";
import { otherAdmin } from "./seed/other.seed";
import { sportsAdmin } from "./seed/sports.seed";
import { toysAdmin } from "./seed/toys.seed";

const prisma = new PrismaClient();

async function main() {
  //hashed password
  const hashedPassword = await bcrypt.hash("password123", 10);

  //admins & products
  await appleAdmin(hashedPassword);
  await asusAdmin(hashedPassword);
  await samsungAdmin(hashedPassword);
  await googleAdmin(hashedPassword);
  await nothingAdmin(hashedPassword);
  await fashionAdmin(hashedPassword);
  await musicalAdmin(hashedPassword);
  await sportsAdmin(hashedPassword);
  await toysAdmin(hashedPassword);
  await otherAdmin(hashedPassword);

  // 1. Create 10 users
  const users = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.user.create({
        data: {
          firstName: `User${i + 1}`,
          lastName: "Test",
          email: `user${i + 1}@example.com`,
          primaryMobile: `700000000${i}`,
          password: hashedPassword,
          role: Role.CUSTOMER,
          dob: new Date(`199${i % 10}-01-01`),
          addresses: {
            create: {
              type: AddressType.PERMANENT,
              street: `Street ${i + 1}`,
              city: "City",
              state: "State",
              country: "Country",
              zipCode: "12345",
            },
          },
        },
        include: { addresses: true },
      })
    )
  );
  console.log("=> Create Users ✅");

  const allProducts = await prisma.product.findMany();

  // Add 1-3 random products to each user's cart
  for (const user of users) {
    const numCartItems = Math.floor(Math.random() * 3) + 1;
    const selectedProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, numCartItems);
    await prisma.cartProduct.createMany({
      data: selectedProducts.map((product) => ({
        userId: user.id,
        productId: product.id,
        quantity: Math.floor(Math.random() * 2) + 1,
        name: product.name,
      })),
    });
  }
  console.log("=> Add into Cart ✅");

  // Create orders for each user using 1-3 random products
  for (const user of users) {
    //handle error
    const userAddress = user.addresses[0];
    if (!userAddress) continue;

    const numOrderItems = Math.floor(Math.random() * 6) + 6;
    const selectedProducts = allProducts
      .filter((p) => p.stock > 0)
      .sort(() => 0.5 - Math.random())
      .slice(0, numOrderItems);

    // for each product create a order(1-3 items)
    for (const product of selectedProducts) {
      const quantity = Math.min(product.stock, Math.floor(Math.random() * 2) + 1);
      if (quantity <= 0) continue;

      //calculate total amount
      const totalAmount = product.price * quantity;

      //make a order
      const order = await prisma.order.create({
        data: {
          userId: user.id,
          status: OrderStatus.CONFIRMED,
          totalAmount,
          totalItems: quantity,
          shippingAddressId: userAddress.id,
          orderProducts: {
            create: {
              name: product.name,
              productId: product.id,
              quantity,
              price: product.price,
            },
          },
        },
      });

      //create a payment
      await prisma.payment.create({
        data: {
          orderId: order.id,
          amount: totalAmount,
          status: PaymentStatus.PENDING,
        },
      });

      //update product stock
      await prisma.product.update({
        where: { id: product.id },
        data: { stock: { decrement: quantity } },
      });
    }
  }
  console.log("=> make Orders ✅");

  // Update some orders to SHIPPED with PENDING payment
  const allOrders = await prisma.order.findMany();
  const shuffledOrders = allOrders.sort(() => 0.5 - Math.random());

  const shippedCount = Math.min(shuffledOrders.length, Math.floor(Math.random() * 10) + 10);
  const deliveredCount = Math.min(shuffledOrders.length - shippedCount, Math.floor(Math.random() * 10) + 10);

  const shippedOrders = shuffledOrders.slice(0, shippedCount);
  const deliveredOrders = shuffledOrders.slice(shippedCount, shippedCount + deliveredCount);

  // Update shipped orders
  await Promise.all(
    shippedOrders.map((order) =>
      prisma.order.update({
        where: { id: order.id },
        data: {
          status: OrderStatus.SHIPPED,
        },
      })
    )
  );
  console.log("=> orders SHIPPED ✅");

  // Update delivered orders
  await Promise.all(
    deliveredOrders.map((order) =>
      prisma.order.update({
        where: { id: order.id },
        data: {
          status: OrderStatus.DELIVERED,
          payment: {
            update: {
              status: PaymentStatus.COMPLETED,
            },
          },
        },
      })
    )
  );

  console.log("=> orders DELIVERED ✅");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

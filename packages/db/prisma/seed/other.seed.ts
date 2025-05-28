import { PrismaClient, ProductCategory, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function otherAdmin(password: string) {

  const admin = await prisma.user.upsert({
    where: { email: "admin.oms@other.com" },
    update: {},
    create: {
      firstName: "Other",
      lastName: "Oms",
      email: "admin.oms@Other.com",
      primaryMobile: "1212121212",
      password: password,
      dob: new Date("2025-01-03"),
      role: Role.ADMIN,
    }
  });
  console.log("=> Other Admin ✅");

  const products = [
    {
      name: "LED Desk Lamp with USB",
      description: "Touch control lamp with adjustable brightness and charging port.",
      price: 1199,
      stock: 8,
      category: ProductCategory.OTHERS,
      image: [
        "https://i.pinimg.com/736x/cf/ae/17/cfae175bafd7f6167c53e541cdcdd3e5.jpg",
      ],
    },
    {
      name: "Insulated Water Bottle - 1L",
      description: "Keeps beverages hot or cold for up to 12 hours. Leak-proof.",
      price: 599,
      stock: 18,
      category: ProductCategory.OTHERS,
      image: [
        "https://i.pinimg.com/736x/8a/30/65/8a3065cf4d0e4696064d96a2eef41261.jpg",
      ],
    },
  ];

  await Promise.all(
    products.map((product) =>
      prisma.product.create({
        data: {
          adminId: admin.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          images: {
            create: product.image.map((url) => ({
              url,
            })),
          },
        },
      })
    )
  );

  console.log("=> Other Products ✅");

}
import { PrismaClient, ProductCategory, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function sportsAdmin(password: string) {

  const admin = await prisma.user.upsert({
    where: { email: "admin.oms@sports.com" },
    update: {},
    create: {
      firstName: "Sports",
      lastName: "Oms",
      email: "admin.oms@sports.com",
      primaryMobile: "8888888888",
      password: password,
      dob: new Date("2025-02-01"),
      role: Role.ADMIN,
    }
  });
  console.log("=> Sport Admin ✅");

  const products = [
    {
      name: "Football (Size 5)",
      description: "Durable rubber football suitable for casual and training matches.",
      price: 999,
      stock: 12,
      category: ProductCategory.SPORTS,
      image: [
        "https://i.pinimg.com/736x/e9/4d/b0/e94db0baa0a24803c67774501d9800b1.jpg", "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg"
      ],
    },
    {
      name: "Yoga Mat - Non Slip",
      description: "6mm thick anti-skid yoga mat ideal for home or studio practice.",
      price: 699,
      stock: 20,
      category: ProductCategory.SPORTS,
      image: [
        "https://i.pinimg.com/736x/79/37/36/793736c012e40d408b5ef14a1db755f1.jpg", "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg"
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

  console.log("=> Sport Products ✅");

}
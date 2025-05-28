import { PrismaClient, ProductCategory, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function musicalAdmin(password: string) {

  const admin = await prisma.user.upsert({
    where: { email: "admin.oms@musical.com" },
    update: {},
    create: {
      firstName: "Musical",
      lastName: "Oms",
      email: "admin.oms@musical.com",
      primaryMobile: "9999999999",
      password: password,
      dob: new Date("2025-01-01"),
      role: Role.ADMIN,
    }
  });
  console.log("=> Musical Admin ✅");

  const products = [
    {
      name: "Acoustic Guitar - 38 Inch",
      description: "Beginner-friendly wooden acoustic guitar with carrying bag.",
      price: 3499,
      stock: 6,
      category: ProductCategory.MUSICAL_INSTRUMENTS,
      image: [
        "https://i.pinimg.com/736x/90/12/62/901262cec19b752373669abef52a6000.jpg",
      ],
    },
    {
      name: "Electronic Keyboard 61 Keys",
      description: "Compact keyboard with demo songs, rhythm options, and mic input.",
      price: 4199,
      stock: 5,
      category: ProductCategory.MUSICAL_INSTRUMENTS,
      image: [
        "https://i.pinimg.com/736x/19/6f/fe/196ffe446fc9d47994bbf10c25643cde.jpg",
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

  console.log("=> Musical Products ✅");

}
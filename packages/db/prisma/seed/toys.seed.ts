import { PrismaClient, ProductCategory, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function toysAdmin(password: string) {
  const admin = await prisma.user.upsert({
    where: { email: "admin.oms@toys.com" },
    update: {},
    create: {
      firstName: "Toys",
      lastName: "Oms",
      email: "admin.oms@toys.com",
      primaryMobile: "7777777777",
      password: password,
      dob: new Date("2025-03-01"),
      role: Role.ADMIN,
    },
  });
  console.log("=> Toys Admin ✅");

  const products = [
    {
      name: "Remote Control Car",
      description: "High-speed RC car with rechargeable battery and all-terrain wheels.",
      price: 1499,
      stock: 10,
      category: ProductCategory.TOYS,
      image: [
        "https://i.pinimg.com/736x/5b/cf/c4/5bcfc49f1cc913c52b5d62bca17b93d1.jpg",
        "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg",
      ],
    },
    {
      name: "Lego Block Set",
      description: "100-piece creative blocks for kids aged 4+, encourages imagination.",
      price: 799,
      stock: 15,
      category: ProductCategory.TOYS,
      image: [
        "https://i.pinimg.com/736x/54/82/a3/5482a3366a93ce90522f5390913f968d.jpg",
        "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg",
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

  console.log("=> Toys Products ✅");
}

import { PrismaClient, ProductCategory, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function nothingAdmin(password: string) {
  const admin = await prisma.user.upsert({
    where: { email: "admin.oms@nothing.com" },
    update: {},
    create: {
      firstName: "Nothing",
      lastName: "Tech",
      email: "admin.oms@nothing.tech",
      primaryMobile: "4444444444",
      password,
      dob: new Date("2020-10-29"),
      role: Role.ADMIN,
    },
  });
  console.log("=> Nothing Admin ✅");

  const products = [
    {
      name: "Nothing Phone (2)",
      description: "Snapdragon 8+ Gen 1 || Dual 50MP Cameras || Glyph Interface || 120Hz AMOLED",
      price: 44999.00,
      stock: 20,
      category: ProductCategory.MOBILES,
      image: [
        "https://i.pinimg.com/736x/5a/06/73/5a0673eaba8c315ede63b9bbfb089c19.jpg",
        "https://i.pinimg.com/736x/f5/99/d8/f599d8cf2e46c41cb7ac36c3a359e2df.jpg"
      ],
    },
    {
      name: "Nothing Phone (2a)",
      description: "MediaTek Dimensity 7200 Pro || Dual 50MP Cameras || Glyph Interface",
      price: 27999.00,
      stock: 25,
      category: ProductCategory.MOBILES,
      image: [
        "https://i.pinimg.com/736x/a9/46/0a/a9460a713d67078905681ff963685ee8.jpg", "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg"
      ],
    },
    {
      name: "Nothing Ear (2)",
      description: "Hi-Res Audio || LHDC 5.0 || 11.6mm Drivers || 40dB ANC",
      price: 10999.00,
      stock: 25,
      category: ProductCategory.ELECTRONICS,
      image: [
        "https://i.pinimg.com/736x/c5/14/cf/c514cf8d071b97a54583d1c3f22dbffd.jpg",
        "https://i.pinimg.com/736x/32/dc/8e/32dc8ec6e8d3b97b66f8ff7b7827cdea.jpg"
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
            create: product.image.map((url) => ({ url })),
          },
        },
      })
    )
  );

  console.log("=> Nothing Products ✅");
}

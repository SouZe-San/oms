import { PrismaClient, ProductCategory, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function googleAdmin(password: string) {
  const admin = await prisma.user.upsert({
    where: { email: "admin.oms@google.com" },
    update: {},
    create: {
      firstName: "Google",
      lastName: "LLC",
      email: "admin.oms@google.com",
      primaryMobile: "3333333333",
      password,
      dob: new Date("1998-09-04"),
      role: Role.ADMIN,
    },
  });
  console.log("=> Google Admin ✅");

  const products = [
    {
      name: "Pixel 8 Pro",
      description: "Tensor G3 || 50MP Wide + 48MP Ultrawide || 10.5MP Front || 120Hz OLED",
      price: 106999.0,
      stock: 18,
      category: ProductCategory.MOBILES,
      image: [
        "https://i.pinimg.com/736x/ed/93/e5/ed93e514854b5aac82409189a813db4e.jpg",
        "https://i.pinimg.com/736x/5d/d2/23/5dd22321283334a8228da1514abfa494.jpg",
      ],
    },
    {
      name: "Pixel 8a",
      description: "Tensor G3 || 64MP + 13MP Ultrawide || 13MP Front || 120Hz OLED",
      price: 52999.0,
      stock: 25,
      category: ProductCategory.MOBILES,
      image: [
        "https://i.pinimg.com/736x/72/37/bb/7237bb515436ef50bebc5eecb2d3b135.jpg",
        "https://i.pinimg.com/736x/24/41/ea/2441ea601e93135ee984844183b6d663.jpg",
      ],
    },
    {
      name: "Pixel Watch 2",
      description: "Fitbit integration || Heart Rate & Stress Tracking || Wear OS 4",
      price: 39999.0,
      stock: 15,
      category: ProductCategory.ELECTRONICS,
      image: [
        "https://i.pinimg.com/736x/96/8b/95/968b95009f34aa687235c3d615f3a364.jpg",
        "https://i.pinimg.com/736x/57/86/f4/5786f4b6a53a3dd005922a4c8cd3b076.jpg",
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

  console.log("=> Google Products ✅");
}

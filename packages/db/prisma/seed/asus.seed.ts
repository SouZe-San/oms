import { PrismaClient, ProductCategory, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function asusAdmin(password: string) {
  const admin = await prisma.user.upsert({
    where: { email: "admin.oms@asus.com" },
    update: {},
    create: {
      firstName: "Asus",
      lastName: "Laptop",
      email: "admin.oms@asus.com",
      primaryMobile: "5555555555",
      password: password,
      dob: new Date("1976-04-01"),
      role: Role.ADMIN,
    },
  });
  console.log("=> ASUS Admin ✅");

  const products = [
    {
      name: "ASUS ZenBook 14 OLED",
      description: "14” 2.8K OLED Display || AMD Ryzen 7 7730U || 16GB RAM || 512GB SSD || Windows 11",
      price: 94990.0,
      stock: 15,
      category: ProductCategory.LAPTOPS,
      image: [
        "https://i.pinimg.com/736x/bc/5d/d3/bc5dd32c4b0baf80897f37de983e128c.jpg",
        "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg",
      ],
    },
    {
      name: "ASUS ROG Zephyrus G14",
      description: "14” QHD+ 165Hz Display || AMD Ryzen 9 7940HS || RTX 4060 || 16GB RAM || 1TB SSD",
      price: 159990.0,
      stock: 10,
      category: ProductCategory.LAPTOPS,
      image: [
        "https://i.pinimg.com/736x/6d/ce/74/6dce7442791a3525afd2b1c3989e6a27.jpg",
        "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg",
      ],
    },
    {
      name: "ASUS TUF Gaming F15",
      description: "15.6” FHD 144Hz || Intel Core i7-12700H || RTX 3050 || 16GB RAM || 512GB SSD",
      price: 104990.0,
      stock: 12,
      category: ProductCategory.LAPTOPS,
      image: [
        "https://i.pinimg.com/736x/1d/9f/5b/1d9f5b20d2c0161ea720a254aeb980ec.jpg",
        "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg",
      ],
    },
    {
      name: "ASUS Vivobook 15 OLED",
      description: "15.6” FHD OLED || Intel Core i5-1335U || 16GB RAM || 512GB SSD || Integrated Graphics",
      price: 67990.0,
      stock: 20,
      category: ProductCategory.LAPTOPS,
      image: [
        "https://i.pinimg.com/736x/10/80/e6/1080e6bf6bd88f09829beb30577a66e1.jpg",
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

  console.log("=> ASUS Products ✅");
}

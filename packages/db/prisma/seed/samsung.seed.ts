import { PrismaClient, ProductCategory, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function samsungAdmin(password: string) {
  const admin = await prisma.user.upsert({
    where: { email: "admin.oms@samsung.com" },
    update: {},
    create: {
      firstName: "Samsung",
      lastName: "Electronics",
      email: "admin.oms@samsung.com",
      primaryMobile: "2222222222",
      password,
      dob: new Date("1938-03-01"),
      role: Role.ADMIN,
    },
  });
  console.log("=> Samsung Admin ✅");

  const products = [
    {
      name: "Galaxy S24 Ultra",
      description: "Snapdragon 8 Gen 3 || 200MP + 12MP + 10MP + 10MP || 12MP Front || 120Hz AMOLED",
      price: 129999.00,
      stock: 20,
      category: ProductCategory.MOBILES,
      image: [
        "https://i.pinimg.com/736x/c9/61/51/c96151547ed767dfddbc32b65f94cee8.jpg",
        "https://i.pinimg.com/736x/6e/bd/59/6ebd598976513f91b83404a30e89863f.jpg"
      ],
    },
    {
      name: "Galaxy Book4 Pro",
      description: "14-inch AMOLED || Intel Core Ultra 7 || 32GB RAM || 1TB SSD",
      price: 179999.00,
      stock: 8,
      category: ProductCategory.LAPTOPS,
      image: [
        "https://i.pinimg.com/736x/64/cc/b2/64ccb22a365d60f018c87495cdcf126b.jpg", "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg"
      ],
    },
    {
      name: "Galaxy Tab S9 Ultra",
      description: "Snapdragon 8 Gen 2 || 14.6-inch AMOLED || 12GB RAM || S-Pen Included",
      price: 109999.00,
      stock: 12,
      category: ProductCategory.ELECTRONICS,
      image: [
        "https://i.pinimg.com/736x/57/44/08/574408f2409e0d5a268ad17c7a0bdda9.jpg", "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg"
      ],
    },
    {
      name: "Galaxy A55 5G",
      description: "Exynos 1380 || 50MP + 8MP + 5MP || 13MP Front || 120Hz AMOLED",
      price: 28999.00,
      stock: 35,
      category: ProductCategory.MOBILES,
      image: [
        "https://i.pinimg.com/736x/50/e2/f6/50e2f6c1efab2fcb46252e6bd1d7ca2a.jpg", "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg"
      ],
    },
    {
      name: "Galaxy Watch 6",
      description: "1.5-inch Super AMOLED || BioActive Sensor || Sleep & Fitness Tracking",
      price: 24999.00,
      stock: 20,
      category: ProductCategory.ELECTRONICS,
      image: [
        "https://i.pinimg.com/736x/4f/5b/06/4f5b069edf4944acdf0f7658bbc94c69.jpg",
        "https://i.pinimg.com/736x/40/11/77/40117727bc348e6249fba6e9133cafd3.jpg"
      ],
    },
    {
      name: "Galaxy Buds FE",
      description: "ANC || 6.5 Hours Battery || Bluetooth 5.2 || USB-C Charging",
      price: 5999.00,
      stock: 50,
      category: ProductCategory.ELECTRONICS,
      image: [
        "https://i.pinimg.com/736x/80/62/b0/8062b04b1f7e11c64a74809a6a13d151.jpg",
        "https://i.pinimg.com/736x/5d/30/32/5d303235962ff28dbc7efa2ba2260e45.jpg"
      ],
    },
    {
      name: "Galaxy Buds 2 pro",
      description: "ANC || Dual Drivers || Wireless Charging || 20 Hours with Case",
      price: 8499.00,
      stock: 30,
      category: ProductCategory.ELECTRONICS,
      image: [
        "https://i.pinimg.com/736x/32/86/5d/32865d14b5388a2c7e228fdf5d218e1b.jpg",
        "https://i.pinimg.com/736x/db/c4/e0/dbc4e0ad9da18ccf8d95aa8501fc03a8.jpg"
      ],
    },
    {
      name: "Samsung QLED Q60B 55-inch",
      description: "4K UHD Smart TV || Quantum Dot Technology || 120Hz Refresh Rate || HDR10+",
      price: 54999.00,
      stock: 15,
      category: ProductCategory.ELECTRONICS,
      image: [
        "https://i.pinimg.com/736x/ad/8b/de/ad8bdecb490a26692d6f25024bee0eb3.jpg", "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg"
      ],
    },
    {
      name: "Samsung Neo QLED QN90B 65-inch",
      description: "4K UHD Smart TV || Mini-LED Backlight || Quantum HDR 32X || 120Hz Refresh Rate",
      price: 149999.00,
      stock: 8,
      category: ProductCategory.ELECTRONICS,
      image: [
        "https://i.pinimg.com/736x/93/6b/19/936b19383e4983cf4dac7b9f780b721e.jpg", "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg"
      ],
    },
    {
      name: "Samsung The Frame 43-inch",
      description: "4K UHD Smart TV || Art Mode with Customizable Frames || QLED Display || 60Hz",
      price: 69999.00,
      stock: 12,
      category: ProductCategory.ELECTRONICS,
      image: [
        "https://i.pinimg.com/736x/93/2e/4c/932e4c4f3ef3c0e635c92ace929f0492.jpg", "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg"
      ],
    },
    {
      name: "Samsung Crystal UHD TU8000 50-inch",
      description: "4K UHD Smart TV || Crystal Display || HDR || 60Hz Refresh Rate",
      price: 37999.00,
      stock: 20,
      category: ProductCategory.ELECTRONICS,
      image: [
        "https://i.pinimg.com/736x/64/00/ff/6400ff1926812c071e4ed871dadbcbe7.jpg", "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg"
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

  console.log("=> Samsung Products ✅");
}

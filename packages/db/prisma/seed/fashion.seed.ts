import { PrismaClient, ProductCategory, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function fashionAdmin(password: string) {

  const admin = await prisma.user.upsert({
    where: { email: "admin.oms@fashion.com" },
    update: {},
    create: {
      firstName: "Fashion",
      lastName: "Oms",
      email: "admin.oms@fashion.com",
      primaryMobile: "6666666666",
      password: password,
      dob: new Date("2025-04-01"),
      role: Role.ADMIN,
    }
  });
  console.log("=> Fashion Admin ✅");


  const products = [
    {
      name: "Men's Cotton Slim Fit Shirt",
      description: "Full-sleeve solid shirt with a sharp slim fit, perfect for office or casual wear.",
      price: 1299,
      stock: 25,
      category: ProductCategory.FASHION,
      image: [
        "https://i.pinimg.com/736x/3b/5d/93/3b5d935e4e52bfe8098e231e30a52586.jpg",
      ],
    },
    {
      name: "Women's Floral Maxi Dress",
      description: "Sleeveless chiffon maxi with floral prints, ideal for summer brunches and beach holidays.",
      price: 1799,
      stock: 20,
      category: ProductCategory.FASHION,
      image: [
        "https://i.pinimg.com/736x/14/a2/d1/14a2d1b11fd94f82b135567bc40af307.jpg",
      ],
    },
    {
      name: "Unisex White Sneakers",
      description: "Comfortable and stylish white sneakers, suitable for all outfits.",
      price: 2499,
      stock: 30,
      category: ProductCategory.FASHION,
      image: [
        "https://i.pinimg.com/736x/cc/6e/60/cc6e6061443e5b0667ebed0fd50db7cd.jpg",
      ],
    },
    {
      name: "Men’s Bomber Jacket",
      description: "Classic bomber jacket",
      price: 2999,
      stock: 10,
      category: ProductCategory.FASHION,
      image: [
        "https://i.pinimg.com/736x/a6/b2/b3/a6b2b3b840ff10bababf5912dc682dc5.jpg",
      ],
    },
    {
      name: "Women's Leather Handbag",
      description: "Spacious tan handbag made of premium faux leather with metallic accents.",
      price: 3499,
      stock: 14,
      category: ProductCategory.FASHION,
      image: [
        "https://i.pinimg.com/736x/b0/6f/c7/b06fc75af00784e2175ecb30fd8dfca4.jpg",
      ],
    },
    {
      name: "Unisex Round Sunglasses",
      description: "UV-protected retro-style round sunglasses suitable for both men and women.",
      price: 899,
      stock: 35,
      category: ProductCategory.FASHION,
      image: [
        "https://i.pinimg.com/736x/f6/25/66/f62566f6b8712796ee3a182f345c3aca.jpg",
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

  console.log("=> Fashion Products ✅");

}
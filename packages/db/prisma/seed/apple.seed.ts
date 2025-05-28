import { PrismaClient, ProductCategory, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function appleAdmin(password: string) {

  const admin = await prisma.user.upsert({
    where: { email: "admin.oms@apple.com" },
    update: {},
    create: {
      firstName: "Apple",
      lastName: "Corporation",
      email: "admin.oms@apple.com",
      primaryMobile: "1111111111",
      password: password,
      dob: new Date("1976-04-01"),
      role: Role.ADMIN,
    }
  });
  console.log("=> Apple Admin ✅");

  const products = [
    {
      name: "iPhone 16 Pro",
      description: "A18 pro Chip || 48MP + 48MP + 12MP | 12MP Front Camera || Super Retina XDR Display",
      price: 135900.00,
      stock: 20,
      category: ProductCategory.MOBILES,
      image: ["https://i.pinimg.com/736x/b3/e6/ae/b3e6aeaa47709e1e4d23a7b2776b9b12.jpg", "https://i.pinimg.com/736x/0e/19/12/0e191294a871084f6cd52898f07074c0.jpg"],
    },
    {
      name: "iPhone 16",
      description: "A18 Chip || Dual 48MP Cameras | 12MP Front Camera || OLED Super Retina Display",
      price: 99900.00,
      stock: 25,
      category: ProductCategory.MOBILES,
      image: ["https://i.pinimg.com/736x/5c/93/fc/5c93fcf993aa9a7723f9da8817dfbef4.jpg", "https://i.pinimg.com/736x/6f/df/87/6fdf8766c846687360fca45f0fafb0c5.jpg"],
    },
    {
      name: "iPhone SE (4th Gen)",
      description: "A17 Chip || 12MP Rear | 7MP Front Camera || Retina HD Display",
      price: 49900.00,
      stock: 15,
      category: ProductCategory.MOBILES,
      image: ["https://i.pinimg.com/736x/04/71/dd/0471dd542fb0edfa8bf13d8993216b7b.jpg", "https://i.pinimg.com/736x/dc/c3/cb/dcc3cb0ed18ca969e375311834f805ba.jpg"],
    },
    {
      name: "MacBook Air M3",
      description: "13.6-inch Liquid Retina Display || 8-core CPU || 256GB SSD || macOS Sonoma",
      price: 114900.00,
      stock: 10,
      category: ProductCategory.LAPTOPS,
      image: ["https://i.pinimg.com/736x/f3/00/6b/f3006be662d773deea0d962496d7cab5.jpg", "https://i.pinimg.com/736x/fc/bf/15/fcbf150f5a51b16bd66b290c4ea4cdf6.jpg"],
    },
    {
      name: "MacBook Pro M3 Max",
      description: "16-inch Liquid Retina XDR Display || 12-core CPU || 1TB SSD || 32GB RAM",
      price: 249900.00,
      stock: 5,
      category: ProductCategory.LAPTOPS,
      image: ["https://i.pinimg.com/736x/31/54/eb/3154ebbfedadc0a03966ed8a07e7f695.jpg",],
    },
    {
      name: "iPad Pro M4 (12.9-inch)",
      description: "M4 Chip || Liquid Retina XDR Display || 256GB || Apple Pencil Pro Support",
      price: 129900.00,
      stock: 12,
      category: ProductCategory.ELECTRONICS,
      image: ["https://i.pinimg.com/736x/53/55/aa/5355aa38bd15f2fa36a4bd935899d3ef.jpg", "https://i.pinimg.com/736x/f6/ee/0e/f6ee0eb98d8df00d1d3d534d91b33e41.jpg"],
    },
    {
      name: "iPad Air M2 (10.9-inch)",
      description: "M2 Chip || Liquid Retina Display || 128GB || Wi-Fi + Cellular",
      price: 79900.00,
      stock: 18,
      category: ProductCategory.ELECTRONICS,
      image: ["https://i.pinimg.com/736x/2a/b4/96/2ab496595f6dd84e4d27ffaad33dc5a8.jpg", "https://i.pinimg.com/736x/ad/fa/a4/adfaa487d41cc8265b48bcbb214147f4.jpg"],
    },
    {
      name: "Apple Watch Series 9",
      description: "45mm Aluminum Case || Always-On Retina Display || S9 SiP || Blood Oxygen App",
      price: 45900.00,
      stock: 22,
      category: ProductCategory.ELECTRONICS,
      image: ["https://i.pinimg.com/736x/5e/7b/81/5e7b81e42f7d09debd0eaed9885169c6.jpg", "https://i.pinimg.com/736x/12/a8/65/12a865fdce7287a48fbc2847a186d737.jpg"],
    },
    {
      name: "AirPods Pro (2nd Gen)",
      description: "Active Noise Cancellation || Transparency Mode || MagSafe Charging Case",
      price: 26900.00,
      stock: 30,
      category: ProductCategory.ELECTRONICS,
      image: ["https://i.pinimg.com/736x/c4/85/da/c485da69c17491fdba97fd07949d307c.jpg", "https://i.pinimg.com/1200x/44/8d/d3/448dd30d0f2d2198e0ee3cc83858ce2a.jpg"],
    },
  ]

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

  console.log("=> Apple Products ✅");

}
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing products and cart items
  await prisma.cartItem.deleteMany({});
  await prisma.product.deleteMany({});

  // Seed products
  await prisma.product.createMany({
    data: [
      {
        slug: "sneaker-neo",
        name: "Sneaker Neo",
        price: "79,99 €",
        priceCents: 7999,
        category: "Chaussures",
        shortDescription: "Une basket légère et moderne pour tous les jours.",
        description:
          "La Sneaker Neo combine amorti souple, style minimaliste et maintien confortable pour un look urbain polyvalent.",
        image: "/products/sneaker-neo.svg",
      },
      {
        slug: "sac-a-dos-travel",
        name: "Sac à dos Travel",
        price: "59,99 €",
        priceCents: 5999,
        category: "Bagagerie",
        shortDescription: "Un sac à dos durable et élégant pour partir en voyage.",
        description:
          "Conçu avec plusieurs compartiments, un support dorsal renforcé et des matériaux résistants à l’eau.",
        image: "/products/sac-a-dos-travel.svg",
      },
      {
        slug: "t-shirt-relax",
        name: "T-shirt Relax",
        price: "24,99 €",
        priceCents: 2499,
        category: "Textile",
        shortDescription: "Un t-shirt confortable, idéal pour le quotidien.",
        description:
          "Coupe décontractée, coton doux et finition légère pour un confort optimal toute la journée.",
        image: "/products/t-shirt-relax.svg",
      },
    ],
  });

  console.log("Seeding completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

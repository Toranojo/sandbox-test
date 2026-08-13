import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.asset.count();
  if (count > 0) {
    console.log("Assets already exist, skipping seed.");
    return;
  }

  await prisma.asset.createMany({
    data: [
      {
        category: "GOLD",
        pricingMode: "WEIGHT",
        name: "K18 インゴット",
        weightGrams: 20,
        purity: "K18",
        quantity: 1,
        purchasePrice: 220_000,
        purchaseDate: new Date("2024-03-10"),
      },
      {
        category: "WATCH",
        pricingMode: "ITEM",
        name: "ロレックス サブマリーナ",
        brand: "Rolex",
        model: "Submariner 116610LN",
        quantity: 1,
        purchasePrice: 1_400_000,
        purchaseDate: new Date("2023-06-01"),
      },
      {
        category: "BAG",
        pricingMode: "ITEM",
        name: "エルメス バーキン30",
        brand: "Hermès",
        model: "Birkin 30",
        quantity: 1,
        purchasePrice: 2_100_000,
        purchaseDate: new Date("2022-11-20"),
      },
    ],
  });

  console.log("Seeded 3 demo assets.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

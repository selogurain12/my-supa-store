import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const start = performance.now();
  const products = await prisma.product.findMany({
    where: {},
    orderBy: { createdAt: "desc" },
    take: 4,
    select: {
      slug: true,
      name: true,
      price: true,
      shortDescription: true,
      image: true,
      category: true,
    },
  });
  const duration = (performance.now() - start).toFixed(0);
  console.log(`[mockShop] fetch products ${duration}ms`);

  return NextResponse.json({
    success: true,
    products,
    fetchedAt: new Date().toISOString(),
    duration,
  });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCartSummary } from "@/lib/cart";

export async function GET() {
  const summary = await getCartSummary();
  return NextResponse.json({ success: true, summary });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const productId = Number(body.productId);
    const action = body.action || "add";
    const quantity = Number(body.quantity ?? 1);

    if (!productId || Number.isNaN(productId)) {
      return NextResponse.json(
        { success: false, error: "productId must be a valid number" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Produit introuvable" },
        { status: 404 }
      );
    }

    const existingItem = await prisma.cartItem.findUnique({ where: { productId } });

    if (action === "remove") {
      if (existingItem) {
        await prisma.cartItem.delete({ where: { productId } });
      }
    } else if (action === "update") {
      if (quantity <= 0) {
        if (existingItem) {
          await prisma.cartItem.delete({ where: { productId } });
        }
      } else if (existingItem) {
        await prisma.cartItem.update({
          where: { productId },
          data: { quantity },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            productId,
            quantity,
          },
        });
      }
    } else {
      if (existingItem) {
        await prisma.cartItem.update({
          where: { productId },
          data: { quantity: existingItem.quantity + quantity },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            productId,
            quantity,
          },
        });
      }
    }

    const summary = await getCartSummary();
    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error("Erreur API cart POST:", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

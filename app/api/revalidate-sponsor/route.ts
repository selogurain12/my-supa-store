import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST() {
  revalidateTag("sponsored-products");
  revalidatePath("/");

  return NextResponse.json({ success: true });
}

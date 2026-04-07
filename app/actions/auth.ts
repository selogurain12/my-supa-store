"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!email || !password) {
    throw new Error("L'email et le mot de passe sont requis.");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Cette adresse email est déjà utilisée.");
  }

  const passwordHash = await hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
      role: "user",
    },
  });

  redirect("/auth/login?registered=1");
}

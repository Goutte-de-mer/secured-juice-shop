"use server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { registerSchema } from "../../../lib/zod";
import { auth } from "@/auth";

export async function registerUser(prevState, formData) {
  const session = await auth();
  try {
    // Extraction et validation
    const rawData = {
      email: formData.get("email"),
      name: formData.get("name"),
      lastName: formData.get("lastName"),
      password: formData.get("password"),
      role: session?.user?.role === "ADMIN" ? formData.get("role") : "USER",
    };

    const { email, name, lastName, password } = registerSchema.parse(rawData);

    // Vérification utilisateur existant
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        error: ["Un utilisateur avec cet email existe déjà"],
      };
    }

    // Création utilisateur
    const hashPassword = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        name,
        lastName,
        email,
        role: rawData.role,
        password: hashPassword,
      },
    });

    return { success: "Inscription réussie" };
  } catch (error) {
    if (error.name === "ZodError") {
      const errorMessages = error.errors.map((err) => err.message);
      return {
        error: errorMessages,
      };
    }

    console.log("Error in registerUser:", error);
    return { error: ["Une erreur s'est produite lors de l'inscription"] };
  }
}

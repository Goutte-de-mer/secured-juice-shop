"use server";
import { auth } from "@/auth";
import { prisma } from "../../../lib/prisma";

export async function updateUser(field, value) {
  const session = await auth();

  if (!session) {
    return { error: "Utilisateur non authentifié" };
  }

  // Liste des champs autorisés
  const allowedFields = ["name", "lastName", "email"];

  if (!allowedFields.includes(field)) {
    return { error: "Manipulation non autorisée" };
  }

  if (!value || value.trim() === "" || value.length <= 1) {
    return { error: "Le champ ne peut pas être vide" };
  }

  if (value.length > 32) {
    return { error: "Le champ ne peut pas faire plus de 32 caractères" };
  }

  // Validation email
  if (field === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { error: "Format de l'email invalide" };
    }

    // Vérifier unicité email
    const existingUser = await prisma.user.findFirst({
      where: {
        email: value,
        id: { not: session.user.id },
      },
    });

    if (existingUser) {
      return { error: "Cet email est déjà utilisé" };
    }
  }

  // Mettre à jour
  await prisma.user.update({
    where: { id: parseInt(session.user.id) },
    data: { [field]: value },
  });

  return { success: true, message: "Profil mis à jour avec succès" };
}

"use server";
import { auth } from "@/auth";
import { prisma } from "../../../lib/prisma";
import { productSchema } from "../../../lib/zod";

export async function addProduct(prevState, formData) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Vous devez être connecté pour ajouter un produit" };
    }

    // Extraction et validation
    const rawData = {
      description: formData.get("description"),
      name: formData.get("name"),
      price: formData.get("price"),
      imageUrl: formData.get("imageUrl"),
    };

    const { price, name, description, imageUrl } = productSchema.parse(rawData);

    // Création du produit
    await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl: imageUrl || null,
      },
    });

    return { success: "Produit ajouté avec succès" };
  } catch (error) {
    if (error.name === "ZodError") {
      const errorMessages = error.errors.map((err) => err.message);
      return {
        error: errorMessages,
      };
    }

    // console.log("Error in registerUser:", error);
    return {
      error: "Une erreur s'est produite lors de la création du produit",
    };
  }
}

export async function deleteProduct(id) {
  const session = await auth();
  if (!session) {
    return { error: "Not allowed" };
  }
  try {
    await prisma.product.delete({
      where: { id: id },
    });
    return { success: "Produit supprimé" };
  } catch (error) {
    console.log(error);
    return { error: "Un problème est surnvenu" };
  }
}

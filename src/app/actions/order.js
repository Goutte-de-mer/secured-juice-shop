"use server";

import { auth } from "@/auth";
import { prisma } from "../../../lib/prisma";

export async function createOrder(data) {
  const session = await auth();
  try {
    if (!session)
      return { success: false, error: "Connectez vous pour pouvoir commander" };
    const userId = parseInt(session?.user.id);
    const { items } = data;

    if (!userId || !items || items.length === 0) {
      return {
        success: false,
        error: "Données invalides : userId et items sont requis",
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        success: false,
        error: "Utilisateur non trouvé",
      };
    }

    // Récupérer les produits pour calculer le total et vérifier leur existence
    const productIds = items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
    });

    if (products.length !== productIds.length) {
      return {
        success: false,
        error: "Un ou plusieurs produits n'existent pas",
      };
    }

    // Calculer le total et préparer les orderItems
    let total = 0;
    const orderItemsData = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new Error(`Produit ${item.productId} non trouvé`);
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      };
    });

    // Créer la commande avec les orderItems en une seule transaction
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: "PENDING",
        orderItems: {
          create: orderItemsData,
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    return {
      success: true,
      data: order,
      message: "Commande créée avec succès",
    };
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    return {
      success: false,
      error: "Erreur interne du serveur",
    };
  }
}

export async function getUserOrders() {
  const session = await auth();

  try {
    if (!session) {
      return {
        success: false,
        error: "Connectez-vous pour voir vos commandes",
      };
    }

    const userId = parseInt(session?.user.id);

    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: orders,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    return {
      success: false,
      error: "Erreur interne du serveur",
    };
  }
}

export async function getAllOrders() {
  const session = await auth();

  try {
    if (!session) {
      return {
        success: false,
        error: "Connectez-vous pour accéder à cette fonctionnalité",
      };
    }

    // Vérifier si l'utilisateur est admin
    const user = await prisma.user.findUnique({
      where: { id: parseInt(session?.user.id) },
    });

    if (!user || user.role !== "ADMIN") {
      return {
        success: false,
        error: "Accès refusé : droits administrateur requis",
      };
    }

    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: orders,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    return {
      success: false,
      error: "Erreur interne du serveur",
    };
  }
}

// Mettre à jour le statut d'une commande (ADMIN SEULEMENT)
export async function updateOrderStatus(orderId, newStatus) {
  const session = await auth();

  try {
    if (!session) {
      return {
        success: false,
        error: "Connectez-vous pour accéder à cette fonctionnalité",
      };
    }

    // Vérifier si l'utilisateur est admin
    const user = await prisma.user.findUnique({
      where: { id: parseInt(session?.user.id) },
    });

    if (!user || user.role !== "ADMIN") {
      return {
        success: false,
        error: "Accès refusé : droits administrateur requis",
      };
    }

    // Valider le statut
    const validStatuses = [
      "PENDING",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ];
    if (!validStatuses.includes(newStatus)) {
      return {
        success: false,
        error: "Statut invalide",
      };
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    return {
      success: true,
      data: updatedOrder,
      message: `Statut mis à jour vers ${newStatus}`,
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    return {
      success: false,
      error: "Erreur interne du serveur",
    };
  }
}

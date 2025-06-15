import { object, string } from "zod";

export const productSchema = object({
  name: string({ required_error: "Le nom du produit est nécessaire" })
    .min(1, "Le nom du produit est nécessaire")
    .max(64, "Le nom du produit ne peut pas faire plus de 64 caractères"),
  price: string({ required_error: "Le prix est nécessaire" })
    .min(1, "Le prix est nécessaire")
    .regex(/^\d+(\.\d{1,2})?$/, "Le prix doit être un nombre valide")
    .transform((val) => parseFloat(val))
    .refine(
      (val) => val > 0 && val <= 999999,
      "Le prix doit être entre 0 et 999999",
    ),
  description: string({ required_error: "La description est nécessaire" })
    .min(1, "La description est nécessaire")
    .max(512, "La description ne peut pas faire plus de 512 caractères"),
  imageUrl: string().url("L'URL de l'image n'est pas valide").optional(),
});

export const signInSchema = object({
  email: string({ required_error: "L'email est nécessaire" })
    .min(1, "L'email est nécessaire")
    .email("Format de l'email invalide"),
  password: string({ required_error: "Le mot de passe est nécessaire" })
    .min(1, "Le mot de passe est nécessaire")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(32, "Le mot de passe ne peut pas faire plus de 32 caractères"),
});

export const registerSchema = signInSchema.extend({
  name: string({ required_error: "Le nom est nécessaire" })
    .min(2, "Le nom est nécessaire")
    .max(32, "Le prénom ne peut pas faire plus de 32 caractères"),
  lastName: string({ required_error: "Le prénom est nécessaire" })
    .min(1, "Le prénom est nécessaire")
    .max(32, "Le nom ne peut pas faire plus de 32 caractères"),
  password: string({ required_error: "Le mot de passe est nécessaire" })
    .min(1, "Le mot de passe est nécessaire")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(32, "Le mot de passe ne peut pas faire plus de 32 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(
      /[\W_]/,
      "Le mot de passe doit contenir au moins un caractère spécial",
    ),
});

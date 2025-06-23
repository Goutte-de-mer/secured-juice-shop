# Juice Shop Sécurisé

Un site e-commerce moderne développé avec Next.js, mettant l'accent sur la sécurité et les bonnes pratiques de développement web.

## Description des fonctionnalités

Le site Juice Shop propose une gamme complète de fonctionnalités e-commerce sécurisées :

- **Inscription et authentification** sécurisées des utilisateurs avec NextAuth.js et hashage des mots de passe
- **Gestion des rôles** (utilisateur/admin) pour restreindre l'accès aux fonctionnalités sensibles
- **Catalogue de produits** avec ajout, affichage et gestion complète
- **Panier d'achat** côté client avec persistance
- **Système de commentaires** sur les produits
- **Gestion du profil utilisateur** avec modification sécurisée des informations personnelles
- **Historique des commandes** pour le suivi des achats

## Architecture technique

### Stack technologique

- **Framework** : Next.js avec App Router
- **Base de données** : Prisma ORM
- **Authentification** : NextAuth.js
- **Validation** : Zod pour la validation des schémas
- **Sécurité** : bcrypt pour le hashage des mots de passe
- **Architecture** : Server Actions (pas d'API REST traditionnelle)

### Avantages sécuritaires des Server Actions

L'utilisation des Server Actions Next.js au lieu d'une API REST classique apporte plusieurs avantages de sécurité significatifs :

- **Exécution côté serveur** : Le code métier reste entièrement côté serveur, réduisant la surface d'attaque
- **Pas d'exposition d'endpoints** : Aucune route API publique à sécuriser, moins de points d'entrée potentiels
- **Validation automatique** : Les données sont validées automatiquement avant traitement
- **Protection CSRF native** : Next.js gère automatiquement la protection contre les attaques CSRF
- **Session intégrée** : Accès direct à la session utilisateur sans parsing de tokens
- **Principe du moindre privilège** : Chaque action a un scope limité et spécifique

## Sécurisation contre les vulnérabilités OWASP

| Vulnérabilité OWASP            | Traitement dans le projet                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| **Injection SQL**              | Utilisation de Prisma ORM qui protège nativement contre les injections SQL           |
| **XSS (Cross-Site Scripting)** | Next.js échappe automatiquement les valeurs, aucun HTML brut injecté                 |
| **CSRF**                       | NextAuth.js + Server Actions protègent contre les attaques CSRF                      |
| **Broken Authentication**      | Authentification robuste avec NextAuth.js, sessions sécurisées, mots de passe hashés |
| **Sensitive Data Exposure**    | Mots de passe hashés avec bcrypt, aucune donnée sensible exposée côté client         |
| **Access Control**             | Vérification systématique des rôles et de l'authentification sur chaque action       |
| **Validation des entrées**     | Validation stricte avec Zod sur toutes les entrées utilisateur                       |
| **Unicité des données**        | Vérification de l'unicité des emails et autres contraintes métier                    |
| **Sécurité des mots de passe** | Politique de mots de passe forts avec critères stricts                               |
| **Protection DDoS**            | Utilisation de Cloudflare pour mitiger les attaques par déni de service              |

## Preuves de sécurisation

### Authentification - Mesures de Sécurité

- **Validation** : Schémas Zod sur toutes les entrées utilisateur

  ```js
  const { email, password } = await signInSchema.parseAsync(credentials);
  ```

- **Gestion d'erreurs** : Messages uniformes sans révéler d'infos

  ```js
  class InvalidLoginError extends CredentialsSignin {
    code = "invalid_credentials";
    message = "Email ou mot de passe non valide";
  }
  ```

- **Sessions JWT** : Données utilisateur sécurisées dans le token

  ```js
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.role = user.role;
    }
    return token;
  }
  ```

- **Protection** : Exclusion du mot de passe des données retournées
  ```js
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    // password exclu volontairement
  };
  ```

### Hashage sécurisé des mots de passe

```javascript
const hashPassword = await bcrypt.hash(password, 12);
await prisma.user.create({
  data: {
    name,
    lastName,
    email,
    password: hashPassword,
  },
});
```

### Validation robuste des entrées utilisateur

```javascript
export const registerSchema = signInSchema.extend({
  name: string().min(2).max(32),
  lastName: string().min(1).max(32),
  password: string()
    .min(8)
    .max(32)
    .regex(/[A-Z]/) // Au moins une majuscule
    .regex(/[a-z]/) // Au moins une minuscule
    .regex(/[0-9]/) // Au moins un chiffre
    .regex(/[\W_]/), // Au moins un caractère spécial
});
```

### Protection par authentification

```javascript
const session = await auth();
if (!session) {
  redirect("/api/auth/signin");
}
```

### Contrôle d'accès basé sur les rôles

```javascript
{
  session?.user?.role === "ADMIN" && (
    <Link href={"/add-product"}>Ajouter un produit</Link>
  );
}
```

### Protection contre l'injection SQL avec Prisma

```javascript
const products = await prisma.product.findMany({
  where: {
    name: {
      contains: searchTerm, // Prisma échappe automatiquement
    },
  },
  orderBy: { name: "asc" },
});
```

### Vérification d'unicité des données

```javascript
const existingUser = await prisma.user.findFirst({
  where: {
    email: value,
    id: { not: session.user.id },
  },
});
if (existingUser) {
  return { error: "Cet email est déjà utilisé" };
}
```

## Installation et démarrage

```bash
# Cloner le projet
git clone [url-du-repo]
cd juice-shop-secure

# Installer les dépendances
npm install

# Configurer la base de données
npx prisma generate
npx prisma db push

# Importer les produits de démonstration
npx prisma db execute --file ./products.sql --schema ./prisma/schema.prisma

# Démarrer en développement
npm run dev
```

## Création d'un compte administrateur

Pour accéder aux fonctionnalités d'administration :

### Pour le premier compte administrateur

1. **Créer un compte utilisateur normal** via l'interface d'inscription
2. **Ouvrir Prisma Studio** :
   ```bash
   npx prisma studio
   ```
3. **Naviguer vers la table `User`**
4. **Modifier le champ `role`** de l'utilisateur de `USER` à `ADMIN`
5. **Sauvegarder** et se reconnecter

Vous aurez maintenant accès aux fonctionnalités d'administration comme l'ajout de produits, l'ajout de compte utilisateur ou administrateur, etc.

## Variables d'environnement

1. Créer un fichier `.env.local` avec :

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

2. Générer un secret sécurisé

```bash
# Avec NextAuth/Auth.js
npx auth secret
```

## Bonnes pratiques implémentées

- **Principe de défense en profondeur** : Validation à plusieurs niveaux
- **Authentification forte** : Sessions sécurisées et mots de passe robustes
- **Autorisation granulaire** : Contrôle d'accès basé sur les rôles
- **Validation stricte** : Toutes les entrées utilisateur sont validées
- **Chiffrement des données** : Mots de passe hashés avec bcrypt
- **Protection contre les attaques courantes** : CSRF, XSS, injection SQL
- **Logging sécurisé** : Aucune donnée sensible dans les logs

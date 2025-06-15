import Product from "@/components/Product";
import { prisma } from "../../lib/prisma";

export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <div className="mt-15 grid grid-cols-1 items-center justify-items-center gap-6 px-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <p className="text-green font-body text-md text-lg">Montserrat</p>
      <p className="text-grapefruit text-md font-title font-bold">Moira one</p>
      <p className="text-md">Default</p>
      <p className="font-title-bis">Bagel fat one</p>
    </>
  );
}

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return products;
  } catch (error) {
    // console.error("Erreur lors du fetch des produits:", error);
    return [];
  }
}

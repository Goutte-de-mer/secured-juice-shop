"use client";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faShoppingCart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { deleteProduct } from "@/app/actions/product";

const Product = ({ product }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (quantity = 1) => {
    addToCart(product, quantity);
  };

  const handleDeleteProduct = async () => {
    const response = await deleteProduct(product.id);
    if (response.success) setIsOpen(false);
  };

  return (
    <>
      {/* Miniature */}
      <div
        onClick={() => setIsOpen(true)}
        className="h-full w-full cursor-pointer overflow-hidden rounded-md bg-[#f6f6f6] pb-3.5 transition hover:shadow-md active:scale-95"
      >
        <img
          className="h-36 w-full object-cover"
          src={product.imageUrl}
          alt={product.name}
        />
        <h3 className="font-title-bis text-orange mt-3 text-center">
          {product.name}
        </h3>
      </div>

      {/* Modale */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" />

        <div className="fixed inset-0 flex items-start justify-center overflow-y-auto p-4">
          <DialogPanel
            transition
            className="relative max-w-md rounded-lg bg-white p-6 pt-11 duration-200 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4"
            >
              <FontAwesomeIcon
                icon={faTimes}
                size="xl"
                className="text-orange hover:text-lemon transition"
              />
            </button>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="mb-4 h-80 w-full object-cover"
            />
            <h2 className="mb-2 text-xl font-bold">{product.name}</h2>
            <p className="mb-4 text-gray-600">{product.description}</p>
            <p className="text-green mb-4 text-lg font-bold">
              {product.price}€
            </p>
            <button
              className="bg-orange hover:bg-lemon w-full rounded-md px-4 py-2 text-white transition active:scale-95"
              onClick={() => handleAddToCart()}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              Ajouter au panier
            </button>
            {session?.user.role === "ADMIN" && (
              <button
                className="hover:bg-grapefruit mt-4 w-full rounded-md bg-red-400 px-4 py-2 text-white transition active:scale-95"
                onClick={handleDeleteProduct}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                Supprimer le produit
              </button>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Product;

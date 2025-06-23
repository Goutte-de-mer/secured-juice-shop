"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";
import { useTransition } from "react";
import { createOrder } from "@/app/actions/order";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const [isPending, startTransition] = useTransition();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Votre panier est vide");
      return;
    }

    startTransition(async () => {
      const result = await createOrder({
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      if (result.success) {
        clearCart();
        alert(`Commande créée avec succès ! N°${result.data.id}`);
      } else {
        console.error("Erreur:", result.error);
        alert(`Erreur: ${result.error}`);
      }
    });
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="border-b border-b-gray-300 py-4">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">{item.price}€</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="rounded bg-gray-200 px-2 py-1"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="rounded bg-gray-200 px-2 py-1"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-auto cursor-pointer p-1 hover:text-[#6f6f6f]"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="transition"
                    size="lg"
                  />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4">
            <p className="font-semibold">Total: {getCartTotal()}€</p>
            <div className="space-x-4">
              <button
                onClick={clearCart}
                className="hover:bg-grapefruit mt-2 rounded bg-red-400 px-4 py-2 text-white transition active:scale-95"
              >
                Vider le panier
              </button>
              <button
                onClick={handleCheckout}
                disabled={isPending}
                className="bg-green flex-1 rounded px-4 py-2 text-white transition hover:bg-green-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "Création de la commande..." : "Commander"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;

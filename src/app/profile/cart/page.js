"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useCart } from "@/context/CartContext";
const page = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  return (
    <div className="flex-1 py-5 pr-8">
      <h1 className="font-title-bis text-orange text-4xl">Panier</h1>
      <div className="mt-6">
        {cartItems.length === 0 ? (
          <p>Votre panier est vide</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="border-b py-4">
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
              <p className="text-lg font-bold">Total: {getCartTotal()}€</p>
              <button
                onClick={clearCart}
                className="hover:bg-grapefruit mt-2 rounded bg-red-400 px-4 py-2 text-white transition active:scale-95"
              >
                Vider le panier
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default page;

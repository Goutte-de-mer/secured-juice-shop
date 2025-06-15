import { useCart } from "@/context/CartContext";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";

const CartBtn = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
    getCartCount,
  } = useCart();
  return (
    <>
      <Popover className={"relative"}>
        {cartItems.length > 0 && (
          <div className="absolute -top-2 -right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white">
            {getCartCount()}
          </div>
        )}
        <PopoverButton
          className={
            "flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/35 focus-visible:outline-none data-[active]:bg-white/35"
          }
        >
          <FontAwesomeIcon
            className="text-grapefruit text-2xl"
            icon={faShoppingCart}
          />
        </PopoverButton>
        <PopoverPanel
          anchor="bottom"
          transition
          className={
            "flex flex-col rounded-sm bg-white px-6 py-4 shadow-md transition duration-200 data-closed:translate-y-1 data-closed:opacity-0"
          }
        >
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
        </PopoverPanel>
      </Popover>
    </>
  );
};

export default CartBtn;

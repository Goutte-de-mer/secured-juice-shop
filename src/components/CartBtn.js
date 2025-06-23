import { useCart } from "@/context/CartContext";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Cart from "./Cart";

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
          <Cart />
        </PopoverPanel>
      </Popover>
    </>
  );
};

export default CartBtn;

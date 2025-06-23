import Cart from "@/components/Cart";

const page = () => {
  return (
    <div className="flex-1 py-5 pr-8">
      <h1 className="font-title-bis text-orange text-4xl">Panier</h1>
      <div className="mt-6">
        <Cart />
      </div>
    </div>
  );
};

export default page;

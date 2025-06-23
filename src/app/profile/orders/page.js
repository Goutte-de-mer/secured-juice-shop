"use client";
import { getUserOrders } from "@/app/actions/order";
import { useEffect, useState } from "react";

const page = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await getUserOrders();

      if (result.success) {
        setOrders(result.data);
      } else {
        setError(result.error);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex-1 py-5 pr-8">
        <h1 className="font-title-bis text-orange text-4xl">Commandes</h1>
        <div className="mt-6">
          <p>Chargement...</p>
        </div>
      </div>
    );
  if (error) return <div>Erreur: {error}</div>;
  return (
    <div className="flex-1 py-5 pr-8">
      <h1 className="font-title-bis text-orange text-4xl">Commandes</h1>
      <div className="mt-6">
        {loading && <p>Chargement...</p>}

        {orders.length === 0 ? (
          <p>Aucune commande trouvée</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg border border-gray-300 p-4"
            >
              <div className="mb-2 flex items-start justify-between">
                <h3 className="font-semibold">Commande #{order.id}</h3>
                <span
                  className={`rounded px-2 py-1 text-sm ${
                    order.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "COMPLETED"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="mb-2 text-sm">
                {new Date(order.createdAt).toLocaleDateString("fr-FR")}
              </p>

              <div className="mb-2 space-y-1">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} x{item.quantity}
                    </span>
                    <span>{(item.price * item.quantity).toFixed(2)}€</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-t-gray-300 pt-2 font-semibold">
                Total: {order.total.toFixed(2)}€
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default page;

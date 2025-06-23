"use client";

import { getAllOrders, updateOrderStatus } from "@/app/actions/order";
import { useEffect, useState, useTransition } from "react";

const page = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await getAllOrders();

      if (result.success) {
        setOrders(result.data);
      } else {
        setError(result.error);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = (orderId, newStatus) => {
    startTransition(async () => {
      const result = await updateOrderStatus(orderId, newStatus);

      if (result.success) {
        // Mettre à jour la liste locale
        setOrders((prev) =>
          prev.map((order) => (order.id === orderId ? result.data : order)),
        );
        alert(result.message);
      } else {
        alert(`Erreur: ${result.error}`);
      }
    });
  };

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
      <h1 className="font-title-bis text-orange text-4xl">
        Commandes utilisateurs
      </h1>
      <div className="mt-6 space-y-4">
        {orders.length === 0 ? (
          <p>Aucune commande trouvée</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-lg border border-gray-300 bg-white p-4 shadow"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Commande #{order.id}
                    </h3>
                    <p className="text-gray-600">
                      {order.user.name} {order.user.lastName} (
                      {order.user.email})
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="text-right">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusUpdate(order.id, e.target.value)
                      }
                      disabled={isPending}
                      className="cursor-pointer rounded px-2 py-1 text-sm"
                    >
                      <option value="PENDING">En attente</option>
                      <option value="PROCESSING">En cours</option>
                      <option value="SHIPPED">Expédiée</option>
                      <option value="DELIVERED">Livrée</option>
                      <option value="CANCELLED">Annulée</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3 space-y-2">
                  <h4 className="font-medium">Articles:</h4>
                  {order.orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between rounded bg-gray-50 p-2 text-sm"
                    >
                      <span>
                        {item.product.name} x{item.quantity}
                      </span>
                      <span>{(item.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-t-gray-300 pt-2 text-lg font-semibold">
                  Total: {order.total.toFixed(2)}€
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

"use client";
import EditableField from "@/components/EditableField";
import { useSession } from "next-auth/react";
import { updateUser } from "../actions/user";
import { useState } from "react";
const page = () => {
  const { data: session, update } = useSession();
  const [error, setError] = useState(null);

  const handleSave = async (field, value) => {
    const response = await updateUser(field, value);
    if (response.error) {
      setError(response.error);
      return;
    } else {
      setError(null);
    }
    await update({
      user: {
        ...session.user,
        [field]: value,
      },
    });
  };

  return (
    <div className="flex-1 py-5 pr-8">
      <h1 className="font-title-bis text-orange text-4xl">Profil</h1>
      <div className="mt-6 space-y-4">
        {error && (
          <div className="mb-4 text-red-400">
            <p>{error}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <EditableField
            label="Prénom"
            value={session ? session.user.name : "Chargement..."}
            onSave={(value) => handleSave("name", value)}
          />
          <EditableField
            label="Nom"
            value={session ? session.user.lastName : "Chargement..."}
            onSave={(value) => handleSave("lastName", value)}
          />
        </div>
        <EditableField
          label="Email"
          value={session ? session.user.email : "Chargement..."}
          onSave={(value) => handleSave("email", value)}
          type="email"
        />
      </div>
    </div>
  );
};

export default page;

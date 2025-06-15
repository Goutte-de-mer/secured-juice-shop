"use client";
import { useSession } from "next-auth/react";
import { useActionState } from "react";
import { redirect } from "next/navigation";
import { addProduct } from "../actions/product";

const page = () => {
  const { data: session } = useSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const [state, formAction] = useActionState(addProduct, null);

  return (
    <div className="px-14 pt-9 pb-4">
      <h1 className="font-title-bis text-orange text-center text-4xl">
        Nouveau produit
      </h1>
      {state?.error && (
        <div className="space-y-1">
          {(Array.isArray(state.error) ? state.error : [state.error]).map(
            (error, index) => (
              <p key={index} className="text-center text-sm text-red-400">
                • {error}
              </p>
            ),
          )}
        </div>
      )}
      {state?.success && (
        <p className="text-center text-green-400">{state.success}</p>
      )}
      <form
        action={formAction}
        className="mx-auto mt-15 grid max-w-md grid-rows-4 space-y-5"
      >
        <div className="flex justify-between gap-4">
          <div className="formInputContainer">
            <input
              id="name"
              name="name"
              type="text"
              className="peer formInput"
              required
            />
            <label htmlFor="name" className="label">
              Nom du produit
            </label>
          </div>

          <div className="formInputContainer">
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              className="peer formInput"
              required
            />
            <label htmlFor="description" className="label">
              Prix
            </label>
          </div>
        </div>
        <div className="formInputContainer">
          <input
            id="description"
            name="description"
            type="textarea"
            className="peer formInput"
            required
          />
          <label htmlFor="description" className="label">
            Description
          </label>
        </div>
        <div className="formInputContainer">
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            className="peer formInput"
          />
          <label htmlFor="imageUrl" className="label">
            Url de l'image
          </label>
        </div>

        <button
          type="submit"
          className="bg-orange hover:bg-lemon mt-5 rounded-xl px-5 py-3 text-lg text-white transition active:scale-90"
        >
          Créer
        </button>
      </form>
    </div>
  );
};

export default page;

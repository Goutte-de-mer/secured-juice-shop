"use client";
import { useActionState } from "react";
import { addProduct } from "@/app/actions/product";

const page = () => {
  const [state, formAction] = useActionState(addProduct, null);

  return (
    <div className="flex-1 py-5 pr-8">
      <h1 className="font-title-bis text-orange text-4xl">Nouveau produit</h1>
      <div className="mt-6 w-full max-w-2xl space-y-4 rounded-lg bg-[#f9f9f9] px-10 py-10">
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
          className="mx-auto grid max-w-md grid-rows-4 space-y-5"
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
    </div>
  );
};

export default page;

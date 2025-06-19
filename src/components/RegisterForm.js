"use client";
import PasswordInput from "./PasswordInput";
import { useSession } from "next-auth/react";

const RegisterForm = ({ formAction }) => {
  const { data: session } = useSession();
  return (
    <form
      action={formAction}
      className="mx-auto grid max-w-lg grid-rows-4 space-y-5"
    >
      <div className="grid grid-cols-2 gap-x-12">
        <div className="formInputContainer">
          <input
            id="name"
            name="name"
            type="text"
            className="peer formInput"
            required
          />
          <label htmlFor="name" className="label">
            Prénom
          </label>
        </div>
        <div className="formInputContainer">
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="peer formInput"
            required
          />
          <label htmlFor="lastName" className="label">
            Nom
          </label>
        </div>
      </div>

      {session?.user?.role === "ADMIN" ? (
        <div className="grid grid-cols-2 gap-x-12">
          <div className="formInputContainer">
            <input
              id="email"
              name="email"
              type="email"
              className="peer formInput"
              required
            />
            <label htmlFor="email" className="label">
              Email
            </label>
          </div>
          <div className="formInputContainer">
            <select
              id="role"
              name="role"
              className="peer formInput cursor-pointer"
              required
              defaultValue={""}
            >
              <option value="" disabled>
                Sélectionner un rôle
              </option>
              <option value="USER">Utilisateur</option>
              <option value="ADMIN">Administrateur</option>
            </select>
            <label htmlFor="role" className="label">
              Role
            </label>
          </div>
        </div>
      ) : (
        <div className="formInputContainer">
          <input
            id="email"
            name="email"
            type="email"
            className="peer formInput"
            required
          />
          <label htmlFor="email" className="label">
            Email
          </label>
        </div>
      )}
      <PasswordInput />

      <button
        type="submit"
        className="bg-orange hover:bg-lemon mt-5 rounded-xl px-5 py-3 text-lg text-white transition active:scale-90"
      >
        Valider
      </button>
    </form>
  );
};

export default RegisterForm;

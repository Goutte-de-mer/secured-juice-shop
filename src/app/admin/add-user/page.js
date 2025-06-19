"use client";
import { useActionState } from "react";
import { registerUser } from "@/app/actions/auth";
import RegisterForm from "@/components/RegisterForm";

const page = () => {
  const [state, formAction] = useActionState(registerUser, null);

  return (
    <div className="flex-1 py-5 pr-8">
      <h1 className="font-title-bis text-orange text-4xl">
        Nouvel utilisateur
      </h1>
      <div className="mt-6 space-y-4">
        {state?.error && (
          <div className="space-y-1">
            {state.error.map((error, index) => (
              <p key={index} className="text-center text-sm text-red-400">
                • {error}
              </p>
            ))}
          </div>
        )}
        {state?.success && (
          <p className="text-center text-green-400">{state.success}</p>
        )}
        <div className="mt-4 w-full max-w-2xl rounded-lg bg-[#f9f9f9] px-10 py-10">
          <RegisterForm formAction={formAction} />
        </div>
      </div>
    </div>
  );
};

export default page;

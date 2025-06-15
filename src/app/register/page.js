"use client";
import { useActionState } from "react";
import { registerUser } from "@/app/actions/auth";
import RegisterForm from "@/components/RegisterForm";

const page = () => {
  const [state, formAction] = useActionState(registerUser, null);

  return (
    <main className="px-8 py-10">
      <h1 className="font-title-bis text-orange mb-4 text-center text-4xl">
        Inscription
      </h1>
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
      <div className="mx-auto mt-4 w-full max-w-2xl rounded-lg bg-[#f9f9f9] px-10 py-10">
        <RegisterForm formAction={formAction} />
      </div>
    </main>
  );
};

export default page;

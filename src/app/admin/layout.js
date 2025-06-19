import { auth } from "@/auth";
import AdminMenu from "@/components/AdminMenu";
import { redirect } from "next/navigation";

export default async ({ children }) => {
  const session = await auth();
  if (!session && session.user.role !== "ADMIN") {
    redirect("/api/auth/signin");
  }
  return (
    <>
      <main className="relative flex min-h-[calc(100vh-6.5rem)] gap-10">
        <AdminMenu />
        {children}
        <div className="bg-grapefruit absolute bottom-0 h-3 w-full"></div>
      </main>
    </>
  );
};

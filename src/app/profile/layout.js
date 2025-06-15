import ProfileMenu from "@/components/ProfileMenu";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async ({ children }) => {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <>
      <main className="relative flex min-h-[calc(100vh-6.5rem)] gap-10">
        <ProfileMenu />
        {children}
        <div className="bg-grapefruit absolute bottom-0 h-3 w-full"></div>
      </main>
    </>
  );
};

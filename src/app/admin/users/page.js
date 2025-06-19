import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { showUsers } from "@/app/actions/user";
import UserCard from "@/components/UserCard";
import { Fragment } from "react";

const page = async () => {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/api/auth/signin");
  }
  const { users } = await showUsers();

  return (
    <div className="flex-1 py-5 pr-8">
      <h1 className="font-title-bis text-orange text-4xl">Utilisateurs</h1>
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 justify-between gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {users ? (
            users.map((user, i) => (
              <Fragment key={i}>
                <UserCard
                  role={user.role}
                  name={user.name}
                  lastName={user.lastName}
                  email={user.email}
                />
              </Fragment>
            ))
          ) : (
            <p>Aucun utilisateur</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;

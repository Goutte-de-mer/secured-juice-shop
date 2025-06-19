"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUsers,
  faUserPlus,
  faLemon,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

const AdminMenu = () => {
  const pathname = usePathname();
  return (
    <aside className="my-auto ml-2.5 h-80 rounded-md bg-[#f6f6f6] p-5">
      <ul className="text-base/13 whitespace-nowrap">
        <li>
          <Link
            href={"/admin/users"}
            className={`hover:text-grapefruit transition ${pathname === "/admin/users" ? "text-grapefruit" : "text-black"}`}
          >
            <FontAwesomeIcon icon={faUsers} className="w-5" />

            <span className="ml-5">Utilisateurs</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/add-user"}
            className={`hover:text-grapefruit transition ${pathname === "/admin/add-user" ? "text-grapefruit" : "text-black"}`}
          >
            <FontAwesomeIcon icon={faUserPlus} className="w-5" />

            <span className="ml-5">Ajouter un utilisateur</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/add-product"}
            className={`hover:text-grapefruit transition ${pathname === "/admin/add-product" ? "text-grapefruit" : "text-black"}`}
          >
            <FontAwesomeIcon icon={faLemon} className="w-5" />

            <span className="ml-5">Ajouter un produit</span>
          </Link>
        </li>
        <li>
          <button
            className="hover:text-grapefruit transition"
            onClick={() => signOut()}
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-5" />
            <span className="ml-5">Déconnexion</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default AdminMenu;

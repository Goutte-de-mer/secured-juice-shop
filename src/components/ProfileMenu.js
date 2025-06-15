"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCartShopping,
  faReceipt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

const ProfileMenu = () => {
  const pathname = usePathname();
  return (
    <aside className="my-auto ml-2.5 h-80 w-52 rounded-md bg-[#f6f6f6] p-5">
      <ul className="text-base/13">
        <li>
          <Link
            href={"/profile"}
            className={`hover:text-grapefruit transition ${pathname === "/profile" ? "text-grapefruit" : "text-black"}`}
          >
            <FontAwesomeIcon icon={faUser} className="w-5" />

            <span className="ml-5">Informations</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/profile/orders"}
            className={`hover:text-grapefruit transition ${pathname === "/profile/orders" ? "text-grapefruit" : "text-black"}`}
          >
            <FontAwesomeIcon icon={faReceipt} className="w-5" />

            <span className="ml-5">Commandes</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/profile/cart"}
            className={`hover:text-grapefruit transition ${pathname === "/profile/cart" ? "text-grapefruit" : "text-black"}`}
          >
            <FontAwesomeIcon icon={faCartShopping} className="w-5" />

            <span className="ml-5">Panier</span>
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

export default ProfileMenu;

"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function SideMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/35"
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon className="text-grapefruit text-xl" icon={faBars} />
      </button>

      {/* Dialog qui contient le menu latéral */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* Fond semi-transparent */}
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 ease-out data-closed:opacity-0"
        />

        {/* Container pour le menu latéral */}
        <div className="fixed inset-y-0 left-0 flex max-w-full">
          {/* Le panneau du menu latéral */}
          <DialogPanel
            transition
            className="w-80 max-w-[80vw] transform bg-white p-6 shadow-xl duration-300 ease-out data-closed:translate-x-[-100%]"
          >
            {/* Contenu du menu */}
            <div className="flex h-full flex-col">
              {/* En-tête du menu */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
              </div>

              {/* Liens du menu */}
              <nav className="flex-1">
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="block rounded p-2 hover:bg-amber-50"
                    >
                      Accueil
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      className="block rounded p-2 hover:bg-amber-50"
                    >
                      Contact
                    </Link>
                  </li>
                  {session?.user?.role === "ADMIN" && (
                    <>
                      <li>
                        <Link
                          href={"/add-product"}
                          className="block rounded p-2 hover:bg-amber-50"
                        >
                          Ajouter un produit
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/add-user"}
                          className="block rounded p-2 hover:bg-amber-50"
                        >
                          Ajouter un utilisateur
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>

              {/* Pied de page du menu */}
              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded bg-gray-100 px-4 py-2 hover:bg-gray-200"
                >
                  Fermer
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

"use client";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  CloseButton,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const ProfileBtn = () => {
  const { data: session } = useSession();
  return (
    <>
      <Popover className={"relative"}>
        <PopoverButton
          className={
            "flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/35 focus-visible:outline-none data-[active]:bg-white/35"
          }
        >
          <FontAwesomeIcon
            className="text-grapefruit text-3xl"
            icon={faCircleUser}
          />
        </PopoverButton>
        <PopoverPanel
          anchor="bottom end"
          transition
          className={
            "flex flex-col rounded-sm bg-white shadow-md transition duration-200 data-closed:translate-y-1 data-closed:opacity-0"
          }
        >
          {session ? (
            <>
              <CloseButton
                as={Link}
                href="/profile"
                className="text-grapefruit px-3.5 py-3 transition hover:bg-amber-50"
              >
                Mon profil
              </CloseButton>
              <CloseButton
                as="button"
                onClick={() => signOut()}
                className="text-grapefruit px-3.5 py-3 transition hover:bg-amber-50"
              >
                Déconnexion
              </CloseButton>
            </>
          ) : (
            <>
              <CloseButton
                as={Link}
                href="/register"
                className="text-grapefruit px-3.5 py-3 transition hover:bg-amber-50"
              >
                S'inscrire
              </CloseButton>
              <CloseButton
                as="button"
                onClick={() => signIn()}
                className="text-grapefruit px-3.5 py-3 transition hover:bg-amber-50"
              >
                Se connecter
              </CloseButton>
            </>
          )}
        </PopoverPanel>
      </Popover>
      {session && (
        <div className="text-grapefruit">
          <span className="font-bold">{session.user.name}</span>
        </div>
      )}
    </>
  );
};

export default ProfileBtn;

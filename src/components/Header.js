"use client";
import ProfileBtn from "./ProfileBtn";
import CartBtn from "./CartBtn";
import Link from "next/link";
import SideMenu from "./SideMenu";

const Header = () => {
  return (
    <header className="bg-green mx-5 grid grid-cols-3 items-center rounded-full px-6 py-3">
      <SideMenu />
      <Link
        href="/"
        className="rounded-full px-3.5 py-3 transition hover:bg-white/35"
      >
        <h1 className="text-grapefruit font-title text-center text-5xl font-extrabold">
          Juice Shop
        </h1>
      </Link>
      <div className="flex items-center gap-x-11 justify-self-end">
        <CartBtn />

        <ProfileBtn />
      </div>
    </header>
  );
};

export default Header;

"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const UserCard = ({ role, name, lastName, email }) => {
  return (
    <div className="flex cursor-pointer items-center rounded-lg bg-[#f6f6f6] px-7 py-4 transition hover:shadow-md active:scale-95">
      <FontAwesomeIcon
        icon={faCircleUser}
        className={`mr-6 text-4xl ${role === "ADMIN" ? "text-grapefruit" : "text-orange"} `}
      />
      <div>
        <p className="mb-1.5 text-lg font-semibold">
          {name} {lastName}
        </p>
        <p className="">{email}</p>
        <p className="text-sm">
          {role === "ADMIN" ? "Administrateur" : "Utilisateur"}
        </p>
      </div>
    </div>
  );
};

export default UserCard;

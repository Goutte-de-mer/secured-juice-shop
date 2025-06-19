"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = () => {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validateLength = (password) =>
    password.length >= 8 && password.length <= 32;
  const validateMixedCase = (password) =>
    /[a-z]/.test(password) && /[A-Z]/.test(password);
  const validateSpecialChar = (password) =>
    /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const validateNumber = (password) => /\d/.test(password);

  const validations = {
    length: validateLength(password),
    mixedCase: validateMixedCase(password),
    specialChar: validateSpecialChar(password),
    number: validateNumber(password),
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const getRuleClass = (isValid) => {
    if (password.length === 0) return "text-gray-400"; // État initial
    return isValid ? "text-green-400" : "text-red-400";
  };

  return (
    <>
      <div className="grid grid-cols-[1fr_auto] items-center gap-x-4">
        <div className="formInputContainer">
          <input
            id="password"
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            className="peer formInput"
            required
          />
          <label htmlFor="password" className="label">
            Mot de passe
          </label>
        </div>
        <FontAwesomeIcon
          icon={isPasswordVisible ? faEye : faEyeSlash}
          size="lg"
          className="cursor-pointer transition hover:text-gray-400 active:scale-95"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
        />
      </div>
      <ul className="grid list-disc grid-cols-2 gap-2 text-xs/6 text-gray-400">
        <li className={getRuleClass(validations.length)}>
          Entre 8 et 32 caractères
        </li>
        <li className={getRuleClass(validations.mixedCase)}>
          Majuscules et minuscules
        </li>
        <li className={getRuleClass(validations.specialChar)}>
          Caractères spéciaux
        </li>
        <li className={getRuleClass(validations.number)}>
          Au moins un chiffre
        </li>
      </ul>
    </>
  );
};

export default PasswordInput;

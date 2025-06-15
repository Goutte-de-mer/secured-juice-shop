"use client";
import { useState } from "react";

const PasswordInput = () => {
  const [password, setPassword] = useState("");

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
      <div className="formInputContainer">
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="peer formInput"
          required
        />
        <label htmlFor="password" className="label">
          Mot de passe
        </label>
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

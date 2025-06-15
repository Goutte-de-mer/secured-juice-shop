"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const EditableField = ({ label, value, onSave, type = "text" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const { update } = useSession();

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleSave = async () => {
    await onSave(currentValue);
    await update();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-300 p-4">
      <div className="flex-1">
        <label className="mb-1 block text-sm font-medium">{label}</label>
        {isEditing ? (
          <input
            type={type}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="w-full text-gray-500 outline-0"
            autoFocus
          />
        ) : (
          <p className="text-gray-900">{value}</p>
        )}
      </div>
      <div className="ml-4">
        {isEditing ? (
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="rounded-full px-3 py-2 text-green-400 transition hover:bg-green-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faCheck} size="lg" />
            </button>
            <button
              onClick={handleCancel}
              className="rounded-full px-3 py-2 text-red-400 transition hover:bg-red-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-grapefruit hover:text-orange transition"
          >
            <FontAwesomeIcon icon={faPen} size="lg" />
          </button>
        )}
      </div>
    </div>
  );
};

export default EditableField;

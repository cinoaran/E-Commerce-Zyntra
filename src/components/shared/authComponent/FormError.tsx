import {CircleAlertIcon} from "lucide-react";
import React from "react";

interface FormErrorProps {
  message?: string;
}

const FormError = ({message}: FormErrorProps) => {
  if (!message) return null; // Return null if the message prop is empty

  return (
    <p
      className={`flex items-start bg-destructive w-full rounded-md text-white text-center p-1 mb-5`}
    >
      <span className="flex items-center justify-center gap-2">
        <CircleAlertIcon size={12} />
        {message}
      </span>
    </p>
  );
};

export default FormError;

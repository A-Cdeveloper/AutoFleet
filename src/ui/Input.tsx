import React, { forwardRef } from "react";
import clsx from "clsx";

export type InputType = {
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
};

const sizeClasses: Record<NonNullable<InputType["size"]>, string> = {
  small: "px-1 py-1 text-sm",
  medium: "px-2 py-1 text-xl",
  large: "px-3 py-1 text-xl",
};

const Input = forwardRef<HTMLInputElement, InputType>(
  (
    {
      type = "text",
      placeholder,
      value,
      onChange,
      name,
      id,
      required = false,
      disabled = false,
      autoFocus = false,
      size = "medium",
      className = "",
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
        className={clsx(
          "w-full border transition-colors duration-200 font-roboto",
          "focus:outline-none focus:ring-1 focus:ring-auto-secondary focus:ring-opacity-50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          sizeClasses[size],
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;

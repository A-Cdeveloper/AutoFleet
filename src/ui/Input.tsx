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
  step?: string | number;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
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
      step,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      "aria-describedby": ariaDescribedby,
      "aria-invalid": ariaInvalid,
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
        step={step}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-invalid={ariaInvalid}
        className={clsx(
          "w-full border transition-colors duration-200 font-roboto",
          "focus:outline-none focus:ring-1 focus:ring-auto-secondary focus:ring-opacity-50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "h-[42px]", // Eksplicitna visina za konzistentnost
          sizeClasses[size],
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;

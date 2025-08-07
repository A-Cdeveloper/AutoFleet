import React, { forwardRef } from "react";
import clsx from "clsx";

export type SelectType = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
  children?: React.ReactNode;
};

const sizeClasses: Record<NonNullable<SelectType["size"]>, string> = {
  small: "px-1 py-1 text-sm",
  medium: "px-2 py-1 text-xl",
  large: "px-3 py-1 text-xl",
};

const Select = forwardRef<HTMLSelectElement, SelectType>(
  (
    {
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
      children,
    },
    ref
  ) => {
    return (
      <select
        ref={ref}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
        className={clsx(
          "w-full border transition-colors duration-200 font-roboto",
          "focus:outline-none focus:ring-1 focus:ring-auto-secondary focus:ring-opacity-50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "h-[42px]", // Eksplicitna visina za konzistentnost
          sizeClasses[size],
          className
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;

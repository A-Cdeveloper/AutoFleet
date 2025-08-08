import React, { forwardRef } from "react";
import clsx from "clsx";

export type SelectType = {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
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
      defaultValue,
      onChange,
      name,
      id,
      required = false,
      disabled = false,
      autoFocus = false,
      size = "medium",
      className = "",
      children,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      "aria-describedby": ariaDescribedby,
      "aria-invalid": ariaInvalid,
    },
    ref
  ) => {
    return (
      <select
        ref={ref}
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-invalid={ariaInvalid}
        className={clsx(
          "w-full border transition-colors duration-200 font-roboto",
          "focus:outline-none focus:ring-1 focus:ring-auto-secondary focus:ring-opacity-50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "h-[42px]",
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

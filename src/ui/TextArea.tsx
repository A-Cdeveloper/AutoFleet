import React, { forwardRef } from "react";
import clsx from "clsx";

export type TextareaType = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
  rows?: number;
};

const sizeClasses: Record<NonNullable<TextareaType["size"]>, string> = {
  small: "px-1 py-1 text-sm",
  medium: "px-2 py-1 text-xl",
  large: "px-3 py-1 text-xl",
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaType>(
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
      rows = 3,
    },
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
        rows={rows}
        className={clsx(
          "w-full border resize-y transition-colors duration-200 font-roboto",
          "focus:outline-none focus:ring-1 focus:ring-auto-secondary focus:ring-opacity-50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          sizeClasses[size],
          className
        )}
      />
    );
  }
);

export default Textarea;

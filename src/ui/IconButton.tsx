import React from "react";
import clsx from "clsx";

export type IconButtonType = {
  icon: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean;
};

const IconButton = ({
  icon,
  disabled = false,
  onClick,
  type = "button",
  className = "",
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  "aria-expanded": ariaExpanded,
  "aria-pressed": ariaPressed,
}: IconButtonType) => {
  return (
    <button
      className={clsx(
        "rounded transition-colors duration-200 flex items-center justify-center p-0 bg-transparent",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}
    >
      {icon}
    </button>
  );
};

export default IconButton;

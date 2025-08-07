import React from "react";
import clsx from "clsx";

export type ButtonType = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  size?: "small" | "medium" | "large";
  variation?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "transparent";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const sizeClasses: Record<NonNullable<ButtonType["size"]>, string> = {
  small: "px-3 py-1",
  medium: "px-4 py-2",
  large: "px-4 py-2",
};

const variationClasses: Record<NonNullable<ButtonType["variation"]>, string> = {
  primary: "bg-auto-primary text-black hover:bg-dark",
  secondary: "bg-auto-secondary text-white hover:bg-auto-dark",
  danger: "bg-auto-error text-white hover:bg-red-700",
  success: "bg-auto-success text-white hover:bg-green-700",
  warning: "bg-auto-warning text-black hover:bg-yellow-600",
  info: "bg-auto-info text-white hover:bg-blue-600",
  transparent:
    "bg-transparent border border-transparent text-auto-secondary hover:text-navy-400 hover:bg-transparent",
};

const Button = ({
  children,
  style,
  size = "medium",
  variation = "primary",
  disabled = false,
  onClick,
  type = "button",
  className = "",
}: ButtonType) => {
  return (
    <button
      style={style}
      className={clsx(
        "rounded transition-colors duration-200 font-semibold font-roboto uppercase tracking-[0.05rem] text-xl",
        sizeClasses[size],
        variationClasses[variation],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

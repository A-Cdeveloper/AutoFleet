import type { JSX } from "react";

type HeadlineProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
};

const Headline = ({ level = 1, children, className = "" }: HeadlineProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const generalClasses = "leading-relaxed text-wrap font-roboto font-semibold";
  let fontSizeClasses = "";

  switch (level) {
    case 1:
      fontSizeClasses = "text-4xl";
      break;
    case 2:
      fontSizeClasses = "text-3xl";
      break;
    case 3:
      fontSizeClasses = "text-2xl";
      break;
    case 4:
      fontSizeClasses = "text-xl md:text-md lg:text-xl";
      break;
    case 5:
      fontSizeClasses = "text-sm md:text-sm lg:text-base";
      break;
    case 6:
      fontSizeClasses = "text-xs md:text-sm lg:text-sm";
      break;
    default:
      fontSizeClasses = "text-base";
  }

  return (
    <Tag className={`${fontSizeClasses} ${generalClasses} ${className}`}>
      {children}
    </Tag>
  );
};

export default Headline;

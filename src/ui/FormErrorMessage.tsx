import clsx from "clsx";

type ErrorMessageProps = {
  message?: string;
  className?: string;
};

const FormErrorMessage = ({ message, className = "" }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <p className={clsx("text-auto-error text-[11px]", className)}>{message}</p>
  );
};

export default FormErrorMessage;

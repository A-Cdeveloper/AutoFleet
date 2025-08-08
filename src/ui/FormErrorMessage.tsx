import clsx from "clsx";

type ErrorMessageProps = {
  message?: string;
  className?: string;
  id?: string;
};

const FormErrorMessage = ({
  message,
  className = "",
  id,
}: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <p
      id={id}
      className={clsx("text-auto-error text-[11px]", className)}
      role="alert"
      aria-live="polite"
    >
      {message}
    </p>
  );
};

export default FormErrorMessage;

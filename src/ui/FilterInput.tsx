import Input from "./Input";

interface FilterInputProps {
  label?: string;
  value: string | number | null | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password";
  className?: string;
  "aria-label"?: string;
}

const FilterInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  "aria-label": ariaLabel,
}: FilterInputProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-1 font-semibold">{label}</label>}
      <Input
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        size="medium"
        aria-label={ariaLabel}
      />
    </div>
  );
};

export default FilterInput;

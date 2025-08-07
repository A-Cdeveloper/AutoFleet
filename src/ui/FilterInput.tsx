import Input from "./Input";

interface FilterInputProps {
  label?: string;
  value: string | number | null | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password";
  className?: string;
}

const FilterInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
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
      />
    </div>
  );
};

export default FilterInput;

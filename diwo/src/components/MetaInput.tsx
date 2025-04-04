import "./MetaInput.css";
import { InputMask } from "@react-input/mask";
import { ChangeEvent } from "react";

type MetaInputProps = {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export const MetaInput = ({
  value,
  onChange,
  required = false,
}: MetaInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Extrai a parte do mês (os dois primeiros dígitos)
    const monthPart = inputValue.slice(0, 2);

    // Verifica se o mês é válido (01-12)
    if (
      monthPart === "" ||
      (monthPart.length === 1 && /^[0-1]?$/.test(monthPart)) ||
      (monthPart.length === 2 && /^(0[1-9]|1[0-2])$/.test(monthPart))
    ) {
      onChange(inputValue);
    }
    // Se não for válido, mantém o valor anterior
  };

  return (
    <div className="meta-container">
      <InputMask
        mask="mm/yyyy"
        replacement={{ m: /[0-9]/, y: /[0-9]/ }}
        value={value}
        onChange={handleChange}
        placeholder="mês/ano"
        className="meta-input"
        required={required}
      />
    </div>
  );
};

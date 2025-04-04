import "./CountrySelect.css";
import { FaGlobeAmericas } from "react-icons/fa";
import { motion } from "framer-motion";

type CountrySelectProps = {
  value: string;
  onChange: (code: string, name: string, flag: string) => void;
};

export const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const countries = [
    { name: "Brasil", flag: "🇧🇷", code: "BR" },
    { name: "Estados Unidos", flag: "🇺🇸", code: "US" },
    { name: "México", flag: "🇲🇽", code: "MX" },
    { name: "Itália", flag: "🇮🇹", code: "IT" },
    { name: "França", flag: "🇫🇷", code: "FR" },
    { name: "Bolívia", flag: "🇧🇴", code: "BO" },
    { name: "Emirados Árabes Unidos", flag: "🇦🇪", code: "AE" },
    { name: "Japão", flag: "🇯🇵", code: "JP" },
  ];

  return (
    <div className="select-container">
      <select
        value={value}
        onChange={(e) => {
          const selected = countries.find((c) => c.code === e.target.value);
          if (selected) {
            onChange(selected.code, selected.name, selected.flag);
          }
        }}
        className="select-field"
      >
        <option value="" disabled>
          Selecione...
        </option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.flag} {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

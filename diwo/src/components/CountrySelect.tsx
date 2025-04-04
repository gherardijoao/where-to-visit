import "./CountrySelect.css";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getCountries, CountryType } from "../services/countriesService";

type CountrySelectProps = {
  value: string;
  onChange: (code: string, name: string, flag: string) => void;
};

// Função para converter código de país em emoji de bandeira
const getFlagEmoji = (countryCode: string) => {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
};

export const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const [countries, setCountries] = useState<
    Array<{
      name: string;
      flag: string;
      code: string;
    }>
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getCountries();

        // Transformar e ordenar os dados da API
        const formattedCountries = data
          .map((country: CountryType) => ({
            name: country.translations.por.common,
            flag: getFlagEmoji(country.cca2),
            code: country.cca2,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(formattedCountries);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar países. Tente novamente mais tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="select-container">
      {loading ? (
        <div className="loading">Carregando países...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
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
            <option className="select" value="" disabled>
              Selecione...
            </option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
          <FiChevronDown className="chevron-icon" />
        </>
      )}
    </div>
  );
};

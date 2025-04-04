import "./CountrySelect.css";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
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
  const [allCountries, setAllCountries] = useState<
    Array<{
      name: string;
      flag: string;
      code: string;
    }>
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

        setAllCountries(formattedCountries);
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

  // Filtrar países com base no termo de pesquisa
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setCountries(allCountries);
    } else {
      const filtered = allCountries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCountries(filtered);
    }
  }, [searchTerm, allCountries]);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Selecionar um país
  const selectCountry = (country: {
    code: string;
    name: string;
    flag: string;
  }) => {
    onChange(country.code, country.name, country.flag);
    setIsOpen(false);
    setSearchTerm("");
  };

  // Abrir dropdown e focar na pesquisa
  const openDropdown = () => {
    setIsOpen(true);
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 10);
  };

  // Renderizar o país selecionado ou placeholder
  const renderSelectedValue = () => {
    if (!value) {
      return <span className="placeholder">Selecione um país...</span>;
    }

    const selectedCountry = allCountries.find((c) => c.code === value);
    return selectedCountry ? (
      <span className="selected-country">
        <span className="country-flag">{selectedCountry.flag}</span>
        <span className="country-name">{selectedCountry.name}</span>
      </span>
    ) : (
      <span className="placeholder">Selecione um país...</span>
    );
  };

  return (
    <div className="select-container" ref={containerRef}>
      {loading ? (
        <div className="loading">Carregando países...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div
            className={`custom-select ${isOpen ? "open" : ""}`}
            onClick={openDropdown}
          >
            {renderSelectedValue()}
            <FiChevronDown className="chevron-icon" />
          </div>

          {isOpen && (
            <div className="dropdown-container">
              <div className="search-container">
                <FiSearch className="search-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Digite para pesquisar..."
                  className="search-input"
                />
              </div>

              <div className="countries-list">
                {countries.length === 0 ? (
                  <div className="no-results">Nenhum país encontrado</div>
                ) : (
                  countries.map((country) => (
                    <div
                      key={country.code}
                      className={`country-option ${
                        value === country.code ? "selected" : ""
                      }`}
                      onClick={() => selectCountry(country)}
                    >
                      <span className="country-flag">{country.flag}</span>
                      <span className="country-name">{country.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

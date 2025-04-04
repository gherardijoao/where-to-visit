import "./Home.css";
import { useState } from "react";
import { FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";
import { CountrySelect } from "../components/CountrySelect";
import { MetaInput } from "../components/MetaInput";
import { PlaceCard } from "../components/PlaceCard";
import { Place } from "../types/Place";
import Lugares from "../assets/Lugares.png";
import { motion, AnimatePresence } from "framer-motion";

export const Home = () => {
  // Places state
  const [places, setPlaces] = useState<Place[]>([
    {
      id: "1",
      country: "Brasil",
      countryCode: "BR",
      flag: "🇧🇷",
      local: "Balneário Camboriú",
      meta: "04/2022",
    },
    {
      id: "2",
      country: "Bolívia",
      countryCode: "BO",
      flag: "🇧🇴",
      local: "Salar de Uyuni",
      meta: "04/2023",
    },
    {
      id: "3",
      country: "Brasil",
      countryCode: "BR",
      flag: "🇧🇷",
      local: "Fortaleza",
      meta: "05/2022",
    },
    {
      id: "4",
      country: "Estados Unidos",
      countryCode: "US",
      flag: "🇺🇸",
      local: "Nova York",
      meta: "12/2022",
    },
    {
      id: "5",
      country: "Estados Unidos",
      countryCode: "US",
      flag: "🇺🇸",
      local: "Filadélfia",
      meta: "12/2022",
    },
    {
      id: "6",
      country: "Emirados Árabes Unidos",
      countryCode: "AE",
      flag: "🇦🇪",
      local: "Dubai",
      meta: "01/2024",
    },
    {
      id: "7",
      country: "França",
      countryCode: "FR",
      flag: "🇫🇷",
      local: "Paris",
      meta: "04/2023",
    },
    {
      id: "8",
      country: "México",
      countryCode: "MX",
      flag: "🇲🇽",
      local: "Cancún",
      meta: "05/2022",
    },
    {
      id: "9",
      country: "Itália",
      countryCode: "IT",
      flag: "🇮🇹",
      local: "Veneza",
      meta: "12/2022",
    },
    {
      id: "10",
      country: "Estados Unidos",
      countryCode: "US",
      flag: "🇺🇸",
      local: "Disney World",
      meta: "12/2022",
    },
  ]);

  // Form state
  const [newPlace, setNewPlace] = useState<Omit<Place, "id">>({
    country: "",
    countryCode: "",
    flag: "",
    local: "",
    meta: "",
  });

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);

  // Add new place
  const handleAddPlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlace.local || !newPlace.meta || !newPlace.country) return;

    setPlaces([
      ...places,
      {
        ...newPlace,
        id: Date.now().toString(),
      },
    ]);

    setNewPlace({
      country: "",
      countryCode: "",
      flag: "",
      local: "",
      meta: "",
    });
  };

  // Start edit
  const handleEdit = (id: string) => {
    const placeToEdit = places.find((place) => place.id === id);
    if (placeToEdit) {
      setEditingId(id);
      setEditingPlace(placeToEdit);
    }
  };

  // Save edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlace) return;

    setPlaces(
      places.map((place) => (place.id === editingId ? editingPlace : place))
    );

    setEditingId(null);
    setEditingPlace(null);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingPlace(null);
  };

  // Delete place
  const handleDelete = (id: string) => {
    setPlaces(places.filter((place) => place.id !== id));
  };

  return (
    <div className="app-container">
      {/* Navigation bar */}
      <div className="navbar">
        <div className="navbar-content">
          <div className="logo-container">
            <img src={Lugares} alt="Lugares" className="logo" />
          </div>
        </div>
      </div>

      {/* Form section */}
      <div className="form-section">
        <div className="form-container">
          <form onSubmit={handleAddPlace}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">País</label>
                <CountrySelect
                  value={newPlace.countryCode}
                  onChange={(code, country, flag) =>
                    setNewPlace({
                      ...newPlace,
                      countryCode: code,
                      country: country,
                      flag: flag,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Local</label>
                <input
                  type="text"
                  value={newPlace.local}
                  onChange={(e) =>
                    setNewPlace({ ...newPlace, local: e.target.value })
                  }
                  className="input-field"
                  placeholder="Digite o local que deseja conhecer"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Meta</label>
                <MetaInput
                  value={newPlace.meta}
                  onChange={(value) =>
                    setNewPlace({ ...newPlace, meta: value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <button type="submit" className="add-button">
                  Adicionar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Places grid */}
      <div className="places-container">
        <div className="places-grid">
          {places.map((place) => (
            <div key={place.id}>
              {editingId === place.id ? (
                <form onSubmit={handleSaveEdit} className="edit-form">
                  <div className="place-header">
                    <div className="flag-container">{place.flag}</div>
                    <div className="country-name">{place.country}</div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Local</label>
                    <input
                      value={editingPlace?.local || ""}
                      onChange={(e) =>
                        editingPlace &&
                        setEditingPlace({
                          ...editingPlace,
                          local: e.target.value,
                        })
                      }
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Meta</label>
                    <MetaInput
                      value={editingPlace?.meta || ""}
                      onChange={(value) =>
                        editingPlace &&
                        setEditingPlace({
                          ...editingPlace,
                          meta: value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="edit-actions">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="cancel-button"
                    >
                      <FiX size={16} />
                    </button>
                    <button type="submit" className="save-button">
                      <FiSave size={16} />
                    </button>
                  </div>
                </form>
              ) : (
                <PlaceCard
                  place={place}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

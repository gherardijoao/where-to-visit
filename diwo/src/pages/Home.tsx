import "./Home.css";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";
import { CountrySelect } from "../components/CountrySelect";
import { MetaInput } from "../components/MetaInput";
import { PlaceCard } from "../components/PlaceCard";
import { Place } from "../types/Place";
import Lugares from "../assets/Lugares.png";
import { motion, AnimatePresence } from "framer-motion";
import {
  getPlaces,
  addPlace,
  updatePlace,
  deletePlace,
} from "../services/countriesService";

export const Home = () => {
  // Places state
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  // Fetch places on component mount
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const data = await getPlaces();
        setPlaces(data);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar lugares. Tente novamente mais tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  // Add new place
  const handleAddPlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlace.local || !newPlace.meta || !newPlace.country) return;

    try {
      const addedPlace = await addPlace(newPlace);
      setPlaces([...places, addedPlace]);

      setNewPlace({
        country: "",
        countryCode: "",
        flag: "",
        local: "",
        meta: "",
      });
    } catch (err) {
      alert("Erro ao adicionar lugar. Tente novamente.");
      console.error(err);
    }
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
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlace || !editingId) return;

    try {
      const { id, ...placeData } = editingPlace;
      await updatePlace(editingId, placeData);

      setPlaces(
        places.map((place) => (place.id === editingId ? editingPlace : place))
      );

      setEditingId(null);
      setEditingPlace(null);
    } catch (err) {
      alert("Erro ao atualizar lugar. Tente novamente.");
      console.error(err);
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingPlace(null);
  };

  // Delete place
  const handleDelete = async (id: string) => {
    try {
      await deletePlace(id);
      setPlaces(places.filter((place) => place.id !== id));
    } catch (err) {
      alert("Erro ao excluir lugar. Tente novamente.");
      console.error(err);
    }
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
        {loading ? (
          <div className="loading-container">Carregando lugares...</div>
        ) : error ? (
          <div className="error-container">{error}</div>
        ) : places.length === 0 ? (
          <div className="empty-container">Nenhum lugar adicionado ainda.</div>
        ) : (
          <div className="places-grid">
            <AnimatePresence>
              {places.map((place) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

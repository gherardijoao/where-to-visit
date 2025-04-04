import "./PlaceCard.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

type PlaceCardProps = {
  place: {
    id: string;
    country: string;
    countryCode: string;
    flag: string;
    local: string;
    meta: string;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export const PlaceCard = ({ place, onEdit, onDelete }: PlaceCardProps) => {
  return (
    <div className="place-card">
      <div className="place-content">
        <div className="place-header">
          <div className="flag-container">{place.flag}</div>
          <div className="country-name">{place.country}</div>
        </div>
        <div className="place-details">
          <div className="detail-row">
            <span className="detail-label">Local:</span>
            <span className="detail-value">{place.local}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Meta:</span>
            <span className="detail-value">{place.meta}</span>
          </div>
        </div>
        <div className="card-actions">
          <button
            className="action-button edit-button"
            onClick={() => onEdit && onEdit(place.id)}
          >
            <FiEdit size={16} />
          </button>
          <button
            className="action-button delete-button"
            onClick={() => onDelete && onDelete(place.id)}
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

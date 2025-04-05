import "./PlaceCard.css";
import { FiEdit2, FiX } from "react-icons/fi";

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
        {/* Action buttons at the top */}
        <div className="card-actions">
          <button
            className="action-button edit-button"
            onClick={() => onEdit && onEdit(place.id)}
            aria-label="Editar"
            data-testid="edit-button"
          >
            <FiEdit2 size={16} />
          </button>
          <button
            className="action-button delete-button"
            onClick={() => onDelete && onDelete(place.id)}
            aria-label="Deletar"
            data-testid="delete-button"
          >
            <FiX size={16} />
          </button>
        </div>

        <div className="flag-display">
          <div className="flag-container">{place.flag}</div>
        </div>

        <div className="place-header">
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
      </div>
    </div>
  );
};

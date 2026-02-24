import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSaved } from "../context/SavedContext";

function UniversityCard({ uni }) {
  const { toggleSave, isSaved } = useSaved();

  if (!uni) {
    return null;
  }

  // Mock NAAC grade based on ranking to match wireframe
  const naacGrade = parseInt(uni.ranking) <= 10 ? "A++" : (parseInt(uni.ranking) <= 30 ? "A+" : "A");

  // Format fees and placement to match wireframe style
  const formattedFees = uni.fees ? `₹${uni.fees}/yr` : "N/A";

  // Extract number from placement like "18 LPA" to "95%" mock for the badge if needed, 
  // actually the wireframe shows "Placement: 95%". Let's mock a percentage based on ranking.
  const placementPercent = Math.max(75, 100 - parseInt(uni.ranking));

  const saved = isSaved(uni.id);

  return (
    <div className="uni-card">
      <div className="flex-between" style={{ alignItems: 'flex-start' }}>
        <h3 style={{ paddingRight: '1rem' }}>{uni.name}</h3>
        <button
          onClick={() => toggleSave(uni.id)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', padding: '0.25rem', color: saved ? '#111827' : '#9CA3AF' }}
          title={saved ? "Remove from saved" : "Save university"}
        >
          {saved ? '🔖' : '📑'} {/* Bookmark emojis: filled vs outline-ish */}
        </button>
      </div>

      <div className="card-meta">
        <span className="flex-center" style={{ gap: '0.25rem' }}>
          <span style={{ fontSize: '1rem' }}>📍</span> {/* Location pin simple emoji */}
          {uni.location.split(',')[0]}
        </span>
        <span className="naac-badge">NAAC {naacGrade}</span>
      </div>

      <div className="card-stats">
        <div>
          <span>Fees:</span>
          <strong>{formattedFees}</strong>
        </div>
        <div>
          <span>Placement:</span>
          <strong>{placementPercent}%</strong>
        </div>
      </div>

      <div className="flex-between" style={{ marginTop: 'auto', gap: '0.5rem' }}>
        <Link to={`/university/${uni.id}`} className="btn-outline" style={{ flex: 1, textAlign: 'center' }}>View Details</Link>
        {uni.website && (
          <a href={uni.website} target="_blank" rel="noopener noreferrer" className="btn-black" style={{ flex: 1, textAlign: 'center' }}>Website</a>
        )}
      </div>
    </div>
  );
}

UniversityCard.propTypes = {
  uni: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    ranking: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    fees: PropTypes.string,
    average_placement: PropTypes.string,
    website: PropTypes.string
  }).isRequired
};

export default UniversityCard;

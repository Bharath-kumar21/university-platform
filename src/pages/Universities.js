import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UniversityCard from "../components/UniversityCard";
import universitiesData from "../data/universities.json";

function Universities() {
  const location = useLocation();
  const initState = location.state || {};

  const [search, setSearch] = useState(initState.initSearch || "");
  const [sortOption, setSortOption] = useState("Ranking");

  // Filter states
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedNAACs, setSelectedNAACs] = useState(initState.initNAAC ? [initState.initNAAC] : []);
  const [selectedFees, setSelectedFees] = useState(initState.initFees ? [initState.initFees] : []);

  // Update states if location state changes (e.g. from nav click again)
  useEffect(() => {
    if (location.state) {
      if (location.state.initSearch) setSearch(location.state.initSearch);
      if (location.state.initNAAC) setSelectedNAACs([location.state.initNAAC]);
      if (location.state.initFees) setSelectedFees([location.state.initFees]);
    }
  }, [location.state]);

  // Filtering logic
  const filtered = universitiesData
    .filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.location.toLowerCase().includes(search.toLowerCase());

      const stateMatch = selectedStates.length === 0 || selectedStates.some(s => u.location.includes(s));
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(u.type);

      // NAAC derivation matching the card
      const naacGrade = parseInt(u.ranking) <= 10 ? "A++" : (parseInt(u.ranking) <= 30 ? "A+" : "A");
      const naacMatch = selectedNAACs.length === 0 || selectedNAACs.includes(naacGrade);

      let numericFees = 0;
      if (u.fees) {
        if (u.fees.endsWith('L')) numericFees = parseFloat(u.fees.replace('L', '')) * 100000;
        else if (u.fees.endsWith('K')) numericFees = parseFloat(u.fees.replace('K', '')) * 1000;
      }

      let feesMatch = selectedFees.length === 0;
      if (selectedFees.length > 0 && u.fees) {
        if (selectedFees.includes("Under ₹1L") && numericFees < 100000) feesMatch = true;
        if (selectedFees.includes("₹1L - ₹3L") && numericFees >= 100000 && numericFees <= 300000) feesMatch = true;
        if (selectedFees.includes("₹3L - ₹5L") && numericFees > 300000 && numericFees <= 500000) feesMatch = true;
        if (selectedFees.includes("Above ₹5L") && numericFees > 500000) feesMatch = true;
      } else if (selectedFees.length > 0 && !u.fees) {
        feesMatch = false; // If fees are unlisted, don't show when fee filters are active unless we want to
      }

      return matchesSearch && stateMatch && typeMatch && naacMatch && feesMatch;
    })
    .sort((a, b) => {
      if (sortOption === "Ranking") {
        return a.ranking - b.ranking;
      } else if (sortOption === "Name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const handleCheckboxChange = (setter, value, currentState) => {
    if (currentState.includes(value)) {
      setter(currentState.filter(item => item !== value));
    } else {
      setter([...currentState, value]);
    }
  };

  return (
    <div className="container page-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="flex-center" style={{ gap: '0.5rem', marginBottom: '2rem' }}>
          <span>⚙️</span>
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Filters</h2>
        </div>

        <div className="filter-section">
          <div className="filter-title">State / City</div>
          {[
            "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Uttar Pradesh",
            "West Bengal", "Uttarakhand", "Assam", "Telangana", "Punjab",
            "Rajasthan", "Madhya Pradesh", "Odisha", "Gujarat", "Andhra Pradesh", "Chandigarh"
          ].map(state => (
            <label key={state} className="checkbox-label">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(setSelectedStates, state, selectedStates)}
                checked={selectedStates.includes(state)}
              /> {state}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <div className="filter-title">Institution Type</div>
          {["Public", "Private"].map(type => (
            <label key={type} className="checkbox-label">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(setSelectedTypes, type, selectedTypes)}
                checked={selectedTypes.includes(type)}
              /> {type}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <div className="filter-title">NAAC Grade</div>
          {["A++", "A+", "A"].map(grade => (
            <label key={grade} className="checkbox-label">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(setSelectedNAACs, grade, selectedNAACs)}
                checked={selectedNAACs.includes(grade)}
              /> {grade}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <div className="filter-title">Fees Range</div>
          {["Under ₹1L", "₹1L - ₹3L", "₹3L - ₹5L", "Above ₹5L"].map(range => (
            <label key={range} className="checkbox-label">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(setSelectedFees, range, selectedFees)}
                checked={selectedFees.includes(range)}
              /> {range}
            </label>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main>
        <div style={{ marginBottom: "1.5rem" }}>
          {/* We reuse the nav-search style for the page search */}
          <div className="nav-search-wrapper" style={{ width: '100%', maxWidth: '100%' }}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by university name or location..."
              className="nav-search"
              style={{ width: '100%' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="results-header" style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--white)' }}>
          <div>Showing 1-{Math.min(filtered.length, 9)} of {filtered.length} results</div>
          <div className="flex-center" style={{ gap: '0.5rem' }}>
            <span>Sort by:</span>
            <select
              className="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="Ranking">Ranking</option>
              <option value="Name">Name</option>
            </select>
          </div>
        </div>

        <div className="grid-cols-3" style={{ marginTop: '1.5rem', marginBottom: '3rem' }}>
          {filtered.slice(0, 9).map((uni) => ( // Only show first 9 for UI mock pagination
            <UniversityCard key={uni.id} uni={uni} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-secondary)" }}>
            <h3>No universities found</h3>
            <p>Try adjusting your search query or filters.</p>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="flex-center" style={{ gap: '0.5rem', marginTop: '2rem' }}>
            <button className="btn-black" style={{ padding: '0.5rem 1rem' }}>1</button>
            <button className="btn-outline" style={{ width: 'auto', padding: '0.4rem 1rem' }}>2</button>
            <button className="btn-outline" style={{ width: 'auto', padding: '0.4rem 1rem' }}>3</button>
            <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>...</span>
            <button className="btn-outline" style={{ width: 'auto', padding: '0.4rem 1rem' }}>10</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Universities;

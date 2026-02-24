import React, { useState } from "react";
import universitiesData from "../data/universities.json";

function Compare() {
  const [selectedIds, setSelectedIds] = useState(["1", "2", ""]); // Default first two selected just to show

  const handleSelect = (index, value) => {
    const newSelected = [...selectedIds];
    newSelected[index] = value;
    setSelectedIds(newSelected);
  };

  const removeUniversity = (index) => {
    const newSelected = [...selectedIds];
    newSelected[index] = "";
    setSelectedIds(newSelected);
  };

  const universities = selectedIds.map(id => id ? universitiesData.find(u => u.id === parseInt(id)) : null);

  const formatNAAC = (rank) => parseInt(rank) <= 10 ? 'A++' : (parseInt(rank) <= 30 ? 'A+' : 'A');
  const formatPlacement = (rank) => Math.max(75, 100 - parseInt(rank)) + '%';

  return (
    <div className="container" style={{ padding: "3rem 0" }}>
      <div className="compare-header">
        <h2>Compare Universities</h2>
        <p>Side-by-side comparison of selected universities</p>
      </div>

      <div style={{ background: "var(--white)", borderRadius: "var(--radius)", border: "1px solid var(--border-color)", overflow: "hidden" }}>
        <table className="compare-table">
          <thead>
            <tr>
              <th>Criteria</th>
              {[0, 1, 2].map((i) => (
                <th key={i} style={{ width: "26.6%" }}>
                  {universities[i] ? (
                    <div className="uni-header-card">
                      <div className="flex-between" style={{ width: '100%', alignItems: 'flex-start' }}>
                        <div className="uni-header-image"></div>
                        <button className="close-btn" onClick={() => removeUniversity(i)}>×</button>
                      </div>
                      <div className="uni-header-name">{universities[i].name}</div>
                    </div>
                  ) : (
                    <div className="add-uni-card">
                      <span style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>+</span>
                      <span>Add University</span>
                      <select
                        style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', left: 0, top: 0 }}
                        value={selectedIds[i]}
                        onChange={(e) => handleSelect(i, e.target.value)}
                      >
                        <option value="">Select University</option>
                        {universitiesData.map((uni) => (
                          <option key={uni.id} value={uni.id}>{uni.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Location</td>
              {universities.map((uni, i) => <td key={i}>{uni ? uni.location.split(',')[0] : "-"}</td>)}
            </tr>
            <tr>
              <td>NAAC Grade</td>
              {universities.map((uni, i) => <td key={i}>{uni ? formatNAAC(uni.ranking) : "-"}</td>)}
            </tr>
            <tr>
              <td>NIRF Ranking</td>
              {universities.map((uni, i) => <td key={i}>{uni ? `#${uni.ranking}` : "-"}</td>)}
            </tr>
            <tr>
              <td>Annual Fees</td>
              {universities.map((uni, i) => <td key={i}>{uni ? `₹${uni.fees}/yr` : "-"}</td>)}
            </tr>
            <tr>
              <td>Placement %</td>
              {universities.map((uni, i) => <td key={i}>{uni ? formatPlacement(uni.ranking) : "-"}</td>)}
            </tr>
            <tr>
              <td>Avg. Package</td>
              {universities.map((uni, i) => <td key={i}>{uni ? uni.average_placement : "-"}</td>)}
            </tr>
            <tr>
              <td>Established</td>
              {universities.map((uni, i) => <td key={i}>{uni ? uni.established : "-"}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Compare;

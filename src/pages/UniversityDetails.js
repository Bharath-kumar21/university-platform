import React from "react";
import { useParams } from "react-router-dom";

function UniversityDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>University Details</h2>
      <p>University ID: {id}</p>

      <h3>Courses</h3>
      <ul>
        <li>B.Tech</li>
        <li>M.Tech</li>
        <li>PhD</li>
      </ul>

      <h3>Fees</h3>
      <p>₹2,00,000 per year</p>

      <h3>Placement</h3>
      <p>Average: ₹12 LPA</p>
    </div>
  );
}

export default UniversityDetails;

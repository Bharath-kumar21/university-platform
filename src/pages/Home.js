import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UniversityCard from "../components/UniversityCard";
import universitiesData from "../data/universities.json";

function Home() {
  const navigate = useNavigate();
  const [searchLoc, setSearchLoc] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const [searchFees, setSearchFees] = useState("");
  const [searchNAAC, setSearchNAAC] = useState("");

  const handleSearch = () => {
    // Pass search criteria to the Universities page via query params or state
    // We'll use state here to pre-hydrate the filters
    navigate("/universities", {
      state: {
        initSearch: searchLoc, // The generic search handles location
        initFees: searchFees,
        initNAAC: searchNAAC
        // course is not strongly handled by the mock filters right now, but could be added 
      }
    });
  };

  // Get top 6 universities for the featured section
  const featuredUniversities = universitiesData.slice(0, 6);

  return (
    <div>
      <section className="hero-section">
        <div className="container">
          <h1>Find the Right University for Your Future</h1>
          <p>
            Search, compare, and analyze universities across India with comprehensive data and insights.
          </p>

          <div className="search-banner">
            <div className="search-fields">
              <div className="search-input-group">
                <span className="text-secondary">📍</span>
                <input
                  type="text"
                  placeholder="Location"
                  value={searchLoc}
                  onChange={(e) => setSearchLoc(e.target.value)}
                />
              </div>
              <div className="search-input-group">
                <span className="text-secondary">📖</span>
                <input
                  type="text"
                  placeholder="Course"
                  value={searchCourse}
                  onChange={(e) => setSearchCourse(e.target.value)}
                />
              </div>
              <div className="search-input-group">
                <span className="text-secondary">₹</span>
                <input
                  type="text"
                  placeholder="Fees Range"
                  value={searchFees}
                  onChange={(e) => setSearchFees(e.target.value)}
                />
              </div>
              <div className="search-input-group">
                <span className="text-secondary">🏅</span>
                <input
                  type="text"
                  placeholder="Accreditation"
                  value={searchNAAC}
                  onChange={(e) => setSearchNAAC(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn-black btn-large flex-center"
              style={{ gap: '0.5rem', justifyContent: 'center' }}
              onClick={handleSearch}
            >
              <span>🔍</span> Search Universities
            </button>
          </div>

          <div className="stats-section">
            <div className="stat-box">
              <div className="icon">🏛️</div>
              <h3>1,043</h3>
              <p>Total Universities</p>
            </div>
            <div className="stat-box">
              <div className="icon">📚</div>
              <h3>25,000+</h3>
              <p>Total Courses</p>
            </div>
            <div className="stat-box">
              <div className="icon">🎓</div>
              <h3>8.5L+</h3>
              <p>Students Placed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ marginBottom: "6rem" }}>
        <div className="section-header">
          <div>
            <h2>Featured Universities</h2>
            <p>Top-rated institutions across India</p>
          </div>
          <Link to="/universities" className="view-all">View all →</Link>
        </div>

        <div className="grid-cols-3">
          {featuredUniversities.map((uni) => (
            <UniversityCard key={uni.id} uni={uni} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

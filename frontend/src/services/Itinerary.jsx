import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './itinerary.css';

const Itinerary = () => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (new Date(startDate) >= new Date(endDate)) {
      setError("End Date must be later than Start Date.");
      return;
    }

    try {
      navigate("/itineraryGenerate", { 
        state: { 
          destination: location, 
          startDate: startDate, 
          endDate: endDate 
        } 
      });
    } catch (error) {
      console.error('Error generating itinerary', error);
    }
  };

  return (
    <div className="itinerary-container">
      <div className="itinerary-content">
        <div className="itinerary-form-section">
          <h2 className="itinerary-title">Plan Your Dream Trip</h2>
          <p className="itinerary-subtitle">Fill in the details below to create your perfect itinerary</p>
          
          <form onSubmit={handleSubmit} className="itinerary-form">
            <div className="form-group">
              <label htmlFor="location">Destination</label>
              <div className="input-wrapper">
                <i className="ri-map-pin-line input-icon"></i>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where would you like to go?"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <div className="input-wrapper">
                  <i className="ri-calendar-line input-icon"></i>
                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <div className="input-wrapper">
                  <i className="ri-calendar-line input-icon"></i>
                  <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit-button">
              <i className="ri-send-plane-fill"></i>
              Create Itinerary
            </button>
          </form>
        </div>

        <div className="itinerary-image-section">
          <img 
            src="tour-images/itinerary.jpg" 
            alt="Travel Planning"
            className="planning-image"
          />
          <div className="image-overlay">
            <div className="feature-card">
              <i className="ri-route-line"></i>
              <h3>Personalized Routes</h3>
            </div>
            <div className="feature-card">
              <i className="ri-time-line"></i>
              <h3>Smart Scheduling</h3>
            </div>
            <div className="feature-card">
              <i className="ri-map-2-line"></i>
              <h3>Local Insights</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
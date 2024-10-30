import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyTrips.css';

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await fetch('http://localhost:7800/api/itineraries');
      if (response.ok) {
        const data = await response.json();
        setTrips(data);
      } else {
        console.error('Failed to fetch trips');
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  return (
    <div className="trips-container">
      <div className="trips-header">
        <h1>My Trips</h1>
      </div>

      <div className="trips-grid">
        {trips.map((trip) => (
          <div key={trip._id} className="trip-card">
            <div className="trip-card-image">
              {/* <img 
                src="/api/placeholder/400/250" 
                alt={trip.destination}
              /> */}
              <div className="trip-dates">
                <i className="ri-calendar-line"></i>
                {trip.startDate} - {trip.endDate}
              </div>
            </div>
            
            <div className="trip-card-content">
              <h2>{trip.title}</h2>
              <p className="destination">
                <i className="ri-map-pin-line"></i>
                {trip.destination}
              </p>
              
              <div className="trip-highlights">
                <div className="highlight">
                  <i className="ri-hotel-line"></i>
                  <span>{trip.accommodation.length} Stays</span>
                </div>
                <div className="highlight">
                  <i className="ri-route-line"></i>
                  <span>{trip.days.length} Days</span>
                </div>
                <div className="highlight">
                  <i className="ri-car-line"></i>
                  <span>{trip.transportation.length} Transports</span>
                </div>
              </div>

              <button 
                className="view-details-button"
                onClick={() => setSelectedTrip(trip)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedTrip && (
        <div className="modal-overlay" onClick={() => setSelectedTrip(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedTrip(null)}>
              <i className="ri-close-line"></i>
            </button>

            <div className="modal-header">
              <h2>{selectedTrip.title}</h2>
              <p className="modal-destination">
                <i className="ri-map-pin-line"></i>
                {selectedTrip.destination}
              </p>
              <p className="modal-dates">
                <i className="ri-calendar-line"></i>
                {selectedTrip.startDate} - {selectedTrip.endDate}
              </p>
            </div>

            <div className="modal-body">
              <section className="modal-section">
                <h3><i className="ri-hotel-line"></i> Accommodation</h3>
                <ul>
                  {selectedTrip.accommodation.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="modal-section">
                <h3><i className="ri-car-line"></i> Transportation</h3>
                <ul>
                  {selectedTrip.transportation.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="modal-section">
                <h3><i className="ri-route-line"></i> Daily Itinerary</h3>
                {selectedTrip.days.map((day, index) => (
                  <div key={index} className="day-plan">
                    <h4>{day.title}</h4>
                    <ul>
                      {day.activities.map((activity, actIndex) => (
                        <li key={actIndex}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              <section className="modal-section">
                <h3><i className="ri-lightbulb-line"></i> Travel Tips</h3>
                <ul>
                  {selectedTrip.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
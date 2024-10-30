import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './itineraryGenerate.css';

const ItineraryGenerate = () => {
  const [itineraryData, setItineraryData] = useState({
    title: '',
    accommodation: [],
    transportation: [],
    days: [],
    tips: []
  });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { destination, startDate, endDate } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const generateItinerary = async () => {
      const apikey = "AIzaSyDGL4Ic5bjIslpShWSMw856IcJrJ669RB8"; // Be cautious with exposing API keys
      const genAI = new GoogleGenerativeAI(apikey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Generate a detailed trip plan for a family of 2 adults and 2 children with interests in history, art, nature, adventure, food, and nightlife visiting ${destination} from ${startDate} to ${endDate}. Include daily itineraries, accommodation recommendations, transportation options, and must-see attractions. Provide detailed explanations and practical tips for each activity.`;

      try {
        const result = await model.generateContent(prompt);
        const content = result.response.text();
        parseItineraryContent(content);
        setLoading(false);
      } catch (error) {
        console.error('Error generating itinerary:', error);
        setLoading(false);
      }
    };

    generateItinerary();
  }, [destination, startDate, endDate]);

  const parseItineraryContent = (content) => {
    const lines = content.split('\n');
    let currentSection = ''; // Properly declare the currentSection variable
    const parsedData = {
      title: '',
      accommodation: [],
      transportation: [],
      days: [],
      tips: []
    };

    lines.forEach(line => {
      line = line.trim();
      if (line.startsWith('##')) {
        parsedData.title = line.replace('##', '').trim();
      } else if (line.startsWith('**Accommodation:**')) {
        currentSection = 'accommodation';
      } else if (line.startsWith('**Transportation:**')) {
        currentSection = 'transportation';
      } else if (line.startsWith('**Day')) {
        currentSection = 'days';
        parsedData.days.push({ title: line.replace(/\*/g, ''), activities: [] });
      } else if (line.startsWith('**Practical Tips:**')) {
        currentSection = 'tips';
      } else if (line !== '') {
        switch (currentSection) {
          case 'accommodation':
          case 'transportation':
          case 'tips':
            parsedData[currentSection].push(line.replace(/^\*\s*/, '').replace(/\*\*([^*]+)\*\*/, '$1'));
            break;
          case 'days':
            if (parsedData.days.length > 0) {
              parsedData.days[parsedData.days.length - 1].activities.push(line.replace(/^\*\s*/, '').replace(/\*\*([^*]+)\*\*/, '$1'));
            }
            break;
          default:
            break;
        }
      }
    });

    setItineraryData({
      ...parsedData,
      destination,
      startDate,
      endDate
    });
  };

  const saveItinerary = async () => {
    try {
      const response = await fetch('http://localhost:7800/api/itineraries/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itineraryData)
      });

      if (response.ok) {
        alert('Itinerary saved successfully!');
        navigate('/mytrips');
      } else {
        alert('Failed to save itinerary');
      }
    } catch (error) {
      console.error('Error saving itinerary:', error);
    }
  };

  const renderSection = (title, data, renderItem) => {
    if (!data || data.length === 0) return null;
    return (
      <section>
        <h2>{title}</h2>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{renderItem(item)}</li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <div className="itinerary-container">
      <h1>{itineraryData.title}</h1>
      {loading ? (
        <div className="loader">Generating your personalized itinerary...</div>
      ) : (
        <div className="itinerary-content">
          {renderSection("Accommodation", itineraryData.accommodation, item => item)}
          {renderSection("Transportation", itineraryData.transportation, item => item)}
          {itineraryData.days.length > 0 && (
            <section>
              <h2>Daily Itinerary</h2>
              {itineraryData.days.map((day, index) => (
                <div key={index} className="day-itinerary">
                  <h3>{day.title}</h3>
                  <ul>
                    {day.activities.map((activity, actIndex) => (
                      <li key={actIndex}>{activity}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}
          {renderSection("Travel Tips", itineraryData.tips, item => item)}
          <button onClick={saveItinerary} className="save-itinerary-button">
            Save Itinerary
          </button>
        </div>
      )}
    </div>
  );
};

export default ItineraryGenerate;
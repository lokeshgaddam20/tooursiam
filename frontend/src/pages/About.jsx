import React, { useState } from 'react';
import '../styles/about.css'
const About = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="about">
      <h1>About Us</h1>

      <section>
        <h3 onClick={() => toggleSection('purpose')}>
          Our Purpose <span className="arrow">{openSection === 'purpose' ? '▲' : '▼'}</span>
        </h3>
        {openSection === 'purpose' && (
          <p>At Travel Binge, we’re passionate about helping travelers explore the world with ease and confidence. Whether you're planning a weekend getaway or a month-long adventure, our platform is designed to be your trusted companion in crafting the perfect itinerary and discovering the best places to visit.</p>
        )}
      </section>

      <section>
        <h3 onClick={() => toggleSection('offer')}>
          What We Offer <span className="arrow">{openSection === 'offer' ? '▲' : '▼'}</span>
        </h3>
        {openSection === 'offer' && (
          <ul>
            <li>
              <h5>Itinerary Planning Made Simple</h5>
              <p>We take the hassle out of travel planning by offering a streamlined, user-friendly platform that allows you to create detailed itineraries tailored to your needs. Just input your destination, travel dates, and preferences, and let our system generate a plan that suits your style—whether you're looking for relaxation, adventure, or a bit of both.</p>
            </li>
            <li>
              <h5>Explore the World</h5>
              <p>Use our "Explore Places" feature to dive deep into any destination, uncovering attractions, restaurants, hotels, and much more.</p>
            </li>
            <li>
              <h5>Seamless Experience</h5>
              <p>Our user-friendly interface ensures that planning your next trip is as exciting as the trip itself.</p>
            </li>
          </ul>
        )}
      </section>

      <section>
        <h3 onClick={() => toggleSection('why')}>
          Why Choose Us <span className="arrow">{openSection === 'why' ? '▲' : '▼'}</span>
        </h3>
        {openSection === 'why' && (
          <ul>
            <li>
              <h5>Personalized Itineraries</h5>
              <p>Our platform goes beyond generic travel advice, offering itineraries that reflect your interests and travel style, ensuring that your trip is just as unique as you are.</p>
            </li>
            <li>
              <h5>Global Exploration</h5>
              <p>Whether you’re dreaming of the bustling streets of Tokyo, the serene beaches of Bali, or the historic landmarks of Rome, our platform covers destinations across the globe, providing comprehensive information to make your travel experience unforgettable.</p>
            </li>
          </ul>
        )}
      </section>

      <section>
        <h3 onClick={() => toggleSection('vision')}>
          Our Vision <span className="arrow">{openSection === 'vision' ? '▲' : '▼'}</span>
        </h3>
        {openSection === 'vision' && (
          <p>We envision a world where travel planning is as enjoyable as the journey itself. Our goal is to be the go-to resource for travelers seeking to create memorable experiences through carefully crafted itineraries and thorough exploration of every destination.</p>
        )}
      </section>
      
      <section>
        <h3 onClick={() => toggleSection('community')}>
          Join Our Community <span className="arrow">{openSection === 'community' ? '▲' : '▼'}</span>
        </h3>
        {openSection === 'community' && (
          <p>Whether you're a seasoned traveler or just starting your journey, Travel Binge is here to support you every step of the way. Join our community of explorers, share your experiences, and let us help you make the most of your travels.</p>
        )}
      </section>
    </div>
  );
};

export default About;

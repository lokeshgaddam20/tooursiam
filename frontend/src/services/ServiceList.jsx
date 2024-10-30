import React from 'react';
import ServiceCard from './ServiceCard';
import { Col } from 'reactstrap';
import guideimg from '../assets/images/guide.jpg';
import iternaryimg from '../assets/images/iternary.jpg';

const servicesData = [
  {
    imgUrl: guideimg,
    title: "Best Tour Guide",
    desc: "Explore the wonders of the world with our unrivaled tour guide service, offering access to many amazing places.",
  },
  {
    imgUrl: iternaryimg,
    title: "Itinerary Planner",
    desc: "Plan your perfect adventure with our ultimate tour guide service, offering detailed itinerary generation for your trips.",
  }
];

const ServiceList = () => {
  return (
    <>
      {
        servicesData.map((item, index) => (
          <Col lg='3' key={index}>
            <ServiceCard item={item} />
          </Col>
        ))
      }
    </>
  );
};

export default ServiceList;

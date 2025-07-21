import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const reviews = [
    {
      name: "Sarah K.",
      rating: 5,
      comment: "NutriGo changed my eating habits! Fresh meals delivered fast."
    },
    {
      name: "Mike T.",
      rating: 4,
      comment: "Love the variety. Best food delivery app in the country!"
    },
    {
      name: "Priya M.",
      rating: 5,
      comment: "24/7 service saved me during night shifts. Highly recommend!"
    }
  ];

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>Why Choose NutriGo?</h1>
          <p>Nourishing your life, one meal at a time</p>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="feature-card">
            <div className="icon">🚚</div>
            <h3>Free Delivery</h3>
            <p>No hidden fees on all orders above $15</p>
          </div>
          <div className="feature-card">
            <div className="icon">💳</div>
            <h3>Easy Payments</h3>
            <p>Multiple secure payment options</p>
          </div>
          <div className="feature-card">
            <div className="icon">⏰</div>
            <h3>24/7 Service</h3>
            <p>Late night cravings? We've got you covered</p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-us">
          <h2>Best Food Delivery in the Country</h2>
          <div className="benefits-grid">
            <div className="benefit">
              <h3>500+ Restaurants</h3>
              <p>Largest network of premium partners</p>
            </div>
            <div className="benefit">
              <h3>45-Minute Guarantee</h3>
              <p>Or your next meal is on us</p>
            </div>
            <div className="benefit">
              <h3>Nutrition Tracking</h3>
              <p>Calorie counts with every order</p>
            </div>
          </div>
          <button className="learn-more">Learn More →</button>
        </section>
        {/* Customer Reviews */}
        <section className="reviews-section">
          <h2>What Our Customers Say</h2>
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="stars">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p className="review-text">"{review.comment}"</p>
                <p className="reviewer">— {review.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
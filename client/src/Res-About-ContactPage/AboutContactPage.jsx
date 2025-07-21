import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutContactPage.css';
import MapView from '../utils/MapView';

const AboutContactPage = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();


  const restaurantInfo = {
    name: "Le Bernardin",
    founded: 1972,
    chef: "Chef Eric Ripert",
    cuisine: "French Seafood",
    seats: 120,
    awards: [
      "Michelin 3 Stars (2005-Present)",
      "James Beard Award for Outstanding Restaurant (2018)",
      "New York Times 4 Stars", "Best Restaurant Award 2023"
    ],
    team: [
      { name: "Eric Ripert", role: "Chef & Co-Owner", experience: "30+ years", specialty: "Seafood" },
      { name: "Mia Li", role: "Pastry Chef", experience: "12 years", specialty: "Desserts" },
      { name: "Carlos Rodriguez", role: "Sommelier", experience: "15 years", specialty: "Wine Pairing" },
      { name: "Sarah Johnson", role: "Head Chef", experience: "15 years", specialty: "French Techniques" },
      { name: "Michael Chen", role: "Sous Chef", experience: "8 years", specialty: "Asian Fusion" },
      { name: "Elena Rodriguez", role: "Pastry Chef", experience: "10 years", specialty: "Dessert Artistry" },
      { name: "David Wilson", role: "Sommelier", experience: "12 years", specialty: "Wine Pairing" }
    ],
    features: [
      { icon: "🍽️", title: "Farm-to-Table", description: "Locally sourced ingredients for maximum freshness" },
      { icon: "🍷", title: "Wine Cellar", description: "Over 500 selections from around the world" },
      { icon: "👨‍🍳", title: "Chef's Table", description: "Exclusive dining experience with our head chef" },
      { icon: "🌿", title: "Vegetarian Options", description: "Creative plant-based dishes for all preferences" }
    ],
    location: {
      lat: 12.9861854,
      lng: 80.2170963,

      address: "155 W 51st St, New York, NY 10019, United States"
    },
    contact: {
      phone: "+1 212-554-1515",
      email: "reservations@le-bernardin.com",
      website: "https://www.le-bernardin.com"
    },
    hours: {
      monday: "12:00 PM - 2:30 PM, 5:15 PM - 10:30 PM",
      tuesday: "12:00 PM - 2:30 PM, 5:15 PM - 10:30 PM",
      wednesday: "12:00 PM - 2:30 PM, 5:15 PM - 10:30 PM",
      thursday: "12:00 PM - 2:30 PM, 5:15 PM - 10:30 PM",
      friday: "12:00 PM - 2:30 PM, 5:15 PM - 10:30 PM",
      saturday: "5:15 PM - 10:30 PM",
      sunday: "Closed"
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const handleMapClick = () => {
    window.open(`https://www.google.com/maps/place/Junior+Kuppanna+-+Velachery/@12.986194,80.2145361,17z/data=!3m1!4b1!4m6!3m5!1s0x3a525d6f597feff9:0x57a1a19496936577!8m2!3d12.986077!4d80.2177293!16s%2Fg%2F11gj4pxh9l?entry=ttu`, '_blank');
  };

  return (
    <div className="about-contact-container">
      {/* Hero Section */}
      <header className="about-hero">
        <div className="hero-content">
          <h1>Discover Our Story</h1>
          <p className="subheader">Where passion meets culinary excellence</p>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <span className="icon">🏛️</span> About Us
        </button>
        <button
          className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <span className="icon">✉️</span> Contact
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content-card">
        {/* About Us Content */}
        {activeTab === 'about' && (
          <div className="about-content">
            {/* Restaurant Story */}
            <section className="story-section">
              <div className="section-header">
                <h2><span className="icon">📜</span> Our Story</h2>
                <div className="divider"></div>
              </div>
              <div className="story-content">
                <div className="story-text">
                  <p>Founded in <b>{restaurantInfo.founded}, {restaurantInfo.name}</b> began as a small bistro in Paris before becoming a world-renowned seafood destination in <b>New York City</b>. Under the leadership of {restaurantInfo.chef}, we've maintained our position as one of the world's premier {restaurantInfo.cuisine} restaurants.</p>
                  <p>Our philosophy is simple: the fish is the star of the plate. We believe in treating each ingredient with respect, using innovative techniques to highlight natural flavors, and creating unforgettable dining experiences.</p>
                </div>
                <div className="story-image">
                  <div className="restaurant-location">
                    <h3>📍 Our Location</h3>
                    <div className="interactive-map" onClick={handleMapClick}>
                      <MapView
                        lat={restaurantInfo.location.lat}
                        lng={restaurantInfo.location.lng}
                        markerText={restaurantInfo.name}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Awards Section */}
            <section className="awards-section">
              <div className="section-header">
                <h2><span className="icon">🏆</span> Awards & Recognition</h2>
                <div className="divider"></div>
              </div>
              <div className="awards-grid">
                {restaurantInfo.awards.map((award, index) => (
                  <div key={index} className="award-card">
                    <span className="award-icon">⭐</span>
                    <h3>{award}</h3>
                  </div>
                ))}
              </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
              <div className="section-header">
                <h2><span className="icon">👨‍🍳</span> Meet Our Team</h2>
                <div className="divider"></div>
              </div>
              <div className="team-grid">
                {restaurantInfo.team.map((member, index) => (
                  <div key={index} className="team-card">
                    <div className="team-member-image">
                      <span className="member-icon">{member.role.includes('Chef') ? '👩‍🍳' : '👨‍💼'}</span>
                    </div>
                    <h3>{member.name}</h3>
                    <p className="role">{member.role}</p>
                    <div className="member-details">
                      <p><strong>Experience:</strong> {member.experience}</p>
                      <p><strong>Specialty:</strong> {member.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
              <div className="section-header">
                <h2><span className="icon">✨</span> What Makes Us Special</h2>
                <div className="divider"></div>
              </div>
              <div className="features-container">
                <div className="features-grid">
                  {restaurantInfo.features.map((feature, index) => (
                    <div key={index} className="feature-card">
                      <span className="feature-icon">{feature.icon}</span>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Contact Content */}
        {activeTab === 'contact' && (
          <div className="contact-content">
            <div className="contact-grid">
              {/* Contact Form */}
              <div className="contact-form-section">
                <div className="section-header">
                  <h2><span className="icon">📩</span> Send Us a Message</h2>
                  <div className="divider"></div>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Reservation, Feedback, etc."
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span> Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="contact-info-section">
                <div className="section-header">
                  <h2><span className="icon">📍</span> Find Us</h2>
                  <div className="divider"></div>
                </div>

                <div className="contact-methods">
                  <div className="contact-method">
                    <span className="method-icon">🏢</span>
                    <div>
                      <h3>Address</h3>
                      <p>{restaurantInfo.location.address}</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <span className="method-icon">📞</span>
                    <div>
                      <h3>Phone</h3>
                      <p>Reservations: {restaurantInfo.contact.phone}</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <span className="method-icon">✉️</span>
                    <div>
                      <h3>Email</h3>
                      <p>{restaurantInfo.contact.email}</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <span className="method-icon">⏰</span>
                    <div>
                      <h3>Hours</h3>
                      <p>
                        Monday - Friday: {restaurantInfo.hours.monday}<br />
                        Saturday: {restaurantInfo.hours.saturday}<br />
                        Sunday: {restaurantInfo.hours.sunday}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="map-container">
                  <div className="interactive-map" onClick={handleMapClick}>
                    <MapView
                      lat={restaurantInfo.location.lat}
                      lng={restaurantInfo.location.lng}
                      markerText={restaurantInfo.name}
                      interactive={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success Modal */}
      {submitSuccess && (
        <div className="success-message">
          <div className="success-content">
            <span className="success-icon">🎉</span>
            <h3>Message Sent Successfully!</h3>
            <p>We'll get back to you within 24 hours. Thank you for reaching out!</p>
            <button
              className="continue-button"
              onClick={() => setSubmitSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutContactPage;
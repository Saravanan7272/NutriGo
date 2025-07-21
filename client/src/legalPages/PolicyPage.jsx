import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/style/legalPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2>1. Information We Collect</h2>
          <p>When you use NutriGo, we may collect:</p>
          <ul>
            <li>Personal information (name, email, phone number)</li>
            <li>Delivery addresses</li>
            <li>Payment information (processed securely via our payment partners)</li>
            <li>Device and usage data</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>We use your data to:</p>
          <ul>
            <li>Process and deliver your orders</li>
            <li>Improve our services</li>
            <li>Communicate order updates</li>
            <li>Provide customer support</li>
            <li>Send promotional offers (you can opt-out anytime)</li>
          </ul>
        </section>

        <section>
          <h2>3. Data Security</h2>
          <p>We implement industry-standard security measures including:</p>
          <ul>
            <li>SSL/TLS encryption</li>
            <li>Regular security audits</li>
            <li>Limited employee access to sensitive data</li>
          </ul>
        </section>

        <div className="legal-contact">
          <h2>Contact Us</h2>
          <p>For privacy concerns, email us at: <a href="mailto:privacy@nutrigo.com">privacy@nutrigo.com</a></p>
        </div>

        <div className="back-home">
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
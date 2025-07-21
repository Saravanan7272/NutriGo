import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/style/legalPages.css';

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Terms of Service</h1>
        <p className="last-updated">Effective Date: {new Date().toLocaleDateString()}</p>
        <p className="legal-intro">
          By using NutriGo, you agree to the following terms. Please read them carefully to ensure a safe and respectful experience for everyone.
        </p>
        <blockquote className="legal-quote">
          <em><b>Clear Terms = Fair Use = Safer NutriGo for Everyone.</b></em>
        </blockquote>

        <section>
          <h2>1. Account Eligibility & Security</h2>
          <ul>
            <li>Users must be at least 18 years old to create an account.</li>
            <li>All registration information must be accurate and up-to-date.</li>
            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>Sharing or misusing accounts may result in suspension or termination.</li>
          </ul>
        </section>

        <section>
          <h2>2. Orders & Payments</h2>
          <ul>
            <li>All prices are listed in INR and are inclusive of applicable taxes.</li>
            <li>We accept UPI, major debit/credit cards, and digital wallets.</li>
            <li>Orders are fulfilled subject to restaurant availability.</li>
            <li>Estimated delivery times are not guaranteed and may vary.</li>
          </ul>
        </section>

        <section>
          <h2>3. Cancellations & Refunds</h2>
          <ul>
            <li>You may cancel an order within 5 minutes for a full refund.</li>
            <li>Orders that are already being prepared cannot be cancelled.</li>
            <li>Refunds will be processed within 5–7 business days to the original payment method.</li>
          </ul>
        </section>

        <section>
          <h2>4. Limitation of Liability</h2>
          <ul>
            <li>NutriGo is not liable for food quality issues caused by restaurant partners.</li>
            <li>We are not responsible for delays due to weather, traffic, or unforeseen events.</li>
            <li>Users with food allergies must contact restaurants directly for ingredient clarification.</li>
          </ul>
        </section>

        <section>
          <h2>5. User Conduct</h2>
          <ul>
            <li>Any misuse of the app (e.g., false orders, offensive content) may result in account suspension.</li>
            <li>Respect restaurant staff and delivery personnel at all times.</li>
            <li>Use NutriGo responsibly and in accordance with local laws.</li>
          </ul>
        </section>

        <section className="legal-contact">
          <h2>Need Help?</h2>
          <p>
            For questions or concerns regarding these Terms of Service, please contact us at: <br />
            <a href="mailto:legal@nutrigo.com">legal@nutrigo.com</a>
          </p>
        </section>

        <div className="back-home">
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

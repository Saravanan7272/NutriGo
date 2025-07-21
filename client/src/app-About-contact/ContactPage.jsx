import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "Real-time tracking is available in the app with delivery updates. You'll receive notifications at every stage of your order's journey."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay for your convenience."
    },
    {
      question: "Can I change my order after placing it?",
      answer: "Changes can be made within 15 minutes of order confirmation through your account dashboard or by contacting our support team."
    },
    {
      question: "What are your delivery hours?",
      answer: "We deliver daily from 8:00 AM to 10:00 PM. Express delivery options are available during these hours with a small additional fee."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we ship to all 50 states in the US and are expanding to Canada and Mexico in the next quarter."
    },
    {
      question: "How can I contact customer support?",
      answer: "Our 24/7 customer support can be reached via phone at (800) 123-4567, through live chat on our website, or via email at support@nutrigo.com."
    }
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        <section className="contact-hero">
          <h1>Get in Touch</h1>
          <p>We're here to help and answer any questions you might have</p>
        </section>

        <div className="contact-content">
          <section className="contact-form-section">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>

              {isSubmitted && (
                <div className="success-message">
                  <p>Thank you for your message! We'll get back to you within 24 hours.</p>
                </div>
              )}
            </form>
          </section>

          <section className="contact-info-section">
            <h2>Contact Information</h2>

            <div className="info-card">
              <div className="icon"><FaMapMarkerAlt /></div>
              <div>
                <h3>Headquarters</h3>
                <p>123 Nutrition Street<br />Food Valley, CA 90210<br />United States</p>
              </div>
            </div>

            <div className="info-card">
              <div className="icon"><FaPhone /></div>
              <div>
                <h3>Phone</h3>
                <p>Customer Support: (800) 123-4567<br />Business Inquiries: (800) 765-4321<br />Fax: (800) 987-6543</p>
              </div>
            </div>

            <div className="info-card">
              <div className="icon"><FaEnvelope /></div>
              <div>
                <h3>Email</h3>
                <p>support@nutrigo.com<br />partners@nutrigo.com<br />careers@nutrigo.com</p>
              </div>
            </div>

            <div className="info-card">
              <div className="icon"><FaClock /></div>
              <div>
                <h3>Support Hours</h3>
                <p>24/7 Customer Support<br />Business Hours: Mon-Fri 9AM-5PM PST<br />Weekends: 10AM-4PM PST</p>
              </div>
            </div>

            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" className="social-link" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" className="social-link" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className="social-link" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </section>
        </div>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-card ${activeFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <h3>{faq.question}</h3>
                {activeFaq === index && <p>{faq.answer}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
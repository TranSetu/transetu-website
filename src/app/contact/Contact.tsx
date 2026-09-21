"use client";

import "./contact.css";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Zap, Globe, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      {/* Background effects */}
      <div className="contact-bg-effects">
        <div className="glow-particle p-1"></div>
        <div className="glow-particle p-2"></div>
        <div className="map-grid"></div>
      </div>

      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <span className="contact-label">CONTACT US</span>
          <h2 className="contact-title">
            Get <span className="contact-highlight">Connected</span> with Transetu
          </h2>
          <p className="contact-desc">
            We’re here to help with FASTag services, GPS tracking solutions, and FASTag accessories.
          </p>
        </div>

        {/* Main Layout */}
        <div className="contact-layout">
          {/* LEFT SIDE */}
          <div className="contact-info-side">
            <div className="info-card">
              <div className="info-icon-wrapper"><Phone className="info-icon" /></div>
              <div className="info-content">
                <h3>Phone Support</h3>
                <p>+91 8985350585</p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon-wrapper"><MessageSquare className="info-icon" /></div>
              <div className="info-content">
                <h3>WhatsApp Support</h3>
                <p>+91 8985350585</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon-wrapper"><Mail className="info-icon" /></div>
              <div className="info-content">
                <h3>Email Address</h3>
                <p>hello@transetu.com</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon-wrapper"><Clock className="info-icon" /></div>
              <div className="info-content">
                <h3>Business Hours</h3>
                <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon-wrapper"><Globe className="info-icon" /></div>
              <div className="info-content">
                <h3>Service Coverage</h3>
                <p>PAN India Assistance</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="contact-form-side">
            <div className="form-glass-card">
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+91 00000 00000" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john@company.com" required />
                </div>

                <div className="form-group">
                  <label>Service Type</label>
                  <select required defaultValue="">
                    <option value="" disabled>Select a Service</option>
                    <option value="fastag">FASTag Services</option>
                    <option value="gps">GPS Tracking</option>
                    <option value="rfid">FASTag Holders</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea placeholder="How can we help you today?" rows={3} required></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Support Features Strip */}
        <div className="support-features-strip">
          <div className="feature-item">
            <div className="feature-icon-box"><Zap size={18} className="feature-icon" /></div>
            <span>Fast Response</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon-box"><ShieldCheck size={18} className="feature-icon" /></div>
            <span>Secure Communication</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon-box"><Phone size={18} className="feature-icon" /></div>
            <span>Dedicated Support</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon-box"><MapPin size={18} className="feature-icon" /></div>
            <span>PAN India Assistance</span>
          </div>
        </div>

        {/* Bottom Business Info Bar */}
        <div className="bottom-info-bar">
          <div className="bar-item">
            <MapPin size={16} className="bar-icon" />
            <span>HQ: Anakapalli, Andhra Pradesh, INDIA</span>
          </div>
          <div className="bar-item divider"></div>
          <div className="bar-item">
            <Clock size={16} className="bar-icon" />
            <span>24/7 Priority Support for Enterprise</span>
          </div>
          <div className="bar-item divider"></div>
          <div className="bar-item">
            <ShieldCheck size={16} className="bar-icon" />
            <span>Avg. Response Time: &lt; 2 Hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}

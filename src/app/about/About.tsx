"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Target,
  Eye,
  HeartHandshake,
  X,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Award,
  Briefcase,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import "./about.css";

export default function About() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  // Prevent background scrolling when slider is open
  useEffect(() => {
    if (isSliderOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSliderOpen]);

  return (
    <section className="about-section" id="about">
      {/* Background dotted pattern - right side */}
      <div className="about-bg-pattern"></div>

      <div className="about-container">
        <div className="about-grid">
          {/* Left Side */}
          <div className="about-left">
            <span className="about-label">ABOUT TRANSETU</span>
            <h2 className="about-title">
              Driven by <span className="about-title-highlight">Innovation.</span>
              <br />
              <span className="about-title-highlight">Committed</span> to You.
            </h2>
            <p className="about-description">
              Transetu is dedicated to delivering smart, reliable, and innovative
              solutions for modern travelers and businesses.
            </p>
            <button
              className="about-btn"
              onClick={() => setIsSliderOpen(true)}
            >
              Know More About Us <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Side */}
          <div className="about-right">
            <div className="about-feature">
              <div className="about-icon-container">
                <Target size={28} strokeWidth={1.5} />
              </div>
              <h3 className="about-feature-title">Our Mission</h3>
              <p className="about-feature-text">
                To provide seamless and smart travel solutions.
              </p>
            </div>

            <div className="about-feature">
              <div className="about-icon-container">
                <Eye size={28} strokeWidth={1.5} />
              </div>
              <h3 className="about-feature-title">Our Vision</h3>
              <p className="about-feature-text">
                To be a trusted leader in toll and tracking solutions.
              </p>
            </div>

            <div className="about-feature">
              <div className="about-icon-container">
                <HeartHandshake size={28} strokeWidth={1.5} />
              </div>
              <h3 className="about-feature-title">Our Commitment</h3>
              <p className="about-feature-text">
                Quality products, trusted service, and customer first.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Side Slider Panel */}
      <AnimatePresence>
        {isSliderOpen && (
          <>
            <motion.div
              className="about-slider-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSliderOpen(false)}
            />
            <motion.div
              className="about-slider-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="about-slider-header">
                <h3 className="about-slider-title">Transetu Details</h3>
                <button
                  className="about-slider-close"
                  onClick={() => setIsSliderOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="about-slider-content">
                {/* 1. Story Section */}
                <div className="mb-8">
                  <span className="about-label" style={{ display: "inline-block", marginBottom: "12px" }}>
                    THE TRANSETU STORY
                  </span>
                  <h4 className="slider-main-title">
                    Engineering the Future of{" "}
                    <span className="about-title-highlight">Highway Infrastructure</span>
                  </h4>

                  <p className="about-slider-text">
                    Transetu began with a singular vision: to eliminate friction
                    from India&apos;s vast highway networks. We recognized that the
                    modern traveler and logistics enterprise required more than
                    just physical infrastructure—they needed a{" "}
                    <span className="about-slider-highlight">
                      connected, intelligent mobility ecosystem
                    </span>.
                  </p>

                  <p className="about-slider-text">
                    Today, we stand at the forefront of transportation
                    technology. By integrating enterprise-grade FASTag tolling
                    systems with precision GPS tracking hardware, we&apos;ve created
                    a seamless transit experience that saves time, reduces fuel
                    consumption, and provides absolute visibility over assets in
                    motion.
                  </p>
                </div>

                {/* 2. Leadership Section - Right after Story */}
                <div className="leadership-section">
                  <span className="about-label" style={{ display: "inline-block", marginBottom: "16px" }}>
                    LEADERSHIP
                  </span>

                  <div className="leadership-card">
                    <div className="leadership-image-wrapper">
                      <Image
                        src="/assets/siva.png"
                        alt="Gopi Siva Shankar Gogula - Managing Director"
                        width={140}
                        height={140}
                        className="leadership-image"
                        priority
                      />
                      <div className="leadership-badge">MD</div>
                    </div>

                    <div className="leadership-info">
                      <h3 className="leadership-name">Gopi Siva Shankar Gogula</h3>
                      <p className="leadership-role">Managing Director</p>
                      <p className="leadership-tagline">
                        Banking & Financial Products Marketing Professional
                      </p>

                      <div className="leadership-meta">
                        <div className="meta-item">
                          <Award size={16} />
                          <span>MBA (HR)</span>
                        </div>
                        <div className="meta-item">
                          <Briefcase size={16} />
                          <span>6+ Years Experience</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="leadership-experience">
                    <h4 className="experience-title">Professional Highlights</h4>
                    <ul className="experience-list">
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          6+ years of experience in marketing and sales of banking & financial products.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Strong experience in B2B & B2C sales, channel development and partner management.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Expertise in agent/distributor onboarding, team handling and business development.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Experience in promoting FASTag, digital payment and other banking-related products & services.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Skilled in developing and managing sales teams, agents and channel partners.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Strong understanding of customer acquisition, lead generation and conversion strategies.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Experience in building banking product distribution networks across different markets.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Proven ability to achieve sales targets and grow business through field marketing and digital channels.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Strong relationship management with agents, merchants, customers and business partners.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Focused on business growth, customer satisfaction and long-term partner relationships.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Sai Trinath Saka Profile */}
                  <div className="leadership-card" style={{ marginTop: "24px" }}>
                    <div className="leadership-image-wrapper">
                      <Image
                        src="/assets/sai.png"
                        alt="Sai Trinath Saka - Co-Founder & CTO"
                        width={140}
                        height={140}
                        className="leadership-image"
                      />
                      <div className="leadership-badge">CTO</div>
                    </div>

                    <div className="leadership-info">
                      <h3 className="leadership-name">Sai Trinath Saka</h3>
                      <p className="leadership-role">Co-Founder & CTO</p>
                      <p className="leadership-tagline">
                        Technology &amp; Digital Platform Leader
                      </p>

                      <div className="leadership-meta">
                        <div className="meta-item">
                          <Award size={16} />
                          <span>B.Tech. in Computer Science</span>
                        </div>
                        <div className="meta-item">
                          <Briefcase size={16} />
                          <span>6+ Years Experience</span>
                          <a
                            href="https://www.linkedin.com/in/saitrinathsaka/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Sai Trinath Saka LinkedIn Profile"
                            title="LinkedIn Profile"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              color: "#05A223",
                              marginLeft: "8px",
                              paddingLeft: "8px",
                              borderLeft: "1px solid #DCE8E1",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                              <rect x="2" y="9" width="4" height="12" />
                              <circle cx="4" cy="4" r="2" />
                            </svg>
                            <span>LinkedIn</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="leadership-experience">
                    <h4 className="experience-title">Professional Highlights</h4>
                    <ul className="experience-list">
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          6+ years of experience in software engineering and building technology systems.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Co-Founder &amp; CTO responsible for the technology and digital platform direction of TranSetu.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Strong focus on building reliable and scalable digital platforms for TranSetu&apos;s products and services.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Experience in developing technology solutions that support FASTag, digital payments and last-mile financial services.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Focused on creating simple and efficient digital experiences for customers, agents and business partners.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Experience in building and improving scalable systems that support business operations and customer services.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Strong focus on technology-driven product development and continuous improvement.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Works on translating business requirements into practical and scalable technology solutions.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Focused on building secure, reliable and customer-oriented digital infrastructure.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>
                          Responsible for supporting TranSetu&apos;s long-term growth through technology and digital innovation.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 3. ISO & Uptime Cards */}
                <div className="about-slider-grid">
                  <div className="about-slider-card">
                    <ShieldCheck size={28} className="mb-4" color="#59C71C" />
                    <h4>ISO Certified</h4>
                    <p>
                      Our hardware and software ecosystems meet the highest
                      international standards for security and reliability.
                    </p>
                  </div>
                  <div className="about-slider-card">
                    <Zap size={28} className="mb-4" color="#59C71C" />
                    <h4>99.9% Uptime</h4>
                    <p>
                      Redundant server architecture ensures our tracking and
                      tolling APIs are always available when you need them.
                    </p>
                  </div>
                </div>

                {/* 4. Mobility Ecosystem */}
                <div style={{ marginTop: "10px" }}>
                  <h4 className="ecosystem-title">Our Mobility Ecosystem</h4>
                  <ul className="ecosystem-list">
                    <li>
                      <CheckCircle2 size={20} color="#59C71C" className="check-icon" />
                      <span>
                        <strong>Commercial Fleet Management:</strong> Real-time
                        telemetry, geofencing, and automated toll expense tracking.
                      </span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} color="#59C71C" className="check-icon" />
                      <span>
                        <strong>Private Vehicle Security:</strong> Premium
                        anti-theft GPS hardware integrated with emergency response protocols.
                      </span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} color="#59C71C" className="check-icon" />
                      <span>
                        <strong>Premium Accessories:</strong> Signal-neutral,
                        heat-resistant FASTag holders designed for extreme durability.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
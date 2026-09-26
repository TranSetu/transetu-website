"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OnboardingModal from "@/components/OnboardingModal";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  FileCheck,
  Headphones,
  IdCard,
  Info,
  Landmark,
  Lock,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import "./become-agent.css";

export default function BecomeAgentPage() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Deep-link support for #onboarding or ?onboarding=true
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashOrSearch = () => {
        if (
          window.location.hash === "#onboarding" ||
          new URLSearchParams(window.location.search).get("onboarding") === "true"
        ) {
          setIsOnboardingOpen(true);
        }
      };

      handleHashOrSearch();
      window.addEventListener("hashchange", handleHashOrSearch);
      return () => window.removeEventListener("hashchange", handleHashOrSearch);
    }
  }, []);

  // Section 1: What Does a TranSetu Agent Do?
  const agentRoles = [
    {
      title: "Customer Assistance & Issuance",
      desc: "Assist vehicle owners with issuing, activating, and affixing FASTags for seamless highway tolling.",
      icon: CreditCard,
    },
    {
      title: "Mobility Solutions Guidance",
      desc: "Introduce vehicle owners and fleet operators to GPS tracking devices and protective RFID holders.",
      icon: Navigation,
    },
    {
      title: "Identity & Verification Support",
      desc: "Guide customers through required vehicle verification steps to ensure accurate and compliant service.",
      icon: ShieldCheck,
    },
    {
      title: "Local Network Expansion",
      desc: "Serve as a trusted local touchpoint for TranSetu, expanding accessible digital mobility solutions across communities.",
      icon: Users,
    },
  ];

  // Section 2: Why Become a TranSetu Agent?
  const whyJoinBenefits = [
    {
      category: "Business Opportunities",
      title: "Grow Your Local Business",
      desc: "Access opportunities to offer TranSetu products and services to customers and build long-term relationships in your region.",
      icon: Zap,
    },
    {
      category: "Product & Service Offerings",
      title: "Essential Automotive Portfolio",
      desc: "Distribute essential, in-demand mobility solutions that private vehicle owners and commercial transport operators require every day.",
      icon: ShoppingBag,
    },
    {
      category: "Customer Reach",
      title: "Diverse Market Demand",
      desc: "Connect with private car owners, transport companies, taxi aggregators, and commercial fleet managers seeking hassle-free travel tools.",
      icon: Users,
    },
    {
      category: "Agent Support",
      title: "Dedicated Partner Guidance",
      desc: "Receive comprehensive onboarding assistance, product information, and ongoing operational support from the TranSetu team.",
      icon: Headphones,
    },
    {
      category: "Commission & Incentive Opportunities",
      title: "Partner Program Access",
      desc: "Access opportunities to offer TranSetu products and services to customers as part of our expanding agent network.",
      icon: Sparkles,
    },
  ];

  // Section 3: What Can You Offer as a TranSetu Agent?
  const existingProducts = [
    {
      name: "FASTag",
      badge: "National Electronic Toll",
      tagline:
        "Cashless toll payments with instant deduction and seamless highway travel across toll plazas nationwide.",
      image: "/products/fastags.png",
      features: [
        "Instant doorstep issuance & activation",
        "Seamless cashless highway toll payments",
        "Compatible with all major vehicle categories",
      ],
    },
    {
      name: "FASTag Holder",
      badge: "Vehicle Accessory",
      tagline:
        "Durable, transparent acrylic protective holder designed for clean windshield mounting and long-lasting protection.",
      image: "/products/rfid-holders-new.png",
      features: [
        "Premium clear acrylic construction",
        "Protects RFID tag from windshield wear & tear",
        "Simple peel-and-stick application",
      ],
    },
    {
      name: "GPS Tracker",
      badge: "Vehicle Safety & Fleet",
      tagline:
        "Real-time AIS-140 certified vehicle tracking for safety, security, and smart fleet monitoring.",
      image: "/products/gps-tracker.png",
      features: [
        "Live location tracking & trip playback",
        "Anti-theft alerts & geofencing support",
        "Built for personal cars, commercial trucks & fleets",
      ],
    },
  ];

  // Section 4: Candidate Profiles
  const candidateProfiles = [
    {
      title: "Automotive Retailers & Kiosks",
      desc: "Car accessory outlets, service workshops, fuel station kiosks, and tyre centers looking to expand their mobility service portfolio.",
    },
    {
      title: "Transport & Fleet Operators",
      desc: "Fleet owners, commercial vehicle coordinators, taxi operators, and logistics service points handling vehicular movement.",
    },
    {
      title: "Digital Service Centers",
      desc: "Common Service Centers (CSC), cyber cafes, and e-governance service kiosks assisting motorists with documentation.",
    },
    {
      title: "Independent Entrepreneurs",
      desc: "Individuals with strong community connections seeking to represent a modern mobility platform in their local territory.",
    },
  ];

  // Section 5: How Does It Work? Interactive steps
  const processSteps = [
    {
      step: "01",
      title: "Learn About the Opportunity",
      desc: "Understand what being a TranSetu Agent involves, the products available to offer, and how our partner model functions.",
      actionLabel: "View Role Overview",
      targetId: "what-agents-do",
    },
    {
      step: "02",
      title: "Start Onboarding",
      desc: "Provide your contact number, profile details, and upload the required identity and bank documents through our secure form.",
      actionLabel: "Open Onboarding Form",
      isOpenModal: true,
    },
    {
      step: "03",
      title: "Submit Your Application",
      desc: "Review all your entered information, verify the accuracy of your details, and submit your onboarding request.",
      actionLabel: "Check Document List",
      targetId: "onboarding-requirements",
    },
    {
      step: "04",
      title: "Application Review",
      desc: "The TranSetu team reviews the submitted information and compliance documents. Review typically takes 1 to 2 business days.",
      actionLabel: "View Eligibility",
      targetId: "eligibility",
    },
    {
      step: "05",
      title: "Next Steps",
      desc: "You will receive further communication and onboarding instructions from the TranSetu team after your details are reviewed.",
      actionLabel: "View Partner Benefits",
      targetId: "why-become-agent",
    },
  ];

  // Section 6: What You'll Need for Onboarding
  const documentRequirements = [
    {
      title: "1. Mobile Number & OTP",
      desc: "An active 10-digit Indian mobile number to receive one-time verification codes during onboarding.",
      icon: Phone,
    },
    {
      title: "2. Profile & Personal Details",
      desc: "Your full legal name, active email address, secure account password, and an optional profile photo.",
      icon: UserCheck,
    },
    {
      title: "3. Aadhaar Details",
      desc: "Valid 12-digit Aadhaar number along with clear front and back document photographs or PDF.",
      icon: IdCard,
    },
    {
      title: "4. PAN Details",
      desc: "Valid 10-character PAN number along with clear front and back document photographs or PDF.",
      icon: FileCheck,
    },
    {
      title: "5. Bank Account Details",
      desc: "Bank name, account holder name, account number, IFSC code, branch name, and passbook/cheque document.",
      icon: Landmark,
    },
    {
      title: "6. Review and Submit",
      desc: "Self-declaration confirming that all submitted information and documents are authentic and accurate.",
      icon: CheckCircle2,
    },
  ];

  return (
    <main className="become-agent-page">
      <Navbar />

      {/* ================================================================
          HERO SECTION
          ================================================================ */}
      <section className="agent-hero">
        <div className="agent-hero-container">
          {/* Back Navigation Button */}
          <div className="agent-back-nav-wrapper">
            <Link
              href="/#become-agent"
              className="agent-back-btn"
              aria-label="Back to Previous Section"
            >
              <ArrowLeft size={15} strokeWidth={2} />
              <span>Back to Previous Section</span>
            </Link>
          </div>

          <div className="agent-hero-badge">
            <UserCheck size={16} className="agent-hero-badge-icon" />
            <span>TRANSETU AGENT NETWORK</span>
          </div>

          <h1 className="agent-hero-title">
            Become a <span className="agent-hero-title-highlight">TranSetu Agent</span>
          </h1>

          <p className="agent-hero-subtitle">
            Partner with TranSetu to offer our digital and mobility solutions to
            customers across India. Join our agent network, provide essential
            automotive services, and explore growing business opportunities.
          </p>

          <div className="agent-hero-ctas">
            <button
              type="button"
              id="hero-start-onboarding-cta"
              onClick={() => setIsOnboardingOpen(true)}
              className="agent-btn-primary"
              aria-label="Start Onboarding"
            >
              <span>Start Onboarding</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="agent-hero-trust-strip">
            <div className="agent-hero-trust-item">
              <ShieldCheck size={18} className="agent-hero-trust-icon" />
              <span>Official Partner Program</span>
            </div>
            <div className="agent-hero-trust-item">
              <Truck size={18} className="agent-hero-trust-icon" />
              <span>Doorstep Mobility Services</span>
            </div>
            <div className="agent-hero-trust-item">
              <MapPin size={18} className="agent-hero-trust-icon" />
              <span>PAN India Coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 1 — WHAT DOES A TRANSETU AGENT DO?
          ================================================================ */}
      <section id="what-agents-do" className="agent-section">
        <div className="agent-section-container">
          <div className="agent-section-header">
            <span className="agent-section-tag">ROLE OVERVIEW</span>
            <h2 className="agent-section-heading">What Does a TranSetu Agent Do?</h2>
            <p className="agent-section-subtext">
              TranSetu Agents serve as local facilitators who connect vehicle
              owners with seamless tolling, vehicle tracking, and essential
              automotive accessories.
            </p>
          </div>

          <div className="agent-roles-grid">
            {agentRoles.map((role, idx) => {
              const IconComp = role.icon;
              return (
                <div key={idx} className="agent-role-card">
                  <div className="agent-card-icon-box">
                    <IconComp size={22} />
                  </div>
                  <h3 className="agent-card-title">{role.title}</h3>
                  <p className="agent-card-desc">{role.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — WHY BECOME A TRANSETU AGENT?
          ================================================================ */}
      <section id="why-become-agent" className="agent-section alt-bg">
        <div className="agent-section-container">
          <div className="agent-section-header">
            <span className="agent-section-tag">PARTNER ADVANTAGE</span>
            <h2 className="agent-section-heading">Why Become a TranSetu Agent?</h2>
            <p className="agent-section-subtext">
              Collaborate with a modern mobility platform committed to quality
              service, reliable fulfillment, and supportive partner tools.
            </p>
          </div>

          <div className="agent-benefits-grid">
            {whyJoinBenefits.map((benefit, idx) => {
              const IconComp = benefit.icon;
              return (
                <div key={idx} className="agent-benefit-card">
                  <span className="agent-benefit-category">{benefit.category}</span>
                  <div
                    className="agent-card-icon-box"
                    style={{ marginBottom: "16px", width: "42px", height: "42px" }}
                  >
                    <IconComp size={20} />
                  </div>
                  <h3 className="agent-benefit-title">{benefit.title}</h3>
                  <p className="agent-benefit-desc">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — WHAT CAN YOU OFFER AS A TRANSETU AGENT?
          ================================================================ */}
      <section id="agent-offerings" className="agent-section">
        <div className="agent-section-container">
          <div className="agent-section-header">
            <span className="agent-section-tag">PRODUCT SUITE</span>
            <h2 className="agent-section-heading">
              What Can You Offer as a TranSetu Agent?
            </h2>
            <p className="agent-section-subtext">
              Provide your customers with genuine, high-demand automotive and
              highway transit solutions available in the TranSetu ecosystem.
            </p>
          </div>

          <div className="agent-products-grid">
            {existingProducts.map((prod, idx) => (
              <div key={idx} className="agent-product-card">
                <div className="agent-product-img-wrap">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="agent-product-img"
                  />
                </div>

                <div className="agent-product-body">
                  <div className="agent-product-title-row">
                    <h3 className="agent-product-title">{prod.name}</h3>
                    <span className="agent-product-badge">{prod.badge}</span>
                  </div>

                  <p className="agent-product-desc">{prod.tagline}</p>

                  <ul className="agent-product-features">
                    {prod.features.map((feat, fIdx) => (
                      <li key={fIdx} className="agent-product-feature-item">
                        <CheckCircle2 size={15} className="agent-product-feature-icon" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — WHO CAN BECOME A TRANSETU AGENT?
          ================================================================ */}
      <section id="eligibility" className="agent-section alt-bg">
        <div className="agent-section-container">
          <div className="agent-section-header">
            <span className="agent-section-tag">ELIGIBILITY</span>
            <h2 className="agent-section-heading">Who Can Become a TranSetu Agent?</h2>
            <p className="agent-section-subtext">
              We welcome motivated individuals and business owners with an
              interest in digital mobility services.
            </p>
          </div>

          <div className="agent-eligibility-card">
            <p className="agent-eligibility-statement">
              TranSetu welcomes individuals and business partners interested in
              offering TranSetu products and services. Eligibility and requirements
              may vary based on the onboarding process.
            </p>

            <div className="agent-profiles-grid">
              {candidateProfiles.map((item, idx) => (
                <div key={idx} className="agent-profile-item">
                  <h4 className="agent-profile-title">{item.title}</h4>
                  <p className="agent-profile-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="agent-eligibility-disclaimer">
            <Info size={18} className="agent-eligibility-disclaimer-icon" />
            <span>
              All agent applicants are required to complete identity and document
              verification through the onboarding form. Approval is subject to
              compliance verification by the TranSetu team.
            </span>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — HOW DOES IT WORK?
          ================================================================ */}
      <section id="how-it-works" className="agent-section">
        <div className="agent-section-container">
          <div className="agent-section-header">
            <span className="agent-section-tag">STEP-BY-STEP</span>
            <h2 className="agent-section-heading">How to Become a TranSetu Agent</h2>
            <p className="agent-section-subtext">
              Follow our straightforward 5-step journey to submit your
              application and get started with TranSetu. Click any step to jump
              directly to that information.
            </p>
          </div>

          <div className="agent-steps-flow">
            {processSteps.map((item, idx) => {
              if (item.isOpenModal) {
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setIsOnboardingOpen(true)}
                    className="agent-step-flow-card"
                    style={{ textAlign: "left", width: "100%", font: "inherit", cursor: "pointer" }}
                  >
                    <span className="agent-step-flow-number">{item.step}</span>
                    <h3 className="agent-step-flow-title">{item.title}</h3>
                    <p className="agent-step-flow-desc">{item.desc}</p>
                    <div className="agent-step-flow-action">
                      <span>{item.actionLabel}</span>
                      <ArrowRight size={13} />
                    </div>
                  </button>
                );
              }

              return (
                <a
                  key={idx}
                  href={`#${item.targetId}`}
                  className="agent-step-flow-card"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="agent-step-flow-number">{item.step}</span>
                  <h3 className="agent-step-flow-title">{item.title}</h3>
                  <p className="agent-step-flow-desc">{item.desc}</p>
                  <div className="agent-step-flow-action">
                    <span>{item.actionLabel}</span>
                    <ArrowRight size={13} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — WHAT DO I NEED FOR ONBOARDING?
          ================================================================ */}
      <section id="onboarding-requirements" className="agent-section alt-bg">
        <div className="agent-section-container">
          <div className="agent-section-header">
            <span className="agent-section-tag">DOCUMENT CHECKLIST</span>
            <h2 className="agent-section-heading">What You&apos;ll Need for Onboarding</h2>
            <p className="agent-section-subtext">
              Have these documents and details readily accessible before starting
              your application to ensure a smooth onboarding process.
            </p>
          </div>

          <div className="agent-docs-grid">
            {documentRequirements.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="agent-doc-card">
                  <div className="agent-doc-icon-wrap">
                    <IconComp size={20} />
                  </div>
                  <div className="agent-doc-info">
                    <h3 className="agent-doc-title">{item.title}</h3>
                    <p className="agent-doc-desc">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="agent-docs-privacy-notice">
            <Lock size={16} className="agent-docs-privacy-icon" />
            <span>
              Your information is securely encrypted during transmission and
              review. TranSetu adheres to strict privacy and data protection
              standards.
            </span>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 7 — ONBOARDING PROCESS (CTA SECTION)
          ================================================================ */}
      <section className="agent-cta-section">
        <div className="agent-cta-container">
          <div className="agent-cta-card-box">
            <div className="agent-cta-badge">
              <Sparkles size={14} />
              <span>JOIN OUR PARTNER NETWORK</span>
            </div>

            <h2 className="agent-cta-title">Ready to Become a TranSetu Agent?</h2>

            <p className="agent-cta-desc">
              If you&apos;re interested in becoming a TranSetu Agent, complete the
              onboarding form and submit your details for review.
            </p>

            <div className="agent-cta-buttons">
              <button
                type="button"
                id="cta-start-onboarding"
                onClick={() => setIsOnboardingOpen(true)}
                className="agent-cta-btn-primary"
                aria-label="Start Onboarding"
              >
                <span>Start Onboarding</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Agent Onboarding Multi-Step Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      <Footer />
    </main>
  );
}

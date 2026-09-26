"use client";

import Link from "next/link";
import { ArrowRight, UserCheck, Smartphone, Users, Headphones } from "lucide-react";

export default function BecomeAgentSection() {
  const agentHighlights = [
    {
      title: "Digital Mobility Products",
      desc: "Offer in-demand FASTag, GPS tracking, and automotive accessories",
      icon: Smartphone,
    },
    {
      title: "Expand Customer Reach",
      desc: "Connect with private vehicle owners and commercial fleet operators",
      icon: Users,
    },
    {
      title: "Dedicated Partner Support",
      desc: "Guidance, operational assistance, and simple digital tools",
      icon: Headphones,
    },
  ];

  return (
    <section id="become-agent" className="become-agent-section">
      <div className="container">
        <div className="become-agent-card">
          <div className="become-agent-main">
            <div className="become-agent-badge">
              <UserCheck size={16} className="become-agent-badge-icon" />
              <span>PARTNER OPPORTUNITY</span>
            </div>

            <h2 className="become-agent-heading">Become a TranSetu Agent</h2>

            <p className="become-agent-desc">
              Partner with TranSetu and explore opportunities to offer our digital and mobility solutions to customers. Learn how becoming a TranSetu Agent works, what you can offer, and how to get started.
            </p>

            <Link
              href="/become-agent/"
              id="become-an-agent-cta"
              className="btn-become-agent"
              aria-label="Become an Agent"
            >
              <span>Become an Agent</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div
            className="become-agent-steps-card"
            aria-label="Partner highlights"
          >
            <div className="become-agent-steps-header">
              <UserCheck size={18} className="become-agent-badge-icon" />
              <span className="become-agent-steps-title">Why Partner With Us</span>
            </div>
            <div className="become-agent-steps-list">
              {agentHighlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="become-agent-step-item">
                    <div className="become-agent-step-icon-wrap">
                      <IconComponent size={16} />
                    </div>
                    <div className="become-agent-step-text">
                      <div className="become-agent-step-name">
                        <span>{item.title}</span>
                      </div>
                      <span className="become-agent-step-sub">{item.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

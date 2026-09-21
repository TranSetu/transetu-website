"use client";

import { Gauge, Shield, Clock, Users } from "lucide-react";

export default function TrustBar() {
  const items = [
    {
      icon: <Gauge className="strip-icon" />,
      title: "Cashless Payments",
      subtitle1: "Fast & Convenient",
      subtitle2: "Toll Payments",
    },
    {
      icon: <Shield className="strip-icon" />,
      title: "Secure & Reliable",
      subtitle1: "100% Safe & Encrypted",
      subtitle2: "Transactions",
    },
    {
      icon: <Clock className="strip-icon" />,
      title: "24/7 Support",
      subtitle1: "We're Here Anytime",
      subtitle2: "You Need Us",
    },
    {
      icon: <Users className="strip-icon" />,
      title: "Trusted by Thousands",
      subtitle1: "Across Highways",
      subtitle2: "Across India",
    },
  ];

  return (
    <section className="feature-strip">
      <div className="container strip-container">
        {items.map((item, index) => (
          <div key={index} className="strip-item">
            {item.icon}
            <div className="strip-content">
              <h4>{item.title}</h4>
              <p>{item.subtitle1}</p>
              <p>{item.subtitle2}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
"use client";

import { CreditCard, MapPin, Box, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import TrustBar from "./TrustBar";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg-wrapper">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-bg-video-el"
        >
          <source src="/assets/bg_video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Subtle diagonal brand motif inspired by visiting card */}
      <div className="hero-diagonal-accents" aria-hidden="true">
        <div className="diagonal-band band-primary" />
        <div className="diagonal-band band-accent" />
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="hero-welcome-container"
          >
            <span className="hero-welcome-title">Welcome to Transetu</span>
          </motion.div>

          <motion.h1
            className="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Seamless Travel.
            <br />
            <span className="solutions-wrap">
              <span className="text-gradient">Smarter</span> Solutions.
            </span>
          </motion.h1>

          <motion.p
            className="hero-p"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Transetu provides reliable FASTag solutions, GPS tracking systems,
            and premium holders for a smoother journey.
          </motion.p>

         {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hero-cta-wrapper"
          >
            <Link href="/#products" className="btn-fastag" style={{ textDecoration: 'none' }}>
              Check FASTag Status <ArrowRight size={18} />
            </Link>
          </motion.div> */}

          <motion.div
            className="hero-features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="hero-feature-item">
              <CreditCard className="hero-feature-icon" size={24} />
              <span className="hero-feature-label">FASTag</span>
            </div>
            <div className="hero-feature-item">
              <MapPin className="hero-feature-icon" size={24} />
              <span className="hero-feature-label">GPS Trackers</span>
            </div>
            <div className="hero-feature-item">
              <Box className="hero-feature-icon" size={24} />
              <span className="hero-feature-label">FASTag Holders</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <Link href="/#products" className="btn-primary" style={{ textDecoration: 'none' }}>
              Explore Products
            </Link>
            <Link href="/#about" className="btn-secondary" style={{ textDecoration: 'none' }}>
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        <div className="hero-visual">
          {/* Visual balance */}
        </div>
      </div>

      <div className="hero-bottom-bar">
        <TrustBar />
      </div>
    </section>
  );
}
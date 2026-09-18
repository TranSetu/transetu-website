"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FastagEnquiryModal from "@/components/FastagEnquiryModal";
import { 
  Check, Shield, Globe, 
  ArrowRight, ArrowLeft, X, MousePointerClick, 
  MapPin, Clock, LayoutDashboard, Bell, 
  Truck, Bus, Package, Building2, 
  Settings, Signal, Wrench, PlayCircle, Loader2, CheckCircle2,
  Smartphone, Activity, Navigation, Lock, Server, BarChart3, Users,
  ChevronRight, CreditCard, Landmark, Wallet, ShieldCheck, Upload
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import "./gps.css";
import Link from "next/link";

export default function GPSDetail() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [formStep, setFormStep] = useState(1); // 1: Details, 2: Checkout

  const handleProceedPayment = (planName: string, price: string) => {
    setSelectedPlan(planName);
    setSelectedPrice(price);
    setShowPaymentForm(true);
    setFormStep(1);
    setIsProcessing(false);
    setIsSuccess(false);
  };

  const features = [
    { icon: <MapPin size={32} />, title: "Live Vehicle Tracking", desc: "Real-time monitoring with interactive pinpoint accuracy." },
    { icon: <Globe size={32} />, title: "Geo-Fencing", desc: "Set virtual boundaries and get instant breach alerts." },
    { icon: <Clock size={32} />, title: "Route History", desc: "Access detailed 6-month historical trip and route playback." },
    { icon: <Settings size={32} />, title: "Engine Monitoring", desc: "Track engine health and enable remote immobilization." },
    { icon: <LayoutDashboard size={32} />, title: "Fleet Dashboard", desc: "Manage entire fleets from a unified analytics dashboard." },
    { icon: <Bell size={32} />, title: "Theft Alerts", desc: "Instant notifications for unauthorized movement or tampering." },
  ];

  const industries = [
    { icon: <Truck size={36} />, title: "Logistics", desc: "Optimize freight routing and delivery schedules." },
    { icon: <Bus size={36} />, title: "Transport", desc: "Ensure passenger safety and schedule adherence." },
    { icon: <Building2 size={36} />, title: "Fleet Businesses", desc: "Control operational costs and vehicle health." },
    { icon: <Package size={36} />, title: "Delivery Services", desc: "Track last-mile deliveries with complete precision." },
  ];

  const whyChooseUs = [
    { icon: <Server size={32} />, title: "Enterprise Infrastructure", desc: "Scalable cloud infrastructure built for high-volume fleet operations." },
    { icon: <Navigation size={32} />, title: "High Accuracy Tracking", desc: "Sub-meter GNSS accuracy for reliable urban tracking." },
    { icon: <Lock size={32} />, title: "Secure Cloud Platform", desc: "End-to-end encryption securing sensitive logistics data." },
    { icon: <Activity size={32} />, title: "24/7 Monitoring", desc: "Automated around-the-clock monitoring for offline unit alerts." },
    { icon: <BarChart3 size={32} />, title: "Fleet Analytics", desc: "Convert fleet data into operational intelligence." },
    { icon: <Users size={32} />, title: "Scalable Architecture", desc: "Scale from 5 to 50,000+ vehicles without platform migration." },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setShowPaymentForm(false);
        setIsSuccess(false);
      }, 4000);
    }, 2500);
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="gps-page">
      <Navbar />
      
      {/* 1. Hero Section */}
      <section className="gps-hero">
        <Link href="/#products" className="gps-back-nav-btn">
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </Link>
        <div className="gps-hero-bg-elements">
          <div className="gps-hero-overlay-dark"></div>
          <div className="gps-cta-particle-bg"></div>
          <div className="gps-hero-glow-orb orb-1"></div>
          <div className="gps-hero-glow-orb orb-2"></div>
          <div className="gps-hero-scanner"></div>
        </div>

        <div className="gps-hero-content">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <span className="gps-hero-badge">Enterprise GPS Solutions</span>
            <h1 className="gps-title">Real-Time Fleet Intelligence<br /><span>for Modern Transport</span></h1>
            <p className="gps-subtitle">Monitor, manage, and secure your vehicles with enterprise-grade GPS Trackers built for real-world transport operations and smart mobility infrastructure.</p>
            <div className="gps-hero-buttons">
              <button
                type="button"
                className="gps-btn-glow-premium"
                onClick={() => setIsEnquiryOpen(true)}
              >
                <span className="flex items-center justify-center gap-2">
                  Send Message <ArrowRight size={20} />
                </span>
              </button>
            </div>

            <div className="gps-cta-trust mt-12" style={{ marginTop: '48px', opacity: 0.8 }}>
              <div className="gps-trust-item"><CheckCircle2 size={16} className="text-accent" /> AIS-140 Certified</div>
              <div className="gps-trust-item"><CheckCircle2 size={16} className="text-accent" /> Real-time Analytics</div>
              <div className="gps-trust-item"><CheckCircle2 size={16} className="text-accent" /> 24/7 Fleet Support</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust & Business Credibility Strip */}
      <section className="gps-trust-strip">
        <div className="gps-container">
          <div className="gps-trust-content">
            <div className="gps-trust-brand-side">
              <span className="gps-trust-label">Trusted Infrastructure Platform</span>
              <h3 className="gps-trust-main-heading">Enterprise Grade Fleet<br />Intelligence Systems</h3>
            </div>
            
            <div className="gps-trust-metrics-grid">
              <div className="gps-t-metric-card">
                <div className="gps-t-icon-box"><Shield size={20} /></div>
                <div className="gps-t-info">
                  <h4>Enterprise Grade</h4>
                  <p>Secured architecture</p>
                </div>
              </div>
              <div className="gps-t-metric-card">
                <div className="gps-t-icon-box"><Server size={20} /></div>
                <div className="gps-t-info">
                  <h4>99.9% Uptime</h4>
                  <p>Mission critical SLA</p>
                </div>
              </div>
              <div className="gps-t-metric-card">
                <div className="gps-t-icon-box"><Globe size={20} /></div>
                <div className="gps-t-info">
                  <h4>Nationwide</h4>
                  <p>Complete coverage</p>
                </div>
              </div>
              
              <div className="gps-partner-marquee-container">
                <div className="gps-partner-marquee-track">
                  <div className="gps-partner-logo-v2">TATA MOTORS</div>
                  <div className="gps-partner-logo-v2">ASHOK LEYLAND</div>
                  <div className="gps-partner-logo-v2">MAHINDRA</div>
                  <div className="gps-partner-logo-v2">ECOM EXPRESS</div>
                  <div className="gps-partner-logo-v2">DELHIVERY</div>
                  <div className="gps-partner-logo-v2">BLUE DART</div>
                  {/* Duplicate for infinite loop */}
                  <div className="gps-partner-logo-v2">TATA MOTORS</div>
                  <div className="gps-partner-logo-v2">ASHOK LEYLAND</div>
                  <div className="gps-partner-logo-v2">MAHINDRA</div>
                  <div className="gps-partner-logo-v2">ECOM EXPRESS</div>
                  <div className="gps-partner-logo-v2">DELHIVERY</div>
                  <div className="gps-partner-logo-v2">BLUE DART</div>
                  {/* Third set to ensure no gaps */}
                  <div className="gps-partner-logo-v2">TATA MOTORS</div>
                  <div className="gps-partner-logo-v2">ASHOK LEYLAND</div>
                  <div className="gps-partner-logo-v2">MAHINDRA</div>
                  <div className="gps-partner-logo-v2">ECOM EXPRESS</div>
                  <div className="gps-partner-logo-v2">DELHIVERY</div>
                  <div className="gps-partner-logo-v2">BLUE DART</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Choose Us Section */}
      <section className="gps-section bg-dark-1 overflow-hidden" style={{ display: "none" }}>
        <div className="gps-container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="gps-section-title">Why Businesses Choose <span>Transetu</span></h2>
            <p className="gps-section-desc max-w-2xl mx-auto text-center">Delivering unparalleled reliability and precision for mission-critical transport operations.</p>
          </motion.div>
          
          <motion.div 
            className="gps-why-grid"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          >
            {whyChooseUs.map((item, index) => (
              <motion.div key={index} className="gps-why-card gps-glass-panel" variants={fadeInUp}>
                <div className="gps-why-icon-wrap">
                  {item.icon}
                  <div className="gps-icon-glow"></div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="gps-why-card-border"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Features Grid */}
      <section className="gps-section bg-gradient-blue relative">
        <div className="gps-animated-bg-gradient"></div>
        <div className="gps-container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="gps-section-title">Next-Gen <span>Features</span></h2>
            <p className="gps-section-desc max-w-2xl mx-auto text-center">Everything you need to manage your fleet securely and efficiently.</p>
          </motion.div>
          
          <motion.div 
            className="gps-features-grid"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div key={index} className="gps-glass-panel gps-feature-card-premium" variants={fadeInUp}>
                <div className="gps-feature-icon-premium">
                  {feature.icon}
                </div>
                <h3 className="gps-feature-title">{feature.title}</h3>
                <p className="gps-feature-desc">{feature.desc}</p>
                <div className="gps-feature-hover-glow"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Command Center */}
      <section className="gps-section bg-dark-2 overflow-hidden">
        <div className="gps-container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="gps-section-title">Command <span>Center</span></h2>
            <p className="gps-section-desc max-w-2xl mx-auto text-center">Monitor operations with enterprise-grade real-time fleet telemetry.</p>
          </motion.div>
          
          <div className="gps-command-layout">
            <motion.div 
              className="gps-command-analytics"
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            >
              <div className="gps-analytics-card">
                <div className="gps-analytics-header">
                  <div className="gps-analytics-icon"><Truck size={20} /></div>
                  <span className="gps-trend-up">+12%</span>
                </div>
                <div className="gps-analytics-body">
                  <div className="gps-analytics-val">1,240</div>
                  <div className="gps-analytics-label">Active Vehicles</div>
                </div>
                <div className="gps-analytics-graph gps-graph-1"></div>
                <div className="gps-pulse-indicator gps-status-green"></div>
              </div>

              <div className="gps-analytics-card">
                <div className="gps-analytics-header">
                  <div className="gps-analytics-icon"><Signal size={20} /></div>
                  <span className="gps-trend-up">+5%</span>
                </div>
                <div className="gps-analytics-body">
                  <div className="gps-analytics-val">98.5%</div>
                  <div className="gps-analytics-label">Vehicles Online</div>
                </div>
                <div className="gps-analytics-graph gps-graph-2"></div>
                <div className="gps-pulse-indicator gps-status-blue"></div>
              </div>

              <div className="gps-analytics-card gps-alert-card">
                <div className="gps-analytics-header">
                  <div className="gps-analytics-icon"><Bell size={20} /></div>
                  <span className="gps-trend-down">-2%</span>
                </div>
                <div className="gps-analytics-body">
                  <div className="gps-analytics-val">3</div>
                  <div className="gps-analytics-label">Emergency Alerts</div>
                </div>
                <div className="gps-analytics-graph gps-graph-3"></div>
                <div className="gps-pulse-indicator gps-status-red"></div>
              </div>

              <div className="gps-analytics-card">
                <div className="gps-analytics-header">
                  <div className="gps-analytics-icon"><Server size={20} /></div>
                  <span className="gps-trend-neutral">Stable</span>
                </div>
                <div className="gps-analytics-body">
                  <div className="gps-analytics-val">99.99%</div>
                  <div className="gps-analytics-label">System Uptime</div>
                </div>
                <div className="gps-analytics-graph gps-graph-4"></div>
                <div className="gps-pulse-indicator gps-status-green"></div>
              </div>
            </motion.div>

            <motion.div 
              className="gps-command-map-wrapper"
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            >
              <div className="gps-live-map-ui">
                <div className="gps-map-grid-bg"></div>
                
                <svg className="gps-map-routes" viewBox="0 0 800 600">
                  <path d="M 100 500 L 200 400 L 400 450 L 550 250 L 700 150" className="gps-map-route-line active" />
                  <path d="M 50 200 L 150 250 L 250 150 L 450 200 L 600 400" className="gps-map-route-line" />
                </svg>

                <div className="gps-map-pin pin-1">
                  <div className="gps-pin-core"></div>
                  <div className="gps-pin-radar"></div>
                </div>
                <div className="gps-map-pin pin-2">
                  <div className="gps-pin-core"></div>
                  <div className="gps-pin-radar"></div>
                </div>
                <div className="gps-map-pin pin-3 warning">
                  <div className="gps-pin-core"></div>
                  <div className="gps-pin-radar"></div>
                </div>

                <div className="gps-telemetry-card t-card-1">
                  <div className="gps-t-header">MH 12 AB 1234</div>
                  <div className="gps-t-row"><span>Speed:</span> 65 km/h</div>
                  <div className="gps-t-row"><span>Fuel:</span> 78%</div>
                  <div className="gps-t-status">Live Tracking</div>
                </div>

                <div className="gps-telemetry-card t-card-2">
                  <div className="gps-t-header">DL 01 CD 5678</div>
                  <div className="gps-t-row"><span>Speed:</span> 0 km/h</div>
                  <div className="gps-t-row"><span>Status:</span> Idling</div>
                  <div className="gps-t-status warning">Check Required</div>
                </div>

                <div className="gps-holo-overlay"></div>
                <div className="gps-map-scanner"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Mobile App Ecosystem Section */}
      <section className="gps-section bg-dark-1 overflow-hidden relative">
        <div className="gps-container">
          <div className="gps-mobile-ecosystem-layout">
            <motion.div 
              className="gps-mobile-content"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            >
              <h2 className="gps-section-title text-left" style={{ marginBottom: "20px" }}>Track Anywhere.<br /><span>Control Anytime.</span></h2>
              <p className="gps-mobile-desc">
                Access enterprise command center intelligence on the go. Native mobile applications for iOS and Android.
              </p>
              
              <ul className="gps-mobile-features">
                <li>
                  <div className="gps-m-icon"><MapPin size={20} /></div>
                  <div>
                    <h4>Live Tracking</h4>
                    <p>Sub-second location updates on an interactive mobile map.</p>
                  </div>
                </li>
                <li>
                  <div className="gps-m-icon"><Bell size={20} /></div>
                  <div>
                    <h4>Instant Alerts</h4>
                    <p>Push notifications for speeding, geo-fence breaches, and ignition.</p>
                  </div>
                </li>
                <li>
                  <div className="gps-m-icon"><Settings size={20} /></div>
                  <div>
                    <h4>Remote Monitoring</h4>
                    <p>Immobilize vehicles or run diagnostics remotely via the app.</p>
                  </div>
                </li>
              </ul>
              

            </motion.div>
            
            <motion.div 
              className="gps-mobile-mockup-wrapper"
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="gps-smartphone-mockup">
                <div className="gps-phone-notch"></div>
                <div className="gps-phone-screen">
                  <div className="gps-app-header">
                    <div className="gps-app-menu"><div className="gps-hamburger"></div></div>
                    <div className="gps-app-title">Transetu Fleet</div>
                    <div className="gps-app-profile"></div>
                  </div>
                  <div className="gps-app-map">
                    <div className="gps-app-map-grid"></div>
                    <div className="gps-app-pin"></div>
                    <svg className="gps-app-route" viewBox="0 0 200 300"><path d="M 50 250 L 100 150 L 150 100" /></svg>
                    
                    <div className="gps-app-floating-card">
                      <div className="gps-af-title">Vehicle #402</div>
                      <div className="gps-af-status">In Transetu • 55 km/h</div>
                      <div className="gps-af-bar"><div className="gps-af-progress"></div></div>
                    </div>
                  </div>
                  <div className="gps-app-bottom-nav">
                    <div className="gps-nav-item active"><MapPin size={20} /></div>
                    <div className="gps-nav-item"><Activity size={20} /></div>
                    <div className="gps-nav-item"><Bell size={20} /></div>
                    <div className="gps-nav-item"><Settings size={20} /></div>
                  </div>
                </div>
                <div className="gps-phone-glow"></div>
              </div>
              
              <motion.div 
                className="gps-floating-notification f-notif-1"
                animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
              >
                <CheckCircle2 size={16} color="#59C71C" /> Delivery Completed
              </motion.div>
              <motion.div 
                className="gps-floating-notification f-notif-2"
                animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              >
                <Bell size={16} color="#F59E0B" /> Over-speeding Alert
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Industries Section */}
      <section className="gps-section bg-gradient-blue relative">
        <div className="gps-industries-bg-texture"></div>
        <div className="gps-container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="gps-section-title">Built For <span>Your Industry</span></h2>
            <p className="gps-section-desc max-w-2xl mx-auto text-center">Tailored intelligence for every sector of transport and logistics.</p>
          </motion.div>
          
          <motion.div 
            className="gps-industries-grid"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          >
            {industries.map((industry, index) => (
              <motion.div key={index} className="gps-industry-card-premium" variants={fadeInUp}>
                <div className="gps-industry-icon-premium">
                  {industry.icon}
                  <div className="gps-industry-icon-bg"></div>
                </div>
                <h3>{industry.title}</h3>
                <p>{industry.desc}</p>
                <div className="gps-industry-hover-glow"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Installation Process */}
      <section className="gps-section bg-dark-2">
        <div className="gps-container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="gps-section-title">Seamless <span>Deployment</span></h2>
            <p className="gps-section-desc max-w-2xl mx-auto text-center">Get your fleet connected and monitored in four simple steps.</p>
          </motion.div>
          
          <div className="gps-process-flow">
            <div className="gps-process-connecting-line">
              <div className="gps-process-progress-animated"></div>
            </div>
            
            <motion.div 
              className="gps-process-nodes"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            >
              {[
                { step: "01", title: "Site Audit", icon: <MapPin size={28} />, desc: "Complete fleet and terminal infrastructure assessment." },
                { step: "02", title: "Installation", icon: <Wrench size={28} />, desc: "Expert on-site hardware deployment and unit testing." },
                { step: "03", title: "Activation", icon: <Signal size={28} />, desc: "Secure platform onboarding and telemetry sync." },
                { step: "04", title: "Operations", icon: <Activity size={28} />, desc: "24/7 command center monitoring and management." }
              ].map((node, i) => (
                <motion.div key={i} className="gps-process-card-modern" variants={fadeInUp}>
                  <div className="gps-p-number">{node.step}</div>
                  <div className="gps-p-icon-modern">
                    {node.icon}
                  </div>
                  <h3 className="gps-p-title-modern">{node.title}</h3>
                  <p className="gps-p-desc-modern">{node.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* 9. Enhanced CTA Section */}
      <section className="gps-section bg-dark-1 border-t border-white/5">
        <div className="gps-container">
          <motion.div 
            className="gps-cta-premium-banner"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <div className="gps-cta-particle-bg"></div>
            
            <div className="gps-cta-content relative z-10">
              <h2 className="gps-cta-heading">Transform Your Fleet Operations Today</h2>
              <p className="gps-cta-desc">
                Join enterprise fleets optimizing operations with our advanced tracking platform.
              </p>
              
              <div className="gps-cta-actions">
                <button
                  type="button"
                  className="gps-btn-glow-premium lg"
                  onClick={() => setIsEnquiryOpen(true)}
                >
                  <span className="flex items-center justify-center gap-3">
                    Send Message <ArrowRight size={24} />
                  </span>
                </button>
              </div>
              
              <div className="gps-cta-trust">
                <div className="gps-trust-item"><CheckCircle2 size={16} className="text-accent" /> Bank-Grade Security</div>
                <div className="gps-trust-item"><CheckCircle2 size={16} className="text-accent" /> 99.99% Uptime SLA</div>
                <div className="gps-trust-item"><CheckCircle2 size={16} className="text-accent" /> 24/7 Expert Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <FastagEnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        type="gps"
      />

      {/* 10. Enhanced Payment & Subscription Modal */}
      {showPaymentForm && (
        <div className="gps-modal-overlay" onClick={() => setShowPaymentForm(false)}>
          <motion.div 
            className="gps-payment-modal-premium" 
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            <button className="gps-modal-close" onClick={() => setShowPaymentForm(false)}><X size={24} /></button>
            
            {isSuccess ? (
              <div className="gps-modal-success">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}>
                  <div className="gps-success-icon-wrap">
                    <CheckCircle2 size={60} color="#59C71C" />
                    <div className="gps-success-pulse"></div>
                  </div>
                </motion.div>
                <h3>Application Submitted!</h3>
                <p>Your GPS Tracker application for <span>{selectedPlan}</span> has been received. Our team will contact you shortly for installation.</p>
                <div className="gps-secure-badge mt-6" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#263D35', fontSize: '0.85rem', justifyContent: 'center', marginTop: '24px' }}><Lock size={14} /> Application ID: TS-{Math.floor(Math.random() * 100000)}</div>
              </div>
            ) : (
              <>
                <div className="gps-modal-header">
                  <h3>GPS Tracker Application</h3>
                  <p>Apply for <span>{selectedPlan}</span> ({selectedPrice})</p>
                </div>
                
                <form className="gps-modal-form" onSubmit={(e) => {
                  if (formStep === 1) {
                    e.preventDefault();
                    setFormStep(2);
                  } else {
                    handleSubmit(e);
                  }
                }}>
                  {formStep === 1 ? (
                    <div className="gps-form-container">
                      <div className="gps-form-section-title">Personal & Vehicle Details</div>
                      <div className="gps-form-grid">
                        <div className="gps-form-group">
                          <label>Full Name <span className="mandatory">*</span></label>
                          <input type="text" placeholder="Enter your full name" required className="gps-premium-input" />
                        </div>
                        <div className="gps-form-group">
                          <label>Mobile Number <span className="mandatory">*</span></label>
                          <input type="tel" placeholder="Enter 10-digit number" required pattern="[0-9]{10}" className="gps-premium-input" />
                        </div>
                        <div className="gps-form-group">
                          <label>Email Address <span className="mandatory">*</span></label>
                          <input type="email" placeholder="Enter email address" required className="gps-premium-input" />
                        </div>
                        <div className="gps-form-group">
                          <label>Vehicle Number <span className="mandatory">*</span></label>
                          <input type="text" placeholder="e.g. MH 12 AB 1234" required className="gps-premium-input" />
                        </div>
                        <div className="gps-form-group">
                          <label>Vehicle Type</label>
                          <select className="gps-premium-input">
                            <option value="car">Car / SUV</option>
                            <option value="truck">Truck / Commercial</option>
                            <option value="bus">Bus / Coach</option>
                            <option value="bike">Two-Wheeler</option>
                          </select>
                        </div>
                        <div className="gps-form-group">
                          <label>Pincode</label>
                          <input type="text" placeholder="6-digit pincode" pattern="[0-9]{6}" className="gps-premium-input" />
                        </div>
                      </div>

                      <div className="gps-form-section-title" style={{ marginTop: '30px' }}>Documentation (Mandatory)</div>
                      <div className="gps-form-grid">
                        <div className="gps-form-group">
                          <label>RC Number <span className="mandatory">*</span></label>
                          <input type="text" placeholder="Enter RC Number" required className="gps-premium-input" />
                        </div>
                        <div className="gps-form-group">
                          <label>PAN Number <span className="mandatory">*</span></label>
                          <input type="text" placeholder="Enter PAN Number" required pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" className="gps-premium-input" />
                        </div>
                        <div className="gps-form-group">
                          <label>Aadhaar Number <span className="mandatory">*</span></label>
                          <input type="text" placeholder="12-digit Aadhaar" required pattern="[0-9]{12}" className="gps-premium-input" />
                        </div>
                        <div className="gps-form-group">
                          <label>Preferred Installation Date</label>
                          <input type="date" className="gps-premium-input" />
                        </div>
                      </div>

                      <div className="gps-form-section-title" style={{ marginTop: '30px' }}>Upload Documents</div>
                      <div className="gps-form-grid">
                        <div className="gps-form-group">
                          <label>Upload RC Document</label>
                          <div className="gps-file-upload-wrapper">
                            <input type="file" id="rc-upload" className="gps-file-input" />
                            <label htmlFor="rc-upload" className="gps-file-label"><Upload size={18} /> Choose File</label>
                          </div>
                        </div>
                        <div className="gps-form-group">
                          <label>Upload ID Proof (Aadhaar/PAN)</label>
                          <div className="gps-file-upload-wrapper">
                            <input type="file" id="id-upload" className="gps-file-input" />
                            <label htmlFor="id-upload" className="gps-file-label"><Upload size={18} /> Choose File</label>
                          </div>
                        </div>
                      </div>

                      <div className="gps-form-group" style={{ marginTop: '20px' }}>
                        <label>Installation Address</label>
                        <textarea rows={3} placeholder="Full address for installation" className="gps-premium-input"></textarea>
                      </div>

                      <div className="gps-form-group" style={{ marginTop: '20px' }}>
                        <label>Notes / Remarks</label>
                        <textarea rows={2} placeholder="Any specific requirements?" className="gps-premium-input"></textarea>
                      </div>
                      
                      <button type="submit" className="gps-btn-glow-premium lg w-full" style={{ marginTop: '40px' }}>
                        Next: Review & Payment <ArrowRight size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="gps-checkout-container">
                      <div className="gps-order-summary-card">
                        <div className="gps-order-row">
                          <span>Selected Plan</span>
                          <span>{selectedPlan}</span>
                        </div>
                        <div className="gps-order-row">
                          <span>Plan Duration</span>
                          <span>1 Year Subscription</span>
                        </div>
                        <div className="gps-order-row">
                          <span>Device Cost</span>
                          <span>Included</span>
                        </div>
                        <div className="gps-order-total">
                          <span>Final Amount</span>
                          <span>{selectedPrice}</span>
                        </div>
                      </div>

                      <div className="gps-payment-method-section" style={{ marginTop: '40px' }}>
                        <label className="gps-section-subtitle-small">Select Payment Method</label>
                        <div className="gps-payment-options">
                          <div className={`gps-payment-option ${paymentMethod === 'upi' ? 'active' : ''}`} onClick={() => setPaymentMethod('upi')}>
                            <Smartphone size={24} />
                            <span>UPI / QR</span>
                          </div>
                          <div className={`gps-payment-option ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
                            <CreditCard size={24} />
                            <span>Credit Card</span>
                          </div>
                          <div className={`gps-payment-option ${paymentMethod === 'net' ? 'active' : ''}`} onClick={() => setPaymentMethod('net')}>
                            <Landmark size={24} />
                            <span>Net Banking</span>
                          </div>
                        </div>
                      </div>

                      <div className="gps-checkout-actions" style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
                        <button type="button" className="gps-btn-glow-secondary" onClick={() => setFormStep(1)} style={{ flex: '1' }}>
                          Back
                        </button>
                        <button type="submit" disabled={isProcessing} className="gps-btn-glow-premium" style={{ flex: '2' }}>
                          {isProcessing ? (
                            <span className="flex items-center justify-center gap-3">
                              <Loader2 className="animate-spin" size={20} /> Processing...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-3">
                              Pay & Apply Now <ShieldCheck size={20} />
                            </span>
                          )}
                        </button>
                      </div>

                      <div className="gps-secure-checkout-footer" style={{ marginTop: '30px' }}>
                        <div className="flex items-center gap-2 text-xs opacity-60">
                          <Lock size={12} /> SSL Secured • PCI Compliant • Encrypted
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
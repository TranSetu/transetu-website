"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  KeyRound, 
  ArrowLeft,
  Navigation,
  MapPin,
  ShoppingBag,
  CreditCard,
  CheckCircle2,
  Lock,
  Timer,
  RefreshCw
} from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length === 10) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setStep(2);
        setTimer(30);
      }, 1500);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next field
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = () => {
    if (timer === 0) {
      setIsResending(true);
      setTimer(30);
      // Simulate resend
      setTimeout(() => setIsResending(false), 1000);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length === 6) {
      setIsLoading(true);
      // Simulate verification
      setTimeout(() => {
        setIsLoading(false);
        alert("Authentication Successful!");
        window.location.href = "/";
      }, 2000);
    }
  };

  return (
    <div className="signup-page">
      <style jsx>{`
        .signup-page {
          display: flex;
          min-height: 100vh;
          background-color: #0B172A;
          font-family: 'Inter', sans-serif;
          color: white;
          overflow: hidden;
        }

        .left-panel {
          flex: 1.2;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px;
          overflow: hidden;
        }

        .bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(11, 23, 42, 0.95) 0%, rgba(11, 23, 42, 0.4) 100%);
          z-index: 2;
        }

        .left-content {
          position: relative;
          z-index: 3;
          max-width: 600px;
        }

        .left-content h1 {
          font-size: 56px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          background: linear-gradient(to bottom right, #FFFFFF, #DCE8E1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .left-content p {
          font-size: 18px;
          color: #DCE8E1;
          line-height: 1.6;
          margin-bottom: 48px;
        }

        .trust-badges {
          display: flex;
          gap: 24px;
          margin-bottom: 60px;
        }

        .badge {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.05);
          padding: 10px 18px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          font-size: 14px;
          font-weight: 500;
          color: #DCE8E1;
        }

        .badge svg {
          color: #59C71C;
        }

        .right-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
          z-index: 10;
          background: radial-gradient(circle at center, rgba(89, 199, 28, 0.15), transparent 70%);
        }

        .auth-card {
          width: 100%;
          max-width: 480px;
          background: rgba(11, 23, 42, 0.88);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          padding: 48px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
        }

        .auth-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(89, 199, 28, 0.1), transparent 50%);
          pointer-events: none;
        }

        .form-header {
          margin-bottom: 32px;
        }

        .form-header h2 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .form-header p {
          color: #DCE8E1;
          font-size: 15px;
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #DCE8E1;
          margin-bottom: 10px;
        }

        .phone-input-wrapper {
          display: flex;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          padding: 4px;
          transition: all 0.3s ease;
        }

        .phone-input-wrapper:focus-within {
          border-color: #59C71C;
          box-shadow: 0 0 0 4px rgba(89, 199, 28, 0.15);
        }

        .country-code {
          padding: 12px 16px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          font-weight: 600;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .phone-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 12px 16px;
          color: white;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.05em;
          outline: none;
        }

        .btn-submit {
          width: 100%;
          background: #05A223;
          color: white;
          border: none;
          padding: 16px;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 10px 20px -5px rgba(5, 162, 35, 0.5);
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          background: #087A3E;
          box-shadow: 0 8px 20px -5px rgba(5, 162, 35, 0.35);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .otp-container {
          display: flex;
          gap: 12px;
          justify-content: space-between;
          margin-bottom: 32px;
        }

        .otp-input {
          width: 50px;
          height: 60px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          text-align: center;
          font-size: 24px;
          font-weight: 700;
          color: white;
          outline: none;
          transition: all 0.3s ease;
        }

        .otp-input:focus {
          border-color: #59C71C;
          background: rgba(89, 199, 28, 0.05);
          box-shadow: 0 0 0 4px rgba(89, 199, 28, 0.15);
        }

        .otp-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          font-size: 14px;
        }

        .resend-timer {
          color: #DCE8E1;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-resend {
          background: transparent;
          border: none;
          color: #59C71C;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .btn-resend:disabled {
          color: #263D35;
          cursor: not-allowed;
        }

        .btn-change-num {
          background: transparent;
          border: none;
          color: #DCE8E1;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 20px;
          width: 100%;
          justify-content: center;
        }

        .btn-change-num:hover {
          color: white;
        }

        .bottom-section {
          margin-top: 48px;
          text-align: center;
        }

        .security-text {
          font-size: 12px;
          color: #263D35;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 24px;
        }

        .features-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          text-align: left;
        }

        .feature-item {
          font-size: 13px;
          color: #DCE8E1;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .feature-item svg {
          color: #59C71C;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .left-panel {
            display: none;
          }
          .right-panel {
            flex: 1;
            background: #0B172A;
          }
        }

        /* Premium Back Button - Global Scoping to ensure visibility */
        :global(.back-home-wrapper) {
          position: fixed;
          top: 48px;
          left: 48px;
          z-index: 1000;
        }

        :global(.back-home-btn) {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(89, 199, 28, 0.4);
          border-radius: 12px;
          color: #DCE8E1;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        :global(.back-home-btn:hover) {
          color: #FFFFFF;
          background: rgba(15, 23, 42, 0.8);
          border-color: #05A223;
          transform: translateX(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }

        :global(.back-home-btn svg) {
          transition: transform 0.3s ease;
          color: #05A223;
        }

        :global(.back-home-btn:hover svg) {
          transform: scale(1.1);
          color: #FFFFFF;
        }

        :global(.back-home-btn:active) {
          transform: translateX(-2px) scale(0.98);
        }

        @media (max-width: 768px) {
          :global(.back-home-wrapper) {
            top: 24px;
            left: 24px;
          }
          :global(.back-home-btn) {
            padding: 10px 18px;
            font-size: 14px;
            gap: 10px;
          }
        }
      `}</style>

      <motion.div
        className="back-home-wrapper"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Link href="/" className="back-home-btn">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
      </motion.div>

      {/* Left Panel - Cinematic Visuals */}
      <div className="left-panel">
        <img 
          src="/assets/signup-bg.png" 
          alt="Transetu Highway" 
          className="bg-image"
        />
        <div className="overlay"></div>
        
        <motion.div 
          className="left-content"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <Link href="/">
              <img src="/assets/logo.png" alt="Transetu" className="h-12 w-auto brightness-125" />
            </Link>
          </div>
          
          <h1>Smart Highway Services Start Here</h1>
          <p>
            Access FASTag services, GPS tracking, FASTag products, and secure account management with Transetu.
          </p>

          <div className="trust-badges">
            <div className="badge">
              <ShieldCheck size={18} />
              <span>Secure Login</span>
            </div>
            <div className="badge">
              <Zap size={18} />
              <span>Instant Access</span>
            </div>
            <div className="badge">
              <KeyRound size={18} />
              <span>OTP Verification</span>
            </div>
          </div>

          <div className="features-list">
            <div className="feature-item"><CheckCircle2 size={14} /> FASTag Recharge Access</div>
            <div className="feature-item"><CheckCircle2 size={14} /> GPS Dashboard Access</div>
            <div className="feature-item"><CheckCircle2 size={14} /> Order Tracking</div>
            <div className="feature-item"><CheckCircle2 size={14} /> Secure Payments</div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Auth Card */}
      <div className="right-panel">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="step1"
              className="auth-card"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <div className="form-header">
                <h2>Welcome Back</h2>
                <p>Enter your mobile number to continue</p>
              </div>

              <form onSubmit={handleSendOtp}>
                <div className="input-group">
                  <label className="input-label">Mobile Number</label>
                  <div className="phone-input-wrapper">
                    <div className="country-code">
                      <span className="text-xl">🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input 
                      type="tel" 
                      className="phone-input"
                      placeholder="99999 99999"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                      autoFocus
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={mobileNumber.length !== 10 || isLoading}
                >
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                      <span>Send OTP</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              <div className="bottom-section">
                <div className="security-text">
                  <Lock size={12} />
                  <span>Your mobile number is securely encrypted and never shared.</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="step2"
              className="auth-card"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <div className="form-header">
                <h2>Verify OTP</h2>
                <p>We've sent a 6-digit code to <b>+91 {mobileNumber}</b></p>
              </div>

              <form onSubmit={handleVerify}>
                <div className="otp-container">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { otpInputs.current[index] = el; }}
                      type="text"
                      maxLength={1}
                      className="otp-input"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                  ))}
                </div>

                <div className="otp-footer">
                  <div className="resend-timer">
                    <Timer size={14} />
                    {timer > 0 ? (
                      <span>Resend in 0:{timer < 10 ? `0${timer}` : timer}s</span>
                    ) : (
                      <span>Ready to resend</span>
                    )}
                  </div>
                  <button 
                    type="button" 
                    className="btn-resend"
                    onClick={handleResendOtp}
                    disabled={timer > 0 || isResending}
                  >
                    {isResending ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      "Resend OTP"
                    )}
                  </button>
                </div>

                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={otp.join("").length !== 6 || isLoading}
                >
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                      <span>Verify & Continue</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              <button 
                className="btn-change-num"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={14} />
                <span>Change mobile number</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

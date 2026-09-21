"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building,
  Check,
  CheckCircle2,
  Circle,
  Clock,
  CreditCard,
  Eye,
  EyeOff,
  FileCheck,
  FileText,
  IdCard,
  Landmark,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Pencil,
  Phone,
  RefreshCw,
  ShieldCheck,
  Upload,
  User,
  UserCheck,
  X,
} from "lucide-react";
import Image from "next/image";
import "./OnboardingModal.css";

export interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

export interface OnboardingFormData {
  // Step 1: Mobile & Auth
  mobileNumber: string;

  // Step 2: Profile Details
  profilePicture: File | null;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  notes: string;

  // Step 3: Aadhaar Details
  aadhaarNumber: string;
  aadhaarFront: File | null;
  aadhaarBack: File | null;

  // Step 4: PAN Details
  panNumber: string;
  panFront: File | null;
  panBack: File | null;

  // Step 5: Bank Details
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  bankPassbook: File | null;
}

const initialFormData: OnboardingFormData = {
  mobileNumber: "",
  profilePicture: null,
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  notes: "",
  aadhaarNumber: "",
  aadhaarFront: null,
  aadhaarBack: null,
  panNumber: "",
  panFront: null,
  panBack: null,
  bankName: "",
  accountHolderName: "",
  accountNumber: "",
  ifscCode: "",
  branchName: "",
  bankPassbook: null,
};

type ImagePreviewKeys =
  | "profilePicture"
  | "aadhaarFront"
  | "aadhaarBack"
  | "panFront"
  | "panBack"
  | "bankPassbook";

const initialPreviews: Record<ImagePreviewKeys, string | null> = {
  profilePicture: null,
  aadhaarFront: null,
  aadhaarBack: null,
  panFront: null,
  panBack: null,
  bankPassbook: null,
};

// Formats Aadhaar with space separation (e.g. 1234 5678 9012)
function formatAadhaarInput(val: string) {
  const digits = val.replace(/\D/g, "").slice(0, 12);
  const parts = [];
  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }
  return parts.join(" ");
}

// Mask Aadhaar (e.g. XXXXXXXX1234)
function maskAadhaarNumber(val: string) {
  const clean = val.replace(/\s+/g, "");
  if (clean.length <= 4) return clean;
  const lastFour = clean.slice(-4);
  return `•••• •••• ${lastFour}`;
}

// Format Account Number masked (e.g. •••••••• 1234)
function maskAccountNumber(num: string) {
  const clean = num.replace(/\s+/g, "");
  if (clean.length <= 4) return clean;
  const lastFour = clean.slice(-4);
  return `•••• •••• ${lastFour}`;
}

export default function OnboardingModal({
  isOpen,
  onClose,
  onSubmitSuccess,
}: OnboardingModalProps) {
  // Step range 1 to 7
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);
  const [previews, setPreviews] = useState(initialPreviews);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sensitive review toggles
  const [showFullAadhaar, setShowFullAadhaar] = useState(false);
  const [showFullAccount, setShowFullAccount] = useState(false);

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 1 OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [resendNotice, setResendNotice] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset all state on close
  const handleClose = useCallback(() => {
    if (isSubmitting) return;
    setStep(1);
    setFormData(initialFormData);
    setPreviews(initialPreviews);
    setTouched({});
    setIsSubmitting(false);
    setOtpSent(false);
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpError("");
    setIsResendingOtp(false);
    setResendNotice(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowFullAadhaar(false);
    setShowFullAccount(false);
    onClose();
  }, [isSubmitting, onClose]);

  // Lock body scroll and handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isSubmitting, handleClose]);

  // =========================================================================
  // Validation Rules
  // =========================================================================

  // Step 1: Mobile Validation
  const cleanMobile = formData.mobileNumber.replace(/\D/g, "");
  const isMobileValid = /^[6-9]\d{9}$/.test(cleanMobile);

  // Step 2: Profile Details Validation
  const isFullNameValid = formData.fullName.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const isNotesValid = formData.notes.trim().length > 0;

  // Password individual criteria
  const passwordVal = formData.password;
  const passLength = passwordVal.length >= 8 && passwordVal.length <= 20;
  const passUpper = /[A-Z]/.test(passwordVal);
  const passLower = /[a-z]/.test(passwordVal);
  const passNum = /[0-9]/.test(passwordVal);
  const passSpecial = /[!@#$%^&*]/.test(passwordVal);
  const passNoSpaceEmoji =
    passwordVal.length > 0 &&
    !/\s/.test(passwordVal) &&
    !/(\p{Extended_Pictographic}|\p{Emoji_Presentation})/u.test(passwordVal);

  const isPasswordValid =
    passLength &&
    passUpper &&
    passLower &&
    passNum &&
    passSpecial &&
    passNoSpaceEmoji;

  const isConfirmPasswordValid =
    formData.confirmPassword.length > 0 &&
    formData.confirmPassword === formData.password;

  const isStep2Complete =
    isFullNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isNotesValid;

  // Step 3: Aadhaar Validation
  const cleanAadhaar = formData.aadhaarNumber.replace(/\s+/g, "");
  const isAadhaarValid = /^\d{12}$/.test(cleanAadhaar);
  const isStep3Complete =
    isAadhaarValid &&
    formData.aadhaarFront !== null &&
    formData.aadhaarBack !== null;

  // Step 4: PAN Validation
  const isPanValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber);
  const isStep4Complete =
    isPanValid &&
    formData.panFront !== null &&
    formData.panBack !== null;

  // Step 5: Bank Details Validation
  const isBankNameValid = formData.bankName.trim().length >= 2;
  const isAccountHolderValid = formData.accountHolderName.trim().length >= 2;
  const cleanAccount = formData.accountNumber.replace(/\s+/g, "");
  const isAccountValid = /^\d{9,18}$/.test(cleanAccount);
  const isIfscValid = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode);
  const isBranchValid = formData.branchName.trim().length >= 2;
  const isStep5Complete =
    isBankNameValid &&
    isAccountHolderValid &&
    isAccountValid &&
    isIfscValid &&
    isBranchValid &&
    formData.bankPassbook !== null;

  // =========================================================================
  // Handlers
  // =========================================================================

  // Send OTP
  const handleSendOtp = () => {
    if (!isMobileValid) {
      setTouched((prev) => ({ ...prev, mobileNumber: true }));
      return;
    }
    setIsSendingOtp(true);
    setOtpError("");
    setResendNotice(false);

    // Simulated network latency for mock OTP dispatch
    setTimeout(() => {
      setIsSendingOtp(false);
      setOtpSent(true);
      setOtpDigits(["", "", "", "", "", ""]);
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }, 600);
  };

  // Resend OTP - only sends another OTP when the user clicks this option
  const handleResendOtp = () => {
    setIsResendingOtp(true);
    setOtpError("");
    setTimeout(() => {
      setIsResendingOtp(false);
      setOtpDigits(["", "", "", "", "", ""]);
      setResendNotice(true);
      setTimeout(() => setResendNotice(false), 3000);
      otpInputRefs.current[0]?.focus();
    }, 400);
  };

  // OTP Digit Change
  const handleOtpDigitChange = (index: number, val: string) => {
    const numericChar = val.replace(/\D/g, "");
    if (!numericChar && val !== "") return;

    const newDigits = [...otpDigits];

    if (val.length > 1) {
      // Handle paste
      const pasted = val.replace(/\D/g, "").slice(0, 6);
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasted[i] || "";
      }
      setOtpDigits(newDigits);
      setOtpError("");
      const focusIndex = Math.min(pasted.length, 5);
      otpInputRefs.current[focusIndex]?.focus();
      return;
    }

    newDigits[index] = numericChar;
    setOtpDigits(newDigits);
    setOtpError("");

    // Auto-focus next input
    if (numericChar && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!otpDigits[index] && index > 0) {
        const newDigits = [...otpDigits];
        newDigits[index - 1] = "";
        setOtpDigits(newDigits);
        otpInputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    const enteredOtp = otpDigits.join("");
    if (enteredOtp.length !== 6) {
      setOtpError("Please enter all 6 digits of the OTP.");
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError("");

    setTimeout(() => {
      setIsVerifyingOtp(false);
      // Mock OTP validation
      if (enteredOtp === "123456") {
        setStep(2);
      } else {
        setOtpError("Invalid OTP. Please enter the valid verification code.");
      }
    }, 500);
  };

  // File Upload Handler
  const handleFileUpload = (
    field: keyof OnboardingFormData,
    previewKey: ImagePreviewKeys,
    file: File | null
  ) => {
    if (!file) {
      setFormData((prev) => ({ ...prev, [field]: null }));
      setPreviews((prev) => ({ ...prev, [previewKey]: null }));
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: file }));

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({
          ...prev,
          [previewKey]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviews((prev) => ({ ...prev, [previewKey]: null }));
    }
  };

  // Submit Handler -> Step 7 Waiting Screen
  const handleSubmit = async () => {
    if (!isStep2Complete || !isStep3Complete || !isStep4Complete || !isStep5Complete) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(7);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    }, 1000);
  };

  if (!isOpen) return null;

  // Stepper list for Steps 1 through 6
  const stepsList = [
    { num: 1, label: "Mobile" },
    { num: 2, label: "Profile" },
    { num: 3, label: "Aadhaar" },
    { num: 4, label: "PAN" },
    { num: 5, label: "Bank Details" },
    { num: 6, label: "Review" },
  ];

  return (
    <div
      className="onboarding-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          handleClose();
        }
      }}
    >
      <motion.div
        ref={dialogRef}
        className="onboarding-dialog"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {/* Modal Header */}
        <div className="onboarding-header">
          <div className="onboarding-header-image">
            <Image
              src="/assets/Fastag_image.png"
              alt="TranSetu FASTag"
              fill
              sizes="100vw"
              className="onboarding-header-image-content"
              priority
            />
            <div className="onboarding-header-image-fade" />
          </div>
          <div className="onboarding-header-left">
            <div className="onboarding-header-icon">
              <UserCheck size={26} />
            </div>
            <div>
              <h2 id="onboarding-dialog-title" className="onboarding-header-title">
                Onboarding & KYC Verification
              </h2>
              <p className="onboarding-header-subtitle">
                Complete your identity and bank verification in simple guided steps
              </p>
            </div>
          </div>
          <button
            type="button"
            className="onboarding-close-btn"
            onClick={handleClose}
            aria-label="Close onboarding modal"
            disabled={isSubmitting}
          >
            <X size={18} />
          </button>
        </div>

        {/* Desktop Progress Stepper (Only visible on Steps 1 to 6) */}
        {step < 7 && (
          <div className="onboarding-progress-bar" aria-label="Onboarding Progress">
            {stepsList.map((s, idx) => {
              const isActive = step === s.num;
              const isCompleted = step > s.num;
              return (
                <div
                  key={s.num}
                  className={`onboarding-step-item ${
                    isActive ? "active" : isCompleted ? "completed" : ""
                  }`}
                >
                  <button
                    type="button"
                    className={`onboarding-step-pill ${
                      isCompleted ? "clickable" : ""
                    }`}
                    onClick={() => {
                      if (isCompleted) {
                        setStep(s.num as 1 | 2 | 3 | 4 | 5 | 6);
                      }
                    }}
                    disabled={!isCompleted}
                    aria-label={`Go to step ${s.num}: ${s.label}`}
                  >
                    <span className="onboarding-step-number">
                      {isCompleted ? <Check size={14} strokeWidth={2.5} /> : s.num}
                    </span>
                    <span className="onboarding-step-label">{s.label}</span>
                  </button>
                  {idx < stepsList.length - 1 && (
                    <div
                      className={`onboarding-step-divider ${
                        step > s.num ? "completed" : ""
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile Progress Bar (Compact summary for small screens) */}
        {step < 7 && (
          <div className="onboarding-mobile-progress">
            <span>
              Step {step} of 6:{" "}
              <strong>
                {step === 1
                  ? "Mobile Verification"
                  : step === 2
                  ? "Profile Details"
                  : step === 3
                  ? "Aadhaar Details"
                  : step === 4
                  ? "PAN Details"
                  : step === 5
                  ? "Bank Details"
                  : "Review & Submit"}
              </strong>
            </span>
            <span className="onboarding-mobile-step-badge">
              {Math.round((step / 6) * 100)}%
            </span>
          </div>
        )}

        {/* Step Content Area */}
        <div className="onboarding-content">
          <AnimatePresence mode="wait">
            {/* ==========================================================
                STEP 1: MOBILE NUMBER + OTP VERIFICATION
                ========================================================== */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.2 }}
              >
                <div className="onboarding-step-header">
                  <div className="onboarding-step-title">
                    <Phone size={18} className="text-[#05A223]" />
                    <span>Step 1: Mobile Number & OTP Verification</span>
                  </div>
                  <p className="onboarding-step-desc">
                    Verify your active Indian mobile number to start onboarding.
                  </p>
                </div>

                <div className="onboarding-otp-container">
                  {!otpSent ? (
                    // Screen 1A: Enter Mobile Number
                    <div className="onboarding-form-grid single-col">
                      <div className="onboarding-field">
                        <label htmlFor="onb-mobile" className="onboarding-label">
                          Mobile Number <span className="onboarding-required">*</span>
                        </label>
                        <div className="onboarding-input-wrap">
                          <Phone size={17} className="onboarding-input-icon" />
                          <input
                            id="onb-mobile"
                            type="tel"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="10-digit mobile number"
                            value={formData.mobileNumber}
                            onChange={(e) => {
                              const val = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10);
                              setFormData({ ...formData, mobileNumber: val });
                            }}
                            onBlur={() =>
                              setTouched((prev) => ({ ...prev, mobileNumber: true }))
                            }
                            className={`onboarding-input ${
                              touched.mobileNumber && !isMobileValid
                                ? "has-error"
                                : ""
                            }`}
                            aria-invalid={touched.mobileNumber && !isMobileValid}
                          />
                        </div>
                        {touched.mobileNumber && !isMobileValid ? (
                          <span className="onboarding-error-msg">
                            <AlertCircle size={13} />
                            Please enter a valid 10-digit Indian mobile number
                          </span>
                        ) : (
                          <span className="onboarding-hint">
                            Must be a valid 10-digit number starting with 6-9
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        className="onboarding-btn-primary"
                        onClick={handleSendOtp}
                        disabled={!isMobileValid || isSendingOtp}
                        style={{ marginTop: "10px", width: "100%", justifyContent: "center" }}
                      >
                        {isSendingOtp ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Sending OTP...</span>
                          </>
                        ) : (
                          <>
                            <span>Send OTP</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    // Screen 1B: Enter 6-digit OTP
                    <div className="onboarding-form-grid single-col">
                      <div className="onboarding-otp-sent-banner">
                        <span>
                          OTP sent to <strong>+91 {formData.mobileNumber}</strong>
                        </span>
                        <button
                          type="button"
                          className="onboarding-otp-change-num"
                          onClick={() => {
                            setOtpSent(false);
                            setOtpDigits(["", "", "", "", "", ""]);
                            setOtpError("");
                          }}
                        >
                          Change
                        </button>
                      </div>

                      <div className="onboarding-field">
                        <label className="onboarding-label" style={{ justifyContent: "center" }}>
                          Enter OTP <span className="onboarding-required">*</span>
                        </label>

                        <div className="onboarding-otp-boxes">
                          {otpDigits.map((digit, idx) => (
                            <input
                              key={idx}
                              ref={(el) => {
                                otpInputRefs.current[idx] = el;
                              }}
                              type="text"
                              inputMode="numeric"
                              maxLength={idx === 0 ? 6 : 1}
                              value={digit}
                              onChange={(e) =>
                                handleOtpDigitChange(idx, e.target.value)
                              }
                              onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                              className={`onboarding-otp-digit ${
                                otpError ? "has-error" : ""
                              }`}
                              aria-label={`OTP Digit ${idx + 1}`}
                            />
                          ))}
                        </div>

                        {otpError && (
                          <span
                            className="onboarding-error-msg"
                            style={{ justifyContent: "center", marginTop: "6px" }}
                          >
                            <AlertCircle size={13} />
                            {otpError}
                          </span>
                        )}
                      </div>

                      <div className="onboarding-otp-actions-row">
                        <button
                          type="button"
                          className="onboarding-resend-btn"
                          onClick={handleResendOtp}
                          disabled={isResendingOtp}
                        >
                          <RefreshCw
                            size={13}
                            className={isResendingOtp ? "animate-spin" : ""}
                          />
                          <span>{isResendingOtp ? "Sending new OTP..." : "Resend code"}</span>
                        </button>

                        <button
                          type="button"
                          className="onboarding-otp-change-num"
                          onClick={() => {
                            setOtpSent(false);
                            setOtpDigits(["", "", "", "", "", ""]);
                            setOtpError("");
                            setResendNotice(false);
                          }}
                        >
                          Use another number
                        </button>
                      </div>

                      {resendNotice && (
                        <div className="onboarding-resend-notice">
                          <CheckCircle2 size={14} className="text-[#05A223]" />
                          <span>A new verification code has been sent!</span>
                        </div>
                      )}

                      <button
                        type="button"
                        className="onboarding-btn-primary"
                        onClick={handleVerifyOtp}
                        disabled={
                          otpDigits.join("").length !== 6 || isVerifyingOtp
                        }
                        style={{ marginTop: "12px", width: "100%", justifyContent: "center" }}
                      >
                        {isVerifyingOtp ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Verifying...</span>
                          </>
                        ) : (
                          <>
                            <span>Verify OTP</span>
                            <Check size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  <div className="onboarding-trust-banner">
                    <ShieldCheck size={18} className="onboarding-trust-icon" />
                    <span>
                      Your phone number is kept confidential and used solely for secure
                      account authentication and onboarding updates.
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==========================================================
                STEP 2: PROFILE DETAILS
                ========================================================== */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.2 }}
              >
                <div className="onboarding-step-header">
                  <div className="onboarding-step-title">
                    <User size={18} className="text-[#05A223]" />
                    <span>Step 2: Profile Details</span>
                  </div>
                  <p className="onboarding-step-desc">
                    Setup your profile picture, personal details, and account credentials.
                  </p>
                </div>

                <div className="onboarding-form-grid">
                  {/* Profile Picture Upload Card */}
                  <div className="onboarding-avatar-card">
                    <div className="onboarding-avatar-preview">
                      {previews.profilePicture ? (
                        <Image
                          src={previews.profilePicture}
                          alt="Profile preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <User size={36} />
                      )}
                    </div>

                    <div className="onboarding-avatar-info">
                      <span className="onboarding-avatar-title">
                        Profile Picture
                      </span>
                      <span className="onboarding-avatar-subtext">
                        Upload a clear face photo (JPG, PNG, WebP)
                      </span>
                      <div className="onboarding-avatar-btns">
                        <input
                          id="onb-profile-pic"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            handleFileUpload(
                              "profilePicture",
                              "profilePicture",
                              file
                            );
                          }}
                        />
                        <label
                          htmlFor="onb-profile-pic"
                          className="onboarding-avatar-upload-label"
                        >
                          <Upload size={12} />
                          <span>
                            {formData.profilePicture ? "Change Photo" : "Upload Photo"}
                          </span>
                        </label>
                        {formData.profilePicture && (
                          <button
                            type="button"
                            className="onboarding-avatar-remove-btn"
                            onClick={() =>
                              handleFileUpload("profilePicture", "profilePicture", null)
                            }
                          >
                            <X size={12} />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="onboarding-field">
                    <label htmlFor="onb-fullname" className="onboarding-label">
                      Full Name <span className="onboarding-required">*</span>
                    </label>
                    <div className="onboarding-input-wrap">
                      <User size={17} className="onboarding-input-icon" />
                      <input
                        id="onb-fullname"
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        onBlur={() =>
                          setTouched((prev) => ({ ...prev, fullName: true }))
                        }
                        className={`onboarding-input ${
                          touched.fullName && !isFullNameValid ? "has-error" : ""
                        }`}
                        aria-invalid={touched.fullName && !isFullNameValid}
                      />
                    </div>
                    {touched.fullName && !isFullNameValid ? (
                      <span className="onboarding-error-msg">
                        <AlertCircle size={13} />
                        Please enter your full name
                      </span>
                    ) : (
                      <span className="onboarding-hint">
                        Name as per official government documents
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="onboarding-field">
                    <label htmlFor="onb-email" className="onboarding-label">
                      Email Address <span className="onboarding-required">*</span>
                    </label>
                    <div className="onboarding-input-wrap">
                      <Mail size={17} className="onboarding-input-icon" />
                      <input
                        id="onb-email"
                        type="email"
                        placeholder="e.g. rahul.sharma@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        onBlur={() =>
                          setTouched((prev) => ({ ...prev, email: true }))
                        }
                        className={`onboarding-input ${
                          touched.email && !isEmailValid ? "has-error" : ""
                        }`}
                        aria-invalid={touched.email && !isEmailValid}
                      />
                    </div>
                    {touched.email && !isEmailValid ? (
                      <span className="onboarding-error-msg">
                        <AlertCircle size={13} />
                        Please enter a valid email address
                      </span>
                    ) : (
                      <span className="onboarding-hint">
                        We will send onboarding status updates here
                      </span>
                    )}
                  </div>

                  {/* Password */}
                  <div className="onboarding-field">
                    <label htmlFor="onb-password" className="onboarding-label">
                      Password <span className="onboarding-required">*</span>
                    </label>
                    <div className="onboarding-input-wrap">
                      <Lock size={17} className="onboarding-input-icon" />
                      <input
                        id="onb-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create strong password"
                        value={formData.password}
                        onChange={(e) => {
                          // Disallow spaces
                          const val = e.target.value.replace(/\s/g, "");
                          setFormData({ ...formData, password: val });
                        }}
                        onBlur={() =>
                          setTouched((prev) => ({ ...prev, password: true }))
                        }
                        className={`onboarding-input has-toggle ${
                          touched.password && !isPasswordValid ? "has-error" : ""
                        }`}
                        aria-invalid={touched.password && !isPasswordValid}
                      />
                      <button
                        type="button"
                        className="onboarding-input-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="onboarding-field">
                    <label htmlFor="onb-confirm-password" className="onboarding-label">
                      Confirm Password <span className="onboarding-required">*</span>
                    </label>
                    <div className="onboarding-input-wrap">
                      <Lock size={17} className="onboarding-input-icon" />
                      <input
                        id="onb-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter password"
                        value={formData.confirmPassword}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\s/g, "");
                          setFormData({ ...formData, confirmPassword: val });
                        }}
                        onBlur={() =>
                          setTouched((prev) => ({
                            ...prev,
                            confirmPassword: true,
                          }))
                        }
                        className={`onboarding-input has-toggle ${
                          touched.confirmPassword && !isConfirmPasswordValid
                            ? "has-error"
                            : ""
                        }`}
                        aria-invalid={
                          touched.confirmPassword && !isConfirmPasswordValid
                        }
                      />
                      <button
                        type="button"
                        className="onboarding-input-toggle"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    {touched.confirmPassword && !isConfirmPasswordValid && (
                      <span className="onboarding-error-msg">
                        <AlertCircle size={13} />
                        Passwords do not match
                      </span>
                    )}
                  </div>

                  {/* Visual Password Requirements Checklist */}
                  <div className="onboarding-password-rules">
                    <p className="onboarding-password-rules-title">
                      Password Requirements
                    </p>
                    <div className="onboarding-rules-grid">
                      <div
                        className={`onboarding-rule-item ${
                          passLength ? "fulfilled" : ""
                        }`}
                      >
                        <span className="onboarding-rule-icon">
                          {passLength ? (
                            <Check size={14} strokeWidth={3} />
                          ) : (
                            <Circle size={11} />
                          )}
                        </span>
                        <span>8 to 20 characters</span>
                      </div>

                      <div
                        className={`onboarding-rule-item ${
                          passUpper ? "fulfilled" : ""
                        }`}
                      >
                        <span className="onboarding-rule-icon">
                          {passUpper ? (
                            <Check size={14} strokeWidth={3} />
                          ) : (
                            <Circle size={11} />
                          )}
                        </span>
                        <span>One capital letter (A-Z)</span>
                      </div>

                      <div
                        className={`onboarding-rule-item ${
                          passLower ? "fulfilled" : ""
                        }`}
                      >
                        <span className="onboarding-rule-icon">
                          {passLower ? (
                            <Check size={14} strokeWidth={3} />
                          ) : (
                            <Circle size={11} />
                          )}
                        </span>
                        <span>One small letter (a-z)</span>
                      </div>

                      <div
                        className={`onboarding-rule-item ${
                          passNum ? "fulfilled" : ""
                        }`}
                      >
                        <span className="onboarding-rule-icon">
                          {passNum ? (
                            <Check size={14} strokeWidth={3} />
                          ) : (
                            <Circle size={11} />
                          )}
                        </span>
                        <span>One number (0-9)</span>
                      </div>

                      <div
                        className={`onboarding-rule-item ${
                          passSpecial ? "fulfilled" : ""
                        }`}
                      >
                        <span className="onboarding-rule-icon">
                          {passSpecial ? (
                            <Check size={14} strokeWidth={3} />
                          ) : (
                            <Circle size={11} />
                          )}
                        </span>
                        <span>One of these signs: ! @ # $ % ^ & *</span>
                      </div>

                      <div
                        className={`onboarding-rule-item ${
                          passNoSpaceEmoji ? "fulfilled" : ""
                        }`}
                      >
                        <span className="onboarding-rule-icon">
                          {passNoSpaceEmoji ? (
                            <Check size={14} strokeWidth={3} />
                          ) : (
                            <Circle size={11} />
                          )}
                        </span>
                        <span>No spaces and no emojis</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes Field (Matching Reference Image) */}
                  <div className="onboarding-field full-span">
                    <label htmlFor="onb-notes" className="onboarding-label">
                      Notes<span className="onboarding-required">*</span>
                    </label>
                    <div className="onboarding-notes-wrap">
                      <textarea
                        id="onb-notes"
                        rows={2}
                        placeholder="What are you apply for? Tell us about yourself"
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        onBlur={() =>
                          setTouched((prev) => ({ ...prev, notes: true }))
                        }
                        className={`onboarding-notes-input ${
                          touched.notes && !isNotesValid ? "has-error" : ""
                        }`}
                        aria-invalid={touched.notes && !isNotesValid}
                      />
                      {formData.notes && (
                        <button
                          type="button"
                          className="onboarding-notes-clear-btn"
                          onClick={() =>
                            setFormData({ ...formData, notes: "" })
                          }
                          aria-label="Clear notes"
                        >
                          <X size={18} strokeWidth={2.5} />
                        </button>
                      )}
                    </div>
                    {touched.notes && !isNotesValid && (
                      <span className="onboarding-error-msg">
                        <AlertCircle size={13} />
                        Please enter notes
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==========================================================
                STEP 3: AADHAAR DETAILS (PRESERVED DESIGN)
                ========================================================== */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.2 }}
              >
                <div className="onboarding-step-header">
                  <div className="onboarding-step-title">
                    <CreditCard size={18} className="text-[#05A223]" />
                    <span>Step 3: Aadhaar Card Verification</span>
                  </div>
                  <p className="onboarding-step-desc">
                    Enter your 12-digit Aadhaar card number and upload document copies.
                  </p>
                </div>

                <div className="onboarding-form-grid single-col">
                  {/* Aadhaar Number */}
                  <div className="onboarding-field">
                    <label htmlFor="onb-aadhaar" className="onboarding-label">
                      Aadhaar Number <span className="onboarding-required">*</span>
                    </label>
                    <div className="onboarding-input-wrap">
                      <CreditCard size={17} className="onboarding-input-icon" />
                      <input
                        id="onb-aadhaar"
                        type="text"
                        inputMode="numeric"
                        maxLength={14}
                        placeholder="1234 5678 9012"
                        value={formData.aadhaarNumber}
                        onChange={(e) => {
                          const formatted = formatAadhaarInput(e.target.value);
                          setFormData({ ...formData, aadhaarNumber: formatted });
                        }}
                        onBlur={() =>
                          setTouched((prev) => ({ ...prev, aadhaarNumber: true }))
                        }
                        className={`onboarding-input ${
                          touched.aadhaarNumber && !isAadhaarValid
                            ? "has-error"
                            : ""
                        }`}
                        aria-invalid={touched.aadhaarNumber && !isAadhaarValid}
                      />
                    </div>
                    {touched.aadhaarNumber && !isAadhaarValid ? (
                      <span className="onboarding-error-msg">
                        <AlertCircle size={13} />
                        Please enter a valid 12-digit Aadhaar number
                      </span>
                    ) : (
                      <span className="onboarding-hint">
                        12 numeric digits (e.g. 1234 5678 9012)
                      </span>
                    )}
                  </div>
                </div>

                {/* Aadhaar Uploads */}
                <div className="onboarding-uploads-title">
                  <FileText size={16} className="text-[#05A223]" />
                  <span>
                    Upload Aadhaar Documents{" "}
                    <span className="onboarding-required">*</span>
                  </span>
                </div>

                <div className="onboarding-uploads-grid">
                  <DocumentUploadCard
                    id="upload-aadhaar-front"
                    title="Aadhaar Front Side"
                    subtext="Clear image or PDF showing name and photo"
                    file={formData.aadhaarFront}
                    previewUrl={previews.aadhaarFront}
                    onChange={(file) =>
                      handleFileUpload("aadhaarFront", "aadhaarFront", file)
                    }
                  />

                  <DocumentUploadCard
                    id="upload-aadhaar-back"
                    title="Aadhaar Back Side"
                    subtext="Clear image or PDF showing full address"
                    file={formData.aadhaarBack}
                    previewUrl={previews.aadhaarBack}
                    onChange={(file) =>
                      handleFileUpload("aadhaarBack", "aadhaarBack", file)
                    }
                  />
                </div>

                <div className="onboarding-trust-banner">
                  <ShieldCheck size={18} className="onboarding-trust-icon" />
                  <span>
                    Your identity documents are encrypted and handled in compliance
                    with Indian verification and privacy regulations.
                  </span>
                </div>
              </motion.div>
            )}

            {/* ==========================================================
                STEP 4: PAN DETAILS (PRESERVED DESIGN)
                ========================================================== */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.2 }}
              >
                <div className="onboarding-step-header">
                  <div className="onboarding-step-title">
                    <IdCard size={18} className="text-[#05A223]" />
                    <span>Step 4: PAN Card Verification</span>
                  </div>
                  <p className="onboarding-step-desc">
                    Provide your Permanent Account Number (PAN) and document copies.
                  </p>
                </div>

                <div className="onboarding-form-grid single-col">
                  {/* PAN Number */}
                  <div className="onboarding-field">
                    <label htmlFor="onb-pan" className="onboarding-label">
                      PAN Number <span className="onboarding-required">*</span>
                    </label>
                    <div className="onboarding-input-wrap">
                      <CreditCard size={17} className="onboarding-input-icon" />
                      <input
                        id="onb-pan"
                        type="text"
                        maxLength={10}
                        placeholder="e.g. ABCDE1234F"
                        value={formData.panNumber}
                        onChange={(e) => {
                          const val = e.target.value
                            .toUpperCase()
                            .replace(/[^A-Z0-9]/g, "")
                            .slice(0, 10);
                          setFormData({ ...formData, panNumber: val });
                        }}
                        onBlur={() =>
                          setTouched((prev) => ({ ...prev, panNumber: true }))
                        }
                        className={`onboarding-input ${
                          touched.panNumber && !isPanValid ? "has-error" : ""
                        }`}
                        aria-invalid={touched.panNumber && !isPanValid}
                      />
                    </div>
                    {touched.panNumber && !isPanValid ? (
                      <span className="onboarding-error-msg">
                        <AlertCircle size={13} />
                        Please enter a valid 10-character PAN (e.g. ABCDE1234F)
                      </span>
                    ) : (
                      <span className="onboarding-hint">
                        Format: 5 letters, 4 numbers, 1 letter (e.g. ABCDE1234F)
                      </span>
                    )}
                  </div>
                </div>

                {/* PAN Uploads */}
                <div className="onboarding-uploads-title">
                  <FileText size={16} className="text-[#05A223]" />
                  <span>
                    Upload PAN Card Documents{" "}
                    <span className="onboarding-required">*</span>
                  </span>
                </div>

                <div className="onboarding-uploads-grid">
                  <DocumentUploadCard
                    id="upload-pan-front"
                    title="PAN Card Front Side"
                    subtext="Clear image or PDF showing PAN and signature"
                    file={formData.panFront}
                    previewUrl={previews.panFront}
                    onChange={(file) =>
                      handleFileUpload("panFront", "panFront", file)
                    }
                  />

                  <DocumentUploadCard
                    id="upload-pan-back"
                    title="PAN Card Back Side"
                    subtext="Clear image or PDF of card back side"
                    file={formData.panBack}
                    previewUrl={previews.panBack}
                    onChange={(file) =>
                      handleFileUpload("panBack", "panBack", file)
                    }
                  />
                </div>

                <div className="onboarding-trust-banner">
                  <Lock size={18} className="onboarding-trust-icon" />
                  <span>
                    PAN information is strictly verified against Income Tax
                    guidelines for authentic vendor/partner enrollment.
                  </span>
                </div>
              </motion.div>
            )}

            {/* ==========================================================
                STEP 5: BANK DETAILS (PRESERVED DESIGN)
                ========================================================== */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.2 }}
              >
                <div className="onboarding-step-header">
                  <div className="onboarding-step-title">
                    <Building size={18} className="text-[#05A223]" />
                    <span>Step 5: Bank Account Details</span>
                  </div>
                  <p className="onboarding-step-desc">
                    Enter the bank account information for payouts and official transactions.
                  </p>
                </div>

                <div className="onboarding-form-grid">
                  {/* Bank Name */}
                  <div className="onboarding-field">
                    <label htmlFor="onb-bank-name" className="onboarding-label">
                      Bank Name <span className="onboarding-required">*</span>
                    </label>
                    <div className="onboarding-input-wrap">
                      <Building size={17} className="onboarding-input-icon" />
                      <input
                        id="onb-bank-name"
                        type="text"
                        placeholder="e.g. State Bank of India"
                        value={formData.bankName}
                        onChange={(e) =>
                          setFormData({ ...formData, bankName: e.target.value })
                        }
                        onBlur={() =>
                          setTouched((prev) => ({ ...prev, bankName: true }))
                        }
                        className={`onboarding-input ${
                          touched.bankName && !isBankNameValid ? "has-error" : ""
                        }`}
                        aria-invalid={touched.bankName && !isBankNameValid}
                      />
                    </div>
                    {touched.bankName && !isBankNameValid && (
                      <span className="onboarding-error-msg">
                        <AlertCircle size={13} />
                        Please enter the bank name
                      </span>
                    )}
                  </div>

                  {/* Account Holder Name */}
                  <div className="onboarding-field">
                    <label htmlFor="onb-holder-name" className="onboarding-label">
                      Account Holder Name <span className="onboarding-required">*</span>
                    </label>
                    <div className="onboarding-input-wrap">
                      <User size={17} className="onboarding-input-icon" />
                      <input
                        id="onb-holder-name"
                        type="text"
                        placeholder="Name as per bank records"
                        value={formData.accountHolderName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            accountHolderName: e.target.value,
                          })
                        }
                        onBlur={() =>
                          setTouched((prev) => ({
                            ...prev,
                            accountHolderName: true,
                          }))
                        }
                        className={`onboarding-input ${
                          touched.accountHolderName && !isAccountHolderValid
                            ? "has-error"
                            : ""
                        }`}
                        aria-invalid={
                          touched.accountHolderName && !isAccountHolderValid
                        }
                      />
                    </div>
                    {touched.accountHolderName && !isAccountHolderValid && (
                      <span className="onboarding-error-msg">
                        <AlertCircle size={13} />
                        Please enter the account holder name
                      </span>
                    )}
                  </div>

                  {/* Account Number */}
                  <div className="onboarding-field">
                    <label htmlFor="onb-acc-number" className="onboarding-label">
                      Account Number <span className="onboarding-required">*</span>
                    </label>
                    <div className="onboarding-input-wrap">
                      <CreditCard size={17} className="onboarding-input-icon" />
                      <input
                        id="onb-acc-number"
                        type="text"
                        inputMode="numeric"
                        maxLength={18}
                        placeholder="9 to 18 digit account number"
                        value={formData.accountNumber}
                        onChange={(e) => {
                          const val = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 18);
                          setFormData({ ...formData, accountNumber: val });
                        }}
                        onBlur={() =>
                          setTouched((prev) => ({ ...prev, accountNumber: true }))
                        }
                        className={`onboarding-input ${
                          touched.accountNumber && !isAccountValid
                            ? "has-error"
                            : ""
                        }`}
                        aria-invalid={touched.accountNumber && !isAccountValid}
                      />
                    </div>
                    {touched.accountNumber && !isAccountValid ? (
                      <span className="onboarding-error-msg">
                        <AlertCircle size={13} />
                        Account number must be 9 to 18 digits
                      </span>
                    ) : (
                      <span className="onboarding-hint">
                        Standard 9-18 digit account number
                      </span>
                    )}
                  </div>

                  {/* IFSC Code */}
                  <div className="onboarding-field">
                    <label htmlFor="onb-ifsc" className="onboarding-label">
                      IFSC Code <span className="onboarding-required">*</span>
                    </label>
                    <div className="onboarding-input-wrap">
                      <Landmark size={17} className="onboarding-input-icon" />
                      <input
                        id="onb-ifsc"
                        type="text"
                        maxLength={11}
                        placeholder="e.g. SBIN0001234"
                        value={formData.ifscCode}
                        onChange={(e) => {
                          const val = e.target.value
                            .toUpperCase()
                            .replace(/[^A-Z0-9]/g, "")
                            .slice(0, 11);
                          setFormData({ ...formData, ifscCode: val });
                        }}
                        onBlur={() =>
                          setTouched((prev) => ({ ...prev, ifscCode: true }))
                        }
                        className={`onboarding-input ${
                          touched.ifscCode && !isIfscValid ? "has-error" : ""
                        }`}
                        aria-invalid={touched.ifscCode && !isIfscValid}
                      />
                    </div>
                    {touched.ifscCode && !isIfscValid ? (
                      <span className="onboarding-error-msg">
                        <AlertCircle size={13} />
                        Valid 11-character IFSC required (e.g. SBIN0001234)
                      </span>
                    ) : (
                      <span className="onboarding-hint">
                        11 alphanumeric characters (4th char is 0)
                      </span>
                    )}
                  </div>

                  {/* Branch Name */}
                  <div className="onboarding-field full-span">
                    <label htmlFor="onb-branch" className="onboarding-label">
                      Branch Name <span className="onboarding-required">*</span>
                    </label>
                    <div className="onboarding-input-wrap">
                      <MapPin size={17} className="onboarding-input-icon" />
                      <input
                        id="onb-branch"
                        type="text"
                        placeholder="e.g. Main Branch, MG Road"
                        value={formData.branchName}
                        onChange={(e) =>
                          setFormData({ ...formData, branchName: e.target.value })
                        }
                        onBlur={() =>
                          setTouched((prev) => ({ ...prev, branchName: true }))
                        }
                        className={`onboarding-input ${
                          touched.branchName && !isBranchValid ? "has-error" : ""
                        }`}
                        aria-invalid={touched.branchName && !isBranchValid}
                      />
                    </div>
                    {touched.branchName && !isBranchValid && (
                      <span className="onboarding-error-msg">
                        <AlertCircle size={13} />
                        Please enter the branch name
                      </span>
                    )}
                  </div>
                </div>

                {/* Bank Passbook Upload */}
                <div className="onboarding-uploads-title">
                  <FileText size={16} className="text-[#05A223]" />
                  <span>
                    Upload Bank Document{" "}
                    <span className="onboarding-required">*</span>
                  </span>
                </div>

                <div className="onboarding-uploads-grid single-col">
                  <DocumentUploadCard
                    id="upload-bank-passbook"
                    title="Bank Passbook / Cancelled Cheque"
                    subtext="Clear photo or PDF showing Account Number, IFSC, and Account Holder Name"
                    file={formData.bankPassbook}
                    previewUrl={previews.bankPassbook}
                    onChange={(file) =>
                      handleFileUpload("bankPassbook", "bankPassbook", file)
                    }
                    fullWidth
                  />
                </div>
              </motion.div>
            )}

            {/* ==========================================================
                STEP 6: FINAL REVIEW
                ========================================================== */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.2 }}
              >
                <div className="onboarding-step-header">
                  <div className="onboarding-step-title">
                    <FileCheck size={18} className="text-[#05A223]" />
                    <span>Step 6: Review & Confirmation</span>
                  </div>
                  <p className="onboarding-step-desc">
                    Review all details carefully before submitting. Click &quot;Edit&quot; on
                    any section to modify information.
                  </p>
                </div>

                <div className="onboarding-review-container">
                  {/* Section 1: Profile Details */}
                  <div className="onboarding-review-card">
                    <div className="onboarding-review-header">
                      <div className="onboarding-review-section-title">
                        <User size={16} className="text-[#05A223]" />
                        <span>Profile Details</span>
                      </div>
                      <button
                        type="button"
                        className="onboarding-review-edit-btn"
                        onClick={() => setStep(2)}
                        aria-label="Edit Profile Details"
                      >
                        <Pencil size={13} />
                        <span>Edit</span>
                      </button>
                    </div>

                    <div className="onboarding-review-profile-row">
                      <div className="onboarding-review-avatar">
                        {previews.profilePicture ? (
                          <Image
                            src={previews.profilePicture}
                            alt={formData.fullName}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <User size={24} />
                        )}
                      </div>
                      <div className="onboarding-review-item">
                        <span className="onboarding-review-item-label">
                          Full Name
                        </span>
                        <span className="onboarding-review-item-value">
                          {formData.fullName || "—"}
                        </span>
                      </div>
                    </div>

                    <div className="onboarding-review-grid">
                      <div className="onboarding-review-item">
                        <span className="onboarding-review-item-label">
                          Mobile Number
                        </span>
                        <span className="onboarding-review-item-value">
                          +91 {formData.mobileNumber}
                        </span>
                      </div>
                      <div className="onboarding-review-item">
                        <span className="onboarding-review-item-label">
                          Email Address
                        </span>
                        <span className="onboarding-review-item-value">
                          {formData.email}
                        </span>
                      </div>
                      <div className="onboarding-review-item">
                        <span className="onboarding-review-item-label">
                          Notes
                        </span>
                        <span className="onboarding-review-item-value">
                          {formData.notes || "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Aadhaar Details */}
                  <div className="onboarding-review-card">
                    <div className="onboarding-review-header">
                      <div className="onboarding-review-section-title">
                        <CreditCard size={16} className="text-[#05A223]" />
                        <span>Aadhaar Details</span>
                      </div>
                      <button
                        type="button"
                        className="onboarding-review-edit-btn"
                        onClick={() => setStep(3)}
                        aria-label="Edit Aadhaar Details"
                      >
                        <Pencil size={13} />
                        <span>Edit</span>
                      </button>
                    </div>
                    <div className="onboarding-review-grid">
                      <div className="onboarding-review-item">
                        <span className="onboarding-review-item-label">
                          Aadhaar Number
                        </span>
                        <span
                          className="onboarding-review-item-value"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          {showFullAadhaar
                            ? formData.aadhaarNumber
                            : maskAadhaarNumber(formData.aadhaarNumber)}
                          <button
                            type="button"
                            onClick={() => setShowFullAadhaar(!showFullAadhaar)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "#263D35",
                              display: "inline-flex",
                              padding: "2px",
                            }}
                            aria-label={
                              showFullAadhaar
                                ? "Mask Aadhaar number"
                                : "Show Aadhaar number"
                            }
                          >
                            {showFullAadhaar ? (
                              <EyeOff size={14} />
                            ) : (
                              <Eye size={14} />
                            )}
                          </button>
                        </span>
                      </div>
                    </div>
                    <div className="onboarding-review-docs-list">
                      <div className="onboarding-review-doc-badge">
                        <FileCheck size={14} className="badge-icon" />
                        <span>
                          Front: {formData.aadhaarFront?.name || "Uploaded"}
                        </span>
                      </div>
                      <div className="onboarding-review-doc-badge">
                        <FileCheck size={14} className="badge-icon" />
                        <span>
                          Back: {formData.aadhaarBack?.name || "Uploaded"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: PAN Details */}
                  <div className="onboarding-review-card">
                    <div className="onboarding-review-header">
                      <div className="onboarding-review-section-title">
                        <IdCard size={16} className="text-[#05A223]" />
                        <span>PAN Details</span>
                      </div>
                      <button
                        type="button"
                        className="onboarding-review-edit-btn"
                        onClick={() => setStep(4)}
                        aria-label="Edit PAN Details"
                      >
                        <Pencil size={13} />
                        <span>Edit</span>
                      </button>
                    </div>
                    <div className="onboarding-review-grid">
                      <div className="onboarding-review-item">
                        <span className="onboarding-review-item-label">
                          PAN Number
                        </span>
                        <span className="onboarding-review-item-value">
                          {formData.panNumber}
                        </span>
                      </div>
                    </div>
                    <div className="onboarding-review-docs-list">
                      <div className="onboarding-review-doc-badge">
                        <FileCheck size={14} className="badge-icon" />
                        <span>
                          Front: {formData.panFront?.name || "Uploaded"}
                        </span>
                      </div>
                      <div className="onboarding-review-doc-badge">
                        <FileCheck size={14} className="badge-icon" />
                        <span>Back: {formData.panBack?.name || "Uploaded"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Bank Details */}
                  <div className="onboarding-review-card">
                    <div className="onboarding-review-header">
                      <div className="onboarding-review-section-title">
                        <Building size={16} className="text-[#05A223]" />
                        <span>Bank Details</span>
                      </div>
                      <button
                        type="button"
                        className="onboarding-review-edit-btn"
                        onClick={() => setStep(5)}
                        aria-label="Edit Bank Details"
                      >
                        <Pencil size={13} />
                        <span>Edit</span>
                      </button>
                    </div>
                    <div className="onboarding-review-grid">
                      <div className="onboarding-review-item">
                        <span className="onboarding-review-item-label">
                          Bank Name
                        </span>
                        <span className="onboarding-review-item-value">
                          {formData.bankName}
                        </span>
                      </div>
                      <div className="onboarding-review-item">
                        <span className="onboarding-review-item-label">
                          Account Holder Name
                        </span>
                        <span className="onboarding-review-item-value">
                          {formData.accountHolderName}
                        </span>
                      </div>
                      <div className="onboarding-review-item">
                        <span className="onboarding-review-item-label">
                          Account Number
                        </span>
                        <span
                          className="onboarding-review-item-value"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          {showFullAccount
                            ? formData.accountNumber
                            : maskAccountNumber(formData.accountNumber)}
                          <button
                            type="button"
                            onClick={() => setShowFullAccount(!showFullAccount)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "#263D35",
                              display: "inline-flex",
                              padding: "2px",
                            }}
                            aria-label={
                              showFullAccount
                                ? "Mask account number"
                                : "Show account number"
                            }
                          >
                            {showFullAccount ? (
                              <EyeOff size={14} />
                            ) : (
                              <Eye size={14} />
                            )}
                          </button>
                        </span>
                      </div>
                      <div className="onboarding-review-item">
                        <span className="onboarding-review-item-label">
                          IFSC Code
                        </span>
                        <span className="onboarding-review-item-value">
                          {formData.ifscCode}
                        </span>
                      </div>
                      <div className="onboarding-review-item">
                        <span className="onboarding-review-item-label">
                          Branch Name
                        </span>
                        <span className="onboarding-review-item-value">
                          {formData.branchName}
                        </span>
                      </div>
                    </div>
                    <div className="onboarding-review-docs-list">
                      <div className="onboarding-review-doc-badge">
                        <FileCheck size={14} className="badge-icon" />
                        <span>
                          Passbook/Cheque:{" "}
                          {formData.bankPassbook?.name || "Uploaded"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="onboarding-review-consent">
                    <ShieldCheck
                      size={18}
                      className="text-[#05A223] flex-shrink-0 mt-0.5"
                    />
                    <span>
                      I hereby declare that all details and documents provided are
                      authentic, valid, and belong to me. I authorize TranSetu to
                      verify these records for official onboarding.
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==========================================================
                STEP 7: APPLICATION SUBMITTED / WAITING SCREEN
                ========================================================== */}
            {step === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="onboarding-waiting-view"
              >
                <div className="onboarding-waiting-icon-circle">
                  <CheckCircle2 size={42} />
                </div>

                <h3 className="onboarding-waiting-title">
                  Your onboarding request has been sent.
                </h3>

                <p className="onboarding-waiting-subtitle">
                  It may take 1 to 2 days to review and accept.
                </p>

                <div className="onboarding-waiting-status-badge">
                  <Clock size={15} />
                  <span>Application Under Review</span>
                </div>

                <div className="onboarding-trust-banner" style={{ maxWidth: "520px", marginTop: "18px", textAlign: "left" }}>
                  <ShieldCheck size={18} className="onboarding-trust-icon" />
                  <span>
                    Our compliance team is verifying your profile, identity documents, and bank details.
                    You will receive updates via SMS and email once your application is reviewed.
                  </span>
                </div>

                <div className="onboarding-waiting-support-box">
                  <Mail size={16} className="text-[#05A223]" />
                  <span>
                    For any queries, please contact{" "}
                    <a
                      href="mailto:support@transetu.com"
                      className="onboarding-waiting-support-link"
                    >
                      support@transetu.com
                    </a>
                  </span>
                </div>

                <div style={{ marginTop: "24px" }}>
                  <button
                    type="button"
                    className="onboarding-btn-primary"
                    onClick={handleClose}
                    style={{ margin: "0 auto", padding: "11px 36px" }}
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal Footer Actions (Steps 1 to 6) */}
        {step < 7 && (
          <div className="onboarding-footer">
            {step > 1 ? (
              <button
                type="button"
                className="onboarding-btn-back"
                onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5 | 6)}
                disabled={isSubmitting}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {/* Step 2: Continue */}
            {step === 2 && (
              <button
                type="button"
                className="onboarding-btn-primary"
                onClick={() => {
                  setTouched({
                    fullName: true,
                    email: true,
                    password: true,
                    confirmPassword: true,
                    notes: true,
                  });
                  if (isStep2Complete) {
                    setStep(3);
                  }
                }}
                disabled={!isStep2Complete}
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            )}

            {/* Step 3: Continue (Aadhaar) */}
            {step === 3 && (
              <button
                type="button"
                className="onboarding-btn-primary"
                onClick={() => {
                  setTouched({ aadhaarNumber: true });
                  if (isStep3Complete) {
                    setStep(4);
                  }
                }}
                disabled={!isStep3Complete}
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            )}

            {/* Step 4: Continue (PAN) */}
            {step === 4 && (
              <button
                type="button"
                className="onboarding-btn-primary"
                onClick={() => {
                  setTouched({ panNumber: true });
                  if (isStep4Complete) {
                    setStep(5);
                  }
                }}
                disabled={!isStep4Complete}
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            )}

            {/* Step 5: Continue (Bank Details) */}
            {step === 5 && (
              <button
                type="button"
                className="onboarding-btn-primary"
                onClick={() => {
                  setTouched({
                    bankName: true,
                    accountHolderName: true,
                    accountNumber: true,
                    ifscCode: true,
                    branchName: true,
                  });
                  if (isStep5Complete) {
                    setStep(6);
                  }
                }}
                disabled={!isStep5Complete}
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            )}

            {/* Step 6: Submit */}
            {step === 6 && (
              <button
                type="button"
                className="onboarding-btn-primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <Check size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Subcomponent: Document Upload Card (Preserved)
interface DocumentUploadCardProps {
  id: string;
  title: string;
  subtext: string;
  file: File | null;
  previewUrl: string | null;
  onChange: (file: File | null) => void;
  fullWidth?: boolean;
}

function DocumentUploadCard({
  id,
  title,
  subtext,
  file,
  previewUrl,
  onChange,
  fullWidth = false,
}: DocumentUploadCardProps) {
  const isPdf = file?.type === "application/pdf";
  const hasFile = Boolean(file);

  return (
    <div
      className={`onboarding-upload-card ${hasFile ? "has-file" : ""} ${
        fullWidth ? "full-width" : ""
      }`}
    >
      <input
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp,application/pdf"
        style={{ display: "none" }}
        onChange={(e) => {
          const selected = e.target.files?.[0] || null;
          onChange(selected);
        }}
      />

      {hasFile ? (
        <div className="onboarding-upload-preview">
          {previewUrl && !isPdf ? (
            <div className="onboarding-upload-img-box">
              <Image
                src={previewUrl}
                alt={title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          ) : (
            <div className="onboarding-upload-pdf-box">
              <div className="onboarding-upload-pdf-icon">
                <FileText size={20} />
              </div>
              <div className="onboarding-upload-file-details">
                <p className="onboarding-upload-filename">
                  {file?.name || "document.pdf"}
                </p>
                <p className="onboarding-upload-filesize">
                  {file
                    ? `${(file.size / (1024 * 1024)).toFixed(2)} MB • PDF`
                    : "PDF Document"}
                </p>
              </div>
            </div>
          )}

          <div className="onboarding-upload-actions-bar">
            <label htmlFor={id} className="onboarding-upload-action-btn">
              <Upload size={12} />
              <span>Change</span>
            </label>
            <button
              type="button"
              className="onboarding-upload-action-btn delete"
              onClick={(e) => {
                e.preventDefault();
                onChange(null);
              }}
              aria-label={`Remove ${title}`}
            >
              <X size={12} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor={id}
          style={{
            cursor: "pointer",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="onboarding-upload-icon-circle">
            <Upload size={20} />
          </div>
          <span className="onboarding-upload-title">{title}</span>
          <span className="onboarding-upload-subtext">{subtext}</span>
          <span className="onboarding-upload-btn-label">
            <Upload size={12} />
            <span>Upload (JPG, PNG, PDF)</span>
          </span>
        </label>
      )}
    </div>
  );
}

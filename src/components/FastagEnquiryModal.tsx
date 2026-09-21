"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Building,
  CheckCircle2,
  CreditCard,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import "./FastagEnquiryModal.css";

export interface FastagEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "fastag" | "fastag-holder" | "gps";
}

const initialFormData = {
  fullName: "",
  mobile: "",
  email: "",
  deliveryAddress: "",
  city: "",
  state: "",
  pincode: "",
  message: "",
};

function getModalContent(type: "fastag" | "fastag-holder" | "gps") {
  if (type === "gps") {
    return {
      title: "GPS Tracker",
      subtitle:
        "Interested in our upcoming GPS Tracker or have questions? Send us a message and our team will get in touch.",
      submitButtonText: "Send Message",
      image: "/products/gps-tracker.png",
      imageAlt: "GPS Tracker",
    };
  }
  if (type === "fastag-holder") {
    return {
      title: "Buy FASTag Holder",
      subtitle: "Submit your details for rapid doorstep issuance & activation",
      submitButtonText: "Submit Details",
      image: "/assets/Fastag_image.png",
      imageAlt: "FASTag Holder",
    };
  }
  // default: fastag
  return {
    title: "Buy FASTag",
    subtitle: "Submit your details for rapid doorstep issuance & activation",
    submitButtonText: "Submit Details",
    image: "/assets/Fastag_image.png",
    imageAlt: "FASTag",
  };
}

export default function FastagEnquiryModal({
  isOpen,
  onClose,
  type = "fastag",
}: FastagEnquiryModalProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const isGps = type === "gps";
  const isFastagHolder = type === "fastag-holder";
  const isSimpleForm = isGps || isFastagHolder;
  const content = getModalContent(type);

  const handleClose = () => {
    if (isSubmitting) return;
    setSubmitSuccess(false);
    setApiError(null);
    setErrors({});
    setFormData(initialFormData);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isSubmitting]);

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === "mobile") {
      formattedValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (field === "pincode") {
      formattedValue = value.replace(/\D/g, "").slice(0, 6);
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }

    if (apiError) {
      setApiError(null);
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required";
    }

    const cleanMobile = formData.mobile.replace(/\D/g, "");
    if (!cleanMobile) {
      errs.mobile = "Mobile number is required";
    } else if (cleanMobile.length !== 10) {
      errs.mobile = "Enter a valid 10-digit mobile number";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = "Enter a valid email address";
    }

    if (isSimpleForm) {
      // Simple form (GPS & FASTag Holder): only name, mobile, email, message
      if (!formData.message.trim()) {
        errs.message = "Message is required";
      }
    } else {
      // FASTag: 7-field validation
      if (!formData.deliveryAddress.trim()) {
        errs.deliveryAddress = "Delivery address is required";
      }
      if (!formData.city.trim()) {
        errs.city = "City is required";
      }
      if (!formData.state.trim()) {
        errs.state = "State is required";
      }
      const cleanPincode = formData.pincode.replace(/\D/g, "");
      if (!cleanPincode) {
        errs.pincode = "PIN Code is required";
      } else if (cleanPincode.length !== 6) {
        errs.pincode = "Enter a valid 6-digit PIN Code";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    setApiError(null);

    try {
      const payload = new FormData();
      payload.append("enquiryType", type);
      payload.append("fullName", formData.fullName.trim());
      payload.append("mobile", formData.mobile.trim());
      payload.append("email", formData.email.trim());

      if (isSimpleForm) {
        payload.append("message", formData.message.trim());
      } else {
        payload.append("deliveryAddress", formData.deliveryAddress.trim());
        payload.append("city", formData.city.trim());
        payload.append("state", formData.state.trim());
        payload.append("pincode", formData.pincode.trim());
      }

      const response = await fetch("/api/fastag-enquiry", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setApiError(
          data?.error || "We couldn't send your message right now. Please try again."
        );
        return;
      }

      setSubmitSuccess(true);
    } catch {
      setApiError("We couldn't send your message right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const productLabel =
    type === "fastag-holder"
      ? "FASTag Holder"
      : type === "gps"
      ? "GPS Tracker"
      : "FASTag";

  return (
    <AnimatePresence>
      <div
        className="fastag-modal-backdrop"
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="fastag-enquiry-dialog"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="fastag-enquiry-header">
            <div className="fastag-enquiry-header-image">
              <Image
                src={content.image}
                alt={content.imageAlt}
                fill
                sizes="100vw"
                className="fastag-header-image-content"
                priority
              />
              <div className="fastag-enquiry-header-image-fade" />
            </div>

            <div className="fastag-enquiry-header-left">
              <div className="fastag-enquiry-icon-box">
                {isGps ? <Navigation size={24} /> : <CreditCard size={24} />}
              </div>
              <div className="fastag-enquiry-title-wrap">
                <h3 id="enquiry-modal-title">{content.title}</h3>
                <p>{content.subtitle}</p>
              </div>
            </div>

            <button
              type="button"
              className="fastag-enquiry-close-btn"
              onClick={handleClose}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          <div className="fastag-enquiry-body">
            {submitSuccess ? (
              <div className="fastag-success-view">
                <div className="fastag-success-badge">
                  <CheckCircle2 size={40} />
                </div>
                <h3>
                  {isSimpleForm ? "Message Sent!" : "Request Received!"}
                </h3>
                <p>
                  {isGps ? (
                    <>
                      Thank you, <strong>{formData.fullName}</strong>. Your
                      message regarding the GPS Tracker has been received. Our
                      team will contact you at{" "}
                      <strong>+91 {formData.mobile}</strong> shortly.
                    </>
                  ) : isFastagHolder ? (
                    <>
                      Thank you, <strong>{formData.fullName}</strong>. Your
                      message regarding the FASTag Holder has been received. Our
                      team will contact you at{" "}
                      <strong>+91 {formData.mobile}</strong> shortly.
                    </>
                  ) : (
                    <>
                      Thank you, <strong>{formData.fullName}</strong>. Your
                      request for <strong>{productLabel}</strong> has been
                      received. Our team will contact you at{" "}
                      <strong>+91 {formData.mobile}</strong> shortly.
                    </>
                  )}
                </p>

                {!isSimpleForm && (
                  <div className="fastag-success-details">
                    <div className="fastag-success-row">
                      <span>Contact Email</span>
                      <span>{formData.email}</span>
                    </div>
                    <div className="fastag-success-row">
                      <span>City / State</span>
                      <span>
                        {formData.city}, {formData.state}
                      </span>
                    </div>
                    <div className="fastag-success-row">
                      <span>PIN Code</span>
                      <span>{formData.pincode}</span>
                    </div>
                  </div>
                )}

                {isSimpleForm && (
                  <div className="fastag-success-details">
                    <div className="fastag-success-row">
                      <span>Contact Email</span>
                      <span>{formData.email}</span>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  className="fastag-done-btn"
                  onClick={handleClose}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {apiError && (
                  <div className="fastag-alert-error" role="alert">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{apiError}</span>
                  </div>
                )}

                <div className="fastag-enquiry-grid">
                  {/* Full Name / Name */}
                  <div className={`fastag-input-group ${isSimpleForm ? "fastag-field-full" : ""}`}>
                    <label className="fastag-input-label">
                      {isSimpleForm ? "Name" : "Full Name"}{" "}
                      <span className="required-star">*</span>
                    </label>
                    <div
                      className={`fastag-input-container ${
                        errors.fullName ? "has-error" : ""
                      }`}
                    >
                      <User size={16} className="fastag-input-icon" />
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.fullName}
                        onChange={(event) =>
                          handleInputChange("fullName", event.target.value)
                        }
                        className="fastag-field-input"
                      />
                    </div>
                    {errors.fullName && (
                      <span className="fastag-error-msg">{errors.fullName}</span>
                    )}
                  </div>

                  {/* Mobile Number / Phone Number */}
                  <div className={`fastag-input-group ${isSimpleForm ? "fastag-field-full" : ""}`}>
                    <label className="fastag-input-label">
                      {isSimpleForm ? "Phone Number" : "Mobile Number"}{" "}
                      <span className="required-star">*</span>
                    </label>
                    <div
                      className={`fastag-input-container ${
                        errors.mobile ? "has-error" : ""
                      }`}
                    >
                      <Phone size={16} className="fastag-input-icon" />
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={formData.mobile}
                        onChange={(event) =>
                          handleInputChange("mobile", event.target.value)
                        }
                        className="fastag-field-input"
                        maxLength={10}
                      />
                    </div>
                    {errors.mobile && (
                      <span className="fastag-error-msg">{errors.mobile}</span>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="fastag-input-group fastag-field-full">
                    <label className="fastag-input-label">
                      Email{isSimpleForm ? "" : " Address"}{" "}
                      <span className="required-star">*</span>
                    </label>
                    <div
                      className={`fastag-input-container ${
                        errors.email ? "has-error" : ""
                      }`}
                    >
                      <Mail size={16} className="fastag-input-icon" />
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(event) =>
                          handleInputChange("email", event.target.value)
                        }
                        className="fastag-field-input"
                      />
                    </div>
                    {errors.email && (
                      <span className="fastag-error-msg">{errors.email}</span>
                    )}
                  </div>

                  {/* Simple form: Message textarea (GPS & FASTag Holder) */}
                  {isSimpleForm && (
                    <div className="fastag-input-group fastag-field-full">
                      <label className="fastag-input-label">
                        Message <span className="required-star">*</span>
                      </label>
                      <div
                        className={`fastag-input-container ${
                          errors.message ? "has-error" : ""
                        }`}
                      >
                        <MessageSquare size={16} className="fastag-input-icon" style={{ marginTop: "12px", alignSelf: "flex-start" }} />
                        <textarea
                          placeholder={
                            isGps
                              ? "Tell us about your interest or questions regarding the GPS Tracker..."
                              : "Tell us about your interest or questions regarding the FASTag Holder..."
                          }
                          value={formData.message}
                          onChange={(event) =>
                            handleInputChange("message", event.target.value)
                          }
                          className="fastag-field-textarea"
                          rows={4}
                        />
                      </div>
                      {errors.message && (
                        <span className="fastag-error-msg">{errors.message}</span>
                      )}
                    </div>
                  )}

                  {/* FASTag-only: address fields */}
                  {!isSimpleForm && (
                    <>
                      <div className="fastag-input-group fastag-field-full">
                        <label className="fastag-input-label">
                          Delivery Address{" "}
                          <span className="required-star">*</span>
                        </label>
                        <div
                          className={`fastag-input-container ${
                            errors.deliveryAddress ? "has-error" : ""
                          }`}
                        >
                          <MapPin size={16} className="fastag-input-icon" />
                          <textarea
                            placeholder="Enter full delivery address"
                            value={formData.deliveryAddress}
                            onChange={(event) =>
                              handleInputChange("deliveryAddress", event.target.value)
                            }
                            className="fastag-field-textarea"
                            rows={3}
                          />
                        </div>
                        {errors.deliveryAddress && (
                          <span className="fastag-error-msg">
                            {errors.deliveryAddress}
                          </span>
                        )}
                      </div>

                      <div className="fastag-input-group">
                        <label className="fastag-input-label">
                          City <span className="required-star">*</span>
                        </label>
                        <div
                          className={`fastag-input-container ${
                            errors.city ? "has-error" : ""
                          }`}
                        >
                          <Building size={16} className="fastag-input-icon" />
                          <input
                            type="text"
                            placeholder="e.g. Visakhapatnam"
                            value={formData.city}
                            onChange={(event) =>
                              handleInputChange("city", event.target.value)
                            }
                            className="fastag-field-input"
                          />
                        </div>
                        {errors.city && (
                          <span className="fastag-error-msg">{errors.city}</span>
                        )}
                      </div>

                      <div className="fastag-input-group">
                        <label className="fastag-input-label">
                          State <span className="required-star">*</span>
                        </label>
                        <div
                          className={`fastag-input-container ${
                            errors.state ? "has-error" : ""
                          }`}
                        >
                          <Navigation size={16} className="fastag-input-icon" />
                          <input
                            type="text"
                            placeholder="e.g. Andhra Pradesh"
                            value={formData.state}
                            onChange={(event) =>
                              handleInputChange("state", event.target.value)
                            }
                            className="fastag-field-input"
                          />
                        </div>
                        {errors.state && (
                          <span className="fastag-error-msg">{errors.state}</span>
                        )}
                      </div>

                      <div className="fastag-input-group fastag-field-full">
                        <label className="fastag-input-label">
                          PIN Code <span className="required-star">*</span>
                        </label>
                        <div
                          className={`fastag-input-container ${
                            errors.pincode ? "has-error" : ""
                          }`}
                        >
                          <MapPin size={16} className="fastag-input-icon" />
                          <input
                            type="text"
                            placeholder="6-digit postal code"
                            value={formData.pincode}
                            onChange={(event) =>
                              handleInputChange("pincode", event.target.value)
                            }
                            className="fastag-field-input"
                            maxLength={6}
                          />
                        </div>
                        {errors.pincode && (
                          <span className="fastag-error-msg">{errors.pincode}</span>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="fastag-form-footer">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="fastag-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>{content.submitButtonText}</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export { FastagEnquiryModal as EnquiryModal };

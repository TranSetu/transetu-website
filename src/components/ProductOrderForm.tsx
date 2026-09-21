"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  User,
  Phone,
  Car,
  CreditCard,
  CheckCircle2,
  Loader2,
  Building,
  Wallet,
  Camera,
  FileText,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  Truck,
  Headphones,
  Upload,
  CreditCard as IdCardIcon,
  ChevronDown,
  QrCode,
  Tag,
} from "lucide-react";
import Image from "next/image";
import "./ProductOrderForm.css";

interface ProductOrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: number;
  productImage?: string;
  productTagline?: string;
}

function OrderSummarySidebar({
  productName,
  productPrice,
  productImage,
  productTagline,
}: {
  productName: string;
  productPrice: number;
  productImage?: string;
  productTagline?: string;
}) {
  const displayImage =
    productImage ||
    (productName === "FASTag"
      ? "/products/fastags.png"
      : productName === "FASTag Holder"
      ? "/products/rfid-holders-new.png"
      : "/products/gps-tracker.png");

  return (
    <div className="order-summary">
      <div className="order-summary-header">
        <div className="order-summary-header-icon">
          <FileText size={18} className="text-white" />
        </div>
        <div>
          <h4>Order Summary</h4>
          <p>Review your order details</p>
        </div>
      </div>

      <div className="order-summary-content">
        <div className="order-summary-product">
          <div className="order-summary-product-image">
            <Image
              src={displayImage}
              alt={productName}
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="order-summary-product-info">
            <div className="order-summary-product-name">
              <span>{productName}</span>
              <span className="order-summary-product-tag">
                {productName === "FASTag Holder" ? "ACCESSORY" : "FASTag"}
              </span>
            </div>
            <p>
              {productTagline ||
                "Cashless toll payments with instant deduction and seamless highway travel."}
            </p>
          </div>
          <div className="order-summary-product-price">
            ₹{productPrice.toLocaleString()}
          </div>
        </div>

        <div className="order-summary-price">
          <div className="order-summary-price-row">
            <span>Product Price</span>
            <span>₹{productPrice.toLocaleString()}</span>
          </div>
          <div className="order-summary-price-total">
            <span>Total Amount</span>
            <span>₹{productPrice.toLocaleString()}</span>
          </div>
        </div>

        <div className="order-summary-badges">
          <div>
            <div className="order-summary-badge-icon">
              <Truck size={18} className="text-[#59C71C]" />
            </div>
            <p>Fast Delivery</p>
          </div>
          <div>
            <div className="order-summary-badge-icon">
              <ShieldCheck size={18} className="text-[#59C71C]" />
            </div>
            <p>Secure Payments</p>
          </div>
          <div>
            <div className="order-summary-badge-icon">
              <Headphones size={18} className="text-[#59C71C]" />
            </div>
            <p>24/7 Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductInfoSidebar({
  productName,
  productPrice,
  productImage,
  productTagline,
}: {
  productName: string;
  productPrice: number;
  productImage?: string;
  productTagline?: string;
}) {
  const isHolder = productName === "FASTag Holder";

  const displayImage =
    productImage ||
    (productName === "FASTag"
      ? "/products/fastags.png"
      : isHolder
      ? "/products/rfid-holders-new.png"
      : "/products/gps-tracker.png");

  const features = isHolder
    ? [
        {
          title: "Protects your FASTag",
          desc: "Shields the tag from dust, heat and scratches",
        },
        {
          title: "Transparent acrylic",
          desc: "Clear view of your FASTag without removing it",
        },
        {
          title: "Easy fit on windshield",
          desc: "Simple stick-on design, no tools needed",
        },
        {
          title: "Durable & long-lasting",
          desc: "Sturdy build made for daily highway use",
        },
      ]
    : [
        {
          title: "Cashless toll payments",
          desc: "Pay automatically at every plaza",
        },
        {
          title: "Instant deduction",
          desc: "Amount deducted from linked account in seconds",
        },
        {
          title: "Nationwide acceptance",
          desc: "Works across highways and toll plazas in India",
        },
        {
          title: "Doorstep delivery",
          desc: "Get your FASTag delivered and activated easily",
        },
      ];

  const tagline =
    productTagline ||
    (isHolder
      ? "Durable and stylish transparent acrylic holder to protect your FASTag."
      : "Cashless toll payments with instant deduction and seamless highway travel.");

  return (
    <div className="product-info-sidebar">
      <div className="product-info-top">
        <div className="product-info-image-wrap">
          <Image
            src={displayImage}
            alt={productName}
            fill
            className="object-contain p-2"
          />
        </div>
        <div className="product-info-meta">
          <span className="product-info-badge">
            {isHolder ? "ACCESSORY" : "FASTag"}
          </span>
          <h4 className="product-info-name">{productName}</h4>
          <p className="product-info-tagline">{tagline}</p>
          <div className="product-info-price">
            ₹{productPrice.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="product-info-features">
        <p className="product-info-features-label">What’s included</p>
        <ul>
          {features.map((f) => (
            <li key={f.title}>
              <CheckCircle2 size={14} className="text-[#59C71C] shrink-0 mt-0.5" />
              <div>
                <span className="product-info-feature-title">{f.title}</span>
                <span className="product-info-feature-desc">{f.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="product-info-footer">
        <ShieldCheck size={14} className="text-[#59C71C] shrink-0" />
        <span>Genuine product • Secure checkout • Fast delivery</span>
      </div>
    </div>
  );
}

function UploadTile({
  label,
  sublabel,
  icon: Icon,
  preview,
  fileName,
  onChange,
  compact = false,
  inline = false,
}: {
  label: string;
  sublabel: string;
  icon: typeof Camera;
  preview: string | null;
  fileName?: string;
  onChange: (file: File | null) => void;
  compact?: boolean;
  inline?: boolean;
}) {
  if (inline) {
    const hasFile = Boolean(preview || fileName);
    return (
      <div className="pan-upload">
        <div className={`pan-upload-field ${hasFile ? "has-file" : ""}`}>
          {preview ? (
            <div className="pan-upload-thumb">
              <Image
                src={preview}
                alt={label}
                fill
                className="object-contain rounded"
              />
            </div>
          ) : (
            <div className={`pan-upload-icon ${hasFile ? "has-file" : ""}`}>
              {hasFile ? (
                <FileText size={15} className="text-[#59C71C]" />
              ) : (
                <Icon size={15} className="text-gray-400" />
              )}
            </div>
          )}
          <span className={`pan-upload-name ${hasFile ? "has-file" : ""}`}>
            {fileName || "Choose PAN (JPG, PNG or PDF)"}
          </span>
          <label className="pan-upload-btn">
            <span className="pan-upload-btn-inner">
              <Upload size={14} />
              <span>{hasFile ? "Change" : "Upload"}</span>
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className="pan-upload-input"
              onChange={(e) => onChange(e.target.files?.[0] || null)}
            />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-tile-wrap">
      <label
        className={`
          upload-tile upload-tile--square
          ${preview || fileName ? "upload-tile--filled" : ""}
        `}
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />

        {preview ? (
          <div className="upload-tile-preview">
            <Image
              src={preview}
              alt={label}
              fill
              className="object-contain rounded-lg"
            />
          </div>
        ) : fileName ? (
          <div className="upload-tile-file">
            <div className="upload-tile-icon-box upload-tile-icon-box--active">
              <FileText size={22} className="text-[#59C71C]" />
            </div>
            <p className="upload-tile-filename">{fileName}</p>
          </div>
        ) : (
          <div className="upload-tile-empty">
            <div className="upload-tile-icon-box">
              <Icon size={22} className="text-[#263D35]" />
            </div>
            <p className="upload-tile-label">
              {label} <span className="upload-required">*</span>
            </p>
            <p className="upload-tile-sublabel">{sublabel}</p>
            <span className="upload-tile-btn">
              <Upload size={13} />
              Upload
            </span>
          </div>
        )}

        {(preview || fileName) && (
          <span className="upload-tile-change">
            <Upload size={12} />
            Change
          </span>
        )}
      </label>
    </div>
  );
}

export default function ProductOrderForm({
  isOpen,
  onClose,
  productName,
  productPrice,
  productImage,
  productTagline,
}: ProductOrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    idCardImage: null as File | null,
    vehicleNumber: "",
    vehicleClass: "Car/Jeep/Van",
    vehicleImage: null as File | null,
    rcFrontImage: null as File | null,
    rcBackImage: null as File | null,
    paymentMethod: "UPI",
  });

  const [imagePreviews, setImagePreviews] = useState<{
    idCard: string | null;
    vehicle: string | null;
    rcFront: string | null;
    rcBack: string | null;
  }>({
    idCard: null,
    vehicle: null,
    rcFront: null,
    rcBack: null,
  });

  useEffect(() => {
    if (isOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
  }, [isOpen]);

  const handleImageUpload = (
    field: "idCardImage" | "vehicleImage" | "rcFrontImage" | "rcBackImage",
    previewKey: "idCard" | "vehicle" | "rcFront" | "rcBack",
    file: File | null
  ) => {
    if (!file) {
      setFormData((prev) => ({ ...prev, [field]: null }));
      setImagePreviews((prev) => ({ ...prev, [previewKey]: null }));
      return;
    }
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => ({
          ...prev,
          [previewKey]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviews((prev) => ({ ...prev, [previewKey]: null }));
    }
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  const handleClose = () => {
    setSubmitSuccess(false);
    setStep(1);
    setFormData({
      fullName: "",
      phone: "",
      idCardImage: null,
      vehicleNumber: "",
      vehicleClass: "Car/Jeep/Van",
      vehicleImage: null,
      rcFrontImage: null,
      rcBackImage: null,
      paymentMethod: "UPI",
    });
    setImagePreviews({
      idCard: null,
      vehicle: null,
      rcFront: null,
      rcBack: null,
    });
    onClose();
  };

  const isStepValid = () => {
    if (step === 1) {
      return (
        formData.fullName.trim().length > 0 && formData.phone.trim().length > 0
      );
    }
    if (step === 2) {
      return formData.vehicleNumber.trim().length > 0;
    }
    return true;
  };

  if (!isOpen) return null;

  const showSidebar = step === 1 || step === 3;

  return (
    <div className="order-form-overlay fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-950/70 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        className="order-form-dialog"
      >
        <div className="order-form-header">
          <div className="order-form-header-image">
            <Image
              src="/assets/Car_image.png"
              alt="Highway"
              fill
              className="object-cover object-right"
              priority
            />
            <div className="order-form-header-image-fade" />
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close order form"
            className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 text-white/80 hover:text-white transition-colors bg-white/15 hover:bg-white/25 p-1.5 rounded-full backdrop-blur-sm cursor-pointer z-20"
          >
            <X size={17} />
          </button>

          <div className="relative z-10 flex items-center gap-3 pr-10">
            <div className="order-form-header-logo">
              <Car size={28} className="text-white" />
            </div>
            <div className="min-w-0">
              <h3>Purchase {productName}</h3>
              <p>
                {productName === "FASTag Holder"
                  ? "Protect your FASTag with a durable acrylic holder"
                  : productTagline ||
                    "Cashless tolls & instant doorstep delivery"}
              </p>
            </div>
          </div>
        </div>

        {submitSuccess ? (
          <div className="success-screen">
            <div className="success-banner">
              <div className="success-icon-ring">
                <CheckCircle2 size={34} className="text-[#16A34A]" />
              </div>
              <div className="success-banner-text">
                <div className="success-banner-kicker">
                  <Check size={12} />
                  Order confirmed
                </div>
                <h4 className="success-title">Order Placed Successfully!</h4>
                <p className="success-message">
                  Thank you, <strong>{formData.fullName || "Customer"}</strong>.
                  Your order for <strong>{productName}</strong> has been received.
                  Our executive will confirm your details shortly.
                </p>
              </div>
            </div>

            <div className="success-grid">
              <div className="success-next-panel">
                <p className="success-next-label">What happens next?</p>
                <ul className="success-next-list">
                  <li>
                    <span className="success-next-num">1</span>
                    <div>
                      <p className="success-next-title">Details verification</p>
                      <p className="success-next-desc">
                        Our team will verify your documents and vehicle details.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className="success-next-num">2</span>
                    <div>
                      <p className="success-next-title">Confirmation call / SMS</p>
                      <p className="success-next-desc">
                        You will receive a confirmation on {formData.phone || "your phone"}.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className="success-next-num">3</span>
                    <div>
                      <p className="success-next-title">Doorstep delivery</p>
                      <p className="success-next-desc">
                        Your {productName} will be delivered and activated for you.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="success-card">
                <div className="success-card-header">
                  <FileText size={16} className="text-[#59C71C]" />
                  <span>Order Details</span>
                </div>
                <div className="success-card-rows">
                  <div className="success-card-row">
                    <span>Product</span>
                    <span className="success-card-value">{productName}</span>
                  </div>
                  <div className="success-card-row">
                    <span>Amount</span>
                    <span className="success-card-value success-card-price">
                      ₹{productPrice.toLocaleString()}
                    </span>
                  </div>
                  {formData.vehicleNumber && (
                    <div className="success-card-row">
                      <span>Vehicle Number</span>
                      <span className="success-card-value success-card-vehicle">
                        {formData.vehicleNumber}
                      </span>
                    </div>
                  )}
                  {formData.vehicleClass && (
                    <div className="success-card-row">
                      <span>Vehicle Class</span>
                      <span className="success-card-value">{formData.vehicleClass}</span>
                    </div>
                  )}
                  <div className="success-card-row">
                    <span>Payment Method</span>
                    <span className="success-card-value">
                      {formData.paymentMethod === "QR"
                        ? "QR Code"
                        : formData.paymentMethod === "Card"
                        ? "Credit/Debit Card"
                        : formData.paymentMethod === "NetBanking"
                        ? "Net Banking"
                        : formData.paymentMethod}
                    </span>
                  </div>
                  {formData.phone && (
                    <div className="success-card-row">
                      <span>Phone</span>
                      <span className="success-card-value">{formData.phone}</span>
                    </div>
                  )}
                </div>
                <div className="success-card-footer">
                  <ShieldCheck size={14} className="text-[#59C71C]" />
                  <span>Secure order • Genuine product • Fast delivery</span>
                </div>
              </div>
            </div>

            <div className="success-footer">
              <p className="success-footer-note">
                Keep this confirmation handy. You can close this window anytime.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="success-done-btn"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="order-form-content flex-1 min-h-0 overflow-y-auto p-5 sm:p-7 custom-modal-scrollbar">
              <div className="order-form-progress">
                {[
                  { step: 1, label: "Personal Information", icon: User },
                  { step: 2, label: "Vehicle Details", icon: Car },
                  { step: 3, label: "Payment", icon: CreditCard },
                ].map((s, index) => {
                  const isActive = step === s.step;
                  const isCompleted = step > s.step;
                  const Icon = s.icon;
                  return (
                    <div key={s.step} className="order-form-step-wrapper">
                      <div className="order-form-step">
                        <div
                          className={`order-form-step-circle ${
                            isActive ? "active" : ""
                          } ${isCompleted ? "completed" : ""}`}
                        >
                          {isCompleted ? (
                            <Check size={14} />
                          ) : (
                            <Icon size={16} />
                          )}
                        </div>
                        <span
                          className={`order-form-step-label ${
                            isActive ? "active" : ""
                          } ${isCompleted ? "completed" : ""}`}
                        >
                          {s.label}
                        </span>
                      </div>
                      {index < 2 && (
                        <div
                          className={`order-form-step-line ${
                            step > s.step ? "completed" : ""
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div
                className={`order-form-grid ${
                  showSidebar ? "with-sidebar" : "full-width"
                }`}
              >
                <div
                  className={
                    showSidebar ? "order-form-main" : "order-form-main-full"
                  }
                >
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      className="order-form-panel"
                    >
                      <div className="order-form-panel-header">
                        <div className="order-form-panel-header-icon">
                          <User size={20} className="text-white" />
                        </div>
                        <div>
                          <h4>Personal Information</h4>
                          <p>Enter your contact details to continue</p>
                        </div>
                      </div>

                      <div className="order-form-fields">
                        <div className="order-form-field">
                          <label>
                            Full Name <span>*</span>
                          </label>
                          <div className="order-form-input-wrap">
                            <User size={16} className="order-form-input-icon" />
                            <input
                              type="text"
                              placeholder="Enter your full name"
                              value={formData.fullName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  fullName: e.target.value,
                                })
                              }
                              className="order-form-input"
                            />
                          </div>
                        </div>

                        <div className="order-form-row">
                          <div className="order-form-field">
                            <label>
                              Phone Number <span>*</span>
                            </label>
                            <div className="order-form-input-wrap">
                              <Phone
                                size={16}
                                className="order-form-input-icon"
                              />
                              <input
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                  })
                                }
                                className="order-form-input"
                              />
                            </div>
                          </div>

                          <div className="order-form-field">
                            <label>
                              PAN Card <span>*</span>
                            </label>
                            <UploadTile
                              label="PAN card document"
                              sublabel="JPG, PNG or PDF"
                              icon={IdCardIcon}
                              preview={imagePreviews.idCard}
                              fileName={formData.idCardImage?.name}
                              compact
                              inline
                              onChange={(file) =>
                                handleImageUpload(
                                  "idCardImage",
                                  "idCard",
                                  file
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="order-form-security">
                          <div className="order-form-security-icon">
                            <ShieldCheck size={18} className="text-white" />
                          </div>
                          <div>
                            <div className="order-form-security-title">
                              Your information is safe and secure
                              <span className="order-form-security-badge">
                                <Check size={10} /> Encrypted
                              </span>
                            </div>
                            <p>
                              We use industry-standard encryption to protect
                              your data.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="order-form-actions">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          disabled={!isStepValid()}
                          className="order-form-continue"
                        >
                          <span>Continue</span>
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      className="order-form-vehicle-full"
                    >
                      <div className="order-form-vehicle-header">
                        <div className="order-form-vehicle-header-icon">
                          <Car size={20} className="text-white" />
                        </div>
                        <div>
                          <h4>Vehicle & Documents</h4>
                          <p>
                            Enter vehicle details and upload clear images of
                            your vehicle & RC
                          </p>
                        </div>
                      </div>

                      <div className="order-form-vehicle-fields">
                        <div className="order-form-vehicle-field">
                          <label>
                            Vehicle Number <span>*</span>
                          </label>
                          <div className="order-form-vehicle-input-wrap">
                            <Car
                              size={16}
                              className="order-form-vehicle-input-icon"
                            />
                            <input
                              type="text"
                              placeholder="e.g., KA01AB1234"
                              value={formData.vehicleNumber}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  vehicleNumber: e.target.value.toUpperCase(),
                                })
                              }
                              className="order-form-vehicle-input"
                            />
                          </div>
                        </div>

                        <div className="order-form-vehicle-field">
                          <label>
                            Vehicle Class <span>*</span>
                          </label>
                          <div className="order-form-select-wrap">
                            <select
                              value={formData.vehicleClass}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  vehicleClass: e.target.value,
                                })
                              }
                              className="order-form-vehicle-select"
                            >
                              <option value="Car/Jeep/Van">
                                Car / Jeep / Van
                              </option>
                              <option value="LCV">
                                Light Commercial Vehicle (LCV)
                              </option>
                              <option value="Bus/Truck">
                                Bus / 2-Axle Truck
                              </option>
                              <option value="Multi-Axle">
                                Multi-Axle Commercial Vehicle
                              </option>
                            </select>
                            <ChevronDown
                              size={16}
                              className="order-form-select-chevron"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="order-form-vehicle-docs">
                        <div className="order-form-vehicle-docs-header">
                          <div className="order-form-vehicle-docs-title">
                            <FileText size={15} className="text-[#59C71C]" />
                            <span>
                              Upload Documents <span className="upload-required">*</span>
                            </span>
                          </div>
                          <span className="order-form-vehicle-docs-hint">
                            Accepted formats: JPG, PNG, WEBP or PDF
                          </span>
                        </div>

                        <div className="order-form-vehicle-docs-grid">
                          <UploadTile
                            label="Vehicle Image"
                            sublabel="Front / Side view"
                            icon={Camera}
                            preview={imagePreviews.vehicle}
                            fileName={formData.vehicleImage?.name}
                            onChange={(file) =>
                              handleImageUpload(
                                "vehicleImage",
                                "vehicle",
                                file
                              )
                            }
                          />
                          <UploadTile
                            label="RC Front"
                            sublabel="Registration Certificate"
                            icon={FileText}
                            preview={imagePreviews.rcFront}
                            fileName={formData.rcFrontImage?.name}
                            onChange={(file) =>
                              handleImageUpload(
                                "rcFrontImage",
                                "rcFront",
                                file
                              )
                            }
                          />
                          <UploadTile
                            label="RC Back"
                            sublabel="Registration Certificate"
                            icon={FileText}
                            preview={imagePreviews.rcBack}
                            fileName={formData.rcBackImage?.name}
                            onChange={(file) =>
                              handleImageUpload("rcBackImage", "rcBack", file)
                            }
                          />
                        </div>
                      </div>

                      <div className="order-form-vehicle-actions">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="order-form-back-button"
                        >
                          <ArrowLeft size={16} />
                          <span>Back</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          disabled={!isStepValid()}
                          className="order-form-next-button order-form-next-button-lg"
                        >
                          <span>Next: Payment</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      className="payment-panel"
                    >
                      <div className="payment-header">
                        <div className="payment-header-icon">
                          <CreditCard size={18} className="text-[#59C71C]" />
                        </div>
                        <div>
                          <h4>Payment Method</h4>
                          <p>Choose your preferred payment method</p>
                        </div>
                      </div>

                      <div className="payment-methods-grid">
                        {[
                          {
                            id: "UPI",
                            label: "UPI",
                            icon: Wallet,
                            description: "GPay, PhonePe, Paytm",
                          },
                          {
                            id: "QR",
                            label: "QR Code",
                            icon: QrCode,
                            description: "Scan to pay",
                          },
                          {
                            id: "Card",
                            label: "Credit/Debit Card",
                            icon: CreditCard,
                            description: "Visa, Mastercard, RuPay",
                          },
                          {
                            id: "NetBanking",
                            label: "Net Banking",
                            icon: Building,
                            description: "All major banks",
                          },
                        ].map((method) => {
                          const Icon = method.icon;
                          const isSelected =
                            formData.paymentMethod === method.id;
                          return (
                            <button
                              type="button"
                              key={method.id}
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  paymentMethod: method.id,
                                })
                              }
                              className={`payment-method-card ${
                                isSelected ? "selected" : ""
                              }`}
                            >
                              <div
                                className={`payment-method-icon ${
                                  isSelected ? "selected" : ""
                                }`}
                              >
                                <Icon size={16} />
                              </div>
                              <div className="payment-method-info">
                                <p className="payment-method-label">
                                  {method.label}
                                </p>
                                <p className="payment-method-desc">
                                  {method.description}
                                </p>
                              </div>
                              <span
                                className={`payment-method-radio ${
                                  isSelected ? "selected" : ""
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>

                      <div className="payment-order-summary">
                        <div className="payment-order-summary-header">
                          <Tag size={14} className="text-[#59C71C]" />
                          <span>Order Summary</span>
                        </div>
                        <div className="payment-order-summary-rows">
                          <div className="payment-order-row">
                            <span>{productName}</span>
                            <span>₹{productPrice.toLocaleString()}</span>
                          </div>
                          <div className="payment-order-total">
                            <span>Total Amount</span>
                            <span>₹{productPrice.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="payment-actions">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          disabled={isSubmitting}
                          className="order-form-back-button"
                        >
                          <ArrowLeft size={14} />
                          <span>Back</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="order-form-next-button order-form-next-button-lg"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="animate-spin" size={15} />
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <CreditCard size={15} />
                              <span>Place Order</span>
                              <ArrowRight size={14} />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

                {showSidebar && (
                  <div className="order-form-sidebar">
                    {step === 1 && (
                      <OrderSummarySidebar
                        productName={productName}
                        productPrice={productPrice}
                        productImage={productImage}
                        productTagline={productTagline}
                      />
                    )}
                    {step === 3 && (
                      <ProductInfoSidebar
                        productName={productName}
                        productPrice={productPrice}
                        productImage={productImage}
                        productTagline={productTagline}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

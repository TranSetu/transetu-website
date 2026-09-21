"use client";

import { ShoppingCart, CreditCard, Car, MoveRight, Smartphone, Shield, Truck, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductOrderForm from "@/components/ProductOrderForm";
import FastagEnquiryModal from "@/components/FastagEnquiryModal";

export default function Products() {
  const [isFastagEnquiryOpen, setIsFastagEnquiryOpen] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState<"fastag" | "fastag-holder">("fastag");
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    price: number;
    image: string;
    tagline: string;
  } | null>(null);

  const products = [
    {
      name: "FASTag",
      tagline: "Cashless toll payments with instant deduction and seamless highway travel.",
      price: "₹500",
      numericPrice: 500,
      image: "/products/fastags.png",
      bestSeller: true,
      buttonText: "Buy FASTag",
      icon: CreditCard
    },
    {
      name: "FASTag Holder",
      tagline: "Durable and stylish transparent acrylic holder to protect your FASTag.",
      price: "₹150",
      numericPrice: 150,
      image: "/products/rfid-holders-new.png",
      bestSeller: false,
      buttonText: "Buy FASTag Holder",
      icon: Car
    },
    {
      name: "GPS Trackers",
      tagline: "Real-time AIS-140 certified vehicle tracking for safety, security, and fleet monitoring.",
      price: "₹10,500",
      numericPrice: 10500,
      image: "/products/gps-tracker.png",
      bestSeller: false,
      isComingSoon: true,
      href: "/product/gps-tracker",
      buttonText: "View Details",
      icon: Navigation
    }
  ];

  return (
    <section id="products" className="products-section">
      <div className="container">
        <motion.div
          className="products-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">OUR PRODUCTS</span>
          <h2 className="section-title">
            Smart <span className="text-highlight">Solutions</span> for Every Journey
          </h2>
          <p className="section-desc">
            Explore our range of products designed to make toll payments easier,
            monitor vehicles smarter, and keep your essentials in place.
          </p>
        </motion.div>

        <div className="products-grid">
          {products.map((product, index) => {
            const IconComponent = product.icon || ShoppingCart;
            
            return (
              <motion.div
                key={index}
                className="product-card-v2 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="product-image-container">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="product-display-img"
                    priority={index === 0}
                  />
                  {product.isComingSoon && (
                    <div className="coming-soon-badge">Coming Soon</div>
                  )}
                </div>

                <div className="product-details">
                  <div>
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.tagline}</p>
                  </div>

                  <div className="product-card-footer">
                    <span className="product-card-price">
                      {product.price}
                    </span>

                    {product.name === "GPS Trackers" ? (
                      <Link
                        href="/product/gps-tracker"
                        className="product-card-button"
                        aria-label="View details for GPS Trackers"
                      >
                        <IconComponent size={18} strokeWidth={2.2} />
                        <span>View Details</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          if (product.name === "FASTag") {
                            setSelectedProductType("fastag");
                            setIsFastagEnquiryOpen(true);
                          } else if (product.name === "FASTag Holder") {
                            setSelectedProductType("fastag-holder");
                            setIsFastagEnquiryOpen(true);
                          } else {
                            setSelectedProduct({
                              name: product.name,
                              price: product.numericPrice,
                              image: product.image,
                              tagline: product.tagline
                            });
                          }
                        }}
                        className={`product-card-button ${
                          product.name === "FASTag Holder"
                            ? "product-card-button-holder"
                            : ""
                        }`}
                        aria-label={`Buy ${product.name}`}
                      >
                        <IconComponent size={18} strokeWidth={2.2} />
                        <span>{product.buttonText}</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Process Banner */}
        <motion.div
          className="premium-fastag-banner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* LEFT SECTION: Dark Tunnel Automotive Theme */}
          <div className="banner-left-automotive">
            <Image
              src="/assets/Car_image.png"
              alt="FASTag Enabled Car"
              fill
              className="object-cover object-left"
            />
            
            {/* Animated Scanning Beam */}
            <div className="absolute inset-0 z-10 w-full h-full pointer-events-none overflow-hidden rounded-l-3xl">
              <motion.div
                className="relative w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="absolute left-0 w-full h-[1px] bg-[#59C71C] shadow-[0_0_8px_#59C71C]"
                  animate={{
                    top: ["0%", "95%", "0%"],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[4px] bg-[#59C71C]/30 blur-[2px]" />
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* RIGHT SECTION: Content and Steps */}
          <div className="banner-right-content">
            <div className="banner-flex-container">
              {/* Heading */}
              <div className="banner-heading-wrap">
                <h3>
                  Skip the line.<br />
                  Save time.<br />
                  <span>Travel more.</span>
                </h3>
              </div>

              {/* 3-Step Process Flow */}
              <div className="banner-steps-flow">
                {/* Step 1 */}
                <div className="banner-step-item">
                  <motion.div
                    className="banner-step-icon"
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <CreditCard size={26} />
                  </motion.div>
                  <div className="banner-step-text">
                    <span className="banner-step-num">01</span>
                    <p className="banner-step-label">Get Your FASTag</p>
                  </div>
                </div>

                <MoveRight className="banner-step-arrow" size={20} />

                {/* Step 2 */}
                <div className="banner-step-item">
                  <motion.div
                    className="banner-step-icon"
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <Car size={26} />
                  </motion.div>
                  <div className="banner-step-text">
                    <span className="banner-step-num">02</span>
                    <p className="banner-step-label">Drive Through</p>
                  </div>
                </div>

                <MoveRight className="banner-step-arrow" size={20} />

                {/* Step 3 */}
                <div className="banner-step-item">
                  <motion.div
                    className="banner-step-icon"
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <Shield size={26} strokeWidth={2.5} />
                  </motion.div>
                  <div className="banner-step-text">
                    <span className="banner-step-num">03</span>
                    <p className="banner-step-label">Pay Automatically</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FASTag / FASTag Holder Form Modal */}
      <FastagEnquiryModal
        isOpen={isFastagEnquiryOpen}
        onClose={() => setIsFastagEnquiryOpen(false)}
        type={selectedProductType}
      />

      {/* Product Order Form (Preserved for existing accessory workflows) */}
      {selectedProduct && (
        <ProductOrderForm
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          productName={selectedProduct.name}
          productPrice={selectedProduct.price}
          productImage={selectedProduct.image}
          productTagline={selectedProduct.tagline}
        />
      )}
    </section>
  );
}
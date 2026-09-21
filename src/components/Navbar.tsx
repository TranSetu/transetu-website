"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import OnboardingModal from "@/components/OnboardingModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Only run IntersectionObserver on the home page
    if (pathname === "/") {
      const sections = ["home", "products", "about"];
      const observers = sections.map((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  setActiveLink(sectionId);
                }
              });
            },
            { threshold: 0.5 } // Trigger when 50% of section is visible
          );
          observer.observe(element);
          return observer;
        }
        return null;
      });

      return () => {
        window.removeEventListener("scroll", handleScroll);
        observers.forEach((observer) => observer?.disconnect());
      };
    } else if (pathname.startsWith("/product")) {
      requestAnimationFrame(() => setActiveLink("products"));
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isMenuOpen]);

  return (
  <>
    <nav className={`navbar ${(mounted && isScrolled) ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="container">
        <Link href="/" className="nav-logo" onClick={() => handleLinkClick("home")}>
          <img src="/assets/Nav_logo.png" alt="Transetu" />
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          <Link
            href="/"
            className={`nav-link ${activeLink === "home" ? "active" : ""}`}
            onClick={() => handleLinkClick("home")}
          >
            Home
          </Link>
          <Link
            href="/#about"
            className={`nav-link ${activeLink === "about" ? "active" : ""}`}
            onClick={() => handleLinkClick("about")}
          >
            About Us
          </Link>
          <Link
            href="/#products"
            className={`nav-link ${activeLink === "products" ? "active" : ""}`}
            onClick={() => handleLinkClick("products")}
          >
            Products
          </Link>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="btn-onboarding"
            onClick={() => setIsOnboardingOpen(true)}
          >
            Onboarding
          </button>
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile Menu Overlay – NOW OUTSIDE .navbar */}
    <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
      <div className="mobile-menu-links">
        <Link
          href="/"
          className={`mobile-nav-link ${activeLink === "home" ? "active" : ""}`}
          onClick={() => handleLinkClick("home")}
        >
          Home
        </Link>
        <Link
          href="/#about"
          className={`mobile-nav-link ${activeLink === "about" ? "active" : ""}`}
          onClick={() => handleLinkClick("about")}
        >
          About Us
        </Link>
        <Link
          href="/#products"
          className={`mobile-nav-link ${activeLink === "products" ? "active" : ""}`}
          onClick={() => handleLinkClick("products")}
        >
          Products
        </Link>
        <button
          type="button"
          className="mobile-signup-btn"
          onClick={() => {
            setIsMenuOpen(false);
            setIsOnboardingOpen(true);
          }}
        >
          Onboarding
        </button>
      </div>
    </div>

    {/* Onboarding Multi-Step Modal */}
    <OnboardingModal
      isOpen={isOnboardingOpen}
      onClose={() => setIsOnboardingOpen(false)}
    />
  </>
);
}
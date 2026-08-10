// src/App.jsx
import React, { useState, useEffect } from 'react';
import { cmsDefault } from './data/cmsDefault';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import Facility from './components/Facility';

export default function App() {
  const [cmsData, setCmsData] = useState(() => {
    const local = localStorage.getItem("crystaraCMS");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        // Synchronize all static details with cmsDefault, keeping user inquiries
        const synchronized = {
          ...cmsDefault,
          inquiries: parsed.inquiries || cmsDefault.inquiries
        };
        localStorage.setItem("crystaraCMS", JSON.stringify(synchronized));
        return synchronized;
      } catch (e) {
        console.error("Failed to parse CMS data", e);
      }
    }
    // Fallback and initialize
    localStorage.setItem("crystaraCMS", JSON.stringify(cmsDefault));
    return cmsDefault;
  });

  const [activePage, setActivePage] = useState(() => {
    const path = window.location.pathname;
    if (path === "/contactus" || path === "/contactus/") return "contact";
    if (path === "/about" || path === "/about/") return "about";
    if (path === "/products" || path === "/products/") return "products";
    if (path === "/facility" || path === "/facility/") return "facility";
    return "home";
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track page scroll to style header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Synchronize SPA pages state on browser popstate (back/forward clicks)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/contactus" || path === "/contactus/") {
        setActivePage("contact");
      } else if (path === "/about" || path === "/about/") {
        setActivePage("about");
      } else if (path === "/products" || path === "/products/") {
        setActivePage("products");
      } else if (path === "/facility" || path === "/facility/") {
        setActivePage("facility");
      } else {
        setActivePage("home");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Update CMS data locally and in storage
  const handleCMSUpdate = (newData) => {
    localStorage.setItem("crystaraCMS", JSON.stringify(newData));
    setCmsData(newData);
  };

  // Add a new lead inquiry
  const handleInquirySubmit = (newInquiry) => {
    const updated = {
      ...cmsData,
      inquiries: [newInquiry, ...(cmsData.inquiries || [])]
    };
    handleCMSUpdate(updated);
  };


  // Switch tabs helper
  const navigateTo = (page, product = null) => {
    if (product) setSelectedProduct(product);
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL path dynamically using History pushState API
    let path = "/";
    if (page === "about") path = "/about";
    else if (page === "products") path = "/products";
    else if (page === "contact") path = "/contactus";
    else if (page === "facility") path = "/facility";

    window.history.pushState({ page }, "", path);
  };

  const phoneRaw = (cmsData.contact?.phone || "+91 76779 12567").replace(/\s+/g, "");
  const waRaw = (cmsData.contact?.whatsapp || "+91 70706 96936").replace(/[^0-9]/g, "");

  return (
    <div className={activePage === "admin" ? "admin-body" : ""}>
      
      {/* Dynamic Header */}
      {activePage !== "admin" && (
        <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="nav-container">
            <div className="logo-wrap">
              <a onClick={() => navigateTo("home")} style={{ cursor: 'pointer' }}>
                <i className="ri-drop-fill"></i>
                <span className="brand-name-val">{cmsData.brandName}</span>
              </a>
            </div>
            
            <nav className={`nav-links-container ${mobileMenuOpen ? 'active' : ''}`}>
              <ul>
                <li className={activePage === "home" ? "active" : ""}>
                  <a onClick={() => navigateTo("home")}>Home</a>
                </li>
                <li className={activePage === "about" ? "active" : ""}>
                  <a onClick={() => navigateTo("about")}>About Us</a>
                </li>
                <li className={activePage === "products" ? "active" : ""}>
                  <a onClick={() => navigateTo("products")}>Products</a>
                </li>
                <li className={activePage === "facility" ? "active" : ""}>
                  <a onClick={() => navigateTo("facility")}>Facility</a>
                </li>
                <li className={activePage === "contact" ? "active" : ""}>
                  <a onClick={() => navigateTo("contact")}>Contact Us</a>
                </li>
              </ul>
            </nav>

            <div className="header-cta">
              <a onClick={() => navigateTo("contact")} className="btn btn-outline btn-sm">Order Now</a>
              <a href={`tel:${phoneRaw}`} className="btn btn-primary btn-sm">
                <i className="ri-phone-fill"></i> Call Now
              </a>
            </div>

            <div 
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </header>
      )}

      {/* Main Pages Content */}
      <main>
        {activePage === "home" && (
          <Home 
            cms={cmsData} 
            navigateTo={navigateTo} 
          />
        )}
        {activePage === "about" && (
          <About 
            cms={cmsData} 
            navigateTo={navigateTo}
          />
        )}
        {activePage === "products" && (
          <Products 
            cms={cmsData} 
            navigateTo={navigateTo} 
          />
        )}
        {activePage === "facility" && (
          <Facility 
            cms={cmsData} 
            navigateTo={navigateTo}
          />
        )}
        {activePage === "contact" && (
          <Contact 
            cms={cmsData} 
            selectedProduct={selectedProduct} 
            setSelectedProduct={setSelectedProduct}
            onInquirySubmit={handleInquirySubmit}
          />
        )}
      </main>

      {/* Shared Footer */}
      {activePage !== "admin" && (
        <footer className="main-footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo-wrap">
                <a onClick={() => navigateTo("home")} style={{ cursor: 'pointer' }}>
                  <i className="ri-drop-fill"></i>
                  <span className="brand-name-val">{cmsData.brandName}</span>
                </a>
              </div>
              <p>
                Premium packaged drinking water purified using advanced multi-stage technology. Certified purity, consistent taste, and plastic neutrality.
              </p>
              <div className="footer-socials">
                <a href={cmsData.socials?.facebook || "#"} target="_blank" rel="noreferrer" aria-label="Facebook"><i className="ri-facebook-fill"></i></a>
                <a href={cmsData.socials?.instagram || "#"} target="_blank" rel="noreferrer" aria-label="Instagram"><i className="ri-instagram-line"></i></a>
                <a href={cmsData.socials?.linkedin || "#"} target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="ri-linkedin-fill"></i></a>
              </div>
            </div>
            
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><a onClick={() => navigateTo("home")}>Home</a></li>
                <li><a onClick={() => navigateTo("about")}>About Us</a></li>
                <li><a onClick={() => navigateTo("products")}>Products & Catalog</a></li>
                <li><a onClick={() => navigateTo("facility")}>Facility</a></li>
                <li><a onClick={() => navigateTo("contact")}>Contact Us</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h3>Offerings</h3>
              <ul>
                <li><a onClick={() => navigateTo("products")}>250ml Petit Carafe</a></li>
                <li><a onClick={() => navigateTo("products")}>500ml Daily Elegance</a></li>
                <li><a onClick={() => navigateTo("products")}>1L Active Reserve</a></li>
                <li><a onClick={() => navigateTo("products")}>2L Family Banquet</a></li>
              </ul>
            </div>

            <div className="footer-links footer-contact">
              <h3>Contact Us</h3>
              <ul>
                <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <i className="ri-map-pin-2-fill" style={{ marginTop: '3px' }}></i>
                  <span style={{ whiteSpace: 'pre-line' }}>{cmsData.contact?.address}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <i className="ri-phone-fill" style={{ marginTop: '3px' }}></i>
                  <div>
                    <div><a href={`tel:${(cmsData.contact?.phone || "").replace(/\s+/g, "")}`}>{cmsData.contact?.phone}</a></div>
                    {cmsData.contact?.phone2 && (
                      <div style={{ marginTop: '4px' }}>
                        <a href={`tel:${(cmsData.contact?.phone2 || "").replace(/\s+/g, "")}`}>{cmsData.contact?.phone2}</a>
                      </div>
                    )}
                  </div>
                </li>
                {cmsData.contact?.email && (
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <i className="ri-mail-fill" style={{ marginTop: '3px' }}></i>
                    <span><a href={`mailto:${cmsData.contact?.email}`}>{cmsData.contact?.email}</a></span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 {cmsData.brandName} Packaged Drinking Water. All Rights Reserved.</p>
            <p>
              <span>{cmsData.supportDuration}</span> &bull; 
              <a href="#" style={{ marginLeft: '5px' }}>Privacy Policy</a> &bull; 
              <a href="#" style={{ marginLeft: '5px' }}>Terms of Service</a>
            </p>
          </div>
        </footer>
      )}



    </div>
  );
}

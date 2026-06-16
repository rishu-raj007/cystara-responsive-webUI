// src/components/Home.jsx
import React, { useState } from 'react';
import ScrollSequence from './ScrollSequence';

export default function Home({ cms, navigateTo }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    business: '',
    message: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Map id like contact-name to name
    const fieldName = id.replace('contact-', '');
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, business, message } = formData;
    
    if (!name || !phone || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    const newInquiry = {
      id: Date.now(),
      name,
      phone,
      email,
      business: business || "Direct Consumer",
      message,
      date: new Date().toISOString().split("T")[0]
    };

    // Save to localStorage directly to update CMS inquiries state
    const local = localStorage.getItem("crystaraCMS");
    if (local) {
      const parsed = JSON.parse(local);
      if (!parsed.inquiries) parsed.inquiries = [];
      parsed.inquiries.unshift(newInquiry);
      localStorage.setItem("crystaraCMS", JSON.stringify(parsed));
      
      // Force trigger state sync in App.jsx if needed, or it will sync on reload
      // But to be clean we just let it update. We will also reload or trigger parent reload if we want.
      // E.g., if there's no parent hook, it still saves correctly.
      if (window.location.reload && false) {
        // we can reload, but a state update is cleaner.
      }
    }

    setShowSuccess(true);
    setFormData({
      name: '',
      phone: '',
      email: '',
      business: '',
      message: ''
    });
  };

  return (
    <div>
      {/* 1. Immersive Scroll Sequence Header */}
      <ScrollSequence cms={cms} navigateTo={navigateTo} />

      {/* 2. Company Introduction */}
      <section className="section-padding" style={{ backgroundColor: "var(--color-dark-bg)", position: "relative", zIndex: 10 }}>
        <div className="container">
          <div className="about-intro-grid">
            <div className="scroll-reveal" style={{ opacity: 1, transform: "none" }}>
              <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
                Advanced Purification
              </div>
              <h2 style={{ fontSize: "3.5rem", lineLight: "1.1", marginBottom: "2rem" }} className="text-gradient">
                {cms.home.companyIntroTitle}
              </h2>
              <p style={{ fontSize: "1.1rem", lineLight: "1.8", color: "var(--color-text-muted)", fontWeight: 300 }}>
                {cms.home.companyIntroText}
              </p>
              <button onClick={() => navigateTo("about")} className="btn btn-outline" style={{ marginTop: "2rem" }}>
                Read Our Full Story
              </button>
            </div>
            <div className="scroll-reveal" style={{ position: "relative", borderRadius: "30px", overflow: "hidden", border: "1px solid var(--glass-border)", boxShadow: "var(--glass-shadow)", height: "450px", opacity: 1, transform: "none" }}>
              <img src="https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80" alt="Crystara Purification" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: "30px", left: "30px", background: "var(--glass-bg)", backdropFilter: "blur(10px)", padding: "1.5rem 2rem", borderRadius: "16px", border: "1px solid var(--glass-border)" }}>
                <h4 style={{ fontFamily: "var(--font-body)", color: "#fff", marginBottom: "5px" }}>Multi-Stage Purified</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", margin: 0, textAlign: "left" }}>100% pure and safe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. USPS Section */}
      <section className="section-padding usps-section" style={{ position: "relative", zIndex: 10 }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
              Unique Selling Points
            </div>
            <h2 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }} className="text-gradient">Purity in Every Drop</h2>
            <p className="lead">Why Crystara is the trusted hydration choice for homes, offices, travel, and premium venues.</p>
          </div>
          
          <div className="usp-grid" id="usp-grid-container">
            {(cms.home.usps || []).map((usp) => (
              <div key={usp.id} className="usp-card scroll-reveal" style={{ opacity: 1, transform: "none" }}>
                <div className="usp-icon-wrap">
                  <i className={usp.icon || "ri-checkbox-circle-line"}></i>
                </div>
                <h3>{usp.title}</h3>
                <p>{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Services Overview */}
      <section className="section-padding" style={{ backgroundColor: "var(--color-dark-bg)", position: "relative", zIndex: 10 }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
              Our Distribution Network
            </div>
            <h2 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }} className="text-gradient">Bespoke Hydration Services</h2>
            <p className="lead">We provide seamless mineral water logistics to high-end venues, luxury weddings, residences, and corporate centers.</p>
          </div>
          
          <div className="services-grid">
            {(cms.services || []).map((srv, idx) => (
              <div key={idx} className="service-card scroll-reveal" style={{ opacity: 1, transform: "none" }}>
                <i className={srv.icon || "ri-water-flash-fill"}></i>
                <h3>{srv.title}</h3>
                <p>{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Industries Served */}
      <section className="section-padding industries-section" style={{ position: "relative", zIndex: 10 }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
              Tailored Execution
            </div>
            <h2 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }} className="text-gradient">Industries We Elevate</h2>
            <p className="lead">Sustaining premium quality standards across diverse environments.</p>
          </div>
          
          <div className="industries-grid">
            {(cms.home.industries || []).map((ind) => (
              <div key={ind.id} className="industry-card scroll-reveal" style={{ opacity: 1, transform: "none" }}>
                <div className="ind-img-wrap">
                  <img src={ind.img} alt={ind.name} loading="lazy" />
                </div>
                <div className="ind-content">
                  <h3>{ind.name}</h3>
                  <p>{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="section-padding testimonials-section" style={{ position: "relative", zIndex: 10 }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
              Client Reviews
            </div>
            <h2 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }} className="text-gradient">Endorsed by Excellence</h2>
            <p className="lead">Hear from elite F&B directors, wellness experts, and retail partners.</p>
          </div>
          
          <div className="testimonials-slider">
            {(cms.testimonials || []).map((t) => (
              <div key={t.id} className="testimonial-card scroll-reveal" style={{ opacity: 1, transform: "none" }}>
                <div className="quote-icon"><i className="ri-double-quotes-l"></i></div>
                <p className="test-text">"{t.text}"</p>
                <div className="test-meta">
                  <span className="test-name">{t.name}</span>
                  <span className="test-role">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Trust Indicators */}
      <section className="trust-indicators" style={{ position: "relative", zIndex: 10 }}>
        <div className="container">
          <div className="trust-flex">
            <div className="trust-item">
              <h4>10+</h4>
              <p>Years of Quality Excellence</p>
            </div>
            <div className="trust-item">
              <h4>25k+</h4>
              <p>Satisfied Customers</p>
            </div>
            <div className="trust-item">
              <h4>100%</h4>
              <p>Quality Assured</p>
            </div>
            <div className="trust-item">
              <h4>4+</h4>
              <p>Quality Certifications</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Lead Capture Section */}
      <section className="section-padding" style={{ backgroundColor: "var(--color-dark-bg)", position: "relative", zIndex: 10 }}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-panel scroll-reveal" style={{ opacity: 1, transform: "none" }}>
              <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
                Instant Enquiry
              </div>
              <h2 className="text-gradient">Ready to Experience Crystara?</h2>
              <p className="intro">
                Submit your distribution request, bulk business inquiry, or corporate trial requests. Our hydration representatives will respond within 2-4 hours.
              </p>
              <div className="contact-details-list">
                <div className="detail-item">
                  <div className="detail-icon-wrap"><i className="ri-phone-fill"></i></div>
                  <div className="detail-text">
                    <h3>Call Our Supply Desk</h3>
                    <p><a href={`tel:${cms.contact?.phone.replace(/\s+/g, "")}`}>{cms.contact?.phone}</a></p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon-wrap"><i className="ri-mail-open-fill"></i></div>
                  <div className="detail-text">
                    <h3>Email Customer Care</h3>
                    <p><a href={`mailto:${cms.contact?.email}`}>{cms.contact?.email}</a></p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon-wrap"><i className="ri-time-fill"></i></div>
                  <div className="detail-text">
                    <h3>Office Operating Hours</h3>
                    <p>{cms.contact?.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-card scroll-reveal" style={{ opacity: 1, transform: "none" }}>
              <div className="form-title">
                <h2>Start a Connection</h2>
                <p>Fill out the fields below and our logistic desks will connect with you.</p>
              </div>
              <form onSubmit={handleFormSubmit} className="contact-form">
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input 
                      type="text" 
                      id="contact-name" 
                      className="form-control" 
                      placeholder="Aarav Sharma" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-phone">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="contact-phone" 
                      className="form-control" 
                      placeholder="+91 98765 43210" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input 
                      type="email" 
                      id="contact-email" 
                      className="form-control" 
                      placeholder="aarav@imperialhotel.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-business">Business Name (Optional)</label>
                    <input 
                      type="text" 
                      id="contact-business" 
                      className="form-control" 
                      placeholder="The Imperial Hotel" 
                      value={formData.business}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Enquiry Message *</label>
                  <textarea 
                    id="contact-message" 
                    className="form-control" 
                    placeholder="Interested in bulk hotel delivery options..." 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}>
                  Submit Inquiry <i className="ri-send-plane-fill"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div className="custom-success-modal active">
          <div className="success-modal-content">
            <div className="success-icon-wrap"><i className="ri-checkbox-circle-fill"></i></div>
            <h2>Inquiry Received</h2>
            <p>Your details have been registered. Our hydration desk will call you shortly.</p>
            <button onClick={() => setShowSuccess(false)} className="btn btn-primary">Close</button>
          </div>
        </div>
      )}

    </div>
  );
}

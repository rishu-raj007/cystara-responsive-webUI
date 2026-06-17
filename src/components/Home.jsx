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

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Map id like contact-name to name
    const fieldName = id.replace('contact-', '');
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    // Clear error when user types
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Enquiry Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const whatsappNumber = "917070696936";
    const whatsappMessage = `Hello Crystara,

New Enquiry Details:

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'Not Provided'}
Business Name: ${formData.business || 'Not Provided'}
Message: ${formData.message}

Please contact me regarding packaged drinking water requirements.`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank"
    );

    // Reset Form
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
                <h4 style={{ fontFamily: "var(--font-body)", color: "#fff", marginBottom: "5px" }}>Make Pure Hydration Direct</h4>
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
              
              <div className="contact-details-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="detail-card-custom" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '2rem', borderRadius: '20px', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', boxShadow: 'var(--glass-shadow)' }}>
                  <div className="detail-icon-wrap" style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid var(--color-ice-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-water-primary)', fontSize: '1.3rem', flexShrink: 0 }}>
                    <i className="ri-phone-fill"></i>
                  </div>
                  <div className="detail-text">
                    <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.6rem', fontFamily: 'var(--font-body)' }}>Call Our Supply Desk</h3>
                    <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-text-muted)', fontWeight: 300, lineHeight: 1.6 }}>
                      <a href="tel:+917677912567" style={{ display: 'block', color: 'var(--color-text-muted)' }} className="hover-link">+91 76779 12567</a>
                      <a href="tel:+917070696936" style={{ display: 'block', color: 'var(--color-text-muted)', marginTop: '4px' }} className="hover-link">+91 70706 96936</a>
                    </p>
                  </div>
                </div>

                <div className="detail-card-custom" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '2rem', borderRadius: '20px', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', boxShadow: 'var(--glass-shadow)' }}>
                  <div className="detail-icon-wrap" style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid var(--color-ice-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-water-primary)', fontSize: '1.3rem', flexShrink: 0 }}>
                    <i className="ri-map-pin-2-fill"></i>
                  </div>
                  <div className="detail-text">
                    <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.6rem', fontFamily: 'var(--font-body)' }}>Contact Address</h3>
                    <p style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 300, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                      C10, Nalanda Green City{"\n"}
                      Baliyapur Hirak Road, Near JP Hospital{"\n"}
                      Dhanbad, Jharkhand - 826005
                    </p>
                  </div>
                </div>

                <div className="detail-card-custom" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '2rem', borderRadius: '20px', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', boxShadow: 'var(--glass-shadow)' }}>
                  <div className="detail-icon-wrap" style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid var(--color-ice-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-water-primary)', fontSize: '1.3rem', flexShrink: 0 }}>
                    <i className="ri-shield-check-fill"></i>
                  </div>
                  <div className="detail-text">
                    <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.6rem', fontFamily: 'var(--font-body)' }}>Manufacturer Details</h3>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-muted)', fontWeight: 300, lineHeight: 1.6 }}>
                      <strong>Facility:</strong> Shital Pet Industries<br />
                      <strong>Certifications:</strong> FSSAI, BIS &amp; ISI Certified<br />
                      <span style={{ display: 'block', marginTop: '0.5rem', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--color-water-light)' }}>
                        GST registered and the first packaged drinking water plant in Dhanbad, running for over 18 years.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-card scroll-reveal" style={{ opacity: 1, transform: "none" }}>
              <div className="form-title">
                <h2>Start a Connection</h2>
                <p>Fill out the fields below and our logistic desks will connect with you.</p>
              </div>
              <form onSubmit={handleFormSubmit} className="contact-form" noValidate>
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input 
                      type="text" 
                      id="contact-name" 
                      className="form-control" 
                      placeholder="Your Full Name" 
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && <span className="error-message" style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem', fontWeight: 500 }}>{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-phone">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="contact-phone" 
                      className="form-control" 
                      placeholder="Your Mobile Number" 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    {errors.phone && <span className="error-message" style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem', fontWeight: 500 }}>{errors.phone}</span>}
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address</label>
                    <input 
                      type="email" 
                      id="contact-email" 
                      className="form-control" 
                      placeholder="your@email.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-business">Business Name</label>
                    <input 
                      type="text" 
                      id="contact-business" 
                      className="form-control" 
                      placeholder="Hotel / Shop / Distributor Name" 
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
                    placeholder="Tell us your requirement, quantity, delivery location, or dealership enquiry..." 
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.message && <span className="error-message" style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem', fontWeight: 500 }}>{errors.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}>
                  Submit Enquiry <i className="ri-send-plane-fill"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}

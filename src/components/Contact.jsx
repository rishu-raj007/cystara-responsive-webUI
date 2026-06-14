// src/components/Contact.jsx
import React, { useState, useEffect } from 'react';

export default function Contact({ cms, selectedProduct, setSelectedProduct, onInquirySubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    business: '',
    message: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Prepopulate message if product selected
  useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        message: `Hello, I am interested in ordering/inquiring about: ${selectedProduct}. Please share bulk pricing details.`
      }));
    }
  }, [selectedProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
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

    // Callback to App.jsx to register inquiry
    onInquirySubmit(newInquiry);

    // Reset Form & show success modal
    setShowSuccess(true);
    setFormData({
      name: '',
      phone: '',
      email: '',
      business: '',
      message: ''
    });
    if (setSelectedProduct) {
      setSelectedProduct(null); // Clear active selection
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="products-hero" style={{ height: "30vh" }}>
        <div className="container" style={{ padding: "0 2rem", textAlign: "center" }}>
          <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "0.8rem" }}>
            Get In Touch
          </div>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }} className="text-gradient">
            Contact Our Supply Desk
          </h1>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section-padding" style={{ backgroundColor: "var(--color-dark-bg)" }}>
        <div className="container">
          <div className="contact-grid">
            
            {/* Left Column: Details */}
            <div className="contact-info-panel scroll-reveal" style={{ opacity: 1, transform: "none" }}>
              <h2>Connect with JustAmrit</h2>
              <p className="intro">
                Whether you are a retailer, a five-star hotel director, or an individual seeking premium home hydration, we want to hear from you.
              </p>
              
              <div className="contact-details-list">
                <div className="detail-item">
                  <div className="detail-icon-wrap"><i className="ri-map-pin-2-fill"></i></div>
                  <div className="detail-text">
                    <h3>Head Office Address</h3>
                    <p>{cms.contact?.address}</p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon-wrap"><i className="ri-phone-fill"></i></div>
                  <div className="detail-text">
                    <h3>Supply & Support Hotlines</h3>
                    <p>
                      <a href={`tel:${cms.contact?.phone.replace(/\s+/g, "")}`}>{cms.contact?.phone}</a>
                    </p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon-wrap"><i className="ri-mail-fill"></i></div>
                  <div className="detail-text">
                    <h3>Commercial & Press Email</h3>
                    <p>
                      <a href={`mailto:${cms.contact?.email}`}>{cms.contact?.email}</a>
                    </p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon-wrap"><i className="ri-time-fill"></i></div>
                  <div className="detail-text">
                    <h3>Administrative Hours</h3>
                    <p>{cms.contact?.hours}</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "2rem" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#fff", fontFamily: "var(--font-body)" }}>Follow Our Journey</h3>
                <div style={{ display: "flex", gap: "15px" }}>
                  <a href={cms.socials?.instagram} target="_blank" rel="noreferrer" style={{ width: "45px", height: "45px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", border: "1px solid var(--glass-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                    <i className="ri-instagram-line"></i>
                  </a>
                  <a href={cms.socials?.facebook} target="_blank" rel="noreferrer" style={{ width: "45px", height: "45px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", border: "1px solid var(--glass-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                    <i className="ri-facebook-fill"></i>
                  </a>
                  <a href={cms.socials?.linkedin} target="_blank" rel="noreferrer" style={{ width: "45px", height: "45px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", border: "1px solid var(--glass-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                    <i className="ri-linkedin-fill"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="contact-form-card scroll-reveal" style={{ opacity: 1, transform: "none" }}>
              <div className="form-title">
                <h2>Direct Inquiry Form</h2>
                <p>Register your distribution or delivery requests below.</p>
              </div>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="form-control" 
                      placeholder="Aarav Sharma" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
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
                    <label htmlFor="email">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="form-control" 
                      placeholder="aarav@imperialhotel.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="business">Business Name (Optional)</label>
                    <input 
                      type="text" 
                      id="business" 
                      name="business" 
                      className="form-control" 
                      placeholder="The Imperial Hotel" 
                      value={formData.business}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Enquiry Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    className="form-control" 
                    placeholder="Interested in scheduling weekly water delivery..." 
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

      {/* Google Maps Embed Section */}
      <section className="google-maps-section" style={{ backgroundColor: "var(--color-dark-bg)" }}>
        <div className="container">
          <div className="map-wrapper">
            <iframe 
              title="JustAmrit Location map"
              src={cms.contact?.gmapsEmbed}
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div className="custom-success-modal active">
          <div className="success-modal-content">
            <div className="success-icon-wrap"><i className="ri-checkbox-circle-fill"></i></div>
            <h2>Inquiry Submitted Successfully</h2>
            <p>Thank you for connecting. Our distribution support team will email or call you within 2-4 business hours.</p>
            <button onClick={() => setShowSuccess(false)} className="btn btn-primary">Close</button>
          </div>
        </div>
      )}

    </div>
  );
}

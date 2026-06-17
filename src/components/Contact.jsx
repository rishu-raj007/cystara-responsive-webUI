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

  const [errors, setErrors] = useState({});

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
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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

  const handleSubmit = (e) => {
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
              <h2>Connect with {cms.brandName}</h2>
              <p className="intro">
                Whether you are a retailer, a five-star hotel director, or an individual seeking premium home hydration, we want to hear from you.
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
                    <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.6rem', fontFamily: 'var(--font-body)' }}>Manufacturing Unit</h3>
                    <p style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 300, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                      Shital Pet Industries{"\n"}
                      Bhitia, Kandra Industrial Area{"\n"}
                      Dhanbad - 828109{"\n"}
                      Jharkhand
                    </p>
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
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="form-control" 
                      placeholder="Your Full Name" 
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && <span className="error-message" style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem', fontWeight: 500 }}>{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
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
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="form-control" 
                      placeholder="your@email.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="business">Business Name</label>
                    <input 
                      type="text" 
                      id="business" 
                      name="business" 
                      className="form-control" 
                      placeholder="Hotel / Shop / Distributor Name" 
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

      {/* Google Maps Embed Section */}
      <section className="google-maps-section" style={{ backgroundColor: "var(--color-dark-bg)" }}>
        <div className="container">
          <div className="map-wrapper">
            <iframe 
              title={`${cms.brandName} Location map`}
              src={cms.contact?.gmapsEmbed}
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>



    </div>
  );
}

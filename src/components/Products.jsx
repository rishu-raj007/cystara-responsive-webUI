// src/components/Products.jsx
import React, { useState } from 'react';

export default function Products({ cms, navigateTo }) {
  const [activeFaqIdx, setActiveFaqIdx] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaqIdx(prev => prev === index ? null : index);
  };

  return (
    <div>
      {/* 1. Hero */}
      <section className="products-hero">
        <div className="container" style={{ padding: "0 2rem", textAlign: "center" }}>
          <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
            Product Catalog
          </div>
          <h1 style={{ fontSize: "4rem", marginBottom: "1.5rem" }} className="text-gradient">
            Hydration for Every Table
          </h1>
          <p className="lead" style={{ margin: "0 auto" }}>
            Explore our curated range of premium mineral spring waters. Available in luxury glass and high-grade BPA-free PET packaging.
          </p>
        </div>
      </section>

      {/* 2. Product Detail Cards */}
      <section className="section-padding" style={{ backgroundColor: "var(--color-dark-bg)" }}>
        <div className="container">
          <div className="products-grid">
            {(cms.products || []).map((p) => (
              <div key={p.id} className="product-detail-card scroll-reveal" id={`prod-card-${p.id}`} style={{ opacity: 1, transform: "none" }}>
                <div className="prod-img-box">
                  <img src={p.img} alt={p.name} loading="lazy" />
                  <div className="prod-category">{p.category}</div>
                </div>
                <div className="prod-info-box">
                  <h3>{p.name}</h3>
                  <p className="prod-desc">{p.desc}</p>
                  <div className="prod-specs-box">
                    {Object.entries(p.specs || {}).map(([key, val]) => (
                      <div key={key} className="spec-row">
                        <span className="spec-label">{key}:</span>
                        <span className="spec-value">{val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="prod-footer">
                    <span className="prod-price">{p.price}</span>
                    <button 
                      onClick={() => navigateTo("contact", p.name)} 
                      className="btn btn-primary btn-sm"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Comparison Table */}
      <section className="section-padding comparison-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
              Side-By-Side
            </div>
            <h2 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }} className="text-gradient">Product Comparison</h2>
            <p className="lead">Select the perfect capacity to fit your daily lifestyle or commercial operation.</p>
          </div>

          <div className="table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Product Sizing</th>
                  <th>Volume</th>
                  <th>pH Balance</th>
                  <th>TDS Level</th>
                  <th>Packaging Format</th>
                  <th>Price Tag</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="comparison-table-body">
                {(cms.products || []).map((p) => (
                  <tr key={p.id}>
                    <td className="comp-item-name"><strong>{p.name}</strong></td>
                    <td>{p.specs?.Volume || "-"}</td>
                    <td>{p.specs?.["pH Level"] || "-"}</td>
                    <td>{p.specs?.TDS || "-"}</td>
                    <td>{p.specs?.Packaging || "-"}</td>
                    <td className="comp-price">{p.price}</td>
                    <td>
                      <button 
                        onClick={() => navigateTo("contact", p.name)} 
                        className="btn btn-outline btn-xs"
                      >
                        Inquire
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Logistic Services List */}
      <section className="section-padding" style={{ backgroundColor: "var(--color-dark-bg)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
              Corporate & Retail
            </div>
            <h2 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }} className="text-gradient">Service Offerings</h2>
            <p className="lead">Tailored delivery contracts for retail networks, hotels, weddings, and homes.</p>
          </div>

          <div className="services-grid">
            {(cms.services || []).map((srv, idx) => (
              <div key={idx} className="service-card">
                <i className={srv.icon || "ri-water-flash-fill"}></i>
                <h3>{srv.title}</h3>
                <p>{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQs Accordion */}
      <section className="section-padding comparison-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
              Common Queries
            </div>
            <h2 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }} className="text-gradient">Frequently Asked Questions</h2>
            <p className="lead">Get details on water sourcing, purity guidelines, custom label branding, and logistics.</p>
          </div>

          <div className="faq-accordion">
            {(cms.faqs || []).map((faq, idx) => {
              const isOpen = activeFaqIdx === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                  <button 
                    className="faq-question" 
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(idx)}
                  >
                    <span>{faq.q}</span>
                    <i className="ri-arrow-down-s-line"></i>
                  </button>
                  <div 
                    className="faq-answer"
                    style={{ 
                      maxHeight: isOpen ? "200px" : "0px",
                      transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                  >
                    <p>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

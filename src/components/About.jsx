// src/components/About.jsx
import React from 'react';

export default function About({ cms, navigateTo }) {
  return (
    <div>
      {/* 1. Hero Title Banner */}
      <section className="about-hero">
        <div className="container" style={{ padding: "0 2rem" }}>
          <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
            About JustAmrit
          </div>
          <h1 style={{ fontSize: "4rem", marginBottom: "1.5rem" }} className="text-gradient">
            Preserving Nature's Elixir
          </h1>
          <p style={{ maxWidth: "600px", color: "var(--color-text-muted)", fontSize: "1.2rem", fontWeight: 300 }}>
            Dedicated to harvesting, bottling, and distributing pure alkaline mineral water directly from deep Himalayan aquifers.
          </p>
        </div>
      </section>

      {/* 2. Company Story */}
      <section className="section-padding" style={{ backgroundColor: "var(--color-dark-bg)" }}>
        <div className="container">
          <div className="about-intro-grid">
            <div>
              <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
                Our Heritage
              </div>
              <h2 style={{ fontSize: "3rem", lineLight: "1.2", marginBottom: "2.5rem" }} className="text-gradient">
                {cms.about.storyTitle}
              </h2>
              <p style={{ fontSize: "1.1rem", lineLight: "1.8", color: "var(--color-text-muted)", fontWeight: 300 }}>
                {cms.about.storyText}
              </p>
            </div>
            <div style={{ position: "relative", borderRadius: "30px", overflow: "hidden", border: "1px solid var(--glass-border)", height: "400px" }}>
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80" alt="Himalayan spring peaks" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="mv-grid">
            <div className="mv-card">
              <i className="ri-compass-3-line"></i>
              <h3>Our Mission</h3>
              <p>{cms.about.mission}</p>
            </div>
            <div className="mv-card">
              <i className="ri-eye-line"></i>
              <h3>Our Vision</h3>
              <p>{cms.about.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="section-padding usps-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
              Guiding Principles
            </div>
            <h2 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }} className="text-gradient">Core Values</h2>
            <p className="lead">The foundational principles governing our operations, stewardship, and supply lines.</p>
          </div>

          <div className="usp-grid">
            {(cms.about.coreValues || []).map((val, idx) => (
              <div key={idx} className="usp-card" style={{ padding: "2.5rem 1.5rem" }}>
                <div className="usp-icon-wrap" style={{ width: "60px", height: "60px", fontSize: "1.6rem" }}>
                  <i className="ri-heart-line"></i>
                </div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Manufacturing Process */}
      <section className="section-padding process-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
              Technical Operations
            </div>
            <h2 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }} className="text-gradient">Our Manufacturing Process</h2>
            <p className="lead">How we extract, filter, test, and bottle our spring water untouched by human hands.</p>
          </div>

          <div className="process-steps-wrap">
            {(cms.about.process || []).map((step, idx) => (
              <div key={idx} className="process-step">
                <div className="step-num">{step.step}</div>
                <div className="step-details">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Behind the Scenes Gallery */}
      <section className="section-padding" style={{ backgroundColor: "var(--color-dark-bg)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
              Visual Showcase
            </div>
            <h2 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }} className="text-gradient">Behind-The-Scenes</h2>
            <p className="lead">A glance inside our clean-room packaging facilities and source catchments.</p>
          </div>

          <div className="bts-gallery-grid">
            {(cms.about.gallery || []).map((item, idx) => (
              <div key={idx} className="gallery-item">
                <img src={item.img} alt={item.title} loading="lazy" />
                <div className="gallery-overlay">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Certifications Section */}
      <section className="section-padding process-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>
              Compliance Standards
            </div>
            <h2 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }} className="text-gradient">Quality Certifications</h2>
            <p className="lead">JustAmrit complies with all major food safety and manufacturing regulations globally.</p>
          </div>

          <div className="certifications-grid">
            {(cms.about.certifications || []).map((c, idx) => (
              <div key={idx} className="cert-card">
                <div className="cert-icon-wrap"><i className="ri-award-fill"></i></div>
                <h3>{c.name}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Sustainability Commitments */}
      <section className="section-padding" style={{ backgroundColor: "var(--color-dark-bg)" }}>
        <div className="container">
          <div className="cta-banner">
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1.5rem" }}>
              Ecological Stewardship
            </div>
            <h2 className="text-gradient">200% Plastic Neutrality</h2>
            <p style={{ maxWidth: "800px", margin: "0 auto 3rem", color: "var(--color-text-muted)", fontSize: "1.1rem", fontWeight: 300, lineHeight: "1.7" }}>
              {cms.about.sustainability}
            </p>
            <button onClick={() => navigateTo("contact")} className="btn btn-primary">Partner With Us</button>
          </div>
        </div>
      </section>
    </div>
  );
}

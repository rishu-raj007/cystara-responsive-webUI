// src/components/Facility.jsx
import React from 'react';

export default function Facility({ cms, navigateTo }) {
  return (
    <div>
      {/* Hero Banner */}
      <section className="products-hero" style={{ height: "35vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="container" style={{ padding: "0 2rem", textAlign: "center" }}>
          <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "0.8rem" }}>
            State-Of-The-Art Operations
          </div>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }} className="text-gradient">
            Our Manufacturing Facility
          </h1>
          <p style={{ maxWidth: "600px", margin: "0.5rem auto 0", color: "var(--color-text-muted)", fontSize: "1.1rem", fontWeight: 300 }}>
            Purity and precision bottled at the source under certified, state-of-the-art cleanroom standards.
          </p>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="section-padding" style={{ backgroundColor: "var(--color-dark-bg)" }}>
        <div className="container" style={{ maxWidth: "900px", padding: "0 2rem" }}>
          
          <div className="detail-card-custom" style={{ 
            background: 'var(--glass-bg)', 
            border: '1px solid var(--glass-border)', 
            padding: '3.5rem 3rem', 
            borderRadius: '24px', 
            display: 'flex', 
            flexDirection: 'column',
            gap: '2.5rem', 
            alignItems: 'center', 
            textAlign: 'center',
            boxShadow: 'var(--glass-shadow)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Ambient background glow effect */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              right: '-50%',
              bottom: '-50%',
              background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0
            }}></div>

            <div className="detail-icon-wrap" style={{ 
              width: '90px', 
              height: '90px', 
              borderRadius: '50%', 
              background: 'rgba(14, 165, 233, 0.08)', 
              border: '1px solid var(--color-ice-border)', 
              display: 'flex', 
              alignItems: 'center', 
              justify: 'center', 
              color: 'var(--color-water-primary)', 
              fontSize: '2.8rem',
              boxShadow: '0 0 20px rgba(14, 165, 233, 0.15)',
              zIndex: 1
            }}>
              <i className="ri-shield-check-fill"></i>
            </div>
            
            <div className="detail-text" style={{ zIndex: 1 }}>
              <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--color-water-primary)", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "0.5rem" }}>
                Licensed Production Center
              </div>
              <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                Shital Pet Industries
              </h2>
              
              <div style={{ 
                height: '2px', 
                width: '80px', 
                background: 'linear-gradient(90deg, transparent, var(--color-water-primary), transparent)', 
                margin: '1.5rem auto' 
              }}></div>
              
              <p style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 400, marginBottom: '1.5rem', fontFamily: 'var(--font-body)' }}>
                FSSAI, BIS &amp; ISI Certified Operations
              </p>
              
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', fontWeight: 300, lineHeight: 1.8, marginBottom: '2.5rem' }}>
                GST registered and home to the very first packaged drinking water plant in Dhanbad, running seamlessly for over 18 years. Our advanced facility adheres strictly to the highest standards of hygiene and filtration safety.
              </p>
              
              {/* Badges / Highlights */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1.2rem',
                marginTop: '1.5rem'
              }}>
                <div style={{ 
                  background: 'rgba(14, 165, 233, 0.05)', 
                  border: '1px solid var(--color-ice-border)', 
                  padding: '0.8rem 1.5rem', 
                  borderRadius: '30px', 
                  fontSize: '0.95rem',
                  color: 'var(--color-water-light)',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <i className="ri-award-fill" style={{ fontSize: '1.1rem' }}></i> 18+ Years Legacy
                </div>
                <div style={{ 
                  background: 'rgba(14, 165, 233, 0.05)', 
                  border: '1px solid var(--color-ice-border)', 
                  padding: '0.8rem 1.5rem', 
                  borderRadius: '30px', 
                  fontSize: '0.95rem',
                  color: 'var(--color-water-light)',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <i className="ri-checkbox-circle-fill" style={{ fontSize: '1.1rem' }}></i> BIS &amp; ISI Compliant
                </div>
                <div style={{ 
                  background: 'rgba(14, 165, 233, 0.05)', 
                  border: '1px solid var(--color-ice-border)', 
                  padding: '0.8rem 1.5rem', 
                  borderRadius: '30px', 
                  fontSize: '0.95rem',
                  color: 'var(--color-water-light)',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <i className="ri-verified-badge-fill" style={{ fontSize: '1.1rem' }}></i> FSSAI Certified
                </div>
              </div>
            </div>
          </div>

          {/* Certifications & Quality Parameters */}
          <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="facility-features-grid">
            <div style={{ 
              background: 'var(--glass-bg)', 
              border: '1px solid var(--glass-border)', 
              padding: '2rem', 
              borderRadius: '20px',
              boxShadow: 'var(--glass-shadow)'
            }}>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <i className="ri-flask-fill" style={{ color: 'var(--color-water-primary)' }}></i> Rigorous Quality Control
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.7', fontWeight: 300 }}>
                Every single batch is processed through our state-of-the-art laboratory testing station to verify chemical parameters, TDS levels, and absolute biological safety before bottling.
              </p>
            </div>
            
            <div style={{ 
              background: 'var(--glass-bg)', 
              border: '1px solid var(--glass-border)', 
              padding: '2rem', 
              borderRadius: '20px',
              boxShadow: 'var(--glass-shadow)'
            }}>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <i className="ri-cpu-line" style={{ color: 'var(--color-water-primary)' }}></i> Auto-Bottling Line
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.7', fontWeight: 300 }}>
                Our bottling line is fully automated and touch-free. Utilizing premium food-grade BPA-free packaging materials to deliver safe drinking water direct to the consumers.
              </p>
            </div>
          </div>
          
          {/* Call to action */}
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 400 }}>
              Need bulk drinking water for your hotel, office, or event?
            </h4>
            <button onClick={() => navigateTo("contact")} className="btn btn-primary">
              <i className="ri-mail-send-line"></i> Contact Our Supply Desk
            </button>
          </div>

        </div>
      </section>

      {/* CSS style hook just in case to make feature grid responsive */}
      <style>{`
        @media (max-width: 768px) {
          .facility-features-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}

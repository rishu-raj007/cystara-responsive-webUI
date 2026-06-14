// src/components/Admin.jsx
import React, { useState } from 'react';

export default function Admin({ cms, onCMSUpdate, onInquiryDelete, navigateTo }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [localCMS, setLocalCMS] = useState(cms);
  const [successBanner, setSuccessBanner] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    onCMSUpdate(localCMS);
    triggerSuccessBanner("CMS Configurations Saved Successfully!");
  };

  const triggerSuccessBanner = (msg) => {
    setSuccessBanner(msg);
    setTimeout(() => {
      setSuccessBanner("");
    }, 4000);
  };

  // Helper to update nested object properties
  const updateCMSValue = (path, value) => {
    const keys = path.split('.');
    const updated = { ...localCMS };
    let current = updated;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setLocalCMS(updated);
  };

  // Helper to update items in arrays (like products)
  const updateProductItem = (id, field, value) => {
    const updatedProducts = (localCMS.products || []).map(p => {
      if (p.id === id) {
        if (field.startsWith('specs.')) {
          const specKey = field.split('.')[1];
          return {
            ...p,
            specs: { ...p.specs, [specKey]: value }
          };
        }
        return { ...p, [field]: value };
      }
      return p;
    });
    setLocalCMS(prev => ({ ...prev, products: updatedProducts }));
  };

  // Helper to update testimonials
  const updateTestimonialItem = (id, field, value) => {
    const updatedTestimonials = (localCMS.testimonials || []).map(t => {
      if (t.id === id) {
        return { ...t, [field]: value };
      }
      return t;
    });
    setLocalCMS(prev => ({ ...prev, testimonials: updatedTestimonials }));
  };

  const totalLeads = (localCMS.inquiries || []).length;
  const totalProducts = (localCMS.products || []).length;

  return (
    <div className="admin-wrapper">
      
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <i className="ri-drop-fill"></i>
          <span>CMS Manager</span>
        </div>
        
        <nav className="admin-nav">
          <div 
            className={`admin-nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <i className="ri-dashboard-3-line"></i>
            <span>Dashboard</span>
          </div>
          <div 
            className={`admin-nav-item ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            <i className="ri-home-gear-line"></i>
            <span>Home Page</span>
          </div>
          <div 
            className={`admin-nav-item ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            <i className="ri-profile-line"></i>
            <span>About Page</span>
          </div>
          <div 
            className={`admin-nav-item ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            <i className="ri-shopping-bag-3-line"></i>
            <span>Product Catalog</span>
          </div>
          <div 
            className={`admin-nav-item ${activeTab === "testimonials" ? "active" : ""}`}
            onClick={() => setActiveTab("testimonials")}
          >
            <i className="ri-chat-quote-line"></i>
            <span>Testimonials</span>
          </div>
          <div 
            className={`admin-nav-item ${activeTab === "contact" ? "active" : ""}`}
            onClick={() => setActiveTab("contact")}
          >
            <i className="ri-contacts-book-line"></i>
            <span>Contact Details</span>
          </div>
          <div 
            className={`admin-nav-item ${activeTab === "inquiries" ? "active" : ""}`}
            onClick={() => setActiveTab("inquiries")}
          >
            <i className="ri-mail-unread-line"></i>
            <span>Leads Inbox ({totalLeads})</span>
          </div>
        </nav>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
          <button 
            onClick={() => navigateTo("home")} 
            className="btn btn-outline btn-xs"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <i className="ri-external-link-line"></i> View Live Site
          </button>
          <div className="admin-sidebar-footer">
            JustAmrit Admin Panel &bull; v1.0.0
          </div>
        </div>
      </aside>

      {/* Main Dashboard Space */}
      <div className="admin-content-area">
        
        {/* Top Header Row */}
        <div className="admin-header-row">
          <div>
            <h1>Administrative Console</h1>
            <p style={{ color: "#64748b" }}>Manage branding texts, prices, testimonials, and review leads.</p>
          </div>
          
          {successBanner && (
            <div style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", color: "#10b981", padding: "0.8rem 1.5rem", borderRadius: "10px", fontWeight: 500 }}>
              <i className="ri-checkbox-circle-fill"></i> {successBanner}
            </div>
          )}
        </div>

        {/* ----------------- TAB: OVERALL DASHBOARD ----------------- */}
        {activeTab === "dashboard" && (
          <div className="admin-tab-section active">
            <div className="dashboard-metrics-grid">
              <div className="metric-card">
                <div className="metric-icon"><i className="ri-mail-line"></i></div>
                <div className="metric-info">
                  <h3>Inquiries Logged</h3>
                  <p>{totalLeads}</p>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon"><i className="ri-cup-line"></i></div>
                <div className="metric-info">
                  <h3>Bottles Sized</h3>
                  <p>{totalProducts}</p>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon"><i className="ri-shield-star-line"></i></div>
                <div className="metric-info">
                  <h3>Compliance Certs</h3>
                  <p>{(localCMS.about?.certifications || []).length}</p>
                </div>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-header">
                <h2>CMS Administration Overview</h2>
                <p>Welcome to the JustAmrit Headless Admin Panel. Make adjustments in any of the side categories, click Save, and they will persist instantly.</p>
              </div>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "250px", background: "#020617", padding: "2rem", borderRadius: "14px", border: "1px solid var(--glass-border)" }}>
                  <h4 style={{ color: "var(--color-water-light)", marginBottom: "10px" }}><i className="ri-customer-service-2-fill"></i> Support Desk</h4>
                  <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "15px" }}>Comprehensive 12 Months Support is active for code adjustments, layout extensions, and plugin updates.</p>
                  <ul style={{ fontSize: "0.8rem", color: "#64748b", paddingLeft: "15px" }}>
                    {(localCMS.support?.scope || []).map((s, i) => <li key={i} style={{ marginBottom: "5px" }}>{s}</li>)}
                  </ul>
                </div>
                <div style={{ flex: 1, minWidth: "250px", background: "#020617", padding: "2rem", borderRadius: "14px", border: "1px solid var(--glass-border)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                  <h4 style={{ marginBottom: "10px" }}>Latest Leads Shortcut</h4>
                  <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "20px" }}>Check details of recently registered messages.</p>
                  <button onClick={() => setActiveTab("inquiries")} className="btn btn-primary btn-sm">Open Leads Inbox</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB: HOME SETTINGS ----------------- */}
        {activeTab === "home" && (
          <div className="admin-tab-section active">
            <form onSubmit={handleSave} className="admin-card">
              <div className="admin-card-header">
                <h2>Home Page Text Settings</h2>
                <p>Configure primary headings, introduction paragraphs, and slogans.</p>
              </div>
              
              <div className="admin-form">
                <div className="admin-form-group">
                  <label>Hero Title Slogan</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    value={localCMS.home.heroTitle}
                    onChange={(e) => updateCMSValue('home.heroTitle', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Hero Subtitle Paragraph</label>
                  <textarea 
                    className="admin-input" 
                    value={localCMS.home.heroSubtitle}
                    onChange={(e) => updateCMSValue('home.heroSubtitle', e.target.value)}
                  ></textarea>
                </div>
                <div className="admin-form-group">
                  <label>Company Introduction Slogan</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    value={localCMS.home.companyIntroTitle}
                    onChange={(e) => updateCMSValue('home.companyIntroTitle', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Company Introduction Narrative Body</label>
                  <textarea 
                    className="admin-input" 
                    style={{ minHeight: "150px" }}
                    value={localCMS.home.companyIntroText}
                    onChange={(e) => updateCMSValue('home.companyIntroText', e.target.value)}
                  ></textarea>
                </div>
                
                <div className="admin-btn-row">
                  <button type="submit" className="btn btn-save-dashboard">Save Home Copy</button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ----------------- TAB: ABOUT SETTINGS ----------------- */}
        {activeTab === "about" && (
          <div className="admin-tab-section active">
            <form onSubmit={handleSave} className="admin-card">
              <div className="admin-card-header">
                <h2>About Us Settings</h2>
                <p>Edit core story texts, mission, and vision declarations.</p>
              </div>
              
              <div className="admin-form">
                <div className="admin-form-group">
                  <label>Story Slogan Title</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    value={localCMS.about.storyTitle}
                    onChange={(e) => updateCMSValue('about.storyTitle', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Heritage Narrative Text</label>
                  <textarea 
                    className="admin-input" 
                    style={{ minHeight: "130px" }}
                    value={localCMS.about.storyText}
                    onChange={(e) => updateCMSValue('about.storyText', e.target.value)}
                  ></textarea>
                </div>
                <div className="admin-form-group">
                  <label>Mission Statement</label>
                  <textarea 
                    className="admin-input" 
                    value={localCMS.about.mission}
                    onChange={(e) => updateCMSValue('about.mission', e.target.value)}
                  ></textarea>
                </div>
                <div className="admin-form-group">
                  <label>Vision Statement</label>
                  <textarea 
                    className="admin-input" 
                    value={localCMS.about.vision}
                    onChange={(e) => updateCMSValue('about.vision', e.target.value)}
                  ></textarea>
                </div>
                <div className="admin-form-group">
                  <label>Sustainability Declaration</label>
                  <textarea 
                    className="admin-input" 
                    style={{ minHeight: "120px" }}
                    value={localCMS.about.sustainability}
                    onChange={(e) => updateCMSValue('about.sustainability', e.target.value)}
                  ></textarea>
                </div>
                
                <div className="admin-btn-row">
                  <button type="submit" className="btn btn-save-dashboard">Save About Settings</button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ----------------- TAB: PRODUCT CATALOG ----------------- */}
        {activeTab === "products" && (
          <div className="admin-tab-section active">
            <form onSubmit={handleSave} className="admin-card">
              <div className="admin-card-header">
                <h2>Product Sizer Catalog Manager</h2>
                <p>Modify inventory name tags, pricing metrics, and specifications list.</p>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {(localCMS.products || []).map((p) => (
                  <div key={p.id} className="admin-product-item">
                    <img src={p.img} alt={p.name} className="admin-product-thumb" />
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: "15px", width: "100%" }}>
                      <div className="admin-form-group">
                        <label>Product Name</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={p.name}
                          onChange={(e) => updateProductItem(p.id, 'name', e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Category</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={p.category}
                          onChange={(e) => updateProductItem(p.id, 'category', e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Retail Price</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={p.price}
                          onChange={(e) => updateProductItem(p.id, 'price', e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>pH Metric</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={p.specs?.["pH Level"] || ""}
                          onChange={(e) => updateProductItem(p.id, 'specs.pH Level', e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>TDS Level</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={p.specs?.TDS || ""}
                          onChange={(e) => updateProductItem(p.id, 'specs.TDS', e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Packaging Case</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={p.specs?.Packaging || ""}
                          onChange={(e) => updateProductItem(p.id, 'specs.Packaging', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="admin-btn-row">
                <button type="submit" className="btn btn-save-dashboard">Save Product Changes</button>
              </div>
            </form>
          </div>
        )}

        {/* ----------------- TAB: TESTIMONIALS ----------------- */}
        {activeTab === "testimonials" && (
          <div className="admin-tab-section active">
            <form onSubmit={handleSave} className="admin-card">
              <div className="admin-card-header">
                <h2>Customer Testimonials Settings</h2>
                <p>Modify corporate and client endorsements.</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                {(localCMS.testimonials || []).map((t) => (
                  <div key={t.id} style={{ borderBottom: "1px solid var(--glass-border)", paddingBottom: "2rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "15px" }}>
                      <div className="admin-form-group">
                        <label>Client Name</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={t.name}
                          onChange={(e) => updateTestimonialItem(t.id, 'name', e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Client Role / Designation</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={t.role}
                          onChange={(e) => updateTestimonialItem(t.id, 'role', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label>Testimonial Review Body</label>
                      <textarea 
                        className="admin-input" 
                        value={t.text}
                        onChange={(e) => updateTestimonialItem(t.id, 'text', e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>

              <div className="admin-btn-row">
                <button type="submit" className="btn btn-save-dashboard">Save Testimonials</button>
              </div>
            </form>
          </div>
        )}

        {/* ----------------- TAB: CONTACT DETAILS ----------------- */}
        {activeTab === "contact" && (
          <div className="admin-tab-section active">
            <form onSubmit={handleSave} className="admin-card">
              <div className="admin-card-header">
                <h2>Contact Information Desk</h2>
                <p>Persist phone, email, WhatsApp tags, and Google Business Map frames.</p>
              </div>

              <div className="admin-form">
                <div className="admin-form-group">
                  <label>Support Phone number</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    value={localCMS.contact.phone}
                    onChange={(e) => updateCMSValue('contact.phone', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label>WhatsApp Sourcing Link Number</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    value={localCMS.contact.whatsapp}
                    onChange={(e) => updateCMSValue('contact.whatsapp', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Administrative Email Address</label>
                  <input 
                    type="email" 
                    className="admin-input" 
                    value={localCMS.contact.email}
                    onChange={(e) => updateCMSValue('contact.email', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Head Office Address</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    value={localCMS.contact.address}
                    onChange={(e) => updateCMSValue('contact.address', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Office Operating Hours</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    value={localCMS.contact.hours}
                    onChange={(e) => updateCMSValue('contact.hours', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Google Maps Iframe source URL</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    value={localCMS.contact.gmapsEmbed}
                    onChange={(e) => updateCMSValue('contact.gmapsEmbed', e.target.value)}
                  />
                </div>

                <div className="admin-btn-row">
                  <button type="submit" className="btn btn-save-dashboard">Save Contact Info</button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ----------------- TAB: INQUIRIES LOG ----------------- */}
        {activeTab === "inquiries" && (
          <div className="admin-tab-section active">
            <div className="admin-card">
              <div className="admin-card-header">
                <h2>Leads Inbox ({totalLeads})</h2>
                <p>Check details of queries submitted from live contact forms.</p>
              </div>

              {totalLeads === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 0", color: "#64748b" }}>
                  <i className="ri-mail-open-line" style={{ fontSize: "3rem", display: "block", marginBottom: "15px" }}></i>
                  Inbox is currently empty.
                </div>
              ) : (
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Business Entity</th>
                        <th>Contact Details</th>
                        <th>Enquiry Message</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(localCMS.inquiries || []).map((item) => (
                        <tr key={item.id}>
                          <td><strong>{item.date}</strong></td>
                          <td>{item.name}</td>
                          <td><span style={{ background: "rgba(14, 165, 233, 0.1)", color: "var(--color-water-light)", padding: "0.2rem 0.6rem", borderRadius: "5px", fontSize: "0.8rem" }}>{item.business}</span></td>
                          <td>
                            <div style={{ fontSize: "0.85rem" }}><i className="ri-phone-fill"></i> {item.phone}</div>
                            <div style={{ fontSize: "0.85rem", color: "#64748b" }}><i className="ri-mail-fill"></i> {item.email}</div>
                          </td>
                          <td>
                            <div className="admin-msg-box">{item.message}</div>
                          </td>
                          <td>
                            <button 
                              onClick={() => {
                                onInquiryDelete(item.id);
                                triggerSuccessBanner("Inquiry Deleted Successfully");
                              }} 
                              className="btn btn-delete btn-xs"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

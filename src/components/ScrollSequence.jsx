// src/components/ScrollSequence.jsx
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Global cache for images to persist loaded references across SPA tab navigations
let cachedImages = [];
let isFullyLoaded = false;

export default function ScrollSequence({ cms, navigateTo }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const preloaderRef = useRef(null);
  const renderRef = useRef(null); // Share render handle with bg load callback
  
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const slogans = [
    "Purity You Can Trust",
    "Hygienically Sealed & Safe",
    "Crisp, Consistent Taste",
    "Reliable Daily Hydration",
    "Balanced for Your Wellness"
  ];
  const [sloganIdx, setSloganIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSloganIdx((prev) => (prev + 1) % slogans.length);
    }, 850);
    return () => clearInterval(interval);
  }, []);

  const frameCount = 50;
  const currentFrame = index => `/animation-frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;

  // Diagnostic logger helper
  const logDebug = (msg) => {
    const el = document.getElementById("canvas-debug-overlay");
    if (el) {
      el.innerHTML = `<div>[DEBUG] ${msg}</div>` + el.innerHTML;
    }
  };

  useEffect(() => {
    let active = true;
    logDebug("Checking global image cache...");

    // Cache hit: immediately skip preloader
    if (cachedImages.length === frameCount && isFullyLoaded) {
      logDebug("Cache hit: 50 frames already loaded globally.");
      setIsLoaded(true);
      setLoadingPercent(100);
      if (preloaderRef.current) {
        preloaderRef.current.style.display = "none";
      }
      initGSAPSequence(cachedImages);
      return;
    }

    const loadImages = async () => {
      // 1. Initialize image elements if not already allocated
      if (cachedImages.length === 0) {
        for (let i = 0; i < frameCount; i++) {
          const img = new Image();
          img.src = currentFrame(i);
          cachedImages.push(img);
        }
      }

      // 2. Await first frame AND a minimum timer of 2500ms
      const minTimerPromise = new Promise((resolve) => setTimeout(resolve, 2500));

      const firstFramePromise = new Promise((resolve) => {
        const firstImg = cachedImages[0];
        if (firstImg.complete && firstImg.naturalWidth > 0) {
          resolve();
        } else {
          firstImg.onload = () => resolve();
          firstImg.onerror = () => {
            logDebug("Error: First frame failed to load. Proceeding anyway...");
            resolve();
          };
        }
      });

      await Promise.all([firstFramePromise, minTimerPromise]);

      if (!active) return;

      logDebug("First frame loaded. Showing hero & fading out preloader...");
      setIsLoaded(true);

      // Animate preloader out
      if (preloaderRef.current) {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            if (preloaderRef.current) {
              preloaderRef.current.style.display = "none";
            }
          }
        });
      }

      // Start sequence player using currently available frames
      initGSAPSequence(cachedImages);

      // 3. Load other 49 frames in background
      let loadedCount = 1;
      setLoadingPercent(Math.round((loadedCount / frameCount) * 100));

      const backgroundLoads = cachedImages.slice(1).map((img, idx) => {
        return new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            loadedCount++;
            if (active) {
              setLoadingPercent(Math.round((loadedCount / frameCount) * 100));
              if (renderRef.current) renderRef.current(); // repaint if currently viewed
            }
            resolve();
          } else {
            img.onload = () => {
              loadedCount++;
              if (active) {
                setLoadingPercent(Math.round((loadedCount / frameCount) * 100));
                if (renderRef.current) renderRef.current(); // repaint if currently viewed
              }
              resolve();
            };
            img.onerror = () => {
              loadedCount++;
              if (active) {
                setLoadingPercent(Math.round((loadedCount / frameCount) * 100));
              }
              logDebug(`Background frame ${idx + 2} failed to load.`);
              resolve();
            };
          }
        });
      });

      await Promise.all(backgroundLoads);
      isFullyLoaded = true;
      logDebug("All 50 frames fully loaded and cached globally.");
    };

    loadImages();

    return () => {
      active = false;
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const initGSAPSequence = (images) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      logDebug("Initialization failed: Canvas element NOT found in DOM!");
      return;
    }
    const ctx = canvas.getContext("2d");
    const bottleSequence = { frame: 0 };

    // Set initial size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    logDebug(`Canvas initialized: ${canvas.width}x${canvas.height}`);

    // Responsive Draw Function
    const render = () => {
      const frameIndex = Math.round(bottleSequence.frame);
      let img = images[frameIndex];
      
      // Fallback Strategy: Find the closest loaded frame
      if (!img || !img.complete || img.naturalWidth === 0) {
        let found = false;
        // Search backwards (preferred, to show previous state)
        for (let j = frameIndex; j >= 0; j--) {
          if (images[j] && images[j].complete && images[j].naturalWidth > 0) {
            img = images[j];
            found = true;
            break;
          }
        }
        // Search forwards if not found
        if (!found) {
          for (let j = frameIndex + 1; j < frameCount; j++) {
            if (images[j] && images[j].complete && images[j].naturalWidth > 0) {
              img = images[j];
              found = true;
              break;
            }
          }
        }
      }

      // Final fallback to frame 0
      if (!img || !img.complete || img.naturalWidth === 0) {
        img = images[0];
      }

      if (!img || !img.complete || img.naturalWidth === 0) {
        logDebug(`Render warning: No frames ready to paint index ${frameIndex}`);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgWidth = img.naturalWidth || img.width || 1920;
      const imgHeight = img.naturalHeight || img.height || 1080;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, offsetX, offsetY;
      let scaleFactor = 1.0;
      if (canvasWidth < 768) {
        scaleFactor = 0.72; // portrait-optimized scaling to prevent the bottle from being oversized
      }

      if (canvasRatio > imgRatio) {
        drawWidth = canvasWidth * scaleFactor;
        drawHeight = (canvasWidth / imgRatio) * scaleFactor;
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgRatio * scaleFactor;
        drawHeight = canvasHeight * scaleFactor;
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      
      // Log frame renders selectively
      if (frameIndex % 5 === 0) {
        logDebug(`Frame paint: #${frameIndex} | Cache: ${isFullyLoaded ? "Global" : "Loading"} | Draw size: ${Math.round(drawWidth)}x${Math.round(drawHeight)}`);
      }
    };

    // Store render reference for redraw triggers on background loads
    renderRef.current = render;

    // Draw frame 0 immediately
    render();

    // Smart Resize Handler (Avoids flickey redraws on mobile vertical scroll height changes)
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      if (width !== lastWidth || Math.abs(height - lastHeight) > 120) {
        canvas.width = width;
        canvas.height = height;
        lastWidth = width;
        lastHeight = height;
        render();
      }
    };
    window.addEventListener("resize", handleResize);

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Setup matchMedia for responsive timelines
    const mm = gsap.matchMedia();

    // Desktop Animation Sequence (width > 768px)
    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: ".canvas-container",
          pinSpacing: false,
          invalidateOnRefresh: true,
        }
      });

      // Animate bottle frames
      tl.to(bottleSequence, {
        frame: frameCount - 1,
        ease: "none",
        onUpdate: render,
        duration: 10
      }, 0);

      // Scene 1: Entrance/Floating
      tl.to("#scene-1-title", { opacity: 1, y: 0, pointerEvents: "auto", duration: 1.5 }, 0.2);
      tl.to("#scene-1-title", { opacity: 0, y: -40, pointerEvents: "none", duration: 1 }, 2);

      // Scene 2: Zoom Sequence
      tl.to(canvas, { scale: 1.25, duration: 2.2, ease: "sine.inOut" }, 1.8);
      tl.to(".backdrop-splash", { opacity: 0.35, scale: 1.5, duration: 2.2, ease: "sine.inOut" }, 1.8);
      tl.to("#scene-2-title", { opacity: 1, y: 0, duration: 1.5 }, 2.2);
      tl.to("#scene-2-title", { opacity: 0, y: -40, duration: 1 }, 4);

      // Scene 3: Aquifer Origin (shift bottle left, text right)
      tl.to(canvas, { scale: 1.0, x: "-18vw", duration: 2.5, ease: "power2.inOut" }, 4.2);
      tl.to(".backdrop-splash", { x: "-15vw", opacity: 0.2, duration: 2.5 }, 4.2);
      tl.to("#scene-3-content", { opacity: 1, y: 0, duration: 1.8 }, 4.8);
      tl.to("#scene-3-content", { opacity: 0, y: -40, duration: 1 }, 7);

      // Scene 4/5: Lineup emerges (bottle moves to center/left, lineup details show)
      tl.to(canvas, { x: "0vw", scale: 0.9, duration: 2.2, ease: "power2.inOut" }, 7.2);
      tl.to(".backdrop-splash", { x: "0vw", opacity: 0.1, duration: 2.2 }, 7.2);
      tl.to("#scene-4-content", { opacity: 1, y: 0, pointerEvents: "auto", duration: 1.8 }, 7.8);
    });

    // Mobile Animation Sequence (width <= 768px)
    mm.add("(max-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: ".canvas-container",
          pinSpacing: false,
          invalidateOnRefresh: true,
        }
      });

      // Animate bottle frames
      tl.to(bottleSequence, {
        frame: frameCount - 1,
        ease: "none",
        onUpdate: render,
        duration: 10
      }, 0);

      // Scene 1: Entrance/Floating
      tl.to("#scene-1-title", { opacity: 1, y: 0, pointerEvents: "auto", duration: 1.5 }, 0.2);
      tl.to("#scene-1-title", { opacity: 0, y: -40, pointerEvents: "none", duration: 1 }, 2);

      // Scene 2: Zoom Sequence (keep scale moderate on mobile)
      tl.to(canvas, { scale: 1.05, duration: 2.2, ease: "sine.inOut" }, 1.8);
      tl.to(".backdrop-splash", { opacity: 0.25, scale: 1.2, duration: 2.2, ease: "sine.inOut" }, 1.8);
      tl.to("#scene-2-title", { opacity: 1, y: 0, duration: 1.5 }, 2.2);
      tl.to("#scene-2-title", { opacity: 0, y: -40, duration: 1 }, 4);

      // Scene 3: Aquifer Origin (keep bottle centered behind text)
      tl.to(canvas, { scale: 0.9, x: "0vw", duration: 2.5, ease: "power2.inOut" }, 4.2);
      tl.to(".backdrop-splash", { x: "0vw", opacity: 0.15, duration: 2.5 }, 4.2);
      tl.to("#scene-3-content", { opacity: 1, y: 0, duration: 1.8 }, 4.8);
      tl.to("#scene-3-content", { opacity: 0, y: -40, duration: 1 }, 7);

      // Scene 4/5: Lineup emerges (keep bottle centered behind text)
      tl.to(canvas, { x: "0vw", scale: 0.85, duration: 2.2, ease: "power2.inOut" }, 7.2);
      tl.to(".backdrop-splash", { x: "0vw", opacity: 0.1, duration: 2.2 }, 7.2);
      tl.to("#scene-4-content", { opacity: 1, y: 0, pointerEvents: "auto", duration: 1.8 }, 7.8);
    });

    // Cleanup resize listener and matchMedia timelines
    return () => {
      window.removeEventListener("resize", handleResize);
      renderRef.current = null;
      mm.revert();
    };
  };

  return (
    <div ref={containerRef} className={`hero-scroll-wrapper ${isLoaded ? 'loaded' : ''}`} style={{ height: "650vh" }}>
      
      {/* On-Screen Diagnostic Debug overlay */}
      <div 
        id="canvas-debug-overlay" 
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          background: "rgba(3, 7, 18, 0.85)",
          color: "#38bdf8",
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid rgba(14, 165, 233, 0.3)",
          fontFamily: "monospace",
          fontSize: "11px",
          zIndex: 99999,
          maxHeight: "150px",
          overflowY: "auto",
          width: "350px",
          pointerEvents: "auto",
          textAlign: "left",
          display: window.location.search.includes("debug=true") ? "block" : "none"
        }}
      >
        <div>[DEBUG] Diagnostic Console Active</div>
      </div>
      
      {/* Sequence Preloader */}
      <div 
        ref={preloaderRef} 
        style={{
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%", 
          background: "#030712", 
          zIndex: 9999, 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center"
        }}
      >
        <div style={{ fontSize: "3rem", color: "#0ea5e9", marginBottom: "20px" }}>
          <i className="ri-drop-fill" style={{ animation: "floatAnimVertical 1.5s infinite ease-in-out", display: "inline-block" }}></i>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", color: "#fff", marginBottom: "10px", letterSpacing: "0.1em" }}>
          {cms.brandName}
        </h1>
        <p key={sloganIdx} className="preloader-slogan">
          {slogans[sloganIdx]}
        </p>
        <div style={{ color: "var(--color-text-muted)", fontSize: "0.75rem", letterSpacing: "0.15em", marginTop: "20px" }}>
          LOADING &bull; {loadingPercent}%
        </div>
      </div>

      {/* Sticky Canvas Context */}
      <div className="canvas-container">
        <canvas ref={canvasRef} id="hero-bottle-canvas"></canvas>
        <div className="backdrop-splash"></div>

        {/* Content Overlays */}
        <div className="canvas-overlay-content">
          
          {/* Scene 1: Slogan */}
          <div className="scroll-scene" id="scene-1-title" style={{ opacity: 1, transform: "translateY(0px)", pointerEvents: "auto" }}>
            <div className="scene-text-content">
              <div className="hero-badge-wrap">
                <span className="hero-badge">
                  <i className="ri-sparkling-line"></i> Purified to Perfection &bull; 100% Hygienic
                </span>
              </div>
              <h2 className="text-gradient">{cms.home.heroTitle}</h2>
              <p>{cms.home.heroSubtitle}</p>
              <div className="scene-buttons">
                <button onClick={() => navigateTo("contact")} className="btn btn-primary">Order Bulk</button>
                <button onClick={() => navigateTo("products")} className="btn btn-outline">Explore Products</button>
              </div>
              <div className="hero-brand-values">
                <span className="value-tag"><i className="ri-water-flash-line"></i> Multi-Stage RO</span>
                <span className="value-tag"><i className="ri-bubble-chart-line"></i> Dual Sterilized</span>
                <span className="value-tag"><i className="ri-flask-line"></i> Quality Tested</span>
              </div>
            </div>
            <div className="scroll-indicator">
              <span></span>
              Scroll to Discover
            </div>
          </div>

          {/* Scene 2: Alkaline */}
          <div className="scroll-scene" id="scene-2-title" style={{ opacity: 0, transform: "translateY(30px)", pointerEvents: "none" }}>
            <div className="scene-text-content">
              <h2 className="text-gradient-gold">Pure Packaged Hydration</h2>
              <p>Carefully purified through a multi-stage filtration process to ensure consistent taste, hygiene, and safe everyday hydration.</p>
            </div>
          </div>

          {/* Scene 3: Geological Filter */}
          <div 
            className="scroll-scene scene-grid-3" 
            id="scene-3-content" 
            style={{ 
              opacity: 0, 
              transform: "translateY(30px)", 
              pointerEvents: "none"
            }}
          >
            <div className="desktop-spacer"></div> {/* Left spacer reserved for shifted canvas */}
            <div className="scene-text-content">
              <div className="scene-sub-label">
                Advanced Purification
              </div>
              <h2 className="text-gradient">
                Multi-Stage Filtration
              </h2>
              <p>
                Our water is processed using modern multi-stage filtration, reverse osmosis (RO), and advanced sterilization technologies to eliminate impurities and guarantee consistent quality.
              </p>
              <div className="scene-stats-flex">
                <div className="scene-stat-item">
                  <h4>RO Purified</h4>
                  <p>Clean and safe drinking water</p>
                </div>
                <div className="scene-stat-item gold-border">
                  <h4>UV Sterilized</h4>
                  <p>Advanced hygienic processing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scene 4: Showcase Lineup */}
          <div 
            className="scroll-scene scene-grid-4" 
            id="scene-4-content" 
            style={{ 
              opacity: 0, 
              transform: "translateY(30px)", 
              pointerEvents: "none"
            }}
          >
            <div className="scene-text-content">
              <div className="scene-sub-label">
                A Size for Every Occasion
              </div>
              <h2 className="text-gradient">
                The Premium Lineup
              </h2>
              <p>
                From sleek dining-table glass carafes to large-scale offices, {cms.brandName} is presented in carefully crafted, BPA-free recyclable bottles designed to preserve freshness and purity.
              </p>
              <div className="scene-buttons">
                <button onClick={() => navigateTo("products")} className="btn btn-primary">Compare Capacities</button>
                <button onClick={() => navigateTo("contact")} className="btn btn-outline">Check Availability</button>
              </div>
            </div>
            <div className="desktop-spacer"></div> {/* Right spacer reserved for shifted canvas */}
          </div>

        </div>
      </div>
    </div>
  );
}

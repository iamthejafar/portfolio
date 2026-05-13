import { useState, useEffect, useRef } from "react"

/* ─── Google Fonts ─── */
const fontLink = document.createElement("link")
fontLink.rel = "stylesheet"
fontLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap"
document.head.appendChild(fontLink)

const style = document.createElement("style")
style.textContent = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --navy:    #0d1117;
  --navy-2:  #131920;
  --navy-3:  #1a2332;
  --navy-4:  #1e2a3a;
  --slate:   #2a3a4d;
  --gold:    #c9a84c;
  --gold-2:  #e8c96b;
  --gold-dim: rgba(201,168,76,0.15);
  --gold-border: rgba(201,168,76,0.25);
  --cream:   #f4f0e8;
  --white:   #ffffff;
  --text:    #e8e4dc;
  --text-2:  #b8b4ac;
  --text-3:  #787670;
  --rule:    rgba(255,255,255,0.07);
  --rule-2:  rgba(255,255,255,0.04);
  --card-bg: rgba(26,35,50,0.6);
  --card-border: rgba(255,255,255,0.08);
  --glow: 0 0 60px rgba(201,168,76,0.06);
}

html { scroll-behavior: smooth; }
body {
  font-family: 'Syne', sans-serif;
  background: var(--navy);
  color: var(--text);
  line-height: 1.6;
  overflow-x: hidden;
}

/* Noise texture overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
  opacity: 0.4;
}

/* Scroll reveal */
.reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
.reveal.left { transform: translateX(-30px); }
.reveal.right { transform: translateX(30px); }
.reveal.visible { opacity: 1; transform: none; }
.d1 { transition-delay: 0.05s !important; }
.d2 { transition-delay: 0.12s !important; }
.d3 { transition-delay: 0.19s !important; }
.d4 { transition-delay: 0.26s !important; }
.d5 { transition-delay: 0.33s !important; }

/* ── NAV ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 0 3rem;
  height: 72px;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(13,17,23,0.85);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--rule);
  transition: background 0.3s;
}
.nav-brand {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem; font-weight: 600; letter-spacing: 0.06em;
  color: var(--gold); text-decoration: none;
  display: flex; align-items: center; gap: 0.6rem;
}
.nav-links { display: flex; gap: 0; list-style: none; }
.nav-links button {
  background: none; border: none; cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem; font-weight: 400;
  letter-spacing: 0.12em; text-transform: uppercase;
  padding: 0.45rem 1rem;
  color: var(--text-3);
  transition: color 0.2s;
  position: relative;
}
.nav-links button::after {
  content: ''; position: absolute; bottom: -1px; left: 50%; right: 50%;
  height: 1px; background: var(--gold);
  transition: left 0.3s, right 0.3s;
}
.nav-links button:hover, .nav-links button.active { color: var(--text); }
.nav-links button.active::after { left: 1rem; right: 1rem; }

/* ── HERO ── */
.hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  padding-top: 72px;
  position: relative;
  overflow: hidden;
}
.hero::after {
  content: '';
  position: absolute;
  top: -20%;
  right: -10%;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
  pointer-events: none;
}

.hero-left {
  padding: 8rem 4rem 6rem 5vw;
  display: flex; flex-direction: column; justify-content: center;
  border-right: 1px solid var(--rule);
}
.hero-right {
  display: flex; align-items: center; justify-content: center;
  padding: 6rem 5vw 6rem 4rem;
  position: relative;
}

.hero-eyebrow {
  display: flex; align-items: center; gap: 1rem;
  margin-bottom: 2.5rem;
}
.hero-eyebrow-line { flex: 0 0 40px; height: 1px; background: var(--gold); }
.hero-eyebrow-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--gold);
}

.hero-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(4.5rem, 9vw, 8rem);
  font-weight: 300;
  line-height: 0.88;
  letter-spacing: -0.02em;
  color: var(--white);
}
.hero-name em {
  display: block;
  font-style: italic;
  color: var(--gold);
  font-weight: 300;
}

.hero-desc {
  margin-top: 2.5rem;
  font-size: 0.95rem; color: var(--text-2);
  line-height: 1.85; max-width: 420px;
  font-weight: 400;
}

.hero-actions {
  display: flex; gap: 1rem; margin-top: 3rem; flex-wrap: wrap;
}
.btn-primary {
  display: inline-flex; align-items: center; gap: 0.6rem;
  background: var(--gold); color: var(--navy);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem; font-weight: 500; letter-spacing: 0.12em;
  text-transform: uppercase; padding: 0.9rem 2rem;
  border: none; cursor: pointer; text-decoration: none;
  transition: all 0.25s;
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
}
.btn-primary:hover {
  background: var(--gold-2);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(201,168,76,0.3);
}
.btn-outline {
  display: inline-flex; align-items: center; gap: 0.6rem;
  background: transparent; color: var(--text);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem; font-weight: 400; letter-spacing: 0.12em;
  text-transform: uppercase; padding: 0.9rem 2rem;
  border: 1px solid var(--rule); cursor: pointer; text-decoration: none;
  transition: all 0.25s;
}
.btn-outline:hover { border-color: var(--gold); color: var(--gold); }

/* Portrait */
.portrait-wrap {
  position: relative;
  width: 340px; height: 440px;
}
.portrait-bg-shape {
  position: absolute;
  top: -1.5rem; left: -1.5rem; right: 1.5rem; bottom: 1.5rem;
  border: 1px solid var(--gold-border);
  z-index: 0;
}
.portrait-img {
  position: relative; z-index: 1;
  width: 100%; height: 100%;
  object-fit: cover;
  filter: grayscale(30%) contrast(1.1);
  display: block;
}
.portrait-fallback-box {
  position: relative; z-index: 1;
  width: 100%; height: 100%;
  background: var(--navy-3);
  border: 1px solid var(--card-border);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 0.5rem;
}
.portrait-initials {
  font-family: 'Cormorant Garamond', serif;
  font-size: 7rem; font-weight: 300;
  color: var(--gold-border);
  line-height: 1;
}
.portrait-badge {
  position: absolute; bottom: -1.25rem; right: -1.25rem; z-index: 2;
  background: var(--gold); color: var(--navy);
  padding: 0.75rem 1.25rem;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
}
.portrait-badge-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase;
  opacity: 0.7; display: block;
}
.portrait-badge-val {
  font-size: 0.85rem; font-weight: 700;
  display: block; margin-top: 0.1rem;
}

/* Hero social strip */
.hero-social {
  display: flex; gap: 0;
  margin-top: 2.5rem;
  border: 1px solid var(--rule);
  width: fit-content;
}
.hero-social-link {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  border-right: 1px solid var(--rule);
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem; letter-spacing: 0.1em;
  color: var(--text-3);
  transition: all 0.2s;
}
.hero-social-link:last-child { border-right: none; }
.hero-social-link:hover { background: var(--gold-dim); color: var(--gold); border-color: var(--gold-border); }
.hero-social-link img { width: 13px; height: 13px; object-fit: contain; flex-shrink: 0; }

/* ── SECTION WRAPPER ── */
.section { padding: 7rem 5vw; border-top: 1px solid var(--rule); }
.section-inner { max-width: 1280px; margin: 0 auto; }

/* Section header */
.sec-head {
  display: flex; align-items: center; gap: 1.5rem;
  margin-bottom: 5rem;
}
.sec-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem; letter-spacing: 0.2em; color: var(--gold);
  background: var(--gold-dim);
  border: 1px solid var(--gold-border);
  padding: 0.3rem 0.6rem;
}
.sec-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300; color: var(--white);
  letter-spacing: -0.01em;
}
.sec-rule { flex: 1; height: 1px; background: var(--rule); }

/* ── EDUCATION ── */
.edu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
@media(max-width:900px){ .edu-grid { grid-template-columns: 1fr; } }

.edu-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  padding: 2.5rem 2rem;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, transform 0.3s;
  backdrop-filter: blur(10px);
}
.edu-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.edu-card:hover { border-color: var(--gold-border); transform: translateY(-4px); }
.edu-card:hover::before { opacity: 1; }
.edu-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem; letter-spacing: 0.1em;
  color: var(--gold); margin-bottom: 1.25rem;
}
.edu-school {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem; font-weight: 600;
  color: var(--white); line-height: 1.3; margin-bottom: 0.5rem;
}
.edu-deg {
  font-size: 0.83rem; color: var(--text-2); line-height: 1.6; font-weight: 400;
}
.edu-num {
  position: absolute; bottom: 1.5rem; right: 1.5rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 5rem; font-weight: 300; opacity: 0.05; color: var(--gold);
  line-height: 1;
}

/* ── SKILLS ── */
.skills-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
@media(max-width:900px){ .skills-layout { grid-template-columns: 1fr; } }

.skill-panel {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  padding: 2.5rem;
  backdrop-filter: blur(10px);
}
.skill-panel-head {
  display: flex; align-items: center; gap: 0.75rem;
  margin-bottom: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--rule);
}
.skill-panel-icon {
  width: 34px; height: 34px;
  background: var(--gold-dim); border: 1px solid var(--gold-border);
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem;
}
.skill-panel-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--gold);
}

.tech-cloud { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tech-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem; letter-spacing: 0.05em;
  color: var(--text-2);
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--card-border);
  padding: 0.45rem 0.9rem;
  cursor: default;
  transition: all 0.2s;
}
.tech-tag:hover {
  background: var(--gold-dim);
  border-color: var(--gold-border);
  color: var(--gold);
}

/* Language bars */
.lang-stack { display: flex; flex-direction: column; gap: 1.25rem; }
.lang-row { }
.lang-top { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
.lang-name { font-size: 0.88rem; font-weight: 600; color: var(--text); }
.lang-lvl {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem; letter-spacing: 0.08em; color: var(--gold);
}
.lang-track { width: 100%; height: 2px; background: var(--rule); }
.lang-fill { height: 100%; background: linear-gradient(90deg, var(--gold) 0%, var(--gold-2) 100%); transition: width 1.2s cubic-bezier(0.16,1,0.3,1); }

/* Tools row */
.tools-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; }
.tool-chip {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.65rem 0.9rem;
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--card-border);
  font-size: 0.8rem; font-weight: 500; color: var(--text-2);
  transition: all 0.2s; cursor: default;
}
.tool-chip:hover { background: var(--gold-dim); border-color: var(--gold-border); color: var(--gold); }
.tool-dot { width: 4px; height: 4px; background: var(--gold); border-radius: 50%; flex-shrink: 0; }

/* ── EXPERIENCE ── */
.exp-list { display: flex; flex-direction: column; }
.exp-item {
  border-bottom: 1px solid var(--rule);
  position: relative;
}
.exp-item:first-child { border-top: 1px solid var(--rule); }
.exp-trigger {
  width: 100%; text-align: left; background: none; border: none; cursor: pointer;
  padding: 2rem 0;
  display: grid; grid-template-columns: 60px 1fr 200px 40px;
  gap: 1.5rem; align-items: center;
  transition: padding 0.2s;
}
.exp-trigger:hover { padding-left: 1rem; padding-right: 0.5rem; }
.exp-index {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem; font-weight: 300;
  color: var(--gold); opacity: 0.3;
  line-height: 1;
}
.exp-trigger:hover .exp-index { opacity: 0.7; }
.exp-co {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--text-3); margin-bottom: 0.4rem;
}
.exp-role {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem; font-weight: 600; color: var(--white); line-height: 1.2;
}
.exp-meta-col { text-align: right; }
.exp-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem; letter-spacing: 0.06em; color: var(--text-3);
  display: block; margin-bottom: 0.3rem;
}
.exp-loc { font-size: 0.8rem; color: var(--text-2); display: block; font-weight: 500; }
.exp-arrow {
  width: 36px; height: 36px;
  border: 1px solid var(--rule);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; color: var(--text-3);
  transition: all 0.25s; flex-shrink: 0;
}
.exp-arrow.open { background: var(--gold); color: var(--navy); border-color: var(--gold); }
.exp-body {
  padding: 0 0 2rem 75px;
  animation: fadeSlide 0.3s ease;
}
@keyframes fadeSlide { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }
.exp-duty {
  position: relative; padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem; line-height: 1.8; color: var(--text-2); font-weight: 400;
}
.exp-duty::before {
  content: '';
  position: absolute; left: 0; top: 0.75rem;
  width: 8px; height: 1px; background: var(--gold);
}

/* ── PROJECTS ── */
.projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
@media(max-width:768px){ .projects-grid { grid-template-columns: 1fr; } }
.proj-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  padding: 2.1rem;
  text-decoration: none; color: inherit;
  display: flex; flex-direction: column;
  position: relative; overflow: hidden;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
}
.proj-card::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, transparent 60%, var(--gold-dim));
  opacity: 0; transition: opacity 0.3s;
}
.proj-card:hover { border-color: var(--gold-border); transform: translateY(-6px); box-shadow: var(--glow), 0 20px 60px rgba(0,0,0,0.3); }
.proj-card:hover::before { opacity: 1; }
.proj-number {
  font-family: 'Cormorant Garamond', serif;
  font-size: 3.6rem; font-weight: 300;
  color: var(--gold); opacity: 0.12;
  position: absolute; top: 1rem; right: 1.5rem;
  line-height: 1; transition: opacity 0.3s;
}
.proj-card:hover .proj-number { opacity: 0.25; }
.proj-top-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem; letter-spacing: 0.14em;
  color: var(--gold); margin-bottom: 1.3rem;
}
.proj-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem; font-weight: 600; color: var(--white); line-height: 1;
}
.proj-subtitle { font-size: 0.8rem; color: var(--text-3); margin-top: 0.4rem; font-weight: 400; }
.proj-desc {
  font-size: 0.88rem; color: var(--text-2);
  margin-top: 1rem; line-height: 1.75; font-weight: 400;
  flex: 1;
}
.proj-tech { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 1.25rem; }
.proj-tech-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem; letter-spacing: 0.08em;
  color: var(--text-3); border: 1px solid var(--rule);
  padding: 0.25rem 0.6rem;
}
.proj-link-row {
  display: flex; align-items: center; gap: 0.5rem;
  margin-top: 1.25rem; padding-top: 1rem;
  border-top: 1px solid var(--rule);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--text-3); transition: color 0.2s;
}
.proj-card:hover .proj-link-row { color: var(--gold); }
.proj-card.more-projects {
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100%;
}
.proj-card.more-projects .proj-number,
.proj-card.more-projects .proj-top-tag,
.proj-card.more-projects .proj-subtitle,
.proj-card.more-projects .proj-desc,
.proj-card.more-projects .proj-tech,
.proj-card.more-projects .proj-link-row {
  display: none;
}
.proj-more-text {
  position: relative;
  z-index: 1;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.95rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold);
}

/* ── ACHIEVEMENTS ── */
.achieve-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
@media(max-width:640px){ .achieve-grid { grid-template-columns: 1fr; } }
.achieve-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  padding: 2.5rem;
  text-decoration: none; color: inherit;
  display: block; position: relative;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
  overflow: hidden;
}
.achieve-card::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  transform: scaleX(0); transition: transform 0.4s;
}
.achieve-card:hover { border-color: var(--gold-border); transform: translateY(-4px); }
.achieve-card:hover::after { transform: scaleX(1); }
.achieve-arr {
  position: absolute; top: 1.75rem; right: 1.75rem;
  font-size: 1rem; color: var(--text-3); transition: all 0.2s;
}
.achieve-card:hover .achieve-arr { color: var(--gold); transform: translate(3px, -3px); }
.achieve-icon { font-size: 2rem; display: block; margin-bottom: 1.25rem; }
.achieve-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem; font-weight: 600; color: var(--white);
}
.achieve-org {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem; letter-spacing: 0.1em;
  color: var(--gold); margin-top: 0.3rem; text-transform: uppercase;
}
.achieve-desc { font-size: 0.85rem; color: var(--text-2); margin-top: 0.75rem; line-height: 1.7; }

/* ── CONTACT ── */
.contact-section {
  padding: 8rem 5vw;
  background: linear-gradient(180deg, var(--navy) 0%, var(--navy-3) 100%);
  border-top: 1px solid var(--rule);
  position: relative; overflow: hidden;
}
.contact-section::before {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 700px; height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%);
  pointer-events: none;
}
.contact-inner {
  max-width: 1280px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center;
}
@media(max-width:768px){ .contact-inner { grid-template-columns: 1fr; gap: 3rem; } }
.contact-heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 300; color: var(--white); line-height: 1.0;
}
.contact-heading em { font-style: italic; color: var(--gold); }
.contact-sub { font-size: 0.95rem; color: var(--text-2); margin-top: 1.25rem; line-height: 1.9; font-weight: 400; }
.contact-links { display: flex; flex-direction: column; gap: 0; border: 1px solid var(--card-border); }
.c-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--rule);
  text-decoration: none; color: var(--text);
  transition: all 0.2s;
}
.c-link:last-child { border-bottom: none; }
.c-link:hover { background: var(--gold-dim); }
.c-link-left { display: flex; align-items: center; gap: 1rem; }
.c-link-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem; letter-spacing: 0.12em;
  color: var(--gold); text-transform: uppercase; width: 70px;
}
.c-link-val { font-size: 0.88rem; color: var(--text-2); font-weight: 400; }
.c-link-arr { color: var(--text-3); transition: all 0.2s; }
.c-link:hover .c-link-arr { color: var(--gold); transform: translateX(4px); }

/* ── FOOTER ── */
.footer {
  border-top: 1px solid var(--rule);
  padding: 2rem 5vw;
  background: var(--navy-2);
}
.footer-inner {
  max-width: 1280px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
}
.footer-mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem; letter-spacing: 0.1em; color: var(--text-3);
  text-decoration: none;
  display: flex; align-items: center; gap: 0.4rem;
}
.footer-diamond {
  color: var(--gold);
  font-size: 0.5rem;
}

@media(max-width:1024px){
  .hero { grid-template-columns: 1fr; }
  .hero-right { display: none; }
  .hero-left { padding: 7rem 5vw 5rem; }
}
@media(max-width:768px){
  .nav { padding: 0 1.5rem; }
  .nav-links { display: none; }
  .section { padding: 5rem 1.5rem; }
  .exp-trigger { grid-template-columns: 40px 1fr 32px; gap: 1rem; }
  .exp-meta-col { display: none; }
  .exp-body { padding-left: 55px; }
  .skills-layout { grid-template-columns: 1fr; }
  .tools-row { grid-template-columns: repeat(2, 1fr); }
}
`
document.head.appendChild(style)

/* ── Icons ── */
const SocialIcon = ({ src, alt }) => <img src={src} alt={alt} aria-hidden="true" />
const GhIcon = () => <SocialIcon src="/github.png" alt="GitHub" />
const LiIcon = () => <SocialIcon src="/linkedin.png" alt="LinkedIn" />
const LeetCodeIcon = () => <SocialIcon src="/leetcode.png" alt="LeetCode" />
const DownIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

/* ── Scroll reveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal")
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible") }),
      { threshold: 0.08 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── Data ── */
const NAV_ITEMS = ["home","about","skills","experience","projects","contact"]

const EDUCATION = [
  { school: "Technische Universität Ilmenau", degree: "M.Sc. Research in Computer & Systems Engineering", date: "Apr 2025 – Present" },
  { school: "SVMIT Bharuch", degree: "B.E. Information Technology", date: "Sep 2020 – Mar 2023" },
  { school: "KJ Polytechnic Bharuch", degree: "Diploma, Chemical Engineering", date: "2016 – 2020" },
]

const TECH = ["Flutter","Dart","Java","React","TypeScript","Node.js","Spring Boot","Docker","AWS","GCP","MongoDB","PostgreSQL","Firebase","Fastlane","FFmpeg"]
const TOOLS = ["Docker","AWS","GCP","Firebase","FFmpeg","Fastlane"]
const LANGUAGES = [
  { name: "Hindi",   level: "Native",        pct: 100 },
  { name: "English", level: "C1 Advanced",   pct: 82  },
  { name: "German",  level: "A2 Basic",      pct: 22  },
]

const EXPERIENCES = [
  { title: "Student Assistant", company: "Fraunhofer IOSB AST", date: "08/2025 – Present", location: "Ilmenau, Germany", duties: ["Assisted in ongoing research on the SOGNO control system for smart grid automation.", "Developed a visualization tool from scratch using React and Spring Boot, integrated with the existing system."] },
  { title: "Software Engineer", company: "Wishtales AI", date: "10/2024 – 03/2025", location: "Delaware, USA (Remote)", duties: ["Built video-editor features and used FFmpeg for video generation from short clips.", "Reduced unnecessary cache usage by ~20% through targeted performance improvements.", "Implemented video file encryption using AES with PKCS7 padding.", "Used isolates for multithreaded encryption processing."] },
  { title: "Software Engineer", company: "Local24 Pvt Ltd", date: "01/2024 – 09/2024", location: "Bharuch, India", duties: ["Developed the Local24 ecommerce solution and its web counterpart.", "Used Firebase Dynamic Links, Google Analytics, and Remote Config for personalised experiences.", "Integrated Razorpay and supported backend services using Spring Boot with webhooks."] },
  { title: "Mobile Application Developer", company: "Ojas Aerospace", date: "04/2023 – 01/2024", location: "Dehradun, India", duties: ["Built HAL, a drone-enabled crop-monitoring and farming marketplace application.", "Developed an HRMS app from scratch with attendance, payroll, and inventory features.", "Deployed apps to Google Play Store and Apple App Store.", "Configured CI/CD pipelines with Fastlane for automated Play Store deployments."] },
]

const PROJECTS = [
  { name: "RoadRadar", sub: "Road Safety & Hazard Reporting", desc: "Full-stack app enabling users to report road hazards in real time. Built with Clean Architecture and Riverpod on Flutter, backed by Node.js, AWS, and MongoDB.", tech: ["Flutter","Node.js","AWS","MongoDB","Riverpod"], link: "https://github.com/iamthejafar/RoadRadar" },
  { name: "Knightly", sub: "Multiplayer Chess Platform", desc: "Real-time multiplayer chess platform using Flutter Web and Spring Boot with WebSocket gameplay, Google authentication, player profiles, and full game history.", tech: ["Java","Spring Boot","Flutter Web","WebSocket","Google Auth"], link: "https://jafarjalali.tech/knightly/#/home" },
  { name: "Monify", sub: "Expense Tracker App", desc: "Designed a database for tracking user interactions such as transactions, profiles, and goals. Optimized performance with video compression, on-demand pre-loading, and state data preservation.", tech: ["Flutter","Firebase","Database Design","Video Compression","State Management"], link: "https://github.com/iamthejafar/monify" },
  { name: "View More Projects", sub: "GitHub Repositories", desc: "Explore more of my work and browse additional repositories on GitHub.", tech: ["GitHub","Repositories"], link: "https://github.com/iamthejafar?tab=repositories" },
]

const ACHIEVEMENTS = [
  { icon: "⭐", title: "4-Star Problem Solving", org: "HackerRank · March 2023", desc: "Achieved 4-star rating in Problem Solving on HackerRank.", url: "https://www.linkedin.com/posts/jafarjalali128_just-earned-the-silver-badge-for-problem-activity-6969036481172500480-jmnh" },
  { icon: "🏆", title: "CodePhod Runner-up", org: "Competitive Coding · SVMIT", desc: "Runner-up in a college-level competitive coding event.", url: "https://www.linkedin.com/posts/jafarjalali128_secured-2nd-position-in-codephod-competion-activity-6977252024077676544-xA1H" },
]

/* ── Portrait ── */
function Portrait() {
  const [err, setErr] = useState(false)
  return (
    <div className="portrait-wrap">
      <div className="portrait-bg-shape" />
      {err ? (
        <div className="portrait-fallback-box">
          <div className="portrait-initials">JJ</div>
        </div>
      ) : (
        <img className="portrait-img" src="/profile.jpg" alt="Jafar Jalali" onError={() => setErr(true)} />
      )}
      <div className="portrait-badge">
        <span className="portrait-badge-label">Based in</span>
        <span className="portrait-badge-val">Germany</span>
      </div>
    </div>
  )
}

/* ── Skills section ── */
function SkillsSection() {
  const [barsOn, setBarsOn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setBarsOn(true), 500); return () => clearTimeout(t) }, [])
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="skills-layout">
        {/* Tech */}
        <div className="skill-panel reveal d1">
          <div className="skill-panel-head">
            <div className="skill-panel-icon">⚡</div>
            <span className="skill-panel-title">Technical Stack</span>
          </div>
          <div className="tech-cloud">
            {TECH.map(t => <span key={t} className="tech-tag">{t}</span>)}
          </div>
        </div>
        {/* Languages */}
        <div className="skill-panel reveal d2">
          <div className="skill-panel-head">
            <div className="skill-panel-icon">🌐</div>
            <span className="skill-panel-title">Languages</span>
          </div>
          <div className="lang-stack">
            {LANGUAGES.map(({ name, level, pct }) => (
              <div key={name} className="lang-row">
                <div className="lang-top">
                  <span className="lang-name">{name}</span>
                  <span className="lang-lvl">{level}</span>
                </div>
                <div className="lang-track">
                  <div className="lang-fill" style={{ width: barsOn ? `${pct}%` : "0%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Tools */}
      <div className="skill-panel reveal d3">
        <div className="skill-panel-head">
          <div className="skill-panel-icon">🛠</div>
          <span className="skill-panel-title">Platforms & Tools</span>
        </div>
        <div className="tools-row">
          {TOOLS.map(t => (
            <div key={t} className="tool-chip">
              <div className="tool-dot" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── App ── */
export default function App() {
  const [activeNav, setActiveNav] = useState("home")
  const [openExp, setOpenExp] = useState(0)

  useReveal()

  const goto = (id) => {
    setActiveNav(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id) }),
      { rootMargin: "-40% 0px -55% 0px" }
    )
    NAV_ITEMS.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  return (
    <div>
      {/* NAV */}
      <nav className="nav">
        <a className="nav-brand" href="#home" onClick={e => { e.preventDefault(); goto("home") }}>JJ</a>
        <ul className="nav-links">
          {NAV_ITEMS.map(id => (
            <li key={id}>
              <button className={activeNav === id ? "active" : ""} onClick={() => goto(id)}>{id}</button>
            </li>
          ))}
        </ul>
        <a href="/cv.pdf" download="Jafar_Jalali_CV.pdf" className="btn-primary" style={{ fontSize: "0.65rem", padding: "0.6rem 1.2rem" }}>
          <DownIcon /> CV
        </a>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-left">
          <div className="reveal" style={{ transitionDelay: "0.1s" }}>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" />
              <span className="hero-eyebrow-text">Full-Stack Developer</span>
            </div>
            <h1 className="hero-name">
              Jafar<em>Jalali</em>
            </h1>
            <p className="hero-desc">
              Experienced developer specialising in Flutter and React, with strong backend capabilities in Spring Boot and Node.js. Currently pursuing an M.Sc. at TU Ilmenau.
            </p>
            <div className="hero-actions">
              <a href="mailto:jafarjalali128@gmail.com" className="btn-primary">✉ Email Me</a>
              <a href="/cv.pdf" download="Jafar_Jalali_CV.pdf" className="btn-outline"><DownIcon /> Download CV</a>
            </div>
            <div className="hero-social">
              <a href="https://github.com/iamthejafar" target="_blank" rel="noopener noreferrer" className="hero-social-link">
                <GhIcon /> GitHub
              </a>
              <a href="https://linkedin.com/in/jafarjalali128/" target="_blank" rel="noopener noreferrer" className="hero-social-link">
                <LiIcon /> LinkedIn
              </a>
               <a href="https://leetcode.com/u/jafarjalali128/" target="_blank" rel="noopener noreferrer" className="hero-social-link">
                <LeetCodeIcon /> LeetCode
              </a>
            </div>
          </div>
        </div>
        <div className="hero-right reveal right" style={{ transitionDelay: "0.3s" }}>
          <Portrait />
        </div>
      </section>

      {/* EDUCATION */}
      <section id="about" className="section">
        <div className="section-inner">
          <div className="sec-head reveal">
            <span className="sec-num">01</span>
            <h2 className="sec-title">Education</h2>
            <div className="sec-rule" />
          </div>
          <div className="edu-grid">
            {EDUCATION.map((e, i) => (
              <div key={e.school} className={`edu-card reveal d${i+1}`}>
                <div className="edu-date">{e.date}</div>
                <div className="edu-school">{e.school}</div>
                <div className="edu-deg">{e.degree}</div>
                <div className="edu-num">{String(i+1).padStart(2,"0")}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <div className="section-inner">
          <div className="sec-head reveal">
            <span className="sec-num">02</span>
            <h2 className="sec-title">Skills</h2>
            <div className="sec-rule" />
          </div>
          <SkillsSection />
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <div className="section-inner">
          <div className="sec-head reveal">
            <span className="sec-num">03</span>
            <h2 className="sec-title">Experience</h2>
            <div className="sec-rule" />
          </div>
          <div className="exp-list">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="exp-item reveal">
                <button className="exp-trigger" onClick={() => setOpenExp(openExp === idx ? null : idx)} aria-expanded={openExp === idx}>
                  <div className="exp-index">{String(idx+1).padStart(2,"0")}</div>
                  <div>
                    <div className="exp-co">{exp.company}</div>
                    <div className="exp-role">{exp.title}</div>
                  </div>
                  <div className="exp-meta-col">
                    <span className="exp-date">{exp.date}</span>
                    <span className="exp-loc">{exp.location}</span>
                  </div>
                  <div className={`exp-arrow${openExp === idx ? " open" : ""}`}>{openExp === idx ? "−" : "+"}</div>
                </button>
                {openExp === idx && (
                  <div className="exp-body">
                    {exp.duties.map((d, i) => <p key={i} className="exp-duty">{d}</p>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="section-inner">
          <div className="sec-head reveal">
            <span className="sec-num">04</span>
            <h2 className="sec-title">Projects</h2>
            <div className="sec-rule" />
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`proj-card reveal d${i+1}${i === PROJECTS.length - 1 ? ' more-projects' : ''}`}
              >
                {i === PROJECTS.length - 1 ? (
                  <div className="proj-more-text">View More</div>
                ) : (
                  <>
                    <div className="proj-number">0{i+1}</div>
                    <div className="proj-top-tag">◆ PROJECT</div>
                    <div className="proj-name">{p.name}</div>
                    <div className="proj-subtitle">{p.sub}</div>
                    <div className="proj-desc">{p.desc}</div>
                    <div className="proj-tech">
                      {p.tech.map(t => <span key={t} className="proj-tech-tag">{t}</span>)}
                    </div>
                    <div className="proj-link-row">View Project <span style={{ marginLeft: "auto" }}>↗</span></div>
                  </>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="section">
        <div className="section-inner">
          <div className="sec-head reveal">
            <span className="sec-num">05</span>
            <h2 className="sec-title">Achievements</h2>
            <div className="sec-rule" />
          </div>
          <div className="achieve-grid">
            {ACHIEVEMENTS.map((a, i) => (
              <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" className={`achieve-card reveal d${i+1}`}>
                <span className="achieve-arr">↗</span>
                <span className="achieve-icon">{a.icon}</span>
                <div className="achieve-title">{a.title}</div>
                <div className="achieve-org">{a.org}</div>
                <div className="achieve-desc">{a.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <div className="reveal">
            <h2 className="contact-heading">Let's work<br/><em>together.</em></h2>
            <p className="contact-sub">Open to collaboration, freelance work, and full-time roles in mobile and full-stack development.</p>
          </div>
          <div className="contact-links reveal d2">
            {[
              { label: "Email",    val: "jafarjalali128@gmail.com",  href: "mailto:jafarjalali128@gmail.com" },
              { label: "LinkedIn", val: "jafarjalali128",            href: "https://linkedin.com/in/jafarjalali128/" },
              { label: "GitHub",   val: "iamthejafar",              href: "https://github.com/iamthejafar" },
              { label: "Phone",    val: "+49 176 3680 0276",        href: "tel:+4917636800276" },
            ].map(({ label, val, href }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="c-link">
                <div className="c-link-left">
                  <span className="c-link-label">{label}</span>
                  <span className="c-link-val">{val}</span>
                </div>
                <span className="c-link-arr">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-mono">© 2026 Jafar Jalali</span>
          <a href="/public/cv.pdf" download="Jafar_Jalali_CV.pdf" className="footer-mono"><DownIcon /> Download CV</a>
        </div>
      </footer>
    </div>
  )
}
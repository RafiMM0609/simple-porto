import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const cssDir = path.join(projectRoot, 'css');

const CSS_FILES = [
  'variables.css',
  'reset.css',
  'typography.css',
  'layout.css',
  'main.css',
  'components/navbar.css',
  'components/stage.css',
  'components/laptop.css',
  'components/cards.css',
  'components/controls.css',
  'components/info-pill.css',
  'components/modal.css',
  'components/orbital.css',
  'components/mobile-reel.css'
];

test('CSS Files Existence and Non-Emptiness', () => {
  for (const relPath of CSS_FILES) {
    const fullPath = path.join(cssDir, relPath);
    assert.ok(fs.existsSync(fullPath), `CSS file does not exist: ${relPath}`);
    const content = fs.readFileSync(fullPath, 'utf8');
    assert.ok(content.trim().length > 0, `CSS file is empty: ${relPath}`);
  }
});

test('Raw CSS Rule Compliance (No Tailwind or External CSS Frameworks)', () => {
  for (const relPath of CSS_FILES) {
    const fullPath = path.join(cssDir, relPath);
    const content = fs.readFileSync(fullPath, 'utf8');

    assert.ok(!content.includes('@tailwind'), `Tailwind directive found in ${relPath}`);
    assert.ok(!content.includes('@apply'), `Tailwind @apply found in ${relPath}`);
    assert.ok(!content.includes('bootstrap'), `Bootstrap reference found in ${relPath}`);
  }
});

test('CSS Syntax Integrity - Balanced Braces in all files', () => {
  for (const relPath of CSS_FILES) {
    const fullPath = path.join(cssDir, relPath);
    const content = fs.readFileSync(fullPath, 'utf8');

    // Remove comments and strings before counting braces
    const cleanContent = content
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/"[^"]*"/g, '""')
      .replace(/'[^']*'/g, "''");

    const openCount = (cleanContent.match(/\{/g) || []).length;
    const closeCount = (cleanContent.match(/\}/g) || []).length;

    assert.equal(
      openCount,
      closeCount,
      `Unbalanced curly braces in ${relPath}: ${openCount} open vs ${closeCount} close`
    );
  }
});

test('Design Tokens & Variables Definitions', () => {
  const varsPath = path.join(cssDir, 'variables.css');
  const varsContent = fs.readFileSync(varsPath, 'utf8');

  const requiredTokens = [
    '--bg-base',
    '--moss-accent',
    '--moss-glow',
    '--cream-card',
    '--cream-text',
    '--font-sans',
    '--font-serif',
    '--radius-xl',
    '--shadow-card'
  ];

  for (const token of requiredTokens) {
    assert.ok(
      varsContent.includes(token),
      `variables.css missing critical design token: ${token}`
    );
  }
});

test('Mockup Essential Component Selectors Coverage', () => {
  const allCss = CSS_FILES.map(file => fs.readFileSync(path.join(cssDir, file), 'utf8')).join('\n');

  const essentialSelectors = [
    '.brand-logo',
    '.nav-pill',
    '.nav-icon-btn',
    '.nav-cart-btn',
    '.showcase-stage',
    '.showcase-grid',
    '.podium-center',
    '.laptop-device',
    '.laptop-screen',
    '.laptop-base',
    '.moss-pedestal',
    '.product-card',
    '.product-card.active',
    '.card-icon-box',
    '.carousel-btn',
    '.carousel-btn--prev',
    '.carousel-btn--next',
    '.product-info-pill',
    '.pill-title',
    '.pill-meta',
    '.pill-action-btn',
    '.section-title',
    '.interactive-hint',
    'dialog.product-modal'
  ];

  for (const selector of essentialSelectors) {
    assert.ok(
      allCss.includes(selector),
      `CSS missing expected mockup selector: ${selector}`
    );
  }
});

test('Modern CSS & Top-Layer Discrete Transitions', () => {
  const modalCss = fs.readFileSync(path.join(cssDir, 'components/modal.css'), 'utf8');

  assert.ok(
    modalCss.includes('@starting-style'),
    'modal.css must utilize modern @starting-style for entry animations'
  );
  assert.ok(
    modalCss.includes('allow-discrete'),
    'modal.css must utilize transition-behavior: allow-discrete for top-layer display transitions'
  );
  assert.ok(
    modalCss.includes('::backdrop'),
    'modal.css must style dialog ::backdrop'
  );
});

test('Mobile Responsiveness Media Queries', () => {
  const allCss = CSS_FILES.map(file => fs.readFileSync(path.join(cssDir, file), 'utf8')).join('\n');

  assert.ok(
    allCss.includes('@media (max-width: 640px)'),
    'CSS must include mobile breakpoint @media (max-width: 640px)'
  );
  assert.ok(
    allCss.includes('@media (max-width: 1024px)'),
    'CSS must include tablet/responsive breakpoint @media (max-width: 1024px)'
  );
  assert.ok(
    allCss.includes('.mobile-reel-feed'),
    'CSS must define mobile reel feed for phone viewport'
  );
});

test('Interactive Accessibility & Focus Management', () => {
  const resetCss = fs.readFileSync(path.join(cssDir, 'reset.css'), 'utf8');
  assert.ok(
    resetCss.includes(':focus-visible'),
    'reset.css must provide visible focus indicators for accessibility'
  );
  assert.ok(
    resetCss.includes('outline'),
    'reset.css must define focus outline styling'
  );
});

test('Keyframe Animations & Micro-interactions', () => {
  const typoCss = fs.readFileSync(path.join(cssDir, 'typography.css'), 'utf8');
  const stageCss = fs.readFileSync(path.join(cssDir, 'components/stage.css'), 'utf8');

  assert.ok(
    typoCss.includes('@keyframes pulse-glow'),
    'typography.css must define pulse-glow animation for interactive hints'
  );
  assert.ok(
    stageCss.includes('@keyframes float-mote'),
    'stage.css must define float-mote animation for ambient motes'
  );
});

test('Mobile Touch Scroll Snap Rules', () => {
  const reelCss = fs.readFileSync(path.join(cssDir, 'components/mobile-reel.css'), 'utf8');

  assert.ok(
    reelCss.includes('scroll-snap-type: y mandatory'),
    'mobile-reel.css must specify scroll-snap-type: y mandatory for vertical reel feed'
  );
  assert.ok(
    reelCss.includes('scroll-snap-align: start'),
    'mobile-reel.css must specify scroll-snap-align: start for reel slides'
  );
});

test('Laptop Screen Video Media Elements & WebM Support', () => {
  const laptopCss = fs.readFileSync(path.join(cssDir, 'components/laptop.css'), 'utf8');

  assert.ok(
    laptopCss.includes('.screen-video-wrapper'),
    'laptop.css must define .screen-video-wrapper for WebM preview container'
  );
  assert.ok(
    laptopCss.includes('.screen-video'),
    'laptop.css must define .screen-video styling'
  );
  assert.ok(
    laptopCss.includes('object-fit: cover'),
    'laptop.css .screen-video must use object-fit: cover to fill laptop screen'
  );
});

test('Desktop Mini Show Page Component Coverage', () => {
  const cardsCss = fs.readFileSync(path.join(cssDir, 'components/cards.css'), 'utf8');

  const miniPageSelectors = [
    '.mini-show-page',
    '.mini-page-header',
    '.mini-window-dots',
    '.mini-page-url',
    '.mini-live-tag',
    '.mini-page-body',
    '.mini-feed-item',
    '.mini-gantt-bar',
    '.mini-bento-grid',
    '.mini-chips-row'
  ];

  for (const selector of miniPageSelectors) {
    assert.ok(
      cardsCss.includes(selector),
      `components/cards.css missing expected mini show page selector: ${selector}`
    );
  }
});

test('Mobile Full Screen Reel Viewport & Layout', () => {
  const reelCss = fs.readFileSync(path.join(cssDir, 'components/mobile-reel.css'), 'utf8');
  assert.ok(
    reelCss.includes('height: 100dvh'),
    'mobile-reel.css must specify full-screen height: 100dvh'
  );
  assert.ok(
    reelCss.includes('position: fixed'),
    'mobile-reel.css must position reel feed as fixed full screen'
  );
});

test('Mini Page WebM Component & Large Pop-Up Theater Video Coverage', () => {
  const cardsCss = fs.readFileSync(path.join(cssDir, 'components/cards.css'), 'utf8');
  const modalCss = fs.readFileSync(path.join(cssDir, 'components/modal.css'), 'utf8');

  assert.ok(
    cardsCss.includes('.mini-webm-video'),
    'cards.css must define .mini-webm-video for WebM video in mini-page'
  );
  assert.ok(
    cardsCss.includes('.mini-video-frame'),
    'cards.css must define .mini-video-frame for video container in mini-page'
  );
  assert.ok(
    cardsCss.includes('.mini-zoom-pill'),
    'cards.css must define .mini-zoom-pill indicator'
  );
  assert.ok(
    modalCss.includes('.modal-video-theater'),
    'modal.css must define .modal-video-theater for large video pop-up'
  );
  assert.ok(
    modalCss.includes('.modal-large-video'),
    'modal.css must define .modal-large-video for enlarged theater video player'
  );
});

test('Modal Dual Modes (Detail As Is vs Full WebM Video Theater)', () => {
  const modalCss = fs.readFileSync(path.join(cssDir, 'components/modal.css'), 'utf8');

  assert.ok(
    modalCss.includes('.modal-mode--detail'),
    'modal.css must define .modal-mode--detail for screen-video click (as is)'
  );
  assert.ok(
    modalCss.includes('.modal-mode--video'),
    'modal.css must define .modal-mode--video for mini-page click (full webm view)'
  );
  assert.ok(
    modalCss.includes('.modal-surface--detail'),
    'modal.css must define .modal-surface--detail'
  );
  assert.ok(
    modalCss.includes('.modal-surface--video'),
    'modal.css must define .modal-surface--video'
  );
  assert.ok(
    modalCss.includes('.modal-video-topbar'),
    'modal.css must define .modal-video-topbar'
  );
});

test('Orbital Floating Nodes Layout & Constellation Coverage', () => {
  const orbitalCss = fs.readFileSync(path.join(cssDir, 'components/orbital.css'), 'utf8');
  const varsCss = fs.readFileSync(path.join(cssDir, 'variables.css'), 'utf8');

  const requiredOrbitalTokens = [
    '--orbital-orbit-ring',
    '--orbital-orbit-ring-glow',
    '--orbital-node-glow',
    '--orbital-track-dash',
    '--orbital-filament'
  ];

  for (const token of requiredOrbitalTokens) {
    assert.ok(
      varsCss.includes(token),
      `variables.css missing orbital design token: ${token}`
    );
  }

  const requiredOrbitalSelectors = [
    '.orbital-tracks-svg',
    '.orbital-ring-path',
    '.orbital-ring-path--inner',
    '.orbital-ring-path--outer',
    '.orbital-filament-line',
    '.orbital-beacon',
    '.orbital-node',
    '.orbital-node-badge',
    '.orbital-node-pulse-dot',
    '.orbital-node--1',
    '.orbital-node--2',
    '.orbital-node--3',
    '.orbital-node--4'
  ];

  for (const selector of requiredOrbitalSelectors) {
    assert.ok(
      orbitalCss.includes(selector),
      `orbital.css missing expected selector: ${selector}`
    );
  }

  assert.ok(
    orbitalCss.includes('@keyframes orbit-levitate-1'),
    'orbital.css must define @keyframes orbit-levitate-1 for floating node 1'
  );
  assert.ok(
    orbitalCss.includes('@keyframes orbit-levitate-2'),
    'orbital.css must define @keyframes orbit-levitate-2 for floating node 2'
  );
  assert.ok(
    orbitalCss.includes('@keyframes orbit-levitate-3'),
    'orbital.css must define @keyframes orbit-levitate-3 for floating node 3'
  );
  assert.ok(
    orbitalCss.includes('@keyframes orbit-levitate-4'),
    'orbital.css must define @keyframes orbit-levitate-4 for floating node 4'
  );
});

test('Open-Chassis Matcha Laptop & Photorealistic Studio Workspace Coverage', () => {
  const laptopCss = fs.readFileSync(path.join(cssDir, 'components/laptop.css'), 'utf8');
  const layoutCss = fs.readFileSync(path.join(cssDir, 'layout.css'), 'utf8');
  const stageCss = fs.readFileSync(path.join(cssDir, 'components/stage.css'), 'utf8');

  assert.ok(
    layoutCss.includes('studio-desk-bg.webp'),
    'layout.css must link studio-desk-bg.webp for photorealistic studio background'
  );

  const keyboardSelectors = [
    '.laptop-keyboard-deck',
    '.laptop-keyboard',
    '.kbd-row',
    '.key',
    '.laptop-trackpad'
  ];

  for (const selector of keyboardSelectors) {
    assert.ok(
      laptopCss.includes(selector),
      `laptop.css missing open-chassis keyboard selector: ${selector}`
    );
  }

  assert.ok(
    stageCss.includes('.laptop-contact-shadow'),
    'stage.css must define .laptop-contact-shadow for seamless desk blending'
  );
});

test('Photorealistic Laptop Chassis Frame & Screen Glare Layer Coverage', () => {
  const laptopCss = fs.readFileSync(path.join(cssDir, 'components/laptop.css'), 'utf8');
  const frameAssetPath = path.join(__dirname, '..', 'assets/laptop-chassis-frame.png');

  assert.ok(
    fs.existsSync(frameAssetPath) && fs.statSync(frameAssetPath).size > 10000,
    'assets/laptop-chassis-frame.png must exist as a valid photorealistic frame image asset'
  );

  const realisticSelectors = [
    '.laptop-frame-img',
    '.laptop-screen-glare'
  ];

  for (const selector of realisticSelectors) {
    assert.ok(
      laptopCss.includes(selector),
      `laptop.css must define photorealistic mockup selector: ${selector}`
    );
  }

  assert.ok(
    laptopCss.includes('--laptop-aspect-ratio') || laptopCss.includes('794 / 604'),
    'laptop.css must configure aspect-ratio matching the laptop frame'
  );

  const variablesCss = fs.readFileSync(path.join(cssDir, 'variables.css'), 'utf8');
  assert.ok(
    variablesCss.includes('--laptop-max-width') && variablesCss.includes('--laptop-screen-top'),
    'variables.css must define laptop mockup customization tokens'
  );
});

test('Refined Hover Motion, Easing Tokens & Elegant Transition Coverage', () => {
  const varsContent = fs.readFileSync(path.join(cssDir, 'variables.css'), 'utf8');
  assert.ok(varsContent.includes('--ease-hover'), 'variables.css must define --ease-hover token');
  assert.ok(varsContent.includes('--ease-hover-out'), 'variables.css must define --ease-hover-out token');
  assert.ok(varsContent.includes('--duration-hover'), 'variables.css must define --duration-hover token');

  const cardsCss = fs.readFileSync(path.join(cssDir, 'components/cards.css'), 'utf8');
  assert.ok(cardsCss.includes('--ease-hover'), 'cards.css must utilize --ease-hover for smooth product card hover');

  const orbitalCss = fs.readFileSync(path.join(cssDir, 'components/orbital.css'), 'utf8');
  assert.ok(orbitalCss.includes('--ease-hover'), 'orbital.css must utilize --ease-hover for graceful floating node transitions');

  const controlsCss = fs.readFileSync(path.join(cssDir, 'components/controls.css'), 'utf8');
  assert.ok(controlsCss.includes('--ease-hover'), 'controls.css must utilize --ease-hover for carousel controls');

  const laptopCss = fs.readFileSync(path.join(cssDir, 'components/laptop.css'), 'utf8');
  assert.ok(laptopCss.includes('--ease-hover'), 'laptop.css must utilize --ease-hover for laptop hover elevation');
});

test('Mobile Full Screen TikTok/Reels Showcase CSS Coverage', () => {
  const reelCss = fs.readFileSync(path.join(cssDir, 'components/mobile-reel.css'), 'utf8');

  // Verify full-screen 100dvh vertical scroll snap rules
  assert.ok(reelCss.includes('scroll-snap-type: y mandatory'), 'mobile-reel.css must use scroll-snap-type: y mandatory');
  assert.ok(reelCss.includes('100dvh'), 'mobile-reel.css must use 100dvh for dynamic viewport height');
  assert.ok(reelCss.includes('scroll-snap-align: start'), 'mobile-reel.css must align slides to start');
  assert.ok(reelCss.includes('scroll-snap-stop: always'), 'mobile-reel.css must specify scroll-snap-stop: always');
  assert.ok(reelCss.includes('overscroll-behavior-y: contain'), 'mobile-reel.css must contain overscroll-behavior-y');
  assert.ok(reelCss.includes('touch-action: pan-y'), 'mobile-reel.css must set touch-action: pan-y');
  assert.ok(reelCss.includes('scrollbar-width: none'), 'mobile-reel.css must hide scrollbars');

  // Verify all essential mobile reel component selectors
  const requiredReelSelectors = [
    '.mobile-reel-feed',
    '.reel-slide',
    '.reel-video-container',
    '.reel-video',
    '.reel-header',
    '.reel-product-name',
    '.reel-sound-btn',
    '.reel-footer',
    '.reel-tagline',
    '.reel-explore-btn',
    '.reel-dots-container',
    '.reel-dot',
    '.reel-dot.active'
  ];

  for (const selector of requiredReelSelectors) {
    assert.ok(
      reelCss.includes(selector),
      `components/mobile-reel.css missing expected selector: ${selector}`
    );
  }
});

test('Realistic Contact Shadow, Directional Cast Shadow & Window Lighting Coverage', () => {
  const varsContent = fs.readFileSync(path.join(cssDir, 'variables.css'), 'utf8');
  assert.ok(varsContent.includes('--shadow-contact-color'), 'variables.css must define --shadow-contact-color');
  assert.ok(varsContent.includes('--shadow-cast-root'), 'variables.css must define --shadow-cast-root');
  assert.ok(varsContent.includes('--shadow-directional-card'), 'variables.css must define --shadow-directional-card');
  assert.ok(varsContent.includes('--sunlight-rim-color'), 'variables.css must define --sunlight-rim-color');
  assert.ok(varsContent.includes('--cool-screen-glow'), 'variables.css must define --cool-screen-glow');
  assert.ok(varsContent.includes('--card-navy-surface'), 'variables.css must define --card-navy-surface');
  assert.ok(varsContent.includes('--shadow-card-top'), 'variables.css must define --shadow-card-top');
  assert.ok(varsContent.includes('--shadow-card-bottom'), 'variables.css must define --shadow-card-bottom');

  const stageCss = fs.readFileSync(path.join(cssDir, 'components/stage.css'), 'utf8');
  assert.ok(stageCss.includes('.laptop-contact-shadow'), 'stage.css must define .laptop-contact-shadow');
  assert.ok(stageCss.includes('.laptop-contact-shadow::before'), 'stage.css must define .laptop-contact-shadow::before for sharp occlusion seam');
  assert.ok(stageCss.includes('.laptop-cast-shadow'), 'stage.css must define .laptop-cast-shadow for directional projection');
  assert.ok(stageCss.includes('skewX'), 'stage.css .laptop-cast-shadow must use perspective skew for realistic desk projection');
  assert.ok(stageCss.includes('.laptop-screen-desk-glow'), 'stage.css must define .laptop-screen-desk-glow for screen emission');
  assert.ok(stageCss.includes('.laptop-screen-desk-glow::before'), 'stage.css must define volumetric air haze scattering');

  const laptopCss = fs.readFileSync(path.join(cssDir, 'components/laptop.css'), 'utf8');
  assert.ok(laptopCss.includes('--shadow-laptop-near'), 'laptop.css must utilize directional drop-shadow token');
  assert.ok(laptopCss.includes('.laptop-screen-glare'), 'laptop.css must define .laptop-screen-glare with sunlight angle');
  assert.ok(laptopCss.includes('.laptop-screen-glare::before'), 'laptop.css must define blinds reflection slats on glass');

  const cardsCss = fs.readFileSync(path.join(cssDir, 'components/cards.css'), 'utf8');
  assert.ok(cardsCss.includes('--shadow-directional-card'), 'cards.css must utilize --shadow-directional-card for directional depth');
  assert.ok(cardsCss.includes('.orbital-node--1 .mini-show-page'), 'cards.css must configure specific top-left card shadow');
  assert.ok(cardsCss.includes('.orbital-node--3 .mini-show-page'), 'cards.css must configure specific top-right card shadow');
  assert.ok(cardsCss.includes('.orbital-node--2 .mini-show-page'), 'cards.css must configure specific bottom-left card shadow');
  assert.ok(cardsCss.includes('.orbital-node--4 .mini-show-page'), 'cards.css must configure specific bottom-right card shadow');

  const layoutCss = fs.readFileSync(path.join(cssDir, 'layout.css'), 'utf8');
  assert.ok(layoutCss.includes('filter: blur'), 'layout.css must configure shallow depth-of-field blur on ambient-background');
  assert.ok(layoutCss.includes('linear-gradient(') && layoutCss.includes('-36deg'), 'layout.css must configure volumetric god rays');
});

test('DETAILS.md v1.5 Visual Refinements & Spec Compliance', () => {
  const varsContent = fs.readFileSync(path.join(cssDir, 'variables.css'), 'utf8');
  const cardsCss = fs.readFileSync(path.join(cssDir, 'components/cards.css'), 'utf8');
  const controlsCss = fs.readFileSync(path.join(cssDir, 'components/controls.css'), 'utf8');
  const laptopCss = fs.readFileSync(path.join(cssDir, 'components/laptop.css'), 'utf8');
  const navbarCss = fs.readFileSync(path.join(cssDir, 'components/navbar.css'), 'utf8');
  const typoCss = fs.readFileSync(path.join(cssDir, 'typography.css'), 'utf8');
  const layoutCss = fs.readFileSync(path.join(cssDir, 'layout.css'), 'utf8');
  const orbitalCss = fs.readFileSync(path.join(cssDir, 'components/orbital.css'), 'utf8');

  // 1. Mini Page Tokens & Selectors (v1.4 / v1.5)
  assert.ok(varsContent.includes('--minipage-border'), 'variables.css must define --minipage-border');
  assert.ok(varsContent.includes('--minipage-radius'), 'variables.css must define --minipage-radius');
  assert.ok(varsContent.includes('--minipage-shadow'), 'variables.css must define --minipage-shadow');
  assert.ok(varsContent.includes('--minipage-bg'), 'variables.css must define --minipage-bg');
  assert.ok(varsContent.includes('--minipage-rim-highlight'), 'variables.css must define --minipage-rim-highlight');
  assert.ok(varsContent.includes('--minipage-filter'), 'variables.css must define --minipage-filter');
  assert.ok(cardsCss.includes('.mini-page'), 'cards.css must support .mini-page selector');
  assert.ok(cardsCss.includes('inset 0 0 0 1px rgba(255, 255, 255, 0.05)'), 'cards.css must include subtle inner shadow for thinness');
  assert.ok(cardsCss.includes('display: none !important'), 'cards.css must hide browser frame elements');

  // 1.8 Mini Page 1 position offset to clear bookshelf
  assert.ok(varsContent.includes('--minipage-1-left: 11.5%') || varsContent.includes('--minipage-1-left'), 'variables.css must position mini-page 1 clear of left bookshelf');

  // 2. Arrow Button Tokens & Selectors (v1.3)
  assert.ok(varsContent.includes('--arrow-btn-shadow'), 'variables.css must define --arrow-btn-shadow');
  assert.ok(controlsCss.includes('.arrow-button'), 'controls.css must support .arrow-button selector');
  assert.ok(controlsCss.includes('backdrop-filter: blur(10px)'), 'controls.css .arrow-button must have backdrop-filter blur(10px)');

  // 3. Laptop Screen Refinement (v1.3)
  assert.ok(laptopCss.includes('.laptop-screen::after'), 'laptop.css must define reflection sheen on .laptop-screen::after');
  assert.ok(varsContent.includes('--laptop-screen-sheen'), 'variables.css must define --laptop-screen-sheen token');
  assert.ok(varsContent.includes('--laptop-screen-inner-glow'), 'variables.css must define --laptop-screen-inner-glow token');
  assert.ok(varsContent.includes('--laptop-content-filter'), 'variables.css must define --laptop-content-filter token');

  // 4. Section Title Refinement (v1.3)
  assert.ok(varsContent.includes('--section-title-shadow'), 'variables.css must define --section-title-shadow');
  assert.ok(typoCss.includes('.section-title') && typoCss.includes('backdrop-filter: blur(10px)'), 'typography.css must style .section-title with backdrop-filter blur(10px)');

  // 5. Category Tags Refinement (v1.3)
  assert.ok(varsContent.includes('--tag-shadow'), 'variables.css must define --tag-shadow');
  assert.ok(layoutCss.includes('.tag') && layoutCss.includes('backdrop-filter: blur(10px)'), 'layout.css must style .tag with backdrop-filter blur(10px)');

  // 6. Project Title Refinement (v1.2)
  assert.ok(navbarCss.includes('.project-title'), 'navbar.css must support .project-title selector');
  assert.ok(varsContent.includes('--project-title-shadow'), 'variables.css must define --project-title-shadow');

  // 7. Brand Badge Refinement (v1.2)
  assert.ok(typoCss.includes('.brand-badge'), 'typography.css must support .brand-badge selector');
  assert.ok(varsContent.includes('--brand-badge-shadow'), 'variables.css must define --brand-badge-shadow');

  // 8. Mode Toggle Refinement (v1.2)
  assert.ok(navbarCss.includes('.mode-toggle'), 'navbar.css must support .mode-toggle selector');
  assert.ok(varsContent.includes('--mode-toggle-shadow'), 'variables.css must define --mode-toggle-shadow');
});

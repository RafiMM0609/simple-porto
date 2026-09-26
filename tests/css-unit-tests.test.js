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
  'components/orbital.css'
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
    allCss.includes('.mobile-cards-rail'),
    'CSS must define mobile cards rail for phone viewport'
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
  const layoutCss = fs.readFileSync(path.join(cssDir, 'layout.css'), 'utf8');
  const cardsCss = fs.readFileSync(path.join(cssDir, 'components/cards.css'), 'utf8');

  assert.ok(
    layoutCss.includes('scroll-snap-type: x mandatory'),
    'layout.css must specify scroll-snap-type for horizontal mobile rail'
  );
  assert.ok(
    cardsCss.includes('scroll-snap-align: center'),
    'cards.css must specify scroll-snap-align for mobile cards'
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

test('Mobile Cards Rail Position Lowered 4x', () => {
  const layoutCss = fs.readFileSync(path.join(cssDir, 'layout.css'), 'utf8');
  assert.ok(
    layoutCss.includes('margin-top: 2rem'),
    'layout.css .mobile-cards-rail must be lowered 4x with margin-top: 2rem'
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
    layoutCss.includes('studio-desk-bg.jpg'),
    'layout.css must link studio-desk-bg.jpg for photorealistic studio background'
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








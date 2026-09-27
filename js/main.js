/**
 * Main application bootstrap & coordination
 */

import { PRODUCTS } from './data/products.js';
import { hapticAudio } from './domain/audio.js';
import { ProductCarousel } from './domain/carousel.js';
import { ModalController } from './domain/modal.js';
import { MobileReelFeed } from './domain/mobile-feed.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize carousel
  const laptopScreen = document.querySelector('#laptop-screen');
  const prevBtn = document.querySelector('#carousel-prev');
  const nextBtn = document.querySelector('#carousel-next');
  const dotsContainer = document.querySelector('#carousel-dots');
  const stageWrapper = document.querySelector('#showcase-stage');

  const carousel = new ProductCarousel(PRODUCTS, {
    laptopScreen,
    prevBtn,
    nextBtn,
    dotsContainer,
    stageWrapper
  });

  // 2. Initialize Modal & Bottom Sheet
  const modalEl = document.querySelector('#product-modal');
  const modalController = new ModalController(modalEl);

  // 3. Initialize Mobile Full-Screen TikTok/Reels Feed (<= 1024px)
  const mobileReelContainer = document.querySelector('#mobile-reel-feed');
  const reelDotsContainer = document.querySelector('#reel-dots-container');

  const mobileFeed = new MobileReelFeed(PRODUCTS, {
    container: mobileReelContainer,
    dotsContainer: reelDotsContainer,
    modalController,
    hapticAudio
  });

  // 10. Dynamic Shadow physics (DETAILS.md 1.1: mapRange + easeOutQuad)
  const mapRange = (val, inMin, inMax, outMin, outMax) =>
    outMin + (outMax - outMin) * Math.max(0, Math.min(1, (val - inMin) / (inMax - inMin)));
  const easeOutQuad = t => 1 - (1 - t) * (1 - t);

  const calculateDynamicShadow = height => {
    const t = Math.max(0, Math.min(1, height / 200));
    const eased = easeOutQuad(t);
    const blur = mapRange(eased, 0, 1, 0, 30);
    const jarakTotal = mapRange(eased, 0, 1, 0, 150);
    const opacity = mapRange(eased, 0, 1, 0.5, 0.1);
    const rad40 = (40 * Math.PI) / 180;
    const offsetX = -jarakTotal * Math.cos(rad40);
    const offsetY = jarakTotal * Math.sin(rad40);
    return { blur, opacity, offsetX, offsetY };
  };

  // Click on any Desktop Mini Show Page to inspect WebM in full view
  const miniShowPages = document.querySelectorAll('.mini-show-page');
  miniShowPages.forEach(page => {
    const applyShadow = height => {
      const { blur, opacity, offsetX, offsetY } = calculateDynamicShadow(height);
      page.style.setProperty('--dynamic-shadow-blur', `${blur.toFixed(1)}px`);
      page.style.setProperty('--dynamic-shadow-opacity', opacity.toFixed(2));
      page.style.setProperty('--dynamic-shadow-offset-x', `${offsetX.toFixed(1)}px`);
      page.style.setProperty('--dynamic-shadow-offset-y', `${offsetY.toFixed(1)}px`);
    };

    // Initialize resting shadow (height ~ 45px)
    applyShadow(45);

    page.addEventListener('mouseenter', () => applyShadow(110));
    page.addEventListener('mouseleave', () => applyShadow(45));

    page.addEventListener('click', () => {
      hapticAudio.playPop();
      const product = carousel.getCurrentProduct();
      const videoEl = page.querySelector('video');
      const videoSrc = videoEl?.src || product.videoPreview;
      const titleEl = page.querySelector('.mini-video-title');
      const title = titleEl ? `${product.name} — ${titleEl.textContent}` : `${product.name} WebM Preview`;
      modalController.openVideo(product, videoSrc, title);
    });
  });

  // Trigger modal from laptop screen-video click ("as is" product detail modal)
  const laptopDevice = document.querySelector('.laptop-device');
  if (laptopDevice) {
    laptopDevice.addEventListener('click', () => {
      modalController.openDetail(carousel.getCurrentProduct());
    });
  }

  // Trigger modal from header card title badge
  const headerBadgeBtn = document.querySelector('#header-product-badge');
  if (headerBadgeBtn) {
    headerBadgeBtn.addEventListener('click', () => {
      modalController.openDetail(carousel.getCurrentProduct());
    });
  }

  // 4. Sound toggle in header
  const soundBtn = document.querySelector('#sound-toggle-btn');
  if (soundBtn) {
    const updateSoundIcon = isEnabled => {
      soundBtn.style.color = isEnabled ? 'var(--moss-accent)' : 'var(--cream-text-muted)';
      soundBtn.setAttribute('title', isEnabled ? 'Tactile Sound: On' : 'Tactile Sound: Off');
    };

    updateSoundIcon(hapticAudio.isEnabled);

    soundBtn.addEventListener('click', () => {
      const isEnabled = hapticAudio.toggleSound();
      updateSoundIcon(isEnabled);
    });
  }

  // 5. Modal workspace action
  const modalAddCartBtn = document.querySelector('#modal-add-cart-btn');
  if (modalAddCartBtn) {
    modalAddCartBtn.addEventListener('click', () => {
      hapticAudio.playChirp();
      modalController.close();
    });
  }

  // 8. Category Filter Tags
  const filterBtns = document.querySelectorAll('.filter-tag-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tag = btn.getAttribute('data-tag');
      if (tag === 'all') {
        carousel.goTo(0);
      } else {
        const matchingIdx = PRODUCTS.findIndex(p => p.categoryTag === tag);
        if (matchingIdx !== -1) {
          carousel.goTo(matchingIdx);
        }
      }
    });
  });

  // 9. Day / Night mode toggle (SPEC.md Section 6)
  const themeToggleBtn = document.querySelector('#theme-toggle-btn');
  if (themeToggleBtn) {
    const savedTheme = localStorage.getItem('productzero-theme') || 'day';
    if (savedTheme === 'night') {
      document.documentElement.setAttribute('data-mode', 'night');
    }

    const updateThemeIcon = isNight => {
      themeToggleBtn.setAttribute('title', isNight ? 'Mode: Malam (Klik untuk Siang)' : 'Mode: Siang (Klik untuk Malam)');
      themeToggleBtn.setAttribute('aria-label', isNight ? 'Switch to Day Mode' : 'Switch to Night Mode');
      themeToggleBtn.innerHTML = isNight
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    };

    updateThemeIcon(savedTheme === 'night');

    themeToggleBtn.addEventListener('click', () => {
      hapticAudio.playPop();
      const currentMode = document.documentElement.getAttribute('data-mode');
      const newMode = currentMode === 'night' ? 'day' : 'night';
      document.documentElement.setAttribute('data-mode', newMode);
      localStorage.setItem('productzero-theme', newMode);
      updateThemeIcon(newMode === 'night');
    });
  }

  // Log ready state
  console.log('ProductZero Web Products showcase initialized successfully.');
});

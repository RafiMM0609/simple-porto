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

  // Click on any Desktop Mini Show Page to inspect WebM in full view
  const miniShowPages = document.querySelectorAll('.mini-show-page');
  miniShowPages.forEach(page => {
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

  // Log ready state
  console.log('ProductZero Web Products showcase initialized successfully.');
});

/**
 * Main application bootstrap & coordination
 */

import { PRODUCTS } from './data/products.js';
import { getIconSvg } from './domain/product-renderer.js';
import { hapticAudio } from './domain/audio.js';
import { ProductCarousel } from './domain/carousel.js';
import { ModalController } from './domain/modal.js';
import { MobileReelFeed } from './domain/mobile-feed.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Populate desktop cards with SVGs (if any legacy cards present)
  const desktopCards = document.querySelectorAll('.cards-column .product-card');
  desktopCards.forEach(card => {
    const cardId = card.getAttribute('data-product-id');
    const product = PRODUCTS.find(p => p.id === cardId);
    if (!product) return;

    const iconBox = card.querySelector('.card-icon-box');
    if (iconBox) {
      iconBox.innerHTML = getIconSvg(product.iconType);
    }
  });

  // 2. Populate mobile swipe rail
  const mobileRail = document.querySelector('.mobile-cards-rail');
  if (mobileRail) {
    mobileRail.innerHTML = PRODUCTS.map(
      prod => `
      <div class="product-card" data-product-id="${prod.id}" role="button" tabindex="0">
        <div class="card-icon-box card-icon--${prod.iconType}">
          ${getIconSvg(prod.iconType)}
        </div>
        <span class="card-title">${prod.name}</span>
      </div>
    `
    ).join('');
  }

  // 3. Initialize carousel
  const laptopScreen = document.querySelector('#laptop-screen');
  const infoPill = document.querySelector('.product-info-pill');
  const prevBtn = document.querySelector('#carousel-prev');
  const nextBtn = document.querySelector('#carousel-next');
  const dotsContainer = document.querySelector('#carousel-dots');
  const stageWrapper = document.querySelector('#showcase-stage');

  const carousel = new ProductCarousel(PRODUCTS, {
    laptopScreen,
    infoPill,
    prevBtn,
    nextBtn,
    dotsContainer,
    stageWrapper,
    cards: Array.from(desktopCards),
    mobileRail
  });

  // 4. Initialize Modal & Bottom Sheet
  const modalEl = document.querySelector('#product-modal');
  const modalController = new ModalController(modalEl);

  // 4b. Initialize Mobile Full-Screen TikTok/Reels Feed (< 1024px)
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

  // Trigger modal from interactive hint
  const hintBtn = document.querySelector('.interactive-hint');
  if (hintBtn) {
    hintBtn.addEventListener('click', () => {
      modalController.openDetail(carousel.getCurrentProduct());
    });
  }

  // Trigger modal from info pill button
  const pillActionBtn = document.querySelector('#pill-action-btn');
  if (pillActionBtn) {
    pillActionBtn.addEventListener('click', e => {
      e.stopPropagation();
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

  // 5. Sound toggle in header
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

  // 6. Shuffle button in navbar pill (swaps to a random different product!)
  const shuffleBtn = document.querySelector('#nav-shuffle-btn');
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      let randomIdx;
      do {
        randomIdx = Math.floor(Math.random() * PRODUCTS.length);
      } while (randomIdx === carousel.currentIndex && PRODUCTS.length > 1);

      carousel.goTo(randomIdx);
    });
  }

  // 7. Cart action & badge animation
  const cartBtn = document.querySelector('#nav-cart-btn');
  const cartCountEl = document.querySelector('#cart-count');
  let cartCount = 1;

  const modalAddCartBtn = document.querySelector('#modal-add-cart-btn');
  if (modalAddCartBtn) {
    modalAddCartBtn.addEventListener('click', () => {
      cartCount += 1;
      if (cartCountEl) {
        cartCountEl.textContent = cartCount;
        cartCountEl.style.transform = 'scale(1.4)';
        setTimeout(() => {
          cartCountEl.style.transform = 'scale(1)';
        }, 200);
      }
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

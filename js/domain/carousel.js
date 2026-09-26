/**
 * Carousel Controller Module
 * Handles next/prev, touch swipe, mouse drag, keyboard arrows, and card selection
 */

import { hapticAudio } from './audio.js';
import { renderLaptopScreen, updateInfoPill, updateMiniShowPages } from './product-renderer.js';

export class ProductCarousel {
  constructor(products, options = {}) {
    this.products = products;
    this.currentIndex = 0;
    this.isTransitioning = false;

    // DOM Elements
    this.laptopScreen = options.laptopScreen;
    this.infoPill = options.infoPill;
    this.prevBtn = options.prevBtn;
    this.nextBtn = options.nextBtn;
    this.dotsContainer = options.dotsContainer;
    this.stageWrapper = options.stageWrapper;
    this.cards = options.cards || [];

    this.onProductChange = options.onProductChange || (() => {});

    this.init();
  }

  init() {
    this.renderCurrentProduct(true);
    this.setupControls();
    this.setupGestures();
    this.setupKeyboard();
    this.setupCards();
  }

  getCurrentProduct() {
    return this.products[this.currentIndex];
  }

  next() {
    if (this.isTransitioning) return;
    const nextIdx = (this.currentIndex + 1) % this.products.length;
    this.goTo(nextIdx);
  }

  prev() {
    if (this.isTransitioning) return;
    const prevIdx = (this.currentIndex - 1 + this.products.length) % this.products.length;
    this.goTo(prevIdx);
  }

  goTo(index) {
    if (index === this.currentIndex || this.isTransitioning) return;
    if (index < 0 || index >= this.products.length) return;

    this.isTransitioning = true;
    hapticAudio.playPop();

    // Fade out screen
    if (this.laptopScreen) {
      const currentMedia = this.laptopScreen.querySelector('.screen-content, .screen-video-wrapper');
      if (currentMedia) {
        currentMedia.classList.add('transitioning');
      }
    }

    setTimeout(() => {
      this.currentIndex = index;
      this.renderCurrentProduct();
      this.isTransitioning = false;
      this.onProductChange(this.getCurrentProduct());
    }, 150);
  }

  renderCurrentProduct(isInitial = false) {
    const product = this.getCurrentProduct();

    // 1. Render laptop screen
    if (this.laptopScreen) {
      this.laptopScreen.innerHTML = renderLaptopScreen(product);
    }

    // 2. Update info pill
    if (this.infoPill) {
      updateInfoPill(this.infoPill, product);
    }

    // 2b. Update header card title & version badge
    const headerTitle = document.querySelector('#header-card-title');
    const headerBadge = document.querySelector('#header-card-badge');
    if (headerTitle) {
      headerTitle.textContent = product.name;
    }
    if (headerBadge) {
      headerBadge.textContent = product.version;
    }

    // 3. Update desktop mini show pages for the active product
    updateMiniShowPages(product, isInitial);

    // 3b. Update desktop cards active state (if any)
    this.cards.forEach(card => {
      const cardId = card.getAttribute('data-product-id');
      if (cardId === product.id) {
        card.classList.add('active');
        card.setAttribute('aria-selected', 'true');
      } else {
        card.classList.remove('active');
        card.setAttribute('aria-selected', 'false');
      }
    });



    // 5. Update dots
    if (this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll('.dot-indicator');
      dots.forEach((dot, idx) => {
        if (idx === this.currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  }

  setupControls() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    if (this.dotsContainer) {
      this.dotsContainer.innerHTML = this.products
        .map((_, i) => `<button class="dot-indicator ${i === 0 ? 'active' : ''}" aria-label="Go to product ${i + 1}"></button>`)
        .join('');

      this.dotsContainer.addEventListener('click', e => {
        const dot = e.target.closest('.dot-indicator');
        if (!dot) return;
        const dots = Array.from(this.dotsContainer.children);
        const idx = dots.indexOf(dot);
        if (idx !== -1) this.goTo(idx);
      });
    }
  }

  setupCards() {
    // Desktop cards click
    this.cards.forEach(card => {
      card.addEventListener('click', () => {
        const cardId = card.getAttribute('data-product-id');
        const idx = this.products.findIndex(p => p.id === cardId);
        if (idx !== -1) this.goTo(idx);
      });
    });


  }

  setupGestures() {
    const target = this.stageWrapper || document.body;

    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let isTouch = false;

    // Touch events for Mobile (HP)
    target.addEventListener('touchstart', e => {
      isTouch = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    target.addEventListener('touchend', e => {
      if (!isTouch) return;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      this.handleSwipeDelta(startX, startY, endX, endY);
      isTouch = false;
    }, { passive: true });

    // Mouse drag events for Desktop
    target.addEventListener('mousedown', e => {
      // Don't drag if clicking buttons or links
      if (e.target.closest('button, a, input')) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
    });

    window.addEventListener('mouseup', e => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.clientX;
      const endY = e.clientY;
      this.handleSwipeDelta(startX, startY, endX, endY);
    });
  }

  handleSwipeDelta(startX, startY, endX, endY) {
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    // Minimum swipe distance threshold
    const minThreshold = 40;

    // Must be predominantly horizontal to avoid hijacking vertical scrolling
    if (Math.abs(deltaX) > minThreshold && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        this.next(); // swiped left -> show next
      } else {
        this.prev(); // swiped right -> show prev
      }
    }
  }

  setupKeyboard() {
    window.addEventListener('keydown', e => {
      // If a modal or input is active, ignore arrow navigation
      const activeModal = document.querySelector('dialog[open]');
      if (activeModal) return;

      if (e.key === 'ArrowRight') {
        this.next();
      } else if (e.key === 'ArrowLeft') {
        this.prev();
      }
    });
  }
}

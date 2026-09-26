/**
 * Product Details Modal & Mobile Bottom Sheet Controller
 */

import { getIconSvg } from './product-renderer.js';
import { hapticAudio } from './audio.js';

export class ModalController {
  constructor(modalElement) {
    this.modal = modalElement;
    this.closeBtn = this.modal?.querySelector('.modal-close-btn');
    this.surface = this.modal?.querySelector('.modal-surface');
    this.dragHandle = this.modal?.querySelector('.sheet-drag-handle');

    this.isOpen = false;
    this.startY = 0;
    this.currentTranslateY = 0;

    this.init();
  }

  init() {
    if (!this.modal) return;

    // Handle all close buttons inside the dialog
    const closeBtns = this.modal.querySelectorAll('.modal-close-btn');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });

    // Close when clicking the backdrop
    this.modal.addEventListener('click', e => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Handle Escape key
    this.modal.addEventListener('cancel', e => {
      e.preventDefault();
      this.close();
    });

    // Touch swipe down on mobile bottom sheet to dismiss
    this.setupSheetSwipe();
  }

  open(product) {
    this.openDetail(product);
  }

  /**
   * Open the original Product Detail Modal ("as is" for laptop screen-video click)
   */
  openDetail(product) {
    if (!this.modal || !product) return;

    this.modal.classList.remove('modal-mode--video');
    this.modal.classList.add('modal-mode--detail');

    // Pause any popup video if playing
    const popupVideo = this.modal.querySelector('#modal-popup-video');
    if (popupVideo) {
      popupVideo.pause();
    }

    this.populateDetailData(product);
    this.modal.showModal();
    this.isOpen = true;
    hapticAudio.playChirp();
    document.body.style.overflow = 'hidden';
  }

  /**
   * Open the WebM full video theater ("secara penuh" for mini-page click)
   */
  openVideo(product, videoSrc, viewTitle) {
    if (!this.modal) return;

    this.modal.classList.remove('modal-mode--detail');
    this.modal.classList.add('modal-mode--video');

    const titleEl = this.modal.querySelector('#video-modal-title');
    if (titleEl) {
      titleEl.textContent = viewTitle || (product ? `${product.name} Preview` : 'WebM Preview');
    }

    const popupVideo = this.modal.querySelector('#modal-popup-video');
    if (popupVideo) {
      const srcToPlay = videoSrc || (product ? product.videoPreview : '');
      if (srcToPlay) {
        popupVideo.src = srcToPlay;
        popupVideo.currentTime = 0;
        popupVideo.play().catch(() => {});
      }
    }

    this.modal.showModal();
    this.isOpen = true;
    hapticAudio.playChirp();
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.modal || !this.isOpen) return;

    const popupVideo = this.modal.querySelector('#modal-popup-video');
    if (popupVideo) {
      popupVideo.pause();
    }

    hapticAudio.playTick();
    this.modal.close();
    this.isOpen = false;
    document.body.style.overflow = '';
  }

  populateDetailData(product) {
    const iconContainer = this.modal.querySelector('.modal-icon-badge');
    const titleEl = this.modal.querySelector('#modal-title');
    const versionEl = this.modal.querySelector('.modal-version-tag');
    const descEl = this.modal.querySelector('.modal-desc');
    const userStat = this.modal.querySelector('#modal-stat-users');
    const ratingStat = this.modal.querySelector('#modal-stat-rating');
    const speedStat = this.modal.querySelector('#modal-stat-speed');
    const featuresList = this.modal.querySelector('.modal-features-list');

    if (iconContainer) {
      iconContainer.className = `modal-icon-badge card-icon--${product.iconType}`;
      iconContainer.innerHTML = getIconSvg(product.iconType);
    }
    if (titleEl) titleEl.textContent = product.name;
    if (versionEl) versionEl.textContent = `${product.version} • ${product.category}`;
    if (descEl) descEl.textContent = product.description;

    if (userStat) userStat.textContent = product.userCount;
    if (ratingStat) ratingStat.textContent = product.rating;
    if (speedStat) speedStat.textContent = product.speed;

    if (featuresList && product.features) {
      featuresList.innerHTML = product.features
        .map(feat => `<span class="feature-pill">✦ ${feat}</span>`)
        .join('');
    }
  }

  setupSheetSwipe() {
    if (!this.surface) return;

    let touchStartY = 0;
    let touchMoveY = 0;
    let isDragging = false;

    this.surface.addEventListener('touchstart', e => {
      // Only drag if scrolled to the top
      if (this.surface.scrollTop > 5) return;
      touchStartY = e.touches[0].clientY;
      isDragging = true;
    }, { passive: true });

    this.surface.addEventListener('touchmove', e => {
      if (!isDragging) return;
      touchMoveY = e.touches[0].clientY;
      const deltaY = touchMoveY - touchStartY;
      if (deltaY > 0) {
        // Dragging downwards
        this.surface.style.transform = `translateY(${deltaY * 0.7}px)`;
      }
    }, { passive: true });

    this.surface.addEventListener('touchend', e => {
      if (!isDragging) return;
      isDragging = false;
      const deltaY = touchMoveY - touchStartY;
      this.surface.style.transform = '';

      if (deltaY > 120) {
        // Swiped down sufficiently to dismiss
        this.close();
      }
    }, { passive: true });
  }
}

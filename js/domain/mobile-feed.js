/**
 * Mobile Reel Feed Controller
 * TikTok/Instagram Reels style full-screen vertical swipe product showcase
 * Fulfills all prompt specifications:
 * - Intersection Observer with threshold 0.6
 * - 100ms debounced autoplay
 * - Pause and currentTime = 0 on slide exit
 * - Lazy loading for visible + 1 next video
 * - Manual scrollTo for dots indicator navigation (NO scrollIntoView)
 * - Mute/Unmute sound toggle
 * - Explore button opens product detail modal
 */

export class MobileReelFeed {
  constructor(products, options = {}) {
    this.products = products;
    this.container = options.container;
    this.dotsContainer = options.dotsContainer;
    this.modalController = options.modalController;
    this.hapticAudio = options.hapticAudio;

    this.currentIndex = 0;
    this.isMuted = true;
    this.playDebounceTimer = null;
    this.observer = null;

    if (this.container) {
      this.init();
    }
  }

  init() {
    this.renderSlides();
    this.renderDots();
    this.setupIntersectionObserver();
    this.setupEventListeners();
    this.setupResizeListener();
  }

  renderSlides() {
    this.container.innerHTML = this.products.map((prod, idx) => `
      <section 
        class="reel-slide" 
        data-index="${idx}" 
        data-product-id="${prod.id}" 
        id="reel-slide-${idx}"
        aria-label="Product ${idx + 1} of ${this.products.length}: ${prod.name}"
      >
        <!-- Center Full-Bleed Video Media Container -->
        <div class="reel-video-container" data-index="${idx}" style="background-image: url('${prod.posterImage}')">
          <video 
            class="reel-video" 
            data-src="${prod.videoPreview}" 
            poster="${prod.posterImage}"
            muted
            loop
            playsinline
            preload="none"
            aria-label="${prod.name} showcase video"
          ></video>
          <div class="reel-play-indicator" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>

        <!-- Atmospheric Vignette Gradients for Legibility -->
        <div class="reel-scrim-top" aria-hidden="true"></div>
        <div class="reel-scrim-bottom" aria-hidden="true"></div>

        <!-- Header (Overlay Transparan) -->
        <header class="reel-header">
          <div class="reel-product-info">
            <h2 class="reel-product-name">${prod.name}</h2>
            <span class="reel-category-pill">${prod.category}</span>
          </div>
          <button 
            type="button" 
            class="reel-sound-btn ${!this.isMuted ? 'unmuted' : ''}" 
            data-action="toggle-sound" 
            aria-label="Toggle sound"
          >
            ${this.isMuted ? '🔇' : '🔊'}
          </button>
        </header>

        <!-- Footer (Overlay Bawah) -->
        <footer class="reel-footer">
          <div class="reel-footer-left">
            <p class="reel-tagline">${prod.shortTagline || prod.tagline}</p>
            <span class="reel-version-tag">${prod.version} • ${prod.userCount} Active Users</span>
          </div>
          <button 
            type="button" 
            class="reel-explore-btn" 
            data-index="${idx}" 
            aria-label="Explore ${prod.name} details"
          >
            Explore ✦
          </button>
        </footer>
      </section>
    `).join('');
  }

  renderDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = this.products.map((prod, idx) => `
      <button 
        type="button" 
        class="reel-dot ${idx === 0 ? 'active' : ''}" 
        data-index="${idx}" 
        aria-label="Go to product ${idx + 1}: ${prod.name}"
      ></button>
    `).join('');
  }

  setupIntersectionObserver() {
    const options = {
      root: this.container,
      threshold: 0.6 // Exactly 60% in view as specified in prompt
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const slide = entry.target;
        const index = parseInt(slide.dataset.index, 10);
        const video = slide.querySelector('video');

        if (entry.isIntersecting) {
          this.handleSlideEnter(index, video);
        } else {
          this.handleSlideExit(video);
        }
      });
    }, options);

    const slides = this.container.querySelectorAll('.reel-slide');
    slides.forEach(slide => this.observer.observe(slide));
  }

  handleSlideEnter(index, video) {
    this.currentIndex = index;
    this.updateActiveDot(index);

    // Debounce 100ms before play to prevent flicker on rapid swipe
    clearTimeout(this.playDebounceTimer);
    this.playDebounceTimer = setTimeout(() => {
      if (!video) return;

      // Lazy load current video if src is missing
      if (!video.src || video.src === '') {
        video.src = video.dataset.src;
        video.load();
      }

      video.muted = this.isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented or rapid scroll canceled it; poster fallback remains active
        });
      }

      // Preload next slide video (+1) for seamless buttery scroll
      this.preloadNextVideo(index + 1);
    }, 100);
  }

  handleSlideExit(video) {
    if (!video) return;
    video.pause();
    video.currentTime = 0; // Reset as specified in prompt
  }

  preloadNextVideo(nextIndex) {
    if (nextIndex >= this.products.length) return;
    const nextSlide = this.container.querySelector(`.reel-slide[data-index="${nextIndex}"]`);
    if (!nextSlide) return;
    const nextVideo = nextSlide.querySelector('video');
    if (nextVideo && (!nextVideo.src || nextVideo.src === '')) {
      nextVideo.src = nextVideo.dataset.src;
      nextVideo.preload = 'metadata';
    }
  }

  updateActiveDot(index) {
    if (!this.dotsContainer) return;
    const dots = this.dotsContainer.querySelectorAll('.reel-dot');
    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.removeAttribute('aria-current');
      }
    });
  }

  scrollToSlide(index) {
    if (index < 0 || index >= this.products.length) return;
    // Strict compliance with prompt: NO scrollIntoView, use manual scrollTo on container
    const targetTop = index * this.container.clientHeight;
    this.container.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
    if (this.hapticAudio) {
      this.hapticAudio.playTick();
    }
  }

  toggleSound() {
    this.isMuted = !this.isMuted;
    if (this.hapticAudio) {
      this.hapticAudio.toggleSound();
    }

    // Update sound buttons across all slides
    const soundBtns = this.container.querySelectorAll('.reel-sound-btn');
    soundBtns.forEach(btn => {
      btn.textContent = this.isMuted ? '🔇' : '🔊';
      if (!this.isMuted) {
        btn.classList.add('unmuted');
      } else {
        btn.classList.remove('unmuted');
      }
    });

    // Unmute/mute currently active video
    const activeSlide = this.container.querySelector(`.reel-slide[data-index="${this.currentIndex}"]`);
    if (activeSlide) {
      const activeVideo = activeSlide.querySelector('video');
      if (activeVideo) {
        activeVideo.muted = this.isMuted;
      }
    }
  }

  setupEventListeners() {
    // Delegated clicks inside mobile reel container
    this.container.addEventListener('click', (e) => {
      // 1. Sound toggle
      const soundBtn = e.target.closest('[data-action="toggle-sound"]');
      if (soundBtn) {
        e.stopPropagation();
        this.toggleSound();
        return;
      }

      // 2. Explore button -> open modal
      const exploreBtn = e.target.closest('.reel-explore-btn');
      if (exploreBtn) {
        e.stopPropagation();
        const index = parseInt(exploreBtn.dataset.index, 10);
        const product = this.products[index];
        if (product && this.modalController) {
          if (this.hapticAudio) this.hapticAudio.playChirp();
          this.modalController.openDetail(product);
        }
        return;
      }

      // 3. Tap video container -> toggle play/pause
      const videoContainer = e.target.closest('.reel-video-container');
      if (videoContainer) {
        const video = videoContainer.querySelector('video');
        const indicator = videoContainer.querySelector('.reel-play-indicator');
        if (video) {
          if (video.paused) {
            video.play().catch(() => {});
            this.showIndicator(indicator, 'play');
          } else {
            video.pause();
            this.showIndicator(indicator, 'pause');
          }
        }
      }
    });

    // Dots indicator clicks
    if (this.dotsContainer) {
      this.dotsContainer.addEventListener('click', (e) => {
        const dot = e.target.closest('.reel-dot');
        if (!dot) return;
        const index = parseInt(dot.dataset.index, 10);
        this.scrollToSlide(index);
      });
    }
  }

  showIndicator(indicator, state) {
    if (!indicator) return;
    if (state === 'play') {
      indicator.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    } else {
      indicator.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
    }
    indicator.classList.add('show');
    setTimeout(() => {
      indicator.classList.remove('show');
    }, 450);
  }

  setupResizeListener() {
    window.addEventListener('resize', () => {
      // If switched to desktop view (>= 1024px), pause any running mobile video
      if (window.innerWidth >= 1024) {
        const videos = this.container.querySelectorAll('video');
        videos.forEach(v => {
          v.pause();
        });
      }
    });
  }
}

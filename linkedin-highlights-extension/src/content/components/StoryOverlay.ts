// Story Overlay Component
import { setSeenStory } from './utils';
import { domainHighlights, SVG_ICONS, storyDomains } from './constants';

export class StoryOverlay {
  private static instance: StoryOverlay;
  private onTrendsClick?: (domain: string) => void;
  private autoAdvanceInterval: ReturnType<typeof setInterval> | null = null;
  private isPaused: boolean = false;
  private resumeOnTrendsClose: boolean = false;
  private startAutoAdvance?: () => void;

  static getInstance(): StoryOverlay {
    if (!StoryOverlay.instance) {
      StoryOverlay.instance = new StoryOverlay();
    }
    return StoryOverlay.instance;
  }

  setCallbacks(onTrendsClick: (domain: string) => void) {
    this.onTrendsClick = onTrendsClick;
  }

  pauseProgress() {
    this.isPaused = true;
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
      this.autoAdvanceInterval = null;
    }
  }

  resumeProgress() {
    if (!this.isPaused) return;
    this.isPaused = false;
    if (this.resumeOnTrendsClose) {
      this.resumeOnTrendsClose = false;
      this.startAutoAdvance && this.startAutoAdvance();
    }
  }

  open(domain: keyof typeof domainHighlights): void {
    console.log('openStoryOverlay called for:', domain);
    // Remove any existing overlay
    const existing = document.getElementById('linkedin-highlights-widget');
    if (existing) existing.remove();

    // Use highlights for the selected domain, or fallback to empty
    const highlights = domainHighlights[domain] || [];
    console.log('Highlights for domain:', domain, highlights);
    this.injectHighlightsIntoFeed(domain, highlights);
  }

  private injectHighlightsIntoFeed(domain: keyof typeof domainHighlights, highlights: any[]): void {
    console.log('injectHighlightsIntoFeed called for:', domain, highlights);
    if (document.getElementById('linkedin-highlights-widget')) {
      console.log('Overlay already exists, aborting.');
      return;
    }

    // Create overlay (fixed, full-screen)
    const overlay = document.createElement('div');
    overlay.id = 'linkedin-highlights-widget';
    overlay.className = 'linkedin-highlights-overlay';
    // Fallback inline styles for visibility
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.right = '0';
    overlay.style.bottom = '0';
    overlay.style.zIndex = '99999';
    overlay.style.display = 'block';
    overlay.style.opacity = '1';
    overlay.style.background = 'rgba(0,0,0,0.92)';

    // Responsive story container and child styles
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @media (min-width: 400px) {
        .highlights-story-container {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          max-width: 420px;
          width: 100%;
          max-height: 90vh;
          height: 90vh;
          background: #111;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.32);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .highlights-story-container .story-slide {
        position: absolute;
        left: 0; top: 0; right: 0; bottom: 0;
        background: transparent; width: 50%;
        }
      }
      @media (max-width: 399px) {
        .highlights-story-container {
          position: absolute;
          left: 0; top: 0; right: 0; bottom: 0;
          width: 100vw;
          height: 100vh;
          max-width: 100vw;
          max-height: 100vh;
          border-radius: 0;
          background: #111;
          box-shadow: none;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
      }
    
    
      .highlights-story-container .story-slide:not(.active) {
        display: none;
      }
    `;
    overlay.appendChild(styleTag);

    // Create the story container
    const storyContainer = document.createElement('div');
    storyContainer.className = 'highlights-story-container';

    // Find the correct avatar image for the domain
    const domainObj = storyDomains.find(d => d.name === domain);
    const domainImg = domainObj ? domainObj.img : '';

    // Create slides for each highlight
    const slidesHTML = highlights.map((highlight, index) => `
      <div class="story-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
        <div class="story-image-bg" style="background-image: url('${highlight.image}')"></div>
        <div class="story-gradient-overlay"></div>
        
        <!-- Segmented progress bar at top -->
        <div class="story-progress-container">
          <div class="story-progress-bars">
            ${highlights.map((_, i) => `
              <div class="story-progress-bar${i === index ? ' active' : ''}">
                <div class="story-progress-fill${i === 0 ? ' active' : ''}"></div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Top bar -->
        <div class="story-top-bar">
          <div class="story-domain-info">
            <img src="${domainImg}" alt="${domain}" class="story-domain-icon" />
            <span class="story-domain-name">${domain}</span>
            <span class="story-time">2 hours ago</span>
          </div>
          <button class="story-close-btn">${SVG_ICONS.close}</button>
        </div>
        
        <!-- Navigation arrows -->
        <button class="story-nav-btn story-arrow-left" ${index === 0 ? 'disabled' : ''}>${SVG_ICONS.arrowLeft}</button>
        <button class="story-nav-btn story-arrow-right" ${index === highlights.length - 1 ? 'disabled' : ''}>${SVG_ICONS.arrowRight}</button>
        
        <!-- Content (can be empty or minimal) -->
        <div class="story-content"></div>
        
        <!-- Bottom action bar -->
        <div class="story-action-bar">
          <div class="story-action-hash">#${domain}</div>
          <div class="story-action-swipeup" style="display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;cursor:pointer;">
            <span style="display:flex;align-items:center;gap:4px;">${SVG_ICONS.arrowUp}</span>
            <span style="font-size:0.95em;color:#888;">Swipe up for Top Posts</span>
          </div>
          <div class="story-action-icons">
            <button class="story-action-btn create" title="Create post">${SVG_ICONS.plus}</button>
            <button class="story-action-btn like" title="Like">${SVG_ICONS.heart}</button>
            <button class="story-action-btn share" title="Share">${SVG_ICONS.share}</button>
          </div>
        </div>
      </div>
    `).join('');

    storyContainer.innerHTML = slidesHTML;
    overlay.appendChild(storyContainer);
    document.body.appendChild(overlay);

    // Add event listeners
    this.addEventListeners(highlights.length, domain);
  }

  private addEventListeners(totalSlides: number, domain?: string): void {
    const widget = document.getElementById('linkedin-highlights-widget');
    if (!widget) return;

    let currentSlide = 0;
    const self = this;

    // Navigation buttons (now always present)
    const prevBtns = widget.querySelectorAll('.story-arrow-left');
    const nextBtns = widget.querySelectorAll('.story-arrow-right');
    prevBtns.forEach(btn => btn.addEventListener('click', () => navigateSlide('prev')));
    nextBtns.forEach(btn => btn.addEventListener('click', () => navigateSlide('next')));

    // Close buttons (attach to all close buttons in all slides)
    const closeBtns = widget.querySelectorAll('.story-close-btn');
    closeBtns.forEach(btn => btn.addEventListener('click', () => widget.remove()));

    // Start auto-advance for the current slide
    function startAutoAdvance() {
      if (self.autoAdvanceInterval) clearInterval(self.autoAdvanceInterval);
      updateProgressBars(0); // Reset progress bars
      let progress = 0;
      self.autoAdvanceInterval = setInterval(() => {
        if (self.isPaused) {
          self.resumeOnTrendsClose = true;
          return;
        }
        progress += 100 / (5 * 10); // 5 seconds, 10 updates per second
        updateProgressBars(progress);
        if (progress >= 100) {
          if (currentSlide < totalSlides - 1) {
            clearInterval(self.autoAdvanceInterval!);
            self.autoAdvanceInterval = null;
            navigateSlide('next');
          } else {
            if (self.autoAdvanceInterval) clearInterval(self.autoAdvanceInterval);
            self.autoAdvanceInterval = null;
            // Mark as seen only after all highlights are viewed
            if (domain) setSeenStory(domain);
            if (widget) widget.remove();
          }
        }
      }, 100);
    }
    this.startAutoAdvance = startAutoAdvance;

    // Update the segmented progress bars
    function updateProgressBars(percent: number) {
      if (!widget) return;
      const bars = widget.querySelectorAll('.story-progress-fill');
      bars.forEach((bar, idx) => {
        if (idx < currentSlide) {
          (bar as HTMLElement).style.width = '100%';
        } else if (idx === currentSlide) {
          (bar as HTMLElement).style.width = `${Math.min(percent, 100)}%`;
        } else {
          (bar as HTMLElement).style.width = '0%';
        }
      });
    }

    // Navigate between slides
    function navigateSlide(direction: 'prev' | 'next') {
      if (self.autoAdvanceInterval) clearInterval(self.autoAdvanceInterval);
      const newSlide = direction === 'next' 
        ? Math.min(currentSlide + 1, totalSlides - 1)
        : Math.max(currentSlide - 1, 0);
      if (newSlide !== currentSlide) {
        currentSlide = newSlide;
        updateSlide();
        startAutoAdvance(); // Reset timer and progress bar on manual navigation
      }
    }

    // Update slide content
    function updateSlide() {
      if (!widget) return;
      const slides = widget.querySelectorAll('.story-slide');
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentSlide);
        // Update arrows
        const leftArrow = slide.querySelector('.story-arrow-left') as HTMLButtonElement;
        const rightArrow = slide.querySelector('.story-arrow-right') as HTMLButtonElement;
        if (leftArrow) leftArrow.disabled = currentSlide === 0;
        if (rightArrow) rightArrow.disabled = currentSlide === totalSlides - 1;
      });
      updateProgressBars(0);
    }

    // Start the first auto-advance
    startAutoAdvance();

    // Action bar events
    const hashBtns = widget.querySelectorAll('.story-action-hash');
    hashBtns.forEach(btn => btn.addEventListener('click', () => {
      // Find the current domain (from the first visible slide)
      this.onTrendsClick?.(domain || '');
    }));
    // Swipe up for Top Posts (click for desktop)
    const swipeUpBtns = widget.querySelectorAll('.story-action-swipeup');
    swipeUpBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        alert('Show top posts for ' + (domain || 'this domain'));
      });
      // Optionally, add swipe up gesture detection here for mobile
    });
    const plusBtns = widget.querySelectorAll('.story-action-btn.create');
    plusBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Open LinkedIn create post page with prefilled hashtag
      const hashtag = `#${domain}`;
      const url = `https://www.linkedin.com/feed#overlay_share-modal&text=${encodeURIComponent(hashtag)}`;
      window.open(url, '_blank');
    }));
    // Like button toggle
    const likeBtns = widget.querySelectorAll('.story-action-btn.like');
    likeBtns.forEach(btn => {
      let liked = false;
      btn.addEventListener('click', () => {
        liked = !liked;
        const svg = btn.querySelector('svg');
        if (svg) {
          if (liked) {
            svg.querySelector('path')?.setAttribute('fill', '#007aff');
          } else {
            svg.querySelector('path')?.setAttribute('fill', '#090909');
          }
        }
      });
    });
  }

  remove(): void {
    const existing = document.getElementById('linkedin-highlights-widget');
    if (existing) {
      existing.remove();
    }
  }
} 
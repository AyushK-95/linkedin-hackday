// Trends Modal Component
import { mockTrendingTopics, SVG_ICONS } from './constants';
import { StoryOverlay } from './StoryOverlay';
import { TrendReportModal } from './TrendReportModal';

export class TrendsModal {
  private static instance: TrendsModal;

  static getInstance(): TrendsModal {
    if (!TrendsModal.instance) {
      TrendsModal.instance = new TrendsModal();
    }
    return TrendsModal.instance;
  }

  show(domain: string): void {
    // Remove any existing modal
    const overlay = document.getElementById('linkedin-highlights-widget');
    if (!overlay) return;
    const activeSlide = overlay.querySelector('.story-slide.active');
    if (!activeSlide) return;
    activeSlide.querySelector('#linkedin-trends-modal')?.remove();

    // Shrink the active highlight
    activeSlide.classList.add('shrink-highlight');

    // Pause progress bar
    StoryOverlay.getInstance().pauseProgress();

    // Use mock data for now
    const topics = (mockTrendingTopics as Record<string, { tag: string; posts: string; region: string }[]>)[domain] || mockTrendingTopics['Tech'];

    const modal = document.createElement('div');
    modal.id = 'linkedin-trends-modal';
    modal.className = 'linkedin-trends-modal';
    modal.innerHTML = `
      <div class='trends-modal-content'>
        <div class='trends-modal-hashtag-row'>
          <div class='trends-modal-hash-section'>
            <span class='trends-modal-hash'>#</span>
            <span class='trends-modal-hash-count'>200K</span>
          </div>
          <div class='trends-modal-action-icons'>
            <button class='trends-modal-action-btn create' title="Create post">${SVG_ICONS.plus}</button>
            <button class='trends-modal-action-btn like' title="Like">${SVG_ICONS.heart}</button>
            <button class='trends-modal-action-btn share' title="Share">${SVG_ICONS.share}</button>
          </div>
        </div>
        <div class='trends-modal-list'>
          <div class='trends-modal-title'>Trends for you</div>
          ${topics.map((t: { tag: string; posts: string; region: string }, idx: number) => `
            <div class='trends-modal-topic'>
              <div class='trends-modal-topic-main'>
                <div class='trends-modal-topic-region'>Trending in ${t.region}</div>
                <div class='trends-modal-topic-row'>
                  <span class='trends-modal-topic-tag'>${t.tag}</span>
                  <span class='trends-modal-topic-posts'>${t.posts} posts</span>
                </div>
              </div>
              <span class='trends-modal-topic-more' data-idx='${idx}' style='cursor:pointer;'>...</span>
            </div>
          `).join('')}
          <div class='trends-modal-showmore'>Show more</div>
        </div>
      </div>
    `;
    
    const actionBar = activeSlide.querySelector('.story-action-bar');
    if (actionBar) {
      activeSlide.insertBefore(modal, actionBar);
    } else {
      activeSlide.appendChild(modal);
    }
    
    // Click outside to close functionality
    const handleClickOutside = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!modal.contains(target)) {
        modal.remove();
        if (activeSlide) activeSlide.classList.remove('shrink-highlight');
        // Resume progress bar
        StoryOverlay.getInstance().resumeProgress();
        // Remove the event listener
        document.removeEventListener('click', handleClickOutside);
      }
    };
    
    // Add event listener with a small delay to prevent immediate closing
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);

    // Action button event listeners
    const createBtn = modal.querySelector('.trends-modal-action-btn.create');
    createBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Open LinkedIn create post page with prefilled hashtag
      const hashtag = `#${domain}`;
      const url = `https://www.linkedin.com/feed#overlay_share-modal&text=${encodeURIComponent(hashtag)}`;
      window.open(url, '_blank');
    });

    const likeBtn = modal.querySelector('.trends-modal-action-btn.like');
    let liked = false;
    likeBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      liked = !liked;
      const svg = likeBtn.querySelector('svg');
      if (svg) {
        if (liked) {
          svg.querySelector('path')?.setAttribute('fill', '#007aff');
        } else {
          svg.querySelector('path')?.setAttribute('fill', '#090909');
        }
      }
    });

    const shareBtn = modal.querySelector('.trends-modal-action-btn.share');
    shareBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Share functionality - could open native share dialog or copy to clipboard
      if (navigator.share) {
        navigator.share({
          title: `Trends for #${domain}`,
          text: `Check out trending topics in ${domain}`,
          url: window.location.href
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`Check out trending topics in #${domain}`);
        // Could show a toast notification here
      }
    });

    // Add event listener for three dots
    const moreBtns = modal.querySelectorAll('.trends-modal-topic-more');
    moreBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        TrendReportModal.show(undefined, modal);
      });
    });
  }

  remove(): void {
    const overlay = document.getElementById('linkedin-highlights-widget');
    if (overlay) {
      const modal = overlay.querySelector('#linkedin-trends-modal');
      if (modal) {
        modal.remove();
        const activeSlide = overlay.querySelector('.story-slide.active');
        if (activeSlide) activeSlide.classList.remove('shrink-highlight');
      }
    }
  }
} 
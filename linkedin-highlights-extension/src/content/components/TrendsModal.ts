// Trends Modal Component
import { mockTrendingTopics } from './constants';
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
    overlay.querySelector('#linkedin-trends-modal')?.remove();

    // Shrink the active highlight
    const activeSlide = overlay.querySelector('.story-slide.active');
    if (activeSlide) activeSlide.classList.add('shrink-highlight');

    // Pause progress bar
    StoryOverlay.getInstance().pauseProgress();

    // Use mock data for now
    const topics = (mockTrendingTopics as Record<string, { tag: string; posts: string; region: string }[]>)[domain] || mockTrendingTopics['Tech'];

    const modal = document.createElement('div');
    modal.id = 'linkedin-trends-modal';
    modal.className = 'linkedin-trends-modal';
    modal.innerHTML = `
      <div class='trends-modal-content'>
        <button class='trends-modal-close'>&times;</button>
        <div class='trends-modal-hashtag-row'>
          <span class='trends-modal-hash'>#</span>
          <span class='trends-modal-hash-count'>200K</span>
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
    
    overlay.appendChild(modal);
    
    // Close logic
    modal.querySelector('.trends-modal-close')?.addEventListener('click', () => {
      modal.remove();
      if (activeSlide) activeSlide.classList.remove('shrink-highlight');
      // Resume progress bar
      StoryOverlay.getInstance().resumeProgress();
    });

    // Add event listener for three dots
    const moreBtns = modal.querySelectorAll('.trends-modal-topic-more');
    moreBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        TrendReportModal.show();
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
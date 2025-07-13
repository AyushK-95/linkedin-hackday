// Story Circles Row Component
import { getPreferredDomains, getSeenStories, setSeenStory } from './utils';
import { storyDomains, domainHighlights } from './constants';

export class StoryCirclesRow {
  private static instance: StoryCirclesRow;
  private onDomainClick?: (domain: string) => void;
  private onPreferencesClick?: () => void;
  private observer: MutationObserver | null = null;

  static getInstance(): StoryCirclesRow {
    if (!StoryCirclesRow.instance) {
      StoryCirclesRow.instance = new StoryCirclesRow();
    }
    return StoryCirclesRow.instance;
  }

  setCallbacks(onDomainClick: (domain: string) => void, onPreferencesClick: () => void) {
    this.onDomainClick = onDomainClick;
    this.onPreferencesClick = onPreferencesClick;
  }

  inject(): void {
    if (document.getElementById('linkedin-highlights-circles-row')) return;

    // Desktop: try to insert inside the specific container by class
    const isDesktop = window.innerWidth > 500;
    // console.log(isDesktop);
    let parent: HTMLElement | null = null;
    if (isDesktop) {
      parent = document.querySelector('._88fcf22d._908ed174.ead93c80._67107180._733ebc8b._437caa9f') as HTMLElement;
    //   console.log(parent);
    }

    const row = document.createElement('div');
    row.id = 'linkedin-highlights-circles-row';
    row.className = 'linkedin-highlights-circles-row';
    row.style.marginTop = '0'; // Ensure no space between
    
    // Sort domains: unseen first, then seen
    const preferred = getPreferredDomains();
    const seen = getSeenStories();
    
    let rowHTML = '';
    
    if (!preferred || preferred.length === 0) {
      // Show only preferences circle if no domains selected
      rowHTML = `
        <div class="circles-scroll">
          <div class="story-circle-item preferences-circle" data-domain="Preferences">
            <div class="story-circle-avatar" style="font-size:2rem; color:#888; border:2px solid #ccc; background:#fafafa;">
              +
            </div>
            <div class="story-circle-label">Preferences</div>
          </div>
        </div>
      `;
    } else {
      const preferredDomains = storyDomains.filter(domain => !preferred || preferred.includes(domain.name));
      const unseenDomains = preferredDomains.filter(domain => !seen[domain.name]);
      const seenDomains = preferredDomains.filter(domain => seen[domain.name]);
      const sortedDomains = unseenDomains.concat(seenDomains);
      
      rowHTML = `
        <div class="circles-scroll">
          ${sortedDomains.map(domain => {
            const isSeen = seen[domain.name];
            return `
              <div class="story-circle-item" data-domain="${domain.name}">
                <div class="story-circle-avatar ${isSeen ? 'seen' : 'unseen'}" style="width:54px;height:54px;display:flex;align-items:center;justify-content:center;">
                  <img src="${domain.img}" alt="${domain.name}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;display:block;" />
                </div>
                <div class="story-circle-label">${domain.name}</div>
              </div>
            `;
          }).join('')}
          <div class="story-circle-item preferences-circle" data-domain="Preferences">
            <div class="story-circle-avatar" style="font-size:2rem; color:#888; border:2px solid #ccc; background:#fafafa;">
              +
            </div>
            <div class="story-circle-label">Preferences</div>
          </div>
        </div>
      `;
    }
    
    row.innerHTML = rowHTML;
    
    // Desktop: insert or move row into target container if found
    if (isDesktop) {
      this.observeAndInsertRow(row);
    } else {
      // Mobile or fallback: insert at the very top of the main content area or body
      const main = document.querySelector('main') || document.body;
      if (main.firstChild) {
        main.insertBefore(row, main.firstChild);
      } else {
        main.appendChild(row);
      }
    }

    this.addEventListeners(row);
  }

  private observeAndInsertRow(row: HTMLElement) {
    const targetSelector = '._88fcf22d._908ed174.ead93c80._67107180._733ebc8b._437caa9f';
    const tryInsert = () => {
      const parent = document.querySelector(targetSelector) as HTMLElement;
      if (parent) {
        // Remove from old parent if needed
        if (row.parentElement && row.parentElement !== parent) {
          row.parentElement.removeChild(row);
        }
        // Only insert if not already present
        if (!parent.contains(row)) {
          parent.insertBefore(row, parent.firstChild);
        }
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
      }
    };
    // Try immediately
    tryInsert();
    // If not found, observe for changes
    if (!document.querySelector(targetSelector)) {
      if (this.observer) this.observer.disconnect();
      this.observer = new MutationObserver(() => {
        tryInsert();
      });
      this.observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  private addEventListeners(row: HTMLDivElement): void {
    // Add click listeners to each circle
    row.querySelectorAll('.story-circle-item').forEach((item: Element) => {
      item.addEventListener('click', (e: Event) => {
        const domain = item.getAttribute('data-domain');
        if (domain === 'Preferences') {
          this.onPreferencesClick?.();
          return;
        }
        
        // Mark as seen
        if (domain) {
          setSeenStory(domain);
          // Re-render highlights row so seen moves to end
          document.getElementById('linkedin-highlights-circles-row')?.remove();
          this.inject();
        }
        
        const avatar = item.querySelector('.story-circle-avatar');
        if (avatar) {
          avatar.classList.remove('unseen');
          avatar.classList.add('seen');
        }
        
        console.log('Circle clicked:', domain);
        if (domain && domain in domainHighlights) {
          console.log('Opening overlay for domain:', domain);
          this.onDomainClick?.(domain);
        } else {
          console.log('Domain not found in domainHighlights:', domain);
        }
      });
    });
  }

  remove(): void {
    const existing = document.getElementById('linkedin-highlights-circles-row');
    if (existing) {
      existing.remove();
    }
  }
} 
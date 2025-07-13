// Manage Interests Modal Component
import { getPreferredDomains, setPreferredDomains } from './utils';
import { storyDomains } from './constants';

export class ManageInterestsModal {
  private static instance: ManageInterestsModal;
  private onClose?: () => void;
  private onUpdate?: () => void;

  static getInstance(): ManageInterestsModal {
    if (!ManageInterestsModal.instance) {
      ManageInterestsModal.instance = new ManageInterestsModal();
    }
    return ManageInterestsModal.instance;
  }

  setCallbacks(onClose: () => void, onUpdate: () => void) {
    this.onClose = onClose;
    this.onUpdate = onUpdate;
  }

  show(): void {
    if (document.getElementById('linkedin-manage-interests-modal')) return;
    const selected = new Set(getPreferredDomains() || []);
    const modal = document.createElement('div');
    modal.id = 'linkedin-manage-interests-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.right = '0';
    modal.style.bottom = '0';
    modal.style.background = 'rgba(0,0,0,0.32)';
    modal.style.zIndex = '2147483647';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';

    // Helper to render the domain list based on a filter
    const renderDomainList = (filter = '') => {
      const filterLower = filter.trim().toLowerCase();
      return storyDomains
        .filter(domain =>
          domain.name.toLowerCase().includes(filterLower) ||
          (`#${domain.name.replace(/\s+/g, '')}IN`).toLowerCase().includes(filterLower)
        )
        .map(domain => `
          <div class="manage-interests-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px 0 8px 0;border-bottom:1px solid #f0f0f0;gap:35px;">
            <div style="display:flex;align-items:center;gap:12px;min-width:0;flex:1;">
              <img src="${domain.img}" alt="${domain.name}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;flex-shrink:0;" />
              <div style="min-width:0;flex:1;">
                <div style="font-weight:700;font-size:1.4em;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${domain.name}</div>
                <div style="font-size:1em;color:#888;">#${domain.name.replace(/\s+/g, '')}IN</div>
              </div>
            </div>
            <button class="manage-interests-follow-btn" data-domain="${domain.name}" style="min-width:64px;padding:4px 0 4px 0;border-radius:16px;font-weight:600;font-size:1.2em;border:1.5px solid ${selected.has(domain.name) ? '#0077b5' : '#d1d1d1'};background:${selected.has(domain.name) ? '#0077b5' : '#fff'};color:${selected.has(domain.name) ? '#fff' : '#0077b5'};cursor:pointer;outline:none;">${selected.has(domain.name) ? 'Following' : 'Follow'}</button>
          </div>
        `).join('');
    };

    modal.innerHTML = `
      <style>
        @media (max-width: 480px) {
          .highlights-preferences-modal-content { width: 100vw !important; min-width: 0 !important; max-width: 100vw !important; border-radius: 0 !important; font-size: 0.97em !important; }
          .manage-interests-row { gap: 18px !important;font-size: 0.9em !important; }
          .manage-interests-follow-btn { min-width: 56px !important; font-size: 0.7em !important;}
        }
        @media (min-width: 481px) {
          .highlights-preferences-modal-content { max-width: 250px; min-width: 200px; font-size: 1.12em; }
        }
      </style>
      <div class="highlights-preferences-modal-content" style="width:100%;max-width:250px;min-width:200px;background:#fff;border-radius:16px;box-shadow:0 2px 16px rgba(0,0,0,0.12);padding:0 0 18px 0;position:relative;min-height:520px;max-height:90vh;display:flex;flex-direction:column;">
        <button class="highlights-preferences-close" style="position:absolute;top:16px;right:16px;background:none;border:none;font-size:1.6rem;color:#888;cursor:pointer;z-index:2;">&times;</button>
        <div style="padding:18px 12px 0 12px;">
          <div style="font-weight:700;text-align:center;margin-bottom:6px;">Preferences</div>
          <div style="margin-bottom:10px;">
            <input id="manage-interests-search" type="text" placeholder="Search" style="width:100%;padding:7px 10px;border-radius:8px;border:1px solid #eee;background:#f4f6f8;outline:none;" />
          </div>
        </div>
        <div id="manage-interests-list" style="flex:1;max-height:calc(90vh - 120px);overflow-y:auto;padding:0 12px;">
          ${renderDomainList()}
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Button logic (delegated for re-render)
    const selectedDomains = new Set(selected);
    const onUpdate = this.onUpdate;
    function attachButtonListeners() {
      const followBtns = modal.querySelectorAll('.manage-interests-follow-btn');
      followBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const domain = btn.getAttribute('data-domain');
          if (!domain) return;
          if (selectedDomains.has(domain)) {
            selectedDomains.delete(domain);
            btn.textContent = 'Follow';
            btn.setAttribute('style', 'min-width:64px;padding:4px 0 4px 0;border-radius:16px;font-weight:600;font-size:1.2em;border:1.5px solid #d1d1d1;background:#fff;color:#0077b5;cursor:pointer;outline:none;');
          } else {
            selectedDomains.add(domain);
            btn.textContent = 'Following';
            btn.setAttribute('style', 'min-width:64px;padding:4px 0 4px 0;border-radius:16px;font-weight:600;font-size:1.2em;border:1.5px solid #0077b5;background:#0077b5;color:#fff;cursor:pointer;outline:none;');
          }
          setPreferredDomains(Array.from(selectedDomains));
          onUpdate?.();
        });
      });
    }
    attachButtonListeners();

    // Search bar logic
    const searchInput = modal.querySelector('#manage-interests-search') as HTMLInputElement;
    const listDiv = modal.querySelector('#manage-interests-list') as HTMLDivElement;
    if (searchInput && listDiv) {
      searchInput.addEventListener('input', () => {
        listDiv.innerHTML = renderDomainList(searchInput.value);
        attachButtonListeners();
      });
    }

    // Close button
    const closeBtn = modal.querySelector('.highlights-preferences-close');
    closeBtn?.addEventListener('click', () => {
      this.remove();
      this.onClose?.();
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.remove();
        this.onClose?.();
      }
    });
  }

  remove(): void {
    const existing = document.getElementById('linkedin-manage-interests-modal');
    if (existing) {
      existing.remove();
    }
  }
} 
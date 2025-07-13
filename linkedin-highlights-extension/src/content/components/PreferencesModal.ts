// Preferences Modal Component
import { getPreferredDomains, setPreferredDomains } from './utils';
import { storyDomains } from './constants';

export class PreferencesModal {
  private static instance: PreferencesModal;
  private onClose?: () => void;

  static getInstance(): PreferencesModal {
    if (!PreferencesModal.instance) {
      PreferencesModal.instance = new PreferencesModal();
    }
    return PreferencesModal.instance;
  }

  setCallbacks(onClose: () => void) {
    this.onClose = onClose;
  }

  show(): void {
    if (document.getElementById('linkedin-highlights-preferences-modal')) return;
    
    const selected = new Set(getPreferredDomains() || []);
    const modal = document.createElement('div');
    modal.id = 'linkedin-highlights-preferences-modal';
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
    
    modal.innerHTML = `
      <div class="highlights-preferences-modal-content">
        <button class="highlights-preferences-close" style="position:absolute;top:16px;right:16px;background:none;border:none;font-size:1.6rem;color:#888;cursor:pointer;z-index:2;">&times;</button>
        <h1 style="margin:0 0 8px 0;font-size:1.6rem;font-weight:800;text-align:center;">
          <span style='color:#222;'>Welcome to </span><span style='color:#0077b5;'>TrendIN!</span>
        </h1>
        <h2 style="margin:0 0 18px 0;font-size:1.2rem;font-weight:700;color:#888;text-align:center;">Choose your highlight interests</h2>
        <div class="highlights-preferences-pills">
          ${storyDomains.map(domain => `
            <div class="highlights-preferences-pill${selected.has(domain.name) ? ' selected' : ''}" data-domain="${domain.name}">
              ${domain.name}
            </div>
          `).join('')}
        </div>
        <div style="font-size:1.3em;color:#888;font-weight:600;margin:24px 0 12px 0;text-align:center;">Swipe! Think! Engage!</div>
        <button class="highlights-preferences-save" disabled>Save</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Selection logic
    const pills = modal.querySelectorAll('.highlights-preferences-pill');
    const saveBtn = modal.querySelector('.highlights-preferences-save') as HTMLButtonElement;
    const selectedDomains = new Set(selected);
    
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const domain = pill.getAttribute('data-domain');
        if (domain) {
          if (selectedDomains.has(domain)) {
            selectedDomains.delete(domain);
            pill.classList.remove('selected');
          } else {
            selectedDomains.add(domain);
            pill.classList.add('selected');
          }
          saveBtn.disabled = selectedDomains.size === 0;
        }
      });
    });
    
    // Save button
    saveBtn.addEventListener('click', () => {
      const domainsArray = Array.from(selectedDomains);
      setPreferredDomains(domainsArray);
      this.remove();
      this.onClose?.();
    });
    
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
    const existing = document.getElementById('linkedin-highlights-preferences-modal');
    if (existing) {
      existing.remove();
    }
  }
} 
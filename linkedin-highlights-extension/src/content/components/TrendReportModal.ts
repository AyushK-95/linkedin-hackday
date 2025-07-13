// Trend Report Modal Component
export class TrendReportModal {
  static show(onSelect?: (reason: string) => void, parent?: HTMLElement) {
    if (parent && parent.querySelector('#trend-report-modal')) return;
    if (!parent && document.getElementById('trend-report-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'trend-report-modal';
    modal.style.position = 'absolute';
    modal.style.left = '0';
    modal.style.right = '0';
    modal.style.top = '0';
    modal.style.bottom = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0,0,0,0.08)';
    modal.style.zIndex = '999';
    modal.style.display = 'flex';
    modal.style.alignItems = 'flex-end';
    modal.style.justifyContent = 'center';
    modal.style.borderRadius = 'inherit';

    modal.innerHTML = `
        <style>
        @media (min-width: 481px) {
            #trend-report-modal-sheet {
                font-size: 2em !important;
            }
        }
        </style>
      <div id="trend-report-modal-sheet" style="width:100%;height:auto;max-width:420px;background:#fff;border-radius:inherit;padding:18px 0 8px 0;box-shadow:0 -2px 16px rgba(0,0,0,0.10);margin-bottom:0;position: absolute; left: 0; right: 0; bottom: 0;">
        <div style="width:48px;height:5px;background:#e0e0e0;border-radius:3px;margin:0 auto 18px auto;"></div>
        <div class="trend-report-option" style="padding:18px 6vw;cursor:pointer;">This trend is a spam</div>
        <div class="trend-report-option" style="padding:18px 6vw;cursor:pointer;">This trend is abusive or harmful</div>
        <div class="trend-report-option" style="padding:18px 6vw;cursor:pointer;">Not interested in this</div>
        <div class="trend-report-option" style="padding:18px 6vw;cursor:pointer;">This trend is a duplicate</div>
        <div class="trend-report-option" style="padding:18px 6vw;cursor:pointer;">This trend is harmful</div>
        <div class="trend-report-cancel" style="padding:18px 6vw;margin-top:8px;background:#f4f6f8;border-radius:12px;text-align:center;color:#222;cursor:pointer;">Cancel</div>
      </div>
    `;

    if (parent) {
      parent.appendChild(modal);
    } else {
      document.body.appendChild(modal);
    }

    // Option click logic
    const options = modal.querySelectorAll('.trend-report-option');
    options.forEach(option => {
      option.addEventListener('click', () => {
        const reason = option.textContent || '';
        modal.remove();
        if (onSelect) onSelect(reason);
        else console.log('Trend report reason:', reason);
      });
    });
    // Cancel button
    const cancelBtn = modal.querySelector('.trend-report-cancel');
    cancelBtn?.addEventListener('click', () => {
      modal.remove();
    });
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }
} 
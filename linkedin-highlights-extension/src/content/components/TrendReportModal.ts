// Trend Report Modal Component
export class TrendReportModal {
  static show(onSelect?: (reason: string) => void) {
    if (document.getElementById('trend-report-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'trend-report-modal';
    modal.style.position = 'fixed';
    modal.style.left = '0';
    modal.style.right = '0';
    modal.style.bottom = '0';
    modal.style.top = '0';
    modal.style.background = 'rgba(0,0,0,0.18)';
    modal.style.zIndex = '2147483647';
    modal.style.display = 'flex';
    modal.style.alignItems = 'flex-end';
    modal.style.justifyContent = 'center';

    modal.innerHTML = `
      <style>
        @media (max-width: 480px) {
          #trend-report-modal-sheet { width: 100vw !important; border-radius: 18px 18px 0 0 !important; }
          #trend-report-modal-sheet .trend-report-option, #trend-report-modal-sheet .trend-report-cancel { font-size: 1.08em !important; padding: 18px 8vw !important; }
        }
        @media (min-width: 481px) {
          #trend-report-modal-sheet { max-width: 420px; font-size: 2em !important; }
          #trend-report-modal-sheet .trend-report-option, #trend-report-modal-sheet .trend-report-cancel { font-size: 1.18em !important; }
        }
      </style>
      <div id="trend-report-modal-sheet" style="width:90vw;max-width:420px;background:#fff;border-radius:18px 18px 0 0;padding:2vw 0 1vw 0;box-shadow:0 -2px 16px rgba(0,0,0,0.10);margin-bottom:0;">
        <div style="width:48px;height:5px;background:#e0e0e0;border-radius:3px;margin:0 auto 18px auto;"></div>
        <div class="trend-report-option" style="padding:12px 6vw;cursor:pointer;">This trend is a spam</div>
        <div class="trend-report-option" style="padding:12px 6vw;cursor:pointer;">This trend is abusive or harmful</div>
        <div class="trend-report-option" style="padding:12px 6vw;cursor:pointer;">Not interested in this</div>
        <div class="trend-report-option" style="padding:12px 6vw;cursor:pointer;">This trend is a duplicate</div>
        <div class="trend-report-option" style="padding:12px 6vw;cursor:pointer;">This trend is harmful</div>
        <div class="trend-report-cancel" style="padding:14px 6vw 8px 6vw;margin-top:8px;background:#f4f6f8;border-radius:12px;text-align:center;color:#222;cursor:pointer;">Cancel</div>
      </div>
    `;

    document.body.appendChild(modal);

    // Option click logic
    const options = modal.querySelectorAll('div[style*="cursor:pointer"]:not(:last-child)');
    options.forEach(option => {
      option.addEventListener('click', () => {
        const reason = option.textContent || '';
        modal.remove();
        if (onSelect) onSelect(reason);
        else console.log('Trend report reason:', reason);
      });
    });
    // Cancel button
    const cancelBtn = modal.querySelector('div[style*="cursor:pointer"]:last-child');
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
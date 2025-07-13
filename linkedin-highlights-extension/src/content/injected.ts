// Injected script for LinkedIn Highlights extension
import './components/styles/StoryCirclesRow.css';
import './components/styles/StoryOverlay.css';
import './components/styles/PreferencesModal.css';
import './components/styles/TrendsModal.css';

(function() {
  'use strict';

  // Check if styles already exist
  if (document.getElementById('linkedin-highlights-styles')) {
    return;
  }

  // Create and inject CSS
  const style = document.createElement('style');
  style.id = 'linkedin-highlights-styles';
  
  // Import all component styles
  const styleSheets = [
    // StoryCirclesRow styles
    `
    /* Story Circles Row Styles */
    .linkedin-highlights-circles-row {
      width: 100% !important;
      background: #fff !important;
      padding: 12px 0 8px 0 !important;
      border-bottom: 1px solid #e0e0e0 !important;
      margin: 0 !important;
      overflow-x: auto !important;
    }
    .circles-scroll {
      display: flex !important;
      flex-direction: row !important;
      gap: 18px !important;
      overflow-x: auto !important;
      padding-left: 12px !important;
      padding-right: 12px !important;
    }
    .story-circle-item {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      cursor: pointer !important;
      min-width: 60px !important;
      max-width: 60px !important;
      user-select: none !important;
    }
    .story-circle-avatar {
      width: 54px !important;
      height: 54px !important;
      border-radius: 50% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      background: #fff !important;
      box-sizing: border-box !important;
      margin-bottom: 6px !important;
      transition: border 0.2s, box-shadow 0.2s !important;
    }
    .story-circle-avatar img {
      width: 48px !important;
      height: 48px !important;
      border-radius: 50% !important;
      object-fit: cover !important;
      display: block !important;
      border: none !important;
      box-shadow: none !important;
    }
    .story-circle-item:hover .story-circle-avatar {
      border: 2px solid #6366f1 !important;
      box-shadow: 0 4px 16px rgba(99,102,241,0.12) !important;
    }
    .story-circle-label {
      font-size: 0.85rem !important;
      color: #555 !important;
      text-align: center !important;
      margin-top: 2px !important;
      white-space: nowrap !important;
    }
    .story-circle-avatar.unseen {
      border: 3px solid #0077ff !important;
      box-shadow: 0 0 0 2px #e0e7ef;
    }
    .story-circle-avatar.seen {
      border: 3px solid #e0e0e0 !important;
      box-shadow: 0 0 0 2px #f5f5f5;
    }
    @media (max-width: 600px) {
      .linkedin-highlights-circles-row {
        width: 100vw !important;
        position: relative !important;
        left: 50% !important;
        right: 50% !important;
        margin-left: -50vw !important;
        margin-right: -50vw !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        background: #fff !important;
        padding: 12px 0 8px 0 !important;
        border-bottom: 1px solid #e0e0e0 !important;
        overflow-x: auto !important;
        z-index: 1002 !important;
      }
      .circles-scroll {
        gap: 10px !important;
        padding-left: 8px !important;
        padding-right: 8px !important;
      }
      .story-circle-item {
        min-width: 44px !important;
        max-width: 44px !important;
      }
      .story-circle-avatar {
        width: 40px !important;
        height: 40px !important;
      }
      .story-circle-avatar img {
        width: 34px !important;
        height: 34px !important;
      }
      .story-circle-label {
        font-size: 0.7rem !important;
        max-width: 44px !important;
      }
    }
    `,
    
    // StoryOverlay styles
    `
    /* Story Overlay (Instagram-style) */
    .linkedin-highlights-container {
      margin: 16px 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      z-index: 1000;
      position: relative;
    }
    .highlights-story-container {
      position: relative;
      width: 100vw !important;
      height: 100vh !important;
      max-width: 100vw !important;
      max-height: 100vh !important;
      min-width: 100vw !important;
      min-height: 100vh !important;
      border-radius: 0 !important;
      overflow: hidden;
      background: #000;
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      align-items: stretch;
    }
    .story-image-bg {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      width: 100vw;
      height: 100vh;
      background-size: cover;
      background-position: center;
      z-index: 1;
    }
    .story-gradient-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.85) 100%);
      z-index: 2;
      pointer-events: none;
    }
    .story-content {
      position: relative;
      width: 100vw;
      height: 100vh;
      z-index: 3;
    }
    .story-slide {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      width: 100vw;
      height: 100vh;
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .story-slide.active {
      opacity: 1;
      z-index: 4;
    }
    .story-top-bar {
      position: absolute;
      top: 24px;
      left: 24px;
      right: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 10;
    }
    .story-domain-info {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
      font-size: 18px;
      font-weight: 500;
    }
    .story-domain-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #fff;
      background: #fff;
    }
    .story-domain-name {
      font-size: 18px;
      font-weight: 600;
      color: #fff;
    }
    .story-time {
      font-size: 15px;
      color: #e0e0e0;
      margin-left: 12px;
    }
    .story-close-btn {
      background: rgba(0,0,0,0.3);
      border: none;
      color: #fff;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
      z-index: 20;
    }
    .story-close-btn:hover {
      background: rgba(0,0,0,0.5);
    }
    .story-progress-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 20;
      padding: 0 0 0 0;
      margin: 0;
    }
    .story-progress-bars {
      display: flex;
      gap: 4px;
      padding: 16px 16px 0 16px;
    }
    .story-progress-bar {
      flex: 1;
      height: 3px;
      background: rgba(255,255,255,0.3);
      border-radius: 2px;
      overflow: hidden;
    }
    .story-progress-fill {
      height: 100%;
      background: #fff;
      border-radius: 2px;
      width: 0%;
      transition: width 0.3s ease;
    }
    .story-progress-fill.active {
      width: 100%;
      animation: progressFill 5s linear forwards;
    }
    @keyframes progressFill {
      from { width: 0%; }
      to { width: 100%; }
    }
    .story-bottom-bar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 32px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0 32px;
      z-index: 10;
    }
    .story-hashtag {
      position: absolute;
      left: 32px;
      bottom: 80px;
      color: #e0e0e0;
      font-size: 32px;
      font-weight: 500;
      opacity: 0.95;
      letter-spacing: 1px;
      text-shadow: 0 2px 8px rgba(0,0,0,0.25);
      z-index: 20;
    }
    @media (max-width: 600px) {
      .story-hashtag {
        left: 18px;
        bottom: 90px;
        font-size: 24px;
      }
    }
    .story-trending-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
    }
    .story-trending-rank {
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      text-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }
    .story-post-count {
      color: #e0e0e0;
      font-size: 15px;
      font-weight: 400;
      text-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }
    .story-text-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 40px 20px 20px;
      background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
      color: white;
    }
    .story-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.9);
      color: #0077b5;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .story-text-content h2 {
      margin: 0 0 8px 0;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.3;
    }
    .story-text-content p {
      margin: 0 0 16px 0;
      font-size: 14px;
      line-height: 1.4;
      opacity: 0.9;
    }
    .story-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      opacity: 0.8;
    }
    .story-author {
      font-weight: 500;
    }
    .story-navigation {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
      padding: 0 12px;
      pointer-events: none;
    }
    .story-nav-btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 24px;
      font-weight: bold;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      pointer-events: auto;
      backdrop-filter: blur(10px);
    }
    .story-nav-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
    .story-nav-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    .story-bottom-actions {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%);
    }
    .story-action-group {
      display: flex;
      gap: 12px;
    }
    .story-action-btn.like,
    .story-action-btn.comment,
    .story-action-btn.share,
    .story-action-btn.voice {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 18px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
    }
    .story-action-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
    .story-view-all-btn {
      background: #0077b5;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .story-view-all-btn:hover {
      background: #005885;
    }
    @media (max-width: 768px) {
      .highlights-story-container {
        aspect-ratio: 9/16;
        max-height: 500px;
      }
      .story-header {
        padding: 12px 16px;
      }
      .story-text-content {
        padding: 30px 16px 16px;
      }
      .story-text-content h2 {
        font-size: 18px;
      }
      .story-bottom-actions {
        padding: 16px;
      }
      .story-action-group {
        gap: 8px;
      }
      .story-action-btn.like,
      .story-action-btn.comment,
      .story-action-btn.share,
      .story-action-btn.voice {
        width: 36px;
        height: 36px;
        font-size: 16px;
      }
    }
    .linkedin-highlights-container * {
      box-sizing: border-box;
    }
    .linkedin-highlights-container {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif !important;
    }
    .d6aec37a.bdf15dda {
      margin-bottom: 0 !important;
      padding-bottom: 0 !important;
    }
    @media (max-width: 600px) {
      .highlights-story-container {
        max-width: 100vw !important;
        max-height: 100vh !important;
        border-radius: 0 !important;
        aspect-ratio: unset !important;
      }
      .story-header,
      .story-bottom-actions,
      .story-progress-container {
        padding-left: 8px !important;
        padding-right: 8px !important;
      }
      .story-header {
        padding-top: 8px !important;
        padding-bottom: 8px !important;
      }
      .story-text-content {
        padding: 20px 8px 12px !important;
      }
      .story-nav-btn {
        width: 32px !important;
        height: 32px !important;
        font-size: 18px !important;
      }
    }
    #linkedin-highlights-widget,
    .linkedin-highlights-overlay {
      z-index: 2147483647 !important;
      background: rgba(0,0,0,0.92) !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      display: block !important;
      opacity: 1 !important;
    }
    .story-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 24px;
      font-weight: bold;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
    }
    .story-arrow:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-50%) scale(1.1);
    }
    .story-arrow-left {
      left: 12px;
    }
    .story-arrow-right {
      right: 12px;
    }
    .story-hashtag-row {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 32px;
      z-index: 20;
    }
    .story-hashtag {
      color: #e0e0e0;
      font-size: 32px;
      font-weight: 500;
      opacity: 0.95;
      letter-spacing: 1px;
      text-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }
    .story-post-count {
      color: #e0e0e0;
      font-size: 16px;
      font-weight: 400;
      opacity: 0.95;
      text-shadow: 0 2px 8px rgba(0,0,0,0.25);
      white-space: nowrap;
    }
    @media (max-width: 600px) {
      .story-hashtag-row {
        padding: 0 18px;
        bottom: 90px;
      }
      .story-hashtag {
        font-size: 24px;
      }
      .story-post-count {
        font-size: 13px;
      }
    }
    `,
    
    // PreferencesModal styles
    `
    /* Preferences Modal Styles */
    .highlights-preferences-modal-content {
      background: #fff;
      border-radius: 18px;
      padding: 32px 24px 24px 24px;
      box-shadow: 0 4px 32px rgba(0,0,0,0.18);
      max-width: 400px;
      width: 90vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 2147483647;
      position: relative;
    }
    .highlights-preferences-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      font-size: 1.6rem;
      color: #888;
      cursor: pointer;
      z-index: 2;
      line-height: 1;
      padding: 0 4px;
      border-radius: 50%;
      transition: background 0.15s;
    }
    .highlights-preferences-close:hover {
      background: #f0f4f8;
      color: #0077b5;
    }
    .highlights-preferences-circles {
      display: flex;
      flex-wrap: wrap;
      gap: 18px 18px;
      justify-content: center;
      margin-bottom: 24px;
      width: 100%;
    }
    .highlights-preferences-circle {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      user-select: none;
      transition: transform 0.15s, box-shadow 0.15s;
      border-radius: 50%;
      padding: 0;
    }
    .highlights-preferences-circle.selected img {
      box-shadow: 0 0 0 3px #0077b5, 0 2px 8px rgba(0,119,181,0.10);
    }
    .highlights-preferences-circle img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #e0e0e0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07);
      transition: box-shadow 0.15s, border 0.15s;
    }
    .highlights-preferences-label {
      font-size: 0.98rem;
      color: #222;
      margin-top: 6px;
      text-align: center;
      font-weight: 500;
    }
    .highlights-preferences-save {
      margin-top: 18px;
      background: #0077b5;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 10px 32px;
      font-size: 1.08rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.18s;
      box-shadow: 0 2px 8px rgba(0,119,181,0.08);
    }
    .highlights-preferences-save:disabled {
      background: #e0e0e0;
      color: #888;
      cursor: not-allowed;
    }
    .highlights-preferences-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 12px;
      justify-content: center;
      margin-bottom: 24px;
      width: 100%;
    }
    .highlights-preferences-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px 18px;
      border: 2px solid #0077b5;
      border-radius: 22px;
      background: #fff;
      color: #0077b5;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
      transition: background 0.15s, color 0.15s, border 0.15s;
    }
    .highlights-preferences-pill.selected {
      background: #0077b5;
      color: #fff;
      border-color: #0077b5;
    }
    .highlights-preferences-pill:hover {
      background: #e6f0fa;
      color: #005983;
      border-color: #005983;
    }
    `,
    
    // TrendsModal styles
    `
    /* Trends Modal Styles */
    .linkedin-trends-modal {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      border-radius: 18px 18px 0 0;
      box-shadow: 0 -4px 32px rgba(0,0,0,0.18);
      z-index: 2147483647;
      max-height: 80vh;
      overflow-y: auto;
      animation: slideUp 0.3s ease-out;
    }
    @keyframes slideUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
    .trends-modal-content {
      padding: 24px 0 32px 0;
      position: relative;
    }
    .trends-modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      font-size: 1.8rem;
      color: #888;
      cursor: pointer;
      z-index: 2;
      line-height: 1;
      padding: 0 4px;
      border-radius: 50%;
      transition: background 0.15s;
    }
    .trends-modal-close:hover {
      background: #f0f4f8;
      color: #0077b5;
    }
    .trends-modal-hashtag-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 24px 16px 24px;
      border-bottom: 1px solid #eee;
      margin-bottom: 16px;
    }
    .trends-modal-hash {
      font-size: 2rem;
      font-weight: 700;
      color: #0077b5;
    }
    .trends-modal-hash-count {
      font-size: 1.2rem;
      color: #666;
      font-weight: 500;
    }
    .trends-modal-list {
      padding: 0 24px;
    }
    .trends-modal-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #222;
      margin-bottom: 16px;
    }
    .trends-modal-topic {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f2f2f2;
      cursor: pointer;
      transition: background 0.15s;
    }
    .trends-modal-topic:hover {
      background: #f8f9fa;
    }
    .trends-modal-topic:last-of-type {
      border-bottom: none;
    }
    .trends-modal-topic-main {
      flex: 1;
    }
    .trends-modal-topic-region {
      font-size: 0.85rem;
      color: #666;
      margin-bottom: 4px;
    }
    .trends-modal-topic-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .trends-modal-topic-tag {
      font-size: 1rem;
      font-weight: 600;
      color: #222;
    }
    .trends-modal-topic-posts {
      font-size: 0.85rem;
      color: #666;
    }
    .trends-modal-topic-more {
      font-size: 1.2rem;
      color: #888;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 50%;
      transition: background 0.15s;
    }
    .trends-modal-topic-more:hover {
      background: #f0f4f8;
    }
    .trends-modal-showmore {
      text-align: center;
      padding: 16px 0 8px 0;
      color: #0077b5;
      font-weight: 600;
      cursor: pointer;
      transition: color 0.15s;
    }
    .trends-modal-showmore:hover {
      color: #005983;
    }
    .story-slide.shrink-highlight {
      transform: scale(0.95);
      transition: transform 0.3s ease;
    }
    .trends-report-sheet {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2147483648;
    }
    .report-sheet-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
    }
    .report-sheet-content {
      position: relative;
      background: #fff;
      border-radius: 18px 18px 0 0;
      padding: 16px 0 32px 0;
      animation: slideUp 0.3s ease-out;
    }
    .report-sheet-handle {
      width: 40px;
      height: 4px;
      background: #e0e0e0;
      border-radius: 3px;
      margin: 12px auto 18px auto;
    }
    .report-sheet-option {
      font-size: 17px;
      color: #222;
      padding: 16px 24px;
      border-bottom: 1px solid #f2f2f2;
      background: #fff;
      cursor: pointer;
      transition: background 0.15s;
    }
    .report-sheet-option:last-of-type {
      border-bottom: none;
    }
    .report-sheet-option:hover {
      background: #f5f5f5;
    }
    .report-sheet-cancel {
      margin: 18px 16px 0 16px;
      padding: 14px 0;
      background: #f3f5f7;
      color: #222;
      font-size: 18px;
      font-weight: 500;
      border: none;
      border-radius: 18px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      transition: background 0.15s;
    }
    .report-sheet-cancel:hover {
      background: #e0e0e0;
    }
    `
  ];

  style.textContent = styleSheets.join('\n');
  
  // Inject styles into head
  document.head.appendChild(style);
  console.log('LinkedIn Highlights styles injected successfully', style);
})(); 
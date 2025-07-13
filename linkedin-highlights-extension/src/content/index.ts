// Content script for LinkedIn Highlights extension
import { shouldInjectHighlights, extractProfileData } from './components/utils';
import { StoryCirclesRow } from './components/StoryCirclesRow';
import { StoryOverlay } from './components/StoryOverlay';
import { PreferencesModal } from './components/PreferencesModal';
import { TrendsModal } from './components/TrendsModal';
import { ManageInterestsModal } from './components/ManageInterestsModal';

console.log('LinkedIn Highlights extension loaded');

// Initialize components
const storyCirclesRow = StoryCirclesRow.getInstance();
const storyOverlay = StoryOverlay.getInstance();
const preferencesModal = PreferencesModal.getInstance();
const trendsModal = TrendsModal.getInstance();
const manageInterestsModal = ManageInterestsModal.getInstance();

// Set up component callbacks
storyCirclesRow.setCallbacks(
  (domain: string) => {
    console.log('Domain clicked:', domain);
    storyOverlay.open(domain as any);
  },
  () => {
    console.log('Preferences clicked');
    const { getPreferredDomains } = require('./components/utils');
    // if (!getPreferredDomains() || getPreferredDomains().length === 0) {
    //   preferencesModal.show();
    // } else {
      manageInterestsModal.setCallbacks(
        () => {}, // onClose
        () => { storyCirclesRow.remove(); storyCirclesRow.inject(); } // onUpdate
      );
      manageInterestsModal.show();
    // }
  }
);

storyOverlay.setCallbacks(
  (domain: string) => {
    console.log('Trends clicked for domain:', domain);
    trendsModal.show(domain);
  }
);

preferencesModal.setCallbacks(() => {
  console.log('Preferences modal closed, re-injecting circles row');
  storyCirclesRow.remove();
  storyCirclesRow.inject();
});

// Initialize highlights injection with multiple attempts
function initializeHighlights() {
  if (shouldInjectHighlights()) {
    console.log('LinkedIn homepage detected, initializing highlights...');
    storyCirclesRow.inject(); // Inject circles row first
    // No automatic overlay injection
  }
}

// Listen for navigation changes (SPA)
let currentUrl = window.location.href;
const observer = new MutationObserver(() => {
  if (window.location.href !== currentUrl) {
    currentUrl = window.location.href;
    console.log('URL changed, checking if highlights should be injected...');
    if (shouldInjectHighlights()) {
      initializeHighlights(); // Re-initialize to handle SPA navigation
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeHighlights);
} else {
  initializeHighlights();
}

// Also try after a longer delay for slow-loading pages
setTimeout(() => {
  if (shouldInjectHighlights() && !document.getElementById('linkedin-highlights-widget')) {
    console.log('Late initialization attempt...');
    initializeHighlights(); // Re-initialize to handle late attempts
  }
}, 10000); 

// Show preferences modal on first load if not set
import { getPreferredDomains } from './components/utils';
if (!getPreferredDomains()) {
  preferencesModal.show();
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractProfile') {
    const profileData = extractProfileData();
    sendResponse(profileData);
  } else if (request.action === 'injectWidget') {
    // This request is now handled by storyCirclesRow and storyOverlay
    // No need to call injectHighlightsIntoFeed directly here.
    sendResponse({ success: true });
  }
}); 
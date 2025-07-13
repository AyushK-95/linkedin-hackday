// Utility functions for LinkedIn Highlights extension

// Storage utilities
export function getPreferredDomains(): string[] | null {
  const stored = localStorage.getItem('linkedin-highlights-preferences');
  return stored ? JSON.parse(stored) : null;
}

export function setPreferredDomains(domains: string[]) {
  localStorage.setItem('linkedin-highlights-preferences', JSON.stringify(domains));
}

export function getSeenStories(): Record<string, boolean> {
  const stored = localStorage.getItem('linkedin-highlights-seen');
  return stored ? JSON.parse(stored) : {};
}

export function setSeenStory(domain: string) {
  const seen = getSeenStories();
  seen[domain] = true;
  localStorage.setItem('linkedin-highlights-seen', JSON.stringify(seen));
}

// LinkedIn feed detection utilities
export const FEED_SELECTORS = [
  // Main feed container
  'main[role="main"]',
  '.scaffold-finite-scroll__content',
  '[data-test-id="feed-identity-module"]',
  '.feed-identity-module',
  '.feed-shared-update-v2',
  // Alternative selectors
  '[data-test-id="feed"]',
  '.feed-shared-update-v2__container',
  '.feed-shared-update-v2__content',
  // More specific selectors
  'div[data-test-id="feed-identity-module"]',
  'div[data-test-id="feed-shared-update-v2"]',
  // Generic but reliable selectors
  '.artdeco-card',
  '.feed-shared-update-v2__content-wrapper',
  // Last resort - look for any container with feed-related classes
  '[class*="feed"]',
  '[class*="update"]'
];

export function findLinkedInFeed() {
  console.log('Searching for LinkedIn feed...');
  
  // Strategy 1: Try specific selectors
  for (const selector of FEED_SELECTORS) {
    const element = document.querySelector(selector);
    if (element) {
      console.log(`Found feed with selector: ${selector}`);
      return element;
    }
  }
  
  // Strategy 2: Look for elements with feed-related text content
  const allElements = document.querySelectorAll('div, main, section');
  for (const element of allElements) {
    const text = element.textContent?.toLowerCase() || '';
    if (text.includes('feed') || text.includes('post') || text.includes('update')) {
      const rect = element.getBoundingClientRect();
      if (rect.width > 300 && rect.height > 200) {
        console.log('Found potential feed element by content analysis');
        return element;
      }
    }
  }
  
  // Strategy 3: Look for the main content area
  const mainContent = document.querySelector('main') || 
                     document.querySelector('[role="main"]') ||
                     document.querySelector('.main-content') ||
                     document.querySelector('#main-content');
  
  if (mainContent) {
    console.log('Found main content area');
    return mainContent;
  }
  
  return null;
}

export function findInsertionPoint() {
  console.log('Finding insertion point...');
  
  // Strategy 1: Look for the main feed container
  const mainFeed = document.querySelector('main[role="main"]');
  if (mainFeed) {
    console.log('Found main feed container');
    
    // Look for the first feed post or the feed identity module
    const firstPost = mainFeed.querySelector('.feed-shared-update-v2, .feed-identity-module, .artdeco-card');
    if (firstPost && firstPost.parentElement) {
      console.log('Found first post, inserting before it');
      return firstPost.parentElement;
    }
    
    return mainFeed;
  }
  
  // Strategy 2: Look for any container with feed posts
  const feedPosts = document.querySelectorAll('.feed-shared-update-v2, .artdeco-card');
  if (feedPosts.length > 0) {
    const firstPost = feedPosts[0];
    if (firstPost.parentElement) {
      console.log('Found feed posts, inserting before first post');
      return firstPost.parentElement;
    }
  }
  
  // Strategy 3: Look for the body as last resort
  console.log('Using body as insertion point');
  return document.body;
}

// URL and page detection utilities
export function shouldInjectHighlights() {
  const currentUrl = window.location.href;
  return currentUrl.includes('linkedin.com/feed') || 
         currentUrl === 'https://www.linkedin.com/' ||
         currentUrl.includes('linkedin.com/home') ||
         currentUrl.includes('linkedin.com') && !currentUrl.includes('/in/') && !currentUrl.includes('/company/');
}

// Profile data extraction
export function extractProfileData() {
  const nameElement = document.querySelector('h1.text-heading-xlarge');
  const titleElement = document.querySelector('.text-body-medium.break-words');
  const companyElement = document.querySelector('.pv-text-details__right-panel .inline-show-more-text');
  const locationElement = document.querySelector('.pv-text-details__left-panel .inline-show-more-text');

  return {
    name: nameElement?.textContent?.trim() || 'Unknown',
    title: titleElement?.textContent?.trim() || 'Unknown',
    company: companyElement?.textContent?.trim() || 'Unknown',
    location: locationElement?.textContent?.trim() || 'Unknown'
  };
} 
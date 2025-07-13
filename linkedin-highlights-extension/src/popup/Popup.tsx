import React, { useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  title: string;
  company: string;
  location: string;
}

const Popup = () => {
  const [isActive, setIsActive] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we're on LinkedIn
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab.url?.includes('linkedin.com')) {
        setIsActive(true);
        // Extract profile data from LinkedIn
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id! },
          func: extractProfileData
        }, (results) => {
          if (results && results[0]) {
            setProfile(results[0].result);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, []);

  const extractProfileData = () => {
    // This function runs in the context of the LinkedIn page
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
  };

  const handleInjectHighlights = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab.id) {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: ['injected.js']
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="popup-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isActive) {
    return (
      <div className="popup-container">
        <div className="header">
          <h1>LinkedIn Highlights</h1>
          <p>Please navigate to LinkedIn to use this extension</p>
        </div>
      </div>
    );
  }

  return (
    <div className="popup-container">
      <div className="header">
        <h1>LinkedIn Highlights</h1>
        <p>AI-powered professional insights</p>
      </div>

      {profile && (
        <div className="profile-section">
          <h3>Profile Detected</h3>
          <div className="profile-info">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Title:</strong> {profile.title}</p>
            <p><strong>Company:</strong> {profile.company}</p>
            <p><strong>Location:</strong> {profile.location}</p>
          </div>
        </div>
      )}

      <div className="actions">
        <button onClick={handleInjectHighlights} className="btn-secondary">
          Inject into LinkedIn
        </button>
      </div>

      <div className="footer">
        <p>Get personalized professional insights</p>
      </div>
    </div>
  );
};

export default Popup; 
// Constants and mock data for LinkedIn Highlights extension

// Mock highlights data for the story interface
export const mockHighlights = [
  {
    id: '1',
    title: 'AI in Professional Development',
    summary: 'Discover how artificial intelligence is transforming career growth and skill development in 2024.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    author: 'Sarah Chen',
    time: '2 hours ago',
    type: 'trending'
  },
  {
    id: '2',
    title: 'Remote Work Best Practices',
    summary: 'Learn the most effective strategies for maintaining productivity and work-life balance in remote environments.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    author: 'Alex Rodriguez',
    time: '4 hours ago',
    type: 'featured'
  },
  {
    id: '3',
    title: 'Leadership in the Digital Age',
    summary: 'Essential leadership skills for managing teams in an increasingly digital and global workplace.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    author: 'Maria Johnson',
    time: '6 hours ago',
    type: 'insight'
  }
];

// Mock domains for the story circles
export const storyDomains = [
  { name: 'Business', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'New', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Tech', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Finance', img: 'https://randomuser.me/api/portraits/men/46.jpg' },
  { name: 'Design', img: 'https://randomuser.me/api/portraits/women/47.jpg' },
  { name: 'AI', img: 'https://randomuser.me/api/portraits/men/48.jpg' },
  { name: 'Health', img: 'https://randomuser.me/api/portraits/women/49.jpg' },
];

// Mock highlights per domain
export const domainHighlights = {
  Tech: [
    { image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6', title: 'AI Revolution', summary: 'How AI is changing the world.' },
    { image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c', title: 'Cloud Computing', summary: 'The future of cloud.' }
  ],
  Business: [
    { image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', title: 'Startup Growth', summary: 'Tips for scaling your startup.' },
    { image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca', title: 'Business News', summary: 'Latest business updates.' }
  ],
  New: [
    { image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca', title: 'Breaking News', summary: 'Latest updates in your industry.' },
    { image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', title: 'Industry Trends', summary: 'What is new in your field.' }
  ],
  Finance: [
    { image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', title: 'Market Trends', summary: 'What to watch in finance.' },
    { image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41', title: 'Finance Tips', summary: 'Improve your financial health.' }
  ],
  Design: [
    { image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41', title: 'UI Inspiration', summary: 'Modern design ideas.' },
    { image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97', title: 'Creative Process', summary: 'How designers work.' }
  ],
  AI: [
    { image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97', title: 'AI Ethics', summary: 'Responsible AI development.' },
    { image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6', title: 'AI in Business', summary: 'How AI is used in business.' }
  ],
  Health: [
    { image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528', title: 'Wellness Tips', summary: 'Staying healthy at work.' },
    { image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', title: 'Mental Health', summary: 'Taking care of your mind.' }
  ]
};

// Mock trending topics data
export const mockTrendingTopics = {
  Tech: [
    { tag: '#TECH', posts: '2,066', region: 'World' },
    { tag: '#PROGRAMMING', posts: '1,800', region: 'USA' },
    { tag: '#CLOUD', posts: '1,500', region: 'Europe' },
    { tag: '#INNOVATION', posts: '2,000', region: 'India' },
  ],
  Business: [
    { tag: '#STARTUP', posts: '1,500', region: 'World' },
    { tag: '#MARKETING', posts: '1,200', region: 'World' },
    { tag: '#FINANCE', posts: '1,100', region: 'India' },
    { tag: '#LEADERSHIP', posts: '1,000', region: 'Turkey' },
  ],
  New: [
    { tag: '#BREAKING', posts: '900', region: 'World' },
    { tag: '#NEWS', posts: '1,100', region: 'USA' },
    { tag: '#TRENDS', posts: '950', region: 'Europe' },
    { tag: '#UPDATES', posts: '800', region: 'India' },
  ],
  Finance: [
    { tag: '#MARKET', posts: '1,300', region: 'World' },
    { tag: '#INVESTING', posts: '1,000', region: 'USA' },
    { tag: '#CRYPTO', posts: '850', region: 'Europe' },
    { tag: '#ECONOMY', posts: '1,200', region: 'India' },
  ],
  Design: [
    { tag: '#UIUX', posts: '1,400', region: 'World' },
    { tag: '#CREATIVITY', posts: '1,100', region: 'USA' },
    { tag: '#GRAPHICDESIGN', posts: '1,000', region: 'Europe' },
    { tag: '#PRODUCTDESIGN', posts: '900', region: 'India' },
  ],
  AI: [
    { tag: '#AI', posts: '2,200', region: 'World' },
    { tag: '#MACHINELEARNING', posts: '1,900', region: 'USA' },
    { tag: '#DEEPLEARNING', posts: '1,600', region: 'Europe' },
    { tag: '#AITECH', posts: '1,700', region: 'India' },
  ],
  Health: [
    { tag: '#WELLNESS', posts: '1,300', region: 'World' },
    { tag: '#MENTALHEALTH', posts: '1,100', region: 'USA' },
    { tag: '#FITNESS', posts: '1,000', region: 'Europe' },
    { tag: '#HEALTHCARE', posts: '1,200', region: 'India' },
  ]
};

// SVG Icons
export const SVG_ICONS = {
  close: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  arrowLeft: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  arrowRight: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  hashtag: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3L6 21M18 3L14 21M3 10H21M3 14H21" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  plus: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  heart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7564 5.72718 21.351 5.12075 20.84 4.61Z" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  share: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12M16 6L12 2M12 2L8 6M12 2V15" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  voice: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1C10.8954 1 10 1.89543 10 3V11C10 12.1046 10.8954 13 12 13C13.1046 13 14 12.1046 14 11V3C14 1.89543 13.1046 1 12 1Z" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19 10V11C19 14.866 15.866 18 12 18C8.13401 18 5 14.866 5 11V10" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 18V22" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 22H16" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
}; 
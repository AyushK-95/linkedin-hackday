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
  plus: `<svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 0C19.2091 0 21 1.79086 21 4V17C21 19.2091 19.2091 21 17 21H4C1.79086 21 4.02666e-08 19.2091 0 17V4C0 1.79086 1.79086 4.0266e-08 4 0H17ZM9.12988 9.13086H4.56543V11.8691H9.12988V16.4346H11.8691V11.8691H16.4346V9.13086H11.8691V4.56543H9.12988V9.13086Z" fill="#090909"/></svg>`,
  heart: `<svg width="20" height="20" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.354 11.394V19.9825H17.6862L17.501 20.0041C14.0959 20.7913 11.8395 21.3589 10.715 21.7105C9.2212 22.1773 8.66438 22.2913 7.6512 22.3585C6.89343 22.4101 6.03277 22.1209 5.64057 21.7249C5.42389 21.5065 5.26168 21.0577 5.19753 20.3617C5.18424 20.2157 5.13161 20.076 5.04515 19.9571C4.95868 19.8383 4.84157 19.7446 4.70607 19.6861C4.40466 19.5565 4.15409 19.3452 3.94467 19.038C3.75099 18.7572 3.6251 18.234 3.6021 17.4768C3.59806 17.3376 3.55825 17.2018 3.48644 17.0821C3.41463 16.9624 3.3132 16.8628 3.19174 16.7928C2.48724 16.3884 2.13861 15.9324 2.06598 15.3972C1.98609 14.8056 2.17977 14.1396 2.68697 13.3812C2.80597 13.2034 2.85029 12.9865 2.81051 12.7768C2.77072 12.567 2.64997 12.3809 2.47392 12.258C1.98851 11.9196 1.72221 11.4492 1.65563 10.782C1.54911 9.71883 2.23303 8.93284 3.78125 8.77563C5.16016 8.64044 6.55238 8.75552 7.88966 9.11524C8.04136 9.15454 8.20122 9.15007 8.35045 9.10236C8.49967 9.05465 8.63204 8.96568 8.73199 8.84592C8.83194 8.72616 8.89531 8.5806 8.91464 8.42635C8.93397 8.27211 8.90846 8.1156 8.84111 7.97523C8.23586 6.70563 7.89935 5.65803 7.82066 4.84683C7.71777 3.77043 7.96834 2.99043 8.55422 2.34723C8.99847 1.86002 9.70903 1.58162 9.97534 1.63922C10.3264 1.71362 10.5552 1.91522 10.8529 2.62083C11.0285 3.03843 11.1132 3.39363 11.2585 4.22283C11.3977 5.01003 11.4739 5.36523 11.6325 5.83083C12.1106 7.24203 13.2836 8.70483 14.8585 9.71404C15.9622 10.4205 17.1584 10.9736 18.4137 11.358C18.4921 11.382 18.5737 11.3941 18.6558 11.394H21.354ZM21.4048 21.6181C21.7958 21.6289 22.1468 21.5425 22.441 21.3385C22.8162 21.0781 22.993 20.6677 22.9966 20.1949L22.993 11.4072C23.0341 10.9392 22.8949 10.5096 22.5657 10.1904C22.257 9.89044 21.8539 9.74884 21.4278 9.75844H18.7829C17.713 9.42048 16.6929 8.94354 15.7494 8.34003C14.4808 7.52643 13.5463 6.36003 13.1892 5.30883C13.0669 4.94643 13.0016 4.64643 12.8781 3.94083C12.7111 2.99403 12.6069 2.55363 12.3673 1.98722C11.871 0.808823 11.2197 0.232822 10.3215 0.0396221C9.43788 -0.149978 8.15113 0.355222 7.33768 1.24802C6.43586 2.23683 6.03761 3.47403 6.18529 5.00283C6.24824 5.66043 6.43223 6.39603 6.73485 7.21563C5.70136 7.06632 4.65326 7.04375 3.61421 7.14843C1.18475 7.39443 -0.179478 8.96284 0.019043 10.9452C0.106199 11.7996 0.418507 12.5256 0.949913 13.0956C0.503242 13.9488 0.3253 14.7924 0.436665 15.6156C0.564978 16.5636 1.09759 17.3532 1.98367 17.9664C2.05267 18.798 2.24514 19.4617 2.5865 19.9585C2.85547 20.3598 3.20641 20.7008 3.61663 20.9593C3.74736 21.7801 4.02214 22.4221 4.47123 22.8733C5.21569 23.6245 6.54602 24.0721 7.76135 23.9905C8.91495 23.9137 9.59767 23.7745 11.2076 23.2705C12.2692 22.9381 14.4675 22.3861 17.7806 21.6181H21.406H21.4048ZM19.3458 11.0208C19.3461 10.9135 19.325 10.8071 19.2838 10.7078C19.2426 10.6086 19.182 10.5183 19.1055 10.4423C19.0291 10.3663 18.9382 10.3059 18.8382 10.2648C18.7382 10.2236 18.6309 10.2024 18.5226 10.2024C18.4145 10.2028 18.3076 10.2242 18.2078 10.2655C18.1081 10.3068 18.0175 10.3671 17.9413 10.4431C17.8651 10.5191 17.8047 10.6093 17.7636 10.7084C17.7226 10.8075 17.7016 10.9137 17.7019 11.0208V20.2345C17.7018 20.3416 17.7229 20.4478 17.7641 20.5468C17.8053 20.6459 17.8658 20.7359 17.9421 20.8118C18.0185 20.8877 18.1091 20.9479 18.2089 20.9891C18.3087 21.0302 18.4157 21.0515 18.5238 21.0517C18.6319 21.0515 18.7389 21.0302 18.8387 20.9891C18.9385 20.9479 19.0292 20.8877 19.1055 20.8118C19.1818 20.7359 19.2423 20.6459 19.2836 20.5468C19.3248 20.4478 19.3459 20.3416 19.3458 20.2345V11.0208Z" fill="#090909"/></svg>`,
  share: `<svg width="20" height="20" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.0315 21C-1.06966 16.5556 0.735423 9.88889 11.2347 9.88889C21.7341 9.88889 26 9.88889 26 9.88889M26 9.88889L18.6177 1M26 9.88889L18.6177 19.5185" stroke="#090909" stroke-width="2"/></svg>`,
  arrowUp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 19V5M5 12l7-7 7 7" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  voice: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1C10.8954 1 10 1.89543 10 3V11C10 12.1046 10.8954 13 12 13C13.1046 13 14 12.1046 14 11V3C14 1.89543 13.1046 1 12 1Z" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19 10V11C19 14.866 15.866 18 12 18C8.13401 18 5 14.866 5 11V10" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 18V22" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 22H16" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
}; 
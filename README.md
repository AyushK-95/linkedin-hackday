# LinkedIn Highlights

An AI-powered professional insight feed presented in a modern story-style UI, delivering domain-specific trending content as swipeable visual slides.

## 🚀 Features

- **Story-Style Carousel UI**: Horizontal swipeable cards with modern design
- **Multiple Content Types**: Static cards, videos, flowcharts, polls, and voice input
- **Engagement Layer**: Reactions, voice opinions, and content exploration
- **AI-Powered Features**: Comment suggestions, hashtag recommendations, contributor badges
- **Personalization**: Content tailored to user profile and industry
- **Chrome Extension**: Seamless integration with LinkedIn

## 📁 Project Structure

```
hackday/
├── linkedin-highlights-extension/    # Chrome extension
│   ├── src/
│   │   ├── popup/                   # Extension popup UI
│   │   ├── content/                 # Content script for LinkedIn injection
│   │   └── background/              # Background script
│   ├── manifest.json
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions


### Chrome Extension

1. Navigate to the extension directory:
   ```bash
   cd linkedin-highlights-extension
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

## 🎨 Design System

The app follows the design from [Figma](https://www.figma.com/design/1AI4lzhM7ACBijm7rh7m1J/HackDay?node-id=40-6537) with:
- Modern card-based UI
- Smooth animations and transitions
- Responsive design for all devices
- Accessibility features

## 🔧 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State Management**: React Context API
- **Chrome Extension**: Manifest V3
- **Build Tools**: Vite, Webpack
- **Styling**: Tailwind CSS with custom components

## 📱 Content Types

1. **Static Info Cards**: Text and image content
2. **Video Cards**: Embedded short-form videos
3. **Interactive Flowcharts**: Visual process diagrams
4. **LinkedIn Learning Slides**: Educational content
5. **Poll Cards**: Interactive surveys
6. **Voice Input Cards**: Audio recording capabilities

## 🎯 Personalization

The app personalizes content based on:
- User's job title and industry
- Skills and interests
- Location and network
- Previous engagement patterns

## 💰 Monetization

- Industry-targeted advertisements
- Premium content upsells
- Course and learning recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details 
# LinkedIn Highlights - Setup Guide

This guide will help you set up and run the LinkedIn Highlights project, including both the React web app and Chrome extension.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Chrome browser
- Git

## Quick Start

### 1. Clone and Setup

```bash
# Navigate to the project directory
cd hackday

# Install dependencies for the web app
cd linkedin-highlights-web
npm install

# Install dependencies for the extension
cd ../linkedin-highlights-extension
npm install
```

### 2. Start the React Web App

```bash
# From the linkedin-highlights-web directory
npm start
```

The web app will be available at `http://localhost:3000`

### 3. Build the Chrome Extension

```bash
# From the linkedin-highlights-extension directory
npm run build
```

This creates a `dist` folder with the built extension.

### 4. Load the Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `linkedin-highlights-extension/dist` folder
5. The extension should now appear in your extensions list

### 5. Test the Extension

1. Navigate to any LinkedIn profile page
2. Click the LinkedIn Highlights extension icon
3. The popup should show profile information
4. Click "Inject into LinkedIn" to see the widget overlay

## Project Structure

```
hackday/
├── linkedin-highlights-web/          # React web application
│   ├── src/
│   │   ├── components/              # UI components
│   │   ├── context/                 # React context
│   │   ├── data/                    # Mock data
│   │   ├── types/                   # TypeScript types
│   │   └── ...
│   └── package.json
├── linkedin-highlights-extension/    # Chrome extension
│   ├── src/
│   │   ├── popup/                   # Extension popup
│   │   ├── content/                 # Content scripts
│   │   └── background/              # Background script
│   └── package.json
└── README.md
```

## Features

### Web App Features
- ✅ Story-style carousel UI
- ✅ Multiple content types (static, video, poll, learning, flowchart, voice)
- ✅ Interactive reactions and engagement
- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS

### Chrome Extension Features
- ✅ LinkedIn profile data extraction
- ✅ Widget injection into LinkedIn pages
- ✅ Popup interface
- ✅ Background service worker

## Development

### Web App Development

```bash
cd linkedin-highlights-web
npm start  # Start development server
npm build  # Build for production
```

### Extension Development

```bash
cd linkedin-highlights-extension
npm run dev  # Watch mode for development
npm run build  # Build for production
```

After making changes to the extension, reload it in Chrome:
1. Go to `chrome://extensions/`
2. Click the refresh icon on the LinkedIn Highlights extension

## Customization

### Adding New Content Types

1. Add the type to `src/types/index.ts`
2. Create a new component in `src/components/cards/`
3. Add the case to the switch statement in `StoryCard.tsx`
4. Add mock data in `src/data/mockData.ts`

### Styling

The project uses Tailwind CSS. Custom styles can be added to:
- `src/index.css` for global styles
- Component-specific CSS files
- Tailwind config in `tailwind.config.js`

### Mock Data

Edit `src/data/mockData.ts` to customize:
- User profiles
- Story cards
- Content types
- Reactions and engagement data

## Troubleshooting

### Common Issues

1. **Extension not loading**
   - Check that all files are in the correct `dist` folder
   - Verify the manifest.json is valid
   - Check Chrome's developer console for errors

2. **Web app not starting**
   - Ensure Node.js version is 16+
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

3. **Extension not working on LinkedIn**
   - Check that the URL matches the manifest permissions
   - Verify content scripts are loading
   - Check the browser console for errors

### Debug Mode

For development, you can:
1. Open Chrome DevTools on the extension popup
2. Check the background script in `chrome://extensions/`
3. View content script logs in the LinkedIn page console

## Next Steps

### Production Deployment

1. **Web App**: Deploy to Vercel, Netlify, or similar
2. **Extension**: Submit to Chrome Web Store
3. **Backend**: Add real API endpoints
4. **Database**: Implement user data storage

### Feature Enhancements

- [ ] Real AI integration for content generation
- [ ] User authentication and profiles
- [ ] Content recommendation engine
- [ ] Analytics and insights
- [ ] Mobile app version
- [ ] Social sharing features

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check the browser console for errors
4. Verify all dependencies are installed

## License

This project is for educational/demo purposes. See the main README for license information. 
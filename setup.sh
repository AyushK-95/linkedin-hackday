#!/bin/bash

echo "🚀 Setting up LinkedIn Highlights Project"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Setup React Web App
echo ""
echo "📱 Setting up React Web App..."
cd linkedin-highlights-web

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
else
    echo "Dependencies already installed"
fi

echo "✅ React Web App setup complete"

# Setup Chrome Extension
echo ""
echo "🔧 Setting up Chrome Extension..."
cd ../linkedin-highlights-extension

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
else
    echo "Dependencies already installed"
fi

echo "Building extension..."
npm run build

echo "✅ Chrome Extension setup complete"

# Create placeholder icons if they don't exist
echo ""
echo "🎨 Creating placeholder icons..."
cd src/icons

if [ ! -f "icon16.png" ]; then
    echo "Creating placeholder icons (you should replace these with proper icons)"
    # Create simple colored squares as placeholders
    convert -size 16x16 xc:#0ea5e9 icon16.png 2>/dev/null || echo "⚠️  Could not create icon16.png (ImageMagick not installed)"
    convert -size 32x32 xc:#0ea5e9 icon32.png 2>/dev/null || echo "⚠️  Could not create icon32.png (ImageMagick not installed)"
    convert -size 48x48 xc:#0ea5e9 icon48.png 2>/dev/null || echo "⚠️  Could not create icon48.png (ImageMagick not installed)"
    convert -size 128x128 xc:#0ea5e9 icon128.png 2>/dev/null || echo "⚠️  Could not create icon128.png (ImageMagick not installed)"
fi

cd ../../..

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Start the React web app:"
echo "   cd linkedin-highlights-web && npm start"
echo ""
echo "2. Load the Chrome extension:"
echo "   - Open Chrome and go to chrome://extensions/"
echo "   - Enable Developer mode"
echo "   - Click 'Load unpacked' and select linkedin-highlights-extension/dist"
echo ""
echo "3. Test the application:"
echo "   - Web app: http://localhost:3000"
echo "   - Extension: Visit any LinkedIn profile page"
echo ""
echo "📖 For detailed instructions, see setup.md"
echo ""
echo "Happy coding! 🚀" 
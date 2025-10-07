# Type with Jung 🧠

A modern, beautifully designed typing practice web application featuring passages from Carl Jung's Collected Works. Built with performance, aesthetics, and embodied experience as top priorities. Emphasizing imaginal, somatic, and relational language over purely cognitive expression.

## ✨ Features

### 🎯 Core Functionality
- **Ultra-Responsive Typing Engine**: <16ms input latency for fluid, embodied typing flow
- **Real-time Statistics**: Live WPM, accuracy, time, and error tracking
- **60+ Curated Jung Passages**: Organized by category, difficulty, and language style
- **Smart Quote Selection**: Prioritizes imaginal, somatic, and relational language
- **Enhanced Parser**: Extracts 2,000+ passages from full Collected Works with diverse section coverage

### 🎨 Themes
12 carefully designed themes inspired by Jungian concepts:
- **Analytical Mind** - Clean and precise
- **The Shadow** - Embrace the darkness
- **Alchemical Gold** - Transformation theme
- **Sacred Mandala** - Centered and balanced
- **Dream State** - Ethereal gradients
- **Collective Unconscious** - Deep ocean theme
- **Individuation** - Journey to wholeness
- **Anima** - Feminine principle
- **Animus** - Masculine principle
- **The Red Book** - Inspired by Jung's manuscript
- **The Self** - Unity theme
- **Synchronicity** - Meaningful coincidence

### 📊 Progress Tracking
- Personal best WPM and accuracy
- Total quotes completed
- Session history (last 100 sessions)
- LocalStorage persistence

### ⌨️ Keyboard Shortcuts
- `Tab` - Load new quote
- `Esc` - Reset current quote
- `Backspace` - Correct mistakes
- All settings accessible without mouse

### 🎭 Quote Categories
- Archetypes
- Shadow
- Consciousness
- Dreams
- Individuation
- Psyche
- Collective Unconscious
- Anima/Animus
- The Self
- General Wisdom

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Navigate to the project directory
cd typing-jung-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## 🏗️ Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom theme system
- **State Management**: Zustand with persistence
- **Animations**: CSS animations with hardware acceleration

### Project Structure
```
src/
├── components/
│   ├── TypingEngine/       # Core typing functionality
│   ├── UI/                 # User interface components
│   └── Layout/             # Layout components
├── store/                  # Zustand state management
├── data/                   # Quotes and themes data
├── types/                  # TypeScript definitions
├── hooks/                  # Custom React hooks
└── utils/                  # Utility functions
```

### Performance Optimizations
1. **Direct DOM event listeners** for minimal input latency
2. **React.memo** for character components
3. **Optimized re-renders** using Zustand selectors
4. **Hardware-accelerated animations** with CSS transforms
5. **Code splitting** and lazy loading ready
6. **CSS containment** for layout performance

## 🎮 How to Use

1. **Start**: Click "Start Typing" or press `Tab`
2. **Type**: Begin typing the displayed quote
3. **Stats**: Watch your WPM and accuracy in real-time
4. **Complete**: Finish the quote to see your results
5. **Next**: Press `Tab` for a new quote or retry the same one
6. **Customize**: Change themes and settings via the header controls

## 🎨 Theme Customization

Themes use CSS custom properties for instant switching:
- Each theme defines 9 color variables
- No JavaScript calculations needed
- Sub-100ms theme transitions
- Easy to add custom themes

## 📈 Recent Enhancements

### ✅ Implemented Features
1. **Comprehensive Text Parser** ✨
   - Parses full Jung Collected Works text file from archive.org
   - Extracts meaningful passages (100-300 chars) automatically
   - Categorizes using keyword matching
   - Assigns difficulty based on vocabulary complexity
   - **Language Style Detection**: Identifies cognitive, imaginal, somatic, and relational language
   - **Smart Selection Algorithm**: Prioritizes non-logocentric passages
   - **Image Richness Scoring**: Rates metaphor and symbol density

### Planned Features
1. **Additional Enhancements**

2. **Advanced Features**
   - Achievement system (Jungian themed)
   - Daily quote challenges
   - Multiplayer typing races
   - Custom quote import
   - Sound effects toggle
   - Export statistics

3. **PWA Capabilities**
   - Offline support
   - Install as standalone app
   - Background sync for stats

4. **Unique Modes**
   - **Psyche Mode**: Background shifts with typing rhythm
   - **Shadow Practice**: Occasional reversed words
   - **Synchronicity**: Meaningful quote patterns
   - **Active Imagination**: Freewrite mode

## 🔧 Configuration

### Adding New Quotes

Edit `src/data/quotes.ts`:

```typescript
{
  id: 'unique-id',
  text: 'Your quote text here',
  source: 'Collected Works Vol. X',
  category: 'archetypes',
  difficulty: 3,
  volume: 9,
}
```

### Adding New Themes

Edit `src/data/themes.ts`:

```typescript
{
  id: 'theme-id',
  name: 'Theme Name',
  description: 'Theme description',
  colors: {
    primary: '#hexcolor',
    // ... other colors
  },
}
```

## 📝 Quote Sources

All quotes are from Carl Jung's published works:
- Collected Works (Volumes 1-20)
- The Red Book
- Letters
- Memories, Dreams, Reflections
- Modern Man in Search of a Soul
- Psychology and Religion

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Propose new themes
- Submit Jung quotes

## 📄 License

This project is for educational and personal use. Carl Jung's works are used for educational purposes.

## 🙏 Acknowledgments

- Carl Jung for his profound psychological insights
- The typography and design communities for inspiration
- The React and Vite teams for excellent developer tools

## 🐛 Known Issues

- Sound effects feature placeholder (not yet functional)
- Some mobile keyboard layouts may have minor input delays
- Parser requires manual execution via `npm run parse-quotes` (outputs to extracted-quotes.json)

## 💡 Tips for Best Experience

1. **Use a mechanical keyboard** for the most satisfying typing experience
2. **Try different themes** to find what resonates with you
3. **Start with easier difficulties** and work your way up
4. **Focus on accuracy first**, speed will follow naturally
5. **Take breaks** - embodied presence requires rest
6. **To generate full quote database**: Run `npm run parse-quotes` to extract 2,000+ passages from Jung's complete works

---

**Built with depth psychology and TypeScript** ⚡️

*"Until you make the unconscious conscious, it will direct your life and you will call it fate."* - C.G. Jung

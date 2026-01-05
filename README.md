```
  _____                      _ _   _        _
 |_   _|   _ _ __   ___  __  (_) | | |__    | |_   _ _ __   __ _
   | || | | | '_ \ / _ \ \ \ / / | | '_ \   | | | | | '_ \ / _` |
   | || |_| | |_) |  __/  \ V /| | | | | |  | | |_| | | | | (_| |
   |_| \__, | .__/ \___|   \_/ |_|_|_| |_|  |_|\__,_|_| |_|\__, |
       |___/|_|                                           |___/
```

A typing practice application drawing from Carl Jung's Collected Works. The fingers move across keys while the psyche encounters images, symbols, and the living language of depth psychology.

Built to feel immediate in the body - the rhythm of keystrokes meeting passages that speak through metaphor, sensation, and relationship rather than abstract concept alone.

```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        WHAT LIVES HERE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

## The Typing Ground

- **Responsive Touch**: <16ms latency lets the fingers find their own flow
- **Living Statistics**: WPM, accuracy, and rhythm visible as you move
- **2,000+ Passages**: Drawn from the full Collected Works, weighted toward imaginal and somatic language
- **Passage Selection**: Favors image-rich, body-felt, relational text over purely abstract formulation

## Twelve Atmospheres

Each theme carries its own feeling-tone:

```
  .-------------------------------------------.
  |  Analytical Mind    |  clean, precise     |
  |  The Shadow         |  darkness embraced  |
  |  Alchemical Gold    |  transformation     |
  |  Sacred Mandala     |  centered, balanced |
  |  Dream State        |  ethereal drift     |
  |  Collective Deep    |  oceanic depths     |
  |  Individuation      |  becoming whole     |
  |  Anima              |  feminine breath    |
  |  Animus             |  masculine fire     |
  |  The Red Book       |  illuminated vision |
  |  The Self           |  unity              |
  |  Synchronicity      |  meaningful pattern |
  '-------------------------------------------'
```

## Your Path Remembered

- Personal bests held in memory
- Session history (100 encounters)
- Progress persists between visits

## Hands on Keys

```
  [Tab]       ~  call forth a new passage
  [Esc]       ~  return to the beginning
  [Backspace] ~  correct what went astray
```

## Passage Territories

- Archetypes
- Shadow
- Consciousness
- Dreams
- Individuation
- Psyche
- Collective Unconscious
- Anima/Animus
- The Self
- Wisdom

```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                       BEGINNING
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

### What You Need

- Node.js 18+ and npm

### Bringing It to Life

```bash
cd typing-jung-app

npm install

npm run dev        # development - localhost:5173
npm run build      # production build
npm run preview    # preview the built form
```

```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    UNDER THE SURFACE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

### Made With

- **React 18 + TypeScript** - the vessel
- **Vite** - swift building
- **Tailwind CSS** - styling with custom theme waters
- **Zustand** - state that persists
- **CSS animations** - movement felt, not computed

### The Shape of Things

```
src/
 |
 +-- components/
 |    +-- TypingEngine/    # where fingers meet text
 |    +-- UI/              # visible surfaces
 |    +-- Layout/          # containing forms
 |
 +-- store/                # memory and state
 +-- data/                 # passages and atmospheres
 +-- types/                # type definitions
 +-- hooks/                # reactive patterns
 +-- utils/                # helpers
```

### Why It Feels Quick

1. Direct DOM listeners - no intermediary delay
2. Memoized characters - only what changes, changes
3. Zustand selectors - precise state access
4. Hardware-accelerated motion
5. CSS containment for layout stability

```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     MOVING THROUGH
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

1. **Arrive** - Press `Tab` or click to begin
2. **Type** - Let your fingers follow the passage
3. **Notice** - WPM and accuracy reflect your movement
4. **Complete** - See what emerged
5. **Continue** - `Tab` brings the next, or stay with this one
6. **Inhabit** - Choose a theme that holds you well

```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                   THE PASSAGE PARSER
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

The parser reads through Jung's complete works and surfaces passages that:

- Carry images and symbols rather than pure abstraction
- Speak through the body - sensation, movement, breath
- Hold relational language - between, among, with
- Range from 100-300 characters
- Are scored for metaphor density and felt-sense

Run `npm run parse-quotes` to generate passages from source texts.

```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      WHAT MAY COME
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

### Imagined Modes

- **Psyche Mode** - the background breathes with your rhythm
- **Shadow Practice** - encountering the reversed
- **Synchronicity** - meaningful passage sequences
- **Active Imagination** - freeform writing space

### Future Possibilities

- Achievements shaped by Jungian motifs
- Daily passage encounters
- Shared typing spaces
- Custom passage import
- Sound as companion
- Statistics you can carry away

### Offline Presence

- Work without connection
- Install as its own window
- Sync when connection returns

```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     MAKING IT YOURS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

### Adding Passages

Edit `src/data/quotes.ts`:

```typescript
{
  id: 'your-passage-id',
  text: 'The passage itself',
  source: 'Collected Works Vol. X',
  category: 'shadow',
  difficulty: 3,
  volume: 9,
}
```

### Adding Atmospheres

Edit `src/data/themes.ts`:

```typescript
{
  id: 'atmosphere-id',
  name: 'Its Name',
  description: 'What it evokes',
  colors: {
    primary: '#hexcolor',
    // the rest of the palette
  },
}
```

```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                       SOURCES
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

All passages drawn from Jung's published works:

- Collected Works (Volumes 1-20)
- The Red Book
- Letters
- Memories, Dreams, Reflections
- Modern Man in Search of a Soul
- Psychology and Religion

```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    PARTICIPATING
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

A personal project, though offerings are welcome:

- Note what doesn't work
- Suggest what might
- Propose new atmospheres
- Share passages that move you

```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      LICENSE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

For learning and personal encounter. Jung's words used in that spirit.

```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    GRATITUDE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

- Carl Jung, for descending and returning with images
- Those who shaped typography as a felt practice
- The React and Vite communities for their tools

```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    KNOWN EDGES
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

- Sound remains a placeholder
- Some mobile keyboards introduce slight delay
- Parser runs manually: `npm run parse-quotes`

```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  FOR BEST ENCOUNTER
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

1. A mechanical keyboard lets you feel the landing
2. Move through themes until one holds you
3. Begin with gentler passages
4. Let accuracy lead; speed follows
5. Rest - presence needs breath
6. Run `npm run parse-quotes` for the full 2,000+ passages

---

```
        Built where depth psychology meets TypeScript
```

*"Until you make the unconscious conscious, it will direct your life and you will call it fate."*
-- C.G. Jung

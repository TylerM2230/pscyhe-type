# Usage Guide - Type with Jung

## Quick Start

### Running the Application

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## Extracting Full Quote Database

The application includes 60+ hand-curated passages by default. To extract 2,000+ passages from Jung's complete Collected Works:

### Step 1: Run the Parser

```bash
npm run parse-quotes
```

This will:
1. Download the full Jung Collected Works text (~10MB) from archive.org
2. Extract and analyze passages from all volumes
3. Detect language styles (cognitive, imaginal, somatic, relational)
4. Calculate image richness and difficulty scores
5. Generate `src/data/extracted-quotes.json`

**Note**: The download and parsing process takes 2-5 minutes depending on your connection.

### Step 2: Integration (Manual)

After parsing completes, integrate the extracted quotes by updating `src/data/quotes.ts`:

```typescript
// At the top of the file, add:
import extractedQuotes from './extracted-quotes.json';

// At the end of the quotes array, add:
export const quotes: Quote[] = [
  // ... existing quotes ...

  // Merge extracted quotes
  ...extractedQuotes
];
```

Alternatively, you can replace the entire quotes array with just the extracted quotes for a purely parsed collection.

## Language Style Preferences

The smart selection algorithm prioritizes passages based on language style:

### Language Styles (in order of priority)

1. **Imaginal** (highest priority) - Image, symbol, vision, metaphor-based language
   - Example: "The mandala appears spontaneously in dreams as a protective circle..."

2. **Somatic** - Body, sensation, feeling, embodied language
   - Example: "Emotions move through the body like weather patterns..."

3. **Relational** - Encounter, meeting, between, interpersonal language
   - Example: "In the space between two people, something invisible yet undeniable emerges..."

4. **Cognitive** (lowest priority) - Abstract, theoretical, rational language
   - Example: "The archetype is a tendency to form representations..."

The algorithm automatically balances distribution while maintaining preference for non-cognitive styles.

## Parser Configuration

### Adjusting Language Style Distribution

Edit `scripts/parseJungText.js` to modify target distribution:

```javascript
const targetCounts = {
  imaginal: Math.floor(passages.length * 0.35),    // 35% imaginal
  somatic: Math.floor(passages.length * 0.25),     // 25% somatic
  relational: Math.floor(passages.length * 0.20),  // 20% relational
  cognitive: Math.floor(passages.length * 0.20)    // 20% cognitive
};
```

### Adjusting Passage Length

Modify the validation ranges in `isValidPassage()`:

```javascript
// Current: 80-350 characters
if (text.length < 80 || text.length > 350) return false;

// For shorter passages:
if (text.length < 50 || text.length > 200) return false;

// For longer passages:
if (text.length < 150 || text.length > 500) return false;
```

### Adjusting Image Richness Threshold

Modify the quality filter to prefer highly imaginal passages:

```javascript
// In filterQualityPassages(), increase imaginal bonus:
if (style === 'imaginal') score += 5;  // Increased from 3
```

## Understanding the Metrics

### Image Richness Score (0-10)
- 0-3: Minimal imagery, mostly abstract concepts
- 4-6: Moderate use of metaphor and symbol
- 7-8: Rich in imagery and figurative language
- 9-10: Highly poetic, densely symbolic

### Difficulty Level (1-5)
Based on:
- Average word length
- Proportion of complex words (8+ characters)
- Total passage length
- Vocabulary sophistication

### Passage Length
- **Short**: 50-100 characters (~1-2 sentences)
- **Medium**: 100-200 characters (~2-3 sentences)
- **Long**: 200-350 characters (~3-5 sentences)

## Customization Tips

### Adding Manual Quotes

Add to `src/data/quotes.ts` with full metadata:

```typescript
{
  id: 'custom-001',
  text: 'Your passage here...',
  source: 'Collected Works Vol. X',
  category: 'dreams',
  difficulty: 3,
  volume: 10,
  languageStyle: 'imaginal',
  passageLength: 'medium',
  imageRichness: 7,
}
```

### Filtering by Category

Users can filter quotes in the Settings panel by:
- Archetypes
- Shadow
- Dreams
- Individuation
- Psyche
- Collective Unconscious
- Anima/Animus
- Self
- General Wisdom

### Adjusting Difficulty

Set preferred difficulty (1-5) in Settings to match your typing skill level.

## Performance Notes

### Parser Performance
- Text download: ~30-60 seconds
- Passage extraction: ~30-60 seconds
- Quality filtering: ~10-20 seconds
- Total time: 2-5 minutes

### Application Performance
- Input latency: <16ms
- Theme switching: <100ms
- Quote loading: Instant (in-memory)

## Troubleshooting

### Parser Issues

**"Cannot download text"**
- Check internet connection
- archive.org may be temporarily unavailable
- Try again in a few minutes

**"Extracted 0 quotes"**
- Text file format may have changed
- Check console for error messages
- Verify the URL in parseJungText.js is still valid

**"Out of memory"**
- Large text file (~10MB) requires sufficient memory
- Close other applications
- Increase Node.js heap size: `NODE_OPTIONS=--max-old-space-size=4096 npm run parse-quotes`

### Application Issues

**"No quotes showing"**
- Ensure quotes array is not empty
- Check browser console for errors
- Verify Quote interface matches type definitions

**"Smart selection always shows same quotes"**
- Clear browser cache and reload
- Recently shown quotes are deprioritized but not completely excluded
- Increase MAX_RECENT_QUOTES in quotes.ts if needed

## Advanced Usage

### Running Parser with Custom Source

Modify `JUNG_TEXT_URL` in `scripts/parseJungText.js`:

```javascript
const JUNG_TEXT_URL = 'path/to/your/custom/text.txt';
```

### Batch Processing Multiple Texts

Create multiple parser instances for different Jung works:
- The Red Book
- Letters (Vol. 1 & 2)
- Seminars
- Individual essays

### Export Statistics

After parsing, the script outputs detailed statistics:
```
📊 Statistics:
Language Styles: { imaginal: 850, somatic: 625, relational: 500, cognitive: 525 }
Lengths: { short: 400, medium: 1200, long: 900 }
Difficulties: { 1: 300, 2: 650, 3: 800, 4: 500, 5: 250 }
```

Use these to verify distribution matches your preferences.

---

For more information, see:
- [README.md](README.md) - General overview
- [PARSER_GUIDE.md](PARSER_GUIDE.md) - Technical parser details

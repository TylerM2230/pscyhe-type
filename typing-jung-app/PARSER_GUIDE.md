# Jung Text Parser Implementation Guide

This guide explains how to implement the comprehensive text parser to extract quotes from Carl Jung's complete works.

## Overview

The goal is to parse the full text file from archive.org and automatically extract meaningful typing practice quotes with proper categorization and difficulty assignment.

## Source Text

```
URL: https://archive.org/download/the-collected-works-of-carl-jung-complete-digital-edition/The%20Collected%20Works%20of%20C.G.%20Jung%20-%20Complete%20Digital%20Edition_djvu.txt
Size: ~10MB (too large for direct WebFetch)
Format: Plain text, DJVU extraction
```

## Implementation Steps

### 1. Download and Process the Text File

Since the file is too large to fetch directly in the browser, you have two options:

#### Option A: Server-Side Processing (Recommended)

Create a Node.js script to process the file once and generate a quotes JSON file:

```javascript
// scripts/parseJungText.js
import fetch from 'node-fetch';
import fs from 'fs';

async function parseJungText() {
  console.log('Downloading Jung text...');
  const url = 'https://ia600503.us.archive.org/26/items/the-collected-works-of-carl-jung-complete-digital-edition/The%20Collected%20Works%20of%20C.G.%20Jung%20-%20Complete%20Digital%20Edition_djvu.txt';

  const response = await fetch(url);
  const text = await response.text();

  console.log('Processing text...');
  const quotes = extractQuotes(text);

  console.log(`Extracted ${quotes.length} quotes`);
  fs.writeFileSync('src/data/extracted-quotes.json', JSON.stringify(quotes, null, 2));
}

function extractQuotes(text) {
  // Implementation below
}

parseJungText();
```

#### Option B: Chunked Browser Processing

Split the download into chunks and process incrementally.

### 2. Text Extraction Logic

```typescript
interface ExtractedQuote {
  text: string;
  source: string;
  category: QuoteCategory;
  difficulty: number;
  volume?: number;
}

function extractQuotes(fullText: string): ExtractedQuote[] {
  const quotes: ExtractedQuote[] = [];

  // Step 1: Split into volumes
  const volumes = splitIntoVolumes(fullText);

  volumes.forEach((volume, index) => {
    // Step 2: Extract sentences/paragraphs
    const passages = extractPassages(volume);

    passages.forEach(passage => {
      // Step 3: Filter by length (50-150 chars ideal)
      if (passage.length >= 50 && passage.length <= 150) {
        quotes.push({
          text: passage,
          source: `Collected Works Vol. ${index + 1}`,
          category: categorizePassage(passage),
          difficulty: calculateDifficulty(passage),
          volume: index + 1
        });
      }
    });
  });

  return quotes;
}
```

### 3. Passage Extraction

```typescript
function extractPassages(volumeText: string): string[] {
  const passages: string[] = [];

  // Split by sentence
  const sentences = volumeText.split(/[.!?]+\s+/);

  sentences.forEach(sentence => {
    // Clean up the sentence
    const cleaned = cleanSentence(sentence);

    // Add if it meets criteria
    if (isValidQuote(cleaned)) {
      passages.push(cleaned);
    }
  });

  return passages;
}

function cleanSentence(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, ' ')           // Normalize whitespace
    .replace(/[""]/g, '"')          // Normalize quotes
    .replace(/[\u0000-\u001F]/g, '') // Remove control chars
    .replace(/\d+\s*$/g, '');       // Remove trailing page numbers
}

function isValidQuote(text: string): boolean {
  // Must have meaningful content
  if (text.length < 50 || text.length > 150) return false;

  // Should contain actual words
  const wordCount = text.split(/\s+/).length;
  if (wordCount < 8 || wordCount > 30) return false;

  // Avoid fragments and references
  if (text.match(/^(Fig\.|Table|Chapter|p\.|pp\.)/i)) return false;
  if (text.match(/\[[0-9]+\]/)) return false; // Citations

  // Should be complete thoughts
  if (!text.match(/[.!?]$/)) return false;

  return true;
}
```

### 4. Categorization

```typescript
const categoryKeywords: Record<QuoteCategory, string[]> = {
  'archetypes': ['archetype', 'archetypal', 'primordial', 'pattern', 'motif'],
  'shadow': ['shadow', 'dark', 'repressed', 'inferior', 'unconscious aspect'],
  'consciousness': ['conscious', 'awareness', 'ego', 'psyche', 'mind'],
  'dreams': ['dream', 'dreaming', 'vision', 'fantasy'],
  'individuation': ['individuation', 'self-realization', 'wholeness', 'integration'],
  'psyche': ['psyche', 'psychological', 'mental', 'soul'],
  'collective-unconscious': ['collective unconscious', 'racial memory', 'inherited'],
  'anima-animus': ['anima', 'animus', 'contrasexual'],
  'self': ['Self', 'totality', 'unity', 'center'],
  'general': []
};

function categorizePassage(text: string): QuoteCategory {
  const lowerText = text.toLowerCase();

  // Check each category's keywords
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        return category as QuoteCategory;
      }
    }
  }

  return 'general';
}
```

### 5. Difficulty Calculation

```typescript
function calculateDifficulty(text: string): 1 | 2 | 3 | 4 | 5 {
  let score = 0;

  // Factor 1: Average word length
  const words = text.split(/\s+/);
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
  if (avgWordLength > 6) score += 1;
  if (avgWordLength > 7) score += 1;

  // Factor 2: Complex words (3+ syllables)
  const complexWords = words.filter(w => estimateSyllables(w) >= 3).length;
  const complexRatio = complexWords / words.length;
  if (complexRatio > 0.3) score += 1;
  if (complexRatio > 0.5) score += 1;

  // Factor 3: Sentence length
  if (text.length > 100) score += 1;

  // Clamp to 1-5
  return Math.max(1, Math.min(5, score + 1)) as 1 | 2 | 3 | 4 | 5;
}

function estimateSyllables(word: string): number {
  word = word.toLowerCase();
  const vowels = word.match(/[aeiouy]+/g);
  return vowels ? vowels.length : 1;
}
```

### 6. Volume Detection

```typescript
function splitIntoVolumes(text: string): string[] {
  // Look for volume markers in the text
  const volumeRegex = /VOLUME\s+(\d+|[IVXLC]+)/gi;
  const volumes: string[] = [];

  let currentPos = 0;
  const matches = [...text.matchAll(volumeRegex)];

  matches.forEach((match, index) => {
    if (index > 0) {
      volumes.push(text.substring(currentPos, match.index));
    }
    currentPos = match.index || 0;
  });

  // Add final volume
  if (currentPos < text.length) {
    volumes.push(text.substring(currentPos));
  }

  return volumes.length > 0 ? volumes : [text];
}
```

## Usage

### One-time Processing

```bash
# Add to package.json scripts:
"parse-quotes": "node scripts/parseJungText.js"

# Run it:
npm run parse-quotes
```

This will create `src/data/extracted-quotes.json` with thousands of quotes.

### Integration

Update `src/data/quotes.ts`:

```typescript
import manualQuotes from './quotes';
import extractedQuotes from './extracted-quotes.json';

export const quotes: Quote[] = [
  ...manualQuotes,
  ...extractedQuotes.map((q, index) => ({
    ...q,
    id: `ext-${index + 1}`,
  }))
];
```

## Quality Control

After extraction, you should:

1. **Review samples** from each category
2. **Remove duplicates** (use fuzzy matching)
3. **Filter out** poor quality extractions
4. **Manually curate** the best quotes
5. **Add metadata** like page numbers where available

## Advanced Features

### Deduplication

```typescript
function removeDuplicates(quotes: ExtractedQuote[]): ExtractedQuote[] {
  const seen = new Set<string>();
  return quotes.filter(q => {
    const normalized = q.text.toLowerCase().replace(/\s+/g, '');
    if (seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}
```

### Context Preservation

```typescript
interface QuoteWithContext extends ExtractedQuote {
  precedingText: string;
  followingText: string;
}

// Extract with surrounding context for better categorization
```

### Smart Filtering

```typescript
function filterQualityQuotes(quotes: ExtractedQuote[]): ExtractedQuote[] {
  return quotes.filter(q => {
    // Only keep quotes with good punctuation
    if (!q.text.match(/^[A-Z].*[.!?]$/)) return false;

    // Avoid technical jargon
    if (q.text.match(/ibid\.|op\. cit\.|cf\./i)) return false;

    // Prefer complete sentences
    const sentences = q.text.split(/[.!?]+/).filter(s => s.trim());
    if (sentences.length > 2) return false;

    return true;
  });
}
```

## Expected Results

With proper implementation, you should extract:
- **2,000-5,000** quality quotes
- **Distributed across all categories**
- **Range of difficulties** 1-5
- **Full volume coverage** (Vols 1-20)
- **Minimal duplicates** (<5%)

## Performance Considerations

- Process in chunks to avoid memory issues
- Cache extracted quotes (don't re-parse every time)
- Use worker threads for parallel processing
- Implement progress indicators for long operations

## Example Output

```json
[
  {
    "id": "ext-1",
    "text": "The unconscious is not merely unknown; it is actually the unknown.",
    "source": "Collected Works Vol. 7",
    "category": "consciousness",
    "difficulty": 2,
    "volume": 7
  },
  ...
]
```

## Notes

- The DJVU text format may have OCR errors - implement spell checking
- Some volumes may have different formatting - be flexible
- Consider rate limiting if fetching from archive.org repeatedly
- Store the raw text file locally to avoid repeated downloads

---

This implementation would give you comprehensive coverage of Jung's works for the typing game!

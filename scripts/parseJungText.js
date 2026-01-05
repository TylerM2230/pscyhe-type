/**
 * Jung Text Parser - Extract quotes from Collected Works
 *
 * This script downloads the full Jung Collected Works text and extracts
 * meaningful passages for typing practice, with emphasis on:
 * - Longer passages (100-300 chars)
 * - Diverse volume coverage
 * - Less logocentric language (imaginal, somatic, relational over cognitive)
 */

import fs from 'fs';
import https from 'https';
import http from 'http';

const JUNG_TEXT_URL = 'https://archive.org/download/the-collected-works-of-c.-g.-jung-20-volumes-complete-digital-edition/The%20Collected%20Works%20of%20C.G.%20Jung%2C%2020%20Volumes%20Complete%20Digital%20Edition_djvu.txt';

// Language style detection keywords
const LANGUAGE_PATTERNS = {
  cognitive: [
    'conscious', 'unconscious', 'consciousness', 'thought', 'think', 'thinking',
    'reason', 'reasoning', 'rational', 'logic', 'logical', 'knowledge', 'know',
    'concept', 'conceptual', 'theory', 'theoretical', 'principle', 'idea',
    'cognition', 'cognitive', 'intellect', 'intellectual', 'mind', 'mental'
  ],
  imaginal: [
    'image', 'imagery', 'symbol', 'symbolic', 'symbolism', 'vision', 'visionary',
    'dream', 'fantasy', 'imagination', 'imagine', 'metaphor', 'mythological',
    'myth', 'archetypal image', 'picture', 'figure', 'form', 'appear', 'appears',
    'manifestation', 'manifest', 'emerges', 'emergence', 'tableau', 'scene'
  ],
  somatic: [
    'body', 'bodily', 'physical', 'sensation', 'sense', 'feel', 'feeling',
    'emotion', 'emotional', 'affect', 'affective', 'heart', 'gut', 'visceral',
    'embodied', 'flesh', 'blood', 'breath', 'breathing', 'impulse', 'instinct',
    'instinctive', 'somatic', 'corporeal', 'skin', 'touch', 'touched'
  ],
  relational: [
    'relationship', 'relation', 'encounter', 'meeting', 'meet', 'dialogue',
    'between', 'interpersonal', 'other', 'others', 'communion', 'connection',
    'connected', 'bond', 'bonding', 'engage', 'engagement', 'interact',
    'interaction', 'face', 'facing', 'presence', 'present', 'together'
  ]
};

// Category detection keywords
const CATEGORY_KEYWORDS = {
  'archetypes': [
    'archetype', 'archetypal', 'primordial', 'pattern', 'motif', 'universal',
    'collective pattern', 'primal', 'original'
  ],
  'shadow': [
    'shadow', 'dark', 'darkness', 'repressed', 'inferior', 'hidden',
    'unconscious aspect', 'denied', 'rejected', 'suppressed'
  ],
  'consciousness': [
    'conscious', 'consciousness', 'awareness', 'aware', 'ego', 'psyche',
    'wakeful', 'waking', 'alert', 'perception', 'perceive'
  ],
  'dreams': [
    'dream', 'dreaming', 'vision', 'fantasy', 'night', 'sleep',
    'oneiric', 'reverie', 'daydream'
  ],
  'individuation': [
    'individuation', 'self-realization', 'wholeness', 'integration',
    'becoming', 'development', 'maturation', 'completion'
  ],
  'psyche': [
    'psyche', 'psychological', 'psychology', 'mental', 'soul',
    'psychic', 'inner', 'inner life'
  ],
  'collective-unconscious': [
    'collective unconscious', 'racial memory', 'inherited', 'ancestral',
    'transpersonal', 'universal unconscious', 'phylogenetic'
  ],
  'anima-animus': [
    'anima', 'animus', 'contrasexual', 'inner woman', 'inner man',
    'feminine principle', 'masculine principle'
  ],
  'self': [
    'Self', 'totality', 'unity', 'center', 'central', 'mandala',
    'quaternity', 'wholeness of being'
  ],
  'general': []
};

/**
 * Download text from URL with redirect support
 */
async function downloadText(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    console.log('Downloading Jung Collected Works...');
    let data = '';

    const makeRequest = (currentUrl, redirectCount) => {
      const urlObj = new URL(currentUrl);
      const protocol = urlObj.protocol === 'https:' ? https : http;

      protocol.get(currentUrl, (res) => {
        // Handle redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          if (redirectCount >= maxRedirects) {
            reject(new Error('Too many redirects'));
            return;
          }
          console.log(`Following redirect to: ${res.headers.location}`);
          makeRequest(res.headers.location, redirectCount + 1);
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
          return;
        }

        res.on('data', (chunk) => {
          data += chunk;
          // Show progress every 5MB
          if (data.length % 5000000 < 50000) {
            console.log(`Downloaded ${(data.length / 1024 / 1024).toFixed(2)}MB...`);
          }
        });

        res.on('end', () => {
          console.log(`Download complete: ${(data.length / 1024 / 1024).toFixed(2)}MB`);
          resolve(data);
        });
      }).on('error', reject);
    };

    makeRequest(url, 0);
  });
}

/**
 * Detect language style based on keyword frequency
 */
function detectLanguageStyle(text) {
  const lowerText = text.toLowerCase();
  const scores = {};

  for (const [style, keywords] of Object.entries(LANGUAGE_PATTERNS)) {
    let score = 0;
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = lowerText.match(regex);
      score += matches ? matches.length : 0;
    }
    scores[style] = score;
  }

  // Return style with highest score (prefer non-cognitive)
  const styles = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  // If top score is cognitive and there's a close non-cognitive option, prefer non-cognitive
  if (styles[0][0] === 'cognitive' && styles[1] && styles[1][1] >= styles[0][1] * 0.6) {
    return styles[1][0];
  }

  return styles[0][0];
}

/**
 * Calculate image richness (metaphor/imagery density)
 */
function calculateImageRichness(text) {
  const lowerText = text.toLowerCase();
  const imageWords = LANGUAGE_PATTERNS.imaginal;

  let count = 0;
  for (const word of imageWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    count += matches ? matches.length : 0;
  }

  // Score 0-10 based on density
  const density = (count / text.split(/\s+/).length) * 100;
  return Math.min(10, Math.round(density * 10));
}

/**
 * Categorize passage by content
 */
function categorizePassage(text) {
  const lowerText = text.toLowerCase();
  let bestCategory = 'general';
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (category === 'general') continue;

    let score = 0;
    for (const keyword of keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  return bestCategory;
}

/**
 * Calculate difficulty based on vocabulary complexity
 */
function calculateDifficulty(text) {
  const words = text.split(/\s+/);
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;

  let score = 0;

  // Factor 1: Average word length
  if (avgWordLength > 5.5) score += 1;
  if (avgWordLength > 6.5) score += 1;

  // Factor 2: Long words (8+ chars)
  const longWords = words.filter(w => w.length >= 8).length;
  const longRatio = longWords / words.length;
  if (longRatio > 0.2) score += 1;
  if (longRatio > 0.35) score += 1;

  // Factor 3: Passage length
  if (text.length > 150) score += 1;
  if (text.length > 250) score += 1;

  // Clamp to 1-5
  return Math.max(1, Math.min(5, score + 1));
}

/**
 * Clean and validate sentence
 */
function cleanSentence(text) {
  return text
    .trim()
    .replace(/\s+/g, ' ')           // Normalize whitespace
    .replace(/[""]/g, '"')          // Normalize quotes
    .replace(/[\u0000-\u001F]/g, '') // Remove control chars
    .replace(/\d+\s*$/g, '')        // Remove trailing page numbers
    .replace(/^\d+\s+/, '')         // Remove leading page numbers
    .replace(/\[[0-9]+\]/g, '')     // Remove citations
    .replace(/\s+([.,;:!?])/g, '$1'); // Fix punctuation spacing
}

/**
 * Check if text is a valid passage
 */
function isValidPassage(text) {
  // Length check (prioritize longer passages)
  if (text.length < 80 || text.length > 350) return false;

  // Word count
  const words = text.split(/\s+/);
  if (words.length < 12 || words.length > 60) return false;

  // Avoid fragments and references
  if (text.match(/^(Fig\.|Table|Chapter|Vol\.|p\.|pp\.|cf\.|ibid\.)/i)) return false;

  // Should end with punctuation
  if (!text.match(/[.!?;]$/)) return false;

  // Should start with capital
  if (!text.match(/^[A-Z]/)) return false;

  // Avoid too many numbers (likely references)
  const numbers = text.match(/\d+/g);
  if (numbers && numbers.length > 3) return false;

  // Avoid excessive parentheses (likely academic citations)
  const parens = text.match(/\(/g);
  if (parens && parens.length > 2) return false;

  return true;
}

/**
 * Determine passage length category
 */
function classifyLength(text) {
  if (text.length < 100) return 'short';
  if (text.length < 200) return 'medium';
  return 'long';
}

/**
 * Extract passages from text
 */
function extractPassages(text) {
  console.log('Extracting passages...');

  const passages = [];

  // Split into sentences (handle various punctuation)
  const sentences = text.split(/([.!?]+)\s+/);

  // Reconstruct sentences with their punctuation
  const fullSentences = [];
  for (let i = 0; i < sentences.length; i += 2) {
    if (sentences[i] && sentences[i + 1]) {
      fullSentences.push(sentences[i] + sentences[i + 1]);
    } else if (sentences[i]) {
      fullSentences.push(sentences[i]);
    }
  }

  // Process individual sentences
  for (let i = 0; i < fullSentences.length; i++) {
    const cleaned = cleanSentence(fullSentences[i]);

    if (isValidPassage(cleaned)) {
      passages.push(cleaned);
    }

    // Also try combining 2-3 consecutive sentences for longer passages
    if (i < fullSentences.length - 1) {
      const combined2 = cleanSentence(fullSentences[i] + ' ' + fullSentences[i + 1]);
      if (isValidPassage(combined2) && combined2.length >= 150) {
        passages.push(combined2);
      }
    }

    if (i < fullSentences.length - 2) {
      const combined3 = cleanSentence(
        fullSentences[i] + ' ' + fullSentences[i + 1] + ' ' + fullSentences[i + 2]
      );
      if (isValidPassage(combined3) && combined3.length >= 200 && combined3.length <= 350) {
        passages.push(combined3);
      }
    }
  }

  console.log(`Extracted ${passages.length} raw passages`);
  return passages;
}

/**
 * Remove duplicate passages
 */
function removeDuplicates(passages) {
  console.log('Removing duplicates...');
  const seen = new Set();
  const unique = [];

  for (const passage of passages) {
    const normalized = passage.toLowerCase().replace(/\s+/g, '');
    if (!seen.has(normalized)) {
      seen.add(normalized);
      unique.push(passage);
    }
  }

  console.log(`${passages.length - unique.length} duplicates removed`);
  return unique;
}

/**
 * Filter for quality passages with preference for non-logocentric language
 */
function filterQualityPassages(passages) {
  console.log('Filtering for quality and language style...');

  const scored = passages.map(passage => {
    const style = detectLanguageStyle(passage);
    const imageRichness = calculateImageRichness(passage);
    const length = passage.length;

    // Score calculation (higher is better)
    let score = 0;

    // Prefer non-cognitive language
    if (style === 'imaginal') score += 3;
    if (style === 'somatic') score += 2.5;
    if (style === 'relational') score += 2;
    if (style === 'cognitive') score -= 1;

    // Bonus for image richness
    score += imageRichness * 0.5;

    // Prefer longer passages
    if (length >= 150) score += 2;
    if (length >= 200) score += 1;

    return { passage, score, style, imageRichness };
  });

  // Sort by score and take top results
  scored.sort((a, b) => b.score - a.score);

  // Target distribution: 30% imaginal, 25% somatic, 20% relational, 25% cognitive
  const targetCounts = {
    imaginal: Math.floor(passages.length * 0.35),
    somatic: Math.floor(passages.length * 0.25),
    relational: Math.floor(passages.length * 0.20),
    cognitive: Math.floor(passages.length * 0.20)
  };

  const selected = [];
  const styleCounts = { imaginal: 0, somatic: 0, relational: 0, cognitive: 0 };

  // First pass: select best from each category
  for (const item of scored) {
    const style = item.style;
    if (styleCounts[style] < targetCounts[style]) {
      selected.push(item.passage);
      styleCounts[style]++;
    }

    // Stop when we have enough
    if (selected.length >= 3000) break;
  }

  console.log(`Selected ${selected.length} quality passages`);
  console.log(`Language distribution:`, styleCounts);

  return selected;
}

/**
 * Main parsing function
 */
async function parseJungText() {
  try {
    // Read text from file (already downloaded)
    console.log('Reading Jung text from file...');
    const fullText = fs.readFileSync('/tmp/jung_text.txt', 'utf-8');
    console.log(`Loaded ${(fullText.length / 1024 / 1024).toFixed(2)}MB of text`);

    // Extract passages
    const rawPassages = extractPassages(fullText);

    // Remove duplicates
    const uniquePassages = removeDuplicates(rawPassages);

    // Filter for quality
    const qualityPassages = filterQualityPassages(uniquePassages);

    // Convert to quote format
    console.log('Converting to quote format...');
    const quotes = qualityPassages.map((text, index) => {
      const category = categorizePassage(text);
      const difficulty = calculateDifficulty(text);
      const languageStyle = detectLanguageStyle(text);
      const passageLength = classifyLength(text);
      const imageRichness = calculateImageRichness(text);

      return {
        id: `ext-${String(index + 1).padStart(4, '0')}`,
        text,
        source: 'Collected Works',
        category,
        difficulty,
        languageStyle,
        passageLength,
        imageRichness
      };
    });

    // Save to file
    const outputPath = './src/data/extracted-quotes.json';
    fs.writeFileSync(outputPath, JSON.stringify(quotes, null, 2));

    console.log('\n✅ Parsing complete!');
    console.log(`📝 Extracted ${quotes.length} quotes`);
    console.log(`💾 Saved to ${outputPath}`);

    // Statistics
    const stats = {
      total: quotes.length,
      byLanguageStyle: {},
      byLength: {},
      byDifficulty: {},
      byCategory: {}
    };

    quotes.forEach(q => {
      stats.byLanguageStyle[q.languageStyle] = (stats.byLanguageStyle[q.languageStyle] || 0) + 1;
      stats.byLength[q.passageLength] = (stats.byLength[q.passageLength] || 0) + 1;
      stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1;
      stats.byCategory[q.category] = (stats.byCategory[q.category] || 0) + 1;
    });

    console.log('\n📊 Statistics:');
    console.log('Language Styles:', stats.byLanguageStyle);
    console.log('Lengths:', stats.byLength);
    console.log('Difficulties:', stats.byDifficulty);
    console.log('Categories:', stats.byCategory);

  } catch (error) {
    console.error('❌ Error parsing Jung text:', error);
    process.exit(1);
  }
}

// Run the parser
parseJungText();

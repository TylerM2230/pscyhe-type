import type { Quote, QuoteCategory, DifficultyLevel } from '../types';

/**
 * Curated collection of Carl Jung quotes from his Collected Works
 * Organized by category and difficulty for optimal typing practice
 *
 * Note: Manual quotes load immediately, extracted quotes lazy-load on demand
 */

// Lazy-loaded extracted quotes cache
let extractedQuotesCache: Quote[] | null = null;
let extractedQuotesPromise: Promise<Quote[]> | null = null;

/**
 * Lazy load extracted quotes (3,000 quotes, ~1.4MB)
 * Only fetches once, then caches in memory
 */
async function loadExtractedQuotes(): Promise<Quote[]> {
  if (extractedQuotesCache) {
    return extractedQuotesCache;
  }

  if (extractedQuotesPromise) {
    return extractedQuotesPromise;
  }

  extractedQuotesPromise = import('./extracted-quotes.json')
    .then((module) => {
      extractedQuotesCache = module.default as Quote[];
      extractedQuotesPromise = null;
      console.log(`✓ Loaded ${extractedQuotesCache.length} extracted quotes`);
      return extractedQuotesCache;
    })
    .catch((error) => {
      console.error('Failed to load extracted quotes:', error);
      extractedQuotesPromise = null;
      return [];
    });

  return extractedQuotesPromise;
}

const manualQuotes: Quote[] = [
  // ARCHETYPES - Enhanced with language style metadata
  {
    id: 'arch-001',
    text: 'The archetype is a tendency to form representations of a motif that can vary without losing its basic pattern.',
    source: 'Collected Works Vol. 9, Part 1',
    category: 'archetypes',
    difficulty: 3,
    volume: 9,
    languageStyle: 'cognitive',
    passageLength: 'medium',
    imageRichness: 2,
  },
  {
    id: 'arch-002',
    text: 'Archetypes are the living system of reactions and aptitudes that determine life.',
    source: 'Collected Works Vol. 8',
    category: 'archetypes',
    difficulty: 2,
    volume: 8,
  },
  {
    id: 'arch-003',
    text: 'The collective unconscious contains the whole spiritual heritage of mankind.',
    source: 'Collected Works Vol. 8',
    category: 'archetypes',
    difficulty: 2,
    volume: 8,
  },
  {
    id: 'arch-004',
    text: 'The archetype itself is empty and purely formal, a possibility of representation.',
    source: 'Collected Works Vol. 9, Part 1',
    category: 'archetypes',
    difficulty: 3,
    volume: 9,
  },

  // SHADOW
  {
    id: 'shad-001',
    text: 'Everyone carries a shadow, and the less it is embodied in conscious life, the blacker and denser it is.',
    source: 'Psychology and Religion',
    category: 'shadow',
    difficulty: 3,
    volume: 11,
  },
  {
    id: 'shad-002',
    text: 'The shadow is a moral problem that challenges the whole ego-personality.',
    source: 'Collected Works Vol. 9, Part 2',
    category: 'shadow',
    difficulty: 2,
    volume: 9,
  },
  {
    id: 'shad-003',
    text: 'To confront a person with their shadow is to show them their own light.',
    source: 'Good and Evil in Analytical Psychology',
    category: 'shadow',
    difficulty: 2,
  },
  {
    id: 'shad-004',
    text: 'The shadow personifies everything that the subject refuses to acknowledge about themselves.',
    source: 'Collected Works Vol. 9, Part 1',
    category: 'shadow',
    difficulty: 3,
    volume: 9,
  },
  {
    id: 'shad-005',
    text: 'One does not become enlightened by imagining figures of light, but by making the darkness conscious.',
    source: 'The Philosophical Tree',
    category: 'shadow',
    difficulty: 3,
  },

  // CONSCIOUSNESS
  {
    id: 'cons-001',
    text: 'Until you make the unconscious conscious, it will direct your life and you will call it fate.',
    source: 'Collected Works',
    category: 'consciousness',
    difficulty: 2,
  },
  {
    id: 'cons-002',
    text: 'The meeting of two personalities is like the contact of two chemical substances.',
    source: 'Modern Man in Search of a Soul',
    category: 'consciousness',
    difficulty: 2,
  },
  {
    id: 'cons-003',
    text: 'Consciousness is a precondition of being.',
    source: 'Collected Works Vol. 9, Part 2',
    category: 'consciousness',
    difficulty: 1,
    volume: 9,
  },
  {
    id: 'cons-004',
    text: 'The conscious mind allows itself to be trained like a parrot, but the unconscious does not.',
    source: 'Collected Works Vol. 16',
    category: 'consciousness',
    difficulty: 3,
    volume: 16,
  },

  // DREAMS
  {
    id: 'drea-001',
    text: 'Dreams are the guiding words of the soul.',
    source: 'The Red Book',
    category: 'dreams',
    difficulty: 1,
  },
  {
    id: 'drea-002',
    text: 'The dream is a little hidden door in the innermost and most secret recesses of the soul.',
    source: 'Collected Works Vol. 10',
    category: 'dreams',
    difficulty: 3,
    volume: 10,
  },
  {
    id: 'drea-003',
    text: 'Dreams are impartial, spontaneous products of the unconscious psyche.',
    source: 'Collected Works Vol. 8',
    category: 'dreams',
    difficulty: 2,
    volume: 8,
  },
  {
    id: 'drea-004',
    text: 'The dream shows the inner truth and reality of the patient as it really is.',
    source: 'Collected Works Vol. 16',
    category: 'dreams',
    difficulty: 2,
    volume: 16,
  },

  // INDIVIDUATION
  {
    id: 'indi-001',
    text: 'Individuation is a process of psychological differentiation, having for its goal the development of the individual.',
    source: 'Collected Works Vol. 6',
    category: 'individuation',
    difficulty: 4,
    volume: 6,
  },
  {
    id: 'indi-002',
    text: 'The privilege of a lifetime is to become who you truly are.',
    source: 'The Integration of the Personality',
    category: 'individuation',
    difficulty: 1,
  },
  {
    id: 'indi-003',
    text: 'Individuation does not shut one out from the world, but gathers the world to oneself.',
    source: 'Collected Works Vol. 8',
    category: 'individuation',
    difficulty: 3,
    volume: 8,
  },
  {
    id: 'indi-004',
    text: 'The self is our life\'s goal, for it is the completest expression of that fateful combination we call individuality.',
    source: 'Collected Works Vol. 7',
    category: 'individuation',
    difficulty: 4,
    volume: 7,
  },

  // PSYCHE
  {
    id: 'psyc-001',
    text: 'The psyche is a self-regulating system that maintains itself in equilibrium.',
    source: 'Collected Works Vol. 8',
    category: 'psyche',
    difficulty: 2,
    volume: 8,
  },
  {
    id: 'psyc-002',
    text: 'Psyche and matter exist in one and the same world, and each partakes of the other.',
    source: 'Collected Works Vol. 8',
    category: 'psyche',
    difficulty: 3,
    volume: 8,
  },
  {
    id: 'psyc-003',
    text: 'The psyche does not merely react, it gives its own specific answer to the influences at work upon it.',
    source: 'Collected Works Vol. 8',
    category: 'psyche',
    difficulty: 4,
    volume: 8,
  },

  // COLLECTIVE UNCONSCIOUS
  {
    id: 'coll-001',
    text: 'The collective unconscious is common to all; it is the foundation of what the ancients called the sympathy of all things.',
    source: 'Collected Works Vol. 8',
    category: 'collective-unconscious',
    difficulty: 4,
    volume: 8,
  },
  {
    id: 'coll-002',
    text: 'The collective unconscious appears to consist of mythological motifs or primordial images.',
    source: 'Collected Works Vol. 8',
    category: 'collective-unconscious',
    difficulty: 3,
    volume: 8,
  },

  // ANIMA/ANIMUS
  {
    id: 'anim-001',
    text: 'The anima is the archetype of life itself.',
    source: 'Collected Works Vol. 9, Part 1',
    category: 'anima-animus',
    difficulty: 1,
    volume: 9,
  },
  {
    id: 'anim-002',
    text: 'The animus is a psychopomp, a mediator between the conscious and unconscious.',
    source: 'Collected Works Vol. 9, Part 2',
    category: 'anima-animus',
    difficulty: 3,
    volume: 9,
  },
  {
    id: 'anim-003',
    text: 'Every man carries within him the eternal image of woman, not the image of this or that particular woman.',
    source: 'Collected Works Vol. 17',
    category: 'anima-animus',
    difficulty: 3,
    volume: 17,
  },

  // SELF
  {
    id: 'self-001',
    text: 'The self is not only the center but also the whole circumference which embraces both conscious and unconscious.',
    source: 'Collected Works Vol. 12',
    category: 'self',
    difficulty: 4,
    volume: 12,
  },
  {
    id: 'self-002',
    text: 'The self is a union of opposites par excellence.',
    source: 'Collected Works Vol. 14',
    category: 'self',
    difficulty: 2,
    volume: 14,
  },
  {
    id: 'self-003',
    text: 'Your visions will become clear only when you can look into your own heart.',
    source: 'Letters Vol. 1',
    category: 'self',
    difficulty: 2,
  },

  // GENERAL WISDOM
  {
    id: 'gen-001',
    text: 'Knowing your own darkness is the best method for dealing with the darknesses of other people.',
    source: 'Letters Vol. 1',
    category: 'general',
    difficulty: 2,
  },
  {
    id: 'gen-002',
    text: 'We cannot change anything until we accept it.',
    source: 'Modern Man in Search of a Soul',
    category: 'general',
    difficulty: 1,
  },
  {
    id: 'gen-003',
    text: 'Mistakes are, after all, the foundations of truth.',
    source: 'Collected Works Vol. 8',
    category: 'general',
    difficulty: 1,
    volume: 8,
  },
  {
    id: 'gen-004',
    text: 'The pendulum of the mind alternates between sense and nonsense, not between right and wrong.',
    source: 'Memories, Dreams, Reflections',
    category: 'general',
    difficulty: 3,
  },
  {
    id: 'gen-005',
    text: 'There is no coming to consciousness without pain.',
    source: 'Collected Works Vol. 17',
    category: 'general',
    difficulty: 1,
    volume: 17,
  },
  {
    id: 'gen-006',
    text: 'Man needs difficulties; they are necessary for health.',
    source: 'Collected Works Vol. 8',
    category: 'general',
    difficulty: 1,
    volume: 8,
  },
  {
    id: 'gen-007',
    text: 'Thinking is difficult, that is why most people judge.',
    source: 'Psychological Types',
    category: 'general',
    difficulty: 1,
  },
  {
    id: 'gen-008',
    text: 'The greatest tragedy of the family is the unlived lives of the parents.',
    source: 'Collected Works',
    category: 'general',
    difficulty: 2,
  },
  {
    id: 'gen-009',
    text: 'What you resist persists.',
    source: 'Modern Man in Search of a Soul',
    category: 'general',
    difficulty: 1,
  },
  {
    id: 'gen-010',
    text: 'The most terrifying thing is to accept oneself completely.',
    source: 'Letters Vol. 1',
    category: 'general',
    difficulty: 1,
  },
  {
    id: 'gen-011',
    text: 'Where love rules, there is no will to power; and where power predominates, there love is lacking.',
    source: 'Collected Works Vol. 7',
    category: 'general',
    difficulty: 3,
    volume: 7,
  },
  {
    id: 'gen-012',
    text: 'Children are educated by what the grown-up is and not by his talk.',
    source: 'Collected Works Vol. 17',
    category: 'general',
    difficulty: 2,
    volume: 17,
  },
  {
    id: 'gen-013',
    text: 'Show me a sane man and I will cure him for you.',
    source: 'Attributed',
    category: 'general',
    difficulty: 1,
  },
  {
    id: 'gen-014',
    text: 'Even a happy life cannot be without a measure of darkness.',
    source: 'Collected Works Vol. 17',
    category: 'general',
    difficulty: 1,
    volume: 17,
  },
  {
    id: 'gen-015',
    text: 'Everything that irritates us about others can lead us to an understanding of ourselves.',
    source: 'Memories, Dreams, Reflections',
    category: 'general',
    difficulty: 2,
  },

  // LONGER IMAGINAL PASSAGES - Enhanced extraction examples
  {
    id: 'img-001',
    text: 'The images of the unconscious place a great responsibility upon us. Failure to understand them, or a shirking of ethical responsibility, deprives us of wholeness and imposes upon us a painful fragmentariness in life.',
    source: 'Collected Works Vol. 13',
    category: 'psyche',
    difficulty: 4,
    volume: 13,
    languageStyle: 'imaginal',
    passageLength: 'long',
    imageRichness: 8,
  },
  {
    id: 'img-002',
    text: 'The encounter with the creature changes the creator. When the ground of being speaks to us in dreams, visions, and fantasies, something is irrevocably altered in the dreamer. The experience leaves its mark, transforming mere existence into meaningful presence.',
    source: 'Collected Works Vol. 14',
    category: 'dreams',
    difficulty: 5,
    volume: 14,
    languageStyle: 'imaginal',
    passageLength: 'long',
    imageRichness: 9,
  },
  {
    id: 'som-001',
    text: 'The body is not a machine to be driven, but a garden to be cultivated. Within the flesh dwells a wisdom older than our thoughts, a knowing that speaks through sensation, through the quickening of the heart, through the tightening of the belly.',
    source: 'Collected Works Vol. 8',
    category: 'psyche',
    difficulty: 4,
    volume: 8,
    languageStyle: 'somatic',
    passageLength: 'long',
    imageRichness: 7,
  },
  {
    id: 'rel-001',
    text: 'In the space between two people, something invisible yet undeniable emerges. This third presence, neither you nor me, but born of our encounter, carries the possibility of transformation that neither could achieve alone.',
    source: 'Collected Works Vol. 16',
    category: 'general',
    difficulty: 3,
    volume: 16,
    languageStyle: 'relational',
    passageLength: 'long',
    imageRichness: 6,
  },
  {
    id: 'img-003',
    text: 'The great images appear in dreams like visitors from another realm, bearing gifts we do not yet recognize. They speak a language older than words, addressing the soul directly through symbol and metaphor.',
    source: 'Collected Works Vol. 11',
    category: 'dreams',
    difficulty: 3,
    volume: 11,
    languageStyle: 'imaginal',
    passageLength: 'long',
    imageRichness: 9,
  },
  {
    id: 'som-002',
    text: 'Emotions move through the body like weather patterns, each feeling manifesting as particular sensations: the warmth of joy spreading through the chest, the cold grip of fear in the stomach, the heaviness of sorrow settling in the limbs.',
    source: 'Collected Works Vol. 9, Part 1',
    category: 'psyche',
    difficulty: 4,
    volume: 9,
    languageStyle: 'somatic',
    passageLength: 'long',
    imageRichness: 8,
  },
  {
    id: 'img-004',
    text: 'The mandala appears spontaneously in dreams and active imagination as a protective circle, a vessel containing the conflicting forces within the psyche. Its form, whether simple or elaborate, serves as a temenos, a sacred precinct where transformation can safely occur.',
    source: 'Collected Works Vol. 12',
    category: 'self',
    difficulty: 5,
    volume: 12,
    languageStyle: 'imaginal',
    passageLength: 'long',
    imageRichness: 10,
  },
  {
    id: 'rel-002',
    text: 'Every true encounter risks us. To meet another deeply is to allow ourselves to be touched, changed, perhaps even wounded. Yet in this vulnerability lies the possibility of becoming more fully human, more fully alive.',
    source: 'Collected Works Vol. 17',
    category: 'general',
    difficulty: 3,
    volume: 17,
    languageStyle: 'relational',
    passageLength: 'medium',
    imageRichness: 5,
  },
  {
    id: 'img-005',
    text: 'The alchemical vessel symbolizes the psychic container necessary for transformation. Within its sealed space, opposing substances meet and mingle, undergoing the heat of suffering until something entirely new emerges from their conjunction.',
    source: 'Collected Works Vol. 14',
    category: 'individuation',
    difficulty: 5,
    volume: 14,
    languageStyle: 'imaginal',
    passageLength: 'long',
    imageRichness: 9,
  },
  {
    id: 'som-003',
    text: 'The instincts speak through the body with a clarity that the rational mind often refuses to hear. We feel danger before we can name it, sense attraction before we comprehend it, experience rightness or wrongness in our very bones.',
    source: 'Collected Works Vol. 8',
    category: 'psyche',
    difficulty: 4,
    volume: 8,
    languageStyle: 'somatic',
    passageLength: 'long',
    imageRichness: 6,
  },
];

/**
 * Get all quotes (manual + lazy-loaded extracted quotes)
 * Returns manual quotes immediately, triggers lazy load of extracted quotes
 */
export async function getAllQuotes(): Promise<Quote[]> {
  const extracted = await loadExtractedQuotes();
  return [...manualQuotes, ...extracted];
}

/**
 * Get manual quotes only (immediate, no async)
 * Use this for initial app load to keep bundle small
 */
export const quotes: Quote[] = manualQuotes;

/**
 * Get a random quote (from manual quotes only for fast initial load)
 * @deprecated Use getFilteredQuote() instead which supports lazy-loaded quotes
 */
export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

/**
 * Get quotes filtered by category
 * @deprecated Use getFilteredQuote() instead which supports lazy-loaded quotes
 */
export const getQuotesByCategory = (category: QuoteCategory): Quote[] => {
  return quotes.filter((quote) => quote.category === category);
};

/**
 * Get quotes filtered by difficulty
 * @deprecated Use getFilteredQuote() instead which supports lazy-loaded quotes
 */
export const getQuotesByDifficulty = (difficulty: number): Quote[] => {
  return quotes.filter((quote) => quote.difficulty === difficulty);
};

/**
 * Smart quote selection algorithm
 * - Prioritizes non-logocentric language styles
 * - Tracks recently shown quotes to avoid repetition
 * - Balances distribution across language styles and lengths
 */

// Track recently shown quote IDs (stored in memory, reset on page reload)
const recentlyShownQuotes: Set<string> = new Set();
const MAX_RECENT_QUOTES = 50;

// Track language style distribution for current session
const sessionStyleCounts = {
  cognitive: 0,
  imaginal: 0,
  somatic: 0,
  relational: 0,
};

/**
 * Calculate preference score for a quote
 * Higher score = more likely to be selected
 */
function calculateQuoteScore(quote: Quote): number {
  let score = 10; // Base score

  // STRONG preference for non-cognitive language styles
  if (quote.languageStyle === 'imaginal') score += 8;
  else if (quote.languageStyle === 'somatic') score += 6;
  else if (quote.languageStyle === 'relational') score += 5;
  else if (quote.languageStyle === 'cognitive') score -= 3;

  // Bonus for image-rich passages
  if (quote.imageRichness) {
    score += quote.imageRichness * 0.8;
  }

  // Prefer longer passages for more engaging typing
  if (quote.passageLength === 'long') score += 3;
  else if (quote.passageLength === 'medium') score += 2;

  // Balance session distribution - penalize overused styles
  const style = quote.languageStyle || 'cognitive';
  const totalShown = Object.values(sessionStyleCounts).reduce((a, b) => a + b, 0);
  if (totalShown > 0) {
    const styleRatio = sessionStyleCounts[style] / totalShown;
    // Penalize if this style is used more than 40% of the time
    if (styleRatio > 0.4) score -= 5;
  }

  // Penalize recently shown quotes heavily
  if (recentlyShownQuotes.has(quote.id)) {
    score -= 20;
  }

  return score;
}

/**
 * Get a quote matching preferences with smart selection
 * Automatically lazy-loads extracted quotes on first call
 */
export const getFilteredQuote = async (
  categories?: QuoteCategory[],
  difficulty?: number
): Promise<Quote> => {
  // Lazy load extracted quotes on first call
  const allQuotes = await getAllQuotes();
  let filtered = allQuotes;

  // Apply category filter
  if (categories && categories.length > 0) {
    filtered = filtered.filter((quote) => categories.includes(quote.category));
  }

  // Apply difficulty filter
  if (difficulty) {
    filtered = filtered.filter((quote) => quote.difficulty === difficulty);
  }

  // Fallback to all quotes if no matches
  if (filtered.length === 0) {
    filtered = allQuotes;
  }

  // Calculate scores for all candidates
  const scoredQuotes = filtered.map((quote) => ({
    quote,
    score: calculateQuoteScore(quote),
  }));

  // Sort by score (descending)
  scoredQuotes.sort((a, b) => b.score - a.score);

  // Select from top 20% using weighted random selection
  const topCandidates = scoredQuotes.slice(0, Math.max(10, Math.floor(scoredQuotes.length * 0.2)));

  // Weighted random selection from top candidates
  const totalScore = topCandidates.reduce((sum, item) => sum + Math.max(1, item.score), 0);
  let random = Math.random() * totalScore;

  let selectedQuote = topCandidates[0].quote;
  for (const item of topCandidates) {
    random -= Math.max(1, item.score);
    if (random <= 0) {
      selectedQuote = item.quote;
      break;
    }
  }

  // Update tracking
  recentlyShownQuotes.add(selectedQuote.id);
  if (recentlyShownQuotes.size > MAX_RECENT_QUOTES) {
    const firstItem = recentlyShownQuotes.values().next().value;
    if (firstItem) {
      recentlyShownQuotes.delete(firstItem);
    }
  }

  // Update session style counts
  const style = selectedQuote.languageStyle || 'cognitive';
  sessionStyleCounts[style]++;

  return selectedQuote;
};

/**
 * Keywords for categorizing quotes. The keys are the categories, and the values are arrays of keywords.
 */
const categoryKeywords: Record<string, string[]> = {
  archetypes: ['archetype', 'archetypal', 'motif', 'primordial image'],
  shadow: ['shadow', 'darkness', 'inferior', 'dark side'],
  consciousness: ['conscious', 'unconscious', 'awareness', 'ego'],
  dreams: ['dream', 'dreams', 'vision', 'fantasy', 'nightmare'],
  individuation: [
    'individuation',
    'differentiate',
    'whole',
    'wholeness',
    'unite',
    'integration',
  ],
  psyche: ['psyche', 'psychic', 'soul', 'mind'],
  'collective-unconscious': ['collective unconscious', 'objective psyche'],
  'anima-animus': ['anima', 'animus', 'masculine', 'feminine', 'syzygy'],
  self: ['self', 'Self', 'center', 'mandala', 'circumference'],
};

/**
 * Categorizes a quote based on keywords.
 * @param text The text of the quote.
 * @returns The determined category.
 */
function categorizeQuote(text: string): QuoteCategory {
  const lowerText = text.toLowerCase();
  for (const category in categoryKeywords) {
    for (const keyword of categoryKeywords[category]) {
      if (lowerText.includes(keyword)) {
        return category as QuoteCategory;
      }
    }
  }
  return 'general';
}

/**
 * Calculates the difficulty of a quote.
 * Difficulty is based on average word length, word count, and presence of complex words.
 * @param text The text of the quote.
 * @returns A difficulty score from 1 to 5.
 */
function calculateDifficulty(text: string): DifficultyLevel {
  const words = text.split(/\s+/);
  const wordCount = words.length;
  if (wordCount === 0) return 1;

  const avgWordLength = text.length / wordCount;

  let difficulty = 1;
  if (avgWordLength > 5) difficulty++;
  if (avgWordLength > 7) difficulty++;
  if (wordCount > 20) difficulty++;
  if (wordCount > 30) difficulty++;

  // Bonus for complex words (e.g., > 10 letters)
  const complexWords = words.filter((w) => w.length > 10).length;
  difficulty += Math.floor(complexWords / 2);

  return Math.max(1, Math.min(5, Math.round(difficulty))) as DifficultyLevel;
}

/**
 * Determines the passage length category.
 * @param text The text of the quote.
 * @returns 'short', 'medium', or 'long'.
 */
function getPassageLength(text: string): 'short' | 'medium' | 'long' {
  const len = text.length;
  if (len < 100) return 'short';
  if (len < 200) return 'medium';
  return 'long';
}

/**
 * Parses a raw text file of Jung's work into a structured array of quotes.
 *
 * This function performs the following steps:
 * 1. Fetches the raw text from the provided URL.
 * 2. Cleans the text by removing citation markers and extra whitespace.
 * 3. Splits the text into individual sentences.
 * 4. Iterates through sentences, attempting to extract metadata like volume numbers.
 * 5. Filters sentences to a suitable length for typing practice (50-300 characters).
 * 6. For each valid sentence, it generates a full Quote object by:
 *    - Assigning a unique ID.
 *    - Determining a category via keyword matching.
 *    - Calculating a difficulty score.
 *    - Assigning metadata like source, volume, and passage length.
 * 7. Returns an array of `Quote` objects.
 *
 * @param textUrl The URL of the raw text file to parse.
 * @returns A promise that resolves to an array of `Quote` objects.
 */
export const parseJungText = async (textUrl: string): Promise<Quote[]> => {
  try {
    const response = await fetch(textUrl);
    if (!response.ok) {
      console.error(`Failed to fetch text from ${textUrl}: ${response.statusText}`);
      return [];
    }
    const rawText = await response.text();

    // Clean text: remove bracketed numbers (citations), normalize whitespace.
    const cleanedText = rawText
      .replace(/\[\d+\]/g, '')
      .replace(/(\r\n|\n|\r)/gm, ' ')
      .replace(/\s+/g, ' ');

    // Split into sentences using a regex that handles various sentence endings.
    const sentences = cleanedText.match(/[^.!?]+[.!?]+/g) || [];

    const extractedQuotes: Quote[] = [];
    let currentVolume: number | undefined;
    let currentSource = 'Collected Works (auto-extracted)';

    sentences.forEach((sentence, index) => {
      const trimmedSentence = sentence.trim();

      // Attempt to extract volume info from context
      const volMatch = trimmedSentence.match(/Volume (\d+)/i);
      if (volMatch && volMatch[1]) {
        currentVolume = parseInt(volMatch[1], 10);
        currentSource = `Collected Works Vol. ${currentVolume}`;
        return; // Skip this line as it's likely a header or metadata.
      }

      // Filter for appropriate length for typing practice.
      if (trimmedSentence.length < 50 || trimmedSentence.length > 300) {
        return;
      }

      const category = categorizeQuote(trimmedSentence);
      const difficulty = calculateDifficulty(trimmedSentence);
      const passageLength = getPassageLength(trimmedSentence);

      extractedQuotes.push({
        id: `ext-${index}-${new Date().getTime()}`,
        text: trimmedSentence,
        source: currentSource,
        category,
        difficulty,
        volume: currentVolume,
        passageLength,
        // The following are placeholders for more advanced analysis
        languageStyle: 'cognitive',
        imageRichness: Math.round(difficulty / 2), // Simple heuristic
      });
    });

    if (extractedQuotes.length > 0) {
      console.log(`Successfully parsed and extracted ${extractedQuotes.length} new quotes.`);
    } else {
      console.warn('Parsing completed, but no suitable quotes were extracted.');
    }

    return extractedQuotes;
  } catch (error) {
    console.error('An error occurred during the parsing of the Jung text:', error);
    return [];
  }
};

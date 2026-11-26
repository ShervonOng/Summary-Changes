export type VersionId = 'original' | 'v1' | 'v2';

export interface VersionMeta {
  id: VersionId;
  indexLabel: string;
  title: string;
  methodology: string;
  url: string;
  displayHost: string;
  embedMode: 'replica' | 'iframe';
  summary: string;
  highlights: string[];
  accentHex: string;
}

export const VERSIONS: VersionMeta[] = [
  {
    id: 'original',
    indexLabel: '01',
    title: 'Original Replica',
    methodology: 'Baseline Production Storefront',
    url: 'https://www.fairprice.com.sg/',
    displayHost: 'fairprice.com.sg',
    embedMode: 'replica',
    summary:
      'Interactive replica of the live FairPrice storefront, preserving its 3-tier header, dense promotional banners, and competing discount badges.',
    highlights: [
      'Three stacked navigation rows (utility strip, search/cart row, 11-link category bar)',
      'Opaque cart state ("Fees may apply") with no progress toward free-delivery threshold',
      'Competing visual weights across flash deals, multi-buy callouts, and promo carousels',
    ],
    accentHex: '#DC2626',
  },
  {
    id: 'v1',
    indexLabel: '02',
    title: 'Version 1',
    methodology: 'Intuitive Accounts & Mental Models',
    url: 'https://fp2-enhanced.vercel.app/',
    displayHost: 'fp2-enhanced.vercel.app',
    embedMode: 'iframe',
    summary:
      'Reimagined as Pantry Lane around personal account context, smart pantry replenishment, and frictionless grocery-to-recipe workflows.',
    highlights: [
      'Unified single-row navigation anchored by active account context (Alex Tan)',
      'Integrated Smart Shopping List & Pantry drawer for recurring household staples',
      'Calm emerald-teal visual hierarchy with clear $59 free standard delivery tracking',
    ],
    accentHex: '#0F766E',
  },
  {
    id: 'v2',
    indexLabel: '03',
    title: 'Version 2',
    methodology: "Nielsen's 10 Usability Heuristics",
    url: 'https://fp-enhanced-ver2.vercel.app/',
    displayHost: 'fp-enhanced-ver2.vercel.app',
    embedMode: 'iframe',
    summary:
      'Applies Jakob Nielsen’s 10 usability heuristics systematically while retaining FairPrice’s familiar blue brand identity and Linkpoints ecosystem.',
    highlights: [
      'Visibility of system status via live delivery threshold progress and cart feedback',
      'Recognition rather than recall with Popular Searches, dietary filters, and pantry recall',
      'User control and freedom with instant search clearing, filter resets, and undoable cart edits',
    ],
    accentHex: '#004B93',
  },
];

export interface MatrixRow {
  dimension: string;
  original: string;
  v1: string;
  v2: string;
}

export const COMPARISON_MATRIX: MatrixRow[] = [
  {
    dimension: 'Header & Navigation',
    original: '3 stacked rows with 18+ competing links, utility prompts, and Digital Club banner.',
    v1: 'Single streamlined header integrating search, account profile, pantry list, and cart.',
    v2: 'Structured FairPrice Blue header balancing brand continuity with scannable single-line actions.',
  },
  {
    dimension: 'Account & Repeat Shopping',
    original: 'Account login isolated in top-right utility text; shopping lists hidden in secondary nav.',
    v1: 'Account-first architecture ("Account: Alex Tan") with persistent Smart Shopping List & Pantry.',
    v2: 'Quick access to Alex Tan account, Linkpoints rewards, and Smart Shopping List & Pantry.',
  },
  {
    dimension: 'System Status & Delivery Clarity',
    original: 'Cart label reads "Fees may apply" without showing exact fee or waiver threshold.',
    v1: 'Explicit free-delivery progress ($59 threshold) and clear $5.99 slot fee visibility.',
    v2: 'Real-time status indicators for $59 free delivery, applied promos, and live cart totals.',
  },
  {
    dimension: 'Search & Dietary Filtering',
    original: 'Generic keyword search bar; Halal and dietary tags appear only as static card text.',
    v1: 'Search groceries and recipes together with instant Halal, Organic, and No Sugar filters.',
    v2: 'Recognition-driven Popular Searches, clear-search affordance, and zero-result recovery actions.',
  },
  {
    dimension: 'Visual Hierarchy & Restraint',
    original: 'High density: overlapping Save badges, multi-buy tags, star counts, and carousel ads.',
    v1: 'Restrained Pantry Lane teal palette with generous card breathing room and clean pricing.',
    v2: 'Consistent FairPrice Blue (#004B93) tokens, unified Must Buy framing, and reduced visual noise.',
  },
  {
    dimension: 'Error Prevention & Recovery',
    original: 'Dead-end filter states and abrupt navigation switches without clear reset triggers.',
    v1: 'Guided empty states with one-click "Reset Recipe Filters" and clear search recovery.',
    v2: 'Explicit undo/remove feedback, zero-state instructions, and safe filter reset controls.',
  },
];

export interface HeuristicItem {
  number: string;
  name: string;
  baselineIssue: string;
  v1Approach: string;
  v2Implementation: string;
  focusArea: 'status' | 'control' | 'cognition';
}

export const NIELSEN_HEURISTICS: HeuristicItem[] = [
  {
    number: 'H1',
    name: 'Visibility of System Status',
    baselineIssue: 'Shoppers see "Fees may apply" under the cart with no progress feedback toward free delivery.',
    v1Approach: 'Displays live cart subtotal alongside the $59 free delivery target inside the account drawer.',
    v2Implementation: 'Live delivery waiver meter ($59 threshold), slot fee disclosure ($5.99), and instant add-to-cart confirmation.',
    focusArea: 'status',
  },
  {
    number: 'H2',
    name: 'Match Between System & Real World',
    baselineIssue: 'Store formats, vouchers, and club jargon fragment the mental model of a grocery run.',
    v1Approach: 'Organizes aisles around everyday household mental models (Pantry, Recipes, Top Picks).',
    v2Implementation: 'Retains familiar Singapore grocery taxonomy (FairPrice Xtra, Finest, Linkpoints, Halal) in plain terms.',
    focusArea: 'cognition',
  },
  {
    number: 'H3',
    name: 'User Control and Freedom',
    baselineIssue: 'Clearing search queries or escaping multi-layered category filters requires repeated backtracks.',
    v1Approach: 'Provides slide-over drawers for Cart and Pantry List that preserve browsing scroll position.',
    v2Implementation: 'Dedicated "Clear search", "Reset Recipe Filters", and direct quantity steppers on every card.',
    focusArea: 'control',
  },
  {
    number: 'H4',
    name: 'Consistency and Standards',
    baselineIssue: 'Discount badges alternate unpredictably between "Save $X", "Any 3 At $Y", and promotional ribbons.',
    v1Approach: 'Standardizes card anatomy with uniform price alignment, unit weight, and action placement.',
    v2Implementation: 'Enforces consistent FairPrice Blue interactive tokens, uniform card grids, and predictable button labels.',
    focusArea: 'cognition',
  },
  {
    number: 'H5',
    name: 'Error Prevention',
    baselineIssue: 'Unannounced delivery fees and missing dietary filters cause late-stage checkout surprises.',
    v1Approach: 'Surfaces Halal and Organic filters upfront so dietary mismatches are avoided before adding to cart.',
    v2Implementation: 'Explicit filter toggles (Halal Certified, Healthier Choice, No Sugar) and upfront fee conditions.',
    focusArea: 'control',
  },
  {
    number: 'H6',
    name: 'Recognition Rather Than Recall',
    baselineIssue: 'Returning shoppers must re-type recurring staples or hunt through 11 top-level navigation links.',
    v1Approach: 'Centers the logged-in Pantry list so frequent household items are immediately recognizable.',
    v2Implementation: 'Surfaces Popular Searches, Smart Shopping List & Pantry recall, and visual category shortcuts.',
    focusArea: 'cognition',
  },
  {
    number: 'H7',
    name: 'Flexibility and Efficiency of Use',
    baselineIssue: 'Power shoppers and recipe planners navigate separate silos for ingredients and meal ideas.',
    v1Approach: 'Combines recipe discovery with one-click ingredient additions directly tied to the user account.',
    v2Implementation: 'Unified search for groceries and recipes plus rapid quick-add controls without page reloads.',
    focusArea: 'control',
  },
  {
    number: 'H8',
    name: 'Aesthetic and Minimalist Design',
    baselineIssue: 'Simultaneous flash-sale ribbons, promotional carousels, and utility strips compete for attention.',
    v1Approach: 'Introduces a calm neutral canvas (#F5F6F8) and replaces loud red urgency with measured teal accents.',
    v2Implementation: 'Eliminates redundant chrome while preserving FairPrice brand recognition and clear visual hierarchy.',
    focusArea: 'status',
  },
  {
    number: 'H9',
    name: 'Help Users Recognize, Diagnose, and Recover from Errors',
    baselineIssue: 'Empty search or restrictive filter combinations provide minimal guidance on next steps.',
    v1Approach: 'Explains empty recipe states clearly and offers immediate filter-clearing actions.',
    v2Implementation: 'Constructive zero-result messages ("Try clearing a category filter or searching another ingredient") + reset CTA.',
    focusArea: 'control',
  },
  {
    number: 'H10',
    name: 'Help and Documentation',
    baselineIssue: 'Help Centre is buried as a tiny top-left link separated from delivery or promo context.',
    v1Approach: 'Embeds delivery waiver criteria and voucher conditions inline where decisions happen.',
    v2Implementation: 'Places contextual promo rules (e.g. "$5.99 fee waived over $59") directly inside cart and voucher surfaces.',
    focusArea: 'status',
  },
];

import React, { useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Search,
  ShoppingCart,
  Star,
  X,
} from 'lucide-react';

interface ReplicaProduct {
  id: string;
  title: string;
  weight: string;
  price: number;
  originalPrice?: number;
  badgeText: string;
  badgeTone: 'red' | 'blue';
  halal?: boolean;
  ratingCount: number;
  category: string;
  accentBg: string;
}

const REPLICA_PRODUCTS: ReplicaProduct[] = [
  {
    id: 'prawns',
    title: 'Seafood Boy - Jumbo Frozen Peeled Prawn Meat (Tail On)',
    weight: '500 G',
    price: 8.99,
    originalPrice: 10.9,
    badgeText: 'Save $1.91',
    badgeTone: 'red',
    ratingCount: 84,
    category: 'Frozen',
    accentBg: 'from-rose-50 to-orange-50',
  },
  {
    id: 'ribena',
    title: 'Ribena Blackcurrant Fruit Packet Drink - Less Sweet',
    weight: '24 x 200ml (CTN)',
    price: 12.9,
    originalPrice: 15.32,
    badgeText: 'Save $2.42',
    badgeTone: 'red',
    halal: true,
    ratingCount: 269,
    category: 'Beverages',
    accentBg: 'from-purple-50 to-fuchsia-50',
  },
  {
    id: 'rice',
    title: 'FairPrice Premium Japonica Rice - Short Grain',
    weight: '2.5kg',
    price: 6.65,
    originalPrice: 7.7,
    badgeText: 'Save $1.05',
    badgeTone: 'red',
    halal: true,
    ratingCount: 176,
    category: 'Rice & Staples',
    accentBg: 'from-amber-50 to-yellow-50',
  },
  {
    id: 'mms',
    title: "M&M's Chocolate Candies - Milk (Funsize)",
    weight: '175.5g (13 per pack)',
    price: 5.6,
    originalPrice: 7.8,
    badgeText: 'Save $2.20',
    badgeTone: 'red',
    ratingCount: 105,
    category: 'Snacks',
    accentBg: 'from-yellow-50 to-amber-50',
  },
  {
    id: 'tissue',
    title: 'FairPrice Facial Tissue 3ply Soft Pack',
    weight: '4 x 130 per pack',
    price: 4.8,
    badgeText: 'Any 3 At $10.25',
    badgeTone: 'blue',
    ratingCount: 765,
    category: 'Household',
    accentBg: 'from-sky-50 to-blue-50',
  },
];

const NAV_LINKS = [
  'Categories',
  'Promotions',
  'Shopping Lists',
  'Weekly promotions',
  'Recipes',
  'Tips for You',
  'Events',
  'Store Locator',
  'Just Wine Club',
  'Send E-Gift Vouchers',
  'Shop for Business',
];

const PROMO_SLIDES = [
  {
    eyebrow: 'ONLINE EXCLUSIVE · FLASH DEALS',
    headline: 'Up to 35% Off Fresh & Pantry Must-Haves',
    sub: 'Selected brands only. Min. spend $59 applies for standard delivery slots.',
    bg: 'bg-[#004B93]',
    accent: 'bg-[#E11D48]',
  },
  {
    eyebrow: 'DIGITAL CLUB MEMBER PERKS',
    headline: 'Earn Linkpoints + Extra $5 Off Selected Cartons',
    sub: 'Terms and conditions apply. Fees may apply at checkout.',
    bg: 'bg-[#1E3A8A]',
    accent: 'bg-[#F59E0B]',
  },
];

interface FairPriceOriginalReplicaProps {
  resetKey: number;
}

export const FairPriceOriginalReplica: React.FC<FairPriceOriginalReplicaProps> = ({
  resetKey,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('Promotions');
  const [slideIdx, setSlideIdx] = useState(0);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

  // Reset internal replica state when parent triggers reload
  React.useEffect(() => {
    setSearchQuery('');
    setActiveNav('Promotions');
    setSlideIdx(0);
    setCart({});
    setCartOpen(false);
  }, [resetKey]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return REPLICA_PRODUCTS;
    return REPLICA_PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const subtotal = REPLICA_PRODUCTS.reduce(
    (sum, item) => sum + (cart[item.id] || 0) * item.price,
    0
  );

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const next = (prev[id] || 0) + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const slide = PROMO_SLIDES[slideIdx];

  return (
    <div className="relative flex h-full w-full flex-col overflow-y-auto bg-[#F4F5F7] text-[#1F2937] font-sans">
      {/* Subtle notice explaining why column 1 uses an interactive replica */}
      <div className="flex items-center justify-between gap-3 bg-amber-50 px-4 py-1.5 text-[11px] text-amber-900 border-b border-amber-200 shrink-0">
        <span>
          Interactive replica of <strong>fairprice.com.sg</strong> (live origin sets{' '}
          <code className="font-mono">X-Frame-Options: SAMEORIGIN</code>)
        </span>
        <a
          href="https://www.fairprice.com.sg/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-amber-950 underline hover:text-amber-700 whitespace-nowrap shrink-0"
        >
          Open live site
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Tier 1: Original FairPrice Utility Strip */}
      <div className="bg-[#003B73] text-white text-[11px] px-5 py-1.5 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4 whitespace-nowrap overflow-hidden">
          <span className="underline cursor-pointer">Get the app</span>
          <span className="inline-flex items-center gap-1 text-blue-100">
            <MapPin className="h-3 w-3 shrink-0" />
            Enter your address or postal code
          </span>
        </div>
        <div className="flex items-center gap-4 whitespace-nowrap shrink-0">
          <span>Help Centre</span>
          <span>Sign up</span>
          <span className="font-semibold">Log in</span>
          <span>More ▾</span>
        </div>
      </div>

      {/* Tier 2: Brand + Digital Club + Search + Cart ("Fees may apply") */}
      <div className="bg-white border-b border-slate-200 px-5 py-3 flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xl font-extrabold tracking-tight text-[#004B93]">
            Fair<span className="text-[#E11D48]">Price</span>
          </div>
          <span className="text-[11px] font-semibold bg-blue-50 text-[#004B93] border border-blue-200 px-2 py-0.5 rounded whitespace-nowrap">
            Digital Club
          </span>
        </div>

        <div className="flex-1 flex items-center border border-slate-300 rounded bg-slate-50 overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for groceries, brands or categories"
            className="w-full bg-transparent px-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-500 focus:outline-none"
          />
          <button
            type="button"
            aria-label="Search replica"
            className="bg-[#004B93] text-white px-3 py-2 flex items-center justify-center shrink-0"
          >
            <Search className="h-3.5 w-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setCartOpen((prev) => !prev)}
          className="flex items-center gap-2 border border-slate-300 rounded px-3 py-1.5 bg-white hover:bg-slate-50 text-left shrink-0"
        >
          <ShoppingCart className="h-4 w-4 text-[#004B93]" />
          <div className="leading-tight">
            <div className="text-xs font-bold text-slate-900 tabular-nums">
              Cart ({totalItems}) · ${subtotal.toFixed(2)}
            </div>
            <div className="text-[10px] text-slate-500">Fees may apply</div>
          </div>
        </button>
      </div>

      {/* Tier 3: Dense 11-link Category Bar */}
      <div className="bg-white border-b border-slate-200 px-5 py-2 flex items-center gap-4 overflow-x-auto text-[11px] font-medium text-slate-700 shrink-0">
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            type="button"
            onClick={() => setActiveNav(link)}
            className={`whitespace-nowrap shrink-0 pb-0.5 transition-colors ${
              activeNav === link
                ? 'text-[#004B93] font-bold border-b-2 border-[#004B93]'
                : 'hover:text-[#004B93]'
            }`}
          >
            {link}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="p-4 space-y-5 flex-1">
        {/* Busy Promo Banner */}
        <div
          className={`relative rounded-lg ${slide.bg} text-white px-6 py-5 flex items-center justify-between gap-4 overflow-hidden`}
        >
          <div className="max-w-xl space-y-1.5">
            <div className="inline-block text-[10px] font-bold tracking-wider uppercase bg-white/15 px-2 py-0.5 rounded">
              {slide.eyebrow}
            </div>
            <h4 className="text-lg font-extrabold leading-snug">{slide.headline}</h4>
            <p className="text-xs text-blue-100">{slide.sub}</p>
            <div className="pt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveNav('Weekly promotions')}
                className={`${slide.accent} text-white text-xs font-bold px-3 py-1.5 rounded`}
              >
                Shop Flash Deals
              </button>
              <span className="text-[11px] text-blue-100">
                Active tab: {activeNav}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() =>
                setSlideIdx((prev) => (prev === 0 ? PROMO_SLIDES.length - 1 : prev - 1))
              }
              aria-label="Previous promo slide"
              className="p-1.5 rounded-full bg-white/15 hover:bg-white/25"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setSlideIdx((prev) => (prev + 1) % PROMO_SLIDES.length)}
              aria-label="Next promo slide"
              className="p-1.5 rounded-full bg-white/15 hover:bg-white/25"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Flash Deals Grid */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h5 className="text-sm font-extrabold text-slate-900">Flash Deals</h5>
              <span className="text-[10px] font-bold uppercase bg-[#E11D48] text-white px-1.5 py-0.5 rounded">
                Online Exclusive
              </span>
            </div>
            <span className="text-xs font-semibold text-[#004B93]">See all</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded border border-slate-200 bg-white p-6 text-center text-xs text-slate-600">
              No items found for &ldquo;{searchQuery}&rdquo;. Try clearing your search box above.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {filteredProducts.map((item) => {
                const qty = cart[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between rounded border border-slate-200 bg-white p-2.5"
                  >
                    <div>
                      <div
                        className={`relative h-24 rounded bg-gradient-to-br ${item.accentBg} flex items-center justify-center p-2 mb-2 border border-slate-100`}
                      >
                        <span
                          className={`absolute top-1 left-1 text-[10px] font-bold text-white px-1.5 py-0.5 rounded ${
                            item.badgeTone === 'red' ? 'bg-[#E11D48]' : 'bg-[#004B93]'
                          }`}
                        >
                          {item.badgeText}
                        </span>
                        {item.halal && (
                          <span className="absolute bottom-1 right-1 text-[9px] font-bold bg-emerald-700 text-white px-1 py-0.5 rounded">
                            Halal
                          </span>
                        )}
                        <span className="text-[11px] font-semibold text-slate-500 text-center leading-tight">
                          {item.category}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1.5 mb-1 tabular-nums">
                        <span className="text-sm font-extrabold text-[#E11D48]">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[11px] text-slate-400 line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-semibold text-slate-900 line-clamp-2 leading-snug mb-1">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mb-1.5">{item.weight}</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 tabular-nums">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span>4.8</span>
                        <span>({item.ratingCount})</span>
                      </div>

                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => addToCart(item.id)}
                          className="w-full rounded bg-[#004B93] hover:bg-[#003970] text-white text-[11px] font-bold py-1.5 transition-colors"
                        >
                          Add to cart
                        </button>
                      ) : (
                        <div className="flex items-center justify-between rounded border border-[#004B93] bg-blue-50 px-2 py-1 text-xs font-bold text-[#004B93] tabular-nums">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, -1)}
                            className="px-1.5"
                          >
                            -
                          </button>
                          <span>{qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, 1)}
                            className="px-1.5"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Secondary Promo Strip mirroring Spend $25 / Recommended for you */}
        <section className="rounded border border-slate-200 bg-white p-3 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-extrabold text-slate-900">Recommended for you</div>
            <div className="text-[11px] text-slate-500">
              Spend $25 on participating pantry brands to unlock voucher codes at checkout.
            </div>
          </div>
          <span className="text-[11px] font-bold text-[#E11D48] whitespace-nowrap shrink-0">
            Fees may apply
          </span>
        </section>
      </div>

      {/* Simple Cart Drawer inside Replica */}
      {cartOpen && (
        <div className="absolute inset-y-0 right-0 w-72 bg-white border-l border-slate-300 shadow-xl z-20 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-[#004B93] text-white">
            <span className="text-xs font-bold">Shopping Cart ({totalItems})</span>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              aria-label="Close cart"
              className="p-1 hover:bg-white/10 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {totalItems === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                Your cart is empty. Add items from Flash Deals.
              </p>
            ) : (
              REPLICA_PRODUCTS.filter((p) => (cart[p.id] || 0) > 0).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 truncate">{item.title}</div>
                    <div className="text-[11px] text-slate-500 tabular-nums">
                      ${item.price.toFixed(2)} × {cart[item.id]}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, -(cart[item.id] || 1))}
                    className="text-[11px] text-rose-600 font-semibold shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="border-t border-slate-200 p-3 bg-slate-50 space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-900 tabular-nums">
              <span>Estimated Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-slate-500">
              Delivery & service fees calculated at checkout.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

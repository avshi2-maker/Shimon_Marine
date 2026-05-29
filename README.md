# Shimon Marine — Lifting Set Designer

Parametric design tool for marine lifting sets, built per **GL Noble Denton 0027/ND Rev 10**.
Shimon Reinich enters the vessel geometry and lift condition; the app derives the angles, hook
height, per-leg loads, and selects SpanSet / Crosby hardware with a live **cost ↔ added-value**
tradeoff on marginal components.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- No Tailwind — bespoke industrial CSS theme in `src/app/globals.css`
- Hebrew RTL UI, English technical tokens (WLL / MBL / DAF / part numbers)
- No backend yet — pure client state. Supabase / Cloudinary to be evaluated later.

## Setup (PowerShell)

```powershell
cd C:\Path\To\Shimon_Marine
npm install
npm run dev
```

Open http://localhost:3000.

Build for Vercel: push to GitHub → Vercel picks it up automatically.

## Folder layout

```
src/
  app/
    layout.tsx        root, fonts, Hebrew RTL
    page.tsx          composes the panels via useLiftingDesigner
    globals.css       theme tokens + body styling
  lib/
    types.ts          shared TS types
    catalogs.ts       SpanSet / Crosby component data + prices
    geometry.ts       angle / hook-height / ΔH derivation
    selection.ts      pick(), stateOf(), target from priority
    useLiftingDesigner.ts  state hook + memoised result
  components/
    Header.tsx        logo + title + badges
    Presets.tsx       preset buttons (port, open, inshore, static)
    InputPanel.tsx    sliders + segmented controls
    DerivedReadout.tsx  computed L.B.E / angles / H / ΔH / split
    ResultsPanel.tsx  metrics + status + cards list
    ComponentCard.tsx one component with bar + upgrade chip
    AssemblyView.tsx  inline SVG bridle preview
    CostValuePanel.tsx  cost vs full-margin cost gauge
```

## Engineering basis (locked)

| Param | Value | Source |
|---|---|---|
| Standard | GL 0027/ND Rev 10 | — |
| Design weight | 22 t (Ginton 602M) | Ginton 287-235 |
| DAF (port, 0 wave) | 1.15 | GL Table 5-1, Floating Inshore |
| SKL | 1.25 | 4-leg indeterminate |
| Soft sling SF | 7:1 | SpanSet |
| Crosby alloy SF | 5:1 | Crosby cert |
| Strap → CoG | aft 3.557 m / fwd 3.738 m | Ginton |
| Sling lengths | aft 8.831 / fwd 8.192 m | Ginton |
| Derived angles | 63.9° / 60.4° | computed |
| Derived hook H | 7.93 / 7.12 m · ΔH 0.81 | computed |

## Cost data caveat

The component prices in `src/lib/catalogs.ts` are an **indicative model**, not real quotes.
Swap each array entry's `p:` field for live supplier prices when available.

## Future hooks

- `.env.local` — for Supabase URL / anon-key and Cloudinary cloud name when added.
- Export button → emit REV-format assembly PDF from live state.
- Back-solve (target angle / min hook clearance → required sling lengths).

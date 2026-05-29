// Pick the smallest component that meets the target utilisation; fall back through
// non-overloaded then largest. Also expose the next size up for the upgrade chip.

import type { Component, Selection } from './types';

export function pick(cat: Component[], load: number, target: number): Selection {
  let chosen: Component | null = null;
  for (const it of cat) {
    if (load / it.w <= target) { chosen = it; break; }
  }
  if (!chosen) {
    for (const it of cat) {
      if (load / it.w <= 1.0) { chosen = it; break; }
    }
  }
  if (!chosen) chosen = cat[cat.length - 1];
  const idx = cat.indexOf(chosen);
  const next = cat[idx + 1] ?? null;
  return { it: chosen, next, util: load / chosen.w, load };
}

export type Status = 'ok' | 'marg' | 'over';

export function stateOf(u: number): Status {
  return u > 1 ? 'over' : u > 0.85 ? 'marg' : 'ok';
}

// priority 0 → 0.95 (cost), 100 → 0.70 (margin)
export function targetFromPrio(prio: number): number {
  return 0.95 - 0.25 * (prio / 100);
}

export function barColor(u: number): string {
  if (u > 0.9) return 'var(--red)';
  if (u > 0.7) return 'var(--amber)';
  return 'var(--green)';
}

export function money(n: number): string {
  return '₪' + Math.round(n).toLocaleString('en-US');
}

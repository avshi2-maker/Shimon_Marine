// Component catalogues — WLL (t) · indicative price (ILS).
// PRICES ARE INDICATIVE: replace with live supplier quotes per item.

import type { Component, Maker } from './types';

type RoundSeed = { w: number; p: number };
type CodedSeed = { w: number; c: string; p: number };

const round = (data: RoundSeed[]): Component[] =>
  data.map(o => ({
    ...o,
    mbl: +(o.w * 7).toFixed(1),
    df: 7,
    lab: `${o.w} t · Magnum`,
    maker: 'SpanSet' as Maker,
  }));

const coded = (data: CodedSeed[], prefix: string, maker: Maker, df = 5): Component[] =>
  data.map(o => ({
    ...o,
    mbl: +(o.w * df).toFixed(1),
    df,
    lab: `${prefix}${o.c}`,
    maker,
  }));

export const ROUND: Component[] = round([
  { w: 3, p: 170 },  { w: 4, p: 200 },  { w: 5, p: 240 },  { w: 6, p: 300 },
  { w: 8, p: 420 },  { w: 10, p: 540 }, { w: 12, p: 680 }, { w: 15, p: 880 },
  { w: 20, p: 1220 }, { w: 25, p: 1650 }, { w: 30, p: 2100 },
]);

export const SHACK: Component[] = coded([
  { w: 6.5, c: '3/4"', p: 140 },
  { w: 8.5, c: '7/8"', p: 200 },
  { w: 9.5, c: '7/8"', p: 250 },
  { w: 12.5, c: '1"', p: 360 },
  { w: 15, c: '1-1/8"', p: 520 },
  { w: 18, c: '1-1/4"', p: 680 },
  { w: 25, c: '1-1/2"', p: 1150 },
], 'G-209A ', 'Crosby');

export const CONN: Component[] = coded([
  { w: 2.27, c: 'Fr5', p: 210 },
  { w: 4.54, c: 'Fr10', p: 330 },
  { w: 6.8, c: 'Fr15', p: 480 },
  { w: 11.34, c: 'Fr25', p: 820 },
  { w: 13.6, c: 'Fr30', p: 1020 },
  { w: 18.1, c: 'Fr40', p: 1480 },
  { w: 27.2, c: 'Fr60', p: 2450 },
], 'S-237 ', 'Crosby');

// Master link assembly: mixes Crosby A-345 (Sling Saver) and Gunnebo MT (Grade 100).
const MLINK_SEEDS: CodedSeed[] = [
  { w: 12, c: 'MT-10', p: 600 },
  { w: 21, c: 'MT-13', p: 880 },
  { w: 27.7, c: 'A-345 1.50', p: 1150 },
  { w: 31, c: 'MT-16', p: 1420 },
  { w: 48, c: 'MT-20', p: 2150 },
  { w: 60, c: 'MT-22', p: 3000 },
];

export const MLINK: Component[] = MLINK_SEEDS.map(o => ({
  ...o,
  mbl: +(o.w * 5).toFixed(1),
  df: 5,
  lab: o.c,
  maker: (o.c.startsWith('A') ? 'Crosby' : 'Gunnebo') as Maker,
}));

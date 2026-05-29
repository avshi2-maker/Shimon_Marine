# Handover — Marine Lifting Set (Elbit Seagull USV)
**Date:** 28-05-2026 · **For:** Avshi Sapir → Shimon Reinich (marine engineer) · **Status:** drawing REV 5 + app mockup delivered, awaiting Shimon sign-off

---

## 1. What this job is

Two parallel deliverables for recovering an **Elbit Seagull 601M / 602M USV** with a 4-leg soft-sling bridle to a single hook:

- **Track A — Assembly drawing** in Shimon Reinich's sheet format (the one-off deliverable).
- **Track B — Parametric app mockup** ("Marine Lifting Set Designer") — Shimon's real goal: a tool he runs each job, plugging in changing parameters and getting the rigging set out, with a live **cost ↔ added-value** tradeoff on marginal components.

---

## 2. Deliverable files (all in `/mnt/user-data/outputs/`)

| File | What it is |
|---|---|
| `rigging_assembly_22t_port_28052026.pdf` / `.svg` | **CURRENT assembly drawing, REV 5** — 22 t port-recovery, DAF 1.15. SVG is layered/editable (11 named layers). |
| `marine_lift_designer_mockup_28052026.html` | **App mockup** — interactive, Hebrew RTL, parametric. Sliders work; angle now derived. |
| `rigging_assembly_22t_28052026.pdf` / `.svg` | Open-sea variant (DAF 1.30, uprated hardware) — kept for reference. |
| `rigging_straps_accessories_28052026.pdf` / `.svg` | Earlier straps & accessories analysis sheet (incl. DETAIL B bearing). |

---

## 3. Engineering basis (locked)

- **Standard:** GL Noble Denton 0027/ND Rev 10.
- **Governing load:** 22 t (Ginton 602M C-TRAPS, 21.76 t). 601M (20 t) is covered.
- **Scope:** recovery of a **floating** vessel **at port, 0 wave height, to deck** → sheltered/inshore.
- **DAF = 1.15** (GL "Floating Inshore", W ≤ 100 t) — NOT 1.30 (that's open sea).
- **SKL = 1.25** (4-leg statically indeterminate). Soft-sling SF **7:1**.

**Geometry — Ginton parameters only** (absolute LCG dropped per Shimon, it confused the datum):
- Strap-to-CoG: **aft 3.557 m**, **fwd 3.738 m** → **L.B.E 7.295 m**.
- Transverse ½-spread ≈ **1.55 m** (aft 1.573 / fwd 1.538).
- Sling lengths: **aft 8.831 m**, **fwd 8.192 m**.
- **Computed** (self-checks against Ginton): angles **63.9° aft / 60.4° fwd**, hook height **7.93 m aft / 7.12 m fwd**, **ΔH 0.81 m**.

**Loads:** per-leg static aft 6.21 t / fwd 6.10 t → design (×DAF×SKL) aft 8.93 t / fwd 8.77 t. Dynamic hook 25.0 t.

**Selected set (Shimon's original hardware — validated at DAF 1.15):**

| Item | Part | WLL | MBL | Util |
|---|---|---|---|---|
| AFT strap ×2 | SpanSet Magnum, 8.831 m | 12 t | 84 t (7:1) | 74 % |
| FWD strap ×2 | SpanSet Magnum, 8.192 m | 10 t | 70 t (7:1) | 88 % |
| Master link | Crosby A-345W 1.50 / 1014807 | 27.7 t | 138.5 t* | 90 % |
| HP connector ×4 | Crosby S-237 Fr.25 / 1020722 | 11.34 t | 56.7 t (5:1) | 79 % |
| Shackle ×4 | Crosby G-209A 1″ / 1017582 | 12.5 t | 62.5 t (5:1) | ok |

\*master-link MBL assumes Crosby 5:1 — confirm against cert.

---

## 4. Decision log (Shimon's calls)

1. 16.4 t sheet = **format only**; real load is **22 t** from Ginton.
2. Use **Ginton parameters only** — ignore nominal 10000/9427 and 3120/3080.
3. DAF must be **< 1.30**; port recovery 0-wave → **1.15** confirmed.
4. Ignore the 9198 height on his sheet — **compute hook height** (done: 7.93 / 7.12 m).
5. Master link **90 % is OK** — "we have 1:5 (5:1) to failure." Kept A-345 27.7 t.
6. Geometry is **referenced to CoG**: aft 3.557 / fwd 3.738 are the parameters that matter (absolute LCG removed from sheet).

---

## 5. App mockup — current state

- **Inputs:** vessel mass W · strap-to-CoG (aft/fwd) · sling lengths (LA/LF) · transverse ½-spread · lift condition (sets DAF) · SKL · cost↔margin priority slider.
- **Derived live:** sling angles, hook height, ΔH, L.B.E, load split (no hand-typed angle).
- **Output:** auto-selects full SpanSet/Crosby set with WLL/MBL/utilization, prices, marginal flags (>85 %), and per-component **upgrade chip** showing +cost → +margin.
- **Cost·Value panel:** selected cost vs "full-margin" cost; priority slider trades cost for margin (95 % → 70 % utilization target).
- **Presets:** Port 0-wave / Open sea / Inshore light / Onshore static.
- **Verified:** port preset reproduces Ginton (63.9° / 60.4°, H 7.93/7.12, ΔH 0.81). JS syntax clean, sliders fixed.
- **Caveats:** prices are an **indicative model** (one array per component — swap for real quotes); coplanar/CoG-balance load split is a mockup-level approximation.

---

## 6. Open items / next steps

**Awaiting Shimon:** final sign-off on REV 5; reaction to the mockup (pursue as the real product?).

**Teed up (Avshi's call):**
1. Wire mockup **Export** → emit the REV-format assembly PDF from live inputs.
2. Replace indicative prices with **real SpanSet / Crosby-Gunnebo** tables.
3. Add **back-solve** (target angle or min hook clearance → required sling lengths).
4. Save / compare configurations (port vs open-sea, same vessel).
5. Confirm master-link MBL (5:1) against Crosby cert.
6. Port to Next.js when ready (component ladders → data files; geometry engine is already worked out).

---

## 7. Conventions for this project

- File naming: `name_DDMMYYYY.ext`. UI Hebrew RTL; technical tokens (WLL/MBL/DAF/part numbers) stay Latin. Correspondence English.
- Drawings: English-primary (marine norm) + Hebrew summary; Shimon's symbols (CG, LA/LF, L.B.E, BF, BA, ΔH).
- Drawing generators live in `/home/claude/work` (gen.py … gen8.py); SVG built programmatically, PDF via cairosvg with python-bidi for correct Hebrew RTL.

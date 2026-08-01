# Product overview

## One-liner

**Starlink Edu** is a public education site that teaches how Starlink-style **LEO mega-constellations** work—from Internet fundamentals to end-to-end connectivity—through calm page-by-page lessons, a guided 3D lab, and (planned) optional Python code-alongs.

## Positioning

| Attribute | Choice |
|-----------|--------|
| Category | Public education / interactive explainer |
| Primary case study | Starlink-style LEO broadband |
| Differentiation | Coupled **curriculum + simulation** (not a blog post or a bare globe demo) |
| Affiliation | **Not** affiliated with SpaceX; no reverse-engineering of proprietary algorithms |
| Monetization (current) | None — educational project |

## Target learner

| Attribute | Assumption |
|-----------|------------|
| Space background | **None** required |
| Technical baseline | Comfortable with **algebra + basic trig**; software-curious / technical adult |
| Motivation | Understand the system deeply enough to explain it; optionally practice quantitative models in Python |
| Session shape | Self-paced; ~60–90 min for core path overview; deeper if they open Advanced, lab, and code-alongs |
| Device | Desktop-first for 3D lab; lessons should remain readable on mobile |

## Product pillars

1. **Conceptual main path** — Calm, page-sized lessons. Minimal scroll. Next/Previous. Quizzes and visuals.  
2. **Flagship 3D lab** — Parametric constellation; coverage, user link, handoffs, plain-language status, guided coach.  
3. **Grounded sources** — Primary/high-quality links (MDN, ESA, Starlink public docs, McDowell, etc.).  
4. **Optional quantitative practice** — Python code-alongs that re-express the same models (~15 min), plus rare deeper projects.  
5. **Trust** — Explicit model assumptions; no proprietary claims; time-sensitive numbers dated and linked.

## Success criteria (v1 identity)

A technical learner with no space background can:

1. Explain LEO vs GEO latency in their own words.  
2. Define planes, shells, handoffs, gateways at a basic level.  
3. In the lab, reduce density until coverage breaks and say *why*.  
4. Change altitude and correctly predict direction of change for period / light-time.  
5. Trust the site because assumptions and sources are visible.

A visitor who only uses the lab for two minutes should feel: *“This is a constrained engineered system, not magic.”*

## Non-goals (current)

- Backend auth, LMS, certificates (may come later; design progress adapters for swap-in).  
- Live Starlink TLE fidelity as the default teaching model.  
- Full RF link budgets / weather products.  
- Reverse-engineering proprietary Starlink scheduling/routing.  
- Turning the product into a general Python course.  
- VR/AR, multiplayer classroom dashboards (unless demand appears later).

## Brand & UX stance

- **Visual:** Tesla / Starlink-inspired — **white primary**, black type, thin borders; optional dark mode for reading.  
- **Landing:** Full-bleed photographic sections (Starlink.com energy).  
- **Lessons:** Sparse chrome, sidebar outline, module jump menu, sticky next.  
- **Lab:** Powerful but taught — first-run coach, status strip, experiments, quick tips.  
- **Tone:** Precise, adult, non-condescending; Advanced sections collapsed by default.

## Related docs

- Curriculum details → [CURRICULUM.md](./CURRICULUM.md)  
- Code-along strategy → [CODE_ALONGS.md](./CODE_ALONGS.md)  
- Roadmap → [ROADMAP.md](./ROADMAP.md)  
- Locked decisions → [DECISIONS.md](./DECISIONS.md)

# Content guide

How to write and edit educational content for Starlink Edu.

## Voice

- Adult, precise, calm.  
- Technical without requiring space background.  
- Prefer concrete numbers with units and sources over vague marketing.  
- Prefer “problem class” over “this is exactly how Starlink’s secret sauce works.”

## Page length

- Aim for **one viewport of reading** + at most **one primary interactive**.  
- If a page needs three big widgets, split into more pages in `curriculum.ts` + `lessonPages.tsx`.  
- Quizzes belong on their own page or the last page of a module when possible.

## Structure for a new page

1. Add page metadata to `src/content/curriculum.ts` (`id`, `title`, `navLabel`).  
2. Add body under key `` `${slug}/${pageId}` `` in `src/content/lessonPages.tsx`.  
3. Wire any new interactive under `src/ui/interactives/`.  
4. Add glossary terms if you introduce new vocabulary.  
5. Add sources to `sources.ts` and cite with `InlineSource` / `FurtherReading`.

## Sources

| Prefer | Avoid |
|--------|-------|
| Official docs, ESA/NASA, MDN, peer-adjacent primers, McDowell | Random blogs without citations |
| Dated constellation stats | Eternal “there are N satellites” without a date |
| Public FCC/regulatory summaries | Speculative reverse-engineering |

## Science honesty

Always consistent with lab assumptions unless a page explicitly upgrades the model:

- Circular orbits, constant altitude  
- Spherical Earth, geometric elevation mask  
- Parametric constellation generator  
- Not full RF / weather / J2 unless labeled Advanced and scoped  

## Code-along content (when added)

- Time label on every exercise.  
- Predict-before-run prompt for tinker exercises.  
- Same constants as `src/sim/constants.ts`.  
- Solution available without shame.  
- Mark **Optional** clearly; never block lesson Next.

## UI components for lessons

| Component | Use |
|-----------|-----|
| `Objectives` | 2–4 “on this page” bullets |
| `Callout` | Key bridge, warning, lab tip |
| `Advanced` | Collapsed math/physics |
| `Quiz` | Intuition checks |
| `FurtherReading` | Curated links |
| `InlineSource` | Inline citation-style links |
| `LabButton` | Deep-link to `/simulate?...` |
| Interactives | Diagrams, calculators, mini-sims, video |

## Accessibility

- Don’t rely on color alone for Online/Offline.  
- Videos need captions when we control them; third-party YouTube depends on the source.  
- Interactive controls need labels (sliders, search).

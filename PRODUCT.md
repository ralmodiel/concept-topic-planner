# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Students and researchers** choosing and sizing a topic for a systematic or scoping review,
  before they commit to it. They come back as the search and screening numbers come in.
- **Advisers** discussing a topic with them, who read the plan's Word file.

## Product Purpose

Shape a systematic-review topic on the PRISMA 2020 statement: the question from its parts, the
criteria, the search string, a log of what each source found, the PRISMA 2020 flow and a verdict
on whether the topic is too narrow, workable, or too large for one person. Success: students who
commit to a topic they can finish, with a plan they can show their adviser.

## Positioning

Everything runs in the visitor's browser: the plan never leaves their device. It follows the
published PRISMA 2020 checklists, not generic writing advice.

## Operating Context

- The site is a static app on GitHub Pages: no backend, database or APIs.
- Nothing is searched for the visitor: the "Open search" links take the search string to each
  database, and the visitor brings the counts back.

## Capabilities and Constraints

- Five steps: Question, Criteria, Search, Screen, Plan. Question frames PICO, PICo, PEO and PCC;
  the search string plain and in PubMed's, Scopus's and Web of Science's syntax; the PRISMA 2020
  flow and a verdict on the topic's size with the hours of work it holds; points to where
  published reviews are listed; the PRISMA 2020 checklists in their published words (Page et al.,
  2021, CC BY 4.0, always credited); the plan as a Word file.
- Up to three candidate topics, kept in the browser only, each savable as a file.
- Optional suggestions from a small language model (Qwen2.5-0.5B-Instruct, Apache-2.0) run in the
  browser (WebGPU), fetched from Hugging Face only when the visitor turns it on; it never sends
  what they type anywhere.
- Only free-of-cost, open-source libraries (MIT, Apache-2.0, BSD, ISC and the like).

## Brand Commitments

- Paper and ink, maroon, forest and gold, Instrument Serif and Instrument Sans, light and dark.
- Text wordmark only.
- State prominently and in several places: an unofficial proof of concept in beta testing; built
  diligently and meticulously with AI but it can still make mistakes, so results need human
  verification.

## Evidence on Hand

- No testimonials, usage numbers or endorsements exist; none may be invented.

## Product Principles

1. PRISMA 2020 is the authority: show its checklists in their own words, always credited.
2. Arithmetic, not guesses: the flow and verdict follow from the numbers entered.
3. Be honest about certainty: AI suggestions are chips to take or leave, never written in.
4. Private by construction: nothing about a plan leaves the device.

## Accessibility & Inclusion

WCAG 2.2 AA in both themes; statuses never by colour alone; full keyboard use; works on phones;
respects reduced motion.

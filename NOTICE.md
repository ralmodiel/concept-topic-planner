# Notices

## Unofficial proof of concept

This project is an unofficial, non-commercial proof of concept in its beta testing stage. It is
not affiliated with or endorsed by any university, journal or program.

## Results need human verification

The planner was built diligently and meticulously with the help of AI, but it can still make
mistakes. Its flow and verdict are arithmetic on the numbers the visitor enters, and the
suggestions of its optional AI helper are guesses from a small model. Every result needs human
verification; the visitor's adviser has the final say on a topic.

The software is provided "as is", without warranty of any kind, as stated in the
[MIT License](LICENSE).

## Privacy

Plans are never submitted to any server. The site keeps only the visitor's theme choice (light or
dark) and their planner entries (up to three candidate topics), in their own browser; a plan saved
as a file or downloaded as Word is written to the visitor's device. The site has no accounts,
cookies or analytics. Like any website, its host (GitHub Pages) receives the ordinary requests for
the pages themselves, such as the visitor's IP address; plans are never part of them. An "Open
search" link, when the visitor follows it, carries the search string to that database. The
optional AI helper, only when the visitor turns it on, fetches a language model from Hugging Face
(huggingface.co) and runs it in the browser; what the visitor types goes to that model on their
own device and nowhere else.

## Source code

The source code of this project is licensed under the [MIT License](LICENSE). That license
covers the code only, not the materials described below.

## PRISMA 2020

The planner reproduces the PRISMA 2020 checklist and the PRISMA 2020 for Abstracts checklist
(in `src/topic/prisma.ts`), from: Page MJ, McKenzie JE, Bossuyt PM, Boutron I, Hoffmann TC, Mulrow
CD, et al. The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. BMJ
2021;372:n71. doi:10.1136/bmj.n71. The checklists are distributed under the Creative Commons
Attribution 4.0 licence (CC BY 4.0, https://creativecommons.org/licenses/by/4.0/), which permits
their reproduction with attribution; the planner credits them wherever they appear and links the
PRISMA website ([prisma-statement.org](https://www.prisma-statement.org/)) for the checklist, the
flow diagram templates and the PRISMA extensions. The planner carries the statement PRISMA asks of
those who endorse it. PRISMA and the PRISMA Executive have not reviewed or endorsed this site.

## Third-party software and fonts

The site bundles open-source libraries (React, fflate, Transformers.js, ONNX Runtime Web and their
dependencies) under the MIT, Apache-2.0 and BSD licenses, and the Instrument Sans and Instrument
Serif fonts under the SIL Open Font License 1.1. Full texts: `public/THIRD_PARTY_LICENSES.txt`.

The planner's optional language model, Qwen2.5-0.5B-Instruct (Qwen team, Alibaba Cloud;
Apache-2.0), in the ONNX conversion published by the onnx-community on Hugging Face, is not
bundled: the visitor's browser fetches it from Hugging Face only after they turn the helper on,
at a fixed revision of the model's files (the commit named in `src/topic/ai.ts`, the one that was
tested), and lets it go again when they turn the helper off.

// Questions a first-time visitor asks: is it official, what the planner does and what its AI
// helper is, where the plan goes, whether it can be wrong, and who it is for. The first answer is
// the full notice.
import { NOTICE, PRIVATE_BODY, PRIVATE_HEAD } from '../notice'
import { ChevronDownIcon } from './icons'

const QA: { id?: string; q: string; a: React.ReactNode; open?: boolean }[] = [
  {
    id: 'about',
    q: 'Is this an official tool?',
    open: true,
    a: <p>{NOTICE}</p>,
  },
  {
    id: 'faq-topic',
    q: 'What does the Topic Planner do?',
    a: (
      <>
        <p>
          It helps you choose and size a topic for a systematic or scoping review before you commit
          to it. You write your question from its parts (a PICO, PICo, PEO or PCC frame), set the
          criteria, build the search string, log what each source found, and enter the screening
          numbers. The planner draws the PRISMA 2020 flow from those numbers and says whether the
          topic looks too narrow, workable, or too large for one person.
        </p>
        <p>
          The PRISMA 2020 checklists it shows are the published ones (Page et al., 2021, CC BY 4.0).
          Nothing is searched for you: the “Open search” links take your search string to each
          database (Google Scholar, ERIC, PubMed and others), and you bring the counts back. It also
          points you to where published reviews are listed, so you see whether your question has
          been answered already.
        </p>
        <p>
          Weighing more than one idea? Keep up to three candidate topics side by side and compare
          their size. The plans stay in this browser only; you can save a copy as a file to open on
          another device, and download any plan as a Word file to discuss with your adviser.
        </p>
        <p>
          It follows the PRISMA 2020 statement, as PRISMA asks of those who endorse it: when you
          report a systematic review or meta-analysis, complete the PRISMA checklist and include a
          PRISMA flow diagram. The templates, and the PRISMA extensions for other kinds of review (a
          scoping review reports with PRISMA-ScR), are on{' '}
          <a
            href="https://www.prisma-statement.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:decoration-2"
          >
            prisma-statement.org
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'faq-ai',
    q: 'What is the AI helper in the Topic Planner?',
    a: (
      <>
        <p>
          An optional helper, off until you turn it on. It is a small language model,
          Qwen2.5-0.5B-Instruct (about 790 MB, fetched once from Hugging Face and kept in your
          browser), that runs on your own device’s graphics chip, so what you type never leaves your
          device. It reads your sentence into the parts of the question, offers other words for the
          search and suggests titles for the review; each suggestion is a chip you take or leave.
        </p>
        <p>
          It needs WebGPU, which a recent Chrome, Edge or Firefox, or Safari 26 or newer, provides
          on a computer with a capable graphics chip; where it is not available, the planner says so
          and works without it. Its suggestions can be wrong, and the planner is complete without
          them. Turn it off when you are done, and the memory it took is freed.
        </p>
      </>
    ),
  },
  {
    q: 'Is my plan sent anywhere?',
    a: (
      <>
        <p>
          <strong className="font-semibold text-ink">No. {PRIVATE_HEAD}</strong> {PRIVATE_BODY}
        </p>
        <p>
          This site is a set of static pages with no server of its own to receive anything. Its
          security policy lets the page's scripts reach only this site itself and Hugging Face, the
          host of the optional model, which is fetched only when you turn that helper on.
        </p>
        <p>
          Like any website, its host (GitHub Pages) receives the ordinary requests for the pages
          themselves, such as your IP address; your plan is never part of them. Two things leave
          your browser only when you choose them: an “Open search” link carries your search string
          to that database, and turning the AI helper on fetches the model from Hugging Face, which
          then sees your IP address, as any download does.
        </p>
      </>
    ),
  },
  {
    q: 'Can the planner be wrong?',
    a: (
      <>
        <p>
          Yes. It is in beta testing and was built diligently and meticulously with the help of AI,
          but a program is not a person. Treat every result as a guide and check it yourself.
        </p>
        <p>
          The planner’s flow and verdict are arithmetic on the numbers you bring back, so they are
          only as right as your counts, and whether a topic is workable also depends on your time,
          your access to the databases and your adviser’s view. The suggestions of its optional AI
          helper are guesses from a small model and can be wrong; nothing enters your plan until you
          choose it.
        </p>
      </>
    ),
  },
  {
    q: 'Does it suit my field?',
    a: (
      <p>
        It suits any program in which a systematic or scoping review is an accepted form of thesis,
        dissertation or project; PRISMA 2020 is written for reviews in any field. Ask your adviser
        whether it is accepted in yours.
      </p>
    ),
  },
  {
    q: 'Who is it for?',
    a: (
      <p>
        Students and researchers still choosing and sizing a review topic, and the advisers they
        discuss it with: the plan’s Word file sets out the question, criteria, search and numbers
        for that talk.
      </p>
    ),
  },
]

export default function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-t border-line py-12"
      data-print="hide"
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <h2 id="faq-title" className="font-display text-3xl text-ink lg:col-span-4">
          Questions
        </h2>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {QA.map((x) => (
            <details key={x.q} id={x.id} open={x.open} className="group scroll-mt-28">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {x.q}
                <ChevronDownIcon className="size-5 shrink-0 text-ink-3 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="space-y-3 pb-5 text-[0.9375rem] leading-relaxed text-ink-2">
                {x.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

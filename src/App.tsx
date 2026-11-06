// The page: header and notice, the Topic planner, its questions and the footer.
import { Component, type ReactNode } from 'react'
import { clearPlans } from './topic/store'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Header from './components/Header'
import Topic from './components/Topic'

// The planner draws on a plan kept in this browser. Should a saved plan ever break its render, the
// rest of the page stays up and the student can let the plans go, instead of a blank site that
// comes back blank on every visit.
class TopicBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (!this.state.failed) return this.props.children
    return (
      <p role="alert" className="py-10 text-sm leading-relaxed text-ink-2">
        The Topic planner could not be shown.{' '}
        <button
          type="button"
          onClick={() => {
            clearPlans()
            location.reload()
          }}
          className="cursor-pointer font-semibold text-maroon underline underline-offset-2"
        >
          Start over
        </button>{' '}
        clears the plans kept in this browser and opens the page again.
      </p>
    )
  }
}

export default function App() {
  return (
    <div id="top" className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-pill bg-action px-4 py-2 font-semibold text-on-action focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-(--gutter) pt-6">
        <TopicBoundary>
          <Topic />
        </TopicBoundary>
        <Faq />
      </main>
      <Footer />
    </div>
  )
}

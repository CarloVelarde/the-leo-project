import { useMemo, useState } from 'react'

export type QuizOption = {
  id: string
  label: string
  correct?: boolean
}

export type QuizQuestion = {
  id: string
  prompt: string
  options: QuizOption[]
  explanation: string
}

type QuizProps = {
  title?: string
  questions: QuizQuestion[]
}

/**
 * Interactive intuition check — click options, get immediate feedback + explanation.
 */
export function Quiz({ title = 'Check your intuition', questions }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})

  const score = useMemo(() => {
    let correct = 0
    let answered = 0
    for (const q of questions) {
      const pick = answers[q.id]
      if (!pick || !revealed[q.id]) continue
      answered += 1
      const opt = q.options.find((o) => o.id === pick)
      if (opt?.correct) correct += 1
    }
    return { correct, answered, total: questions.length }
  }, [answers, revealed, questions])

  return (
    <section className="my-8 rounded-xl border border-space-600 bg-space-900/80 p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <h3 className="text-sm font-semibold tracking-widest text-accent uppercase">{title}</h3>
        {score.answered > 0 ? (
          <p className="font-mono text-xs text-slate-400">
            {score.correct}/{score.answered} correct
            {score.answered === score.total ? ' · done' : ''}
          </p>
        ) : null}
      </div>

      <div className="space-y-6">
        {questions.map((q, qi) => {
          const picked = answers[q.id]
          const show = revealed[q.id]
          const pickedOpt = q.options.find((o) => o.id === picked)
          const isCorrect = Boolean(pickedOpt?.correct)

          return (
            <div key={q.id} className="border-t border-space-800 pt-4 first:border-t-0 first:pt-0">
              <p className="mb-3 text-sm font-medium text-slate-100">
                <span className="mr-2 text-slate-500">{qi + 1}.</span>
                {q.prompt}
              </p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt) => {
                  const selected = picked === opt.id
                  let style =
                    'border-space-700 bg-space-950/50 text-slate-300 hover:border-accent/50'
                  if (show && selected && opt.correct) {
                    style = 'border-signal/60 bg-signal/10 text-signal'
                  } else if (show && selected && !opt.correct) {
                    style = 'border-warn/60 bg-warn/10 text-warn'
                  } else if (show && opt.correct) {
                    style = 'border-signal/40 bg-signal/5 text-slate-200'
                  } else if (selected) {
                    style = 'border-accent bg-accent/10 text-white'
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={show}
                      onClick={() => {
                        setAnswers((a) => ({ ...a, [q.id]: opt.id }))
                        setRevealed((r) => ({ ...r, [q.id]: true }))
                      }}
                      className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors disabled:cursor-default ${style}`}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>
              {show ? (
                <p
                  className={`mt-3 text-sm leading-relaxed ${isCorrect ? 'text-signal' : 'text-slate-400'}`}
                >
                  <span className="font-semibold text-slate-200">
                    {isCorrect ? 'Correct. ' : 'Not quite. '}
                  </span>
                  {q.explanation}
                </p>
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}

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
    <section className="my-6 rounded-lg border border-line bg-paper px-5 py-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <h3 className="text-[10px] font-semibold tracking-[0.2em] text-ink-faint uppercase">
          {title}
        </h3>
        {score.answered > 0 ? (
          <p className="font-mono text-xs text-ink-faint">
            {score.correct}/{score.answered} correct
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
            <div key={q.id} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
              <p className="mb-3 text-sm font-medium text-ink">
                <span className="mr-2 text-ink-faint">{qi + 1}.</span>
                {q.prompt}
              </p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt) => {
                  const selected = picked === opt.id
                  let style = 'border-line bg-paper text-ink-muted hover:border-ink'
                  if (show && selected && opt.correct) {
                    style = 'border-ink bg-paper-elevated text-ink'
                  } else if (show && selected && !opt.correct) {
                    style = 'border-warn/50 text-warn'
                  } else if (show && opt.correct) {
                    style = 'border-ink/40 text-ink'
                  } else if (selected) {
                    style = 'border-ink bg-paper-elevated text-ink'
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
                      className={`rounded-md border px-3 py-2.5 text-left text-sm transition-colors disabled:cursor-default ${style}`}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>
              {show ? (
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  <span className="font-semibold text-ink">
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

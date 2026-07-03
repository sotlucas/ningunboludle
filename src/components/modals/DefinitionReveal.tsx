import { solution, definition } from '../../lib/words'

export const DefinitionReveal = () => {
  return (
    <div className="rounded-2xl border border-border-soft bg-surface p-4 text-center">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        definición
      </h4>
      <p className="mt-1 text-sm text-ink-soft">
        <strong className="font-display text-lg text-ink">{solution}</strong>
        {' — '}
        {definition.definition}
      </p>
    </div>
  )
}

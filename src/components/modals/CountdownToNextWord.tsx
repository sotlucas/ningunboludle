import Countdown from 'react-countdown'
import { tomorrow } from '../../lib/words'
import { NEW_WORD_TEXT } from '../../constants/strings'

export const CountdownToNextWord = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {NEW_WORD_TEXT}
      </span>
      <Countdown
        className="font-mono text-lg font-medium text-ink"
        date={tomorrow}
        daysInHours={true}
      />
    </div>
  )
}

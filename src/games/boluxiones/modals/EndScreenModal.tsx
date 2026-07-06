import { useEffect, useState } from 'react'
import { BaseModal } from '../../../components/modals/BaseModal'
import { useTime } from '../hooks'
import type { EmojiRepresentation } from '../share'
import { getPuzzleNumber, shareStatus } from '../share'
import { Button } from '../components/Button'

type Props = {
  isOpen: boolean
  handleClose: () => void
  emojiRepresentation: EmojiRepresentation
  gameWon: boolean
  onShare: () => void
}

type Time = {
  hours: number
  minutes: number
  seconds: number
}

function getTitleText(won: boolean) {
  return won
    ? 'Sos un verdadero argentino! 🧉'
    : 'Estás seguro de que sos argentino?'
}

export const EndScreenModal = ({
  isOpen,
  handleClose,
  emojiRepresentation,
  gameWon,
  onShare,
}: Props) => {
  const timeLeft = useTimeUntilMidnight()

  const title = getTitleText(gameWon)
  return (
    <BaseModal title={title} isOpen={isOpen} handleClose={handleClose}>
      <div className="flex flex-col gap-4 items-center text-ink-soft">
        <p className="font-semibold text-ink">{`Conexiones Argentinas #${getPuzzleNumber()}`}</p>

        <EmojiGrid emojiRepresentation={emojiRepresentation} />
        <div className="text-center">
          <div className="text-xs uppercase tracking-wide text-ink-muted">
            Próximo Conexiones en
          </div>
          <div className="font-mono text-2xl font-medium text-ink">
            {formatTime(timeLeft)}
          </div>
        </div>

        <Button
          onSubmit={() => {
            shareStatus(emojiRepresentation, onShare)
          }}
          label="Copiar resultado"
          active
          timeoutAfterClick={0}
          filled
        />
      </div>
    </BaseModal>
  )
}

function EmojiGrid({
  emojiRepresentation,
}: {
  emojiRepresentation: EmojiRepresentation
}) {
  return (
    <div className="flex flex-col items-center text-2xl">
      {emojiRepresentation.map((row, i) => (
        <div className="flex" key={i}>
          {row.map((emoji, j) => (
            <div key={j}>{emoji}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, '0')

function getTimeUntilMidnight(now: Date) {
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)

  let seconds = (midnight.getTime() - now.getTime()) / 1000
  const hours = Math.floor(seconds / 60 / 60)
  seconds -= hours * 60 * 60
  const minutes = Math.floor(seconds / 60)
  seconds -= minutes * 60
  seconds = Math.floor(seconds)
  return {
    hours,
    minutes,
    seconds,
  }
}

function useTimeUntilMidnight() {
  const t = useTime(100)
  const [time, setTime] = useState<Time>()
  useEffect(() => {
    setTime(getTimeUntilMidnight(new Date()))
  }, [t])

  return time
}

function formatTime(time: Time | undefined) {
  if (!time) return ''

  return `${zeroPad(time.hours, 2)}:${zeroPad(time.minutes, 2)}:${zeroPad(
    time.seconds,
    2
  )}`
}

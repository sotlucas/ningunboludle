const BUILD_TIMESTAMP = import.meta.env.VITE_BUILD_TIMESTAMP ?? 'unknown'

export default function BuildInfo() {
  return (
    <div className="p-6 font-mono text-sm text-ink">
      <p>Timestamp: {BUILD_TIMESTAMP}</p>
    </div>
  )
}

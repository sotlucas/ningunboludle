const BUILD_TIMESTAMP = process.env.REACT_APP_BUILD_TIMESTAMP ?? 'unknown'

export default function BuildInfo() {
  return (
    <div>
      <p>Timestamp: {BUILD_TIMESTAMP}</p>
    </div>
  )
}
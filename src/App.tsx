import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GamePage from './GamePage'
import BuildInfo from './components/dev/BuildInfo'

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/build/info" element={<BuildInfo />} />
        <Route path="/" element={<GamePage />} />
        <Route path="*" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

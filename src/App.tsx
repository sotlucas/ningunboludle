import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import GamePage from './GamePage'
import BoluxionesApp from './games/boluxiones/BoluxionesApp'
import BuildInfo from './components/dev/BuildInfo'

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/build/info" element={<BuildInfo />} />
        <Route path="/" element={<Home />} />
        <Route path="/boludle" element={<GamePage />} />
        <Route path="/conexiones" element={<BoluxionesApp />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Boludle from './Boludle'
import BuildInfo from './components/dev/BuildInfo'

function App() {

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/build/info" element={<BuildInfo />} />
        <Route path="/" element={<Boludle />} />
        <Route path="*" element={<Boludle />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App

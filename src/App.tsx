import './App.css'
import Boludle from './Boludle'
import { AlertProvider } from './context/AlertContext'


function App() {

  return (
    <AlertProvider>
        <Boludle />
    </AlertProvider>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CheckPage from './pages/CheckPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/check" element={<CheckPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
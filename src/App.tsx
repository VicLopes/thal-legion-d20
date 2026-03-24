import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { CharacterCreation } from './pages/character-creation/CharacterCreation'
import { CharacterDetails } from './pages/character-details/CharacterDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CharacterCreation />} />
      <Route path="/character/:id" element={<CharacterDetails />} />
    </Routes>
  )
}

export default App

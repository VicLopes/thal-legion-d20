import { Route, Routes, useNavigate } from 'react-router-dom'
import { CharacterCreation } from './pages/character-creation/CharacterCreation'
import { CharacterDetails } from './pages/character-details/CharacterDetails'

function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => { void navigate('/create') }}>New Character</button>
      <button onClick={() => { void navigate('/character/1') }}>View Character</button>
    </div>
  )
}

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

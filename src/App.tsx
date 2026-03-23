import { Route, Routes, useNavigate } from 'react-router-dom'
import { CharacterCreation } from './pages/character-creation/CharacterCreation'
import { CharacterDetails } from './pages/character-details/CharacterDetails'
import { Button } from '@/components/ui/button'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <Button size="lg" onClick={() => { void navigate('/create') }}>New Character</Button>
      <Button size="lg" variant="outline" onClick={() => { void navigate('/character/1') }}>View Character</Button>
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

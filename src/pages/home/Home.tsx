import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Home() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <Button size="lg" onClick={() => { void navigate('/create') }}>New Character</Button>
      <Button size="lg" variant="outline" onClick={() => { void navigate('/character/1') }}>Import Character</Button>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useCharacters } from '@/hooks/useCharacters'
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item'
import { Trash, User } from 'lucide-react'

export function Home() {
  const { characters, addCharacter, removeCharacter } = useCharacters()
  const navigate = useNavigate()
  const [importOpen, setImportOpen] = useState(false)
  const [json, setJson] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleImport() {
    try {
      const parsed: unknown = JSON.parse(json)
      if (
        typeof parsed !== 'object' || parsed === null ||
        !('sheet' in parsed) || !('charProperties' in parsed) || !('hp' in parsed)
      ) {
        setError('Invalid character JSON.')
        return
      }
      const { sheet, charProperties, hp } = parsed as Parameters<typeof addCharacter>[0]
      addCharacter({ sheet, charProperties, hp })
      setImportOpen(false)
      setJson('')
      setError(null)
    } catch {
      setError('Could not parse JSON. Make sure it is valid.')
    }
  }

  const importDialog = (
    <Dialog open={importOpen} onOpenChange={open => { setImportOpen(open); if (!open) { setJson(''); setError(null) } }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Import Character</DialogTitle>
        </DialogHeader>
        <Textarea
          rows={14}
          placeholder='Paste exported character JSON here...'
          value={json}
          onChange={e => { setJson(e.target.value); setError(null) }}
          className="resize-none font-mono text-xs"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button onClick={handleImport} disabled={json.trim() === ''}>Import</Button>
      </DialogContent>
    </Dialog>
  )

  if (characters.length === 0) {
    return (
      <>
        {importDialog}
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
          <Button size="lg" onClick={() => { void navigate('/create') }}>New Character</Button>
          <Button size="lg" variant="outline" onClick={() => setImportOpen(true)}>Import Character</Button>
        </div>
      </>
    )
  }

  return (
    <>
      {importDialog}
      <div className="flex h-screen w-full flex-col items-center justify-center p-8">
        <div className="flex w-full max-w-xl flex-col gap-4">
          <ItemGroup>
            {characters.map(char => (
              <Item key={char.id} variant='outline'>
                <ItemMedia variant='icon'>
                  <User />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{char.sheet.name}</ItemTitle>
                  <ItemDescription>{char.sheet.race} &mdash; {char.sheet.class?.name} ({char.sheet.class?.role?.roleName})</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button variant='secondary' onClick={() => { void navigate(`/character/${char.id}`) }}>View</Button>
                  <Button variant='destructive' size='icon' onClick={() => { removeCharacter(char.id) }}><Trash /></Button>
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
          <div className="flex justify-end gap-2">
            <Button variant='outline' onClick={() => setImportOpen(true)}>Import Character</Button>
            <Button onClick={() => { void navigate('/create') }}>New Character</Button>
          </div>
        </div>
      </div>
    </>
  )
}

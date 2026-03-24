import { useParams } from 'react-router-dom'
import { useCharacters } from '../../hooks/useCharacters'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { STAT_KEYS, STAT_LABELS, CHAR_PROPERTY_KEYS, CHAR_PROPERTY_LABELS } from '../character-creation/constants'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

function formatVal(val: number) {
  return val > 0 ? `+${val}` : `${val}`
}

export function CharacterDetails() {
  const [pendingChanges, setPendingChanges] = useState(false)
  const { id } = useParams<{ id: string }>()
  const { characters } = useCharacters()
  const character = characters.find(c => c.id === id)

  if (!character) {
    return <div className="p-6"><p className="text-muted-foreground">Character not found.</p></div>
  }

  const { sheet, charProperties, hp } = character

  return (
    <div className="flex flex-col items-center p-6 gap-4">
      <div className="w-full max-w-lg justify-between flex-row flex">
        <div>
          <h2 className="text-xl font-bold">{sheet.name}</h2>
          <p className="text-sm text-muted-foreground">
            {sheet.race} &mdash; {sheet.class?.name} ({sheet.class?.role?.roleName})
          </p>
        </div>
        <Button onClick={() => console.log('save changes')} disabled={!pendingChanges}>
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="details" className="w-full max-w-lg">
        <TabsList className="w-full">
          <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
          <TabsTrigger value="inventory" className="flex-1">Inventory</TabsTrigger>
          <TabsTrigger value="notes" className="flex-1">Notes</TabsTrigger>
        </TabsList>

        {/* DETAILS TAB */}
        <TabsContent value="details" className="space-y-4">
          <section className="flex items-center gap-3">
            <span className="text-sm font-medium">HP</span>
            <span className="text-lg font-bold">{hp}</span>
          </section>

          {sheet.stats && (
            <section className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Stats</p>
              {STAT_KEYS.filter(k => sheet.stats![k] > 0).map(key => (
                <div key={key} className="flex justify-between text-sm">
                  <span>{STAT_LABELS[key]}</span>
                  <span className="font-medium">{sheet.stats![key]}</span>
                </div>
              ))}
            </section>
          )}

          <section className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Properties</p>
            {CHAR_PROPERTY_KEYS.map(key => {
              const val = charProperties[key] as number
              if (val === 0) return null
              return (
                <div key={key} className="flex justify-between text-sm">
                  <span>{CHAR_PROPERTY_LABELS[key]}</span>
                  <span className="font-medium">{formatVal(val)}</span>
                </div>
              )
            })}
          </section>

          {(charProperties.bonus?.length ?? 0) > 0 && (
            <section className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Passives</p>
              <ul className="space-y-0.5">
                {charProperties.bonus!.map((b, i) => (
                  <li key={i} className="text-sm text-muted-foreground">{b}</li>
                ))}
              </ul>
            </section>
          )}

          {(sheet.abilities?.length ?? 0) > 0 && (
            <section className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Abilities</p>
              <ul className="space-y-0.5">
                {sheet.abilities!.map(a => (
                  <li key={a.name} className="text-sm font-medium">{a.name}</li>
                ))}
              </ul>
            </section>
          )}
        </TabsContent>

        {/* INVENTORY TAB */}
        <TabsContent value="inventory" className="space-y-4">
          <section className="flex gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Gold</span>
              <span className="text-lg font-bold">{sheet.gold ?? 0}</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" readOnly checked={sheet.signet ?? false} className="pointer-events-none" />
              <span className="text-sm font-medium">Signet Ring</span>
            </div>
          </section>

          <section className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Equipment</p>
            {(sheet.equipments?.length ?? 0) > 0 ? (
              <ul className="space-y-1">
                {sheet.equipments!.map((e, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span>{e.name}</span>
                    <span className="text-muted-foreground">{e.rarity}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No Equipment added.</p>
            )}
          </section>

          <section className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Consumables</p>
            {(sheet.consumables?.length ?? 0) > 0 ? (
              <ul className="space-y-2">
                {sheet.consumables!.map((c, i) => (
                  <li key={i}>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.effect}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No Consumables added.</p>
            )}
          </section>
        </TabsContent>

        {/* NOTES TAB */}
        <TabsContent value="notes" className="space-y-4">
          {sheet.bonus && Object.keys(sheet.bonus).length > 0 ? (
            <section className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Bonus Notes</p>
              {Object.entries(sheet.bonus).map(([label, val]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span>{label}</span>
                  <span className="font-medium">{formatVal(val)}</span>
                </div>
              ))}
            </section>
          ) : (
            <p className="text-sm text-muted-foreground">No notes recorded.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

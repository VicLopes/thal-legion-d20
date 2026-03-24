import { useState } from "react"
import type { Ability, CharacterSheet } from "../../../models/character.interface"
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import {
    Agile, AnkleBite, Assassination, BloodyInfusion, BrutalStrikes,
    Counter, CripplingDefense, DesperateMeasures, EternalCharge,
    ImprovedIntervene, MastersCall, Medic, MedicinalEnhancement,
    Mounted, Onslaught, Overpower, Precision, Recklessness, Rugged,
    ShadowsGambit, TacticalMind, ThalassianFortitude, Triage,
    VampiricVitality, VengefulBloodlust
} from "@/models/abilities"

const ALL_ABILITIES: Ability[] = [
    Overpower, Counter, Agile, Precision, ImprovedIntervene, Rugged,
    MastersCall, AnkleBite, Assassination, Mounted, BrutalStrikes,
    TacticalMind, Medic, ShadowsGambit, DesperateMeasures,
    ThalassianFortitude, Onslaught, VampiricVitality, VengefulBloodlust,
    CripplingDefense, Recklessness, Triage, BloodyInfusion,
    EternalCharge, MedicinalEnhancement
]

const MAX_PICKS = 4

interface AbilitiesProps {
    onNext: (data: Pick<CharacterSheet, 'abilities'>) => void
}

export function Abilities(props: AbilitiesProps) {
    const [selected, setSelected] = useState<Set<string>>(new Set())

    const toggle = (name: string) => {
        setSelected(prev => {
            const next = new Set(prev)
            if (next.has(name)) {
                next.delete(name)
            } else if (next.size < MAX_PICKS) {
                next.add(name)
            }
            return next
        })
    }

    const selectedAbilities = ALL_ABILITIES.filter(a => selected.has(a.name))

    return (
        <FieldSet className="w-full">
            <FieldLegend>Abilities</FieldLegend>

            <p className="text-sm text-muted-foreground">
                Pick up to <span className="font-semibold text-foreground">{MAX_PICKS}</span> abilities.{" "}
                <span className="font-semibold text-foreground">{selected.size}/{MAX_PICKS}</span> selected.
            </p>

            <FieldGroup>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {ALL_ABILITIES.map(ability => {
                        const isSelected = selected.has(ability.name)
                        const isDisabled = !isSelected && selected.size >= MAX_PICKS
                        return (
                            <button
                                key={ability.name}
                                type="button"
                                disabled={isDisabled}
                                onClick={() => toggle(ability.name)}
                                className={`rounded-md border p-3 text-left transition-colors ${
                                    isSelected
                                        ? 'border-primary bg-primary/10'
                                        : isDisabled
                                        ? 'cursor-not-allowed border-border opacity-40'
                                        : 'border-border hover:border-primary/50 hover:bg-muted'
                                }`}
                            >
                                <p className="text-sm font-medium">{ability.name}</p>
                                {ability.abilityBonus.bonus?.map((b, i) => (
                                    <p key={i} className="mt-0.5 text-xs text-muted-foreground">{b}</p>
                                ))}
                            </button>
                        )
                    })}
                </div>
            </FieldGroup>

            <FieldGroup>
                <Button
                    size="lg"
                    disabled={selected.size === 0}
                    onClick={() => props.onNext({ abilities: selectedAbilities })}
                >
                    Next Step
                </Button>
            </FieldGroup>
        </FieldSet>
    )
}
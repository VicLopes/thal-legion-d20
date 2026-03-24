import { useState } from "react";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import type { Stats, CharacterSheet } from "../../../models/character.interface";
import { Button } from "@/components/ui/button";

const TOTAL_POINTS = 5

const STAT_LABELS: Record<keyof Stats, string> = {
    stamina: 'Stamina',
    combat: 'Combat Proficiency',
    pockets: 'Extra Pockets',
    reflexes: 'Swift Reflexes',
    healer: 'Healer',
    stealth: 'Stealth',
    highRoller: 'High Roller',
}

const STAT_KEYS = Object.keys(STAT_LABELS) as (keyof Stats)[]

interface StatsProps {
    onNext: (data: Pick<CharacterSheet, 'stats'>) => void
}

export function Stats(props: StatsProps) {
    const [stats, setStats] = useState<Stats>({
        stamina: 0,
        combat: 0,
        pockets: 0,
        reflexes: 0,
        healer: 0,
        stealth: 0,
        highRoller: 0,
    })

    const spent = STAT_KEYS.reduce((sum, key) => sum + stats[key], 0)
    const remaining = TOTAL_POINTS - spent

    const add = (key: keyof Stats) => {
        if (remaining === 0) return
        setStats(s => ({ ...s, [key]: s[key] + 1 }))
    }

    const remove = (key: keyof Stats) => {
        if (stats[key] === 0) return
        setStats(s => ({ ...s, [key]: s[key] - 1 }))
    }

    return (
        <FieldSet className="w-full">
            <FieldLegend>Character Stats</FieldLegend>

            <p className="text-sm text-muted-foreground">
                Points remaining: <span className="font-semibold text-foreground">{remaining}</span>
            </p>

            <FieldGroup>
                {STAT_KEYS.map(key => (
                    <div key={key} className="flex items-center justify-between gap-4">
                        <span className="w-28 text-sm">{STAT_LABELS[key]}</span>
                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={stats[key] === 0}
                                onClick={() => remove(key)}
                            >
                                −
                            </Button>
                            <span className="w-4 text-center text-sm font-medium">{stats[key]}</span>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={remaining === 0}
                                onClick={() => add(key)}
                            >
                                +
                            </Button>
                        </div>
                    </div>
                ))}
            </FieldGroup>

            <FieldGroup>
                <Button
                    size="lg"
                    disabled={remaining > 0}
                    onClick={() => props.onNext({ stats })}
                >
                    Next Step
                </Button>
            </FieldGroup>
        </FieldSet>
    )
}

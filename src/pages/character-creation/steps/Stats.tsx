import { useState } from "react";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import type { Stats, CharacterSheet } from "../../../models/character.interface";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { STAT_LABELS, STAT_KEYS } from "../constants";

const TOTAL_POINTS = 5

const STAT_TOOLTIPS: Record<keyof Stats, string> = {
    stamina:    '+2 HP per point.',
    combat:     '+1 Damage Done per point.',
    pockets:    '+1 Inventory Slot per point.',
    reflexes:   '+1 to Environmental Rolls per point.',
    healer:     '+1 Healing Done per point.',
    stealth:    '+1 to Stealth Rolls per point.',
    highRoller: 'Rolls above 20 increase outgoing DMG/Healing by +1 per point.',
}

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
                <TooltipProvider>
                {STAT_KEYS.map(key => (
                    <div key={key} className="flex items-center justify-between gap-4">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="cursor-default text-sm underline decoration-dotted">{STAT_LABELS[key]}</span>
                            </TooltipTrigger>
                            <TooltipContent>{STAT_TOOLTIPS[key]}</TooltipContent>
                        </Tooltip>
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
                </TooltipProvider>
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

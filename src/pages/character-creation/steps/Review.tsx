import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { buildSheet } from "../buildSheet"
import type { PartialSheet } from "../reducer"
import { STAT_LABELS, STAT_KEYS, CHAR_PROPERTY_LABELS, CHAR_PROPERTY_KEYS } from "../constants"

interface ReviewProps {
    sheet: PartialSheet
    onFinish: () => void
}

function formatVal(val: number) {
    return val > 0 ? `+${val}` : `${val}`
}

export function Review(props: ReviewProps) {
    const { charProperties, hp } = buildSheet(props.sheet)
    const { sheet } = props

    return (
        <FieldSet className="w-full max-w-lg">
            <FieldLegend>Character Summary</FieldLegend>

            <FieldGroup>
                {/* Identity */}
                <section className="space-y-1">
                    <h3 className="text-base font-semibold">{sheet.name}</h3>
                    <p className="text-sm text-muted-foreground">{sheet.race} &mdash; {sheet.class?.name} ({sheet.class?.role?.roleName})</p>
                </section>

                {/* HP */}
                <section className="flex items-center gap-3">
                    <span className="text-sm font-medium">HP</span>
                    <span className="text-lg font-bold">{hp}</span>
                </section>

                {/* Stats */}
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

                {/* Properties */}
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

                {/* Passive bonuses */}
                {(charProperties.bonus?.length ?? 0) > 0 && (
                    <section className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Passives & Abilities</p>
                        <ul className="space-y-0.5">
                            {charProperties.bonus!.map((b, i) => (
                                <li key={i} className="text-sm text-muted-foreground">{b}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Abilities */}
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
            </FieldGroup>

            <FieldGroup>
                <Button size="lg" onClick={props.onFinish}>Finish</Button>
            </FieldGroup>
        </FieldSet>
    )
}
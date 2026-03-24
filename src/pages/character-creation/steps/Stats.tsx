import type { CharacterSheet } from "../../../models/character.interface"

interface StatsProps {
    onNext: (data: Pick<CharacterSheet, 'stats'>) => void
}

export function Stats(_props: StatsProps) {
    return (<div><p>Stats works!</p></div>)
}
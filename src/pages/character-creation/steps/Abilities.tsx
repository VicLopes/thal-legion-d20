import type { CharacterSheet } from "../../../models/character.interface"

interface AbilitiesProps {
    onNext: (data: Pick<CharacterSheet, 'name' | 'race'>) => void
}

export function Abilities(_props: AbilitiesProps) {
    return (<div><p>Abilities works!</p></div>)
}
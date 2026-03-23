import type { CharacterSheet } from "../../../models/character.interface";

interface BasicInfoProps {
    onNext: (data: Pick<CharacterSheet, 'name' | 'race'>) => void
}

export function BasicInfo(_props: BasicInfoProps) {
    return (<div><p>Basic Info works!</p></div>)
}
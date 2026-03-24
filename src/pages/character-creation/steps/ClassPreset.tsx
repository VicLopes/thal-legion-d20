import type { CharacterSheet } from "../../../models/character.interface"

interface ClassPresetProps {
    onNext: (data: Pick<CharacterSheet, 'class'>) => void
}

export function ClassPreset(_props: ClassPresetProps) {
    return (<div><p>Class Preset works!</p></div>)
}
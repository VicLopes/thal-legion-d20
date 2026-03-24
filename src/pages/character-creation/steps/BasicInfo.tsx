import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import type { CharacterSheet } from "../../../models/character.interface";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface BasicInfoProps {
    onNext: (data: Pick<CharacterSheet, 'name' | 'race'>) => void
}

export function BasicInfo(props: BasicInfoProps) {
    const [charData, setCharData] = useState<Pick<CharacterSheet, 'name' | 'race'>>({
        name: '',
        race: ''
    })

    return (<FieldSet className="w-full">
        <FieldLegend>Basic Info</FieldLegend>
        <FieldGroup>
            <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                    id="name"
                    autoComplete="off"
                    placeholder="Character Name"
                    value={charData.name}
                    onChange={(e) => setCharData(d => ({ ...d, name: e.target.value }))}
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="race">Race</FieldLabel>
                <Input
                    id="race"
                    autoComplete="off"
                    placeholder="Sin'dorei, Ren'dorei, Draenei, etc."
                    value={charData.race}
                    onChange={(e) => setCharData(d => ({ ...d, race: e.target.value }))}
                />
                <FieldDescription>The name of the race your character belongs to.</FieldDescription>
            </Field>
        </FieldGroup>
        <FieldGroup>
            <Button size="lg" onClick={() => props.onNext(charData)}>Next Step</Button>
        </FieldGroup>
    </FieldSet>)
}
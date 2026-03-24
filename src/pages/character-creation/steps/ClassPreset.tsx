import { useState } from "react"
import type { CharacterSheet, Class } from "../../../models/character.interface"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bulwark, Sentinel, Healer, PackRat, Duelist, Ranger, Magus, Rogue } from "@/models/roles";
import type { Role } from "@/models/character.interface";

const ROLES: Role[] = [Bulwark, Sentinel, Healer, PackRat, Duelist, Ranger, Magus, Rogue]

interface ClassPresetProps {
    onNext: (data: Pick<CharacterSheet, 'class'>) => void
}

export function ClassPreset(props: ClassPresetProps) {
    const [className, setClassName] = useState('')
    const [role, setRole] = useState<Role | null>(null)

    const canProceed = className.trim() !== '' && role !== null

    return (
        <FieldSet className="w-full">
            <FieldLegend>Class</FieldLegend>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="class-name">Class Name</FieldLabel>
                    <Input
                        id="class-name"
                        autoComplete="off"
                        placeholder="e.g. Shadow Blade, Holy Arbiter..."
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                    />
                    <FieldDescription>A custom name for your character's class.</FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="role">Role</FieldLabel>
                    <Select onValueChange={(value) => setRole(ROLES.find(r => r.roleName === value) ?? null)}>
                        <SelectTrigger id="role">
                            <SelectValue placeholder="Select a role..." />
                        </SelectTrigger>
                        <SelectContent>
                            {ROLES.map(r => (
                                <SelectItem key={r.roleName} value={r.roleName}>
                                    {r.roleName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FieldDescription>The role determines your character's passive bonuses.</FieldDescription>
                </Field>
            </FieldGroup>
            <FieldGroup>
                <Button
                    size="lg"
                    disabled={!canProceed}
                    onClick={() => props.onNext({ class: { name: className, role: role! } as Class })}
                >
                    Next Step
                </Button>
            </FieldGroup>
        </FieldSet>
    )
}
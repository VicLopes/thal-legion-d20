import { useReducer, useState } from "react"
import { characterReducer } from "./reducer"
import { BasicInfo } from "./steps/BasicInfo"
import { ClassPreset } from "./steps/ClassPreset"
import { Stats } from "./steps/Stats"
import { Abilities } from "./steps/Abilities"

const STEPS = ['basic', 'class', 'stats', 'abilities']

export function CharacterCreation() {
    const [step, setStep] = useState(0)
    const [sheet, dispatch] = useReducer(characterReducer, {})

    const next = () => setStep(s => s+1)

    return(<>
        {STEPS[step] === 'basic' && <BasicInfo onNext={(data) => { dispatch({ type: 'SET_BASIC_INFO', payload: data }); next() }} />}
        {STEPS[step] === 'class' && <ClassPreset onNext={(data) => { dispatch({ type: 'SET_BASIC_INFO', payload: data }); next() }} />}
        {STEPS[step] === 'stats' && <Stats onNext={(data) => { dispatch({ type: 'SET_BASIC_INFO', payload: data }); next() }} />}
        {STEPS[step] === 'abilities' && <Abilities onNext={(data) => { dispatch({ type: 'SET_BASIC_INFO', payload: data }); next() }} />}
    </>)
}
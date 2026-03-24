import { useState } from 'react'
import type { CharacterSheet, CharProperties } from '../models/character.interface'

const LS_KEY = 'thal_characters'

export interface StoredCharacter {
  id: string
  sheet: Partial<CharacterSheet>
  charProperties: CharProperties
  hp: number
}

function load(): StoredCharacter[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function useCharacters() {
  const [characters, setCharacters] = useState<StoredCharacter[]>(load)

  function addCharacter(entry: Omit<StoredCharacter, 'id'>) {
    const updated = [...characters, { ...entry, id: crypto.randomUUID() }]
    localStorage.setItem(LS_KEY, JSON.stringify(updated))
    setCharacters(updated)
  }

  function removeCharacter(id: string) {
    const updated = characters.filter(c => c.id !== id)
    localStorage.setItem(LS_KEY, JSON.stringify(updated))
    setCharacters(updated)
  }

  return { characters, addCharacter, removeCharacter }
}

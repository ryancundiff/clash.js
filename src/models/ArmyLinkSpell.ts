import { armyLinkSpellMap } from '../shared'
import { ArmyLinkSpellName } from '../types'

export class ArmyLinkSpell {
  /** Represents a spell in the army link */
  public readonly name: ArmyLinkSpellName

  /** The count of the spell in the army link */
  public readonly count: number

  constructor(name: ArmyLinkSpellName, count: number) {
    this.name = name
    this.count = count
  }

  public toString (): string {
    return `${this.count}x${armyLinkSpellMap.get(this.name)}`;
  }
}
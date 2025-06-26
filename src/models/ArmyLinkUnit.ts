import { armyLinkUnitMap } from '../shared'
import { ArmyLinkUnitName } from '../types'

export class ArmyLinkUnit {
  /** Represents a unit in the army link */
  public readonly name: ArmyLinkUnitName

  /** The count of the unit in the army link */
  public readonly count: number

  constructor(name: ArmyLinkUnitName, count: number) {
    this.name = name
    this.count = count
  }

  public toString (): string {
    return `${this.count}x${armyLinkUnitMap.get(this.name)}`
  }
}
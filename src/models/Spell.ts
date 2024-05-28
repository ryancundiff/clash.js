import { villageMap } from '../shared'

import {
  APIPlayerItemLevel,
  SpellName,
  Village
} from '../types'

export class Spell {
  /** Name of spell. */
  public readonly name: SpellName

  /** Level of spell. */
  public readonly level: number

  /** Max level of spell. */
  public readonly maxLevel: number

  /** Which village spell belongs to. */
  public readonly village: Village

  constructor (data: APIPlayerItemLevel) {
    this.name = data.name as SpellName
    this.level = data.level
    this.maxLevel = data.maxLevel

    this.village = villageMap.has(data.village)
      ? villageMap.get(data.village) as Village
      : data.village as Village
  }

  /** If spell is max level. */
  public get isMaxLevel () {
    return this.level === this.maxLevel
  }
}

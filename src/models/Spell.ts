import { villageMap } from '../shared'

import {
  APIPlayerItemLevel,
  SpellName,
  Village
} from '../types'

export class Spell {
  /** Name of spell. */
  public name: SpellName

  /** Level of spell. */
  public level: number

  /** Max level of spell. */
  public maxLevel: number

  /** If level of spell is max level. */
  public isMaxLevel: boolean

  /** Which village spell belongs to. */
  public village: Village

  constructor (data: APIPlayerItemLevel) {
    this.name = data.name as SpellName
    this.level = data.level
    this.maxLevel = data.maxLevel
    this.isMaxLevel = data.level == data.maxLevel

    this.village = villageMap.has(data.village)
      ? villageMap.get(data.village) as Village
      : data.village as Village
  }
}

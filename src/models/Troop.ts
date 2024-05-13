import { villageMap } from '../shared'

import {
  APIPlayerItemLevel,
  Village
} from '../types'

export class Troop {
  /** Name of troop. */
  public name: string

  /** Level of troop. */
  public level: number

  /** Max level of troop. */
  public maxLevel: number

  /** If level of troop is max level. */
  public isMaxLevel: boolean

  /** Which village troop belongs to. */
  public village: Village

  constructor (data: APIPlayerItemLevel) {
    this.name = data.name
    this.level = data.level
    this.maxLevel = data.maxLevel
    this.isMaxLevel = data.level == data.maxLevel

    this.village = villageMap.has(data.village)
      ? villageMap.get(data.village) as Village
      : data.village as Village
  }
}

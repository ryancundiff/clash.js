import { villageMap } from '../shared'

import {
  APIPlayerItemLevel,
  EquipmentName,
  Village
} from '../types'

export class Equipment {
  /** Name of equipment. */
  public readonly name: EquipmentName

  /** Level of equipment. */
  public readonly level: number

  /** Max level of equipment. */
  public readonly maxLevel: number

  /** Which village equipment belongs to. */
  public readonly village: Village

  constructor (data: APIPlayerItemLevel) {
    this.name = data.name as EquipmentName
    this.level = data.level
    this.maxLevel = data.maxLevel

    this.village = villageMap.has(data.village)
      ? villageMap.get(data.village) as Village
      : data.village as Village
  }

  /** If equipment is max level. */
  public get isMaxLevel () {
    return this.level === this.maxLevel
  }
}

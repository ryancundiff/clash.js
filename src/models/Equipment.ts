import { villageMap } from '../shared'

import {
  APIPlayerItemLevel,
  EquipmentName,
  Village
} from '../types'

export class Equipment {
  /** Name of equipment. */
  public name: EquipmentName

  /** Level of equipment. */
  public level: number

  /** Max level of equipment. */
  public maxLevel: number

  /** If level of equipment is max level. */
  public isMaxLevel: boolean

  /** Which village equipment belongs to. */
  public village: Village

  constructor (data: APIPlayerItemLevel) {
    this.name = data.name as EquipmentName
    this.level = data.level
    this.maxLevel = data.maxLevel
    this.isMaxLevel = data.level == data.maxLevel

    this.village = villageMap.has(data.village)
      ? villageMap.get(data.village) as Village
      : data.village as Village
  }
}

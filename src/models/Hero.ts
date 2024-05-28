import { Equipment } from './Equipment'
import { villageMap } from '../shared'

import {
  APIPlayerItemLevel,
  EquipmentName,
  HeroName,
  Village
} from '../types'

export class Hero {
  /** Name of hero. */
  public readonly name: HeroName

  /** Level of hero. */
  public readonly level: number

  /** Max level of hero. */
  public readonly maxLevel: number

  /** Which village hero belongs to. */
  public readonly village: Village

  /** Array of equipment currently equipped by hero, if any. */
  public readonly equipment: Array<Equipment> | null

  constructor (data: APIPlayerItemLevel) {
    this.name = data.name as HeroName
    this.level = data.level
    this.maxLevel = data.maxLevel

    this.village = villageMap.has(data.village)
      ? villageMap.get(data.village) as Village
      : data.village as Village

    this.equipment = data.equipment
      ? data.equipment.map(data => new Equipment(data))
      : null
  }

  /** If hero is max level. */
  public get isMaxLevel () {
    return this.level === this.maxLevel
  }

  /**
   * Get equipment currently equipped by hero of given name, if any.
   * @param equipmentName Name of equipment.
  */
  public getEquipment (equipmentName: EquipmentName) {
    if (this.equipment) {
      for (const equipment of this.equipment) {
        if (equipment.name === equipmentName) {
          return equipment
        }
      }
    }

    return null
  }
}

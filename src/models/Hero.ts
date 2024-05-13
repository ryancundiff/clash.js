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
  public name: HeroName

  /** Level of hero. */
  public level: number

  /** Max level of hero. */
  public maxLevel: number

  /** If level of hero is max level. */
  public isMaxLevel: boolean

  /** Which village hero belongs to. */
  public village: Village

  /** Array of equipment currently equipped by hero, if any. */
  public equipment: Array<Equipment> | null

  constructor (data: APIPlayerItemLevel) {
    this.name = data.name as HeroName
    this.level = data.level
    this.maxLevel = data.maxLevel
    this.isMaxLevel = data.level == data.maxLevel

    this.village = villageMap.has(data.village)
      ? villageMap.get(data.village) as Village
      : data.village as Village

    this.equipment = data.equipment
      ? data.equipment.map(data => new Equipment(data))
      : null
  }

  /**
   * Get equipment currently equipped by hero of given name, if any.
   * @param equipmentName Name of equipment.
   */
  public getEquipment (equipmentName: EquipmentName) {
    if (this.equipment) {
      for (const equipment of this.equipment) {
        if (equipment.name == equipmentName) {
          return equipment
        }
      }
    }

    return null
  }
}

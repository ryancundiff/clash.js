import { villageMap } from '../shared'

import {
  APIPlayerItemLevel,
  PetName,
  Village
} from '../types'

export class Pet {
  /** Name of pet. */
  public name: PetName

  /** Level of pet. */
  public level: number

  /** Max level of pet. */
  public maxLevel: number

  /** If level of pet is max level. */
  public isMaxLevel: boolean

  /** Which village pet belongs to. */
  public village: Village

  constructor (data: APIPlayerItemLevel) {
    this.name = data.name as PetName
    this.level = data.level
    this.maxLevel = data.maxLevel
    this.isMaxLevel = data.level == data.maxLevel

    this.village = villageMap.has(data.village)
      ? villageMap.get(data.village) as Village
      : data.village as Village
  }
}

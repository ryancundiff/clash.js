import { villageMap } from '../shared'

import {
  APIPlayerItemLevel,
  PetName,
  Village
} from '../types'

export class Pet {
  /** Name of pet. */
  public readonly name: PetName

  /** Level of pet. */
  public readonly level: number

  /** Max level of pet. */
  public readonly maxLevel: number

  /** Which village pet belongs to. */
  public readonly village: Village

  constructor (data: APIPlayerItemLevel) {
    this.name = data.name as PetName
    this.level = data.level
    this.maxLevel = data.maxLevel

    this.village = villageMap.has(data.village)
      ? villageMap.get(data.village) as Village
      : data.village as Village
  }

  /** If pet is max level. */
  public get isMaxLevel () {
    return this.level === this.maxLevel
  }
}

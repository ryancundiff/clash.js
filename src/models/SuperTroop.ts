import { villageMap } from '../shared'

import {
  APIPlayerItemLevel,
  SuperTroopName,
  Village
} from '../types'

export class SuperTroop {
  /** Name of super troop. */
  public readonly name: SuperTroopName

  /** Which village super troop belongs to. */
  public readonly village: Village

  /** If super troop is active. */
  public isActive: boolean

  constructor (data: APIPlayerItemLevel) {
    this.name = data.name as SuperTroopName

    this.village = villageMap.has(data.village)
      ? villageMap.get(data.village) as Village
      : data.village as Village

    this.isActive = data.superTroopIsActive ?? false
  }
}

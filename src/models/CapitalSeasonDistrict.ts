import { Client } from './Client'
import { CapitalSeasonAttack } from './CapitalSeasonAttack'

import {
  APIClanCapitalRaidSeasonDistrict,
  DistrictHallLevel,
  DistrictName
} from '../types'

export class CapitalSeasonDistrict {
  /** Name of district. */
  public readonly name: DistrictName

  /** ID of district. */
  public readonly id: number

  /** Level of district. */
  public readonly level: DistrictHallLevel

  /** Amount of stars earned. */
  public readonly stars: number

  /** Percentage of destruction. */
  public readonly destruction: number

  /** Array of attacks. */
  public readonly attacks: Array<CapitalSeasonAttack> | null

  /** Amount of loot earned. */
  public readonly loot: number
  
  constructor (
    private client: Client,
    data: APIClanCapitalRaidSeasonDistrict
  ) {
    this.name = data.name as DistrictName
    this.id = data.id
    this.level = data.districtHallLevel as DistrictHallLevel
    this.stars = data.stars
    this.destruction = data.destructionPercent
    
    this.attacks = data.attacks
      ? data.attacks.map(attack => new CapitalSeasonAttack(client, attack))
      : null
    
    this.loot = data.totalLooted
  }
}

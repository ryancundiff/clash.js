import { Client } from './Client'
import { CapitalSeasonClan } from './CapitalSeasonClan'
import { CapitalSeasonDistrict } from './CapitalSeasonDistrict'
import { APIClanCapitalRaidSeasonAttackLogEntry } from '../types'

export class CapitalSeasonAttackLog {
  /** Defender of attack. */
  public readonly defender: CapitalSeasonClan

  /** Amount of attacks made. */
  public readonly attacks: number

  /** Amount of districts destroyed. */
  public readonly districtsDestroyed: number

  /** Array of districts. */
  public readonly districts: Array<CapitalSeasonDistrict>

  constructor (
    private client: Client,
    data: APIClanCapitalRaidSeasonAttackLogEntry
  ) {
    this.defender = new CapitalSeasonClan(client, data.defender)
    this.attacks = data.attackCount
    this.districtsDestroyed = data.districtsDestroyed
    this.districts = data.districts.map(district => new CapitalSeasonDistrict(client, district))
  }

  /** Total amount of loot earned across all districts. */
  public get loot () {
    return this.districts.reduce((total, district) => total + district.loot, 0)
  }

  /** Total percentage of destruction earned across all districts. */
  public get destruction () {
    return this.districts.reduce((total, district) => total + district.destruction, 0)
  }

  /** Resolve player from defender. */
  public async getDefender () {
    return await this.client.getPlayer(this.defender.tag)
  }
}

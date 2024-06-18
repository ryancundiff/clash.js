import { Client } from './Client'
import { CapitalSeasonClan } from './CapitalSeasonClan'
import { CapitalSeasonDistrict } from './CapitalSeasonDistrict'
import { APIClanCapitalRaidSeasonDefenseLogEntry } from '../types'

export class CapitalSeasonDefenseLog {
  /** Attacker of defense. */
  public readonly attacker: CapitalSeasonClan

  /** Amount of attacks made. */
  public readonly attacks: number

  /** Amount of districts destroyed. */
  public readonly districtsDestroyed: number

  /** Array of districts. */
  public readonly districts: Array<CapitalSeasonDistrict>

  constructor (
    private client: Client,
    data: APIClanCapitalRaidSeasonDefenseLogEntry
  ) {
    this.attacker = new CapitalSeasonClan(client, data.attacker)
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

  /** Resolve player from attacker. */
  public async getAttacker () {
    return await this.client.getPlayer(this.attacker.tag)
  }
}

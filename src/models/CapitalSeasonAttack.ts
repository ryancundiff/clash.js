import { Client } from './Client'
import { CapitalSeasonAttacker } from './CapitalSeasonAttacker'
import { APIClanCapitalRaidSeasonAttack } from '../types'

export class CapitalSeasonAttack {
  /** Attacker. */
  public attacker: CapitalSeasonAttacker

  /** Percentage of destruction made. */
  public destruction: number

  /** Amount of stars earned. */
  public stars: number

  constructor (
    private client: Client,
    data: APIClanCapitalRaidSeasonAttack
  ) {
    this.attacker = new CapitalSeasonAttacker(data.attacker)
    this.destruction = data.destructionPercent
    this.stars = data.stars
  }

  /** If attack was a three star. */
  public get isPerfect () {
    return this.stars === 3
  }

  /** Resolve player from attacker. */
  public async getAttacker () {
    return await this.client.getPlayer(this.attacker.tag)
  }
}

import { Client } from './Client'
import { APIClanWarAttack } from '../types'

export class WarAttack {
  /** Tag of attacker. */
  public readonly attackerTag: string

  /** Tag of defender. */
  public readonly defenderTag: string

  /** The order of which attack was made. */
  public readonly order: number

  /** Amount of stars earned. */
  public readonly stars: number

  /** Percentage of destruction made. */
  public readonly destruction: number

  /** Duration of attack in seconds. */
  public readonly duration: number

  constructor (
    private client: Client,
    data: APIClanWarAttack
  ) {
    this.attackerTag = data.attackerTag
    this.defenderTag = data.defenderTag
    this.order = data.order
    this.stars = data.stars
    this.destruction = data.destructionPercentage
    this.duration = data.duration
  }

  /** If attack was a three star. */
  public get isPerfect () {
    return this.stars == 3
  }

  /** Resolve player from attacker. */
  public async getAttacker () {
    return await this.client.getPlayer(this.attackerTag)
  }

  /** Resolve player from defender. */
  public async getDefender () {
    return await this.client.getPlayer(this.defenderTag)
  }
}

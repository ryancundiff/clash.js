import { Client } from './Client'
import { APIClanWarAttack } from '../types'

export class WarAttack {
  /** Tag of attacker. */
  public attackerTag: string

  /** Tag of defender. */
  public defenderTag: string

  /** The order of which attack was made. */
  public order: number

  /** Amount of stars earned. */
  public stars: number

  /** Percentage of destruction made. */
  public destruction: number

  /** Duration of attack in seconds. */
  public duration: number

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
}

import { APIClanCapitalRaidSeasonAttacker } from '../types'

export class CapitalSeasonAttacker {
  /** Name of attacker. */
  public name: string

  /** Tag of attacker. */
  public tag: string

  constructor (data: APIClanCapitalRaidSeasonAttacker) {
    this.name = data.name
    this.tag = data.tag
  }
}

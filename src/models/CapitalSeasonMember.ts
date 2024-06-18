import { APIClanCapitalRaidSeasonMember } from '../types'

export class CapitalSeasonMember {
  /** Name of member. */
  public readonly name: string

  /** Tag of member. */
  public readonly tag: string

  /** Amount of attacks made. */
  public readonly attacks: number

  /** Maximum amount of attacks that can be made in war. */
  public readonly maxAttacks: number

  /** Amount of bonus attacks. */
  public readonly bonusAttacks: number

  /** Amount of loot earned. */
  public readonly loot: number

  constructor (data: APIClanCapitalRaidSeasonMember) {
    this.name = data.name
    this.tag = data.tag
    this.attacks = data.attacks
    this.maxAttacks = data.attackLimit
    this.bonusAttacks = data.bonusAttackLimit
    this.loot = data.capitalResourcesLooted
  }
}

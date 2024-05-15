import { Client } from './Client'
import { WarAttack } from './WarAttack'

import { APIClanWarMember } from '../types'

export class WarClanMember {
  /** Name of war clan member. */
  public name: string

  /** Tag of war clan member. */
  public tag: string

  /** Current town hall level of war clan member. */
  public townHall: number

  /** Position war clan member is on war map. */
  public position: number

  /** Array of attacks made by war clan member, if any. */
  public attacks: Array<WarAttack> | null

  /** Amount of enemy attacks made against war clan member. */
  public enemyAttacks: number

  /** Best enemy attack made against war clan member. */
  public bestEnemyAttack: WarAttack | null

  constructor (
    private client: Client,
    data: APIClanWarMember
  ) {
    this.name = data.name
    this.tag = data.tag
    this.townHall = data.townhallLevel
    this.position = data.mapPosition

    this.attacks = data.attacks?.length > 0
      ? data.attacks.map(data => new WarAttack(client, data))
      : null

    this.enemyAttacks = data.opponentAttacks

    this.bestEnemyAttack = data.bestOpponentAttack
      ? new WarAttack(client, data.bestOpponentAttack)
      : null
  }

  /** If member has made attacks. */
  public get hasAttacked () {
    return this.attacks != null
  }

  /** If member has made a 3 star attack. */
  public get hasPerfected () {
    return this.attacks?.some(attack => attack.isPerfect) ?? false
  }

  /** If member has been attacked. */
  public get isAttacked () {
    return this.enemyAttacks > 0
  }

  /** If member has been 3 starred. */
  public get isPerfected () {
    return this.bestEnemyAttack?.isPerfect ?? false
  }

  /** Resolve player from war clan member. */
  public async getPlayer () {
    return await this.client.getPlayer(this.tag)
  }
}

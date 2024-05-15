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
}

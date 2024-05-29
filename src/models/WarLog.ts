import { Client } from './Client'
import { WarLogClan } from './WarLogClan'
import { resolveDate } from '../helpers'
import { warResultMap } from '../shared'

import {
  APIClanWarLogEntry,
  WarResult
} from '../types'

export class WarLog {
  /** Ally clan of war. */
  public ally: WarLogClan

  /** Enemy clan of war. */
  public enemy: WarLogClan

  /** Size of team on each side of war. */
  public size: number

  /** Amount of attacks per member. */
  public attacksPerMember: number

  /** Maximum amount of attacks that can be made in war. */
  public maxAttacks: number

  /** Date of when the war ended. */
  public endDate: Date

  /** Result of war. */
  public result: WarResult | null

  constructor (
    private client: Client,
    data: APIClanWarLogEntry
  ) {
    this.ally = new WarLogClan(client, data.clan)
    this.enemy = new WarLogClan(client, data.opponent)
    this.size = data.teamSize
    this.attacksPerMember = data.attacksPerMember
    this.maxAttacks = data.attacksPerMember * data.teamSize * 2
    this.endDate = resolveDate(data.endTime)

    this.result = warResultMap.has(data.result)
      ? warResultMap.get(data.result) as WarResult
      : data.result as WarResult
  }

  /** If war resulted in a win. */
  public get isWin () {
    return this.result === 'win'
  }

  /** If war resulted in a loss. */
  public get isLoss () {
    return this.result === 'loss'
  }

  /** If war resulted in a tie. */
  public get isTie () {
    return this.result === 'tie'
  }

  /** Resolve clan from ally war clan. */
  public async getAlly () {
    return await this.client.getClan(this.ally.tag!)
  }

  /** Resolve clan from enemy war clan. */
  public async getEnemy () {
    if (this.enemy.tag) {
      return await this.client.getClan(this.enemy.tag)
    }

    return null
  }
}

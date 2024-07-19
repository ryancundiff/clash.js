import { Client } from './Client'
import { CapitalSeasonAttackLog } from './CapitalSeasonAttackLog'
import { CapitalSeasonDefenseLog } from './CapitalSeasonDefenseLog'
import { CapitalSeasonMember } from './CapitalSeasonMember'
import { resolveDate } from '../helpers'

import {
  APIClanCapitalRaidSeason,
  CapitalSeasonState
} from '../types'

export class CapitalSeason {
  /** Array of attack logs for the capital season. */
  public readonly attackLog: Array<CapitalSeasonAttackLog> | null

  /** Array of defense logs for the capital season. */
  public readonly defenseLog: Array<CapitalSeasonDefenseLog> | null

  /** State of the capital season. */
  public readonly state: CapitalSeasonState

  /** Start date of the capital season. */
  public readonly startDate: Date

  /** End date of the capital season. */
  public readonly endDate: Date

  /** Total amount of loot gained from the capital season. */
  public readonly loot: number

  /** Amount of raids completed in the capital season. */
  public readonly raids: number

  /** Total amount of attacks in the capital season. */
  public readonly attacks: number

  /** Amount of enemy districts destroyed in the capital season. */
  public readonly districtsDestroyed: number

  /** Offensive reward for the capital season. */
  public readonly offensiveReward: number

  /** Defensive reward for the capital season. */
  public readonly defensiveReward: number

  /** Array of members in the capital season. */
  public readonly members: Array<CapitalSeasonMember> | null

  constructor (
    private client: Client,
    data: APIClanCapitalRaidSeason
  ) {
    this.attackLog = data.attackLog.length > 0
      ? data.attackLog.map(log => new CapitalSeasonAttackLog(client, log))
      : null
    
    this.defenseLog = data.defenseLog.length > 0
      ? data.defenseLog.map(log => new CapitalSeasonDefenseLog(client, log))
      : null
    
    this.state = data.state as CapitalSeasonState
    this.startDate = resolveDate(data.startTime)
    this.endDate = resolveDate(data.endTime)
    this.loot = data.capitalTotalLoot
    this.raids = data.raidsCompleted
    this.attacks = data.totalAttacks
    this.districtsDestroyed = data.enemyDistrictsDestroyed
    this.offensiveReward = data.offensiveReward
    this.defensiveReward = data.defensiveReward

    this.members = data.members?.length > 0
      ? data.members.map(member => new CapitalSeasonMember(member))
      : null
  }

  /** If capital season has ended. */
  public get hasEnded (): boolean {
    return this.state === 'ended'
  }

  /** If capital season is ongoing. */
  public get isOngoing (): boolean {
    return this.state === 'ongoing'
  }
}

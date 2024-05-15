import { Client } from './Client'
import { WarClan } from './WarClan'
import { resolveDate } from '../helpers'
import { warStateMap } from '../shared'

import {
  APIClanWar,
  WarState
} from '../types'

export class War {
  /** Ally clan of war. */
  public ally: WarClan

  /** Enemy clan of war. */
  public enemy: WarClan

  /** Size of team on each side of war. */
  public size: number

  /** Amount of attacks per member. */
  public attacksPerMember: number

  /** Current amount of attacks made in war. */
  public attacks: number

  /** Maximum amount of attacks that can be made in war. */
  public maxAttacks: number

  /** Current state of war. */
  public state: WarState

  /** Date of when the war starts. */
  public startDate: Date

  /** Date of when the war ends. */
  public endDate: Date

  /** Date of when the war preparation starts. */
  public preparationDate: Date

  constructor (
    private client: Client,
    data: APIClanWar
  ) {
    this.ally = new WarClan(client, data.clan)
    this.enemy = new WarClan(client, data.opponent)
    this.size = data.teamSize
    this.attacksPerMember = data.attacksPerMember
    this.attacks = data.clan.attacks ?? 0 + data.opponent.attacks ?? 0
    this.maxAttacks = data.attacksPerMember * 2 * data.teamSize

    this.state = warStateMap.has(data.state)
      ? warStateMap.get(data.state) as WarState
      : data.state as WarState ?? null

    this.startDate = resolveDate(data.startTime)
    this.endDate = resolveDate(data.endTime)
    this.preparationDate = resolveDate(data.preparationStartTime)
  }
}

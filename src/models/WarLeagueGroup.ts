import { Client } from './Client'
import { WarLeagueClan } from './WarLeagueClan'
import { WarLeagueRound } from './WarLeagueRound'

import { warStateMap } from '../shared'

import {
  APIClanWarLeagueGroup,
  WarState
} from '../types'

export class WarLeagueGroup {
  /** Tag of clan war league group. */
  public readonly tag: string

  /** State of clan war league group. */
  public readonly state: WarState

  /** Season of clan war league group. */
  public readonly season: string

  /** Clans in clan war league group. */
  public readonly clans: Array<WarLeagueClan>

  /** Rounds in clan war league group. */
  public readonly rounds: Array<WarLeagueRound>

  constructor(
    private client: Client,
    data: APIClanWarLeagueGroup
  ) {
    this.tag = data.tag

    this.state = warStateMap.has(data.state)
      ? warStateMap.get(data.state) as WarState
      : data.state as WarState
    
    this.season = data.season
    this.clans = data.clans.map(data => new WarLeagueClan(client, data))
    this.rounds = data.rounds.map(data => new WarLeagueRound(data))
  }
}

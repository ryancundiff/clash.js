import { Client } from './Client'
import { League } from './League'
import { BuilderBaseLeague } from './BuilderBaseLeague'
import { House } from './House'
import { roleMap } from '../shared'

import {
  APIClanMember,
  Role
} from '../types'

export class ClanMember {
  // General information:

  /** Name of clan member. */
  public name: string

  /** Tag of clan member. */
  public tag: string

  /** Level of clan member. */
  public level: number

  // League information:

  /** Current league of clan member. */
  public league: League | null

  /** Current builder base league of clan member. */
  public builderBaseLeague: BuilderBaseLeague | null

  // Clan information:

  /** Current role of clan member in clan. */
  public role: Role

  /** Current rank of clan member in clan. */
  public rank: number

  /** Previous rank of clan member in clan. */
  public previousRank: number

  /** Amount of troops donated by clan member. */
  public troopsDonated: number

  /** Amount of troops received by clan member */
  public troopsReceived: number

  // Trophy information:

  /** Amount of trophies clan member has earned. */
  public trophies: number

  /** Amount of builder base trophies clan member has earned. */
  public builderBaseTrophies: number

  // Town hall information:

  /** Current town hall level of clan member. */
  public townHall: number

  /** House of clan member, if has one. */
  public house: House | null

  constructor (
    private client: Client,
    data: APIClanMember
  ) {
    this.name = data.name
    this.tag = data.tag
    this.level = data.expLevel

    this.league = data.league
      ? new League(data.league)
      : null

    this.builderBaseLeague = data.builderBaseLeague
      ? new BuilderBaseLeague(data.builderBaseLeague)
      : null

    this.role = roleMap.has(data.role)
      ? roleMap.get(data.role) as Role
      : data.role as Role

    this.rank = data.clanRank
    this.previousRank = data.previousClanRank
    this.troopsDonated = data.donations
    this.troopsReceived = data.donationsReceived
    this.trophies = data.trophies
    this.builderBaseTrophies = data.builderBaseTrophies
    this.townHall = data.townHallLevel
    
    this.house = data.playerHouse
      ? new House(data.playerHouse)
      : null
  }

  /** Resolve player from clan member. */
  public async getPlayer () {
    return this.client.getPlayer(this.tag)
  }
}
import { Client } from './Client'
import { ClanMember } from './ClanMember'
import { Location } from './Location'
import { Language } from './Language'
import { Capital } from './Capital'
import { Label } from './Label'

import {
  clanTypeMap,
  warFrequencyMap
} from '../shared'

import type {
  APIClan,
  ClanType,
  DistrictName,
  IconURLs,
  WarFrequency
} from '../types'
import { CapitalLeague } from './CapitalLeague'
import { WarLeague } from './WarLeague'

export class SearchClan {
  /** Name of clan. */
  public readonly name: string

  /** Tag of clan. */
  public readonly tag: string

  /** Level of clan. */
  public readonly level: number

  /** Array of clan's labels. */
  public readonly labels: Array<Label> | null

  /** Current capital league of clan. */
  public readonly capitalLeague: CapitalLeague

  /** Current war league of clan. */
  public readonly warLeague: WarLeague

  /** Type of clan. */
  public readonly type: ClanType

  /** Location of clan. */
  public readonly location: Location | null

  /** Language of clan. */
  public readonly language: Language | null

  /** If clan is family friendly. */
  public readonly isFamilyFriendly: boolean

  /** Record of icon URLs for clan's badge. */
  public readonly badgeURLs: Omit<IconURLs, 'tiny'>

  /** War frequency of clan. */
  public readonly warFrequency: WarFrequency

  /** If clan's war log is public. */
  public readonly isWarLogPublic: boolean

  /** Current streak of clan's war wins. */
  public readonly warWinStreak: number

  /** Amount of clan's war wins. */
  public readonly warWins: number

  /** Amount of clan's war ties. */
  public readonly warTies: number

  /** Amount of clan's war losses. */
  public readonly warLosses: number

  /** Required amount of trophies to join clan. */
  public readonly requiredTrophies: number

  /** Required amount of builder base trophies to join clan. */
  public readonly requiredBuilderBaseTrophies: number

  /** Required town hall level to join clan. */
  public readonly requiredTownHall: number

  /** Amount of clan points. */
  public readonly points: number

  /** Amount of clan builder base points. */
  public readonly builderBasePoints: number

  /** Amount of clan capital points. */
  public readonly capitalPoints: number

  constructor (
    private client: Client,
    data: APIClan
  ) {
    this.name = data.name
    this.tag = data.tag
    this.level = data.clanLevel

    this.labels = data.labels.length > 0
      ? data.labels.map(data => new Label(data))
      : null

    this.capitalLeague = new CapitalLeague(data.capitalLeague)
    this.warLeague = new WarLeague(data.warLeague)

    this.type = clanTypeMap.has(data.type)
      ? clanTypeMap.get(data.type) as ClanType
      : data.type as ClanType ?? null

    this.location = Object.keys(data.location ?? {}).length > 0
      ? new Location(data.location)
      : null
    
    this.language = Object.keys(data.chatLanguage ?? {}).length > 0
      ? new Language(data.chatLanguage)
      : null

    this.isFamilyFriendly = data.isFamilyFriendly

    this.badgeURLs = data.badgeUrls
    
    this.warFrequency = warFrequencyMap.has(data.warFrequency)
      ? warFrequencyMap.get(data.warFrequency) as WarFrequency
      : data.warFrequency as WarFrequency
    
    this.isWarLogPublic = data.isWarLogPublic
    this.warWinStreak = data.warWinStreak
    this.warWins = data.warWins ?? 0
    this.warTies = data.warTies ?? 0
    this.warLosses = data.warLosses ?? 0
    this.requiredTrophies = data.requiredTrophies
    this.requiredBuilderBaseTrophies = data.requiredBuilderBaseTrophies
    this.requiredTownHall = data.requiredTownhallLevel
    this.points = data.clanPoints
    this.builderBasePoints = data.clanBuilderBasePoints
    this.capitalPoints = data.clanCapitalPoints
  }

  /** Resolve clan from search clan. */
  public async getClan () {
    return await this.client.getClan(this.tag)
  }

  /** Get current war of clan, if in one. */
  public async getWar () {
    return await this.client.getWar(this.tag)
  }
}

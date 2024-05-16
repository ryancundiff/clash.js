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

export class Clan {
  // General information:

  /** Name of clan. */
  public name: string

  /** Tag of clan. */
  public tag: string

  /** Level of clan. */
  public level: number

  /** Array of clan's labels. */
  public labels: Array<Label> | null

  // League information:

  /** Current capital league of clan. */
  public capitalLeague: CapitalLeague

  /** Current war league of clan. */
  public warLeague: WarLeague

  /** Array of clan members. */
  public members: Array<ClanMember>

  /** Type of clan. */
  public type: ClanType

  /** Description of clan. */
  public description: string

  /** Location of clan. */
  public location: Location | null

  /** Language of clan. */
  public language: Language | null

  /** If clan is family friendly. */
  public isFamilyFriendly: boolean

  /** Clan capital of clan, if has one. */
  public capital: Capital | null

  /** Record of icon URLs for clan's badge. */
  public badgeURLs: Omit<IconURLs, 'tiny'>

  // War information:

  /** War frequency of clan. */
  public warFrequency: WarFrequency

  /** If clan's war log is public. */
  public isWarLogPublic: boolean

  /** Current streak of clan's war wins. */
  public warWinStreak: number

  /** Amount of clan's war wins. */
  public warWins: number

  /** Amount of clan's war ties. */
  public warTies: number

  /** Amount of clan's war losses. */
  public warLosses: number

  // Required information:

  /** Required amount of trophies to join clan. */
  public requiredTrophies: number

  /** Required amount of builder base trophies to join clan. */
  public requiredBuilderBaseTrophies: number

  /** Required town hall level to join clan. */
  public requiredTownHall: number

  // Point information:

  /** Amount of clan points. */
  public points: number

  /** Amount of clan builder base points. */
  public builderBasePoints: number

  /** Amount of clan capital points. */
  public capitalPoints: number

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
    this.members = data.memberList.map(data => new ClanMember(client, data))

    this.type = clanTypeMap.has(data.type)
      ? clanTypeMap.get(data.type) as ClanType
      : data.type as ClanType ?? null
    
    this.description = data.description

    this.location = Object.keys(data.location ?? {}).length > 0
      ? new Location(data.location)
      : null
    
    this.language = Object.keys(data.chatLanguage ?? {}).length > 0
      ? new Language(data.chatLanguage)
      : null

    this.isFamilyFriendly = data.isFamilyFriendly

    this.capital = Object.keys(data.clanCapital ?? {}).length > 0
      ? new Capital(data.clanCapital)
      : null

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

  /** Get current war of clan, if in one. */
  public async getWar () {
    return await this.client.getWar(this.tag)
  }

  /**
   * Check if clan has member with given tag.
   * @param memberTag Tag of member.
  */
  public hasMember (memberTag: string) {
    for (const member of this.members) {
      if (member.tag == memberTag) {
        return true
      }
    }

    return false
  }

  /**
   * Check if clan has member with given name.
   * @param memberName Name of member.
  */
  public hasMemberByName (memberName: string) {
    for (const member of this.members) {
      if (member.name == memberName) {
        return true
      }
    }

    return false
  }

  /**
   * Check if clan's capital has district with given name.
   * @param districtName Name of district.
  */
  public hasDistrict (districtName: DistrictName) {
    if (this.capital && this.capital.districts) {
      for (const district of this.capital.districts) {
        if (district.name == districtName) {
          return true
        }
      }
    }

    return false
  }

  /**
   * Get member of given tag from clan.
   * @param memberTag Tag of member.
  */
  public getMember (memberTag: string) {
    for (const member of this.members) {
      if (member.tag == memberTag) {
        return member
      }
    }

    return null
  }

  /**
   * Get member of given name from clan.
   * @param memberName Name of member.
  */
  public getMemberByName (memberName: string) {
    for (const member of this.members) {
      if (member.name == memberName) {
        return member
      }
    }

    return null
  }

  /**
   * Get district of given name from clan's capital, if unlocked.
   * @param districtName Name of district.
  */
  public getDistrict (districtName: string) {
    if (this.capital && this.capital.districts) {
      for (const district of this.capital.districts) {
        if (district.name == districtName) {
          return district
        }
      }
    }

    return null
  }
}

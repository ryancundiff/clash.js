import { APICapitalLeague } from './APICapitalLeague'
import { APIClanCapital } from './APIClanCapital'
import { APIClanMember } from './APIClanMember'
import { APIClanType } from './APIClanType'
import { APIIconURLs } from './APIIconURLs'
import { APILabel } from './APILabel'
import { APILanguage } from './APILanguage'
import { APILocation } from './APILocation'
import { APIWarFrequency } from './APIWarFrequency'
import { APIWarLeague } from './APIWarLeague'

export interface APIClan {
  warLeague: APIWarLeague,
  capitalLeague: APICapitalLeague,
  
  memberList: Array<APIClanMember>,
  tag: string,
  isFamilyFriendly: boolean,
  warFrequency: APIWarFrequency,
  clanLevel: number,
  warWinStreak: number,
  warWins: number,
  warTies: number,
  warLosses: number,
  clanPoints: number,
  chatLanguage: APILanguage,
  isWarLogPublic: boolean,
  clanCapitalPoints: number,
  requiredTrophies: number,
  requiredBuilderBaseTrophies: number,
  requiredTownhallLevel: number,
  clanBuilderBasePoints: number,
  labels: Array<APILabel>,
  name: string,
  location: APILocation,
  type: APIClanType,
  members: number,
  description: string,
  clanCapital: APIClanCapital,
  badgeUrls: Omit<APIIconURLs, 'tiny'>
}

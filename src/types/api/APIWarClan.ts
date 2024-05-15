import { APIClanWarMember } from './APIClanWarMember'
import { APIIconURLs } from './APIIconURLs'

export interface APIWarClan {
  destructionPercentage: number,
  tag: string,
  name: string,
  badgeUrls: APIIconURLs,
  clanLevel: number,
  attacks: number,
  stars: number,
  expEarned: number,
  members: Array<APIClanWarMember>
}

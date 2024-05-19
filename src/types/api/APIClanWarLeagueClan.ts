import { APIClanWarLeagueClanMember } from './APIClanWarLeagueClanMember'
import { APIIconURLs } from './APIIconURLs'

export interface APIClanWarLeagueClan {
  tag: string,
  clanLevel: number,
  name: string,
  members: Array<APIClanWarLeagueClanMember>,
  badgeUrls: APIIconURLs
}

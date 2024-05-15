import { Client } from './Client'
import { WarClanMember } from './WarClanMember'

import {
  APIWarClan,
  IconURLs
} from '../types'

export class WarClan {
  /** Name of war clan. */
  public name: string

  /** Tag of war clan. */
  public tag: string

  /** Members of war clan. */
  public members: Array<WarClanMember>

  /** Current percentage of destruction made across all best attacks. */
  public destruction: number

  /** Amount of stars earned across all best attacks. */
  public stars: number

  /** Current amount of attacks made. */
  public attacks: number

  /** Amount of experience earned. */
  public earned: number

  /** Record of icon URLs for war clan's badge */
  public badgeURLs: IconURLs

  constructor (
    private client: Client,
    data: APIWarClan
  ) {
    this.name = data.name
    this.tag = data.tag
    this.members = data.members.map(data => new WarClanMember(client, data))
    this.destruction = data.destructionPercentage
    this.stars = data.stars
    this.attacks = data.attacks
    this.earned = data.expEarned ?? 0
    this.badgeURLs = data.badgeUrls
  }
}

import { Client } from './Client'

import {
  APIWarClan,
  IconURLs
} from '../types'

export class WarLogClan {
  public readonly name: string | null
  public readonly tag: string | null
  public readonly level: number
  public readonly earned: number | null
  public readonly attacks: number | null
  public readonly stars: number
  public readonly destruction: number
  public readonly badgeURLs: Omit<IconURLs, 'tiny'>

  constructor (
    private client: Client,
    data: APIWarClan
  ) {
    this.name = data.name ?? null
    this.tag = data.tag ?? null
    this.level = data.clanLevel
    this.earned = data.expEarned ?? null
    this.attacks = data.attacks ?? null
    this.stars = data.stars
    this.destruction = data.destructionPercentage
    this.badgeURLs = data.badgeUrls
  }

  /** Resolve clan from war log clan. */
  public async getClan () {
    if (this.tag) {
      return await this.client.getClan(this.tag)
    }

    return null
  }
}

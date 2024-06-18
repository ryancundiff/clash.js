import { Client } from './Client'

import {
  APIClanCapitalRaidSeasonClanInfo,
  IconURLs
} from '../types'

export class CapitalSeasonClan {
  /** Name of clan. */
  public readonly name: string

  /** Tag of clan. */
  public readonly tag: string

  /** Level of clan. */
  public readonly level: number

  /** Record of icon URLs for clan's badge. */
  public readonly badgeURLs: Omit<IconURLs, 'tiny'>

  constructor (
    private client: Client,
    data: APIClanCapitalRaidSeasonClanInfo
  ) {
    this.name = data.name
    this.tag = data.tag
    this.level = data.level
    this.badgeURLs = data.badgeUrls
  }

  /** Resolve clan from capital season clan. */
  public async getClan () {
    return await this.client.getClan(this.tag)
  }
}

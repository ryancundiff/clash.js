import { Client } from './Client'

import type {
  APIPlayerClan,
} from '../types'

export class PlayerClan {
  /** Name of player clan. */
  public name: string

  /** Tag of player clan. */
  public tag: string

  /** Level of player clan. */
  public level: number

  constructor (
    private client: Client,
    data: APIPlayerClan
  ) {
    this.name = data.name
    this.tag = data.tag
    this.level = data.clanLevel
  }

  /** Resolve clan from player clan, if in one. */
  public async getClan () {
    if (this.tag) {
      return await this.client.getClan(this.tag)
    }

    return null
  }
}
